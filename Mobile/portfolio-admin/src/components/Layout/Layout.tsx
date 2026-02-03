import { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Background } from '../Background/Background' // adapte le chemin

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <Background />

        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          {children}
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0b0b12',
  },

  container: {
    flex: 1,
    zIndex: 10, // pour que ton contenu soit AU-DESSUS du background
  },
})
