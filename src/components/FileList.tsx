import { useResources } from '../provider/resource-context'
import FileItem from './FileItem'
import cn from 'classnames'
import { IPCInfo } from '../utils/index'
import api from '../api/index'
import { useEffect } from 'react'

export default function FileList() {
  const { sourcelist, selectedFile, selectFile } = useResources()

  useEffect(() => {
    if (!selectedFile.name) return
    selectFile(selectedFile)
  }, [selectedFile])

  return (
    <div
      className={cn('w-full h-full', 'overflow-x-auto')}
      style={{ whiteSpace: 'nowrap' }}
    >
      {sourcelist.map((file: any, index: number) => (
        <FileItem file={file} key={index}></FileItem>
      ))}
    </div>
  )
}
