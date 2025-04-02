import { useEffect } from 'react'
import { useResources } from '../provider/resource-context'

export default function VideoContainer() {
  const { currentfileurl } = useResources()

  useEffect(() => {
    console.log('selectedFile>>>>change', currentfileurl)
  }, currentfileurl)

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px] flex justify-center items-center markBorderL">
      <video muted className="video" autoPlay src={currentfileurl} />
    </div>
  )
}
