import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  extraReducers: {
   registerFail (state , action){
      console.log("createUser in slice : ", action.payload);
      return [ action.payload];
    },
    logoutFail(statem , action){
      return [ action.payload];
    },
    loginFail (state , action)  {
      return [action.payload];
    }
  },
});

const { reducer } = errorSlice;
export default reducer;
