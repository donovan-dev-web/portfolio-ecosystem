import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useAuth } from '../../context/useAuth'
import { storage } from '../../utils/storage'

export function LoginBlock() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await storage.getEmail()
      if (savedEmail) {
        setEmail(savedEmail)
      }
    }
    loadEmail()
  }, [])

  const handleLogin = async () => {
    setError(null)
    setLoading(true)

    try {
      await login(email, password)

      if (rememberMe) {
        await storage.saveEmail(email)
      } else {
        await storage.clearEmail()
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erreur de connexion')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    backgroundColor: '#4f8cff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
})
