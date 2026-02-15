import { Text, View } from 'react-native'
import { globalStyles } from '@/styles/global'

export default function MessagesScreen() {
  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.cards}>
        <Text style={globalStyles.text}>🏠 Message</Text>
      </View>
    </View>
  )
}
