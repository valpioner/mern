import React, { Component } from "react";
import Map from "./Map";
import { GoogleApiWrapper } from "google-maps-react";
import MapMenu from "./MapMenu";

class Container extends Component {
  render() {
    
    return (
      <div className="map-container">
        <MapMenu />
        <Map google={this.props.google} />
      </div>
        
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCEnNynIJ2Qavdbn-wGj3JpB5RhYX8hRI'
})(Container);
