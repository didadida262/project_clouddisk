import { useResources } from '../provider/resource-context'
import FileItem from './FileItem'
import cn from 'classnames'

export default function FileList() {
  const { sourcelist } = useResources()

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
