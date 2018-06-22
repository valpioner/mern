import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { getUserMap } from '../../actions/mapActions';
import Spinner from '../common/Spinner';

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
        <div className="flight-card" key={flight[0]._id}>
          <i class="fas fa-plane"></i>
          {
            flight.map(point => point.name).join(' - ')
          }
        </div> 
      );
    }

    return (
      <div className="map-menu card card-body">
        {flightCards}
        <div className="row">
          <div className="">
            <a className="btn btn-info" onClick={this.handleClick}> Add Flight </a>
          </div>
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
