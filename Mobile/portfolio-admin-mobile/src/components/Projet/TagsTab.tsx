// src/components/project/TagsTab.tsx

import { Text, View } from 'react-native'
import Collapse from '../Projet/Collapse'
import { useProjects } from '@/context/Project/useProjects'

export default function TagsTab() {
  const { technologies, languages, projectTypes, loading } = useProjects()

  if (loading) {
    return <Text style={{ color: '#888' }}>Loading...</Text>
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'none' }}>
      <Collapse title="Technologies">
        {technologies.map((tech: any) => (
          <Text key={tech._id} style={{ color: '#ccc', paddingVertical: 4 }}>
            {tech.name}
          </Text>
        ))}
      </Collapse>

      <Collapse title="Languages">
        {languages.map((lang: any) => (
          <Text key={lang._id} style={{ color: '#ccc', paddingVertical: 4 }}>
            {lang.name}
          </Text>
        ))}
      </Collapse>

      <Collapse title="Project Types">
        {projectTypes.map((type: any) => (
          <Text key={type._id} style={{ color: '#ccc', paddingVertical: 4 }}>
            {type.name}
          </Text>
        ))}
      </Collapse>
    </View>
  )
}
