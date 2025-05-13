// frontend/src/features/commoditySlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommodity = createAsyncThunk(
  "commodity/fetch",
  async (symbol: string) => {
    const res = await fetch(`/api/commodity?symbol=${symbol}`);
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    return json.series as { date: string; close: number }[];
  }
);

const commoditySlice = createSlice({
  name: "commodity",
  initialState: {
    series: [] as { date: string; close: number }[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommodity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommodity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload;
      })
      .addCase(fetchCommodity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default commoditySlice.reducer;
