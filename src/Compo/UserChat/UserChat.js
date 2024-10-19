import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import useApi from "../FetchHook/FetchPost"; // Assuming this is your custom hook for API calls
import './userchat.css';

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:3001", { query: { userId } });

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to manage open/close
  const [newMessage, setNewMessage] = useState("");
  const { get } = useApi("http://localhost:3001");
  const messagesContainerRef = useRef(null);

  // Fetch old messages once when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem('userId');
      try {
        const response = await get("/UserMessage");
        const oldMessages = response?.messages || [];
        const formattedMessages = oldMessages.map((msg) => ({
          message: msg.message,
          role: msg.id == id ? "User" : "server",
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
        socket.emit("sendMessage", newMessage, token);
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

  // Toggle chat open/close
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Button onClick={toggleChat} variant="contained" color="" sx={{   background: "linear-gradient(to bottom, #FFD700, #C0C0C0)", marginBottom: "10px",marginTop:"3rem",width:"60%" }}>
        {isOpen ? "Close Chat" : "Open Chat"}
      </Button>

      <Box
        sx={{
          width: "60%", // Set width to 100%
          overflow: "hidden",
          transition: "max-height 0.5s ease, padding 0.5s ease", // Smooth transition
          maxHeight: isOpen ? "70vh" : "0", // Open/close maxHeight
          padding: isOpen ? "16px" : "0", // Adjust padding based on open state
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "linear-gradient(to bottom, #FFD700, #C0C0C0)",
        }}
      >
        {/* Chat messages area */}
        <Box
          ref={messagesContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "60vh",
            display: isOpen ? "block" : "none", // Show messages only when open
          }}
        >
          {messages.map((messageData, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: messageData.role === "User" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  backgroundColor: messageData.role === "User" ? "#06B6D4" : "#ddd",
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
