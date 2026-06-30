import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, Products, State } from "../../types";
import API from "../util/axios";
import { HandleAddQuantity } from "./quantitySlice";

export const HandleCartFetch = createAsyncThunk(
  "cart/fetch",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/cart/${userId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to fetch cart items"
      );
    }
  }
);

export const HandleAddItem = createAsyncThunk(
  "cart/addItem",
  async (itemData: Item, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/cart", itemData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to add to cart"
      );
    }
  }
);

export const HandleRemoveItem = createAsyncThunk(
  "cart/removeItem",
  async (
    { productId, userId }: { productId: number; userId: string },
    { rejectWithValue }
  ) => {
    try {
      await API.delete(`/cart/${userId}/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to remove item"
      );
    }
  }
);

const initialState: State = {
  cart: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<Products>) => {
      state.cart.push(payload);
    },
    removeItem: (state, { payload }: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.productid !== payload);
    },
    addQuantity: (state, { payload }: PayloadAction<number>) => {
      state.cart[payload].quantity += 1;
    },
    addToTotal: (state, { payload }: PayloadAction<number>) => {
      state.total += payload;
    },
    reduceTotal: (state, { payload }: PayloadAction<number>) => {
      if (state.total > 1) state.total -= payload;
    },
    removeItemPrice: (state, { payload }: PayloadAction<number>) => {
      const item = state.cart[payload];
      if (item) item.amount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HandleCartFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        HandleCartFetch.fulfilled,
        (state, { payload }: PayloadAction<Products[]>) => {
          state.cart = payload;
          state.loading = false;
        }
      )
      .addCase(HandleCartFetch.rejected, (state, { payload }: any) => {
        state.error = payload;
        state.loading = false;
      })

      .addCase(HandleAddItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        HandleAddItem.fulfilled,
        (state, { payload }: PayloadAction<Products>) => {
          state.cart.push(payload);
          state.loading = false;
        }
      )
      .addCase(HandleAddItem.rejected, (state, { payload }: any) => {
        state.error = payload;
        state.loading = false;
      })

      .addCase(HandleRemoveItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        HandleRemoveItem.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.cart = state.cart.filter((item) => item.productid !== payload);
          state.loading = false;
        }
      )
      .addCase(HandleRemoveItem.rejected, (state, { payload }: any) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(HandleAddQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        HandleAddQuantity.fulfilled,
        (
          state,
          { payload }: PayloadAction<{ itemId: number; quantity: number }>
        ) => {
          state.loading = false;
          state.cart[payload.itemId].quantity = payload.quantity;
        }
      )
      .addCase(HandleAddQuantity.rejected, (state, { payload }: any) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export const {
  addToCart,
  removeItem,
  addToTotal,
  addQuantity,
  reduceTotal,
  removeItemPrice,
} = cartSlice.actions;
export const cartSelector = (state: any) => state.cart;
export default cartSlice.reducer;
