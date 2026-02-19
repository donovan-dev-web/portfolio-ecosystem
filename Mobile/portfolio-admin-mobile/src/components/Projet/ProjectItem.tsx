import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { Project } from '@/types/projectType'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

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
  const [isDragReady, setIsDragReady] = useState(false)

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 12,
        borderWidth: 2, // bordure par défaut
        borderColor: isDragReady ? '#725bef' : '#333', // couleur change quand drag prêt
        borderRadius: 8,
        alignItems: 'flex-start',
        marginBottom: 5,
      }}
    >
      {/* Handler */}
      <Pressable
        onLongPress={() => {
          setIsDragReady(true) // drag prêt
          onDragStart()
        }}
        onPressOut={() => {
          setIsDragReady(false) // drag terminé ou annulé
          onDragEnd()
        }}
        delayLongPress={150} // tu peux ajuster
        style={{ padding: 5 }}
      >
        <Ionicons name="reorder-three" size={22} color="#888" />
      </Pressable>

      {/* Order */}
      <Text style={{ width: 25, color: '#aaa', marginLeft: 5 }}>
        {index + 1}
      </Text>

      {/* Image */}
      <Image
        source={{ uri: project.coverImage }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 6,
          marginHorizontal: 10,
        }}
        resizeMode="cover"
      />

      {/* Title + Description */}
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
            marginBottom: 4,
          }}
        >
          {project.title}
        </Text>

        <Text
          style={{
            color: '#ccc',
            fontSize: 13,
          }}
          numberOfLines={2}
        >
          {project.shortDescription}
        </Text>
      </View>

      {/* Actions */}
      <View style={{ alignItems: 'flex-end' }}>
        <Pressable
          onPress={() =>
            navigation.navigate('ProjectDetails', {
              id: project._id,
            })
          }
          style={{ marginBottom: 8 }}
        >
          <Text style={{ color: '#725bef', fontSize: 13 }}>Edit</Text>
        </Pressable>

        <Pressable>
          <AntDesign name="delete" size={18} color="#aa4444" />
        </Pressable>
      </View>
    </View>
  )
}
