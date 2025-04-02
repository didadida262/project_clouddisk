import { useEffect } from 'react'
import { useResources } from '../provider/resource-context'
import { Button } from 'antd'

export default function VideoContainer() {
  const {
    currentfileurl,
    palyerMode,
    setPalyerMode,
    selectedFile,
    sourcelist,
  } = useResources()

  const handleNext = () => {}
  const handlePlayMode = () => {
    setPalyerMode(palyerMode === 'order' ? 'random' : 'order')
  }
  const handleVideoEnded = () => {
    //   播放结束，根据当前播放模式，选择下一个
    const currentIndex = sourcelist.findIndex(
      item => item.name === selectedFile.name
    )
    let nextFileIndex =
      palyerMode === 'order'
        ? currentIndex + 1
        : Math.random() * sourcelist.length
    if (nextFileIndex >= sourcelist.length) {
      nextFileIndex = 0
    }
    const nextFile = sourcelist[nextFileIndex]
    selectedFile(nextFile)
  }

  useEffect(() => {
    console.log('selectedFile>>>>change', currentfileurl)
  }, currentfileurl)

  return (
    <div className="w-full h-full flex justify-between items-center flex-col">
      <div className="video w-full h-[calc(100%_-_55px)] selectedG flex justify-center items-center">
        <video
          muted
          className="w-full h-full object-fit"
          autoPlay
          controls
          src={currentfileurl}
          onEnded={handleVideoEnded} // 直接监听结束事件
        />
      </div>
      <div className="operation w-full h-[50px] flex justify-start items-center gap-x-[20px]">
        {palyerMode === 'order' ? (
          <Button type="primary" onClick={handlePlayMode}>
            顺序播放
          </Button>
        ) : (
          <Button type="primary" onClick={handlePlayMode}>
            随机播放
          </Button>
        )}

        <Button type="primary" onClick={handleNext}>
          下一首
        </Button>
      </div>
    </div>
  )
}
