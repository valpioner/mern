import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getUserMap } from '../../actions/mapActions';
import { getUserTrips } from '../../actions/mapActions';
import Spinner from '../common/Spinner';
import MapMenu from "./MapMenu";

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
    this.props.getUserTrips(this.props.auth.user.id);
  }

  loadMap(userMap) {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      maps.Polyline.prototype.getBounds = function() {
        var bounds = new google.maps.LatLngBounds();
        this.getPath().forEach(function(item, index) {
            bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
        });
        return bounds;
      };

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
            { opacity: 0.2 },
            { saturation: -9 }]
        },
        {
          "featureType": "road.arterial",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            { "saturation": -80 },
            { "lightness": -30 },
            { "visibility": "simplified" },
            { "weight": 0.5 }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            { "visibility": "simplified" }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 19 }
          ]
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

      var bounds = new google.maps.LatLngBounds();

      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 1
      };

      const planeSymbol = {
        path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
        fillColor: '#5A8DBE',
        fillOpacity: 0.6,
        scale: 0.02,
        strokeOpacity: 0.6,
        strokeWeight: 1,
        anchor: new maps.Point(300, 300)
      };

      const polyFlightsOptions = {
        geodesic: true,
        strokeColor: '#5A8DBE',//'#58BB7A',
        strokeOpacity: 0,
        strokeWeight: 1,
        map: this.map,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '5px'
        }, {
          icon: planeSymbol,
          offset: '50%',
        }]
      };

      const polyGroundOptions = {
        strokeColor: '#FF6300',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: this.map
      };

      for (const flightDetails of userMap.flights) {
        flightDetails.reduce((from, to) => {
          const path = [];
          path.push(new maps.LatLng(from.lat, from.long), new maps.LatLng(to.lat, to.long));
          let polyline = new maps.Polyline(polyFlightsOptions);
          polyline.setPath(path);
          //this.map.fitBounds(polyline.getBounds());
          return to;
        });
      }   

      // centerFlight = (flight) => {
      //   //TODO: clear map from all elements
      // }

    }
  }

  render() {
    const { userMap, loading } = this.props.map;

    return (
      <div style={{ height: "100%" }}>
        <div ref='map' style={{ height: "100%" }}>
          <Spinner />
        </div>
        <MapMenu />
      </div>
    )
  }
}

Map.propTypes = {
  getUserMap: PropTypes.func.isRequired,
  getUserTrips: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getUserMap, getUserTrips })(
  Map
);
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component