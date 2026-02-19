// src/pages/Messages/Message.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessages } from '../../context/Messages/useMessages'
import style from './messages.module.scss'

export const Messages: React.FC = () => {
  const { messages, pagination, loading, fetchMessages, markAsRead } =
    useMessages()
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMessages(currentPage)
  }, [currentPage, fetchMessages])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id)
  }

  const handleViewMessage = (id: string) => {
    navigate(`/messages/${id}`)
  }

  return (
    <div className={style.messagesPage}>
      <h1 className={style.title}>Messages</h1>

      {loading ? (
        <p className={style.loading}>Chargement...</p>
      ) : (
        <>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Voir</th>
                <th>Statut</th>
                <th>Nom</th>
                <th>Date du Message</th>
                <th>Marquer comme Lu</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className={!msg.read ? style.unread : ''}>
                  <td>
                    <button
                      className={style.viewButton}
                      onClick={() => handleViewMessage(msg._id)}
                    >
                      Voir
                    </button>
                  </td>
                  <td>{msg.read ? 'Lu' : 'Non lu'}</td>
                  <td>{msg.name}</td>
                  <td>{new Date(msg.dateSent).toLocaleString()}</td>
                  <td>
                    {!msg.read && (
                      <button
                        className={style.markButton}
                        onClick={() => handleMarkAsRead(msg._id)}
                      >
                        Marquer lu
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={style.pagination}>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={page === currentPage ? style.activePage : ''}
                  disabled={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ),
            )}
          </div>
        </>
      )}
    </div>
  )
}
