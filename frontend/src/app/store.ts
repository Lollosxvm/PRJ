import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import commodityReducer from "../features/commoditySlice";
import simulationReducer from "../features/simulationSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    commodity: commodityReducer,
    simulation: simulationReducer,
  },
  // opzionale: abilita serializzazione non stretta per date, ecc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// tipi per useDispatch e useSelector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
