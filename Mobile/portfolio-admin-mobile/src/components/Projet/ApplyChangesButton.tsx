// src/components/project/ApplyChangesButton.tsx

import { Pressable, Text } from 'react-native'

export default function ApplyChangesButton({
  onPress,
}: {
  onPress: () => void
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#725bef',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '600' }}>
        Appliquer les modifications
      </Text>
    </Pressable>
  )
}
