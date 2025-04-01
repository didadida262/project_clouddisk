import { useResources } from '../provider/resource-context'
import FileItem from './FileItem'

export default function FileList() {
  const { setSourcelist, sourcelist } = useResources()

  return (
    <div className="w-full h-full flex justify-start items-start gap-x-[20px] gap-y-[20px] flex-wrap content-start markBorderG px-[8px] py-[8px]">
      {sourcelist.map((file: any, index: number) => (
        <div key={index} className="w-[120px] h-[120px]">
          <FileItem file={file}></FileItem>
        </div>
      ))}
    </div>
  )
}
