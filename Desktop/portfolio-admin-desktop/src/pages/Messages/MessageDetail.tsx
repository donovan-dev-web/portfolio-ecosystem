// src/pages/Messages/MessageDetail.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMessages } from '../../context/Messages/useMessages'
import style from './MessageDetail.module.scss'

const MessageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { messages, fetchMessageById, markAsRead } = useMessages()
  const [message, setMessage] = useState<(typeof messages)[0] | null>(null)

  useEffect(() => {
    if (!id) return

    fetchMessageById(id).then((msg) => {
      if (msg) {
        setMessage(msg)
        if (!msg.read) markAsRead(msg._id)
      } else {
        navigate('/messages') // si message introuvable
      }
    })
  }, [id, fetchMessageById, markAsRead, navigate])

  if (!message) return <div className={style.loading}>Chargement...</div>

  // Obtenir index du message courant pour les boutons suivant/précédent
  const currentIndex = messages.findIndex((m) => m._id === message._id)
  const prevMessage = messages[currentIndex - 1]
  const nextMessage = messages[currentIndex + 1]

  const handlePrev = () => {
    if (prevMessage) navigate(`/messages/${prevMessage._id}`)
  }
  const handleNext = () => {
    if (nextMessage) navigate(`/messages/${nextMessage._id}`)
  }
  const handleReply = (email: string) => {
    if (window.electronAPI) {
      try {
        // Essaie d'ouvrir le client mail
        window.electronAPI.openMail(email)
      } catch (error) {
        console.warn('Impossible d’ouvrir le client mail :', error)
        // Fallback : informer l'utilisateur
        alert(`Prêt à envoyer un mail à ${email}. Aucun client mail détecté.`)
      }
    } else {
      // fallback navigateur
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className={style.messageDetailPage}>
      <div className={style.topButtons}>
        <button
          onClick={() => navigate('/messages')}
          className={style.backButton}
        >
          Retour à la liste
        </button>
        <button onClick={() => handleReply(message.email)}>Répondre</button>
      </div>

      <div className={style.messageContent}>
        <h2>Détails du message</h2>
        <div className={style.field}>
          <strong>Nom :</strong> {message.name}
        </div>
        <div className={style.field}>
          <strong>Email :</strong> {message.email}
        </div>
        {message.phone && (
          <div className={style.field}>
            <strong>Téléphone :</strong> {message.phone}
          </div>
        )}
        <div className={style.field}>
          <strong>Contenu :</strong>
          <p>{message.content}</p>
        </div>
        <div className={style.field}>
          <strong>Statut :</strong> {message.read ? 'Lu' : 'Non lu'}
        </div>
        <div className={style.field}>
          <strong>Date du message :</strong>{' '}
          {new Date(message.dateSent).toLocaleString()}
        </div>
        {message.dateRead && (
          <div className={style.field}>
            <strong>Date lecture :</strong>{' '}
            {new Date(message.dateRead).toLocaleString()}
          </div>
        )}
      </div>

      <div className={style.bottomButtons}>
        <button onClick={handlePrev} disabled={!prevMessage}>
          Précédent
        </button>
        <button onClick={handleNext} disabled={!nextMessage}>
          Suivant
        </button>
      </div>
    </div>
  )
}

export default MessageDetail
