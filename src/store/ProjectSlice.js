import { createSlice } from "@reduxjs/toolkit";



export const ProjectSlice = createSlice({
  name: "project",
 initialState: {
    projects: [],
  },

  reducers:{
    addProjects:(state,action)=>{
       state.projects.push(action.payload)
    }
  }
})

export const {addProjects} = ProjectSlice.actions
export default ProjectSlice.reducer