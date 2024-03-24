
import { Component  } from 'react';

import { ItemComponent } from '../ItemComponent'
import React from 'react'
import { VideoItem, IPCInfo, CateItem } from '../../utils';
import  { predealVideoName }  from '../../utils/weapons'
import PropTypes from 'prop-types'

interface HeaderComponentProps {
  handleClickCateItem: any,
  categoriesList: Array<CateItem>,
  videoList: Array<VideoItem>,
  currentCateInfo: CateItem
}
interface HeaderComponentState {
  hightlightStyle: object,
  style: object
}
export class HeaderComponent extends Component<HeaderComponentProps, HeaderComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hightlightStyle: {
        backgroundColor: 'red'
      },
      style: {
        width: '400px',
        height: '400px',
        padding: '5px',
        overflow: 'scroll'
      }
    }
  }


  handleClickCate = (e: any, data: CateItem) => {
    this.props.handleClickCateItem(data)
  }

  componentDidMount(): void {
  }

  render(): React.ReactNode {
    return  (
      <div style={this.state.style}>
          { this.props.categoriesList.map((cate: CateItem, index: number) => {
              return (
                  <ItemComponent
                   style = { this.props.currentCateInfo.name === cate.name? this.state.hightlightStyle: {}}
                   key={ index } onClick={ (e) => this.handleClickCate(e, cate) }>{ cate.name}</ItemComponent>
              )
          })}
      </div>
    )
  }
}

 
