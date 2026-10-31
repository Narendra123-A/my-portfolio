// SoftSkills.jsx — four soft-skill cards with emoji icons
import { softSkillsList } from '../data/portfolioData'

export default function SoftSkills() {
  if (!softSkillsList.length) return null

  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
            Strengths
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">Soft Skills</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {softSkillsList.map((skill, i) => (
            <div
              key={skill.name}
              className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#ff2a2a]/40 transition-all duration-300 text-center"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <span className="text-5xl mb-4 block">{skill.icon}</span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#ff2a2a] transition-colors">
                {skill.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
