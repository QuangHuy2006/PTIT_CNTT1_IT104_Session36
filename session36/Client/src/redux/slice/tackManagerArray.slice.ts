import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const reducer = createSlice({
  name: "reducer",
  initialState: { id: 0, name: "", priority: "", completion: false },
  reducers: {
    changeCompletion: (state, action: PayloadAction<{ id: number, value: boolean }>) => {
      axios.patch(`http://localhost:3000/tasks/${action.payload.id}`, {
        completion: action.payload.value,
      });
    },
  },
});
export const { changeCompletion } = reducer.actions;
export default reducer;
