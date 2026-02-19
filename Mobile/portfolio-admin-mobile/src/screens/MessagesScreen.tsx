// src/screens/MessagesScreen.tsx
import React, { useEffect, useContext } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { MessageContext } from '../context/Messages/messagesContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { Message } from '../services/messagesService'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Messages'>

export const MessagesScreen: React.FC = () => {
  const { messages, loading, fetchMessages, markAsRead, pagination } =
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

    return (
      <TouchableOpacity
        style={[styles.card, item.read ? styles.cardRead : styles.cardUnread]}
        onPress={() => navigation.navigate('MessageDetail', { id: item._id })}
      >
        {/* Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>

          <View
            style={[
              styles.badge,
              item.read ? styles.badgeRead : styles.badgeUnread,
            ]}
          >
            <Text style={styles.badgeText}>{item.read ? 'Lu' : 'Non lu'}</Text>
          </View>
        </View>

        {/* Date */}
        <Text style={styles.date}>{formattedDate}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('MessageDetail', { id: item._id })
            }
          >
            <Text style={styles.viewButtonText}>Voir</Text>
          </TouchableOpacity>

          {!item.read && (
            <TouchableOpacity
              style={styles.readButton}
              onPress={() => {
                console.log('ID utilisé:', item._id)
                markAsRead(item._id)
              }}
            >
              <Text style={styles.readButtonText}>Marquer comme lu</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages reçus</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Aucun message</Text> : null
        }
      />
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

  title: {
    fontSize: 22,
    fontWeight: '600',
    padding: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    color: '#2563eb',
  },

  list: {
    padding: 12,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#6b7280',
  },

  card: {
    backgroundColor: '#7474746b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },

    elevation: 2,
  },

  cardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },

  cardRead: {
    borderLeftWidth: 4,
    borderLeftColor: '#9ca3af',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  date: {
    marginTop: 6,
    fontSize: 14,
    color: '#6b7280',
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  badgeRead: {
    backgroundColor: '#e5e7eb',
  },

  badgeUnread: {
    backgroundColor: '#2563eb',
  },

  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  viewButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  viewButtonText: {
    color: 'white',
    fontWeight: '500',
  },

  readButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  readButtonText: {
    color: 'white',
    fontWeight: '500',
  },
})
