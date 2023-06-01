import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from './orderService'

const initialState = {
    orders: [],
    error: null,
    loading: false
  }

  export const getAllOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
    try {
      return await orderService.getOrderAsync()
      
      } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  })



  
export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllOrders.pending, state => {
          state.loading = true
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
          state.loading = false
          state.orders = action.payload
          state.error = null
        })
        .addCase(getAllOrders.rejected, (state, action) => {
          state.loading = false
          state.orders = []
          state.error = action.payload
        })
    }
  })

  export default orderSlice.reducer