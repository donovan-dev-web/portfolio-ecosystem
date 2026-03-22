import { Text, View } from 'react-native'
import { useState } from 'react'

import TopTabs from '../components/Projet/TopTabs'
import TagsTab from '../components/Projet/TagsTab'
import ProjectsTab from '../components/Projet/ProjectsTab'

export default function ProjectsScreen() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        padding: 20,
        paddingBottom: 120,
      }}
    >
      <View style={{ width: '100%' }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 28,
            fontWeight: '700',
          }}
        >
          Gestion des projets
        </Text>
        <Text
          style={{
            color: '#acacba',
            marginTop: 8,
            lineHeight: 22,
          }}
        >
          Reprends la meme logique que l’application desktop avec une lecture
          mobile plus simple, axee sur le suivi, l’ordre d’affichage et la
          consultation des contenus.
        </Text>
      </View>

      <TopTabs
        tabs={[
          { key: 'projects', title: 'Projects' },
          { key: 'tags', title: 'Tags' },
        ]}
        onChange={setActiveTab}
      />

      {activeTab === 'projects' && <ProjectsTab />}

      {activeTab === 'tags' && <TagsTab />}
    </View>
  )
}
