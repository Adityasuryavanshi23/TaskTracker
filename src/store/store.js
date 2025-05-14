import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./ProjectSlice";
import TaskReducer from "./TaskSlice";

export const store = configureStore({
  reducer:{
    project:ProjectReducer,
    task:TaskReducer
  }
})