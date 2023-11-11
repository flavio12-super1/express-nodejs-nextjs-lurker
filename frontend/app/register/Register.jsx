"use client";
import { useState } from "react";
import axios from "axios";
import "./Register.css";
import "../styles/globalForm.css";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
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
        "http://localhost:8000/register",
        formData
      );
      // Handle the response here, e.g., display a success message or redirect to another page.
      console.log("Post request successful:", response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message.
      console.error("Error making the POST request:", error);
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
          <div className="formSection">
            <label>email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="linkDiv">
        <div className="innerLinkDiv">
          <Link href="/login">
            <a>login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
