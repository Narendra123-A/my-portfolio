// IntroVideo.jsx — embedded YouTube self-introduction video
import { introVideo } from '../data/portfolioData'

// Convert any YouTube URL into an embed URL
function toEmbedUrl(url) {
  if (!url) return ''
  // Handle youtu.be short links
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  // Handle youtube.com/watch?v=
  const longMatch = url.match(/[?&]v=([^&]+)/)
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`
  return url
}

export default function IntroVideo() {
  const embedUrl = toEmbedUrl(introVideo.youtubeUrl)
  if (!embedUrl) return null

  return (
    <section id="intro" className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">

        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
          {introVideo.badge}
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{introVideo.heading}</h2>
        <p className="text-white/60 mb-10 max-w-xl mx-auto">{introVideo.description}</p>

        {/* Responsive 16:9 iframe */}
        <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title="Self Introduction Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
