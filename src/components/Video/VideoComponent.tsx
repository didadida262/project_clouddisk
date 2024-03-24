
import React, { Component } from 'react'
import { useState } from 'react';
import { Button } from '../Button'
import { predealVideoName, IPCInfo, VideoItem } from '../../utils';
import VideoOperationsComponent from './VideoOperations';

interface VideoComponentProps {
  nextVideo: any,
  currentVideoInfo: VideoItem
}
interface VideoComponentState {
  videoUrl: string,
  videoName: string,
  style: object,
  styleVideoInfo: object,
  styleVideoOperation: object,
  styleVideo: object
}
export class VideoComponent extends Component<VideoComponentProps, VideoComponentState> {
  constructor(props: any) {
    super(props)
    this.state = {
      videoUrl: '',
      videoName: '',
      style: {
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      styleVideoInfo: {
          width: '100%',
          height: '80px',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '10px',
          fontWeight: 'bold'
        },
        styleVideoOperation: {
          width: '100%',
          height: '80px',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '10px'
        },
        styleVideo: {
          width: '100%',
          height: 'calc(100% - 165px)',
          border: '1px solid black'
          
        }
    }
  }

  handleNextVideo = (type: string) => {
    this.props.nextVideo(type)
  }
  setListener = () => {
    const videoDom = document.getElementById('player')
    videoDom?.addEventListener('ended', () => {
      // console.log('播放结束...')
      this.handleNextVideo('next')
    })

  }

  componentDidMount(): void {
    this.setListener()
  }
  render(): React.ReactNode {
    return (
      <>
        <div style={ this.state.style }>
          <div style={ this.state.styleVideoInfo }>
              <span> { this.props.currentVideoInfo.id + '. ' + this.props.currentVideoInfo.name }</span>
          </div>
          <video
            id='player'
            style={this.state.styleVideo}
            controls
            autoPlay
            src={this.props.currentVideoInfo.url}
          >
          </video>
          <div style={this.state.styleVideoOperation}>
            <VideoOperationsComponent handleNextVideo={ this.handleNextVideo }/>
          </div>
        </div>
      </>
    )
  }



}
 
