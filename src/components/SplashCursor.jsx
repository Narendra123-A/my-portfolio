// SplashCursor.jsx — white smoke / fluid trail that follows the mouse (desktop only)
import { useEffect, useRef } from 'react'

// Each particle represents one wisp of smoke
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    // Slight random drift to create organic movement
    this.vx = (Math.random() - 0.5) * 2
    this.vy = -Math.random() * 2.5 - 0.5 // drift upward like smoke
    this.life = 1.0 // 1 = fully alive, 0 = dead
    this.decay = Math.random() * 0.015 + 0.008 // how fast it fades
    this.radius = Math.random() * 25 + 10
    this.angle = Math.random() * Math.PI * 2
    this.spin = (Math.random() - 0.5) * 0.08 // slow rotation
    // Slight wobble for organic feel
    this.wobbleSpeed = Math.random() * 0.04 + 0.02
    this.wobbleAmp = Math.random() * 1.5 + 0.5
    this.age = 0
  }

  update() {
    this.age++
    this.x += this.vx + Math.sin(this.age * this.wobbleSpeed) * this.wobbleAmp
    this.y += this.vy
    this.vy *= 0.98 // slow down drift
    this.vx *= 0.97
    this.radius += 0.3 // expand like real smoke
    this.life -= this.decay
    this.angle += this.spin
  }

  draw(ctx) {
    if (this.life <= 0) return
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.globalAlpha = this.life * 0.45
    // Draw a soft radial gradient blob (not a perfect circle)
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius)
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)')
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)')
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = grad
    // Draw an ellipse instead of a circle for an organic shape
    ctx.beginPath()
    ctx.ellipse(0, 0, this.radius, this.radius * (0.6 + Math.random() * 0.3), this.angle * 0.5, 0, Math.PI * 2)
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

    let particles = []
    let mouseX = 0
    let mouseY = 0
    let prevMouseX = 0
    let prevMouseY = 0
    let isMoving = false
    let moveTimer = null
    let raf

    // Resize canvas to fill the viewport
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Track mouse position
    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMoving = true
      clearTimeout(moveTimer)
      moveTimer = setTimeout(() => { isMoving = false }, 100)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const animate = () => {
      // Clear with full transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new particles when mouse moves
      if (isMoving) {
        const dx = mouseX - prevMouseX
        const dy = mouseY - prevMouseY
        const speed = Math.sqrt(dx * dx + dy * dy)
        // More particles when moving faster
        const count = Math.min(Math.floor(speed * 0.3) + 1, 5)
        for (let i = 0; i < count; i++) {
          // Spread along the movement path for a connected trail
          const t = i / count
          const px = prevMouseX + dx * t + (Math.random() - 0.5) * 8
          const py = prevMouseY + dy * t + (Math.random() - 0.5) * 8
          particles.push(new Particle(px, py))
        }
      }

      prevMouseX = mouseX
      prevMouseY = mouseY

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw(ctx)
        // Remove dead particles
        if (particles[i].life <= 0) {
          particles.splice(i, 1)
        }
      }

      // Cap particle count for performance
      if (particles.length > 200) {
        particles = particles.slice(-200)
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      clearTimeout(moveTimer)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: 'difference' }}
    />
  )
}
