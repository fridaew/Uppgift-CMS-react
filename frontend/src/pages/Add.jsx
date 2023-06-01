import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/features/products/productsSlice'
import { Navigate, useNavigate } from 'react-router-dom'




const Add = ({ user }) => {


  if (user == null) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [productData, setproductData] = useState({

    name: '',
    price: '',
    imageURL: '',
    description: '',
    tags: ''
  })



  const handleChange = e => {
    const { id, value } = e.target
    setproductData(form => {
      return {
        ...form,
        [id]: value
      }
    })



  }

  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      ...productData,
      price: +productData.price
    }

    dispatch(addProduct(data))
      .then(() => {
        navigate('/');
      })

    setproductData({
      name: '',
      price: '',
      imageURL: '',
      description: '',
      tags: '',
    });

  }


  return (
    <div className='form-page'>
      <div className='form-text-img'>
        <h1>Add a new product</h1>
      </div>

      <form noValidate className='add-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Product Name:</label>
          <input type="text" className="form-control1" id='name' value={productData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Product Price:</label>
          <input type="text" inputMode='decimal' className="form-control" id='price' value={productData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="imageURL" className="form-label">Image Url:</label>
          <input type="text" className="form-control" id='imageURL' value={productData.imageURL} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="tags" className="form-label">Category</label>
          <input type='text' className='form-control' id="tags" value={productData.tags} onChange={handleChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Product Description:</label>
          <textarea className='form-control' id="description" rows="10" cols="70" value={productData.description} onChange={handleChange}></textarea>
        </div>

        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  )
}

export default Add