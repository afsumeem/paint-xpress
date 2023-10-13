import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/apiSlice";

const store = configureStore({
  // reducer

  reducer: {
    // project: projectReducer,

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
