import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './slices/project/project';
import formReducer from './slices/form/form';
//import authReducer from './slices/login/login';
import errorReducer from './slices/error/AuthErrorReducer';

import authReducer from "./slices/login/auth";
import messageReducer from "./slices/error/message";

const reducer = {
  projects: projectReducer,
  forms: formReducer,
  //auth:authReducer,
  error: errorReducer,
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;