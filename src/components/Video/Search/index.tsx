
import { useEffect, useState } from "react";
import { Button, Input } from "antd"
import { ZoomInOutlined } from '@ant-design/icons';

const SearchComponent = (props: any) => {
  const [ searchText, setsearchText ] = useState('asdasd')
  const { handleSearch } = props

  useEffect(() => {
    console.log('..............')
  }, [searchText])
    return (
        <div className="SearchComponent flex-ac mgb10">
            <Button
                onClick={() => handleSearch(searchText)}
                >搜索
            </Button>
            <Input value={searchText} style={{ width: '280px'}}
              prefix={<ZoomInOutlined />}/>
        </div>
    )
}

export default SearchComponent