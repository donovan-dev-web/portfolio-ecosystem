import style from './home.module.scss'
import { LoginBlock } from '../../components/Home/LoginBlock'
import { UserAdminPanel } from '../../components/Home/UserAdminPanel'
import { useAuth } from '../../context/Auth/useAuth'

export function Home() {
  const { user, logout } = useAuth()

  return (
    <section className={style.page}>
      <div className={style.hero}>
        {user ? (
          <div className={style.userCard}>
            <h1>Administration du portfolio</h1>
            <p className={style.userSubtitle}>
              Vous etes connecte en tant que <strong>{user.email}</strong>.
              Vous pouvez gerer les utilisateurs et securiser l acces au
              back-office.
            </p>

            <button className={style.logoutButton} onClick={logout}>
              Se deconnecter
            </button>

            <UserAdminPanel />
          </div>
        ) : (
          <div className={style.loginPanel}>
            <div className={style.loginIntro}>
              <h1>Connexion au back-office</h1>
              <p>
                Connectez-vous pour acceder a l administration du portfolio, a
                la gestion des utilisateurs et aux differents outils de pilotage.
              </p>
            </div>
            <LoginBlock />
          </div>
        )}
      </div>
    </section>
  )
}
