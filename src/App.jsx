import React, { useState } from 'react'
import routes from './router'
import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Switch>
        {
          routes.map(item => <Route key={item.path} path={item.path} component={item.component}></Route>)
        }
      </Switch>
    </div>
  )
}

export default App
