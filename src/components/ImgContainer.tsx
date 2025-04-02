import { useEffect } from 'react'
import { useResources } from '../provider/resource-context'
import { Image } from 'antd'

export default function ImgContainer() {
  const { currentfileurl } = useResources()

  return (
    <div className="w-full h-full markBorderG px-[8px] py-[8px] flex justify-center items-center">
      <Image src={currentfileurl} />
    </div>
  )
}
