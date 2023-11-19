"use client";
import React, { useContext, useEffect } from "react";
import { LurkerContext } from "../Lurker"; // Adjust the path accordingly

export default function Home() {
  // Use the useContext hook to access the context values
  const contextValue = useContext(LurkerContext);

  // Provide default values to handle the case where contextValue is undefined
  const { socket } = contextValue || {
    user: null,
    logout: () => Promise.resolve(),
  };

  useEffect(() => {
    socket?.emit("ping", { data: "hello from search component" });
  }, [socket]);

  return (
    <div>
      <div>
        search user: <input type="text" />
      </div>
    </div>
  );
}
