import { useResources } from '../provider/resource-context'
import cn from 'classnames'

export default function CategoryContainer() {
  const { currentpath, categories, setCurrentpath, setCategories } =
    useResources()

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px] flex flex-col justify-start items-center gap-y-2">
      {categories.map((item: any, index: number) => (
        <div
          key={index}
          className={cn(
            'w-full h-[40px] markBorderG text-[14px] flex justify-center items-center',
            'hover:bg-[#383b45] rounded-[4px] hover:cursor-pointer'
          )}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
