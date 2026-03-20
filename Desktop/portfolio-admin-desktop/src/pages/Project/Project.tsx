import { useState, useEffect, useRef } from 'react'
import { useProjects } from '../../context/useProjects'
import { Gallery } from '../../components/Project/Gallery/Gallery'
import { Collapse } from '../../components/Project/Collapse/Collapse'
import { ProjectModal } from '../../components/Project/ProjectFormModal/ProjectModal'
import style from './Project.module.scss'
import { type Project as ProjectType } from '../../types/project'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { ToastContainer, toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

type TagItem = {
  _id: string
  name: string
  icon: string
}

type TagSection = 'languages' | 'technologies' | 'projectTypes'

export function Project() {
  const {
    projects,
    technologies,
    languages,
    projectTypes,
    loading,
    reorderProjects,
    createTechnology,
    updateTechnology,
    createLanguage,
    updateLanguage,
    createProjectType,
    updateProjectType,
    deleteTechnologyTag,
    deleteLanguageTag,
    deleteProjectTypeTag,
  } = useProjects()

  const [activeTab, setActiveTab] = useState<'projects' | 'tags'>('projects')
  const [localProjects, setLocalProjects] = useState<ProjectType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTagName, setNewTagName] = useState<Record<TagSection, string>>({
    languages: '',
    technologies: '',
    projectTypes: '',
  })
  const [newTagIcon, setNewTagIcon] = useState<Record<TagSection, string>>({
    languages: '',
    technologies: '',
    projectTypes: '',
  })
  const [editingTagId, setEditingTagId] = useState<
    Record<TagSection, string | null>
  >({
    languages: null,
    technologies: null,
    projectTypes: null,
  })
  const [editingTagName, setEditingTagName] = useState<
    Record<TagSection, string>
  >({
    languages: '',
    technologies: '',
    projectTypes: '',
  })
  const [editingTagIcon, setEditingTagIcon] = useState<
    Record<TagSection, string>
  >({
    languages: '',
    technologies: '',
    projectTypes: '',
  })
  const [isAddingTag, setIsAddingTag] = useState<Record<TagSection, boolean>>({
    languages: false,
    technologies: false,
    projectTypes: false,
  })
  const [isRenamingTag, setIsRenamingTag] = useState<
    Record<TagSection, boolean>
  >({
    languages: false,
    technologies: false,
    projectTypes: false,
  })
  const [isDeletingTag, setIsDeletingTag] = useState<
    Record<TagSection, boolean>
  >({
    languages: false,
    technologies: false,
    projectTypes: false,
  })

  const prevProjectsRef = useRef<ProjectType[]>([])

  // 🔹 Sync avec le context uniquement si les projects ont changé
  useEffect(() => {
    if (Array.isArray(projects) && projects !== prevProjectsRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setLocalProjects(projects)
      prevProjectsRef.current = projects
    }
  }, [projects])

  if (loading) return <p>Chargement...</p>

  // 🔹 Drag & Drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(localProjects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setLocalProjects(updatedItems)
  }

  // 🔹 Appliquer les changements
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reorderProjects(localProjects)
  }

  const handleAddTag = async (section: TagSection) => {
    const name = newTagName[section].trim()
    const icon = newTagIcon[section].trim()

    if (!name) {
      toast.error('Le nom est obligatoire')
      return
    }

    if (!icon) {
      toast.error("L'icône est obligatoire")
      return
    }

    setIsAddingTag((prev) => ({ ...prev, [section]: true }))

    try {
      if (section === 'languages') await createLanguage({ name, icon })
      if (section === 'technologies') await createTechnology({ name, icon })
      if (section === 'projectTypes') await createProjectType({ name, icon })

      setNewTagName((prev) => ({ ...prev, [section]: '' }))
      setNewTagIcon((prev) => ({ ...prev, [section]: '' }))
    } finally {
      setIsAddingTag((prev) => ({ ...prev, [section]: false }))
    }
  }

  const startRename = (section: TagSection, tag: TagItem) => {
    setEditingTagId((prev) => ({ ...prev, [section]: tag._id }))
    setEditingTagName((prev) => ({ ...prev, [section]: tag.name }))
    setEditingTagIcon((prev) => ({ ...prev, [section]: tag.icon || '' }))
  }

  const cancelRename = (section: TagSection) => {
    setEditingTagId((prev) => ({ ...prev, [section]: null }))
    setEditingTagName((prev) => ({ ...prev, [section]: '' }))
    setEditingTagIcon((prev) => ({ ...prev, [section]: '' }))
  }

  const handleRenameTag = async (section: TagSection) => {
    const id = editingTagId[section]
    const name = editingTagName[section].trim()
    const icon = editingTagIcon[section].trim()

    if (!id) return

    if (!name) {
      toast.error('Le nom est obligatoire')
      return
    }

    if (!icon) {
      toast.error("L'icône est obligatoire")
      return
    }

    setIsRenamingTag((prev) => ({ ...prev, [section]: true }))

    try {
      if (section === 'languages') await updateLanguage(id, { name, icon })
      if (section === 'technologies') await updateTechnology(id, { name, icon })
      if (section === 'projectTypes')
        await updateProjectType(id, { name, icon })
      cancelRename(section)
    } finally {
      setIsRenamingTag((prev) => ({ ...prev, [section]: false }))
    }
  }

  const handleDeleteTag = async (section: TagSection, tag: TagItem) => {
    if (!window.confirm(`Supprimer "${tag.name}" ?`)) return

    setIsDeletingTag((prev) => ({ ...prev, [section]: true }))

    try {
      if (section === 'languages') await deleteLanguageTag(tag._id)
      if (section === 'technologies') await deleteTechnologyTag(tag._id)
      if (section === 'projectTypes') await deleteProjectTypeTag(tag._id)

      if (editingTagId[section] === tag._id) {
        cancelRename(section)
      }
    } finally {
      setIsDeletingTag((prev) => ({ ...prev, [section]: false }))
    }
  }

  const renderTagContent = (section: TagSection, items: TagItem[]) => (
    <div className={style.tagPanel}>
      <ul className={style.tagList}>
        {items.map((item) => {
          const isEditing = editingTagId[section] === item._id

          return (
            <li key={item._id} className={style.tagItem}>
              {isEditing ? (
                <div className={style.tagEditor}>
                  <input
                    value={editingTagName[section]}
                    onChange={(e) =>
                      setEditingTagName((prev) => ({
                        ...prev,
                        [section]: e.target.value,
                      }))
                    }
                    placeholder="Nouveau nom"
                  />
                  <input
                    value={editingTagIcon[section]}
                    onChange={(e) =>
                      setEditingTagIcon((prev) => ({
                        ...prev,
                        [section]: e.target.value,
                      }))
                    }
                    placeholder="Icône"
                  />
                  <div className={style.tagActions}>
                    <button
                      type="button"
                      onClick={() => handleRenameTag(section)}
                      disabled={isRenamingTag[section]}
                    >
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      onClick={() => cancelRename(section)}
                      disabled={isRenamingTag[section]}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.tagRow}>
                  <span>{item.name}</span>
                  <div className={style.tagRowActions}>
                    <button
                      type="button"
                      onClick={() => startRename(section, item)}
                      disabled={
                        isRenamingTag[section] || isDeletingTag[section]
                      }
                    >
                      Renommer
                    </button>
                    <button
                      type="button"
                      className={style.deleteTagBtn}
                      onClick={() => handleDeleteTag(section, item)}
                      disabled={
                        isDeletingTag[section] || isRenamingTag[section]
                      }
                      aria-label={`Supprimer ${item.name}`}
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <div className={style.tagCreate}>
        <input
          value={newTagName[section]}
          onChange={(e) =>
            setNewTagName((prev) => ({ ...prev, [section]: e.target.value }))
          }
          placeholder="Nom du tag"
        />
        <input
          value={newTagIcon[section]}
          onChange={(e) =>
            setNewTagIcon((prev) => ({ ...prev, [section]: e.target.value }))
          }
          placeholder="Icône"
        />
        <button
          type="button"
          onClick={() => handleAddTag(section)}
          disabled={isAddingTag[section]}
        >
          {isAddingTag[section] ? 'Ajout...' : 'Ajouter'}
        </button>
      </div>
    </div>
  )

  return (
    <section className={style.container}>
      <div className={style.header}>
        <div>
          <h1 className={style.title}>Gestion des projets</h1>
          <p className={style.subtitle}>
            Reordonne les projets, ouvre les fiches detaillees et gere l
            ensemble des tags depuis une interface harmonisee.
          </p>
        </div>
      </div>

      <div className={style.tabs}>
        <button
          className={activeTab === 'projects' ? style.active : ''}
          onClick={() => setActiveTab('projects')}
        >
          Projets
        </button>
        <button
          className={activeTab === 'tags' ? style.active : ''}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
      </div>

      <div className={style.tabContent}>
        {activeTab === 'projects' && (
          <div className={style.projectsPanel}>
            <div className={style.toolbar}>
              <button
                type="button"
                className={style.newProjectBtn}
                onClick={() => setIsModalOpen(true)}
              >
                Nouveau projet
              </button>
              <button
                type="button"
                className={style.applyBtn}
                onClick={handleApply}
              >
                Appliquer les modifications
              </button>
            </div>

            <ProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            <DragDropContext onDragEnd={handleDragEnd}>
              <Gallery projects={localProjects} />
            </DragDropContext>
          </div>
        )}

        {activeTab === 'tags' && (
          <div className={style.tagsContainer}>
            <Collapse title="Languages">
              {renderTagContent('languages', languages as TagItem[])}
            </Collapse>
            <Collapse title="Technologies">
              {renderTagContent('technologies', technologies as TagItem[])}
            </Collapse>
            <Collapse title="Project Types">
              {renderTagContent('projectTypes', projectTypes as TagItem[])}
            </Collapse>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  )
}
