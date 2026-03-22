import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import {
  downloadDocument,
  getDocumentMeta,
  type PortfolioDocument,
} from '@/services/documentsService'

function formatDate(value?: string) {
  if (!value) return 'Aucune'
  return new Date(value).toLocaleString('fr-FR')
}

function formatSize(size?: number) {
  if (!size) return '0 Ko'

  const kiloBytes = size / 1024

  if (kiloBytes < 1024) {
    return `${kiloBytes.toFixed(1)} Ko`
  }

  return `${(kiloBytes / 1024).toFixed(2)} Mo`
}

export default function DocumentsScreen() {
  const [documentMeta, setDocumentMeta] = useState<PortfolioDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasDocument = !!documentMeta

  const loadDocumentMeta = async () => {
    setLoading(true)
    setError(null)

    try {
      const doc = await getDocumentMeta()
      setDocumentMeta(doc)
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Impossible de recuperer les informations du document',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocumentMeta()
  }, [])

  const handleDownload = async () => {
    setDownloading(true)

    try {
      await downloadDocument()
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Impossible de telecharger le document',
      )
    } finally {
      setDownloading(false)
    }
  }

  const metaItems = documentMeta
    ? [
        { label: 'Nom du fichier', value: documentMeta.name },
        { label: 'Type', value: documentMeta.contentType },
        { label: 'Taille', value: formatSize(documentMeta.size) },
        { label: 'Telechargements', value: String(documentMeta.downloadCount) },
        { label: 'Date de creation', value: formatDate(documentMeta.createdAt) },
        {
          label: 'Derniere mise a jour',
          value: formatDate(documentMeta.updatedAt),
        },
        {
          label: 'Dernier telechargement',
          value: formatDate(documentMeta.lastDownloadedAt),
        },
        { label: 'Chemin blob', value: documentMeta.pathname },
      ]
    : []

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
    >
      <View
        style={{
          marginBottom: 18,
          padding: 18,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.045)',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 28,
            fontWeight: '700',
          }}
        >
          Document courant
        </Text>
        <Text
          style={{
            color: '#acacba',
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Consulte les metadonnees du CV actuellement publie et telecharge-le
          rapidement si tu as besoin de verifier le fichier diffuse.
        </Text>
      </View>

      <View
        style={{
          marginBottom: 18,
          padding: 18,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.045)',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            CV PDF
          </Text>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: hasDocument
                ? 'rgba(40, 167, 69, 0.16)'
                : 'rgba(255,255,255,0.08)',
              borderWidth: 1,
              borderColor: hasDocument
                ? 'rgba(40, 167, 69, 0.26)'
                : 'rgba(255,255,255,0.08)',
            }}
          >
            <Text
              style={{
                color: hasDocument ? '#dff7e8' : '#f4f2ff',
                fontSize: 12,
                fontWeight: '700',
              }}
            >
              {hasDocument ? 'Disponible' : 'Aucun document'}
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={{ paddingVertical: 30, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#725bef" />
          </View>
        ) : documentMeta ? (
          <View style={{ gap: 12 }}>
            {metaItems.map((item, index) => (
              <View
                key={`${item.label}-${index}`}
                style={{
                  paddingBottom: index === metaItems.length - 1 ? 0 : 12,
                  borderBottomWidth: index === metaItems.length - 1 ? 0 : 1,
                  borderBottomColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <Text
                  style={{
                    color: '#9a9ab0',
                    fontSize: 12,
                    fontWeight: '700',
                    marginBottom: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ color: '#f2f2f7', lineHeight: 21 }}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text
            style={{
              color: '#b8b8c6',
              lineHeight: 22,
            }}
          >
            Aucun CV n’est enregistre pour le moment.
          </Text>
        )}
      </View>

      {error ? (
        <View
          style={{
            marginBottom: 16,
            padding: 14,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(221, 76, 76, 0.28)',
            backgroundColor: 'rgba(221, 76, 76, 0.12)',
          }}
        >
          <Text style={{ color: '#ffd0d0', lineHeight: 20 }}>{error}</Text>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable
          onPress={loadDocumentMeta}
          disabled={loading}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.045)',
          }}
        >
          <Ionicons name="refresh-outline" size={18} color="#f2f2f7" />
          <Text style={{ color: '#f2f2f7', fontWeight: '700' }}>
            Actualiser
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDownload}
          disabled={!documentMeta || downloading}
          style={{
            flex: 1.2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(114, 91, 239, 0.34)',
            backgroundColor: !documentMeta
              ? 'rgba(255,255,255,0.045)'
              : 'rgba(114, 91, 239, 0.18)',
            opacity: !documentMeta ? 0.5 : 1,
          }}
        >
          <Ionicons name="download-outline" size={18} color="#f2f2f7" />
          <Text style={{ color: '#f2f2f7', fontWeight: '700' }}>
            {downloading ? 'Ouverture...' : 'Recuperer le document'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
