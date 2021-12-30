import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthDataService from "../../services/auth/AuthService";

const initialState = [];

export const loginUser = createAsyncThunk(
  "user/login",
  async ({  userid, password }) => {
    const res = await AuthDataService.loginUser({  userid, password });
    return res.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async () => {
    const res = await AuthDataService.registerUser();
    console.log("registeruser" , res.data);
    return res.data;
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async ({ id, data }) => {
    const res = await AuthDataService.logoutUser(id, data);
    return res.data;
  }
);

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      console.log("createproject in slice : ", action.payload);
      state.push(action.payload);
    },
    [registerUser.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [userLogout.fulfilled]: (state, action) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
  },
});

const { reducer } = userAuthSlice;
export default reducer;