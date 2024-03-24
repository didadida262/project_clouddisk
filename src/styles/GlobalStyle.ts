import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }
  .App {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // 全局的滚动条样式修改
  *::-webkit-scrollbar {
    width: 7px;
    height: 10px;
    background-color: transparent;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  // *::-webkit-scrollbar-track {
  //   background-color: black;
  // }

  /*定义滚动条轨道 内阴影+圆角*/
  *::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 6px;
  }

  /*定义滑块 内阴影+圆角*/
  .scrollbarHide::-webkit-scrollbar {
    display: none
  }

  .scrollbarShow::-webkit-scrollbar {
    display: block
  }
  .cate-st {
    width: '400px',
    height: '100vh',
    overflow: 'scroll',
    padding: '5px'
    border: '1px solid red'
  }

`
