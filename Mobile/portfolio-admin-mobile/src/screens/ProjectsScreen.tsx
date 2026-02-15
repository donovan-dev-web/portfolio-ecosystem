import { Text, View } from 'react-native'
import { globalStyles } from '@/styles/global'

export default function ProjectsScreen() {
  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.cards}>
        <Text style={globalStyles.text}>🏠 Project</Text>
      </View>
    </View>
  )
}
