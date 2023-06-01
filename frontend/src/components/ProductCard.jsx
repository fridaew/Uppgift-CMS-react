import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/features/products/productsSlice';

const productCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {

        dispatch(deleteProduct(product._id))
            .then(() => {
                console.log('Product deleted successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <div className='product-wrapper'>
            <Link to={`/products/${product._id}`} className='post-item'>
                <div className='product-details'>
                    <div className='product-desc'>
                        <div className='item-column'>
                            <h3>Image</h3>
                            <img src={product.imageURL} alt="bild" width={160} height={130} />
                        </div>

                        <div className='item-column'>
                            <h3>Title</h3>
                            <p>{product.name}</p>
                        </div>

                        <div className='item-column'>
                            <h3> Tags for product</h3>
                            <p> {product.tags}</p>
                        </div>

                        <div className='item-column'>
                            <h3>Price</h3>
                            <p> $ {product.price}</p>
                        </div>

                    </div>
                </div>
        
                </Link>
            <div className='button-rows'>
            <Link to={`/products/update/${product._id}`} className="edit-btn">UPDATE PRODUCT</Link>
            <button onClick={handleDelete} className=' btn-remove btn-primary'>REMOVE PRODUCT</button>
            </div>
         
     
        </div>
    )
}

export default productCard

