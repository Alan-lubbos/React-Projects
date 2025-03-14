import { Store } from "@reduxjs/toolkit";
import { RootState } from "./State/store"; // Adjust path if needed

declare global {
  interface Window {
    store: Store<RootState>;
  }
}
