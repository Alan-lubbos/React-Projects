import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  sender: "user" | "ai"; 
  text: string;
}

interface MessagesState {
  messages: Message[];
  aiResponse: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  aiResponse: "",
  status: "idle",
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    setAIResponse: (state, action: PayloadAction<string>) => {
      state.aiResponse = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">) => {
      state.status = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addMessage, setAIResponse, setStatus, setError, clearMessages, clearError } = messagesSlice.actions;
export default messagesSlice.reducer;
