import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { useProjects } from '@/context/Project/useProjects'
import { getProjectById } from '../services/ProjectService'
import { Project, TagReference } from '@/types/projectType'

type RouteParams = {
  id: string
}

export default function ProjectDetailsScreen() {
  const navigation = useNavigation<any>()
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
      const existing = projects.find((item) => item._id === id)

      if (existing) {
        setProject(existing)
        return
      }

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
          backgroundColor: 'transparent',
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

  const resolveTagName = (value: string | TagReference | undefined) => {
    if (!value) return null
    if (typeof value === 'string') return value
    return value.name || value._id || null
  }

  const resolveTagList = (items: Array<string | TagReference> | undefined) =>
    (items || [])
      .map((item) => resolveTagName(item))
      .filter((item): item is string => Boolean(item))

  const projectType = resolveTagName(project.projectType)
  const technologies = resolveTagList(project.technologies)
  const languages = resolveTagList(project.languages)
  const coverImage = project.coverImage.large || project.coverImage.medium

  const presentationSections = [
    {
      title: 'Presentation',
      content:
        project.presentation?.description || project.shortDescription || null,
    },
    { title: 'Contexte', content: project.presentation?.context || null },
    { title: 'Objectifs', content: project.presentation?.objectives || null },
    { title: 'Competences', content: project.presentation?.skills || null },
    { title: 'Resultats', content: project.presentation?.results || null },
    {
      title: 'Ameliorations',
      content: project.presentation?.improvements || null,
    },
  ].filter((section) => section.content)

  const metadata = [
    projectType ? { label: 'Type', value: projectType } : null,
    technologies.length
      ? { label: 'Technologies', value: technologies.join(' • ') }
      : null,
    languages.length
      ? { label: 'Langages', value: languages.join(' • ') }
      : null,
    { label: 'Ordre', value: String(project.order) },
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.045)',
        }}
      >
        <Ionicons name="chevron-back" size={16} color="#d9d4ff" />
        <Text
          style={{
            color: '#f2f2f7',
            fontWeight: '700',
          }}
        >
          Retour aux projets
        </Text>
      </Pressable>

      <View
        style={{
          borderRadius: 24,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.045)',
          overflow: 'hidden',
          marginBottom: 18,
        }}
      >
        <Image
          source={{ uri: coverImage }}
          style={{
            width: '100%',
            height: 220,
          }}
          resizeMode="cover"
        />

        <View style={{ padding: 18 }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 26,
              fontWeight: '700',
              marginBottom: 10,
            }}
          >
            {project.title}
          </Text>

          <Text
            style={{
              color: '#b8b8c6',
              fontSize: 15,
              lineHeight: 23,
            }}
          >
            {project.shortDescription}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginBottom: 18,
          padding: 18,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.045)',
          gap: 10,
        }}
      >
        {metadata.map((item, index) => (
          <View
            key={`${item.label}-${item.value}`}
            style={{
              paddingBottom: index === metadata.length - 1 ? 0 : 10,
              borderBottomWidth: index === metadata.length - 1 ? 0 : 1,
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
            <Text style={{ color: '#f2f2f7', lineHeight: 21 }}>{item.value}</Text>
          </View>
        ))}
      </View>

      {presentationSections.map((section) => (
        <View
          key={section.title}
          style={{
            marginBottom: 16,
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
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 10,
            }}
          >
            {section.title}
          </Text>
          <Text style={{ color: '#b8b8c6', lineHeight: 22 }}>
            {section.content}
          </Text>
        </View>
      ))}
    </ScrollView>
  )
}
