import { Linking, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/screens/HomeScreen'
import ProjectsScreen from '@/screens/ProjectsScreen'
import ProjectsStack from './ProjectsStack'
import MessagesScreen from '@/screens/MessagesScreen'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const Tab = createBottomTabNavigator()

// 🔹 Gradient et couleurs des boutons
const BUTTON_GRADIENT_ACTIVE = ['#83007c69', '#00000000', '#83007c69'] as const
const BUTTON_GRADIENT_INACTIVE = [
  '#00000000',
  '#2c2c2c4f',
  '#00000000',
] as const

export default function BottomTabs() {
  const tabs = [
    {
      name: 'Home',
      icon: <Ionicons name="home-outline" />,
      component: HomeScreen,
    },
    {
      name: 'Projects',
      icon: <Ionicons name="folder-open-outline" />,
      component: ProjectsStack,
    },
    {
      name: 'Messages',
      icon: <AntDesign name="message" />,
      component: MessagesScreen,
    },
    {
      name: 'Website',
      icon: <AntDesign name="export" />,
      component: HomeScreen,
      external: true,
      url: 'https://www.donovan-dev3d.vercel.app',
    },
  ]

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#020202',
          borderWidth: 1,
          borderColor: '#555',
          borderRadius: 20,
          elevation: 0,
          height: 60,
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 50,
          zIndex: 1,
        },
        tabBarShowLabel: false,
      }}
    >
      {tabs.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            sceneStyle: { backgroundColor: 'none' },
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* Label au-dessus, positionné absolument */}
                {focused && (
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 45, // distance au-dessus de l'icône
                      color: '#888',
                      fontWeight: '600',
                      fontSize: 13,
                      width: 80,
                      textAlign: 'center',
                      borderWidth: 1,
                      borderColor: '#725bef',
                      borderRadius: 15,
                    }}
                  >
                    {item.name}
                  </Text>
                )}
                <LinearGradient
                  colors={
                    focused ? BUTTON_GRADIENT_ACTIVE : BUTTON_GRADIENT_INACTIVE
                  }
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: focused ? '#725bef' : '#4e4e4e',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    size: 24,
                    color: focused ? '#725bef' : '#555',
                  })}
                </LinearGradient>
              </View>
            ),
          }}
          listeners={
            item.external
              ? {
                  tabPress: (e) => {
                    e.preventDefault() // empêche la navigation
                    Linking.openURL(item.url!)
                  },
                }
              : undefined
          }
        />
      ))}
    </Tab.Navigator>
  )
}
