import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
//导入虚拟列表样式
import 'react-virtualized/style.css'
import './assets/fonts/iconfont.css'
import './index.css' //自己写的样式要写在组件库后面
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
