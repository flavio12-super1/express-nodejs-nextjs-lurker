"use client";
import React, { useContext, useEffect } from "react";
import { LurkerContext } from "./Lurker"; // Adjust the path accordingly

export default function Home() {
  // Use the useContext hook to access the context values
  const contextValue = useContext(LurkerContext);

  // Provide default values to handle the case where contextValue is undefined
  const { user, socket, logout } = contextValue || {
    user: null,
    logout: () => Promise.resolve(),
  };

  useEffect(() => {
    socket?.emit("ping", { data: "hello" });
  }, [socket]);

  return (
    <div>
      <div>username: {user?.userInfo.username}</div>
      <div>email: {user?.userInfo.email}</div>

      <div>
        <button onClick={() => logout()}>log out</button>
      </div>
    </div>
  );
}
