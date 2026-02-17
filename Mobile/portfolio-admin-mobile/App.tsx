import AppNavigator from '@/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Layout from '@/components/Layout/Layout'
import { AuthProvider } from './src/context/AuthProvider'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Layout>
          <AppNavigator />
        </Layout>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
