import React from "react";
import spinner from "./loading.svg";

export default () => {
  return (
    <div>
      <img src={spinner} alt="Loading..." 
        style={{ width: "100px", margin: "auto", display: "block", marginTop: "40%" }} />
    </div>
  );
};
