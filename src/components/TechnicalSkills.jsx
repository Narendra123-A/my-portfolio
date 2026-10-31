// TechnicalSkills.jsx — grid of skill categories with animated reveal
import { technicalSkills } from '../data/portfolioData'

// Simple icon map per category (emoji-based for zero dependencies)
const categoryIcons = {
  Programming: '💻',
  Frontend: '🎨',
  Backend: '⚙️',
  'Database & Tools': '🗄️',
}

export default function TechnicalSkills() {
  return (
    <section id="skills" className="bg-white text-black py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">Skills &amp; Technologies</h2>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {technicalSkills.categories.map((cat, i) => (
            <div
              key={cat.title}
              className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Icon */}
              <span className="text-4xl mb-4 block">
                {categoryIcons[cat.title] || '📦'}
              </span>

              {/* Category title */}
              <h3 className="text-lg font-bold mb-4 group-hover:text-[#ff2a2a] transition-colors">
                {cat.title}
              </h3>

              {/* Skills list */}
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] shrink-0" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
