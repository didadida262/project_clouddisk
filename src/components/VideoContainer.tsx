import { useResources } from '../provider/resource-context'

export default function VideoContainer() {
  const { currentpath, categories, setCurrentpath, setCategories } =
    useResources()

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px]">
      videoZContainer
    </div>
  )
}
