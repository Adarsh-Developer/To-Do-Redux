import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getInitialTodo = () => {
  const localTodoList = localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    window.localStorage.setItem("todoList", JSON.stringify([]));
    return [];
  }
};

const initialValue = getInitialTodo()

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      const newState = [...state, action.payload];
      localStorage.setItem("todoList", JSON.stringify(newState));
      return newState;
    },
    deleteTodo: (state, action) => {
      const todoListArr = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todoList", JSON.stringify(todoListArr));
      toast.error("Task deleted successfully");
      return todoListArr;
    },
    updateTodo: (state, action) => {
      if (state) {
        state.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(state));
        return state;
      }
    },
    deleteAllTodo: (state, action) => {
      if (action.payload === "all") {
        localStorage.setItem("todoList", JSON.stringify([]));
        toast.success('ALL Tasks Deleted Successfully')
        return [];
      } else if (
        action.payload === "incomplete" ||
        action.payload === "complete"
      ) {
        state = state.filter((todo) => todo.status !== action.payload);
        window.localStorage.setItem("todoList", JSON.stringify(state));
        toast.success(`Tasks Deleted Successfully`)
        return state;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, deleteAllTodo } = todoSlice.actions;
export default todoSlice.reducer;
