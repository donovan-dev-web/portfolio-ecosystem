import { motion } from 'framer-motion'

export function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, transform: 'scale(0.8)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      exit={{ opacity: 0, transform: 'scale(0.8)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ height: '100vh' }}
    >
      <h1>Contact</h1>
    </motion.section>
  )
}
