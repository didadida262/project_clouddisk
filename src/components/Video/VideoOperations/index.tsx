
import { Button } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined, RetweetOutlined, BorderInnerOutlined } from '@ant-design/icons';
import './index.scss'
import { useState } from 'react';

const VideoOperationsComponent = (props: any) => {
  const { handleNextVideo } = props
  const [ playWay, setplayWay ] = useState('normal')
  
  return (
      <div className='VideoOperationsComponent flex-bc'>
        <Button style={{ width: '30%'}} type='primary' size='large' icon={<LeftCircleOutlined />} onClick={ () => handleNextVideo('last')}>切换上</Button>
        <Button style={{ width: '30%'}} type='primary' size='large' icon={<RightCircleOutlined />} onClick={ () => handleNextVideo('next')}>切换下</Button>
        { playWay === 'normal'? (
          <Button style={{ width: '30%'}} type='primary' size='large' icon={<RetweetOutlined />} onClick={ () => setplayWay('unnormal')}>顺序</Button>
        ): (
          <Button style={{ width: '30%'}} type='primary' size='large' icon={<BorderInnerOutlined />}onClick={ () => setplayWay('normal')}>随机</Button>
        )}
      </div>
  )
}

export default VideoOperationsComponent