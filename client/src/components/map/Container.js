import React, { Component } from "react";
import Map from "./Map";
import { GoogleApiWrapper } from "google-maps-react";

class Container extends Component {
  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "relative"
    };
    
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCEnNynIJ2Qavdbn-wGj3JpB5RhYX8hRI'
})(Container);
