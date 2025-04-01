import {
  FolderOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons'
import cn from 'classnames'

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
  const { file } = props

  const handleClick = () => {
    console.log('select>>>', file)
  }

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col justify-between items-center hover:cursor-pointer',
        'border-[1px] border-solid border-[#383b45]',
        'hover:border-[#0acaff] hover:border-[3px]'
      )}
      onClick={handleClick}
    >
      <div className="w-full h-[calc(100%_-_30px)] flex justify-center items-center text-[50px]">
        {renderIcon(file.type)}
      </div>
      <div className="w-full h-[30px] flex justify-center items-center truncate text-[12px]">
        {file.name}
      </div>
    </div>
  )
}
