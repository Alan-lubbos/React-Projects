import { RootState } from "../store";

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectUserInput = (state: RootState) => state.userInput.input;

// ✅ Explicitly define the type for `status`
export const selectStatus = (state: RootState): Record<string, { status: string; error?: string }> =>
  state.status;
