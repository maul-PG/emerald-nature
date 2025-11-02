'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function ParticleEffects({ particlePositions }) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {particlePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: pos.left,
            top: pos.top,
          }}
        >
          <Sparkles className="w-2 h-2 text-yellow-500" />
        </motion.div>
      ))}
    </div>
  )
}