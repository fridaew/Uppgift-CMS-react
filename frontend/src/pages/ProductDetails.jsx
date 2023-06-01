
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductById } from '../store/features/products/singleProductSlice';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom'





const ProductDetails = ({user}) => {

    if (user == null) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  const dispatch = useDispatch();
  const { id } = useParams()

    

  useEffect(() => {
    dispatch(getProductById(id));
  },[]);

  const { product, loading, error } = useSelector(state => state.singleProduct)
  

  if(error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    )
  }


  return (
    <>
     { loading && <p>Loading...</p> }
     { product &&
      <div className='product-details-wrapper'>
         <div className='img-card'>
        <img src={product.imageURL} alt="bild" width={430} height={360} />
        </div>
        <div className='text-card'>   
        <h2>{product.name}</h2>
        <hr />
        <p>Description: {product.description}</p>
        <hr />
        <p>Price: ${product.price}</p>
        <hr />
        <p>Tags: {product.tags}</p>
        <hr />
        <div className='details-update'>
          <Link to={`/products/update/${product._id}`} className="edit-btn">UPDATE THIS PRODUCT</Link>
        </div>
        
        </div>
    </div>}
   
    </>
  );
};

export default ProductDetails;

