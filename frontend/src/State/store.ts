import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import registerReducer from "./reducers/registerSlice"; 
import userAuthReducer from "./reducers/userAuthSlice"; 
import messagesReducer from "./reducers/messagesSlice"; 
import userInputReducer from "./reducers/userInputSlice"; 
import { useDispatch } from "react-redux";
import statusReducer from "./reducers/status";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    userAuth: userAuthReducer,
    messages: messagesReducer,
    userInput: userInputReducer,
    status: statusReducer, 
  },
});


export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();


if (typeof window !== "undefined") {
  window.store = store; 
}

export default store;
