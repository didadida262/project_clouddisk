import { useEffect } from 'react'
import { useResources } from '../provider/resource-context'

export default function VideoContainer() {
  const { selectedFile } = useResources()

  useEffect(() => {
    console.log('selectedFile>>>>', selectedFile)
  }, selectedFile)

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px] flex justify-center items-center">
      <video muted className="video" autoPlay src={selectedFile.fileContent} />
    </div>
  )
}
