import React from "react";

const Loader = () => {
  return (
    <>
      <div
        style={{ color: "#ff5546", margin: "100px 300px" }}
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

export default Loader;
