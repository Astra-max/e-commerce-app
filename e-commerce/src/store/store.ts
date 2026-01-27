import { configureStore } from "@reduxjs/toolkit";
import productSlice  from "./productSlice";
import cartSlice from "./cartSlice"
import authSlice from "./authSlice"
import totalSlice  from "./totalSlice";
import quantitySlice from "./quantitySlice";
import itemHistorySlice from "./itemHistorySlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        products: productSlice,
        quantity: quantitySlice,
        total: totalSlice,
        itemHistory: itemHistorySlice,
    }
})

export default store