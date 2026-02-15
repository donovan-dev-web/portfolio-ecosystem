import React, { useState, useRef } from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler'

import Hero from './sections/Hero'
import About from './sections/About'
import Contact from './sections/Contact'

const { width, height } = Dimensions.get('window')
const sections = [Hero, About, Contact]

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const opacity = useRef(new Animated.Value(1)).current
  const isAnimating = useRef(false)

  const fadeToNext = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= sections.length) return

    isAnimating.current = true

    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex)
      opacity.setValue(0)
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false
      })
    })
  }

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    // Pas besoin de traiter ici, on gère au release
  }

  const onHandlerStateChange = (event: any) => {
    if (isAnimating.current) return

    if (event.nativeEvent.state === State.END) {
      const translationY = event.nativeEvent.translationY as number
      const threshold = 50

      if (translationY < -threshold && currentIndex < sections.length - 1) {
        fadeToNext(currentIndex + 1)
      } else if (translationY > threshold && currentIndex > 0) {
        fadeToNext(currentIndex - 1)
      }
    }
  }

  const SectionComponent = sections[currentIndex]

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange} // <-- c'est ici qu'on gère le swipe
    >
      <Animated.View style={[styles.container, { opacity }]}>
        <SectionComponent />
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
