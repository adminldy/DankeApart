import React, { useState } from 'react'
import routes from './router'
import { Switch, Route, Link } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Switch>
        {
          routes.map(item => <Route key={item.path} path={item.path} component={item.component} exact ></Route>)
        }
      </Switch>
    </div>
  )
}

export default App
