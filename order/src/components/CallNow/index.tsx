import React from "react";

const CallNow = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        bottom: "50px",
        zIndex: "7",
        maxWidth: "100px",
        maxHeight: "100px",

        cursor: "pointer",
      }}
    >
      <img
        src={require("assets/images/logo/call_now.gif")}
        alt="tel:1800 9280"
      />
    </div>
  );
};

export default CallNow;
