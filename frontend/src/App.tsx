import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { testBackendConnection } from "./API/backend";
import { useSelector } from "react-redux";
import { RootState } from "./State/store";
import MainLayout from "./Components/Layout/layout";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

if (!clientId) {
  console.error("Google Client ID is missing! Check your .env file.");
}

const App: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken || accessToken) {
      setIsVerified(true);
    }
  }, [accessToken]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await testBackendConnection();
        console.log("Backend Test Data:", data);
      } catch (error) {
        console.error("Error in backend connection:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <MainLayout isVerified={isVerified} />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
