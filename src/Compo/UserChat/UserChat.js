import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import useApi from "../FetchHook/FetchPost"; // Assuming this is your custom hook for API calls
import './userchat.css';
import sendsound from '../../audio/send.mp3'
import receivesound from '../../audio/rev.mp3'



const userId = localStorage.getItem("userId");
const socket = io("http://localhost:3001", { query: { userId } });

const ChatComponent = () => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { get } = useApi("http://localhost:3001");
  const baseURL = 'http://localhost:3001/'; // Base URL for images
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
          role: msg.id === id ? "User" : "server",
          name: msg.name, // Assuming username is present in response
          imgurl: `${baseURL}${msg.pic}`, // Construct image URL
          timestamp: new Date(msg.createdAt).toLocaleString(), // Format the timestamp
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
    socket.on("receiveMessage", (message, name, image) => {
      const audio = new Audio(receivesound); // Create a new audio object
      audio.play(); // Play the audio
      const timestamp = new Date().toLocaleString();
      const imgurl = `${baseURL}${image}`; // Construct image URL
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, role: "server", name, timestamp, imgurl }, // Add timestamp and image
      ]);
    });
    
    return () => {
      socket.off("receiveMessage"); // Clean up the listener on component unmount
    };
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    const audio = new Audio(sendsound); // Create a new audio object
      audio.play(); // Play the audio
    try {
      if (newMessage.trim()) {
        const timestamp = new Date().toLocaleString(); // Get current timestamp
        socket.emit("sendMessage", newMessage, token); // Send message
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: newMessage, role: "User", name: "You", timestamp, imgurl: `${baseURL}${localStorage.getItem('image')}` }, // Add timestamp and user image
        ]);
        setNewMessage(""); // Clear the input after sending
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
    <Box
      sx={{
        width: { xs: "70%", sm: "70%",lg:"50%" }, // 70% width on mobile, 30% on larger screens
        maxHeight: { xs: "75vh", sm: "70vh" }, // 50vh height on mobile, 70vh on larger screens
        marginLeft:{lg:"25rem",md:"8rem"},
        marginTop:{xs:"3rem"},
        overflow: "hidden",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {/* Chat messages area */}
      <Box
        ref={messagesContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "60vh",
        }}
      >
        {messages.map((messageData, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: messageData.role === "User" ? "row-reverse" : "row", // Align messages differently
              alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            {/* Sender/Receiver Image */}
            <Box
              component="img"
              src={messageData.imgurl} // Use imgurl from message data
              onError={(e) => { 
                e.target.onerror = null; // Prevents infinite loop on error
                e.target.src = 'https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg'; // Fallback image
              }}
              alt={messageData.name}
              sx={{
                width: "30px", // Set the width of the image
                height: "30px", // Set the height of the image
                borderRadius: "50%", // Circular image
                marginLeft: messageData.role === "User" ? "8px" : "0",
                marginRight: messageData.role === "User" ? "0" : "8px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "70%", // Set max width for messages
              }}
            >
              {/* Username */}
              <Box
                sx={{
                  color: "#555", // Gray color for username
                  fontSize: "0.85rem",
                  marginBottom: "2px",
                }}
              >
                {messageData.name}
              </Box>

              {/* Message */}
              <Box
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  backgroundColor: messageData.role === "User" ? "#06B6D4" : "#ddd",
                  color: messageData.role === "User" ? "#fff" : "#000",
                  wordWrap: "break-word",
                  position: "relative",
                }}
              >
                {messageData.message}
              </Box>

              {/* Timestamp */}
              <Box
                sx={{
                  color: "#aaa", // Light gray color for timestamp
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  textAlign: messageData.role === "User" ? "right" : "left", // Align timestamp according to message direction
                }}
              >
                {messageData.timestamp}
              </Box>
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
  );
};

export default ChatComponent;
