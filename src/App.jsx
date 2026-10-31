// App.jsx — composes all sections in order
import Preloader from './components/Preloader'
import SplashCursor from './components/SplashCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import IntroVideo from './components/IntroVideo'
import TechnicalSkills from './components/TechnicalSkills'
import Services from './components/Services'
import Projects from './components/Projects'
import Internships from './components/Internships'
import SoftSkills from './components/SoftSkills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <SplashCursor VELOCITY_DISSIPATION={3} SPLAT_FORCE={3500} COLOR_UPDATE_SPEED={18} COLOR="#ffffff" RAINBOW_MODE={false} />

      {/* Preloader (auto-hides after ~2s) */}
      <Preloader />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <Hero />
      <About />
      <IntroVideo />
      <TechnicalSkills />
      <Services />
      <Projects />
      <Internships />
      <SoftSkills />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}
