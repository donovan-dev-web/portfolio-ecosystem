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
        marginBottom: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.045)',
      }}
    >
      <Pressable
        onPress={() => setOpen(!open)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 16,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>
          {title}
        </Text>

        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#b7afd7"
        />
      </Pressable>

      {open && (
        <View
          style={{
            padding: 18,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {children}
        </View>
      )}
    </View>
  )
}
