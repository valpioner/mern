import React, { Component } from "react";
import Map from "./Map";
// import { GoogleApiWrapper } from "google-maps-react";
import GoogleApiWrapper from "./utils/GoogleApiComponent";
// import MapMenu from "./MapMenu";

class MapContainer extends Component {
  // render() {
    
  //   return (
  //     <Map google={this.props.google} />
  //     // <div className="map-container">
  //     //   {/* <MapMenu /> */}
  //     // </div>
        
  //   );
  // }
  render() {
    return (
      <Map google={this.props.google}
        style={{ height: '100%', position: 'relative', width: '100%' }}/>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCEnNynIJ2Qavdbn-wGj3JpB5RhYX8hRI'
})(MapContainer);
