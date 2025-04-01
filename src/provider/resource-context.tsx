import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface ResourcesContextType {
  currentpath: string
  categories: any[]
  setCurrentpath: (path: string) => void
  setCategories: (categories: any[]) => void
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
)

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [currentpath, setCurrentpath] = useState<string>('')
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    console.log('currentpath>>>', currentpath)
  }, [currentpath])

  return (
    <ResourcesContext.Provider
      value={{ currentpath, categories, setCurrentpath, setCategories }}
    >
      {children}
    </ResourcesContext.Provider>
  )
}

export const useResources = (): ResourcesContextType => {
  const context = useContext(ResourcesContext)
  if (context === undefined) {
    throw new Error('useResources must be used within a ResourcesProvider')
  }
  return context
}
