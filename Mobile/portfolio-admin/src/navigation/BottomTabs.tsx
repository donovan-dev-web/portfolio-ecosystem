import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@/screens/HomeScreen'
import ProjectsScreen from '@/screens/ProjectsScreen'
import MessagesScreen from '@/screens/MessagesScreen'
import { Ionicons, AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [{ backgroundColor: 'none' }],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          sceneStyle: { backgroundColor: 'none' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          sceneStyle: { backgroundColor: 'none' },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder-open-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          sceneStyle: { backgroundColor: 'none' },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
