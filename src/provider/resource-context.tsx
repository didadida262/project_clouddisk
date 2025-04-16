import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import api from '../api/index'
import { IPCInfo } from '../utils/index'

export interface TFile {
  name: string
  path: string
  type: string
}
interface ResourcesContextType {
  currentpath: string
  categories: any[]
  sourcelist: any[]
  currentCate: any
  currentFile: any
  currentfileurl: any
  palyerMode: string
  setPalyerMode: (mode: string) => void
  setcurrentfileurl: (file: any) => void
  setCurrentFile: (file: any) => void
  setCurrentCate: (file: any) => void
  setCurrentpath: (path: string) => void
  setCategories: (categories: any[]) => void
  setSourcelist: (categories: any[]) => void
  selectFile: (file: TFile) => void
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(
  undefined
)

export const ResourcesProvider = ({ children }: { children: ReactNode }) => {
  const [currentpath, setCurrentpath] = useState<string>('')
  const [currentCate, setCurrentCate] = useState<any>({})
  const [currentFile, setCurrentFile] = useState<any>({})
  const [currentfileurl, setcurrentfileurl] = useState<any>()
  const [palyerMode, setPalyerMode] = useState<string>('order')
  const [categories, setCategories] = useState<any[]>([])
  const [sourcelist, setSourcelist] = useState<any[]>([])

  const handleVideoFile = (file: BlobPart) => {
    const blob = new Blob([file], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    setcurrentfileurl(url)
  }
  const handleCommonFile = (file: BlobPart, type: string) => {
    const blob = new Blob([file])
    const url = URL.createObjectURL(blob)
    setcurrentfileurl(url)
  }
  const handlePdfFile = (file: BlobPart, type: string) => {
    const blob = new Blob([file], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    setcurrentfileurl(url)
  }

  const selectFile = (file: TFile) => {
    const params = {
      type: 'getVideoContent',
      data: file.path,
    }
    api.sendMessage(params as unknown as IPCInfo)
    api.on('getVideoContent_back', (data: any) => {
      switch (file.type) {
        case 'video':
          handleVideoFile(data.file)
          break
        case 'image':
          handleCommonFile(data.file, file.type)
          break
        case 'pdf':
          handlePdfFile(data.file, file.type)
          break
        case 'audio':
          handleCommonFile(data.file, file.type)
          break
        default:
          break
      }
    })
  }

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
        currentCate,
        currentFile,
        currentfileurl,
        setPalyerMode,
        setCurrentpath,
        setSourcelist,
        setCategories,
        setCurrentCate,
        setCurrentFile,
        setcurrentfileurl,
        selectFile,
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
