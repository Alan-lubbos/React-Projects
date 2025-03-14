import { RootState } from "../store";

export const selectUserAuth = (state: RootState) => state.userAuth;
export const selectStatus = (state: RootState) => state.status;