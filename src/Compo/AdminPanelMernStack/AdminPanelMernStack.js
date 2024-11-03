import { useState } from "react";
import AdminPanel from "../AdminPanel/AdminPanel";
import "./AdminPanelMernStack.css";
import useApi from "../FetchHook/FetchPost";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../usetoast/usetoast";
import errorsound from "../../audio/error.mp3";
import successsound from "../../audio/success.mp3";
import Footer from "../Footer2.js/Footer2";
import AllUser from "./Allusers";

export default function AdminPanelMernStack() {
  const [adduseremail, setadduseremail] = useState("");
  const [status, updatestatus] = useState("");
  const [phonenum, setphonenum] = useState();
  const [username, setusername] = useState("");
  const [adduserpassword, setadduserpassword] = useState("");
  const [removeinput, setremoveinput] = useState("");
  const [Updateuser, setupdateuser] = useState("");
  const [RemoveErrorMessage, SetRemoveErrorMessage] = useState("");
  const [role, setRole] = useState(""); // Role state
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigate();
  const [oldemail, setoldemail] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newpassword, setnewpassword] = useState("");

  const { showToast } = useCustomToast();
  const { loading, error, post, del, put } = useApi("http://localhost:3001");

  const clearMessages = () => {
    updatestatus("");
    SetRemoveErrorMessage("");
  };

  const handleRoleSelect = (selectedRole) => {
    console.log("Selected role:", selectedRole);
    setRole(selectedRole);
  };

  const AddUser = async () => {
    clearMessages();

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("adduseremail", adduseremail);
    formData.append("adduserpassword", adduserpassword);
    formData.append("phone", phonenum);
    formData.append("role", role);
    formData.append("username", username);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    try {
      const result = await post("/NewUser", formData, headers);
      if (
        result.message === "You are logged out. No token provided." ||
        result.error === "You are logged out. Invalid token."
      ) {
        navigation("/userlogin");
        return;
      }
      
      if (result.message === "User-Save-Successfully") {
        showToast("success", "User saved successfully!");
        updatestatus(result.message);
        const successaudio = new Audio(successsound);
        successaudio.play();
      } else {
        showToast("error", "Unexpected error occurred.");
        const audio = new Audio(errorsound);
        audio.play();
      }
    } catch (err) {
      showToast("error", "User Already Found...");
      console.error(err);
      const audio = new Audio(errorsound);
      audio.play();
    }
  };
  
  const removeuser = async () => {
    clearMessages();
    
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    
    try {
      const result = await del(
        "/NewUser",
        JSON.stringify({ removeinput }),
        headers
      );
      if (
        result.message === "You are logged out. No token provided." ||
        result.error === "You are logged out. Invalid token."
      ) {
        navigation("/userlogin");
        return;
      }
      
      SetRemoveErrorMessage(result.message);
      const successaudio = new Audio(successsound);
      successaudio.play();
      showToast("success", "User removed successfully!");
    } catch (error) {
      const audio = new Audio(errorsound);
      audio.play();
      console.log(error.message);
      showToast("error", "User Not Found");
    }
  };
  
  const UpdateUser = async () => {
    clearMessages();

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    try {
      const result = await put(
        "/NewUser",
        { oldemail, newemail, oldpassword, newpassword, role },
        headers
      );
      if (
        result.message === "You are logged out. No token provided." ||
        result.error === "You are logged out. Invalid token."
      ) {
        navigation("/userlogin");
        return;
      }
      setupdateuser("User Update");
      const successaudio = new Audio(successsound);
      successaudio.play();
      showToast("success", "User updated successfully!");
    } catch (error) {
      const audio = new Audio(errorsound);
      audio.play();
      showToast("error", "User Not found.");
      console.log(error.message);
    }
  };
  return (
    <>
      <AdminPanel />
      <div className="container">
            <AllUser />
        <div className="row Main-Admin">
          <h1>
            {loading && (
              <div className="spinner-container">
                <div className="spinner"></div>
                <p>Loading...</p>
              </div>
            )}
          </h1>
          <div className="col-lg-6">
            <form className="Mern-form">
              <div>
                <h1 className="Admincolor gradient-text">NEW USER</h1>
              </div>
              {status}
              <div>
                <label>Email</label>
              </div>
              <div>
                <input
                  value={adduseremail}
                  onChange={(event) => setadduseremail(event.target.value)}
                  type="email"
                  placeholder="Enter User Email"
                />
              </div>
              <div>
                <label>Password</label>
              </div>
              <div>
                <input
                  value={adduserpassword}
                  onChange={(event) => setadduserpassword(event.target.value)}
                  type="password"
                  placeholder="Enter User Password"
                />
              </div>
              <div>
                <label>Phone Num</label>
              </div>
              <div>
                <input
                  value={phonenum}
                  onChange={(event) => setphonenum(event.target.value)}
                  type="number"
                  placeholder="Enter User Phone Num"
                />
              </div>
              <div>
                <label>User Name</label>
              </div>
              <div>
                <input
                  placeholder="Enter User Name"
                  value={username}
                  onChange={(event) => setusername(event.target.value)}
                />
              </div>
              <div>
                <label>Upload Image</label>
              </div>
              <div>
                <input
                  style={{ color: "white" }}
                  type="file"
                  accept="image/*"
                  onChange={(event) => setSelectedImage(event.target.files[0])}
                />
              </div>
              <div>
                <label>Role:</label>
                <select
                  style={{ color: "black" }}
                  value={role}
                  onChange={(event) => handleRoleSelect(event.target.value)}
                >
                  <option style={{ color: "black" }} value="">
                    Select Role
                  </option>{" "}
                  {/* Default option */}
                  <option style={{ color: "black" }} value="Admin">
                    Admin
                  </option>
                  <option style={{ color: "black" }} value="User">
                    User
                  </option>
                </select>
              </div>
              <button
                type="button"
                onClick={AddUser}
                className="morph-btn paid-btn-tops"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-lg-6">
            <form className="Mern-form Mern-Form-two">
              <h1>{Updateuser}</h1>
              <div>
                <h1 className="Admincolor gradient-text">UPDATE USER</h1>
              </div>
              <div>
                <label>User Old Email</label>
              </div>
              <div>
                <input
                  value={oldemail}
                  onChange={(event) => {
                    setoldemail(event.target.value);
                  }}
                  type="email"
                  placeholder="Enter User Old Email"
                />
              </div>
              <div>
                <label>User New Email</label>
              </div>
              <div>
                <input
                  value={newemail}
                  onChange={(event) => {
                    setnewemail(event.target.value);
                  }}
                  type="email"
                  placeholder="Enter User New Email"
                />
              </div>
              <div>
                <label>User Old Password</label>
              </div>
              <div>
                <input
                  value={oldpassword}
                  onChange={(event) => {
                    setoldpassword(event.target.value);
                  }}
                  type="password"
                  placeholder="Enter User Old Password"
                />
              </div>
              <div>
                <label>User New Password</label>
              </div>
              <div>
                <input
                  value={newpassword}
                  onChange={(event) => {
                    setnewpassword(event.target.value);
                  }}
                  type="password"
                  placeholder="Enter User New Password"
                />
              </div>
              <div>
                <label>Role:</label>
                <select
                  style={{ color: "black" }}
                  value={role}
                  onChange={(event) => handleRoleSelect(event.target.value)}
                >
                  <option style={{ color: "black" }} value="">
                    Select Role
                  </option>{" "}
                  {/* Default option */}
                  <option style={{ color: "black" }} value="Admin">
                    Admin
                  </option>
                  <option style={{ color: "black" }} value="User">
                    User
                  </option>
                </select>
              </div>
              <button
                type="button"
                onClick={UpdateUser}
                className="morph-btn paid-btn-tops"
              >
                Update
              </button>
            </form>
          </div>
          <div className="col-lg-6">
            <form
              className="Mern-form offset-lg-6"
              style={{ marginTop: "3rem" }}
            >
              <p>{RemoveErrorMessage}</p>
              <div>
                <h1 className="gradient-text"> REMOVE USER</h1>
              </div>
              <div>
                <label>Email</label>
              </div>
              <div>
                <input
                  type="email"
                  value={removeinput}
                  onChange={(event) => setremoveinput(event.target.value)}
                  placeholder="Remove User Email"
                />
              </div>
              <button
                type="button"
                onClick={removeuser}
                className="morph-btn paid-btn-tops"
              >
                Remove
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
