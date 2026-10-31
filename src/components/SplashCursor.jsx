// SplashCursor.jsx — canvas smoke particles that follow the cursor (desktop only)
import { useEffect, useRef } from 'react'

// Particle blueprint — each one is a wisp of smoke
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    // Randomize size to look organic
    this.size = Math.random() * 15 + 5
    // Movement speeds: slow upward drift and subtle side-to-side floating
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * -1 - 0.5
    // Semi-transparent light gray smoke color
    this.color = 'rgba(220, 220, 220, 0.4)'
    // The rate at which the smoke particle fades out
    this.alpha = 1
    this.decay = Math.random() * 0.015 + 0.01
  }

  // Update particle properties for the next frame
  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.size += 0.2 // Smoke expands as it drifts away
    this.alpha -= this.decay // Smoke fades out
  }

  // Render the particle on screen
  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color

    // Add a blur filter to turn raw circles into soft mist clouds
    ctx.shadowBlur = 15
    ctx.shadowColor = 'rgba(200, 200, 200, 0.5)'

    ctx.fill()
    ctx.restore()
  }
}

export default function SplashCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Only run on devices with a fine pointer (desktop/laptop)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particlesArray = []
    let raf

    // Automatically resize canvas to fit window dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    // Track cursor movement — spawn 3 particles per move for dense smoke
    const onMouseMove = (e) => {
      for (let i = 0; i < 3; i++) {
        particlesArray.push(new Particle(e.clientX, e.clientY))
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Continuous frame loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw(ctx)

        // Remove dead particles so memory doesn't leak/lag
        if (particlesArray[i].alpha <= 0) {
          particlesArray.splice(i, 1)
          i--
        }
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999]"
    />
  )
}
