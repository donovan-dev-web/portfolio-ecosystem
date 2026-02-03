import { View, Text, StyleSheet } from 'react-native'
import { globalStyles } from '@/styles/global'

export default function HomeScreen() {
  return (
    <View style={globalStyles.screen}>
      <View>
        <Text style={globalStyles.text}>🏠 Home</Text>
      </View>
    </View>
  )
}
