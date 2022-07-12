import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4,
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={require("../../assets/images/notfound/1.jpg")}
        alt="not found"
      />
    </div>
  );
};

export default NotFound;
