import AppNavigator from '@/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Layout from '@/components/Layout/Layout'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Layout>
        <AppNavigator />
      </Layout>
    </GestureHandlerRootView>
  )
}
