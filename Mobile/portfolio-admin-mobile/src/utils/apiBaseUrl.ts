import Constants from 'expo-constants'
import { Platform } from 'react-native'

const DEV_API_PORT = '3000'
const PROD_API_BASE_URL = 'https://donovan-dev-web.vercel.app/api'

const getExpoHost = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.expoGoConfig?.debuggerHost ??
    Constants.manifest2?.extra?.expoClient?.hostUri

  if (!hostUri) {
    return null
  }

  return hostUri.split(':')[0] || null
}

const getDevApiBaseUrl = () => {
  const expoHost = getExpoHost()

  if (expoHost) {
    return `http://${expoHost}:${DEV_API_PORT}/api`
  }

  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${DEV_API_PORT}/api`
  }

  return `http://localhost:${DEV_API_PORT}/api`
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  (__DEV__ ? getDevApiBaseUrl() : PROD_API_BASE_URL)
