import React, { Component } from "react";
import spinner from "./loading.svg";

export default () => {
  return (
    <div>
      <img src={spinner}
        style={{ width: "100px", margin: "auto", display: "block", "margin-top": "40%" }}
        alt="Loading..." />
    </div>
  );
};
