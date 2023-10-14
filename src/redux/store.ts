import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import bookingListReducer from "./features/services/serviceSlice";

const store = configureStore({
  // reducer

  reducer: {
    bookingList: bookingListReducer,

    [api.reducerPath]: api.reducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

//type
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
