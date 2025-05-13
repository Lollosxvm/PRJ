// frontend/src/features/simulationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface SimulationPoint {
  hour: string;
  temp: number;
  humidity: number;
  yield: number;
}

export const fetchSimulation = createAsyncThunk<
  SimulationPoint[],
  void,
  { rejectValue: string }
>("simulation/fetch", async (_, { rejectWithValue }) => {
  const res = await fetch("/api/simulation");
  if (!res.ok) return rejectWithValue(res.statusText);
  const json = await res.json();
  return json.points as SimulationPoint[];
});

interface SimulationState {
  points: SimulationPoint[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SimulationState = {
  points: [],
  status: "idle",
  error: null,
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimulation.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSimulation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.points = action.payload;
      })
      .addCase(fetchSimulation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export default simulationSlice.reducer;
