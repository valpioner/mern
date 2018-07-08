import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { getUserMap } from '../../actions/mapActions';
import Spinner from '../common/Spinner';
import FlightCard from './FlightCard';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import TripForm from './TripForm';
import TripCard from './TripCard';

class MapMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChange(e) {
    console.log('submitted');
    //this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getUserMap(this.props.auth.user.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.map.loading && !this.props.map.loading) {
      console.log(prevProps, this.props);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    alert(5);
  }

  render() {
    const { userMap, loading, trips } = this.props.map;
    let flightCards;
    let tripCards;

    if (userMap === null || loading || !trips) {
      flightCards = <Spinner />;
      tripCards = <Spinner />;
    } else {
      flightCards = userMap.flights.map(flight => 
        <FlightCard key={flight[0]._id} flight={flight} />
      );

      tripCards = trips.map(trip => 
        <TripCard key={trip._id} trip={trip} />
      );
    }

    return (
      <div className="map-menu color-wet-asphalt">
        <div class="user-photo">

        </div>
        {flightCards}
        {tripCards}
        <TripForm />
      </div>
    );
  }
}

MapMenu.propTypes = {
  getUserMap: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  map: state.map,
  auth: state.auth
});

export default connect(mapStateToProps, { getUserMap })(MapMenu);
