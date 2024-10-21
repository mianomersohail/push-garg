import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat"; // Import chat icon
import { io } from "socket.io-client";
import useApi from "../FetchHook/FetchPost"; // Assuming this is your custom hook for API calls
import './userchat.css';
import sendsound from '../../audio/send.mp3';
import receivesound from '../../audio/rev.mp3';

const userId = localStorage.getItem("userId");
const socket = io("http://localhost:3001", { query: { userId } });

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Popup state
  const { get } = useApi("http://localhost:3001");
  const baseURL = 'http://localhost:3001/'; // Base URL for images
  const messagesContainerRef = useRef(null);

  // Toggle popup
  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

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
          name: msg.name,
          imgurl: `${baseURL}${msg.pic}`,
          timestamp: new Date(msg.createdAt).toLocaleString(),
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching old messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Scroll to the bottom of the messages container when messages change or chat opens
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages, isOpen]); // Include isOpen in the dependency array

  // Socket listener for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (message, name, image) => {
      const audio = new Audio(receivesound);
      audio.play();
      const timestamp = new Date().toLocaleString();
      const imgurl = `${baseURL}${image}`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, role: "server", name, timestamp, imgurl },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    const audio = new Audio(sendsound);
    audio.play();
    try {
      if (newMessage.trim()) {
        const timestamp = new Date().toLocaleString();
        socket.emit("sendMessage", newMessage, token);
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: newMessage, role: "User", name: "You", timestamp, imgurl: `${baseURL}${localStorage.getItem('image')}` },
        ]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      {/* Button to open chat popup */}
      <Button
        onClick={togglePopup}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          width: "50px", // Set fixed width for the button
          height: "50px", // Set fixed height for the button
          borderRadius: "50%",
          background: "linear-gradient(to right, #FF8166, #FE9E60,#FEB15C)",
          color: "#fff",
          '&:hover': {
            background: "linear-gradient(to right, #C1A348, #D8C978)",
          },
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        variant="contained"
        startIcon={<ChatIcon />} // Add chat icon
      >
      </Button>

      {/* Apply blur background when chat is open */}
      <Box className={isOpen ? "blur-background" : ""}>
        {/* Your main page content goes here */}
      </Box>

      {/* Chat popup */}
      {isOpen && (
        <Box
          className="chat-popup"
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: "70%", lg: "50%" },
            maxHeight: { xs: "75vh", sm: "70vh", lg: "76%" },
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            overflow: "hidden",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -45%)',
          }}
        >
          {/* Close button */}
          <Button
            className="close-btn"
            onClick={togglePopup}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "1.5rem",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            ×
          </Button>

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
                  flexDirection: messageData.role === "User" ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <Box
                  component="img"
                  src={messageData.imgurl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg';
                  }}
                  alt={messageData.name}
                  sx={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginLeft: messageData.role === "User" ? "8px" : "0",
                    marginRight: messageData.role === "User" ? "0" : "8px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                  }}
                >
                  <Box
                    sx={{
                      color: "#555",
                      fontSize: "0.85rem",
                      marginBottom: "2px",
                    }}
                  >
                    {messageData.name}
                  </Box>
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
                  <Box
                    sx={{
                      color: "#aaa",
                      fontSize: "0.75rem",
                      marginTop: "2px",
                      textAlign: messageData.role === "User" ? "right" : "left",
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
              sx={{
                marginLeft: "10px",
                background: "linear-gradient(to right, #FF8166, #FE9E60,#FEB15C)",
                color: "#fff",
                '&:hover': {
                  background: "linear-gradient(to right, #C1A348, #D8C978)",
                }
              }}
              variant="contained"
              onClick={handleSendMessage}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatComponent;
