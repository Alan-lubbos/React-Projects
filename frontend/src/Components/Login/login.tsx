import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { TextField, Button } from "@mui/material";
import { paths } from "../../Utils/constants";
import { useAppDispatch } from "../../State/store";
import { loginUserThunk, setUsername, setPassword } from "../../State/reducers/userAuthSlice";
import { selectUserAuth } from "../../State/Selectors/loginselector";
import "./style.css";
import { selectStatus } from "../../State/Selectors/homeselector";
import Loading from "../Loading/loading";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { accessToken, error, username, password } = useSelector(selectUserAuth);
  const status = useSelector(selectStatus); // Get login status from Redux

  const hasRunEffect = useRef(false);

  useEffect(() => {
    if (hasRunEffect.current) return;
    hasRunEffect.current = true;

    if (accessToken) {
      navigate(paths.home, { replace: true });
    }
  }, [accessToken, navigate]);

  const handleLogin = async () => {
    try {
      const result = await dispatch(loginUserThunk({ username, password })).unwrap();
      console.log("Token after login:", result);

      if (result) {
        navigate(paths.home);
      } else {
        console.log("Failed to get accessToken after login");
      }
    } catch (error: any) {
      console.error("[LOGIN] Login failed:", error.message);
    }
  };

  const isLoading = status?.login?.status === "pending"; // Check if login is in progress

  return (
    <div className="login-container">
      <Loading /> {/* Show Loading Spinner when logging in */}
      <h2 className="login-header">Welcome to FlexGym</h2>

      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => dispatch(setUsername(e.target.value))}
        className="login-input"
        disabled={isLoading} // Disable input when loading
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        className="login-input"
        disabled={isLoading} // Disable input when loading
      />

      {error && <div className="error-message">Error: {error}</div>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        className="login-btn"
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <p className="or-text">or</p>

      <Button variant="contained" className="google-login-btn" disabled={isLoading}>
        Login Using Google <GoogleIcon className="google-icon" />
      </Button>
    </div>
  );
};

export default Login;
