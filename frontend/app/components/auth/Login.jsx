"use client";
import { useState } from "react";
import axios from "axios";
import "../../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("formData", formData);
      const response = await axios.post("/login", formData);
      // Handle the response here, e.g., display a success message or redirect to another page.
      console.log("Post request successful:", response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message.
      console.error("Error making the POST request:", error);
    }
  };

  return (
    <div className="loginOuterDiv">
      <form onSubmit={handleSubmit}>
        <div className="formSection">
          <label>username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="formSection">
          <label>password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
