import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../FetchHook/FetchPost"; // Assuming this is your custom hook for API calls
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:3001", { query: { userId } });

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { get } = useApi("http://localhost:3001");
  const messagesContainerRef = useRef(null); // Ref for the messages container

  // Fetch old messages once when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const id=localStorage.getItem('userId')
      try {
        const response = await get("/UserMessage");
        console.log(response);

        const oldMessages = response?.messages || [];
        // Check token and format messages
        const formattedMessages = oldMessages.map((msg) => ({
          message: msg.message,
          role: msg.id == id ? "User" : "server", // Assign role based on token match
        }));
        
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    };
  
    fetchMessages();
  }, []);

  // Socket listener for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, role: "server" },
      ]);
    });
    return () => {
      socket.off("receiveMessage"); // Clean up the listener on component unmount
    };
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    try {
      if (newMessage.trim()) {
        // Emit message to server
        socket.emit("sendMessage", newMessage, token);

        // Update UI with new message from the user
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: newMessage, role: "User" },
        ]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to the bottom of the messages container when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-4">
            <span style={{ color: "#06B6D4", fontSize: "32px" }}>L</span>
            <span>EAVE</span>
            <span style={{ color: "#06B6D4", fontSize: "32px" }}>Y</span>
            <span>OUR</span>
            <span style={{ color: "#06B6D4", fontSize: "32px" }}>M</span>
            <span>ESSAGE</span>
          </div>
        </div>
      </div>

      <Box
        sx={{
          maxWidth: "400px",
          margin: "auto",
          height: "auto",
          maxHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          marginTop: "50px",
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* Chat messages area */}
        <Box
          ref={messagesContainerRef}
          sx={{
            flexGrow: 1,
            padding: "16px",
            overflowY: "auto",
            maxHeight: "50vw",
          }}
        >
          {messages.map((messageData, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  messageData.role === "User" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  backgroundColor:
                    messageData.role === "User" ? "#06B6D4" : "#ddd",
                  color: messageData.role === "User" ? "#fff" : "#000",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                }}
              >
                {messageData.message}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Input area */}
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            borderTop: "1px solid #ccc",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChatComponent;
