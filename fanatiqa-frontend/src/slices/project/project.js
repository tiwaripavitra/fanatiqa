import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectDataService from "../../services/project/ProjectService";

const initialState = [];

export const createProject = createAsyncThunk(
  "projects/create",
  async ({  projectname, projectdescription,accountid,projectplatformtypeid }) => {
    const res = await ProjectDataService.create({  projectname, projectdescription,accountid,projectplatformtypeid });
    return res.data;
  }
);

export const retrieveProject = createAsyncThunk(
  "projects/retrieve",
  async () => {
    const res = await ProjectDataService.getAll();
    console.log("retrieveProject" , res.data);
    return res.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, data }) => {
    const res = await ProjectDataService.update(id, data);
    return res.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async ({ id }) => {
    await ProjectDataService.remove(id);
    return { id };
  }
);

export const deleteAllProjects = createAsyncThunk(
  "projects/deleteAll",
  async () => {
    const res = await ProjectDataService.removeAll();
    return res.data;
  }
);

export const findProjectByTitle = createAsyncThunk(
  "projects/findByTitle",
  async ({ title }) => {
    const res = await ProjectDataService.findByTitle(title);
    return res.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: {
    [createProject.fulfilled]: (state, action) => {
      console.log("createproject in slice : ", action.payload);
      state.push(action.payload);
    },
    [retrieveProject.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateProject.fulfilled]: (state, action) => {
      const index = state.findIndex(project => project.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProject.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllProjects.fulfilled]: (state, action) => {
      return [];
    },
    [findProjectByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = projectSlice;
export default reducer;