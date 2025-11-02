'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Moon, ChevronDown, Sparkles, Leaf, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ClientComponents } from '@/components/ui/client-components'
import { ParticleEffects } from '@/components/ui/particle-effects'
import { RevealOnScroll } from '@/components/ui/reveal-scroll'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { CreatorCredit } from '@/components/ui/creator-credit'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])

  const particlePositions = useMemo(() => {
    // Deterministic PRNG (mulberry32) so server and client get the same values
    const mulberry32 = (a: number) => {
      return () => {
        let t = a >>> 0
        t += 0x6d2b79f5
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    }

    const seed = 123456
    return Array.from({ length: 15 }).map((_, i) => {
      const r1 = mulberry32(seed + i)()
      const r2 = mulberry32(seed * 31 + i)()
      return {
        left: `${(r1 * 100).toFixed(6)}%`,
        top: `${(r2 * 100).toFixed(6)}%`,
      }
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollY(scrollY)
      setShowScrollTop(scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mark when component is mounted on client to avoid rendering client-only
  // animated particles on the server (prevents hydration mismatches).
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const springScroll = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="relative">
      {mounted && (
        <>
          <ClientComponents isLoading={isLoading} setIsLoading={setIsLoading} />
          <CreatorCredit />
        </>
      )}
      <div className="min-h-screen bg-gradient-to-b from-[#0D1B2A] via-[#1E3D34] to-[#0D1B2A] text-white overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 z-50 origin-left"
        style={{ scaleX: scrollY / 1000 }}
      />

      {/* Animated Background Particles */}
      {mounted && <ParticleEffects particlePositions={particlePositions} />}

      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-[#0D1B2A]/90 backdrop-blur-lg border-b border-yellow-500/20' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div className="flex items-center space-x-2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }}>
                <Leaf className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <span className="text-2xl font-serif text-yellow-500">Emerald Nature</span>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1682686580391-8b0359963622')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#0D1B2A]/50 to-transparent"></div>
        </motion.div>
        
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }}>
            <Moon className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-serif mb-6 text-yellow-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Malam Lembut Berkilau
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Discover the enchanting beauty of Indonesian nature under the moonlight
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Link href="/explore">
              <MagneticButton>
                <motion.button
                  className="group relative bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full text-lg font-semibold transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10 inline-flex items-center"
                    whileHover={{ x: 4 }}
                  >
                    Explore Nature
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-yellow-400"
                    initial={{ scale: 0, x: '100%' }}
                    whileHover={{ scale: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </motion.button>
              </MagneticButton>
            </Link>
            <Link href="/gallery">
              <MagneticButton>
                <motion.button
                  className="group relative border-2 border-yellow-500 text-yellow-500 hover:text-black px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10 inline-flex items-center"
                    whileHover={{ x: 4 }}
                  >
                    View Gallery
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-yellow-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ originX: 0 }}
                  />
                </motion.button>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-yellow-500" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4">About Emerald Nature</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-[#1E3D34] to-[#0D1B2A] p-8 rounded-2xl">
                <p className="text-lg leading-relaxed text-gray-200">
                  Under the soft glow of moonlight, Indonesia reveals its mesmerizing natural beauty. 
                  From tropical forests to oceans that mirror the starlight, every corner holds wonders 
                  waiting to be explored.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Leaf, label: 'Pure Nature' },
                  { icon: Moon, label: 'Night Beauty' },
                  { icon: Sparkles, label: 'Magic Moments' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    </motion.div>
                    <p className="text-sm text-gray-300">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4">Nature Gallery</h2>
            <p className="text-xl text-gray-200">Experience the beauty of Indonesian landscapes</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07",
                alt: "Tropical Forest",
                title: "Mystic Forest",
                category: "Nature"
              },
              {
                src: "https://images.unsplash.com/photo-1519098901909-b1553a1190af",
                alt: "Mountain Lake",
                title: "Crystal Lake",
                category: "Landscape"
              },
              {
                src: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39",
                alt: "Sunset Beach",
                title: "Golden Hour",
                category: "Seascape"
              }
            ].map((image, index) => (
              <RevealOnScroll key={image.src} delay={index * 0.2}>
                <motion.div
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  whileHover="hover"
                  initial="initial"
                  animate="initial"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.02 }
                  }}
                >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm font-medium text-yellow-500 mb-2">{image.category}</p>
                    <h3 className="text-xl font-bold">{image.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1E3D34]/30 to-[#0D1B2A]/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4">Experience the Magic</h2>
            <p className="text-xl text-gray-200">Discover what makes Indonesian nights special</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Tropical Forests',
                description: 'Explore lush rainforests that come alive at night with bioluminescent wonders.',
                icon: Leaf
              },
              {
                title: 'Moonlit Beaches',
                description: 'Walk on pristine beaches under the stars, where waves whisper ancient stories.',
                icon: Moon
              },
              {
                title: 'Mountain Mysteries',
                description: 'Discover volcanic peaks that touch the moon, offering breathtaking night views.',
                icon: Sparkles
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(250, 204, 21, 0.3)" 
                }}
                className="bg-[#0D1B2A]/50 border border-yellow-500/20 rounded-2xl p-8 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-yellow-500 mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] border-t border-yellow-500/20 py-12 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-serif text-yellow-500">Emerald Nature</span>
            </div>
            <p className="text-gray-400 mb-4">
              Malam Lembut Berkilau - Discover the enchanting beauty of Indonesian nature
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Emerald Nature. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
      </div>
    </div>
  )
}