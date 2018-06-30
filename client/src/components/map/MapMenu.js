import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { getUserMap } from '../../actions/mapActions';
import Spinner from '../common/Spinner';
import FlightCard from './FlightCard';

class MapMenu extends Component {
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
    const { userMap, loading } = this.props.map;
    let flightCards;

    if (userMap === null || loading) {
      flightCards = <Spinner />;
    } else {
      flightCards = userMap.flights.map(flight => 
        <FlightCard key={flight[0]._id} flight={flight} />
      );
    }

    return (
      <div className="map-menu card card-body">
        {flightCards}
        <div className="btn-group btn-group flight-menu-controls" role="group">
          <button type="button" className="btn btn-dark" onClick={this.handleClick}>
            Add flight
          </button>
          <button type="button" className="btn btn-dark">
            Add road
          </button>
        </div>
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
