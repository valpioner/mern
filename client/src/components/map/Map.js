import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getUserMap } from '../../actions/mapActions';
import Spinner from '../common/Spinner';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.map.userMap !== null && !nextProps.map.loading) {
      this.loadMap(nextProps.map.userMap);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
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

    this.props.getUserMap(this.props.auth.user.id);
  }

  loadMap(userMap) {
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

      const mapStyles = [
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

      const styledMap = new maps.StyledMapType(mapStyles, { name: "KickAssTrip" });
      this.map = new maps.Map(node, mapConfig);
      this.map.mapTypes.set(MY_MAPTYPE_ID, styledMap);
      this.map.setMapTypeId(MY_MAPTYPE_ID);

      const polyFlightsOptions = {        
        geodesic: true, 
        strokeColor: '#5A8DBE',//'#58BB7A',
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: this.map
      };

      const polyGroundOptions = {
        strokeColor: '#FF6300',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.map
      };

      for(const flightDetails of userMap.flights){
        const path = [];
        for(const ll of flightDetails){
          path.push(new maps.LatLng(ll.lat, ll.long));
        }
        new maps.Polyline(polyFlightsOptions).setPath(path);
      }
    }
  }

  render() {   
    const { userMap, loading } = this.props.map;   

    return (
      <div ref='map' style={{height: "100%"}}>
        <Spinner />
      </div>
    )
  }
}

Map.propTypes = {
  getUserMap: PropTypes.func.isRequired,
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  map: PropTypes.object
};

Map.defaultProps = {
  zoom: 3,
  initialCenter: {
    lat: 10,
    lng: 25
  },
  centerAroundCurrentLocation: false
};

const mapStateToProps = state => ({
  map: state.map,
  auth: state.auth
});

export default connect(mapStateToProps, { getUserMap })(
  Map
);
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component