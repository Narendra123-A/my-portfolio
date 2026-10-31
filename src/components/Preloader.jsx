// Preloader.jsx — animated loading screen shown while the app initialises
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  // Hide preloader after 2.2 seconds (enough for the slide-up animation)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-4"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated brand name */}
          <motion.h1
            className="text-white text-3xl md:text-5xl font-black tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {personalInfo.brandName}
            <span className="text-[#ff2a2a]">.</span>
          </motion.h1>

          {/* Loading bar */}
          <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#ff2a2a]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
