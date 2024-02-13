import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  data: any[];
}

const initialState: StateType = {
  data: [],
};

export const MagazineSlice = createSlice({
  name: "magazines",
  initialState,
  reducers: {},
});

export default MagazineSlice.reducer;
