import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Dimensions, Animated } from 'react-native'
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg'

const { width, height } = Dimensions.get('window')

export function Background() {
  const pulse = useRef(new Animated.Value(0.08)).current

  return (
    <View style={styles.wrapper} pointerEvents="none">
      {/* ===== HALOS (radial only, très diffus, très sombres) ===== */}

      <View style={[styles.orb, styles.violet]}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="violetGrad" cx="50%" cy="50%" r="75%">
              <Stop offset="0%" stopColor="#2B1A5A" stopOpacity="0.09" />
              <Stop offset="55%" stopColor="#2B1A5A" stopOpacity="0.02" />
              <Stop offset="100%" stopColor="#2B1A5A" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#violetGrad)" />
        </Svg>
      </View>

      <View style={[styles.orb, styles.blue]}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="blueGrad" cx="50%" cy="50%" r="75%">
              <Stop offset="0%" stopColor="#0F1A3A" stopOpacity="0.1" />
              <Stop offset="55%" stopColor="#0F1A3A" stopOpacity="0.03" />
              <Stop offset="100%" stopColor="#0F1A3A" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#blueGrad)" />
        </Svg>
      </View>

      <View style={[styles.orb, styles.metallic]}>
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="metalGrad" cx="50%" cy="50%" r="75%">
              <Stop offset="0%" stopColor="#2A2A4A" stopOpacity="0.07" />
              <Stop offset="55%" stopColor="#2A2A4A" stopOpacity="0.01" />
              <Stop offset="100%" stopColor="#2A2A4A" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#metalGrad)" />
        </Svg>
      </View>

      {/* ===== PETITE GRILLE GRISE (60px, très subtile) ===== */}
      <Svg width={width} height={height} style={styles.smallGrid}>
        <Defs>
          <LinearGradient id="smallGrid" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="rgba(90,90,110,0.08)" />
            <Stop offset="1" stopColor="rgba(60,60,80,0.02)" />
          </LinearGradient>
        </Defs>

        {Array.from({ length: Math.ceil(width / 60) }).map((_, i) => (
          <Rect
            key={`sv-${i}`}
            x={i * 60}
            y={0}
            width={1}
            height={height}
            fill="url(#smallGrid)"
            opacity={0.08}
          />
        ))}

        {Array.from({ length: Math.ceil(height / 60) }).map((_, i) => (
          <Rect
            key={`sh-${i}`}
            x={0}
            y={i * 60}
            width={width}
            height={1}
            fill="url(#smallGrid)"
            opacity={0.08}
          />
        ))}
      </Svg>

      {/* ===== GRANDE GRILLE (120px) + FADE RADIAL + PULSATION ===== */}
      <Animated.View style={[styles.bigGridContainer, { opacity: 0.1 }]}>
        <Svg width={width} height={height}>
          <Defs>
            <RadialGradient id="fadeMask" cx="50%" cy="50%" r="65%">
              <Stop offset="0%" stopColor="white" stopOpacity="0.45" />
              <Stop offset="60%" stopColor="white" stopOpacity="0.15" />
              <Stop offset="100%" stopColor="white" stopOpacity="0" />
            </RadialGradient>

            <LinearGradient id="bigGrid" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="rgba(110,120,255,0.20)" />
              <Stop offset="1" stopColor="rgba(70,80,200,0.06)" />
            </LinearGradient>
          </Defs>

          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#fadeMask)"
          />

          {Array.from({ length: Math.ceil(width / 120) }).map((_, i) => (
            <Rect
              key={`bv-${i}`}
              x={i * 120}
              y={0}
              width={1}
              height={height}
              fill="url(#bigGrid)"
              opacity={0.25}
            />
          ))}

          {Array.from({ length: Math.ceil(height / 120) }).map((_, i) => (
            <Rect
              key={`bh-${i}`}
              x={0}
              y={i * 120}
              width={width}
              height={1}
              fill="url(#bigGrid)"
              opacity={0.25}
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#090B12',
  },

  orb: {
    position: 'absolute',
    borderRadius: 999,
    overflow: 'hidden',
  },

  violet: {
    left: '22%',
    top: '18%',
    width: 600,
    height: 600,
  },

  blue: {
    right: '18%',
    bottom: '16%',
    width: 520,
    height: 520,
  },

  metallic: {
    right: '33%',
    top: '50%',
    width: 420,
    height: 420,
  },

  smallGrid: {
    position: 'absolute',
  },

  bigGridContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})
