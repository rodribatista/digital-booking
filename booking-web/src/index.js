import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import General from './pages/General'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Booking from './pages/Booking'

import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<General/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/products/category/:value'
            element={<Catalog type={'category'}/>}/>
          <Route path='/products/city/:value'
            element={<Catalog type={'city'}/>}/>
          <Route path='/products/:value'
            element={<Product/>}/>
          <Route path='/products/:value/booking'
            element={<Booking/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()