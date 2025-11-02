'use client'

import { motion } from 'framer-motion'

export function LoadingScreen({ setIsLoading }: { setIsLoading: (value: boolean) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={() => setIsLoading(false)}
    >
      <div className="relative">
        <motion.div
          className="w-32 h-32 rounded-full border-t-2 border-l-2 border-yellow-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-yellow-500 text-lg font-serif"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading
        </motion.div>
      </div>
    </motion.div>
  )
}