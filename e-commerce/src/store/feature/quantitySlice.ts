import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../util/axios";
import { Products } from "../../../types";

interface QuantityState {
  loading: boolean;
  quantity: number;
  error: string | null;
}

const initialState: QuantityState = {
  loading: false,
  error: null,
  quantity: 0,
};

export const HandleAddQuantity = createAsyncThunk(
  "quantity/add",
  async (item: { userId: string; productId: string }, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/quantity/add", item);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to add quantity"
      );
    }
  }
);

export const HandleReduceQuantity = createAsyncThunk(
  "quantity/reduce",
  async (item: { userId: string; itemId: string }, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/quantity/reduce", item);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to reduce quantity"
      );
    }
  }
);

const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    incrementQuantity: (
      _state,
      action: PayloadAction<{ cart: Products[]; index: number }>
    ) => {
      const { cart, index } = action.payload;
      cart[index].quantity += 1;
      cart[index].amount = cart[index].quantity * cart[index].amount;
    },
    decrementQuantity: (
      _state,
      action: PayloadAction<{ cart: Products[]; index: number }>
    ) => {
      const { cart, index } = action.payload;
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        cart[index].amount = cart[index].quantity * cart[index].amount;
      }
    },
  },
});

/**
 * Handles quantity selector
 */
export const quantitySelector = (state: { quantity: number }) =>
  state.quantity;
export const { incrementQuantity, decrementQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
