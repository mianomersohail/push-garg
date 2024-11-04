import "./LoginPage.css";
import { useState, useEffect, useContext } from "react";
import Navbar from "../Nav/NavList";
import Footer from "../Footer2.js/Footer2";
import { Link } from "react-router-dom";
import useApi from "../FetchHook/FetchPost";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";
import errorsound from "../../audio/error.mp3";
import useCustomToast from "../usetoast/usetoast";

export default function UserLogin() {
  const { showToast, ToastComponent } = useCustomToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState(null);
  const [username, setusername] = useState("");
  const navigation = useNavigate();
  const { loading, error, data, post } = useApi("http://localhost:3001");
  const submitLoginForm = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await post("/Login", { email, password }, headers);
      console.log(result);
      if (result.Result.token) {
        localStorage.setItem("token", result.Result.token);
      }

      if (result.Result.role == "User") {
        localStorage.setItem("image", result.Result.image);
        localStorage.setItem("username", result.Result.username);
        localStorage.setItem("userId", result.Result.userId);
        setusername(result.username);
        navigation("/paiduser");
      }
      if (result.Result.role == "Admin") {
        localStorage.setItem("image", result.Result.image);
        localStorage.setItem("username", result.Result.username);
        localStorage.setItem("userId", result.Result.userId);
        navigation("/AdminPanel");
      }
    } catch (err) {
      const audio = new Audio(errorsound);
      audio.play();
      console.error(err);
      if (err.status == 400) {
        showToast("error", "Check Your Email Or Password and try Again");
        return;
      }
      if (err.status == 500) {
        showToast("error", "Server Not Respond");
      }
      showToast("error", `${err.message}`);
    }
  };
  return (
    <>
      <Navbar
        imgsrc={
          "https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg"
        }
        name={"Mian Omer"}
        navlinameone={"Home"}
        linktwo={"/"}
        linkone={"*"}
      />
      <div className="container Login-Page-Main">
        <div className="row">
          <div className="col-lg-12">
            <form className="login-page-form" onSubmit={submitLoginForm}>
              <div>
                <p style={{ color: "#06B5D3" }}>{serverMessage}</p>
              </div>
              <div className="login-center">
                <h3>Login</h3>
              </div>
              <div>
                <label className="login-center">Email/Phone</label>
              </div>

              <div className="login-center">
                <TextField
                  value={email}
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                  }}
                />
              </div>

              <div className="login-center">
                <label>Password</label>
              </div>

              <div className="login-center">
                <TextField
                  value={password}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                  }}
                />
              </div>
              <Link className="login-center signup-link" to="/SignUpUser">
                Sign Up
              </Link>
              <div className="login-center ">
                <button type="submit" className="paid-btn-one">
                  Login
                </button>
              </div>

              {loading && (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <p>Loading...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <ToastComponent />

      <Footer />
    </>
  );
}
