import React, { useEffect } from "react";
import { useAppDispatch } from "../../State/store";
import { useSelector } from "react-redux";
import { sendAIMessage } from "../../State/Actions/aiActions";
import { clearUserInput, setUserInput } from "../../State/reducers/userInputSlice";
import "./style.css";
import { selectMessages, selectStatus, selectUserInput } from "../../State/Selectors/homeselector";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useSelector(selectMessages);
  const input = useSelector(selectUserInput);
  const status = useSelector(selectStatus); // ✅ Now correctly typed!

  const predefinedActions = ["Make a routine", "Weight loss diets", "How to build muscles"];

  // ✅ Ensure `latestStatusKey` is properly typed
  const latestStatusKey = Object.keys(status).pop() as string | undefined; 
  const latestStatus = latestStatusKey ? status[latestStatusKey]?.status ?? "idle" : "idle";

  useEffect(() => {
    if (latestStatus === "fulfilled" || latestStatus === "rejected") {
      dispatch(clearUserInput());
    }
  }, [latestStatus, dispatch]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    dispatch(setUserInput(""));
    dispatch(sendAIMessage(text)); 
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "ai-message"}`}>
            {msg.text}
          </div>
        ))}
        
        {/* ✅ Display AI status messages */}
        {latestStatus === "pending" && <div className="ai-message">AI is thinking...</div>}
        {latestStatus === "rejected" && <div className="ai-message">Failed to get a response. Try again!</div>}
      </div>

      {/* ✅ Predefined quick actions */}
      <div className="predefined-actions">
        {predefinedActions.map((action, index) => (
          <button key={index} onClick={() => sendMessage(action)}>
            {action}
          </button>
        ))}
      </div>

      {/* ✅ Input field with send button */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => dispatch(setUserInput(e.target.value))}
          placeholder="Ask anything..."
        />
        <button className="send-button" onClick={() => sendMessage(input)}></button>
      </div>
    </div>
  );
};

export default Home;
