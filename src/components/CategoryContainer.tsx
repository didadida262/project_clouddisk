import { useResources } from '../provider/resource-context'
import cn from 'classnames'
import api from '../api/index'
import { IPCInfo } from '../utils/index'

export default function CategoryContainer() {
  const { categories, setSourcelist, currentCate, setCurrentCate } =
    useResources()

  const handleClick = (file: any) => {
    setCurrentCate(file)
    const path = file.path
    const params = {
      type: 'getAllFiles',
      data: path,
    }
    api.sendMessage(params as unknown as IPCInfo)
    api.on('getAllFiles_back', (data: any) => {
      setSourcelist(data.files)
    })
  }

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px] flex flex-col justify-start gap-y-2 overflow-y-scroll">
      {categories.map((item: any, index: number) => (
        <div
          key={index}
          className={cn(
            'w-full h-[40px] markBorderG text-[14px] flex justify-center items-center',
            'hover:bg-[#383b45] rounded-[4px] hover:cursor-pointer',
            currentCate.name === item.name ? 'bg-[#383b45]' : ''
          )}
          onClick={() => handleClick(item)}
        >
          {item.name.length > 8 ? item.name.slice(0, 10) + '...' : item.name}
        </div>
      ))}
    </div>
  )
}
