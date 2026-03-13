// src/components/project/ProjectsTab.tsx

import { View } from 'react-native'
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
