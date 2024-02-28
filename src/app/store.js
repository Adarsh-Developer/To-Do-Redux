import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slice/TodoSlice";
import FilterTodo from './slice/FilterSlice'

export const store = configureStore({
  reducer: {
    todoLogic: TodoSlice,
    filterTodo: FilterTodo,
  }
})