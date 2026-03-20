import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Download, FileUp, RefreshCw, Trash2 } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import {
  createDocument,
  deleteDocument,
  downloadDocument,
  getDocumentMeta,
  type PortfolioDocument,
  updateDocument,
} from '../../services/documentsService'
import style from './mydocuments.module.scss'
import 'react-toastify/dist/ReactToastify.css'

function formatDate(value?: string) {
  if (!value) return 'Aucune'
  return new Date(value).toLocaleString('fr-FR')
}

function formatSize(size?: number) {
  if (!size) return '0 Ko'

  const kiloBytes = size / 1024

  if (kiloBytes < 1024) {
    return `${kiloBytes.toFixed(1)} Ko`
  }

  return `${(kiloBytes / 1024).toFixed(2)} Mo`
}

export function MyDocuments() {
  const [documentMeta, setDocumentMeta] = useState<PortfolioDocument | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const hasDocument = !!documentMeta

  const submitLabel = useMemo(() => {
    if (submitting && hasDocument) return 'Remplacement...'
    if (submitting) return 'Ajout...'
    return hasDocument ? 'Remplacer le document' : 'Ajouter le document'
  }, [hasDocument, submitting])

  const loadDocumentMeta = async () => {
    setLoading(true)
    try {
      const doc = await getDocumentMeta()
      setDocumentMeta(doc)
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Impossible de recuperer les informations du document',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocumentMeta()
  }, [])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (!file) {
      setSelectedFile(null)
      return
    }

    if (file.type !== 'application/pdf') {
      toast.error('Seuls les fichiers PDF sont autorises')
      event.target.value = ''
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!selectedFile) {
      toast.error('Selectionne un fichier PDF avant de valider')
      return
    }

    setSubmitting(true)

    try {
      const savedDocument = hasDocument
        ? await updateDocument(selectedFile)
        : await createDocument(selectedFile)

      setDocumentMeta(savedDocument)
      setSelectedFile(null)
      form.reset()

      toast.success(
        hasDocument
          ? 'Le document a ete remplace avec succes'
          : 'Le document a ete ajoute avec succes',
      )
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Impossible de sauvegarder le document',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!documentMeta) return
    if (!window.confirm(`Supprimer le document "${documentMeta.name}" ?`)) return

    setDeleting(true)

    try {
      await deleteDocument()
      setDocumentMeta(null)
      setSelectedFile(null)
      toast.success('Le document a ete supprime')
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Impossible de supprimer le document',
      )
    } finally {
      setDeleting(false)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)

    try {
      await downloadDocument()
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Impossible de telecharger le document',
      )
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section className={style.documentsPage}>
      <ToastContainer position="bottom-right" />

      <div className={style.header}>
        <div>
          <h1 className={style.title}>Mes Documents</h1>
          <p className={style.subtitle}>
            Gere le CV PDF, consulte ses metadonnees et declenche son
            telechargement a la demande.
          </p>
        </div>

        <button
          type="button"
          className={style.refreshButton}
          onClick={loadDocumentMeta}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Actualiser
        </button>
      </div>

      <div className={style.layout}>
        <article className={style.panel}>
          <div className={style.panelHeader}>
            <h2>Document courant</h2>
            <span className={`${style.status} ${hasDocument ? style.active : style.empty}`}>
              {hasDocument ? 'Disponible' : 'Aucun document'}
            </span>
          </div>

          {loading ? (
            <p className={style.helper}>Chargement des informations...</p>
          ) : documentMeta ? (
            <div className={style.metaGrid}>
              <div className={style.metaItem}>
                <span>Nom du fichier</span>
                <strong>{documentMeta.name}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Type</span>
                <strong>{documentMeta.contentType}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Taille</span>
                <strong>{formatSize(documentMeta.size)}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Telechargements</span>
                <strong>{documentMeta.downloadCount}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Date de creation</span>
                <strong>{formatDate(documentMeta.createdAt)}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Derniere mise a jour</span>
                <strong>{formatDate(documentMeta.updatedAt)}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Dernier telechargement</span>
                <strong>{formatDate(documentMeta.lastDownloadedAt)}</strong>
              </div>
              <div className={style.metaItem}>
                <span>Chemin blob</span>
                <strong>{documentMeta.pathname}</strong>
              </div>
            </div>
          ) : (
            <p className={style.helper}>
              Aucun CV n est enregistre pour le moment. Tu peux en ajouter un
              avec le formulaire.
            </p>
          )}

          <div className={style.actions}>
            <button
              type="button"
              className={style.secondaryAction}
              onClick={handleDownload}
              disabled={!documentMeta || downloading}
            >
              <Download size={16} />
              {downloading ? 'Telechargement...' : 'Recuperer le document'}
            </button>

            <button
              type="button"
              className={style.dangerAction}
              onClick={handleDelete}
              disabled={!documentMeta || deleting}
            >
              <Trash2 size={16} />
              {deleting ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </article>

        <article className={style.panel}>
          <div className={style.panelHeader}>
            <h2>{hasDocument ? 'Remplacer le CV' : 'Ajouter un CV'}</h2>
          </div>

          <form className={style.form} onSubmit={handleSubmit}>
            <label className={style.fileField}>
              <span>Selectionne un PDF</span>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </label>

            <div className={style.selectedFile}>
              <span>Fichier choisi</span>
              <strong>{selectedFile?.name || 'Aucun fichier selectionne'}</strong>
            </div>

            <p className={style.helper}>
              Le formulaire utilise `POST` si aucun document n existe, sinon il
              utilise `PUT` pour remplacer le fichier courant.
            </p>

            <button
              type="submit"
              className={style.primaryAction}
              disabled={submitting || !selectedFile}
            >
              <FileUp size={16} />
              {submitLabel}
            </button>
          </form>
        </article>
      </div>
    </section>
  )
}
