// SplashCursor.jsx — red glow that follows the mouse (desktop only)
import { useEffect, useRef } from 'react'

export default function SplashCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Only run on devices with a fine pointer (desktop/laptop)
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    const cursor = cursorRef.current
    if (!cursor) return

    let x = 0
    let y = 0
    let currentX = 0
    let currentY = 0

    const handleMove = (e) => {
      x = e.clientX
      y = e.clientY
    }

    // Smooth follow with requestAnimationFrame
    let raf
    const animate = () => {
      currentX += (x - currentX) * 0.15
      currentY += (y - currentY) * 0.15
      cursor.style.transform = `translate(${currentX - 128}px, ${currentY - 128}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none w-64 h-64 rounded-full mix-blend-difference"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)',
        filter: 'blur(8px)',
        willChange: 'transform',
      }}
    />
  )
}
