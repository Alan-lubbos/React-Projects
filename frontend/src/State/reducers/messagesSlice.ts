import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSX } from "react/jsx-runtime";

interface Message {
  sender: "user" | "ai"; // ✅ Restrict sender values
  text: string;
}

interface MessagesState {
  map(arg0: (msg: { sender: string; text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => JSX.Element): import("react").ReactNode;
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
