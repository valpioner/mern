import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlightCard from './FlightCard';

class TripCard extends Component {
  constructor(props) {
    super(props);

    // this.switchMode = this.switchMode.bind(this);
    // this.addFlightPoint = this.addFlightPoint.bind(this);
    // this.cancelEdit = this.cancelEdit.bind(this);
    // this.saveFlight = this.saveFlight.bind(this);
    // this.onSelect = this.onSelect.bind(this);

    this.state = {
      trip: props.trip,
      showEmptyFlight: false
    }
  }

  addNewFlight = () => {
    this.setState({ showEmptyFlight: true });
  }

  render() {
    const { trip } = this.props;

    return (
      <div className="card bg-light mb-3 trip-card">
        <div className="card-header bg-info text-white">{trip.name}</div>
        <div className="card-body">
          <h5 className="card-title">{trip.desc}</h5>
          <p className="card-text">{trip.desc}</p>

          { 
            this.state.showEmptyFlight 
              ? <FlightCard flight={[]} />
              : null 
          }

          { 
            !this.state.showEmptyFlight
              ?
              <button className="btn btn-sm btn-outline-secondary add-flight-point" type="button"
                onClick={this.addNewFlight.bind(this)}>
                Add <i className="fas fa-plane ml-2"></i>
              </button>
              : null 
          }

        </div>
      </div>
    )
  }
}

TripCard.propTypes = {
  trip: PropTypes.object.isRequired //Lviv-Kyiv-Odessa
};

const mapStateToProps = state => ({
  //auth: state.auth
});

export default connect(mapStateToProps, { /*deleteFlight, addLike, removeLike*/ })(
  TripCard
);
