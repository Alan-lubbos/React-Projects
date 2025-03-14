import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInputState {
  input: string;
}

const initialState: UserInputState = {
  input: "",
};

const userInputSlice = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    clearUserInput: (state) => {
      state.input = "";
    },
  },
});

export const { setUserInput, clearUserInput } = userInputSlice.actions;
export default userInputSlice.reducer;
