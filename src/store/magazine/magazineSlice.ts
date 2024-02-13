import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "../../utils/axios";
import { BASE_URL } from "../../utils/config";

interface StateType {
  data: any[];
  totalRecords: number;
}

const initialState: StateType = {
  data: [],
  totalRecords: 0,
};

export const MagazineSlice = createSlice({
  name: "magazines",
  initialState,
  reducers: {
    setMagazines: (state, action) => {
      state.data = action.payload;
    },
    setMagazinesCount: (state, action) => {
      state.totalRecords = action.payload;
    },
  },
});

export const { setMagazines, setMagazinesCount } = MagazineSlice.actions;

export default MagazineSlice.reducer;

export const fetchMagazines =
  (page: number, limit: number, filter?: string) =>
  async (dispatch: AppDispatch) => {
    const params = {
      filter: filter,
      page: page,
      limit: limit,
    };
    try {
      await axios
        .get(`${BASE_URL}/magazines`, {
          params: params,
        })
        .then((response) => {
          dispatch(setMagazines(response.data.data));
          dispatch(setMagazinesCount(response.data.totalRecords));
        });
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const updateMagazines =
  (id: number, subscribed: boolean) => async () => {
    try {
      const response = await axios.put(`${BASE_URL}/magazines/${id}`, {
        subscribed: subscribed,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  };
