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
  sourcelist: any[]
  selectedCate: any
  selectedFile: any
  currentfileurl: any
  palyerMode: string
  setPalyerMode: (mode: string) => void
  setcurrentfileurl: (file: any) => void
  setSelectedFile: (file: any) => void
  setSelectedCate: (file: any) => void
  setCurrentpath: (path: string) => void
  setCategories: (categories: any[]) => void
  setSourcelist: (categories: any[]) => void
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
)

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [currentpath, setCurrentpath] = useState<string>('')
  const [palyerMode, setPalyerMode] = useState<string>('order')
  const [currentfileurl, setcurrentfileurl] = useState<any>()
  const [categories, setCategories] = useState<any[]>([])
  const [sourcelist, setSourcelist] = useState<any[]>([])
  const [selectedCate, setSelectedCate] = useState<any>({})
  const [selectedFile, setSelectedFile] = useState<any>({})

  useEffect(() => {
    console.log('currentpath>>>', currentpath)
  }, [currentpath])

  return (
    <ResourcesContext.Provider
      value={{
        currentpath,
        categories,
        sourcelist,
        palyerMode,
        selectedCate,
        selectedFile,
        currentfileurl,
        setPalyerMode,
        setCurrentpath,
        setSourcelist,
        setCategories,
        setSelectedCate,
        setSelectedFile,
        setcurrentfileurl,
      }}
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
