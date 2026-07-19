import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productId = Number(
  JSON.parse(localStorage.getItem("productId") as string)
);

const initialState = {
  productId,
  tempId: 0,
};

const itemHistorySlice = createSlice({
  name: "itemHistry",
  initialState,
  reducers: {
    setTemp: (state, action) => {
      state.tempId = action.payload;
    },
    setItemHistory: (
      _state,
      { payload }: PayloadAction<{ event: boolean; productId: number }>
    ) => {
      if (payload.event)
        localStorage.setItem("productId", JSON.stringify(payload.productId));
    },
    clearItemHistory: () => {
      localStorage.removeItem("productId");
    },
  },
});

/**
 * Handles item histry selector
 */
export const itemHistrySelector = (state: { itemHistory: number }) =>
  state.itemHistory;
export const { setTemp, setItemHistory, clearItemHistory } =
  itemHistorySlice.actions;
export default itemHistorySlice.reducer;
