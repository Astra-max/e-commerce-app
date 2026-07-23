import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../util/axios";


interface TotalState {
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TotalState = {
  total: 0,
  loading: false,
  error: null,
};

export const HandleGetTotal = createAsyncThunk(
  "total/fetch",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/total/${userId}`);
      console.log(data.total)
      return data.total;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to fetch total"
      );
    }
  }
);

export const HandleAddTotal = createAsyncThunk(
  "total/add-to-total",
  async ({userId, productId}: {userId: string, productId: string}, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/total/${productId}`, { userId });
      return data.total;
    } catch (error: any) {
      return rejectWithValue(
        error?.data?.message || error?.message || "Failed to fetch total"
      );
    }
  }
);

const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HandleGetTotal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        HandleGetTotal.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.total = payload;
          state.loading = false;
        }
      )
      .addCase(HandleGetTotal.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(HandleAddTotal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        HandleAddTotal.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.total = payload;
          state.loading = false;
        }
      )
      .addCase(HandleAddTotal.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

/**
 * Handles total selector
 */
export const totalSelector = (state: { total: any }) => state.total;

export const {} = totalSlice.actions;
export default totalSlice.reducer;
