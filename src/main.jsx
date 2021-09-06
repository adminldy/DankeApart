import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'
import './index.css' //自己写的样式要写在组件库后面
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
