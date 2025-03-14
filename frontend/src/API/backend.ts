import axios from "axios";

const apiUrl = "http://localhost:5000"; 

const axiosInstance = axios.create({
  baseURL: apiUrl,
});


interface AIResponse {
  response: string;
}

//  Fix: Correct AI endpoint
export const sendMessageToAI = async (message: string): Promise<AIResponse> => {
  try {
    const response = await axiosInstance.post("/get-ai-response", { message });
    return response.data as AIResponse;
  } catch (error: any) {
    console.error("Error while sending message to AI:", error);
    throw error.response?.data?.message || "Failed to fetch AI response";
  }
};

//  Test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await axiosInstance.get("/");
    console.log("Backend Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error connecting to backend:", error);
    throw error.response?.data?.message || "Error connecting to backend";
  }
};

//  Login function
interface LoginResponse {
  accessToken: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/login", { username, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Login failed";
  }
};

export default axiosInstance;
