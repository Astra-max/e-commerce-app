import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../../types";
import API from "../../services/axios";

const PAGE_SIZE = 10;

interface FetchProductsArgs {
  limit?: number;
  offset?: number;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
};

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (
    { limit = PAGE_SIZE, offset = 0 }: FetchProductsArgs = {},
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.get(
        `/products?limit=${limit}&offset=${offset}`
      );

      const products = (data.data || []).map((item: any) => ({
        productid: item.product_id,
        name: item.product_name,
        amount: Number(item.price),
        image: item.product_image_url,
        quantity: item.stock_quantity ?? 1,
        description: item.description,
        category: item.product_category,
      }));

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
        const arg = action.meta.arg || {};
        const offset = arg.offset ?? 0;
        const limit = arg.limit ?? PAGE_SIZE;

        if (offset === 0) {
          state.items = action.payload;
        } else {
          state.items = [...state.items, ...action.payload];
        }

        state.hasMore = action.payload.length >= limit;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const productSelector = (state: any) => state.products;

export default productSlice.reducer;
