import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Pages/Shop'
import Footer from './Components/Footer/Footer'
import ShopCategory from './Pages/ShopCategory'
import kids_banner from './Components/Assets/banner_kids.png';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Product from './Pages/Product'

export default function App() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
            <Routes>
              <Route path='/' element={<Shop />}/>
              <Route path='/men' element={<ShopCategory banner={men_banner} category="Men"/>}/>
              <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
              <Route path='/kids' element={<ShopCategory banner={kids_banner} category="Kid"/>}/>
              <Route path='/login' element={<Login />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product' element={<Product/>}>
                <Route path=':productId' element={<Product/>}/>
              </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
      </div>
    )
}

