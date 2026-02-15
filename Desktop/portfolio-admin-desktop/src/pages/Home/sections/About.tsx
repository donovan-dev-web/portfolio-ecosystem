import { motion } from 'framer-motion'

export function About() {
  return (
    <motion.section
      initial={{ opacity: 0, transform: 'scale(0.8)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      exit={{ opacity: 0, transform: 'scale(0.8)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ height: '100vh' }}
    >
      <div>
        <div>
          <h1>About</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo est
            enim consequuntur nihil. Sed quam aliquam consequatur voluptatum
            ipsa enim ad veritatis. Quidem incidunt soluta commodi
            exercitationem ipsam placeat sit!
          </p>
        </div>
        <div>
          <ul>
            <li>
              <p>11111</p>
            </li>
            <li>
              <p>22222</p>
            </li>
            <li>
              <p>33333</p>
            </li>
          </ul>
        </div>
      </div>
    </motion.section>
  )
}
