// Services.jsx — "My Process" section with numbered step cards and connecting line
import { skillsContent } from '../data/portfolioData'

// Step icons
const stepIcons = ['🔍', '✏️', '🛠️', '🚀']

export default function Services() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
            {skillsContent.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{skillsContent.heading}</h2>
          <p className="text-white/60 max-w-xl mx-auto">{skillsContent.description}</p>
        </div>

        {/* Process cards with a vertical connecting line */}
        <div className="relative">
          {/* Vertical line (visible on md+ screens) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsContent.cards.map((card, i) => (
              <div
                key={card.number}
                className={`relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:border-[#ff2a2a]/50 hover:bg-white/10 transition-all duration-300 ${
                  i % 2 === 0 ? 'md:text-right' : ''
                }`}
                data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={i * 100}
              >
                {/* Step icon + number */}
                <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <span className="text-3xl">{stepIcons[i] || '📦'}</span>
                  <span className="text-[#ff2a2a] font-mono text-sm font-bold">{card.number}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          {/* End text */}
          <p
            className="text-center text-white/80 text-lg font-semibold mt-12"
            data-aos="zoom-in"
          >
            {skillsContent.endText}
          </p>
        </div>
      </div>
    </section>
  )
}
