import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
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
        <ActivityIndicator size="large" color="#725bef" />
      </View>
    )
  }

  if (!message) {
    return (
      <View style={styles.loader}>
        <Text style={styles.notFoundText}>Message introuvable</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerActions}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={16} color="#d9d4ff" />
          <Text style={styles.backText}>Retour aux messages</Text>
        </Pressable>

        <Pressable style={styles.replyButton} onPress={handleReply}>
          <Ionicons name="mail-outline" size={16} color="#dff7e8" />
          <Text style={styles.replyText}>Repondre</Text>
        </Pressable>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.identity}>
            <Text style={styles.name}>{message.name}</Text>
            <Text style={styles.email}>{message.email}</Text>
          </View>

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

        <Text style={styles.heroText}>
          Message recu depuis le portfolio, avec acces direct aux informations
          de contact et au contenu complet de l’echange.
        </Text>
      </View>

      <View style={styles.metaCard}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Email</Text>
          <Text style={styles.metaValue}>{message.email}</Text>
        </View>

        {message.phone ? (
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Telephone</Text>
            <Text style={styles.metaValue}>{message.phone}</Text>
          </View>
        ) : null}

        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Date d’envoi</Text>
          <Text style={styles.metaValue}>
            {new Date(message.dateSent).toLocaleString()}
          </Text>
        </View>

        {message.dateRead ? (
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date de lecture</Text>
            <Text style={styles.metaValue}>
              {new Date(message.dateRead).toLocaleString()}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.messageCard}>
        <Text style={styles.sectionTitle}>Message</Text>
        <Text style={styles.messageText}>{message.content}</Text>
      </View>

      <View style={styles.navigation}>
        <Pressable
          style={[
            styles.navButton,
            currentIndex <= 0 && styles.navButtonDisabled,
          ]}
          disabled={currentIndex <= 0}
          onPress={() => goToMessage(currentIndex - 1)}
        >
          <Ionicons name="arrow-back" size={16} color="#f2f2f7" />
          <Text style={styles.navText}>Precedent</Text>
        </Pressable>

        <Pressable
          style={[
            styles.navButton,
            currentIndex >= messages.length - 1 && styles.navButtonDisabled,
          ]}
          disabled={currentIndex >= messages.length - 1}
          onPress={() => goToMessage(currentIndex + 1)}
        >
          <Text style={styles.navText}>Suivant</Text>
          <Ionicons name="arrow-forward" size={16} color="#f2f2f7" />
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  backText: {
    color: '#f2f2f7',
    fontWeight: '700',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(40, 167, 69, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(40, 167, 69, 0.26)',
  },
  replyText: {
    color: '#dff7e8',
    fontWeight: '700',
  },
  heroCard: {
    marginBottom: 16,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  identity: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  email: {
    color: '#b8b8c6',
    marginTop: 6,
  },
  heroText: {
    marginTop: 14,
    color: '#cfcfda',
    lineHeight: 22,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeRead: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  badgeUnread: {
    backgroundColor: 'rgba(114, 91, 239, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(114, 91, 239, 0.34)',
  },
  badgeText: {
    color: '#f4f2ff',
    fontSize: 12,
    fontWeight: '700',
  },
  metaCard: {
    marginBottom: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  metaItem: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  metaLabel: {
    color: '#9a9ab0',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metaValue: {
    color: '#f2f2f7',
    lineHeight: 21,
  },
  messageCard: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  messageText: {
    color: '#d0d0da',
    fontSize: 15,
    lineHeight: 24,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(114, 91, 239, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(114, 91, 239, 0.34)',
  },
  navButtonDisabled: {
    opacity: 0.45,
  },
  navText: {
    color: '#f2f2f7',
    fontWeight: '700',
  },
})
