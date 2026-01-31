import { ReactNode } from 'react'
import { ImageBackground, StyleSheet, Text } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={require('@/assets/images/background.jpeg')}
          resizeMode="cover"
          style={styles.image}
        >
          {children}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
})
