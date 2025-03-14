import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null; // Ensure accessToken exists
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("google_access_token") || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("google_access_token", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("google_access_token");
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
