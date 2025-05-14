import { createSlice } from "@reduxjs/toolkit";



export const TaskSlice = createSlice({
  name: "project",
 initialState: {
    Task: [],
  },

  reducers:{
    addTask:(state,action)=>{
       state.Task.push(action.payload)
    }
  }
})

export const {addTask} = TaskSlice.actions
export default TaskSlice.reducer