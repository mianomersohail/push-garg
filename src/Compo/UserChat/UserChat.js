import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import { io } from "socket.io-client";
import useApi from "../FetchHook/FetchPost";
import "./userchat.css";
import sendsound from "../../audio/send.mp3";
import receivesound from "../../audio/rev.mp3";
const username = localStorage.getItem("username");
const img=localStorage.getItem('image');
const userId = localStorage.getItem("userId");
const socket = io("http://localhost:3001", { query: { userId } });
const ChatComponent = () => {
  const [typeimg,settypeimg]=useState('')
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typename, settypename] = useState("");
  const { get } = useApi("http://localhost:3001");
  const baseURL = "http://localhost:3001/";
  const messagesContainerRef = useRef(null);
  const typingTimeout = useRef(null);

  // Toggle popup
  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  // Fetch old messages once when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("userId");
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
  }, [get]);

  // Scroll to the bottom of the messages container
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages, isOpen]);

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

    socket.on("displayTyping", (data,image) => {
      console.log("Typing status received:", data);
      setIsTyping(data.isTyping);
      settypeimg(data.image)
      settypename(data.username);
    });


    return () => {
      socket.off("receiveMessage");
      socket.off("displayTyping");
    };
  }, []);
  const typerimg =typeimg ? `${baseURL}${typeimg}`:""
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    const audio = new Audio(sendsound);
    audio.play();
    try {
      if (newMessage.trim()) {
        const timestamp = new Date().toLocaleString();
        socket.emit("sendMessage", newMessage, token);
        socket.emit("stopTyping", username,img);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: newMessage,
            role: "User",
            name: "You",
            timestamp,
            imgurl: `${baseURL}${localStorage.getItem("image")}`,
          },
        ]);
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socket.emit("typing", username,img);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("userStoppedTyping", username,img);
      settypename("");
      settypeimg('')


    }, 1000);
  };

  return (
    <>
      <Button
        onClick={togglePopup}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(to right, #FF8166, #FE9E60,#FEB15C)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(to right, #C1A348, #D8C978)",
          },
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        variant="contained"
        startIcon={<ChatIcon />}
      />

      <Box className={isOpen ? "blur-background" : ""} />

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
          }}
        >
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
                  flexDirection:
                    messageData.role === "User" ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <Box
                  component="img"
                  src={messageData.imgurl}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg";
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
                      backgroundColor:
                        messageData.role === "User" ? "#06B6D4" : "#ddd",
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
           // Typing indicator
{isTyping && (
  <Box className="typing-indicator" sx={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0" }}>
    {console.log("Typing image URL:", typerimg)}
    <Box
      component="img"
      src={typerimg}
      alt="Typing indicator"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg";
      }}
      sx={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        marginRight: "8px",
      }}
    />
    <Box sx={{ color: "#555", fontSize: "0.85rem" }}>{typename}</Box>
    <Box className="dot"></Box>
    <Box className="dot"></Box>
    <Box className="dot"></Box>
  </Box>
)}

          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleTyping}
              sx={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{ backgroundColor: "#D8C978", color: "#000" }}
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
