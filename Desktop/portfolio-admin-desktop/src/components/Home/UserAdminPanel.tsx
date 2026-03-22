import { useEffect, useState } from 'react'
import { authService } from '../../services/authService'
import { useAuth } from '../../context/Auth/useAuth'
import styles from './UserAdminPanel.module.scss'

type AdminUser = {
  id: string
  email: string
  createdAt?: string
  updatedAt?: string
}

const initialCreateForm = {
  email: '',
  password: '',
}

const initialEditForm = {
  email: '',
  password: '',
}

const initialPasswordForm = {
  oldPassword: '',
  newPassword: '',
}

export function UserAdminPanel() {
  const { user } = useAuth()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [signupEnabled, setSignupEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(initialEditForm)
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)

  const loadAdminData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [usersResponse, signupResponse] = await Promise.all([
        authService.getUsers(),
        authService.getSignupStatus(),
      ])

      setUsers(usersResponse)
      setSignupEnabled(Boolean(signupResponse.signupEnabled))
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de recuperer les donnees utilisateur')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadAdminData()
  }, [])

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      await authService.signup(createForm.email, createForm.password)
      setCreateForm(initialCreateForm)
      setMessage('Utilisateur cree avec succes')
      await loadAdminData()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de creer l utilisateur')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingUserId) return

    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      await authService.updateUser(editingUserId, {
        email: editForm.email,
        password: editForm.password || undefined,
      })
      setEditingUserId(null)
      setEditForm(initialEditForm)
      setMessage('Utilisateur mis a jour avec succes')
      await loadAdminData()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de mettre a jour l utilisateur')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteUser = async (id: string) => {
    const confirmed = window.confirm(
      'Voulez-vous vraiment supprimer cet utilisateur ?',
    )

    if (!confirmed) return

    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      await authService.deleteUser(id)
      setMessage('Utilisateur supprime avec succes')
      await loadAdminData()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de supprimer l utilisateur')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      await authService.changePassword(
        passwordForm.oldPassword,
        passwordForm.newPassword,
      )
      setPasswordForm(initialPasswordForm)
      setMessage('Mot de passe mis a jour avec succes')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de modifier le mot de passe')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleToggleSignup = async () => {
    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      const response = await authService.updateSignupStatus(!signupEnabled)
      setSignupEnabled(Boolean(response.signupEnabled))
      setMessage('Le statut de creation de compte a ete mis a jour')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Impossible de modifier le statut du signup')
      }
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (targetUser: AdminUser) => {
    setEditingUserId(targetUser.id)
    setEditForm({
      email: targetUser.email,
      password: '',
    })
    setMessage(null)
    setError(null)
  }

  if (loading) {
    return <div className={styles.panel}>Chargement des utilisateurs...</div>
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h2>Administration des utilisateurs</h2>
          <p>
            Gerez les comptes d acces au back-office et le statut de creation
            des utilisateurs.
          </p>
        </div>
        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => void loadAdminData()}
          disabled={saving}
        >
          Actualiser
        </button>
      </div>

      <div className={styles.statusRow}>
        <div className={styles.statusCard}>
          <span>Utilisateur connecte</span>
          <strong>{user?.email || 'Non renseigne'}</strong>
        </div>
        <div className={styles.statusCard}>
          <span>Creation de compte</span>
          <div className={styles.toggleRow}>
            <strong>{signupEnabled ? 'Activee' : 'Desactivee'}</strong>
            <button
              type="button"
              className={signupEnabled ? styles.toggleOn : styles.toggleOff}
              onClick={handleToggleSignup}
              disabled={saving}
            >
              {signupEnabled ? 'Desactiver' : 'Activer'}
            </button>
          </div>
        </div>
      </div>

      {message ? <p className={styles.success}>{message}</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.grid}>
        <section className={styles.card}>
          <h3>Creer un utilisateur</h3>
          <form className={styles.form} onSubmit={handleCreateUser}>
            <input
              type="email"
              placeholder="Email"
              value={createForm.email}
              onChange={(event) =>
                setCreateForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={createForm.password}
              onChange={(event) =>
                setCreateForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              required
              minLength={8}
            />
            <button type="submit" disabled={saving || !signupEnabled}>
              Creer l utilisateur
            </button>
          </form>
        </section>

        <section className={styles.card}>
          <h3>Modifier mon mot de passe</h3>
          <form className={styles.form} onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Ancien mot de passe"
              value={passwordForm.oldPassword}
              onChange={(event) =>
                setPasswordForm((current) => ({
                  ...current,
                  oldPassword: event.target.value,
                }))
              }
              required
              minLength={8}
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={passwordForm.newPassword}
              onChange={(event) =>
                setPasswordForm((current) => ({
                  ...current,
                  newPassword: event.target.value,
                }))
              }
              required
              minLength={8}
            />
            <button type="submit" disabled={saving}>
              Mettre a jour mon mot de passe
            </button>
          </form>
        </section>
      </div>

      <section className={styles.card}>
        <h3>Liste des utilisateurs</h3>

        <div className={styles.userList}>
          {users.map((item) => (
            <article key={item.id} className={styles.userItem}>
              <div className={styles.userMeta}>
                <strong>{item.email}</strong>
                <span>
                  Cree le{' '}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString('fr-FR')
                    : 'date indisponible'}
                </span>
              </div>

              <div className={styles.inlineActions}>
                <button
                  type="button"
                  className={styles.secondaryAction}
                  onClick={() => startEdit(item)}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className={styles.deleteAction}
                  onClick={() => void handleDeleteUser(item.id)}
                  disabled={saving}
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {editingUserId ? (
        <section className={styles.card}>
          <h3>Modifier un utilisateur</h3>
          <form className={styles.form} onSubmit={handleUpdateUser}>
            <input
              type="email"
              placeholder="Email"
              value={editForm.email}
              onChange={(event) =>
                setEditForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              required
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe optionnel"
              value={editForm.password}
              onChange={(event) =>
                setEditForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              minLength={8}
            />

            <div className={styles.formActions}>
              <button type="submit" disabled={saving}>
                Enregistrer
              </button>
              <button
                type="button"
                className={styles.secondaryAction}
                onClick={() => {
                  setEditingUserId(null)
                  setEditForm(initialEditForm)
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  )
}
