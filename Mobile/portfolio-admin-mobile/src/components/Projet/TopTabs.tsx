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
        alignSelf: 'flex-start',
        gap: 12,
        marginTop: 24,
        marginBottom: 20,
        padding: 6,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
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
              paddingHorizontal: 18,
              borderRadius: 14,
              backgroundColor: isActive
                ? 'rgba(114, 91, 239, 0.18)'
                : 'transparent',
              borderWidth: 1,
              borderColor: isActive
                ? 'rgba(114, 91, 239, 0.45)'
                : 'transparent',
            }}
          >
            <Text
              style={{
                color: isActive ? '#f5f2ff' : '#a4a4b5',
                fontWeight: '700',
                fontSize: 14,
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
