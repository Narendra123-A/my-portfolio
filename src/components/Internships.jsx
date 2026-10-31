// Internships.jsx — internship cards with skills and tech tags
import { internshipsList } from '../data/portfolioData'

export default function Internships() {
  if (!internshipsList.length) return null

  return (
    <section className="bg-white text-black py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
            Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">Internships</h2>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {internshipsList.map((intern, i) => (
            <div
              key={intern.organization + i}
              className="relative p-8 md:p-12 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Duration badge */}
              <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#ff2a2a]/10 text-[#ff2a2a] text-xs font-bold">
                {intern.duration}
              </span>

              <h3 className="text-2xl font-bold mb-1">{intern.role}</h3>
              <p className="text-[#ff2a2a] font-semibold mb-6">{intern.organization}</p>

              {/* Skills gained */}
              <div className="mb-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Skills Gained
                </p>
                <div className="flex flex-wrap gap-2">
                  {intern.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {intern.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-black text-white rounded-full text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
