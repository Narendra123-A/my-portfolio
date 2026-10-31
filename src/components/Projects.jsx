// Projects.jsx — project cards with tech tags, GitHub/demo links, and flagship badge
import { projects } from '../data/portfolioData'

export default function Projects() {
  return (
    <section id="projects" className="bg-white text-black py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
        </div>

        {/* Project cards */}
        <div className="space-y-12">
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              className={`group relative rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                proj.isFlagship ? 'ring-2 ring-[#ff2a2a]/30' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="p-8 md:p-12">
                {/* Top row — number + badge */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-300 font-mono text-6xl font-black leading-none select-none">
                    {proj.number}
                  </span>
                  {proj.badge && (
                    <span className="px-3 py-1 rounded-full bg-[#ff2a2a] text-white text-xs font-bold">
                      {proj.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#ff2a2a] transition-colors">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl">
                  {proj.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {proj.links.github && (
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#ff2a2a] transition-colors"
                    >
                      {/* GitHub icon */}
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.508 11.508 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {proj.links.demo && (
                    <a
                      href={proj.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-black text-sm font-semibold hover:border-[#ff2a2a] hover:text-[#ff2a2a] transition-colors"
                    >
                      {/* External link icon */}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Hover accent line at bottom */}
              <div className="h-1 w-0 group-hover:w-full bg-[#ff2a2a] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
