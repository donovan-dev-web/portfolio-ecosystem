import { Alert, Image, Pressable, Text, View } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { Project } from '@/types/projectType'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useProjects } from '@/context/Project/useProjects'

type Props = {
  project: Project
  index: number
  onDragStart: () => void
  onDragEnd: () => void
}

export default function ProjectItem({
  project,
  index,
  onDragStart,
  onDragEnd,
}: Props) {
  const navigation = useNavigation<any>()
  const { deleteProject } = useProjects()
  const [isDragReady, setIsDragReady] = useState(false)

  const handleDelete = () => {
    Alert.alert(
      'Supprimer le projet',
      `Confirmer la suppression de "${project.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProject(project._id)
            } catch (error) {
              console.error('Erreur suppression projet:', error)
            }
          },
        },
      ],
    )
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 14,
        borderWidth: 1,
        borderColor: isDragReady ? '#725bef' : 'rgba(255,255,255,0.08)',
        borderRadius: 20,
        alignItems: 'flex-start',
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.045)',
      }}
    >
      <Pressable
        onLongPress={() => {
          setIsDragReady(true)
          onDragStart()
        }}
        onPressOut={() => {
          setIsDragReady(false)
          onDragEnd()
        }}
        delayLongPress={150}
        style={{
          padding: 8,
          marginTop: 8,
          borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        <Ionicons name="reorder-three" size={22} color="#b7afd7" />
      </Pressable>

      <Text
        style={{
          width: 28,
          color: '#d3cfff',
          marginLeft: 8,
          marginTop: 16,
          fontWeight: '700',
        }}
      >
        {index + 1}
      </Text>

      <Image
        source={{ uri: project.coverImage.medium }}
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          marginHorizontal: 12,
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, marginRight: 10 }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 15,
            marginBottom: 6,
          }}
        >
          {project.title}
        </Text>

        <Text
          style={{
            color: '#b8b8c6',
            fontSize: 13,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {project.shortDescription}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 10 }}>
        <Pressable
          onPress={() =>
            navigation.navigate('ProjectDetails', {
              id: project._id,
            })
          }
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(114, 91, 239, 0.16)',
            borderWidth: 1,
            borderColor: 'rgba(114, 91, 239, 0.34)',
          }}
        >
          <Ionicons name="eye-outline" size={18} color="#d9d4ff" />
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(221, 76, 76, 0.15)',
            borderWidth: 1,
            borderColor: 'rgba(221, 76, 76, 0.28)',
          }}
        >
          <AntDesign name="delete" size={18} color="#aa4444" />
        </Pressable>
      </View>
    </View>
  )
}
