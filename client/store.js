import { configureStore } from "@reduxjs/toolkit";
import listsSlice from './slice.js';


const store = configureStore({
  reducer: listsSlice.reducer,
  initialState,
})

export default store;