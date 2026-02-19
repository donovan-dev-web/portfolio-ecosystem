// src/screens/MessageDetailScreen.tsx
import React, { useEffect, useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { MessageContext } from '../context/Messages/messagesContext'
import { getMessageById, Message } from '../services/messagesService'

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MessageDetail'
>

export const MessageDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute<any>()

  const { messages } = useContext(MessageContext)

  const [message, setMessage] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  const currentIndex = messages.findIndex((m) => m._id === route.params.id)

  useEffect(() => {
    loadMessage()
  }, [route.params.id])

  const loadMessage = async () => {
    setLoading(true)
    try {
      const data = await getMessageById(route.params.id)
      setMessage(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReply = () => {
    if (message?.email) {
      Linking.openURL(`mailto:${message.email}`)
    }
  }

  const goToMessage = (index: number) => {
    if (index >= 0 && index < messages.length) {
      navigation.navigate('MessageDetail', {
        id: messages[index]._id,
      })
    }
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!message) {
    return (
      <View style={styles.loader}>
        <Text>Message introuvable</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
          <Text style={styles.replyText}>Répondre</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* CARD */}
        <View style={styles.card}>
          {/* Name + Status */}
          <View style={styles.topRow}>
            <Text style={styles.name}>{message.name}</Text>

            <View
              style={[
                styles.badge,
                message.read ? styles.badgeRead : styles.badgeUnread,
              ]}
            >
              <Text style={styles.badgeText}>
                {message.read ? 'Lu' : 'Non lu'}
              </Text>
            </View>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{message.email}</Text>

          {/* Phone */}
          {message.phone && (
            <>
              <Text style={styles.label}>Téléphone</Text>
              <Text style={styles.value}>{message.phone}</Text>
            </>
          )}

          {/* Date Sent */}
          <Text style={styles.label}>Date d'envoi</Text>
          <Text style={styles.value}>
            {new Date(message.dateSent).toLocaleString()}
          </Text>

          {/* Date Read */}
          {message.dateRead && (
            <>
              <Text style={styles.label}>Date de lecture</Text>
              <Text style={styles.value}>
                {new Date(message.dateRead).toLocaleString()}
              </Text>
            </>
          )}

          {/* Content */}
          <Text style={styles.label}>Message</Text>

          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        </View>

        {/* NAVIGATION */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex <= 0 && styles.navButtonDisabled,
            ]}
            disabled={currentIndex <= 0}
            onPress={() => goToMessage(currentIndex - 1)}
          >
            <Text style={styles.navText}>← Précédent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex >= messages.length - 1 && styles.navButtonDisabled,
            ]}
            disabled={currentIndex >= messages.length - 1}
            onPress={() => goToMessage(currentIndex + 1)}
          >
            <Text style={styles.navText}>Suivant →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 30,
    marginBottom: 30,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  backButton: {
    padding: 8,
  },

  backText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },

  replyButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  replyText: {
    color: 'white',
    fontWeight: '600',
  },

  content: {
    padding: 16,
  },

  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    elevation: 3,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '600',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeRead: {
    backgroundColor: '#9ca3af',
  },

  badgeUnread: {
    backgroundColor: '#2563eb',
  },

  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  label: {
    marginTop: 12,
    fontSize: 13,
    color: '#6b7280',
  },

  value: {
    fontSize: 16,
    marginTop: 2,
  },

  messageBox: {
    marginTop: 8,
    backgroundColor: '#f9fafb',
    padding: 14,
    borderRadius: 8,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  navButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },

  navButtonDisabled: {
    backgroundColor: '#9ca3af',
  },

  navText: {
    color: 'white',
    fontWeight: '600',
  },
})
