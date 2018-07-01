import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocationSearchInput from '../common/LocationSearchInput';

class FlightCard extends Component {
  constructor (props) {
    super(props);

    this.switchMode = this.switchMode.bind(this);
    //this.onChange = this.onChange.bind(this);
    this.addFlightPoint = this.addFlightPoint.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveFlight = this.saveFlight.bind(this);

    this.state = {
      isEditMode: false,
      flight: props.flight // Array
    }
  }

  switchMode = () => {
    this.setState((prevState) => {
      return {isEditMode: !prevState.isEditMode};
    });
  }

  onChange(e, i) {
    //this.setState({ [e.target.name]: e.target.value });
  }

  addFlightPoint = () => {
    const lastFlightPoint = this.state.flight.slice(-1)[0];
    if (lastFlightPoint.lat === null || lastFlightPoint.long === null) return;

    this.setState((prevState, props) => {
      return {
        flight: prevState.flight.concat({
          name: '',
          lat: null,
          long: null
        })
      };
    });
  }

  saveFlight = () => {
    const lastFlightPoint = this.state.flight.slice(-1)[0];
    if (lastFlightPoint.lat === null || lastFlightPoint.long === null) {
      // TODO: show validation error
      return;
    }

    this.switchMode();
    // TODO: save flight to store
  }

  cancelEdit = () => {
    this.setState((prevState, props) => {
      return {
        isEditMode: !prevState.isEditMode,
        flight: props.flight
      };
    });
  }

  render() {
    const { isEditMode, flight } = this.state;
    let currentMode;

    if (isEditMode) {
      currentMode = (
        <div>
          <i className="fas fa-plane mb-2"></i>
          <form>
            <fieldset className="input-group-vertical">
              {
                flight.map((point) => 
                  // <div className="form-group">
                    <div className="input-group input-group-sm" key={point._id}>
                      {/* <input 
                        type="text" 
                        className="form-control" 
                        placeholder="To"
                        value={point.name}
                        onChange={this.onChange.bind(this)}
                        /> */}
                      <LocationSearchInput onSelect={
                        (selected) => console.log('selected: ', selected)
                      }/>

                      <div className="input-group-append lat-long pr-2 pl-2">
                        <small className="text-muted">
                          {point.lat}
                        </small>
                        <small className="text-muted">
                          {point.long}
                        </small>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">
                          <i className="fas fa-times" onClick={this.removeFlightPoint}></i>
                        </button>
                      </div>
                    </div>                  
                  // </div>
                )
              }
              <button className="btn btn-sm btn-outline-secondary add-flight-point" type="button" 
                  onClick={this.addFlightPoint}>
                <i className="fas fa-plus"></i>
              </button>
            </fieldset>
          </form>
          <div className="btn-group btn-group-sm flight-card-controls__edit-mode" role="group">
            <button type="button" className="btn btn-outline-secondary"  onClick={this.saveFlight}>
              <i className="fas fa-check"></i>
            </button>
            <button type="button" className="btn btn-outline-secondary"  onClick={this.cancelEdit}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      );
    } else {
      currentMode = (
        <div>
          <i className="fas fa-plane"></i>
          {
            flight.map(point => point.name).join(' - ')
          }
          <br/>
          <div className="btn-group btn-group-sm flight-card-controls__view-mode" role="group">
            <button type="button" className="btn btn-outline-secondary"  onClick={this.switchMode}>
            <i className="fas fa-edit"></i>
            </button>
            <button type="button" className="btn btn-outline-secondary"  onClick={this.removeFlight}>
            <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flight-card" key={flight[0]._id}>
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
