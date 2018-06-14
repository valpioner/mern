import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

class Map extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
    // ...
  }

  render() {
    const style = {
      height: "100%"
    };

    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
};
Map.defaultProps = {
  zoom: 3,
  // San Francisco, by default
  initialCenter: {
    lat: 10,
    lng: 25
  }
};

export default Map;
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component