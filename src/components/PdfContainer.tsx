import { useEffect } from 'react'
import { useResources } from '../provider/resource-context'
import { Image } from 'antd'

export default function PdfContainer() {
  const { currentfileurl } = useResources()

  useEffect(() => {
    console.log('pdf_modules>>>', currentfileurl)
  }, [currentfileurl])

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      {/* 方式1 */}
      <iframe src={currentfileurl} width="100%" title="PDF Viewer" />
      {/* 方式2 */}
      {/* <object data={currentfileurl} type="application/pdf" width="100%">
        <p>
          您的浏览器不支持PDF预览，请<a href={currentfileurl}>下载PDF</a>。
        </p>
      </object> */}
    </div>
  )
}
