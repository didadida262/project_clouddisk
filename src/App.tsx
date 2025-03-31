import React, { Component, useEffect, useState } from 'react'
import { CategoriesComponent } from './components/Video/CategoriesComponent'
import { HeaderComponent } from './components/Video/HeaderComponent'
import SearchComponent from './components/Video/Search'
import { VideoComponent } from './components/Video/VideoComponent'
import { IPCInfo, VideoItem, CateItem } from './utils/index'
import { getRandomNum } from './utils/weapons'
import { Spin } from 'antd'
import './App.css'

const App = () => {
  const [ categoriesList, setcategoriesList] = useState([])
  const [ currentCateInfo, setcurrentCateInfo] = useState([]) as any
  const [ currentVideoInfo, setcurrentVideoInfo] = useState([]) as any
  const [ videoList, setvideoList] = useState([]) as any
  const [ videoLoading, setvideoloading] = useState(false)

  const handleClickCateItem = (data: CateItem) => {
    setcurrentCateInfo(data)
    const params = {
      type: 'getAllVideosInCate',
      data: {
        path: data.path
      }
    } 
    window.Main.sendMessage(params as IPCInfo);
    window.Main.on('getAllVideosInCate_back', (data: any) => {
      setvideoList(data)
    })
  }
// 打点
  const getVideo = (videoInfo: VideoItem) => {
    let loadedBuffer = null as any
    setvideoloading(true)
    const params = {
      type: 'getVideoContent',
      data: videoInfo
    } 
    window.Main.sendMessage(params as IPCInfo);
    window.Main.on('getVideoContent_back', (data: any) => {
      console.log('接收数据>>>', data.file)
      const blob = new Blob([data.file], { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)
      setcurrentVideoInfo({
        ...videoInfo,
        url: url
      })
      setvideoloading(false)
    })
  }

  const switchVideo = (type: string) => {
    const currenVideoIndex = videoList.findIndex((item: VideoItem) => item.id === currentVideoInfo.id)
    let target = -1
    switch(type) {
      case 'last':
        if (currenVideoIndex === 0) {
          target = videoList.length - 1
        } else {
          target = currenVideoIndex - 1
        }
        getVideo(videoList[target])
        break
      case 'next':
        if (currenVideoIndex === videoList.length - 1) {
          target = 0
        } else {
          target = currenVideoIndex + 1
        }
        getVideo(videoList[target])
        break;
      default:
        break
    }
  }

  const handleSearch = (data: string) => {
    const target = videoList.findIndex((item: VideoItem) => item.name.includes(data))
    getVideo(videoList[target])

  }

  const getAllCates = () => {
      const params = {
        type: 'getAllCates',
        data: {
          path: 'D:\\RESP'
        }
      } 
      window.Main.sendMessage(params as IPCInfo);
      window.Main.on('getAllCates_back', (data: any) => {
        setcategoriesList(data)
      })
  }
  useEffect(() => {
    getAllCates()
  }, [])

  return (
      <div className='App w-screen h-screen'>
    </div>
  )

}

export default App