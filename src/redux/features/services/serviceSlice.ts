import { IServices } from "@/types/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//

interface IBookingList {
  services: IServices[];
}

const initialState: IBookingList = {
  services: [],
};

const serviceSlice = createSlice({
  name: "bookingList",
  initialState,
  reducers: {
    addToBookingList: (state, action: PayloadAction<IServices>) => {
      const existing = state.services.find(
        (service) => service._id === action.payload._id
      );

      if (!existing) {
        state.services.push(action.payload);
      }

      //
      // if (!existing) {
      //   state.services.push({ ...action.payload, isBooked: true });
      // }
    },
    removeFromBookingList: (state, action: PayloadAction<IServices>) => {
      state.services = state.services.filter(
        (service) => service._id !== action.payload._id
      );
    },
  },
});

export const { addToBookingList, removeFromBookingList } = serviceSlice.actions;

export default serviceSlice.reducer;
