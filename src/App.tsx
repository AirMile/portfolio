import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Home } from '@/pages/Home'
import { ProjectDetail } from '@/pages/ProjectDetail'

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="min-h-screen bg-neutral-950 text-white">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </BrowserRouter>
  )
}

export default App
