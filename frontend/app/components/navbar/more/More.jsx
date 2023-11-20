import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function More() {
  const [collaps, setCollaps] = useState(false);
  const usernameInputRef = useRef(null);
  const alertBox = useRef(null);

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      axios.post("/logout").catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleMore() {
    setCollaps(!collaps);
  }

  const handleClickOutsideInput = (event) => {
    // Check if the click occurred outside the input field
    if (
      usernameInputRef.current &&
      !usernameInputRef.current.contains(event.target) &&
      alertBox.current &&
      !alertBox.current.contains(event.target)
    ) {
      setCollaps(false);
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
  return (
    <div>
      <div ref={usernameInputRef}>
        <div onClick={handleMore} className="navStyle">
          <div className="divImg">
            <img className="navIcons" src="/nav-icons/more.png" alt="more" />
          </div>
        </div>
      </div>
      <div id="popup" ref={alertBox}>
        {collaps ? (
          <div>
            <div id="moreOuterDiv">
              <div id="moreInnerDiv">
                <div className="moreOptionsDiv">
                  <div className="moreOptions">Settings</div>
                  <div className="moreOptions">Themes</div>
                </div>
                <div id="separator"></div>
                <div className="moreOptionsDiv">
                  <div className="moreOptions">Accounts</div>
                  <div className="moreOptions" onClick={handleLogout}>
                    Log Out
                  </div>
                </div>
              </div>
              <div id="moreArrow"></div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default More;
