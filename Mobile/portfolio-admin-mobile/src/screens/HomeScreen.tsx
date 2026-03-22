import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'

import { LoginBlock } from '@/components/Home/LoginBlock'
import { UserAdminPanel } from '@/components/Home/UserAdminPanel'
import { globalStyles } from '@/styles/global'
import { useAuth } from '@/context/useAuth'

export default function HomeScreen() {
  const { user, logout } = useAuth()

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        {user ? (
          <View style={styles.connectedBlock}>
            <Text style={[styles.title, globalStyles.text]}>
              Administration mobile
            </Text>
            <Text style={styles.subtitle}>
              Vous etes connecte en tant que {user.email}. Cette interface vous
              permet de gerer les utilisateurs et de securiser l acces au
              back-office directement depuis mobile.
            </Text>

            <Pressable style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Se deconnecter</Text>
            </Pressable>

            <UserAdminPanel />
          </View>
        ) : (
          <View style={styles.loginLayout}>
            <Text style={[styles.title, globalStyles.text]}>
              Connexion au back-office
            </Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour acceder a l administration du portfolio et au
              panneau de gestion utilisateur.
            </Text>
            <LoginBlock />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 120,
    alignItems: 'center',
  },
  heroCard: {
    width: '100%',
    maxWidth: 960,
    borderRadius: 28,
    padding: 20,
    backgroundColor: 'rgba(18,18,24,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  connectedBlock: {
    gap: 16,
  },
  loginLayout: {
    gap: 16,
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(255,92,92,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,92,92,0.28)',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  logoutText: {
    color: '#ffb3b3',
    fontWeight: '700',
  },
})
