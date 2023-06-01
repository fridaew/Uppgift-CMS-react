
const getAllAsync = async () => {
    const res = await fetch('http://localhost:9998/api/products/')
    if(!res.ok) throw new Error('Something went wrong')
    return res.json()
}


const getByIdAsync = async (productId) => {
  try {
    const res = await fetch(`http://localhost:9998/api/products/` + productId );
    if (!res.ok) throw new Error('Something went wrong');
    return res.json();
  } catch (err) {
    console.log('Error in getByIdAsync:', err);
    throw err;
  }
};


const createAsync = async (productData) => {
  try {
    const response = await fetch('http://localhost:9998/api/products/', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      const createdProduct = await response.json();
      return createdProduct; // Return the created product data
    } else {
      // Handle error response
      throw new Error('Failed to create product');
    }
  } catch (error) {
    // Handle network or other errors
    throw error;
  }
};


const deleteAsync = async (productId, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`http://localhost:9998/api/products/${productId}`, options);
  if (!res.ok) {
    throw new Error('Something went wrong');
  }
};


async function updateAsync(productData, productId) {
  try {
    const response = await fetch(`http://localhost:9998/api/products/${productId}`, {
      method: "PUT",
      body: productData,
    });
    if (!response.ok) {
      throw new Error('Failed to update product. Status: ' + response.status);
    }
    const result = await response.json();
    console.log("Success:", result);
    return result
  } catch (error) {
    console.error("Error:", error);
  }
}
  

const productsService = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    deleteAsync,
    updateAsync
 
    
}

export default productsService