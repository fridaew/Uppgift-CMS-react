import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productsService from './productsService'

const initialState = {
    products: [],
    error: null,
    loading: false

}
export const deleteProduct = createAsyncThunk('products/delete', async (productId, thunkAPI) => {
    try {
        await productsService.deleteAsync(productId);
        return productId; 
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});
export const updateProduct = createAsyncThunk(
    'products/update',
    async (productId, productData, thunkAPI) => {
      try {
        return await productsService.updateAsync(productId, productData);
        // return productId, productData;
      } catch (err) {
        console.log('Error:', err);
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  );


export const addProduct = createAsyncThunk('product/add', async (productData, thunkAPI) => {
    try {
        return await productsService.createAsync(productData)
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})


export const getAllProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
    try {
        return await productsService.getAllAsync()
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
             
                state.loading = false
                state.products = action.payload
                state.error = null
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false
                state.products = []
                state.error = action.payload
            })


            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = [...state.products, action.payload]
                state.error = null
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products =  state.products.filter((product) => product._id !== action.payload);
                state.error = null
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = state.products.map((product) => product._id === action.payload ? action.payload : product )
                state.error = null
            })
       
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default productsSlice.reducer