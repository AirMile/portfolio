import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'

interface TransitionContextType {
  isReturningHome: boolean
}

const TransitionContext = createContext<TransitionContextType>({
  isReturningHome: false,
})

export function useTransition() {
  return useContext(TransitionContext)
}

interface TransitionProviderProps {
  children: ReactNode
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const location = useLocation()
  const [isReturningHome, setIsReturningHome] = useState(false)
  const [prevPath, setPrevPath] = useState<string | null>(null)

  useEffect(() => {
    // Detect if we're returning to home from a project page
    if (prevPath !== null && prevPath !== location.pathname) {
      const wasOnProject = prevPath.startsWith('/projects/')
      const isNowHome = location.pathname === '/'
      setIsReturningHome(wasOnProject && isNowHome)

      // Reset after animations complete
      if (wasOnProject && isNowHome) {
        const timer = setTimeout(() => setIsReturningHome(false), 1000)
        return () => clearTimeout(timer)
      }
    }

    setPrevPath(location.pathname)
  }, [location.pathname, prevPath])

  return (
    <TransitionContext.Provider value={{ isReturningHome }}>
      {children}
    </TransitionContext.Provider>
  )
}
