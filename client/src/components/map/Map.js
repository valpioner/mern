import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getUserMap } from '../../actions/mapActions';
import { getUserTrips } from '../../actions/mapActions';
import Spinner from '../common/Spinner';
import MapMenu from "./MapMenu";

import './map.scss';

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
    console.error(userMap);
    console.error(this.props);
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let { initialCenter, zoom } = this.props;
      const { lat, lng } = /*this.state.currentLocation*/ initialCenter;
      const center = new maps.LatLng(lat, lng);
      const MY_MAPTYPE_ID = 'kickasstrip_style';
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

      // maps.Polyline.prototype.getBounds = function() {
      //   var bounds = new google.maps.LatLngBounds();
      //   this.getPath().forEach(function(item, index) {
      //       bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
      //   });
      //   return bounds;
      // };

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
          featureType: "road.arterial",
          stylers: [
            { visibility: "off" }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            { saturation: -80 },
            { lightness: -30 },
            { visibility: "simplified" },
            { weight: 0.5 }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            { visibility: "simplified" }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },
        {
          featureType: "road.local",
          stylers: [
            { visibility: "off" }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            { color: "#000000" },
            { lightness: 19 }
          ]
        },
        {
          featureType: "poi",
          stylers: [
            { visibility: "off" }]
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
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            { visibility: "off" }]
        },
        {
          featureType: "administrative.province",
          stylers: [
            { lightness: -50 }]
        },
        {
          featureType: "administrative",
          elementType: "labels",
          stylers: [
            { visibility: "simplified" }]
        },
      ];

      const styledMap = new maps.StyledMapType(mapStyles, { name: "KickAssTrip" });
      this.map = new maps.Map(node, mapConfig);
      this.map.mapTypes.set(MY_MAPTYPE_ID, styledMap);
      this.map.setMapTypeId(MY_MAPTYPE_ID);

      // var bounds = new google.maps.LatLngBounds();

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

      const poly_ground = {
        path_alaska: new google.maps.Polyline(polyGroundOptions).setPath([new google.maps.LatLng(61.216511520571565, -149.86681938171387), new google.maps.LatLng(61.08676567816336, -149.83351707458496), new google.maps.LatLng(61.03967215547474, -149.77935791015625), new google.maps.LatLng(60.988429428680114, -149.6063232421875), new google.maps.LatLng(60.988429428680114, -149.49508666992188), new google.maps.LatLng(60.92642849586649, -149.35638427734375), new google.maps.LatLng(60.947775785813185, -149.18197631835938), new google.maps.LatLng(60.82483326785533, -148.98422241210938), new google.maps.LatLng(60.838888705540725, -149.05838012695312), new google.maps.LatLng(60.72358592925107, -149.271240234375), new google.maps.LatLng(60.775255324666695, -149.4305419921875), new google.maps.LatLng(60.74976654077557, -149.46075439453125), new google.maps.LatLng(60.55255330722193, -149.57748413085938), new google.maps.LatLng(60.4951151199491, -149.381103515625), new google.maps.LatLng(60.32830741031744, -149.34402465820312), new google.maps.LatLng(60.312667816673084, -149.35501098632812), new google.maps.LatLng(60.254122938094454, -149.34127807617188), new google.maps.LatLng(60.23094836959534, -149.3756103515625), new google.maps.LatLng(60.18659839709946, -149.37286376953125), new google.maps.LatLng(60.12055956793536, -149.4408416748047)]),
        
        path_usa_west: new google.maps.Polyline(polyGroundOptions).setPath([new google.maps.LatLng(37.77491261707112, -122.41937756538391), new google.maps.LatLng(37.80218877920469, -122.27920532226562), new google.maps.LatLng(37.688303312481075, -122.0965576171875), new google.maps.LatLng(37.78808138412046, -121.18812561035156), new google.maps.LatLng(36.754152238021554, -119.77535247802734), new google.maps.LatLng(37.73271097867418, -119.57725524902344), new google.maps.LatLng(37.80490143094974, -119.04304504394531), new google.maps.LatLng(37.983174833513395, -118.2513427734375), new google.maps.LatLng(36.14231087352999, -115.0927734375), new google.maps.LatLng(34.020385883245595, -118.41167449951172), new google.maps.LatLng(36.142306541469615, -115.09274125099182), new google.maps.LatLng(35.18278813800229, -114.04426574707031), new google.maps.LatLng(35.25795517382968, -112.15118408203125), new google.maps.LatLng(36.05735655797715, -112.10548996925354)]),
        
        path_usa_east: new google.maps.Polyline(polyGroundOptions).setPath([new google.maps.LatLng(43.089074546619486, -79.0631103515625), new google.maps.LatLng(43.07427992333155, -78.99109840393066), new google.maps.LatLng(43.04722034719209, -78.99051904678345), new google.maps.LatLng(43.01370072201705, -78.96828889846802), new google.maps.LatLng(42.98802709357984, -78.91337871551514), new google.maps.LatLng(43.003517296217076, -78.82244110107422), new google.maps.LatLng(42.951396938304164, -78.7639045715332), new google.maps.LatLng(43.08092540794885, -76.1517333984375), new google.maps.LatLng(41.07106913080641, -75.4266357421875), new google.maps.LatLng(40.784668324219524, -73.96850109100342), new google.maps.LatLng(39.68050488864195, -75.65820693969727), new google.maps.LatLng(38.32819110107816, -75.21514892578125), new google.maps.LatLng(36.73228075607203, -76.2725830078125), new google.maps.LatLng(36.06908224732973, -75.80291748046875), new google.maps.LatLng(36.09641227456103, -75.7148551940918), new google.maps.LatLng(35.906432183183306, -75.59829711914062), new google.maps.LatLng(35.889189151336524, -75.66215515136719)]),
        
        path_asia1: new google.maps.Polyline(polyGroundOptions).setPath([new google.maps.LatLng(50.064191736659104, 19.9676513671875), new google.maps.LatLng(50.032445247495104, 22.0220947265625), new google.maps.LatLng(49.83266792683253, 24.0435791015625), new google.maps.LatLng(49.74844341339525, 24.561309814453125), new google.maps.LatLng(49.80076850316847, 24.896392822265625), new google.maps.LatLng(49.54927080239457, 25.59539794921875), new google.maps.LatLng(49.42526716083715, 26.993408203125), new google.maps.LatLng(49.74400648683361, 27.235107421875), new google.maps.LatLng(49.791017262480324, 27.5701904296875), new google.maps.LatLng(49.92293545449574, 27.7789306640625), new google.maps.LatLng(50.195363679298, 28.271942138671875), new google.maps.LatLng(50.25071752130677, 28.6688232421875), new google.maps.LatLng(50.43651601698633, 30.52001953125), new google.maps.LatLng(50.233151832472245, 32.45361328125), new google.maps.LatLng(49.56797785892715, 34.1015625), new google.maps.LatLng(49.990083926193954, 36.243896484375), new google.maps.LatLng(48.603857608232545, 38.0950927734375), new google.maps.LatLng(48.56024979174331, 39.3145751953125), new google.maps.LatLng(48.323386716330916, 40.2593994140625), new google.maps.LatLng(48.17341248658083, 40.80322265625), new google.maps.LatLng(48.69096039092549, 43.505859375), new google.maps.LatLng(48.705462895790575, 44.5111083984375), new google.maps.LatLng(48.54570549184746, 44.483642578125), new google.maps.LatLng(48.191725575618726, 45.966796875), new google.maps.LatLng(46.3583020562222, 48.0816650390625), new google.maps.LatLng(46.76244305208004, 50.09765625), new google.maps.LatLng(47.327653995607115, 51.17431640625), new google.maps.LatLng(47.13649046753256, 51.94061279296875), new google.maps.LatLng(49.17093019244911, 56.4862060546875), new google.maps.LatLng(49.45384259433074, 57.4310302734375), new google.maps.LatLng(47.82790816919327, 59.622802734375), new google.maps.LatLng(48.52388120259336, 61.0400390625), new google.maps.LatLng(45.84410779560204, 62.138671875), new google.maps.LatLng(45.729191061299936, 63.753662109375), new google.maps.LatLng(44.933696389694674, 64.522705078125), new google.maps.LatLng(44.84029065139799, 65.511474609375), new google.maps.LatLng(43.9058083561574, 67.225341796875), new google.maps.LatLng(42.391008609205045, 69.63134765625), new google.maps.LatLng(42.94838139765314, 71.4111328125), new google.maps.LatLng(42.932296019030574, 72.79541015625), new google.maps.LatLng(43.61221676817573, 73.795166015625), new google.maps.LatLng(43.04881979669318, 74.7344970703125), new google.maps.LatLng(43.393073720674444, 75.0970458984375), new google.maps.LatLng(43.241201214257885, 76.278076171875), new google.maps.LatLng(43.24920396697784, 76.8878173828125), new google.maps.LatLng(43.73538317799622, 78.94775390625), new google.maps.LatLng(43.691707903073805, 79.4476318359375), new google.maps.LatLng(44.12308489306966, 79.8431396484375), new google.maps.LatLng(44.22158376545796, 80.3485107421875), new google.maps.LatLng(44.19205137735955, 80.7659912109375), new google.maps.LatLng(44.5826428195842, 81.3922119140625), new google.maps.LatLng(44.61979915773973, 82.08709716796875), new google.maps.LatLng(44.52392653654213, 82.27935791015625), new google.maps.LatLng(44.58851118961441, 82.9193115234375), new google.maps.LatLng(44.64129986075226, 82.957763671875), new google.maps.LatLng(44.3906169787868, 84.83642578125), new google.maps.LatLng(44.160533843726704, 86.86614990234375), new google.maps.LatLng(43.804800966308385, 87.6104736328125), new google.maps.LatLng(43.64800079902171, 87.5885009765625), new google.maps.LatLng(43.329173667843904, 88.30810546875), new google.maps.LatLng(43.072900581493215, 88.54156494140625), new google.maps.LatLng(42.87797684287408, 89.98626708984375), new google.maps.LatLng(43.37910133500264, 91.6644287109375), new google.maps.LatLng(43.36512572875844, 92.1478271484375), new google.maps.LatLng(42.53082032025189, 94.16656494140625), new google.maps.LatLng(41.80817277478235, 95.10040283203125), new google.maps.LatLng(40.52215098562377, 95.80078125), new google.maps.LatLng(40.52215098562377, 96.87744140625), new google.maps.LatLng(39.73253798438173, 98.5693359375), new google.maps.LatLng(38.96795115401593, 100.469970703125), new google.maps.LatLng(37.90953361677018, 102.667236328125), new google.maps.LatLng(37.190954715826074, 102.8485107421875), new google.maps.LatLng(36.06020141239291, 103.81805419921875), new google.maps.LatLng(37.405073750176946, 105.699462890625), new google.maps.LatLng(37.70120736474139, 107.457275390625), new google.maps.LatLng(37.46613860234406, 111.170654296875), new google.maps.LatLng(38.07404145941957, 114.43359375), new google.maps.LatLng(39.87601941962116, 116.400146484375), new google.maps.LatLng(39.155622393423215, 116.993408203125), new google.maps.LatLng(36.78289206199065, 118.048095703125), new google.maps.LatLng(36.76529191711623, 118.487548828125), new google.maps.LatLng(34.92422301690581, 118.72650146484375), new google.maps.LatLng(34.77771580360469, 119.0972900390625), new google.maps.LatLng(34.52466147177172, 119.11102294921875), new google.maps.LatLng(33.859012351859946, 119.9981689453125), new google.maps.LatLng(31.203404950917395, 121.519775390625), new google.maps.LatLng(30.287531589298723, 120.146484375), new google.maps.LatLng(28.632746799225853, 115.86181640625), new google.maps.LatLng(26.54922257769204, 114.686279296875), new google.maps.LatLng(22.58358253773391, 114.005126953125), new google.maps.LatLng(22.806567100271508, 108.3251953125), new google.maps.LatLng(23.926013033021203, 106.63330078125), new google.maps.LatLng(23.865745352647956, 106.09771728515625), new google.maps.LatLng(23.611811980488643, 105.55938720703125), new google.maps.LatLng(23.95864629158492, 103.35662841796875), new google.maps.LatLng(24.982323667869966, 102.78533935546875), new google.maps.LatLng(24.337086982410497, 102.5628662109375), new google.maps.LatLng(24.06151244228103, 102.19482421875), new google.maps.LatLng(23.624394569716934, 101.97509765625), new google.maps.LatLng(23.2060096376488, 101.1785888671875), new google.maps.LatLng(22.806567100271508, 100.986328125), new google.maps.LatLng(22.050641187501146, 100.92658996582031), new google.maps.LatLng(22.00035515414624, 100.79887390136719), new google.maps.LatLng(22.045549743614956, 100.92796325683594), new google.maps.LatLng(21.9061004218784, 101.08108520507812), new google.maps.LatLng(21.921389217141666, 101.25137329101562), new google.maps.LatLng(21.76587679616409, 101.37771606445312), new google.maps.LatLng(21.652322721683657, 101.38320922851562), new google.maps.LatLng(21.652322721683657, 101.38458251953125), new google.maps.LatLng(21.48565770983776, 101.56517028808594), new google.maps.LatLng(21.408326666806165, 101.590576171875), new google.maps.LatLng(21.41407997342895, 101.67503356933594), new google.maps.LatLng(21.27977722509186, 101.70249938964844), new google.maps.LatLng(21.184011609658786, 101.68520450592041), new google.maps.LatLng(21.18809311656164, 101.6770076751709), new google.maps.LatLng(21.170645886769723, 101.6678237915039), new google.maps.LatLng(21.14823358203379, 101.67091369628906), new google.maps.LatLng(21.08650218003406, 101.63022994995117), new google.maps.LatLng(21.061433986951034, 101.64353370666504), new google.maps.LatLng(21.05246287223028, 101.58576965332031), new google.maps.LatLng(20.928413950321985, 101.40140533447266), new google.maps.LatLng(20.970736786968068, 101.41239166259766), new google.maps.LatLng(20.988367767919225, 101.41170501708984), new google.maps.LatLng(20.98644448928465, 101.4261245727539), new google.maps.LatLng(20.96368381219863, 101.44981384277344), new google.maps.LatLng(20.962922391617354, 101.45238876342773), new google.maps.LatLng(21.051982261538054, 101.58585548400879), new google.maps.LatLng(21.06111359930946, 101.64353370666504), new google.maps.LatLng(20.955027433973378, 101.69357299804688), new google.maps.LatLng(20.941560961222393, 101.73751831054688), new google.maps.LatLng(20.88896599730834, 101.77322387695312), new google.maps.LatLng(20.845336679436304, 101.8487548828125), new google.maps.LatLng(20.790140305709304, 101.87484741210938), new google.maps.LatLng(20.793349950582417, 101.9036865234375), new google.maps.LatLng(20.759324242815165, 101.95106506347656), new google.maps.LatLng(20.693176908667347, 101.98282241821289), new google.maps.LatLng(20.643708104674772, 101.97750091552734), new google.maps.LatLng(20.607720680700563, 102.0132064819336), new google.maps.LatLng(20.61511164933928, 102.04376220703125), new google.maps.LatLng(20.574296174309023, 102.4090576171875), new google.maps.LatLng(20.385825381874263, 102.3211669921875), new google.maps.LatLng(20.321447992849983, 102.43515014648438), new google.maps.LatLng(19.988836302380786, 102.249755859375), new google.maps.LatLng(19.86876829938972, 102.12993621826172), new google.maps.LatLng(19.84584173928549, 102.1563720703125), new google.maps.LatLng(19.843258257258206, 102.20272064208984), new google.maps.LatLng(19.760241554664503, 102.18040466308594), new google.maps.LatLng(19.52517079926486, 101.98076248168945), new google.maps.LatLng(19.51060904801448, 101.89407348632812), new google.maps.LatLng(19.427096385573407, 101.83605194091797), new google.maps.LatLng(19.32539900916396, 101.74816131591797), new google.maps.LatLng(19.286354997652634, 101.70224189758301), new google.maps.LatLng(19.510851754617452, 101.89390182495117), new google.maps.LatLng(19.52496856170417, 101.98084831237793), new google.maps.LatLng(19.48407092969376, 102.05612182617188), new google.maps.LatLng(19.41220201468123, 102.15156555175781), new google.maps.LatLng(19.31179136631358, 102.18040466308594), new google.maps.LatLng(19.288461343919654, 102.15980529785156), new google.maps.LatLng(19.267720754724763, 102.19207763671875), new google.maps.LatLng(19.276795085614115, 102.22297668457031), new google.maps.LatLng(19.2236382904346, 102.25662231445312), new google.maps.LatLng(19.14841150233036, 102.21611022949219), new google.maps.LatLng(19.123760777665353, 102.26280212402344), new google.maps.LatLng(19.13673530201033, 102.31292724609375), new google.maps.LatLng(19.073799352002716, 102.42691040039062), new google.maps.LatLng(18.877051904567654, 102.47428894042969), new google.maps.LatLng(18.847812211896056, 102.53196716308594), new google.maps.LatLng(18.780216551708268, 102.51205444335938), new google.maps.LatLng(18.768839613205476, 102.40751266479492), new google.maps.LatLng(18.643642706975996, 102.32734680175781), new google.maps.LatLng(18.5564380945554, 102.36854553222656), new google.maps.LatLng(18.496540451048787, 102.42347717285156), new google.maps.LatLng(18.009426943534493, 102.5460433959961), new google.maps.LatLng(17.96534368135669, 102.61161804199219), new google.maps.LatLng(17.87289642889745, 102.6559066772461), new google.maps.LatLng(17.884332446989124, 102.71255493164062), new google.maps.LatLng(17.811456088564483, 102.75821685791016), new google.maps.LatLng(17.655963416828648, 102.78894424438477), new google.maps.LatLng(17.57824842760931, 102.80353546142578), new google.maps.LatLng(17.434838101747946, 102.79151916503906), new google.maps.LatLng(17.404045811472205, 102.7939224243164), new google.maps.LatLng(17.387173366938256, 102.82516479492188), new google.maps.LatLng(17.37701638790626, 102.82516479492188), new google.maps.LatLng(17.365548153696455, 102.81572341918945), new google.maps.LatLng(17.166214351761184, 102.95185089111328), new google.maps.LatLng(17.099612604916793, 102.94086456298828), new google.maps.LatLng(17.000814460568563, 102.89382934570312), new google.maps.LatLng(16.95977000042423, 102.89297103881836), new google.maps.LatLng(16.90327816618714, 102.87065505981445), new google.maps.LatLng(16.885374602569833, 102.88095474243164), new google.maps.LatLng(16.884881819916252, 102.8811264038086), new google.maps.LatLng(16.828367552689595, 102.84215927124023), new google.maps.LatLng(16.748824747170737, 102.80593872070312), new google.maps.LatLng(16.716274918226063, 102.80525207519531), new google.maps.LatLng(16.62763893767021, 102.80010223388672), new google.maps.LatLng(16.597865152352668, 102.81932830810547), new google.maps.LatLng(16.532873205577378, 102.83082962036133), new google.maps.LatLng(16.44069522522067, 102.82722473144531), new google.maps.LatLng(16.482180747359003, 102.56355285644531), new google.maps.LatLng(16.524315671474778, 102.24014282226562), new google.maps.LatLng(16.621059493017892, 101.8597412109375), new google.maps.LatLng(16.73419445128329, 101.55830383300781), new google.maps.LatLng(16.747345330125356, 101.20468139648438), new google.maps.LatLng(16.882089360580345, 100.80574035644531), new google.maps.LatLng(16.845947927771796, 100.35255432128906), new google.maps.LatLng(17.317209855410525, 100.23239135742188), new google.maps.LatLng(17.5065574175233, 100.23170471191406), new google.maps.LatLng(17.60541157539077, 100.12664794921875), new google.maps.LatLng(17.665614097606255, 100.14999389648438), new google.maps.LatLng(17.813417277943152, 100.10948181152344), new google.maps.LatLng(17.8617864493131, 100.03944396972656), new google.maps.LatLng(17.964363928277226, 100.06278991699219), new google.maps.LatLng(17.957178906396358, 99.94331359863281), new google.maps.LatLng(18.015956860192986, 99.72084045410156), new google.maps.LatLng(18.147156759688098, 99.59999084472656), new google.maps.LatLng(18.22674258246203, 99.59243774414062), new google.maps.LatLng(18.26847798017957, 99.46678161621094), new google.maps.LatLng(18.33203995826825, 99.25495147705078), new google.maps.LatLng(18.450626441965543, 99.20001983642578), new google.maps.LatLng(18.464955537078257, 99.13066864013672), new google.maps.LatLng(18.509237899230747, 99.12654876708984), new google.maps.LatLng(18.553834285704962, 99.04930114746094), new google.maps.LatLng(18.64169085403262, 99.05548095703125), new google.maps.LatLng(18.787042346135195, 98.98784637451172), new google.maps.LatLng(18.64169085403262, 99.05616760253906), new google.maps.LatLng(18.554810718678468, 99.04998779296875), new google.maps.LatLng(18.508261205882672, 99.12517547607422), new google.maps.LatLng(18.466258122769585, 99.13238525390625), new google.maps.LatLng(18.449323737651916, 99.19830322265625), new google.maps.LatLng(18.33269175511216, 99.2559814453125), new google.maps.LatLng(18.266847879383697, 99.46334838867188), new google.maps.LatLng(18.200326726582748, 99.40498352050781), new google.maps.LatLng(18.14487302430647, 99.40120697021484), new google.maps.LatLng(18.010079946089405, 99.35897827148438), new google.maps.LatLng(17.870282378534455, 99.33494567871094), new google.maps.LatLng(17.73691492904225, 99.22954559326172), new google.maps.LatLng(17.65481838646313, 99.24774169921875), new google.maps.LatLng(17.47708714635338, 99.16156768798828), new google.maps.LatLng(17.332941682216006, 99.15264129638672), new google.maps.LatLng(17.175890943176615, 99.13616180419922), new google.maps.LatLng(17.067615606552863, 99.063720703125), new google.maps.LatLng(16.97372612411696, 99.12792205810547), new google.maps.LatLng(16.883403464236842, 99.1244888305664), new google.maps.LatLng(16.686186046021252, 99.2776107788086), new google.maps.LatLng(16.584868517922743, 99.43897247314453), new google.maps.LatLng(16.421595734012676, 99.5199966430664), new google.maps.LatLng(16.385696786775647, 99.52239990234375), new google.maps.LatLng(16.316185543909832, 99.65835571289062), new google.maps.LatLng(16.154006693205467, 99.71946716308594), new google.maps.LatLng(16.06593921825516, 99.73663330078125), new google.maps.LatLng(15.715925140850693, 100.06038665771484), new google.maps.LatLng(15.703366204084825, 100.1180648803711), new google.maps.LatLng(15.61873848624973, 100.12184143066406), new google.maps.LatLng(15.397748842411964, 100.14484405517578), new google.maps.LatLng(14.878432678599392, 100.43220520019531), new google.maps.LatLng(14.17652322096214, 100.61004638671875), new google.maps.LatLng(13.95405951413341, 100.62103271484375), new google.maps.LatLng(13.775400202363377, 100.54412841796875)]),
        
        path_asia2: new google.maps.Polyline(polyGroundOptions).setPath([new google.maps.LatLng(12.254127737657381, 109.19036865234375), new google.maps.LatLng(12.264863532756566, 108.84429931640625), new google.maps.LatLng(12.05812308986742, 108.49960327148438), new google.maps.LatLng(11.899603531895703, 108.45840454101562), new google.maps.LatLng(11.636096060619982, 108.31558227539062), new google.maps.LatLng(11.543270952039412, 107.8253173828125), new google.maps.LatLng(11.379070355019484, 107.51907348632812), new google.maps.LatLng(11.101599196968122, 107.22244262695312), new google.maps.LatLng(10.929056592808818, 107.17575073242188), new google.maps.LatLng(10.752366085618164, 106.95877075195312), new google.maps.LatLng(10.763159330300518, 106.67037963867188), new google.maps.LatLng(10.543171203799218, 106.38336181640625), new google.maps.LatLng(10.907481677623203, 105.6005859375), new google.maps.LatLng(11.28750749985119, 105.27923583984375), new google.maps.LatLng(11.548652958952548, 104.91119384765625), new google.maps.LatLng(11.7746034076277, 105.00045776367188), new google.maps.LatLng(11.895572163340905, 104.93316650390625), new google.maps.LatLng(12.03529127218156, 104.97024536132812), new google.maps.LatLng(12.062152032528752, 105.0677490234375), new google.maps.LatLng(12.504961924014806, 105.11444091796875), new google.maps.LatLng(12.722065599409607, 104.89471435546875), new google.maps.LatLng(13.15303879532538, 104.29733276367188), new google.maps.LatLng(13.365571074958257, 103.86749267578125), new google.maps.LatLng(13.592599757147152, 103.42254638671875), new google.maps.LatLng(13.593934580393714, 102.96661376953125), new google.maps.LatLng(13.635310367863765, 102.568359375), new google.maps.LatLng(13.711369501377277, 102.47085571289062), new google.maps.LatLng(13.772732606134637, 102.22091674804688), new google.maps.LatLng(13.767397322351057, 101.93389892578125), new google.maps.LatLng(13.775400202363377, 101.53701782226562), new google.maps.LatLng(13.742053062720396, 101.49856567382812), new google.maps.LatLng(13.767397322351057, 101.3818359375), new google.maps.LatLng(13.675344552820276, 101.25137329101562), new google.maps.LatLng(13.664669434801446, 101.05499267578125), new google.maps.LatLng(13.560561745081422, 101.0028076171875), new google.maps.LatLng(13.493802017602013, 101.05087280273438), new google.maps.LatLng(13.400307050494561, 101.05361938476562), new google.maps.LatLng(13.292074651728969, 100.997314453125), new google.maps.LatLng(13.19850154230159, 101.00967407226562), new google.maps.LatLng(13.114255082724767, 100.9808349609375), new google.maps.LatLng(13.015262066957186, 100.99044799804688), new google.maps.LatLng(12.964412428478383, 100.9698486328125), new google.maps.LatLng(12.94969085521958, 100.90805053710938), new google.maps.LatLng(12.889457189524828, 100.94100952148438), new google.maps.LatLng(12.953705916047216, 100.91217041015625), new google.maps.LatLng(12.965750710156396, 100.96572875976562), new google.maps.LatLng(13.015262066957186, 100.986328125), new google.maps.LatLng(13.111580118251661, 100.97671508789062), new google.maps.LatLng(13.198167288232638, 101.00898742675781), new google.maps.LatLng(13.292241714357639, 100.99800109863281), new google.maps.LatLng(13.399973074595636, 101.05293273925781), new google.maps.LatLng(13.493468171981762, 101.05052947998047), new google.maps.LatLng(13.557724837700297, 100.99542617797852), new google.maps.LatLng(13.729379904395925, 100.80230712890625), new google.maps.LatLng(13.755225750686318, 100.53279876708984), new google.maps.LatLng(13.501814172428654, 100.13351440429688), new google.maps.LatLng(13.345528811936576, 99.83139038085938), new google.maps.LatLng(13.135653750651828, 99.86846923828125), new google.maps.LatLng(13.071452163589456, 99.95223999023438), new google.maps.LatLng(12.977794921312826, 99.90280151367188), new google.maps.LatLng(12.80510572187219, 99.95086669921875), new google.maps.LatLng(12.629618030174832, 99.86160278320312), new google.maps.LatLng(12.415789172844935, 99.92134094238281), new google.maps.LatLng(12.379574959266373, 99.88494873046875), new google.maps.LatLng(12.238694266804586, 99.87327575683594), new google.maps.LatLng(12.169568111199663, 99.84649658203125), new google.maps.LatLng(12.054765591417947, 99.86228942871094), new google.maps.LatLng(11.961410353617094, 99.82864379882812), new google.maps.LatLng(11.878102209376577, 99.78401184082031), new google.maps.LatLng(11.759142440407803, 99.76341247558594), new google.maps.LatLng(11.484734969302385, 99.59724426269531), new google.maps.LatLng(11.268652689854141, 99.43313598632812), new google.maps.LatLng(10.994445958261467, 99.35897827148438), new google.maps.LatLng(10.785419176443007, 99.19212341308594), new google.maps.LatLng(10.666681040405235, 99.19692993164062), new google.maps.LatLng(10.591096236747257, 99.15435791015625), new google.maps.LatLng(10.586371565992343, 99.11727905273438), new google.maps.LatLng(10.389220802777864, 99.12826538085938), new google.maps.LatLng(10.336536087082987, 99.09461975097656), new google.maps.LatLng(10.152746165571939, 99.09942626953125), new google.maps.LatLng(9.965469198296121, 99.06440734863281), new google.maps.LatLng(9.841685549450688, 99.0582275390625), new google.maps.LatLng(9.739512157548708, 99.09942626953125), new google.maps.LatLng(9.504598321425833, 99.13307189941406), new google.maps.LatLng(9.362352822055605, 99.17083740234375), new google.maps.LatLng(9.178702428668705, 99.13856506347656), new google.maps.LatLng(9.153620965088649, 99.151611328125), new google.maps.LatLng(9.135317158547469, 99.31846618652344), new google.maps.LatLng(9.161077801448242, 99.51553344726562), new google.maps.LatLng(9.141079569519036, 99.6738052368164), new google.maps.LatLng(9.31323068745844, 99.70848083496094), new google.maps.LatLng(9.324410816144885, 99.74040985107422), new google.maps.LatLng(9.534056099593803, 99.93232727050781), new google.maps.LatLng(9.571636467641277, 99.92477416992188), new google.maps.LatLng(9.543197651868574, 100.05867004394531), new google.maps.LatLng(9.483265243391303, 100.06622314453125), new google.maps.LatLng(9.440256436475412, 100.01609802246094), new google.maps.LatLng(9.481910717417634, 99.92752075195312), new google.maps.LatLng(9.532363192652975, 99.93267059326172), new google.maps.LatLng(9.571975010649528, 99.9261474609375), new google.maps.LatLng(9.584162334197632, 99.9814224243164), new google.maps.LatLng(9.708718663166007, 99.98348236083984), new google.maps.LatLng(9.735451639367984, 100.0033950805664), new google.maps.LatLng(9.7814679496053, 100.00545501708984), new google.maps.LatLng(9.791617749668413, 99.99103546142578), new google.maps.LatLng(9.763197528547247, 99.97215270996094), new google.maps.LatLng(9.712779506019892, 99.98279571533203), new google.maps.LatLng(10.066600419032278, 99.8258113861084), new google.maps.LatLng(10.118273739838058, 99.8137092590332), new google.maps.LatLng(10.102683889977117, 99.82885837554932), new google.maps.LatLng(10.088318589571431, 99.85233306884766), new google.maps.LatLng(10.10234589027717, 99.82864379882812), new google.maps.LatLng(10.068586382543318, 99.81216430664062), new google.maps.LatLng(9.711764299923976, 99.98296737670898), new google.maps.LatLng(9.585854983417578, 99.97901916503906), new google.maps.LatLng(9.568251019008402, 99.92340087890625), new google.maps.LatLng(9.52694583400436, 99.93095397949219), new google.maps.LatLng(9.320345356226076, 99.74143981933594), new google.maps.LatLng(9.308148692484815, 99.71054077148438), new google.maps.LatLng(9.145486056167277, 99.67071533203125), new google.maps.LatLng(9.151587255299491, 99.51896667480469), new google.maps.LatLng(8.848435918660897, 99.17839050292969), new google.maps.LatLng(8.725611813577608, 99.1571044921875), new google.maps.LatLng(8.636012911829676, 99.09393310546875), new google.maps.LatLng(8.636691771674641, 99.03076171875), new google.maps.LatLng(8.532133019262726, 98.85360717773438), new google.maps.LatLng(8.57015771468257, 98.74443054199219), new google.maps.LatLng(8.477805461808199, 98.67576599121094), new google.maps.LatLng(8.259059870475873, 98.30841064453125), new google.maps.LatLng(7.957237233971148, 98.37982177734375), new google.maps.LatLng(7.851138221821149, 98.38119506835938), new google.maps.LatLng(7.785833030024764, 98.31527709960938), new google.maps.LatLng(7.972197714386878, 98.27957153320312), new google.maps.LatLng(8.139445597431012, 98.32901000976562), new google.maps.LatLng(8.269932106127927, 98.30841064453125), new google.maps.LatLng(8.70457157101656, 98.24798583984375), new google.maps.LatLng(8.82536709622796, 98.27682495117188), new google.maps.LatLng(8.879644376420847, 98.3660888671875), new google.maps.LatLng(9.121080214365112, 98.45123291015625), new google.maps.LatLng(9.220049074286386, 98.39492797851562), new google.maps.LatLng(9.416548498325543, 98.45672607421875), new google.maps.LatLng(9.572313553320425, 98.60504150390625), new google.maps.LatLng(9.604812077390028, 98.54736328125), new google.maps.LatLng(9.729360769529295, 98.60366821289062), new google.maps.LatLng(10.42974146656542, 98.79592895507812), new google.maps.LatLng(9.603458034423026, 98.55560302734375), new google.maps.LatLng(9.568251019008402, 98.60366821289062), new google.maps.LatLng(9.41519370982188, 98.4649658203125), new google.maps.LatLng(9.220049074286386, 98.3990478515625), new google.maps.LatLng(9.123792057073997, 98.44436645507812), new google.maps.LatLng(8.879644376420847, 98.36746215820312), new google.maps.LatLng(8.821295977752117, 98.27133178710938), new google.maps.LatLng(8.269932106127927, 98.31527709960938), new google.maps.LatLng(8.465580701366896, 98.67507934570312), new google.maps.LatLng(8.095940613664254, 98.90167236328125), new google.maps.LatLng(8.008916572242077, 99.12689208984375), new google.maps.LatLng(7.800799705220028, 99.19692993164062), new google.maps.LatLng(7.728682634346754, 99.31228637695312), new google.maps.LatLng(7.550378378185999, 99.37820434570312), new google.maps.LatLng(7.550378378185999, 99.75448608398438), new google.maps.LatLng(7.612997502224103, 100.0579833984375), new google.maps.LatLng(6.985043739395533, 100.4425048828125), new google.maps.LatLng(7.182650846809319, 100.61279296875), new google.maps.LatLng(6.98776992815563, 100.4534912109375), new google.maps.LatLng(6.974138825489062, 100.48507690429688), new google.maps.LatLng(6.78735309646279, 100.46173095703125), new google.maps.LatLng(6.570481809751594, 100.41778564453125), new google.maps.LatLng(6.517272401536648, 100.426025390625), new google.maps.LatLng(6.252506704546019, 100.42877197265625), new google.maps.LatLng(6.080473288490129, 100.3765869140625), new google.maps.LatLng(5.704814473185652, 100.51666259765625), new google.maps.LatLng(5.574983397934481, 100.44113159179688), new google.maps.LatLng(5.350786747842488, 100.40267944335938), new google.maps.LatLng(5.352154053118371, 100.3106689453125), new google.maps.LatLng(5.419148251825298, 100.3106689453125)]),
        
        path_usa_east: new google.maps.Polyline(polyGroundOptions).setPath([new google.maps.LatLng(49.568144853940545, 34.1015625), new google.maps.LatLng(49.44714672102774, 33.96903991699219), new google.maps.LatLng(49.1619507385324, 34.16748046875), new google.maps.LatLng(48.943249256234296, 34.47784423828125), new google.maps.LatLng(48.48748647988415, 35.02166748046875), new google.maps.LatLng(48.32795219334316, 35.02166748046875), new google.maps.LatLng(48.24388198818308, 34.9530029296875), new google.maps.LatLng(48.056053763981225, 34.935150146484375), new google.maps.LatLng(47.89332691887659, 34.984588623046875), new google.maps.LatLng(47.84173590980837, 35.108184814453125), new google.maps.LatLng(47.64596177800046, 35.349884033203125), new google.maps.LatLng(47.44480754169439, 35.299072265625), new google.maps.LatLng(47.22236621783472, 35.393829345703125), new google.maps.LatLng(46.853617401905105, 35.380096435546875), new google.maps.LatLng(46.155102414967125, 34.5849609375), new google.maps.LatLng(45.034714778688624, 33.9862060546875), new google.maps.LatLng(44.94924926661153, 34.12353515625), new google.maps.LatLng(46.0998999106273, 33.6676025390625), new google.maps.LatLng(46.68336307047754, 32.6568603515625), new google.maps.LatLng(47.002733906678806, 32.047119140625), new google.maps.LatLng(47.77994347064129, 31.1846923828125), new google.maps.LatLng(47.96050238891509, 31.13525390625), new google.maps.LatLng(48.03034580796616, 30.8880615234375), new google.maps.LatLng(48.37449671682332, 30.5035400390625), new google.maps.LatLng(48.37084770238363, 30.223388671875), new google.maps.LatLng(48.785151998043155, 30.201416015625), new google.maps.LatLng(49.38594874941847, 30.1409912109375), new google.maps.LatLng(50.23666548810372, 28.7017822265625), new google.maps.LatLng(50.60067298872854, 27.6251220703125), new google.maps.LatLng(50.60067298872854, 26.2408447265625), new google.maps.LatLng(50.40851753069729, 25.7574462890625), new google.maps.LatLng(50.729501501474324, 25.3289794921875), new google.maps.LatLng(50.48197825997291, 24.774169921875), new google.maps.LatLng(49.84152514611125, 24.06005859375), new google.maps.LatLng(50.86491125522503, 23.1976318359375), new google.maps.LatLng(51.248163159055906, 22.60986328125), new google.maps.LatLng(52.05586831074774, 21.51123046875), new google.maps.LatLng(53.29477244628862, 21.95068359375), new google.maps.LatLng(54.00776876193478, 21.763916015625), new google.maps.LatLng(54.229918830835224, 22.03857421875), new google.maps.LatLng(54.004540438503646, 21.7694091796875), new google.maps.LatLng(53.28492154619621, 21.9561767578125), new google.maps.LatLng(52.05924589011585, 21.522216796875), new google.maps.LatLng(51.261914853084534, 22.6043701171875), new google.maps.LatLng(50.87184477102432, 23.214111328125), new google.maps.LatLng(49.85215166776998, 23.983154296875), new google.maps.LatLng(49.396675075193976, 24.5819091796875), new google.maps.LatLng(48.98742700601184, 24.7247314453125), new google.maps.LatLng(48.64742780553354, 25.762939453125), new google.maps.LatLng(48.272225451004324, 25.9716796875), new google.maps.LatLng(47.77625204393236, 26.0870361328125), new google.maps.LatLng(47.62097541515849, 26.268310546875), new google.maps.LatLng(47.41322033016902, 26.3397216796875), new google.maps.LatLng(46.98774725646568, 26.8780517578125), new google.maps.LatLng(46.42271253466719, 26.949462890625), new google.maps.LatLng(45.77327047688937, 27.22137451171875), new google.maps.LatLng(45.39266395850033, 27.05657958984375), new google.maps.LatLng(44.99588261816546, 27.696533203125), new google.maps.LatLng(44.80327564555043, 27.5372314453125), new google.maps.LatLng(44.384728665110295, 27.8338623046875), new google.maps.LatLng(44.17038488259618, 28.30902099609375), new google.maps.LatLng(44.008620115415354, 28.42437744140625), new google.maps.LatLng(43.56646172588961, 27.8228759765625), new google.maps.LatLng(43.37710501700073, 27.8338623046875), new google.maps.LatLng(43.303195047973034, 27.7679443359375), new google.maps.LatLng(43.17313537107136, 27.91351318359375), new google.maps.LatLng(43.135065496929194, 27.828369140625), new google.maps.LatLng(43.038783344984836, 27.86407470703125), new google.maps.LatLng(42.95039177450287, 27.762451171875), new google.maps.LatLng(42.921234883592945, 27.787857055664062), new google.maps.LatLng(42.89960965682987, 27.721939086914062), new google.maps.LatLng(42.86640268851462, 27.728805541992188), new google.maps.LatLng(42.816055045344385, 27.61688232421875), new google.maps.LatLng(42.72229931484221, 27.61962890625), new google.maps.LatLng(42.64153569439977, 27.554397583007812), new google.maps.LatLng(42.56370156708076, 27.62786865234375), new google.maps.LatLng(42.52373593864307, 27.454833984375)])
      }

      if (userMap) {
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
      }

    }
  }

  render() {
    return (
      <div className="map" ref='map'>
        <Spinner />
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