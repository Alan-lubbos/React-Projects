import { AppDispatch } from "../../State/store"; 
import { sendMessageToAI } from "../../API/backend"; 
import { setStatus, addMessage, setAIResponse, setError } from "../reducers/messagesSlice"; 


export const sendAIMessage = (message: string) => async (dispatch: AppDispatch) => {
  try {
    
    dispatch(addMessage({ sender: "user", text: message }));

    
    dispatch(setStatus("loading"));
    
    
    const response = await sendMessageToAI(message);
    
    
    dispatch(addMessage({ sender: "ai", text: response.response }));
    dispatch(setAIResponse(response.response));
    dispatch(setStatus("succeeded"));
  } catch (error: any) {
    
    dispatch(setStatus("failed"));
    dispatch(setError(error.response?.data?.message || "Failed to fetch AI response"));
  }
};
