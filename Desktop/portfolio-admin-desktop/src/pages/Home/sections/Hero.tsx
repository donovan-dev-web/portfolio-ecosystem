import { motion } from 'framer-motion'
import style from '../home.module.scss'
import { LoginBlock } from '../../../components/Home/LoginBlock'
import { useAuth } from '../../../context/Auth/useAuth'

export function Hero() {
  const { user, logout } = useAuth()

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ height: '100vh' }}
    >
      <div className={style.hero}>
        {user ? (
          <div className={style.userCard}>
            <h1>Bienvenue Administrateur sur votre Dashboard</h1>

            <button className={style.logoutButton} onClick={logout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <h1>Bienvenue sur le Dashboard</h1>
            <LoginBlock />
          </>
        )}
      </div>
    </motion.section>
  )
}
