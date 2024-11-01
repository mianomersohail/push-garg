import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaidUser.css";
import Navbar from "../Nav/NavList";
import TypingEffect from "react-typing-effect";
import UserChat from "../UserChat/UserChat";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001"); 
export default function PaidUser() {
  const [paidUser, setPaidUser] = useState(true);
  const [isDealing, setIsDealing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [shakeBell, setShakeBell] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setmenu] = useState("");

  const handleChange = (event) => {
    setmenu(event.target.value);
    const selectmenu = event.target.value;
    switch (selectmenu) {
      case "Deal":
        navigate("/NavDeal");
        break;
      case "Mern":
        navigate("/FrontMern");
         break;

      case "Trade":
        navigate("/FrontEndTrading");
    }
  };

  useEffect(() => {
    socket.on("NewSignal Uploaded", (message) => {
      console.log(message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setShakeBell(true);
    });

    return () => {
      socket.off("NewSignal Uploaded");
    };
  }, []);

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("image");
    localStorage.removeItem("userId");

    setTimeout(() => {
      navigate("/userlogin");
    }, 200);
  };

  useEffect(() => {
    if (isDealing) {
      const timeout = setTimeout(() => {
        navigate("/UserDealing");
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isDealing, navigate]);

  const username = localStorage.getItem("username") || "welcome";
  const baseURL = "http://localhost:3001/";
  const imgPath = localStorage.getItem("image");
  const imgURL = `${baseURL}${imgPath}`;

  if (paidUser) {
    return (
      <>
        <Navbar
          shakeBell={shakeBell}
          navlimsgs={"Msgs"}
          notifications={notifications}
          imgsrc={imgURL}
          alt="User"
          name={username}
          navlinameone={"Home"}
          linkone={"*"}
          navlinametwo={"Sign Out"}
          onClick={signout}
          showNotifications={true}
        />
        <div className="container col-lg-8 offset-lg-1">
          <div className="row Paid-User-Main">
            <div className="col-lg-6 Paid-welcome">
              <div className="typing-container">
                <TypingEffect
                  text={[
                    `Welcome ${username}`,
                    "REACT JS",
                    "MERN",
                    "SOLIDITY",
                    "FOREX TRADES",
                  ]}
                  speed={50}
                  eraseDelay={1500}
                  typingDelay={500}
                  cursorColor="#06B6D4"
                  displayTextRenderer={(text) => (
                    <h3 className="home-typing-animation gradient-text">
                      {text.split("").map((char, i) => (
                        <span
                          className="typing-home"
                          key={i}
                          style={{
                            color: char === " " ? "inherit" : "#06B6D4",
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </h3>
                  )}
                />
              </div>
              <p style={{ color: "#958984" }}>
                Join us on a journey where you'll not only master the MERN stack
                but also gain insights that can transform your investment
                strategy. Our course is designed to guide you every step of the
                way—from building cutting-edge web applications to making
                informed investment decisions. Learn where to invest, how to
                invest smartly, and watch your skills and portfolio soar to new
                heights!
              </p>
              <Box sx={{ minWidth: 120 }}>
                <FormControl
                  fullWidth
                  sx={{
                    width: "20%",
                    background: "linear-gradient(to right, #FF7469, #FEAB5E)",
                  }}
                >
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ color: "white" }}
                  >
                    MENU
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={menu}
                    label="menu"
                    onChange={handleChange}
                    style={{ color: "white" }}
                  >
                    <MenuItem value={"Mern"}>MERN STACK</MenuItem>
                    <MenuItem value={"BlockChain"}>BlockChain</MenuItem>
                    <MenuItem value={"Deal"}>DEALING</MenuItem>
                    <MenuItem value={"Trade"}>TRADING SIGNALS</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <UserChat />
          </div>
        </div>
      </>
    );
  }

  return null;
}
