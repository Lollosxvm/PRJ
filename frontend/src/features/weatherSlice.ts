// frontend/src/features/weatherSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1) Definiamo il tipo di ciascun punto orario restituito dal backend
export interface HourlyPoint {
  ts: number;
  temp: number;
  humidity: number;
}

// 2) Definiamo lo stato dello slice
interface WeatherState {
  hourly: HourlyPoint[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  hourly: [],
  status: "idle",
  error: null,
};

// 3) createAsyncThunk per chiamare l’endpoint /api/weather
export const fetchWeather = createAsyncThunk<
  HourlyPoint[], // tipo del valore di ritorno "fulfilled"
  { lat: number; lon: number }, // argomento che riceve il thunk
  { rejectValue: string } // tipo di `rejectWithValue`
>("weather/fetch", async ({ lat, lon }, { rejectWithValue }) => {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) {
    return rejectWithValue(res.statusText);
  }
  const json = await res.json();
  // il tuo backend restituisce { hourly: HourlyPoint[] }
  return json.hourly as HourlyPoint[];
});

// 4) Il slice con i case per pending/fulfilled/rejected
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // qui potresti mettere altri reducers sincroni, se ti servono
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hourly = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export default weatherSlice.reducer;
