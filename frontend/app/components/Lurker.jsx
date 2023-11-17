"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  withCredentials: true, // This is important to include cookies with the WebSocket handshake
});

function Lurker() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const logout = async () => {
    try {
      const response = await axios.post("/logout", {
        withCredentials: true, // Include credentials (cookies) in the request
      });

      if (response.status === 200) {
        console.log("Logout successful");
        window.location.href = "/login";
        // Redirect to the login page or perform other actions as needed
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/user", {
        withCredentials: true, // Include credentials (cookies) in the request
      });

      if (response.status === 200) {
        console.log("User found: ", response.data);
        // Set the user in state
        setUser(response.data);
        setIsLoaded(true);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error getting the user:", error);
    }
  };

  useEffect(() => {
    getUser();

    socket.on("connect", () => {
      console.log("socket is connected");
    });
    socket.on("disconnect", (reason) => {
      console.log("socket is disconnected: " + reason);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("user-connected", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("user-connected");
    };
  }, []);
  return (
    <div>
      <div>Home</div>
      {isLoaded ? (
        <div>
          <div>username: {user.userInfo.username}</div>
          <div>email: {user.userInfo.email}</div>

          <div>
            <button onClick={() => logout()}>log out</button>
          </div>
        </div>
      ) : (
        <div>loading user info...</div>
      )}
    </div>
  );
}

export default Lurker;
