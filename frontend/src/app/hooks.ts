import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

// hook tipizzati per dispatch e selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
