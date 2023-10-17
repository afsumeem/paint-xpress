import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//

interface IService {
  price: number;
}

const initialState: IService = {
  price: 2200,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
  },
});
export const { setPriceRange } = servicesSlice.actions;

export default servicesSlice.reducer;
