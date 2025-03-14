import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import registerReducer from "./reducers/registerSlice"; 
import userAuthReducer from "./reducers/userAuthSlice"; 
import messagesReducer from "./reducers/messagesSlice"; 
import userInputReducer from "./reducers/userInputSlice"; 
import { useDispatch } from "react-redux";
import statusReducer from "./reducers/status";

// Create the Redux store with the default middleware
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

// Type for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>; // RootState for typing
export type AppDispatch = typeof store.dispatch; // AppDispatch for dispatch typing

// Custom hook for dispatch with correct typing
export const useAppDispatch = () => useDispatch<AppDispatch>();

// For debugging: expose the store to the window object (in the browser)
if (typeof window !== "undefined") {
  window.store = store; 
}

export default store;
