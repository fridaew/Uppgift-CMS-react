import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import { useState } from 'react'
import UpdateProduct from './pages/UpdateProduct'
import OrderList from './pages/OrderList'
import OrderDetails from './pages/OrderDetails'

const App = () => {

  const [user, setUser] = useState(null)
  const [product, setProducts] = useState([])
  
  return (
    <div>
    <Navbar user= {user} setUser={setUser}/>
    <div className='container'>
      <Routes>
        <Route path='/'element={<Home user={user}/>}/>
        <Route path='/products/:id' element={<ProductDetails user={user} product={product} setProducts={setProducts}/>}/>
        <Route path="/add" element= {<Add user={user}/>}/>
        <Route path="products/update/:id" element= {<UpdateProduct user={user}  product={product} setProducts={setProducts}/>}/>
        <Route path="/orders" element= {  <OrderList user={user}/> }/>
        <Route path="/orders/:id" element= { <OrderDetails user={user}/>}/>
        
        <Route path='login' element={<Login user={user} setUser={setUser}/>} />
      </Routes>
  </div>


</div>
  )
}

export default App