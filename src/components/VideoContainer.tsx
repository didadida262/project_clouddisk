import { useEffect } from 'react'
import { useResources } from '../provider/resource-context'

export default function VideoContainer() {
  const { currentfileurl } = useResources()

  useEffect(() => {
    console.log('selectedFile>>>>change', currentfileurl)
  }, currentfileurl)

  return (
    <div className="w-full h-full flex justify-center items-center">
      <video
        muted
        className="w-full h-full object-fit"
        autoPlay
        loop
        controls
        src={currentfileurl}
      />
    </div>
  )
}
