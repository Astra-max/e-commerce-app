import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../../types";
import API from "../../util/axios";

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products");

      const products = (data.data || []).map((item: any) => ({
        productid: item.product_id,                 // UUID string
        name: item.product_name,
        amount: Number(item.price),                // convert string to number
        image: item.product_image_url,
        quantity: item.stock_quantity ?? 1,
        description: item.description,
        category: item.product_category,
      }));

      console.log(products); // verify

      return products;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.payload as any;
      });
  },
});

export const productSelector = (state: any) => state.products;

export default productSlice.reducer;