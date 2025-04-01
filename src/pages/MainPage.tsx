import { Tag, Input } from 'antd'
import { HeaderComponent } from '../components/Video/HeaderComponent'
import { IPCInfo, VideoItem, CateItem } from '../utils/index'
import SelectDir from '../pages/SelectDir'
import { useResources } from '../provider/resource-context'
import FileItem from '../components/FileItem'

interface IProps {}

export default function MainPage(props: IProps) {
  const { Search } = Input
  const { currentpath, categories, setCurrentpath, setCategories } =
    useResources()

  const onSearch = (data: any) => {
    console.log('data>>>', data)
  }
  return (
    <div className="flex justify-between flex-col items-center w-full h-full px-[12px] py-[12px] text-[white]">
      <div className="operation w-full h-[50px]  flex justify-start items-center gap-x-[10px] px-[5px] py-[5px]">
        <SelectDir />
        <Tag color="#2db7f5">当前路径：{currentpath}</Tag>
      </div>
      <div className="operation w-full h-[calc(100%_-_60px)]  px-[5px] py-[5px] flex flex-col justify-between items-center">
        <div className="w-full h-[30px] ">
          <Search placeholder="搜索文件" onSearch={onSearch} />
        </div>
        <div className="w-full h-[calc(100%_-_50px)] ">
          {categories.length ? (
            <div className="w-full h-full flex justify-start items-start gap-x-[20px] gap-y-[20px] flex-wrap content-start">
              {categories.map((file: any, index: number) => (
                <div key={index} className="w-[120px] h-[120px]">
                  <FileItem file={file}></FileItem>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span>空...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
