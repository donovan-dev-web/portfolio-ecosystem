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
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.14)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.22,
        shadowRadius: 18,
        elevation: 6,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '700' }}>
        Appliquer les modifications
      </Text>
    </Pressable>
  )
}
