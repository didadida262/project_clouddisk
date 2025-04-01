import { useResources } from '../provider/resource-context'
import FileItem from './FileItem'
import cn from 'classnames'

export default function FileList() {
  const { sourcelist } = useResources()

  return (
    <div
      className={cn(
        'w-full h-full flex justify-start items-start gap-x-[20px] gap-y-[20px] flex-wrap content-start',
        'overflow-y-auto'
      )}
    >
      {sourcelist.map((file: any, index: number) => (
        <div key={index} className="w-[100px] h-[110px]">
          <FileItem file={file}></FileItem>
        </div>
      ))}
    </div>
  )
}
