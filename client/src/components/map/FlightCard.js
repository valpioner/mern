import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FlightCard extends Component {
  constructor () {
    super();
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      isEditMode: false
    }
  }

  switchMode = () => {
    this.setState((prevState) => {
      return {isEditMode: !prevState.isEditMode};
    });
  }

  render() {
    const { flight } = this.props;
    const { isEditMode } = this.state;
    let currentMode;

    if (isEditMode) {
      currentMode = (
        <div>hello!</div>
      );
    } else {
      currentMode = (
        <div className="flight-card" key={flight[0]._id}>
          <i className="fas fa-plane"></i>
          {
            flight.map(point => point.name).join(' - ')
          }
          <br/>
          <i className="fas fa-edit" onClick={this.switchMode}></i>
          <i className="fas fa-trash"></i>
        </div>
      );
    }

    return (
      <div>
        { currentMode }
      </div>
    )
  }
}

FlightCard.propTypes = {
  flight: PropTypes.array.isRequired //Lviv-Kyiv-Odessa
};

const mapStateToProps = state => ({
  //auth: state.auth
});

export default connect(mapStateToProps, { /*deleteFlight, addLike, removeLike*/ })(
  FlightCard
);
