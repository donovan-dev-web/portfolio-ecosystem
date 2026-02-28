// src/components/Project/ProjectModal.tsx
'use client'

import { useState } from 'react'
import style from './ProjectModal.module.scss'
import { useProjects } from '../../../context/useProjects'
import { toast } from 'react-toastify'
import { LucideX } from 'lucide-react'
import { createProject } from '../../../services/ProjectService'
import {
  type NewProjectForm,
  type GalleryItemForm,
} from '../../../types/newProjectForm'

interface Props {
  isOpen: boolean
  onClose: () => void
}

// 🔹 Utils pour redimensionner et convertir en WebP
async function fileToWebP(
  file: File,
  width: number,
  height: number,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas error'))
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Blob error'))
          resolve(
            new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
              type: 'image/webp',
            }),
          )
        },
        'image/webp',
        0.8,
      )
    }
    img.onerror = reject
  })
}

// 🔹 Redimensionnement standard small / medium / large
async function createVariants(file: File) {
  const small = await fileToWebP(file, 400, 300)
  const medium = await fileToWebP(file, 800, 600)
  const large = await fileToWebP(file, 1200, 900)
  return { small, medium, large }
}

export const ProjectModal = ({ isOpen, onClose }: Props) => {
  const { projectTypes, technologies, languages, projects } = useProjects()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState<NewProjectForm>({
    title: '',
    projectType: '',
    technologies: [],
    languages: [],
    shortDescription: '',
    coverImage: { small: null, medium: null, large: null },
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

  // 🔹 Cover image handler
  const handleCoverChange = async (file: File | null) => {
    if (!file) return
    const variants = await createVariants(file)
    setForm({ ...form, coverImage: variants })
  }

  // 🔹 Gallery handlers
  const handleAddGalleryItem = () => {
    const newItem: GalleryItemForm = {
      desktop: { small: null, medium: null, large: null },
      mobile: { small: null, medium: null, large: null },
      alt: '',
    }
    setForm({ ...form, gallery: [...form.gallery, newItem] })
  }

  const handleGalleryChange = async (
    index: number,
    device: 'desktop' | 'mobile',
    file: File | null,
  ) => {
    if (!file) return
    const variants = await createVariants(file)
    const updated = [...form.gallery]
    updated[index][device] = variants
    setForm({ ...form, gallery: updated })
  }

  const handleGalleryAltChange = (index: number, value: string) => {
    const updated = [...form.gallery]
    updated[index].alt = value
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
        form.coverImage.small &&
        form.coverImage.medium &&
        form.coverImage.large
      )
    if (step === 1) return true
    if (step === 2 && form.gallery.length > 0) {
      return form.gallery.every(
        (item) =>
          item.desktop.small &&
          item.desktop.medium &&
          item.desktop.large &&
          item.mobile.small &&
          item.mobile.medium &&
          item.mobile.large &&
          item.alt,
      )
    }
    return false
  }

  const handleNext = () => {
    if (isSubmitting) return

    if (!isStepValid()) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }
    if (step < 2) setStep(step + 1)
    else handleSubmit()
  }

  const handlePrevious = () => {
    if (isSubmitting) return
    if (step > 0) setStep(step - 1)
  }

  // 🔹 Build FormData pour multipart/form-data
  const buildFormData = (data: NewProjectForm) => {
    const formData = new FormData()

    // Cover image
    Object.entries(data.coverImage).forEach(([key, file]) => {
      if (file) formData.append(`coverImage[${key}]`, file)
    })

    // Gallery
    data.gallery.forEach((item, i) => {
      ;['desktop', 'mobile'].forEach((device) => {
        Object.entries(item[device as 'desktop' | 'mobile']).forEach(
          ([size, file]) => {
            if (file) formData.append(`gallery[${i}][${device}][${size}]`, file)
          },
        )
      })
      formData.append(`gallery[${i}][alt]`, item.alt)
    })

    // Autres champs
    formData.append('title', data.title)
    formData.append('projectType', data.projectType)
    formData.append('shortDescription', data.shortDescription)
    formData.append('githubUrl', data.githubUrl || '')
    formData.append('isLive', String(data.isLive))
    formData.append('liveUrl', data.liveUrl || '')
    data.stack.forEach((s, i) => formData.append(`stack[${i}]`, s))
    Object.entries(data.presentation).forEach(([key, value]) =>
      formData.append(`presentation[${key}]`, value),
    )
    data.technologies.forEach((t, i) =>
      formData.append(`technologies[${i}]`, t),
    )
    data.languages.forEach((l, i) => formData.append(`languages[${i}]`, l))

    return formData
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const projectToSend = { ...form, order: projects.length + 1 }
      const formData = buildFormData(projectToSend)

      await createProject(formData)
      toast.success('Projet créé avec succès !')
      handleClose(true)
    } catch (err) {
      console.error('Erreur création project:', err)
      toast.error('Erreur lors de la création du projet')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = (force = false) => {
    if (isSubmitting && !force) return

    setForm({
      title: '',
      projectType: '',
      technologies: [],
      languages: [],
      shortDescription: '',
      coverImage: { small: null, medium: null, large: null },
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
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        {/* Header */}
        <div className={style.modalHeader}>
          <h2>Nouveau Projet</h2>
          <button
            className={style.closeBtn}
            onClick={() => handleClose()}
            disabled={isSubmitting}
          >
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
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleCoverChange(e.target.files ? e.target.files[0] : null)
                }
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
                  <label>Desktop:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleGalleryChange(
                        i,
                        'desktop',
                        e.target.files ? e.target.files[0] : null,
                      )
                    }
                  />
                  <label>Mobile:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleGalleryChange(
                        i,
                        'mobile',
                        e.target.files ? e.target.files[0] : null,
                      )
                    }
                  />
                  <input
                    placeholder="Alt Text"
                    value={item.alt}
                    onChange={(e) => handleGalleryAltChange(i, e.target.value)}
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
          {step > 0 && (
            <button
              type="button"
              className={style.cancelBtn}
              onClick={handlePrevious}
              disabled={isSubmitting}
            >
              Précédent
            </button>
          )}

          <button
            type="button"
            className={step < 2 ? style.nextBtn : style.submitBtn}
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={style.loader} aria-hidden="true" />
                Envoi en cours...
              </>
            ) : step < 2 ? (
              'Suivant'
            ) : (
              'Valider'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
