import { configureStore } from "@reduxjs/toolkit";
import productSlice  from "./feature/productSlice";
import cartSlice from "./feature/cartSlice"
import authSlice from "./feature/authSlice"
import totalSlice  from "./feature/totalSlice";
import quantitySlice from "./feature/quantitySlice";
import itemHistorySlice from "./feature/itemHistorySlice";


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