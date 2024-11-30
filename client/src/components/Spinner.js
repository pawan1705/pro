import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <>
      <div
        style={{ color: "#ff5546", margin: "220px 600px" }}
        className="align-items-center"
      >
        <div
          className="spinner-border"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        ></div>
      </div>
    </>
  );
};

export default Spinner;
