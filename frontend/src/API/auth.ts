import axios from "axios";
import { AppDispatch } from "../State/store";
import { setAccessToken } from "../State/authSlice";

// Get environment variables from Vite
const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export const getGoogleAccessToken = (authCode: string) => async (dispatch: AppDispatch) => {
  try {
    console.log("[API] Fetching Google OAuth access token...");

    // Ensure all required values are set
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI || !authCode) {
      throw new Error("Missing Google OAuth credentials (client_id, client_secret, redirect_uri) or auth code");
    }

    // Prepare URL-encoded payload for token exchange
    const payload = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      code: authCode,
      grant_type: "authorization_code",
    });

    console.log("[API] Sending token exchange request to Google...");

    // Send POST request to Google OAuth token endpoint
    const response = await axios.post<{ access_token: string }>(
      GOOGLE_TOKEN_URL,
      payload.toString(), // Ensure correct format
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = response.data.access_token;
    if (!accessToken) throw new Error("No access token received from Google");

    console.log("[API] Google Access Token Received:", accessToken);

    // Store the access token in Redux
    dispatch(setAccessToken(accessToken));

  } catch (error: any) {
    // Log more detailed error for debugging purposes
    console.error("[API] Error fetching Google token:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Optionally, throw the error to be handled further up the stack
    throw error;
  }
};
