// Hero.jsx — full-screen hero with video background, AOS animations, and play control
import { useRef, useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import heroVideo from '../assets/hero/hero.mp4'
import heroPoster from '../assets/about/profile.png'
import { heroContent, socialLinks } from '../data/portfolioData'

// Shared social icon SVGs (used both in the floating sidebar and inline on mobile)
function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.508 11.508 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

const socialItems = [
  { Icon: GitHubIcon, href: socialLinks.github, label: 'GitHub' },
  { Icon: LinkedInIcon, href: socialLinks.linkedin, label: 'LinkedIn' },
  { Icon: InstagramIcon, href: socialLinks.instagram, label: 'Instagram' },
]

export default function Hero() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialise AOS once; also refresh after fonts/images load
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' })
    const onLoad = () => AOS.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  // Toggle video play / pause
  const toggleVideo = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#f71800]">

      {/* Background video — object-contain so the full face is visible */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain object-top md:object-right z-0"
        playsInline
        poster={heroPoster}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Readability gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/45 via-black/10 to-transparent" />

      {/* Floating social bar — desktop only */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5 mix-blend-difference">
        {socialItems.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-white/60 hover:text-white hover:scale-125 transition-all duration-200"
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-[8%] flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end">

        {/* Left block */}
        <div className="max-w-2xl" data-aos="fade-up" data-aos-delay="100">
          {/* Mobile social icons */}
          <div className="flex lg:hidden gap-4 mb-4">
            {socialItems.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            {heroContent.greeting},<br />
            <span className="text-black">{heroContent.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white text-sm md:text-lg font-semibold max-w-md mt-4 mb-8"
            data-aos="fade-up"
          >
            {heroContent.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="200">
            {/* Primary */}
            <a
              href={heroContent.ctaPrimary.href}
              className="px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-lg"
            >
              {heroContent.ctaPrimary.text}
            </a>

            {/* Secondary */}
            <a
              href={heroContent.ctaSecondary.href}
              className="px-6 py-3 rounded-full bg-black/40 border border-white text-white font-bold backdrop-blur hover:bg-black/60 transition-colors"
            >
              {heroContent.ctaSecondary.text}
            </a>

            {/* Resume — only if URL provided */}
            {heroContent.ctaResume && heroContent.ctaResume.href && (
              <a
                href={heroContent.ctaResume.href}
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 text-white font-bold hover:bg-white/10 transition-colors"
              >
                {/* Download icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" />
                </svg>
                {heroContent.ctaResume.text}
              </a>
            )}
          </div>
        </div>

        {/* Right block — play control */}
        <div className="flex flex-col items-center mt-8 md:mt-0" data-aos="zoom-in" data-aos-delay="400">
          <button
            onClick={toggleVideo}
            className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 bg-black/20 backdrop-blur flex items-center justify-center hover:scale-110 hover:bg-[#f71800] hover:shadow-[0_0_30px_rgba(247,24,0,0.5)] transition-all duration-300"
            aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
          >
            {isPlaying ? (
              /* Pause icon */
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              /* Play triangle */
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <span className="text-white text-xs uppercase tracking-widest mt-2">
            {isPlaying ? 'Pause' : 'Play Reel'}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
