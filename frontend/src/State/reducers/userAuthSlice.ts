import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../API/backend";

interface UserAuthState {
  username: string;
  password: string;
  error: string | null;
  accessToken: string | null;
}

const initialState: UserAuthState = {
  username: "",
  password: "",
  error: null,
  accessToken: null,
};

export const loginUserThunk = createAsyncThunk<string, { username: string; password: string }, { rejectValue: string }>(
  "userAuth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(username, password);
      return response.accessToken;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.accessToken = null;
      state.error = null;
      localStorage.removeItem("user_access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.error = null;
        localStorage.setItem("user_access_token", action.payload);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.accessToken = null;
      });
  },
});

export const { setUsername, setPassword, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
