import { createSlice } from "@reduxjs/toolkit";
import { Items } from "../../types"

const initialState = {
    Items,
    loading: false
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
})

export const productSelector = (state: any)=>state.products
export default productSlice.reducer