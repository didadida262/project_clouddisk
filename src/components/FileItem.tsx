import {
  FolderOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons'
import cn from 'classnames'
import { useResources } from '../provider/resource-context'
import api from '../api/index'
import { IPCInfo } from '../utils/index'

interface IProps {
  file: any
}
type FileType = 'directory' | 'video' | 'word' | 'pdf' | 'image'
const renderIcon = (type: FileType) => {
  const mapIcon = {
    directory: <FolderOutlined />,
    video: <VideoCameraOutlined />,
    word: <FileWordOutlined />,
    pdf: <FilePdfOutlined />,
    image: <FileImageOutlined />,
  }
  return mapIcon[type] ? mapIcon[type] : <FileUnknownOutlined />
}
export default function FileItem(props: IProps) {
  const { selectedFile, setSelectedFile, currentfileurl, setcurrentfileurl } =
    useResources()
  const { file } = props

  const handleVideoFile = (file: BlobPart) => {
    console.log('getVideoContent_back>>>>', file)
    const blob = new Blob([file], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    setcurrentfileurl(url)
  }
  const handleImgFile = (file: BlobPart) => {
    console.log('getVideoContent_back>>>>', file)
    const blob = new Blob([file], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)
    setcurrentfileurl(url)
  }

  const handleClick = () => {
    console.warn('handleClick>>>file', file)
    setSelectedFile(file)
    const params = {
      type: 'getVideoContent',
      data: file.path,
    }
    api.sendMessage(params as unknown as IPCInfo)
    api.on('getVideoContent_back', (data: any) => {
      switch (file.type) {
        case 'video':
          handleVideoFile(data.file)
          break
        case 'image':
          handleImgFile(data.file)
          break
        default:
          break
      }
    })
  }

  return (
    <div
      className={cn(
        'w-[100px] h-[110px] flex flex-col justify-between items-center hover:cursor-pointer',
        'border-[1px] border-solid border-[#383b45]',
        'hover:border-[#0acaff] hover:border-[3px]',
        selectedFile.name === file.name ? 'border-[#0acaff] border-[3px]' : ''
      )}
      onClick={handleClick}
    >
      <div className="w-full h-[calc(100%_-_30px)] flex justify-center items-center text-[30px]">
        {renderIcon(file.type)}
      </div>
      <div className="w-full h-[30px] flex justify-center items-center truncate text-[12px]">
        {file.name}
      </div>
    </div>
  )
}
