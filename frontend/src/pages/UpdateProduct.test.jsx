
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import UpdateProduct from '../pages/UpdateProduct';

const MockUpdateProduct = () => {
  return (
    <Router>
      <UpdateProduct />
    </Router>
  );
};

describe('UpdateProduct', () => {
  it('should render the all the textInputs', async () => {
    render(<MockUpdateProduct />);
    const nameInput = screen.getByLabelText('Product Name:');
    expect(nameInput).toBeInTheDocument();

    const priceInput = screen.getByLabelText('Product Price:');
    expect(priceInput).toBeInTheDocument();

    const imageURLInput = screen.getByLabelText('Image Url:');
    expect(imageURLInput).toBeInTheDocument();

    const tagsInput = screen.getByLabelText('Category');
    expect(tagsInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText('Product Description:');
    expect(descriptionInput).toBeInTheDocument();
  });

  
  it('changes the value of an input', async () => {
    render(<MockUpdateProduct />)
    const nameInput = screen.getByLabelText('Product Name:')
    fireEvent.change(nameInput, { target: { value: "A text that is entered into the input" } })
    expect(nameInput.value).toBe("A text that is entered into the input")
  })
});

     
      
      
      
      
      
      
      
