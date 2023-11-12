"use client";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import Link from "next/link";
import "../styles/globalForm.css";

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
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );
      // Handle the response here, e.g., display a success message or redirect to another page.
      console.log("Post request successful:", response.data);
      window.location.href = "/";
    } catch (error) {
      // Handle errors, e.g., show an error message.
      console.error("Error making the POST request:", error);
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="innerFormDiv">
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
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      </div>

      <div className="linkDiv">
        <div className="innerLinkDiv">
          <Link href="/register">
            <a>register</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
