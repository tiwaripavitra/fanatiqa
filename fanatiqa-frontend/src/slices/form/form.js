import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FormDataService from "../../services/form/FormService";

const initialState = [];

export const createForm = createAsyncThunk(
  "forms/create",
  async ({  projectname, projectdescription,accountid,projectplatformtypeid }) => {
    const res = await FormDataService.create({  projectname, projectdescription,accountid,projectplatformtypeid });
    return res.data;
  }
);

export const retrieveForm = createAsyncThunk(
  "forms/retrieve",
  async () => {
    const res = await FormDataService.getAll();
    console.log("retrieveProject" , res.data);
    return res.data;
  }
);

export const updateForm = createAsyncThunk(
  "forms/update",
  async ({ id, data }) => {
    const res = await FormDataService.update(id, data);
    return res.data;
  }
);

export const deleteForm = createAsyncThunk(
  "forms/delete",
  async ({ id }) => {
    await FormDataService.remove(id);
    return { id };
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  extraReducers: {
    [createForm.fulfilled]: (state, action) => {
      console.log("createform in slice : ", action.payload);
      state.push(action.payload);
    },
    [retrieveForm.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateForm.fulfilled]: (state, action) => {
      const index = state.findIndex(form => form.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteForm.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = formSlice;
export default reducer;