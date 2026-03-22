import { Linking } from 'react-native'

import { api } from './api'
import { API_BASE_URL } from '@/utils/apiBaseUrl'

export type PortfolioDocument = {
  _id: string
  kind: 'cv'
  name: string
  url: string
  pathname: string
  contentType: string
  size: number
  downloadCount: number
  lastDownloadedAt?: string
  createdAt: string
  updatedAt: string
}

export const getDocumentMeta = async (): Promise<PortfolioDocument | null> => {
  try {
    const res = await api.get('/docs/meta')
    return res.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null
    }

    throw error
  }
}

export const downloadDocument = async () => {
  await Linking.openURL(`${API_BASE_URL}/docs`)
}
