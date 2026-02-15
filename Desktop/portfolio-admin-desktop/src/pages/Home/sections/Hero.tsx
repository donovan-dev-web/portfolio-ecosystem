import { motion } from 'framer-motion'
import style from '../home.module.scss'

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, transform: 'scale(0.8)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      exit={{ opacity: 0, transform: 'scale(0.8)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ height: '100vh' }}
    >
      <div className={style.parent}>
        <div className={style.div1}>
          {' '}
          <h1> Hero Accueil</h1>{' '}
        </div>
        <div className={style.div2}>
          {' '}
          <h2>Skills</h2>{' '}
        </div>
        <div className={style.div3}>
          {' '}
          <h2>My Project</h2>{' '}
        </div>
        <div className={style.div4}>
          {' '}
          <h2>Contact</h2>
        </div>
      </div>
    </motion.section>
  )
}
