export const paths = {
  home: "/",
  benchPress: "/benchpress",
  dumbbellPress: "/dumbbellpress",
  shoulderPress: "/shoulderpress",
  login: "/login",
  register: "/register"
};



export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
export const SCOPE = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

