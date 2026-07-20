import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../../types"
import API from "../../util/axios";

const initialState: ProductState = {
    items: [],
    loading: false,
    error: null,
}

export const getAllProducts = createAsyncThunk(
    "products/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get("/products");
            console.log(data)
            return data.data;

        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch products"
            )
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending ,(state, { payload }: any)=> {
            state.loading = true;
            state.error = payload
        })
        .addCase(getAllProducts.fulfilled ,(state, { payload }: any)=> {
            state.loading = false;
            state.error = null;
            state.items = payload;
        })
        .addCase(getAllProducts.rejected ,(state, { payload }: any)=> {
            state.loading = false;
            state.error = payload;
        })
    }
})

// Handles product selector
export const productSelector = (state: any) => state.products
export default productSlice.reducer