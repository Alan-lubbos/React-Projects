import { createReducer, createAction, UnknownAction, AsyncThunk } from "@reduxjs/toolkit";

interface ErrorWithMessage {
  message: string;
}

const initialState: Record<string, { status: string; error?: string }> = {};

export const resetStatus = createAction("status/reset");

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export function isPendingAction(action: UnknownAction): action is PendingAction {
  return typeof action.type === "string" && action.type.endsWith("/pending");
}

export function isRejectedAction(action: UnknownAction): action is RejectedAction {
  return typeof action.type === "string" && action.type.endsWith("/rejected");
}

export function isFulfilledAction(action: UnknownAction): action is FulfilledAction {
  return typeof action.type === "string" && action.type.endsWith("/fulfilled");
}

const statusReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetStatus, () => initialState)
    .addMatcher(isPendingAction, (state, action) => {
      state[action.meta.requestId] = { status: "pending" };
    })
    .addMatcher(isRejectedAction, (state, action) => {
      const error = action.error as ErrorWithMessage;
      const errorMessage = error.message || "Something went wrong";

      state[action.meta.requestId] = {
        status: "rejected",
        error: errorMessage,
      };
    })
    .addMatcher(isFulfilledAction, (state, action) => {
      state[action.meta.requestId] = { status: "fulfilled" };
    });
});

export default statusReducer;
