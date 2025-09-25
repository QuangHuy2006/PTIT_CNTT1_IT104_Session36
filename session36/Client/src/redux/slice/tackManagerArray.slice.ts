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
    changeName: (state, action: PayloadAction<{id: number, name: string, priority: string}>) => {
      axios.patch(`http://localhost:3000/tasks/${action.payload.id}`, {
        name: action.payload.name,
        priority: action.payload.priority,
      })
    },
    deleteTask: (state, action: PayloadAction<{id: number}>) => {
      axios.delete(`http://localhost:3000/tasks/${action.payload.id}`)
    }
  },
});
export const { changeCompletion, changeName, deleteTask } = reducer.actions;
export default reducer;
