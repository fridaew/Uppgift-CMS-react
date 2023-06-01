
import { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = ({ user, setProducts }) => {

  if (user === null) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const navigate = useNavigate()

  const { id } = useParams();

  const [productData, setProductData] = useState({ //instasierar produktData som inehåller objekt med name price etc
    name: '',
    price: '',
    imageURL: '',
    description: '',
    tags: '',
  });

  useEffect(() => { // fetsh mot produkten som finns  ( hämtar alla produkter)
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:9998/api/products/' + id);
        const existingProduct = await response.json();
        setProductData(existingProduct); // lägger in data i productData
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...productData,
      price: +productData.price,
    };


    try {
      const response = await fetch('http://localhost:9998/api/products/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }
    

      const updatedProduct = await response.json();
      console.log('Updated Product:', updatedProduct);

      setProductData({
        name: '',
        price: '',
        imageURL: '',
        description: '',
        tags: '',
      });

      setProducts((prevProducts) => [...prevProducts, updatedProduct]);

      navigate('/')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form-page'>
     <div className='form-text-img'>
        <h1>Update product</h1>
       <img src={productData.imageURL} alt="" width={370} height={290} />
      </div>
    <form noValidate className='add-form' name='update-product-form' onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Product Name:</label>
        <input type="text" className="form-control1" id='name' value={productData.name} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="price" className="form-label">Product Price:</label>
        <input type="text" inputMode='decimal' className="form-control" id='price'  value={productData.price} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="imageURL" className="form-label">Image Url:</label>
        <input type="text" className="form-control" id='imageURL' value={productData.imageURL} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="tags" className="form-label">Category</label>
        <input type='text' className='form-control' id="tags" value={productData.tags} onChange={handleChange}></input>
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">Product Description:</label>
        <textarea className='form-control' id="description" rows="10" cols="70" value={productData.description} onChange={handleChange}></textarea>
      </div>
   
      <button className="btn btn-primary">Update Product</button>
    </form>
  </div>
  )
  }

export default UpdateProduct



