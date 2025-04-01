import { useState } from "react";
import api from "../api/index"
import { IPCInfo } from '../utils/index'

export default function SelectDir() {
    const [files, setFiles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectDirectory = () => {
        console.log('api>>>', api)
        const params = {
            type: 'selectPath',
            data: ''
        } 
        api.sendMessage(params as unknown as IPCInfo)
        api.on("selectPath_back", (data:any) => {
            console.log('反馈结果>>>>', data)
        })
        
    };

  const scanDirectory = (dir: string) => {

  };
    return (
        <div className="text-[white] flex justify-around items-center w-full h-full">
            <button  onClick={handleSelectDirectory}
              >打开路径
            </button>

      
      <div>
        <h3>扫描结果 ({files.length} 个文件):</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
        </div>

    )
}