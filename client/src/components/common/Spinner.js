import React, { Component } from "react";
import spinner from "./loading.svg";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
