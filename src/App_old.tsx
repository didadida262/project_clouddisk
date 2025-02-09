import React, { Component } from 'react'
import { GlobalStyle } from './styles/GlobalStyle'
import { CategoriesComponent } from './components/Video/CategoriesComponent'
import { HeaderComponent } from './components/Video/HeaderComponent'
// import SearchComponent from './components/Video/Search'
import { VideoComponent } from './components/Video/VideoComponent'
import { IPCInfo, VideoItem, CateItem } from './utils/index'
import { getRandomNum } from './utils/weapons'
// import 'element-theme-default'
interface AppProps {
  handleClickCateItem: any,
  categoriesList: Array<CateItem>
}
interface AppState {
  currentVideoInfo: VideoItem,
  currentCateInfo: CateItem,
  showVideoList: Array<VideoItem>,
  videoList: Array<VideoItem>,
  categoriesList: Array<CateItem>
}

export class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentCateInfo: {
        path: '',
        name: ''
      },
      currentVideoInfo: {
        url: '',
        path: '',
        name: '',
        id: 0
      },
      videoList: [],
      showVideoList: [],
      categoriesList: []
    }
  }

  getVideo = (videoInfo: VideoItem) => {
    const params = {
      type: 'getVideoContent',
      data: videoInfo
    } 
    window.Main.sendMessage(params as IPCInfo);
    window.Main.on('getVideoContent_back', (data: any) => {
        const blob = new Blob([data.file], { type: 'mp4' })
        const url = URL.createObjectURL(blob)
        this.setState({
          currentVideoInfo: {
            ...videoInfo,
            url: url
          }
        })
    })
  }
    // getAlll dirs--->cates 
  getAllCates = () => {
      const params = {
        type: 'getAllCates',
        data: {
          path: 'F:\\RESP'
        }
      } 
      window.Main.sendMessage(params as IPCInfo);
      window.Main.on('getAllCates_back', (data: any) => {
        this.setState(
          {
            categoriesList: data
          }
        )
      })
  }
  getAllVideosInCate = (data: CateItem) => {
    this.setState({
      currentCateInfo: {
        ...data
      }
    })
    const params = {
      type: 'getAllVideosInCate',
      data: {
        path: data.path
      }
  } 
    window.Main.sendMessage(params as IPCInfo);
    window.Main.on('getAllVideosInCate_back', (data: any) => {
        this.setState({
          videoList: data,
          showVideoList: data,
        })
        if (!this.state.currentVideoInfo.url) {
          const radndomIndex = getRandomNum(this.state.videoList.length)
          const randomItem: VideoItem = this.state.videoList[radndomIndex]
          this.getVideo(randomItem)
        }
    })
  }
  switchVideo = (type: string) => {
    const currenVideoIndex = this.state.videoList.findIndex((item) => item.id === this.state.currentVideoInfo.id)
    let target = -1
    switch(type) {
      case 'last':
        if (currenVideoIndex === 0) {
          target = this.state.videoList.length - 1
        } else {
          target = currenVideoIndex - 1
        }
        this.getVideo(this.state.videoList[target])
        break
      case 'next':
        if (currenVideoIndex === this.state.videoList.length - 1) {
          target = 0
        } else {
          target = currenVideoIndex + 1
        }
        this.getVideo(this.state.videoList[target])
        break;
      default:
        break
    }
  }
  filterVideoList = (data: string) => {
    // console.log('父组件收到>>>', data)
    // console.log('videoList>>>', this.state.videoList)
    const res = this.state.videoList.filter((video) => video.name.includes(data))
    this.setState({
      showVideoList: res
    })
    
    
  }
  async componentDidMount(): Promise<void> {
    this.getAllCates()
    // this.getAllVideosInCate()
  }
  render() {
    return (
      <div className='App'>
        <GlobalStyle />
        <div className='cate-st'>
          <HeaderComponent
            handleClickCateItem = { this.getAllVideosInCate}
            categoriesList = { this.state.categoriesList }
            currentCateInfo = { this.state.currentCateInfo }
            videoList = { this.state.videoList }/>
          {/* <SearchComponent
            handleClickCateItem = { this.getAllVideosInCate}
            categoriesList = { this.state.categoriesList }
            currentCateInfo = { this.state.currentCateInfo }
            videoList = { this.state.videoList }
            filterVideoList= { this.filterVideoList}/> */}
          <CategoriesComponent
            handleClickVideoItem = { this.getVideo }
            currentVideoInfo = { this.state.currentVideoInfo }
            videoList = { this.state.showVideoList }/>
        </div>
        <VideoComponent
          currentVideoInfo = { this.state.currentVideoInfo }
          nextVideo={ this.switchVideo }
          />
      </div>
    )
  }
}
