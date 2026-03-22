import { Text, View } from 'react-native'
import Collapse from '../Projet/Collapse'
import { useProjects } from '@/context/Project/useProjects'

export default function TagsTab() {
  const { technologies, languages, projectTypes, loading } = useProjects()

  if (loading) {
    return <Text style={{ color: '#888' }}>Chargement des tags...</Text>
  }

  const renderTagList = (items: any[]) =>
    items.map((item: any) => (
      <View
        key={item._id}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 14,
          marginBottom: 8,
          backgroundColor: 'rgba(255,255,255,0.045)',
        }}
      >
        <Text style={{ color: '#f3f3f8', fontWeight: '600' }}>{item.name}</Text>
        {item.icon ? (
          <Text style={{ color: '#9a9ab0', fontSize: 12 }}>{item.icon}</Text>
        ) : null}
      </View>
    ))

  return (
    <View style={{ flex: 1, width: '100%' }}>
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
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 6,
          }}
        >
          Bibliotheque de tags
        </Text>
        <Text
          style={{
            color: '#b8b8c6',
            lineHeight: 20,
          }}
        >
          Consulte les tags disponibles pour les technologies, les langages et
          les types de projet afin de garder une vue claire sur la taxonomie du
          portfolio.
        </Text>
      </View>

      <Collapse title="Technologies">{renderTagList(technologies)}</Collapse>
      <Collapse title="Languages">{renderTagList(languages)}</Collapse>
      <Collapse title="Project Types">{renderTagList(projectTypes)}</Collapse>
    </View>
  )
}
