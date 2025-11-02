'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function MagneticButton({ children, className = '', scale = 1.5, tolerance = 0.5 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    setPosition({ x: x * tolerance, y: y * tolerance })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={className}
      whileHover={{ scale }}
    >
      {children}
    </motion.div>
  )
}