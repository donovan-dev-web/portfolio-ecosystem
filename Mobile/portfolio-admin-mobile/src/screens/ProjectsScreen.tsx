// src/screens/ProjectsScreen.tsx

import { View } from 'react-native'
import { useState } from 'react'

import { globalStyles } from '@/styles/global'

import TopTabs from '../components/Projet/TopTabs'
import TagsTab from '../components/Projet/TagsTab'
import ProjectsTab from '../components/Projet/ProjectsTab'

export default function ProjectsScreen() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <View style={globalStyles.screen}>
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
