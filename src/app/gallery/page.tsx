'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',
      title: 'Mystic Forest',
      description: 'Ancient trees shrouded in morning mist'
    },
    {
      src: 'https://images.unsplash.com/photo-1519098901909-b1553a1190af',
      title: 'Crystal Lake',
      description: 'Mirror-like waters reflecting mountain peaks'
    },
    {
      src: 'https://images.unsplash.com/photo-1464852045489-bccb7d17fe39',
      title: 'Golden Hour',
      description: 'Stunning sunset over pristine beaches'
    },
    {
      src: 'https://images.unsplash.com/photo-1542332213-1d277bf3d6c6',
      title: 'Sacred Mountains',
      description: 'Ancient volcanoes touching the stars'
    },
    {
      src: 'https://images.unsplash.com/photo-1564598788747-0bb38c84f441',
      title: 'Hidden Waterfalls',
      description: 'Pristine cascades in untouched forests'
    },
    {
      src: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a',
      title: 'Rice Terraces',
      description: 'Living art carved into mountains'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] via-[#1E3D34] to-[#0D1B2A] text-white">
      <div className="container mx-auto px-6 py-20">
        <Link 
          href="/"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors mb-8"
        >
          <motion.span
            initial={{ x: 10 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            ← Back to Home
          </motion.span>
        </Link>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-yellow-500">
            Nature Gallery
          </h1>
          <p className="text-xl text-gray-200">
            A visual journey through Indonesia's natural wonders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              layoutId={`image-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-serif text-yellow-500 mb-2">{image.title}</h3>
                  <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            layoutId={`image-${selectedImage}`}
            className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden"
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].title}
              fill
              className="object-cover"
              sizes="(max-width: 1536px) 100vw, 1536px"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-3xl font-serif text-yellow-500 mb-2">
                {images[selectedImage].title}
              </h3>
              <p className="text-gray-200 text-lg">
                {images[selectedImage].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}