import { useResources } from '../provider/resource-context'
import FileItem from './FileItem'
import cn from 'classnames'
import { IPCInfo } from '../utils/index'
import api from '../api/index'
import { useEffect } from 'react'

export default function FileList() {
  const { sourcelist } = useResources()
  const { selectedFile, setSelectedFile, currentfileurl, setcurrentfileurl } =
    useResources()
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

  const handleSelect = (file: any) => {
    setSelectedFile(file)
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
    console.log('selectedFile>>>', selectedFile)
    if (!selectedFile.name) return
    handleSelect(selectedFile)
  }, [selectedFile])

  return (
    <div
      className={cn(
        'w-full h-full flex justify-start items-center gap-x-[20px]',
        'overflow-x-auto'
      )}
    >
      {sourcelist.map((file: any, index: number) => (
        <FileItem file={file} key={index}></FileItem>
      ))}
    </div>
  )
}
