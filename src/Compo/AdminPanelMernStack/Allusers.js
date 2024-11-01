import { useState } from "react";
import { useNavigate } from "react-router-dom";
import showToasts from "../usetoast/usetoast";
import UserProfile from "./List";
import "./AllUser.css";
import {
  Skeleton,
  Stack,

} from "@chakra-ui/react";
import useApi from "../FetchHook/FetchPost";

const UserProfiles = () => {
  const [users, setUsers] = useState([]);
  const showToast = showToasts();

  const navigate = useNavigate();

  const { loading, error, data, get } = useApi("http://localhost:3001");
  const navlogin = async (event) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await get("/AllUser", {}, headers);
      console.log(result);
      setUsers(result);
    } catch (err) {
      showToast("error", "Unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <button className="morph-btn" onClick={navlogin}>
        All Users
      </button>
      {loading && (
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Stack spacing={4} width="100%" style={{ marginTop: "1rem" }}>
                <Skeleton
                  height="25rem"
                  startColor="#2d2d2d"
                  endColor="#4d4d4d"
                />
                <Skeleton
                  height="3rem"
                  startColor="#2d2d2d"
                  endColor="#4d4d4d"
                />
                <Skeleton
                  height="1rem"
                  startColor="#2d2d2d"
                  endColor="#4d4d4d"
                />
              </Stack>
            </div>
            <div className="col-lg-3">
              <Stack spacing={4} width="100%" style={{ marginTop: "1rem" }}>
                <Skeleton
                  height="25rem"
                  startColor="#2d2d2d"
                  endColor="#4d4d4d"
                />
                <Skeleton
                  height="3rem"
                  startColor="#2d2d2d"
                  endColor="#4d4d4d"
                />
                <Skeleton
                  height="1rem"
                  startColor="#2d2d2d"
                  endColor="#4d4d4d"
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
      {error && (
        <p className="error-message">{error.message || "An error occurred"}</p>
      )}{" "}
      {/* Error state */}
      <div className="row">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <UserProfile
                username={user.username}
                email={user.email}
                id={user._id}
                Phone={user.phone}
                role={user.role}
                image={`http://localhost:3001/${user.image}`}
              />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default UserProfiles;
