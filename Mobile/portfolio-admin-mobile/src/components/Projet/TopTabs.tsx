// src/components/tabs/TopTabs.tsx

import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'

type Tab = {
  key: string
  title: string
}

type Props = {
  tabs: Tab[]
  onChange: (key: string) => void
}

export default function TopTabs({ tabs, onChange }: Props) {
  const [active, setActive] = useState(tabs[0].key)

  const handlePress = (key: string) => {
    setActive(key)
    onChange(key)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active

        return (
          <Pressable
            key={tab.key}
            onPress={() => handlePress(tab.key)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderBottomWidth: 2,
              borderBottomColor: isActive ? '#725bef' : 'transparent',
            }}
          >
            <Text
              style={{
                color: isActive ? '#725bef' : '#888',
                fontWeight: '600',
              }}
            >
              {tab.title}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
