import { Suspense, lazy, useState } from 'react'
import Navbar from './components/Navbar'
import HeroAbout from './components/HeroAbout'
import FromIdea from './components/FromIdea'
import Experience from './Experience'
import Projects from './Projects'
import Skills from './Skills'
import CertAchievements from './CertAchievements'
import Contact from './Contact'
import Footer from './components/Footer'

const RobotAssistant = lazy(() => import('./components/RobotAssistant'))
const AITerminal = lazy(() => import('./components/AITerminal'))

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <div>
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <HeroAbout />
      <FromIdea />
      <Experience />
      <Projects />
      <Skills />
      <CertAchievements />
      <Contact />
      <Footer />
      <Suspense fallback={null}>
        <RobotAssistant />
      </Suspense>
      <Suspense fallback={null}>
        <AITerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </Suspense>
    </div>
  )
}

export default App
