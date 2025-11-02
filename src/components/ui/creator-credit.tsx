'use client'

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { MagneticButton } from './magnetic-button'

export function CreatorCredit() {
  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 flex items-center gap-4 text-sm text-white/60"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <span>Created by</span>
      <MagneticButton 
        className="hover:text-yellow-500 transition-colors"
        scale={1.2}
      >
        <a
          href="https://github.com/maul-PG"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Github className="w-5 h-5" />
          <span>maul-PG</span>
        </a>
      </MagneticButton>
    </motion.div>
  )
}