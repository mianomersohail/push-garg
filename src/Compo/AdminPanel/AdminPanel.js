import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import UserChat from "../UserChat/UserChat";
import "./AdminPanel.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Navbar from "../Nav/NavList";
import { useMediaQuery } from "@mui/material";
export default function PaidUser() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state?.Data || {};
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('notifications')
    setTimeout(() => {
      navigate("/userlogin");
    }, 200);
  };
  const handleChange = (event) => {
    const selectedMenu = event.target.value;
    switch (selectedMenu) {
      case "NEWUSER":
        navigate("/AdminPanelMernStack");
        break;
      case "SIGNAL":
        navigate("/TradingSignalAdmin");
        break;
      default:
        break;
    }
  };
  const img =
    "https://media.licdn.com/dms/image/v2/D5603AQG7sb04QQr5sg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1727442009142?e=1733961600&v=beta&t=U9gYfE2pVodsQPOVlQiCbaYV8JFS17xo6aQBlcP69Lo";
  console.log(img);
  return (
    <>
      <Navbar
        imgsrc={img}
        name={name || "Umer"}
        navlinameone={"Home"}
        linkone={"*"}
        navlinametwo={"SignOut"}
        onClick={signout}
      />
      <div className="container offset-lg-1">
        <div className="row Paid-User-Main">
          <div className="col-lg-6 Paid-welcome">
            <h1 className="gradient-text">Welcome {name || "Admin"}</h1>
            <p style={{ color: "#958984" }}>
              Hi Admin, hope your day was good. Please select the section you
              want to update for users.
            </p>
          </div>
          <FormControl
            fullWidth
            sx={{
              width: isMobile ? "40%" : "10%",
              background: "linear-gradient(to right, #FF7469, #FF9A8B)",
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
              label="Menu"
              onChange={handleChange}
              style={{ color: "white" }}
            >
              <MenuItem value="Deal">MERN</MenuItem>
              <MenuItem value="NEWUSER">NEW USER</MenuItem>
              <MenuItem value="SIGNAL">SIGNALS</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <UserChat />
    </>
  );
}
