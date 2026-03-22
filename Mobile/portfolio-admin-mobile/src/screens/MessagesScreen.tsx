import React, { useContext, useEffect } from 'react'
import {
  Alert,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { MessageContext } from '../context/Messages/messagesContext'
import { RootStackParamList } from '../navigation/types'
import { Message } from '../services/messagesService'

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MessagesList'
>

export const MessagesScreen: React.FC = () => {
  const { messages, loading, fetchMessages, markAsRead, deleteMessage, pagination } =
    useContext(MessageContext)

  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    fetchMessages(1)
  }, [])

  const loadMore = () => {
    if (!loading && pagination.page < pagination.totalPages) {
      fetchMessages(pagination.page + 1)
    }
  }

  const renderItem = ({ item }: { item: Message }) => {
    const formattedDate = new Date(item.dateSent).toLocaleDateString()

    const handleDelete = () => {
      Alert.alert(
        'Supprimer le message',
        `Confirmer la suppression du message de "${item.name}" ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Supprimer',
            style: 'destructive',
            onPress: async () => {
              await deleteMessage(item._id)
            },
          },
        ],
      )
    }

    return (
      <TouchableOpacity
        style={[styles.card, item.read ? styles.cardRead : styles.cardUnread]}
        onPress={() => navigation.navigate('MessageDetail', { id: item._id })}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.identity}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email} numberOfLines={1}>
              {item.email}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              item.read ? styles.badgeRead : styles.badgeUnread,
            ]}
          >
            <Text style={styles.badgeText}>{item.read ? 'Lu' : 'Non lu'}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.date}>{formattedDate}</Text>
          {item.phone ? <Text style={styles.phone}>{item.phone}</Text> : null}
        </View>

        <Text style={styles.preview} numberOfLines={3}>
          {item.content}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('MessageDetail', { id: item._id })
            }
          >
            <Ionicons name="eye-outline" size={16} color="#f2f2f7" />
            <Text style={styles.viewButtonText}>Voir le message</Text>
          </TouchableOpacity>

          {!item.read && (
            <TouchableOpacity
              style={styles.readButton}
              onPress={() => markAsRead(item._id)}
            >
              <Ionicons name="mail-open-outline" size={16} color="#dff7e8" />
              <Text style={styles.readButtonText}>Marquer comme lu</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={16} color="#ffd0d0" />
            <Text style={styles.deleteButtonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Text style={styles.title}>Messages recus</Text>
            <Text style={styles.subtitle}>
              Consulte les demandes recues depuis le site, ouvre les details
              d’un echange et marque rapidement un message comme traite.
            </Text>
          </View>
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#725bef" /> : null
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Aucun message disponible.</Text> : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  list: {
    padding: 20,
    paddingBottom: 120,
  },
  headerCard: {
    marginBottom: 18,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#acacba',
    marginTop: 8,
    lineHeight: 22,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    color: '#8e8ea0',
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  cardUnread: {
    borderColor: 'rgba(114, 91, 239, 0.42)',
  },
  cardRead: {
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  identity: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    color: '#a8a8ba',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
  date: {
    fontSize: 13,
    color: '#9a9ab0',
  },
  phone: {
    fontSize: 13,
    color: '#9a9ab0',
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
  preview: {
    marginTop: 12,
    color: '#d0d0da',
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(114, 91, 239, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(114, 91, 239, 0.34)',
  },
  viewButtonText: {
    color: '#f2f2f7',
    fontWeight: '700',
  },
  readButton: {
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
  readButtonText: {
    color: '#dff7e8',
    fontWeight: '700',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(221, 76, 76, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(221, 76, 76, 0.26)',
  },
  deleteButtonText: {
    color: '#ffd0d0',
    fontWeight: '700',
  },
})
