import { createSlice } from "@reduxjs/toolkit";

export const filterTodo = createSlice({
  name: 'filterTodo',
  initialState: 'all',
  reducers: {
    filterTodoFunc: (_, action) => {
      return action.payload
    }
  }
})

export const { filterTodoFunc } = filterTodo.actions;
export default filterTodo.reducer;