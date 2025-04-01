import { FolderOutlined } from '@ant-design/icons'
import cn from 'classnames'

interface IProps {
  file: any
}
export default function FileItem(props: IProps) {
  const { file } = props
  return (
    <div
      className={cn(
        'w-full h-full flex flex-col justify-between items-center hover:cursor-pointer',
        'border-[1px] border-solid border-[#383b45]',
        'hover:border-[#0acaff] hover:border-[3px]'
      )}
    >
      <div className="w-full h-[calc(100%_-_30px)] flex justify-center items-center text-[50px]">
        <FolderOutlined />
      </div>
      <div className="w-full h-[30px] flex justify-center items-center truncate text-[12px]">
        {file.name}
      </div>
    </div>
  )
}
