import styles from './background.module.scss'

export function Background() {
  return (
    <div className={styles.wrapper}>
      {/* Ambient background effects */}
      <div className={styles.ambient}>
        <div className={`${styles.orb} ${styles.violet}`} />
        <div className={`${styles.orb} ${styles.blue}`} />
        <div className={`${styles.orb} ${styles.metallic}`} />

        {/* Grid pattern */}
        <div className={styles.grid} />
      </div>

      {/* Electric animated lines */}
      <div className={styles.electricLines}>
        {/* Vertical lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className={styles.verticalLine}
            style={{
              left: `${15 + i * 14}%`,
              animationDuration: `${2 + i * 0.4}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Horizontal lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className={styles.horizontalLine}
            style={{
              top: `${20 + i * 20}%`,
              animationDuration: `${2.5 + i * 0.5}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
