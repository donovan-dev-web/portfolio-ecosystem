import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MessagesScreen } from '@/screens//MessagesScreen'
import { MessageDetailScreen } from '@/screens/MessageDetailScreen'

const Stack = createNativeStackNavigator()

export default function MessagesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="MessagesList" component={MessagesScreen} />
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
    </Stack.Navigator>
  )
}
