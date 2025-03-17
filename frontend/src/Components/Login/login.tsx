import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { TextField, Button } from "@mui/material";
import { paths } from "../../Utils/constants";
import { useAppDispatch } from "../../State/store";
import { loginUserThunk, setUsername, setPassword } from "../../State/reducers/userAuthSlice";
import { selectUserAuth } from "../../State/Selectors/loginselector";
import { selectStatus } from "../../State/Selectors/homeselector";
import Loading from "../Loading/loading";
import "./style.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { accessToken, error, username, password } = useSelector(selectUserAuth);
  const status = useSelector(selectStatus);
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
      if (result) {
        navigate(paths.home);
      }
    } catch (error: any) {
      console.error("[LOGIN] Login failed:", error.message);
    }
  };

  const isLoading = status?.login?.status === "pending";

  return (
    <div className="login-container">
      {isLoading && <Loading />} 

      <div className="login-left">
        <img 
          src="https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg" 
          alt="Gym Workout" 
          className="login-image" 
        />
      </div>

      <div className="login-right">
        <h2 className="login-header">WELCOME BACK <br /> GYM MEMBER!</h2>
        <p className="login-subtext">Log in to your account to access your personalized fitness journey.</p>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          className="login-input"
          disabled={isLoading}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          className="login-input"
          disabled={isLoading}
        />

        {error && <div className="error-message">Error: {error}</div>}

        <Button 
          variant="contained" 
          className="google-login-btn" 
          disabled={isLoading}
        >
          <GoogleIcon className="google-icon" /> Login Using Google
        </Button>

        <Button
          variant="contained"
          className="login-btn"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "LOGIN"}
        </Button>

        <p className="create-account-text">Create Account | Need Help?</p>
      </div>
    </div>
  );
};

export default Login;
