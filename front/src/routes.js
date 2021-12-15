import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

import Home from './containers/Home'

const RoutesPath = () => {
    return(
      <BrowserRouter>
        <Routes>
          <Route component={Home} path="/" element={<Home />} exact />
        </Routes>
      </BrowserRouter>
    )
}

export default RoutesPath