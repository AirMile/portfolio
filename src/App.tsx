import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Starfield } from '@/components/background'
import { Home } from '@/pages/Home'
import { ProjectDetail } from '@/pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="min-h-screen bg-neutral-950 text-white">
          <Starfield />
          <Header />
          <main className="relative z-10 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </LenisProvider>
    </BrowserRouter>
  )
}

export default App
