import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import DragList, { DragListRenderItemInfo } from 'react-native-draglist'

import { useProjects } from '@/context/Project/useProjects'
import { Project } from '@/types/projectType'

import ProjectItem from './ProjectItem'
import ApplyChangesButton from './ApplyChangesButton'

export default function ProjectsTab() {
  const { projects, reorderProjects } = useProjects()

  const [localProjects, setLocalProjects] = useState<Project[]>([])
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    setLocalProjects(projects)
  }, [projects])

  const renderItem = ({
    item,
    index,
    onDragStart,
    onDragEnd,
  }: DragListRenderItemInfo<Project>) => (
    <ProjectItem
      project={item}
      index={index}
      onDragStart={onDragStart ?? (() => {})}
      onDragEnd={onDragEnd ?? (() => {})}
    />
  )

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const updated = [...localProjects]
    const moved = updated.splice(fromIndex, 1)[0]
    updated.splice(toIndex, 0, moved)

    setLocalProjects(updated)
    setHasChanged(true)
  }

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
          Catalogue projets
        </Text>
        <Text
          style={{
            color: '#b8b8c6',
            lineHeight: 20,
          }}
        >
          Reorganise l’ordre d’affichage, consulte le detail d’un projet et
          supprime les entrees qui ne doivent plus apparaitre.
        </Text>
      </View>

      <DragList
        data={localProjects}
        keyExtractor={(item: { _id: any }) => item._id}
        renderItem={renderItem}
        onReordered={handleReorder}
      />

      {hasChanged && (
        <ApplyChangesButton
          onPress={() => {
            reorderProjects(localProjects)
            setHasChanged(false)
          }}
        />
      )}
    </View>
  )
}
