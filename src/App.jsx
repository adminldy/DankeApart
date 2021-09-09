import React, { useState } from 'react'
import routes from './router'
import { Switch, Route, Redirect } from 'react-router-dom'
//引入百度地图API JS文件
function App() {
  return (
    <div className="App">
      {/* 默认路由匹配  自动跳转到/home */}
      <Route path="/" exact render={() => <Redirect to="/home"></Redirect>}></Route>
      <Switch>
        {
          routes.map(item => <Route key={item.path} path={item.path} component={item.component}></Route>)
        }
      </Switch>
    </div>
  )
}

export default App
