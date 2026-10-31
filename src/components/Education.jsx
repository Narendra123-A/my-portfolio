// Education.jsx — education card with degree, institution, and year
import { education } from '../data/portfolioData'

export default function Education() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">

        {/* Header */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
          Education
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Academic Background</h2>

        {/* Education card */}
        <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-10 md:p-14 hover:border-[#ff2a2a]/40 transition-all duration-300 text-center">
          {/* Degree */}
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{education.degree}</h3>

          {/* Institution */}
          <p className="text-[#ff2a2a] font-semibold text-lg mb-2">{education.institution}</p>

          {/* Year range */}
          <p className="text-white/60">{education.cgpa}</p>

          {/* Graduation badge */}
          <div className="mt-6 inline-block px-4 py-2 bg-[#ff2a2a]/10 rounded-full">
            <span className="text-[#ff2a2a] font-bold text-sm">
              🎓 Graduating {education.graduation}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
