// src/components/Contact.tsx
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { globalStyles } from '@/styles/global'

const { width, height } = Dimensions.get('window')

export default function Contact() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles.text]}>Contact</Text>
      <Text style={[styles.subtitle, globalStyles.text]}>
        Envoyez-moi un message
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: height - 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38383867',
    borderRadius: 20,
    padding: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 20 },
})
