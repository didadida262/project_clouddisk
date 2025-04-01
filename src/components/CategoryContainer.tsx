import { useResources } from '../provider/resource-context'
import cn from 'classnames'
import api from '../api/index'
import { IPCInfo } from '../utils/index'

export default function CategoryContainer() {
  const { categories, setSourcelist, selectedCate, setSelectedCate } =
    useResources()

  const handleClick = (file: any) => {
    console.log('select_cate>>', file)
    setSelectedCate(file)
    const path = file.path
    const params = {
      type: 'getAllFiles',
      data: path,
    }
    api.sendMessage(params as unknown as IPCInfo)
    api.on('getAllFiles_back', (data: any) => {
      console.log('反馈结果>>>>', data)
      setSourcelist(data.files)
    })
  }

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px] flex flex-col justify-start items-center gap-y-2">
      {categories.map((item: any, index: number) => (
        <div
          key={index}
          className={cn(
            'w-full h-[40px] markBorderG text-[14px] flex justify-center items-center',
            'hover:bg-[#383b45] rounded-[4px] hover:cursor-pointer',
            selectedCate.name === item.name ? 'bg-[#383b45]' : ''
          )}
          onClick={() => handleClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
