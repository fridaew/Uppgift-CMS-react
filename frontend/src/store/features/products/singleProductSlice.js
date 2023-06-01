import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productsService from './productsService'

const initialState = {
    product: null,
    error: null,
    loading: false

}

export const getProductById = createAsyncThunk('singleProduct/getbyId', async (productId, thunkAPI) =>{
try {
return await productsService.getByIdAsync(productId)

} catch (err){
    console.log('Error:', err); 
    return thunkAPI.rejectWithValue(err.message)
}
})

export const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(getProductById.pending, (state, action) =>{
                state.loading = true
            })
            .addCase(getProductById.fulfilled, (state, action) =>{
                state.loading = false
                state.product = action.payload
                state.error = null
            })
            .addCase(getProductById.rejected, (state, action) =>{
                state.loading = false
                state.product = null
                state.error = action.payload
            })
    }
})

export default singleProductSlice.reducer