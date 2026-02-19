// src/navigation/ProjectsStack.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ProjectsScreen from '@/screens/ProjectsScreen'
import ProjectDetailsScreen from '@/screens/ProjectDetailsScreen'

const Stack = createNativeStackNavigator()

export default function ProjectsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="ProjectsList" component={ProjectsScreen} />

      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
    </Stack.Navigator>
  )
}
