import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../store/features/products/productsSlice'
import { Navigate } from 'react-router-dom'

const Home = ({user}) => {

  if (user == null){ 
    return <Navigate to="/login" replace state ={{ from: location.pathname}}/>
  }
  
  const dispatch = useDispatch()
  const { products, error, loading} = useSelector(state => state.products) 

  
  useEffect (() => {
    dispatch(getAllProducts())
  },[])




  return (

    <div>
    { loading && <p>Loading...</p> }
    { error && <p>{ error }</p> }

    {
      products && products.length > 0 ? (products.map(product => <ProductCard key={product._id} product={product} />)
      ): <h2>No posts to show</h2>
      }
  </div>


  )
}

export default Home