import { useState } from "react";
import api from "../api/index"
import { IPCInfo } from '../utils/index'
import { Button, Input } from "antd"

interface IProps {
    setCurrentpath: (data:any) => void;
    setCategories: (data:any) => void
}

export default function SelectDir(props:IProps) {
    const {setCategories, setCurrentpath} = props

    const handleSelectDirectory = () => {
        const params = {
            type: 'selectPath',
            data: ''
        } 
        api.sendMessage(params as unknown as IPCInfo)
        api.on("selectPath_back", (data:any) => {
            console.log('反馈结果>>>>', data)
            setCategories(data.files)
            setCurrentpath(data.folderPath)
        })
        
    };

  const scanDirectory = (dir: string) => {

  };
    return (
        <div className="text-[white] flex justify-around items-center w-full h-full flex-col">
            <Button onClick={handleSelectDirectory} type="primary" size="large"
              >打开路径
            </Button>
        </div>

    )
}