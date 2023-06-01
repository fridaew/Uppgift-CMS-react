import {configureStore} from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import singleProductReducer from './features/products/singleProductSlice'
import orderSlice from './features/orders/orderSlice'

export const store = configureStore({
    reducer:{
        products: productsReducer,
        singleProduct: singleProductReducer,
        orders: orderSlice,
    }
})