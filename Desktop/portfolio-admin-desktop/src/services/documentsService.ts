import { api } from './api'

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

export const createDocument = async (file: File): Promise<PortfolioDocument> => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await api.post('/docs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export const updateDocument = async (file: File): Promise<PortfolioDocument> => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await api.put('/docs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}

export const deleteDocument = async (): Promise<void> => {
  await api.delete('/docs')
}

function extractFileName(contentDisposition?: string | null) {
  if (!contentDisposition) return 'cv.pdf'

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1])
  }

  const fallbackMatch = contentDisposition.match(/filename="([^"]+)"/i)
  if (fallbackMatch?.[1]) {
    return fallbackMatch[1]
  }

  return 'cv.pdf'
}

export const downloadDocument = async () => {
  const res = await api.get('/docs', {
    responseType: 'blob',
  })

  const blob = new Blob([res.data], {
    type: res.headers['content-type'] || 'application/pdf',
  })
  const fileName = extractFileName(res.headers['content-disposition'])
  const objectUrl = window.URL.createObjectURL(blob)
  const link = window.document.createElement('a')

  link.href = objectUrl
  link.download = fileName
  window.document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(objectUrl)
}
