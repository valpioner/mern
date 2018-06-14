import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

class Map extends Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng)
      map.panTo(center)
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          })
        })
      }
    }
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let { initialCenter, zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const MY_MAPTYPE_ID = 'kickasstrip_style';
      const center = new maps.LatLng(lat, lng);

      var mapStyles = [
        {
          featureType: "water",
          stylers: [
            { color: "#1C2B35" }]
        },
        {
          featureType: "landscape",
          stylers: [
            { color: "#2b3943" }]
        },
        {
          featureType: "road",
          stylers: [
            { visibility: "simplified" },
            { lightness: -32 },
            { saturation: -9 }]
        },
        {
          featureType: "poi",
          stylers: [
            { "visibility": "off" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "off" },
            { color: "#000000" },
            { lightness: 10 }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            { visibility: "on" },
            { saturation: -100 },
            { lightness: 45 }]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            { visibility: "off" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            { color: "#000000" },
            { lightness: 19 }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
            { "visibility": "off" }]
        },
        {
          "featureType": "administrative.province",
          "stylers": [
            { "lightness": -50 }]
        },
        {
          "featureType": "administrative",
          "elementType": "labels",
          "stylers": [
            { visibility: "simplified" }]
        },
      ];

      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        backgroundColor: "none",
        disableDefaultUI: true,
        minZoom: 3,
        maxZoom: 8,
        tilt: 45,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.TERRAIN, MY_MAPTYPE_ID]
        },
      });

      var styledMap = new maps.StyledMapType(mapStyles, { name: "KickAssTrip" });
      this.map = new maps.Map(node, mapConfig);
      this.map.mapTypes.set(MY_MAPTYPE_ID, styledMap);
      this.map.setMapTypeId(MY_MAPTYPE_ID);
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
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool
};

Map.defaultProps = {
  zoom: 3,
  initialCenter: {
    lat: 10,
    lng: 25
  },
  centerAroundCurrentLocation: false
};

export default Map;
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component