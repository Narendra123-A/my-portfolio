// About.jsx — white section with profile photo (flip card) + bio text
import { useState } from 'react'
import { aboutContent, personalInfo, socialLinks } from '../data/portfolioData'
import profileImg from '../assets/about/profile.png'

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <section id="about" className="bg-white text-black py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — 3D flip card with profile photo */}
        <div className="flex justify-center" data-aos="fade-right">
          <div
            className="relative w-72 h-96 cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front face — profile image */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src={profileImg}
                  alt={`${personalInfo.name} — illustrated portrait`}
                  className="w-full h-full object-cover"
                />
                {/* Tap hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
                  Tap to flip
                </div>
              </div>

              {/* Back face — quick info */}
              <div
                className="absolute inset-0 rounded-2xl bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4 p-8 shadow-2xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
                <p className="text-[#ff2a2a] font-semibold">{personalInfo.title}</p>
                <p className="text-white/70 text-sm text-center">{personalInfo.location}</p>

                {/* QR code — links to LinkedIn (uses a free API) */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(socialLinks.linkedin)}`}
                  alt="QR code to LinkedIn profile"
                  className="w-28 h-28 rounded-lg bg-white p-1 mt-2"
                />
                <p className="text-white/40 text-xs">Scan for LinkedIn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — bio text */}
        <div data-aos="fade-left">
          <p className="text-[#ff2a2a] font-semibold text-sm uppercase tracking-widest mb-2">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{aboutContent.heading}</h2>

          {/* Bio (supports inline HTML) */}
          <p
            className="text-gray-700 leading-relaxed text-base md:text-lg mb-8"
            dangerouslySetInnerHTML={{ __html: aboutContent.bio }}
          />

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-3">
            {aboutContent.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-semibold border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
