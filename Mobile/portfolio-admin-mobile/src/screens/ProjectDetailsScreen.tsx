// src/screens/ProjectDetailsScreen.tsx

import { View, Text, Image, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { useProjects } from '@/context/Project/useProjects'
import { getProjectById } from '../services/ProjectService'
import { Project } from '@/types/projectType'

type RouteParams = {
  id: string
}

export default function ProjectDetailsScreen() {
  const route = useRoute()
  const { id } = route.params as RouteParams

  const { projects } = useProjects()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProject()
  }, [])

  const loadProject = async () => {
    try {
      // 1️⃣ Cherche dans le context
      const existing = projects.find((p) => p._id === id)

      if (existing) {
        setProject(existing)
        return
      }

      // 2️⃣ fallback API
      const fetched = await getProjectById(id)
      setProject(fetched)
    } catch (error) {
      console.error('Erreur chargement projet:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'none',
        }}
      >
        <ActivityIndicator size="large" color="#725bef" />
      </View>
    )
  }

  if (!project) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: '#fff' }}>Projet introuvable</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'none' }}>
      <Image
        source={{ uri: project.coverImage }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 12,
          marginBottom: 20,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 10,
        }}
      >
        {project.title}
      </Text>

      <Text
        style={{
          color: '#aaa',
          fontSize: 16,
        }}
      >
        {project.shortDescription}
      </Text>

      <Text
        style={{
          color: '#666',
          marginTop: 10,
        }}
      >
        Order: {project.order}
      </Text>
    </View>
  )
}
