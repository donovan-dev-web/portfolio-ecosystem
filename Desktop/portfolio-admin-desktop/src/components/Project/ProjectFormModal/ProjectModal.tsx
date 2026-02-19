// src/components/Project/ProjectModal.tsx
import { useState } from 'react'
import style from './ProjectModal.module.scss'
import {
  type NewProjectForm,
  type GalleryItemForm,
} from '../../../types/newProjectForm'
import { useProjects } from '../../../context/useProjects'
import { toast } from 'react-toastify'
import { LucideX } from 'lucide-react' // icône pour fermer
import { createProject } from '../../../services/ProjectService'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ProjectModal = ({ isOpen, onClose }: Props) => {
  const { projectTypes, technologies, languages, projects } = useProjects()
  const [step, setStep] = useState(0)

  const [form, setForm] = useState<NewProjectForm>({
    title: '',
    projectType: '',
    technologies: [],
    languages: [],
    shortDescription: '',
    coverImage: '',
    githubUrl: '',
    isLive: false,
    liveUrl: '',
    stack: [],
    presentation: {
      description: '',
      context: '',
      objectives: '',
      skills: '',
      results: '',
      improvements: '',
    },
    gallery: [],
  })

  if (!isOpen) return null

  // 🔹 Handlers généraux
  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value })
  }

  const handlePresentationChange = (field: string, value: string) => {
    setForm({
      ...form,
      presentation: { ...form.presentation, [field]: value },
    })
  }

  const handleAddStack = () => setForm({ ...form, stack: [...form.stack, ''] })
  const handleStackChange = (index: number, value: string) => {
    const updated = [...form.stack]
    updated[index] = value
    setForm({ ...form, stack: updated })
  }
  const handleRemoveStack = (index: number) => {
    const updated = [...form.stack]
    updated.splice(index, 1)
    setForm({ ...form, stack: updated })
  }

  // 🔹 Gallery handlers
  const handleAddGalleryItem = () => {
    // On ne crée jamais de champ order pour la gallery
    const newItem: GalleryItemForm = {
      desktopUrl: '',
      mobileUrl: '',
      alt: '',
    }
    setForm({ ...form, gallery: [...form.gallery, newItem] })
  }

  const handleGalleryChange = (
    index: number,
    field: keyof GalleryItemForm,
    value: string,
  ) => {
    const updated = [...form.gallery]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, gallery: updated })
  }

  const handleRemoveGalleryItem = (index: number) => {
    const updated = [...form.gallery]
    updated.splice(index, 1)
    setForm({ ...form, gallery: updated })
  }

  // 🔹 Validation minimale
  const isStepValid = () => {
    if (step === 0)
      return (
        form.title &&
        form.projectType &&
        form.shortDescription &&
        form.coverImage
      )
    if (step === 1) return true
    if (step === 2) return form.gallery.length > 0
    return false
  }

  const handleNext = () => {
    if (!isStepValid()) {
      toast.error('Veuillez remplir les champs obligatoires')
      return
    }
    if (step < 2) setStep(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      // 🔹 Conserver l'order du projet
      // 🔹 Supprimer complètement order de la gallery avant envoi
      const sanitizedGallery = form.gallery.map(
        ({ desktopUrl, mobileUrl, alt }) => ({
          desktopUrl,
          mobileUrl,
          alt,
        }),
      )

      const projectToSend = {
        ...form,
        order: projects.length + 1, // order du projet conservé
        gallery: sanitizedGallery, // gallery sans order
      }

      await createProject(projectToSend)

      toast.success('Projet créé avec succès !')
      handleClose()
    } catch (err) {
      console.error('Erreur création project:', err)
      toast.error('Erreur lors de la création du projet')
    }
  }

  const handleClose = () => {
    setForm({
      title: '',
      projectType: '',
      technologies: [],
      languages: [],
      shortDescription: '',
      coverImage: '',
      githubUrl: '',
      isLive: false,
      liveUrl: '',
      stack: [],
      presentation: {
        description: '',
        context: '',
        objectives: '',
        skills: '',
        results: '',
        improvements: '',
      },
      gallery: [],
    })
    setStep(0)
    onClose()
  }

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalContent}>
        {/* Header */}
        <div className={style.modalHeader}>
          <h2>Nouveau Projet</h2>
          <button className={style.closeBtn} onClick={handleClose}>
            <LucideX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={style.modalBody}>
          {step === 0 && (
            <div className={style.step}>
              <input
                placeholder="Titre"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
              <select
                value={form.projectType}
                onChange={(e) => handleChange('projectType', e.target.value)}
              >
                <option value="">Choisir un type</option>
                {projectTypes.map((pt) => (
                  <option key={pt._id} value={pt._id}>
                    {pt.name}
                  </option>
                ))}
              </select>
              <select
                multiple
                value={form.technologies}
                onChange={(e) =>
                  handleChange(
                    'technologies',
                    Array.from(e.target.selectedOptions, (o) => o.value),
                  )
                }
              >
                {technologies.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <select
                multiple
                value={form.languages}
                onChange={(e) =>
                  handleChange(
                    'languages',
                    Array.from(e.target.selectedOptions, (o) => o.value),
                  )
                }
              >
                {languages.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.name}
                  </option>
                ))}
              </select>
              <input
                placeholder="Short Description"
                value={form.shortDescription}
                onChange={(e) =>
                  handleChange('shortDescription', e.target.value)
                }
              />
              <input
                placeholder="Cover Image URL"
                value={form.coverImage}
                onChange={(e) => handleChange('coverImage', e.target.value)}
              />
              <input
                placeholder="Github URL"
                value={form.githubUrl}
                onChange={(e) => handleChange('githubUrl', e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={form.isLive}
                  onChange={(e) => handleChange('isLive', e.target.checked)}
                />{' '}
                Is Live
              </label>
              {form.isLive && (
                <input
                  placeholder="Live URL"
                  value={form.liveUrl}
                  onChange={(e) => handleChange('liveUrl', e.target.value)}
                />
              )}
            </div>
          )}

          {step === 1 && (
            <div className={style.step}>
              <h4>Stack</h4>
              {form.stack.map((s, i) => (
                <div key={i}>
                  <input
                    value={s}
                    onChange={(e) => handleStackChange(i, e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemoveStack(i)}>
                    Supprimer
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddStack}>
                Ajouter un item
              </button>

              <h4>Presentation</h4>
              {Object.keys(form.presentation).map((key) => (
                <input
                  key={key}
                  placeholder={key}
                  value={
                    form.presentation[key as keyof typeof form.presentation]
                  }
                  onChange={(e) =>
                    handlePresentationChange(key, e.target.value)
                  }
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className={style.step}>
              <h4>Gallery</h4>
              {form.gallery.map((item, i) => (
                <div key={i}>
                  <input
                    placeholder="Desktop URL"
                    value={item.desktopUrl}
                    onChange={(e) =>
                      handleGalleryChange(i, 'desktopUrl', e.target.value)
                    }
                  />
                  <input
                    placeholder="Mobile URL"
                    value={item.mobileUrl}
                    onChange={(e) =>
                      handleGalleryChange(i, 'mobileUrl', e.target.value)
                    }
                  />
                  <input
                    placeholder="Alt Text"
                    value={item.alt}
                    onChange={(e) =>
                      handleGalleryChange(i, 'alt', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryItem(i)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddGalleryItem}>
                Ajouter un item
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={style.modalFooter}>
          <button type="button" onClick={handleNext}>
            {step < 2 ? 'Suivant' : 'Valider'}
          </button>
        </div>
      </div>
    </div>
  )
}
