// src/components/Hero.tsx
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import { globalStyles } from '@/styles/global'
import { useAuth } from '../../context/useAuth'
import { LoginBlock } from '../../components/Home/LoginBlock'

const { width, height } = Dimensions.get('window')

export default function Hero() {
  const { user, logout } = useAuth()

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userContainer}>
          <Text style={[styles.title, globalStyles.text]}>
            Bienvenue {user.email} sur votre portfolio
          </Text>

          <Pressable style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={[styles.title, globalStyles.text]}>Hero Accueil</Text>
          <Text style={[styles.subtitle, globalStyles.text]}>
            Bienvenue sur mon portfolio
          </Text>

          <LoginBlock />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    minHeight: height - 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38383867',
    borderRadius: 20,
    padding: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 20, marginBottom: 20 },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#ff5c5c',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
})
