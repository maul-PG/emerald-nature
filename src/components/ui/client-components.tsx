'use client'

import { motion } from 'framer-motion'
import { LoadingScreen } from './loading-screen'
import { CustomCursor } from './custom-cursor'

export function ClientComponents({ isLoading, setIsLoading }) {
  return (
    <>
      {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}
      <CustomCursor />
    </>
  )
}