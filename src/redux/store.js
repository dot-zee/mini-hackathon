import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import searchReducer from "./features/searchSlice";
// import collectionReducer from "./features/collectionSlice";
import collectionReducer from "./features/collectionSlice"

export const myStore = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    collection: collectionReducer,
  },
});
