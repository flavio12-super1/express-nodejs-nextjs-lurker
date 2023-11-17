"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import "../styles/globalForm.css";
import Link from "next/link";
import AlertBox from "../alertBox/AlertBox";

const Register = () => {
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const usernameInputRef = useRef(null);
  const alertBox = useRef(null);

  //validate password:
  const validateUsername = (username) => {
    return /^[a-zA-Z\d]{6,24}$/.test(username);
  };
  //validate password:
  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,256}$/.test(password);
  };
  //validate email:
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleUserNameChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Log the result to the console
    console.log(
      `UserName "${value}" is ${validateUsername(value) ? "valid" : "invalid"}`
    );
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Log the result to the console
    console.log(
      `Password "${value}" is ${validatePassword(value) ? "valid" : "invalid"}`
    );
  };

  const handleUsernameChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Log the result to the console
    console.log(
      `Username "${value}" is ${validateEmail(value) ? "valid" : "invalid"}`
    );
  };

  const handleUserNameInputClick = () => {
    // Show alert when the input is clicked
    setShowAlert(true);
  };

  const handleClickOutsideInput = (event) => {
    // Check if the click occurred outside the input field
    if (
      usernameInputRef.current &&
      !usernameInputRef.current.contains(event.target) &&
      alertBox.current &&
      !alertBox.current.contains(event.target)
    ) {
      setShowAlert(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks on the document body
    document.body.addEventListener("click", handleClickOutsideInput);

    // Cleanup: remove event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutsideInput);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("formData", formData);
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );
      console.log("Post request successful:", response.data);
      alert(
        "An email has been sent to your email address. Please verify before attempting to log in."
      );
      setCheckCode(true);
    } catch (error) {
      console.error("Error making the POST request:", error);
      alert(error.response.data.message);
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:8000/verify", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        code: code,
      });
      console.log("Post request successful:", response.data);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error making the POST request:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="innerFormDiv">
        <form onSubmit={handleSubmit} autocomplete="off">
          <div className="formSection">
            <label>username</label>
            <input
              type="search"
              name="username"
              value={formData.username}
              onClick={() => handleUserNameInputClick()}
              onChange={handleUserNameChange}
              ref={usernameInputRef}
            />
            {showAlert &&
            formData.username.length > 0 &&
            !validateUsername(formData.username) ? (
              <div style={{ position: "relative" }}>
                <div ref={alertBox}>
                  <AlertBox
                    errorMessage={
                      "Username must be between 6 and 24 characters long"
                    }
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="formSection">
            <label>password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="formSection">
            <label>email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <button type="submit" className="submitButton">
              Submit
            </button>
          </div>
        </form>

        {checkCode && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>Enter code:</div>
            <input
              type="text"
              placeholder="input code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={verifyCode}>Verify</button>
          </form>
        )}
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
