// src/components/collapse/Collapse.tsx

import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  title: string
  children: React.ReactNode
}

export default function Collapse({ title, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <View
      style={{
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 10,
      }}
    >
      <Pressable
        onPress={() => setOpen(!open)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>{title}</Text>

        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#888"
        />
      </Pressable>

      {open && (
        <View
          style={{
            padding: 15,
            borderTopWidth: 1,
            borderTopColor: '#333',
          }}
        >
          {children}
        </View>
      )}
    </View>
  )
}
