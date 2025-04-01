import { Tag,Input } from 'antd'
import { HeaderComponent } from '../components/Video/HeaderComponent'
import { IPCInfo, VideoItem, CateItem } from '../utils/index'
import SelectDir from '../pages/SelectDir'

interface IProps {
    currentpath: string;
        setCurrentpath: (data:any) => void;
    setCategories: (data:any) => void
}

export default function MainPage(props: IProps) {
const { Search } = Input;
    const { currentpath,setCurrentpath,setCategories } = props
    
    const onSearch = (data:any) => {
        console.log('data>>>', data)

    }
  return (
    <div className="flex justify-between flex-col items-center w-full h-full px-[12px] py-[12px]">
      <div className="operation w-full h-[50px] markBorderG flex justify-start items-center gap-x-[10px]">
        <Search placeholder="搜索文件" onSearch={onSearch}  />
         <SelectDir setCurrentpath={setCurrentpath} setCategories={setCategories} />
        <Tag color="#2db7f5">当前路径：{currentpath}</Tag>
      </div>
      <div className="operation w-full h-[calc(100%_-_60px)] markBorderG"></div>
    </div>
  )
}
