import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './BottomTabs'
import { navigationRef } from './navigationRef'

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <BottomTabs />
    </NavigationContainer>
  )
}
