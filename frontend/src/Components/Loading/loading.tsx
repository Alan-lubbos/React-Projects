import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../State/store";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading: React.FC = () => {
  const status = useSelector((state: RootState) => state.status as Record<string, { status: string; error?: string }>);

  const isLoading = Object.values(status).some((item) => item.status === "pending");

  if (!isLoading) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loading;
