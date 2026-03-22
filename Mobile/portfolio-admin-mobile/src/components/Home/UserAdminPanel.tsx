import React, { useEffect, useState } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native'

import { authService } from '@/services/authService'
import { useAuth } from '@/context/useAuth'

type AdminUser = {
  id: string
  email: string
  createdAt?: string
  updatedAt?: string
}

const initialCreateForm = {
  email: '',
  password: '',
}

const initialEditForm = {
  email: '',
  password: '',
}

const initialPasswordForm = {
  oldPassword: '',
  newPassword: '',
}

export function UserAdminPanel() {
  const { user } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [signupEnabled, setSignupEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(initialEditForm)
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)

  const loadAdminData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [usersResponse, signupResponse] = await Promise.all([
        authService.getUsers(),
        authService.getSignupStatus(),
      ])

      setUsers(usersResponse)
      setSignupEnabled(Boolean(signupResponse.signupEnabled))
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de recuperer les donnees utilisateur')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadAdminData()
  }, [])

  const showSuccess = (nextMessage: string) => {
    setMessage(nextMessage)
    setError(null)
  }

  const showError = (err: unknown, fallback: string) => {
    if (err instanceof Error) {
      setError(err.message)
    } else {
      setError(fallback)
    }
    setMessage(null)
  }

  const handleCreateUser = async () => {
    setSaving(true)
    try {
      await authService.signup(createForm.email, createForm.password)
      setCreateForm(initialCreateForm)
      showSuccess('Utilisateur cree avec succes')
      await loadAdminData()
    } catch (err: unknown) {
      showError(err, 'Impossible de creer l utilisateur')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateUser = async () => {
    if (!editingUserId) return

    setSaving(true)
    try {
      await authService.updateUser(editingUserId, {
        email: editForm.email,
        password: editForm.password || undefined,
      })
      setEditingUserId(null)
      setEditForm(initialEditForm)
      showSuccess('Utilisateur mis a jour avec succes')
      await loadAdminData()
    } catch (err: unknown) {
      showError(err, 'Impossible de mettre a jour l utilisateur')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteUser = (id: string) => {
    Alert.alert(
      'Supprimer cet utilisateur',
      'Voulez-vous vraiment supprimer cet utilisateur ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            setSaving(true)
            try {
              await authService.deleteUser(id)
              showSuccess('Utilisateur supprime avec succes')
              await loadAdminData()
            } catch (err: unknown) {
              showError(err, 'Impossible de supprimer l utilisateur')
            } finally {
              setSaving(false)
            }
          },
        },
      ],
    )
  }

  const handleChangePassword = async () => {
    setSaving(true)
    try {
      await authService.changePassword(
        passwordForm.oldPassword,
        passwordForm.newPassword,
      )
      setPasswordForm(initialPasswordForm)
      showSuccess('Mot de passe mis a jour avec succes')
    } catch (err: unknown) {
      showError(err, 'Impossible de modifier le mot de passe')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleSignup = async (value: boolean) => {
    setSaving(true)
    try {
      const response = await authService.updateSignupStatus(value)
      setSignupEnabled(Boolean(response.signupEnabled))
      showSuccess('Le statut de creation de compte a ete mis a jour')
    } catch (err: unknown) {
      showError(err, 'Impossible de modifier le statut du signup')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (targetUser: AdminUser) => {
    setEditingUserId(targetUser.id)
    setEditForm({
      email: targetUser.email,
      password: '',
    })
    setMessage(null)
    setError(null)
  }

  if (loading) {
    return (
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Chargement des utilisateurs...</Text>
      </View>
    )
  }

  return (
    <View style={styles.panel}>
      <View style={styles.section}>
        <Text style={styles.panelTitle}>Administration des utilisateurs</Text>
        <Text style={styles.panelText}>
          Gerez les comptes d acces au back-office directement depuis mobile.
        </Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.label}>Utilisateur connecte</Text>
        <Text style={styles.value}>{user?.email || 'Non renseigne'}</Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.toggleHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Creation de compte</Text>
            <Text style={styles.value}>
              {signupEnabled ? 'Activee' : 'Desactivee'}
            </Text>
          </View>
          <Switch
            value={signupEnabled}
            onValueChange={handleToggleSignup}
            disabled={saving}
          />
        </View>
      </View>

      {message ? <Text style={styles.success}>{message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Creer un utilisateur</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.42)"
          autoCapitalize="none"
          keyboardType="email-address"
          value={createForm.email}
          onChangeText={(email) =>
            setCreateForm((current) => ({ ...current, email }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="rgba(255,255,255,0.42)"
          secureTextEntry
          value={createForm.password}
          onChangeText={(password) =>
            setCreateForm((current) => ({ ...current, password }))
          }
        />
        <Pressable
          style={[styles.primaryButton, !signupEnabled && styles.disabledButton]}
          onPress={handleCreateUser}
          disabled={saving || !signupEnabled}
        >
          <Text style={styles.primaryButtonText}>Creer l utilisateur</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Modifier mon mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Ancien mot de passe"
          placeholderTextColor="rgba(255,255,255,0.42)"
          secureTextEntry
          value={passwordForm.oldPassword}
          onChangeText={(oldPassword) =>
            setPasswordForm((current) => ({ ...current, oldPassword }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          placeholderTextColor="rgba(255,255,255,0.42)"
          secureTextEntry
          value={passwordForm.newPassword}
          onChangeText={(newPassword) =>
            setPasswordForm((current) => ({ ...current, newPassword }))
          }
        />
        <Pressable style={styles.primaryButton} onPress={handleChangePassword}>
          <Text style={styles.primaryButtonText}>
            Mettre a jour mon mot de passe
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Liste des utilisateurs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.userList}>
            {users.map((item) => (
              <View key={item.id} style={styles.userItem}>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userDate}>
                  Cree le{' '}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString('fr-FR')
                    : 'date indisponible'}
                </Text>
                <View style={styles.userActions}>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => startEdit(item)}
                  >
                    <Text style={styles.secondaryButtonText}>Modifier</Text>
                  </Pressable>
                  <Pressable
                    style={styles.dangerButton}
                    onPress={() => handleDeleteUser(item.id)}
                  >
                    <Text style={styles.dangerButtonText}>Supprimer</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {editingUserId ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Modifier un utilisateur</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.42)"
            autoCapitalize="none"
            keyboardType="email-address"
            value={editForm.email}
            onChangeText={(email) =>
              setEditForm((current) => ({ ...current, email }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe optionnel"
            placeholderTextColor="rgba(255,255,255,0.42)"
            secureTextEntry
            value={editForm.password}
            onChangeText={(password) =>
              setEditForm((current) => ({ ...current, password }))
            }
          />
          <View style={styles.inlineRow}>
            <Pressable style={styles.primaryButton} onPress={handleUpdateUser}>
              <Text style={styles.primaryButtonText}>Enregistrer</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                setEditingUserId(null)
                setEditForm(initialEditForm)
              }}
            >
              <Text style={styles.secondaryButtonText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    gap: 16,
  },
  section: {
    gap: 8,
  },
  panelTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  panelText: {
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 22,
  },
  statusCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 8,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  success: {
    color: '#b5ffd0',
    backgroundColor: 'rgba(66,180,110,0.14)',
    padding: 12,
    borderRadius: 14,
    textAlign: 'center',
  },
  error: {
    color: '#ffb3b3',
    backgroundColor: 'rgba(255,89,89,0.12)',
    padding: 12,
    borderRadius: 14,
    textAlign: 'center',
  },
  card: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 12,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  input: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(0,0,0,0.24)',
    color: 'white',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  primaryButton: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#6f7cff',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '800',
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '700',
  },
  dangerButton: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,89,89,0.18)',
  },
  dangerButtonText: {
    color: '#ffb3b3',
    fontWeight: '700',
  },
  userList: {
    flexDirection: 'row',
    gap: 12,
  },
  userItem: {
    width: 280,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 8,
  },
  userEmail: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
  userDate: {
    color: 'rgba(255,255,255,0.64)',
    lineHeight: 20,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  inlineRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
})
