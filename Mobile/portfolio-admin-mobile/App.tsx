import AppNavigator from '@/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Layout from '@/components/Layout/Layout'
import { AuthProvider } from './src/context/AuthProvider'
import { ProjectProvider } from '@/context/Project/ProjectProvider'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ProjectProvider>
          <Layout>
            <AppNavigator />
          </Layout>
        </ProjectProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
