
import { useEffect, useState } from "react";
import { Button, Input } from "antd"
import { ZoomInOutlined } from '@ant-design/icons';

const SearchComponent = (props: any) => {
  const { handleSearch } = props
  const { Search } = Input;
    return (
      <div className="SearchComponent flex-ac mgb10">
        <Search
         placeholder="input search text" 
         enterButton="Search" 
         onSearch={handleSearch} />
      </div>
    )
}

export default SearchComponent