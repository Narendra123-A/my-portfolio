// Contact.jsx — contact form powered by EmailJS + direct contact info
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { personalInfo, emailjsConfig, socialLinks } from '../data/portfolioData'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs
      .sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      )
      .then(() => {
        setStatus('sent')
        formRef.current.reset()
        // Reset after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      })
      .catch(() => {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      })
  }

  return (
    <section id="contact" className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Left — contact info */}
        <div data-aos="fade-right">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#ff2a2a] text-xs font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Have an opportunity, a project idea, or just want to say hello? Fill in the form or
            reach out directly — I'd love to hear from you.
          </p>

          {/* Direct contact details */}
          <div className="space-y-6">
            {/* Email */}
            <a
              href={`mailto:${personalInfo.emails.primary}`}
              className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              {personalInfo.emails.primary}
            </a>

            {/* Phone */}
            {personalInfo.phone && (
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {personalInfo.phone}
              </a>
            )}

            {/* Location */}
            <div className="flex items-center gap-4 text-white/80">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              {personalInfo.location}
            </div>

            {/* LinkedIn */}
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div data-aos="fade-left">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label htmlFor="user_name" className="block text-sm font-semibold text-white/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                placeholder="John Doe"
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff2a2a] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="user_email" className="block text-sm font-semibold text-white/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="john@example.com"
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff2a2a] transition-colors"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-white/80 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="Hiring Inquiry"
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff2a2a] transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about the opportunity…"
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#ff2a2a] transition-colors resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                status === 'sent'
                  ? 'bg-green-500 text-white'
                  : status === 'error'
                  ? 'bg-red-800 text-white'
                  : 'bg-[#ff2a2a] text-white hover:bg-[#e02424] hover:shadow-[0_0_30px_rgba(255,42,42,0.3)]'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {status === 'sending'
                ? 'Sending…'
                : status === 'sent'
                ? '✓ Message Sent!'
                : status === 'error'
                ? '✗ Failed — Try Again'
                : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
