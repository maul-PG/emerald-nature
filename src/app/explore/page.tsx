'use client'

import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] via-[#1E3D34] to-[#0D1B2A] text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 py-20"
      >
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
            Explore Nature
          </h1>
          <p className="text-xl text-gray-200">
            Discover the hidden treasures of Indonesian landscapes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Sacred Mountains',
              description: 'Ancient volcanoes touching the stars',
              image: 'https://images.unsplash.com/photo-1542332213-1d277bf3d6c6'
            },
            {
              title: 'Hidden Waterfalls',
              description: 'Pristine cascades in untouched forests',
              image: 'https://images.unsplash.com/photo-1564598788747-0bb38c84f441'
            },
            {
              title: 'Mystical Forests',
              description: 'Where ancient spirits still dwell',
              image: 'https://images.unsplash.com/photo-1511497584788-876760111969'
            },
            {
              title: 'Coastal Wonders',
              description: 'Where land meets the endless sea',
              image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206'
            },
            {
              title: 'Rice Terraces',
              description: 'Living art carved into mountains',
              image: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a'
            },
            {
              title: 'Island Paradises',
              description: 'Remote havens of tranquility',
              image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf'
            }
          ].map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={location.image}
                  alt={location.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-serif text-yellow-500 mb-2">{location.title}</h3>
                  <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    {location.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}