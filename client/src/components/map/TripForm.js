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
import { addTrip } from '../../actions/mapActions';

class TripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    alert(JSON.stringify(this.state));
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newTrip = {
      ...this.state
    };

    this.props.addTrip(newTrip);
    this.setState({ name: '', desc: '' });
  }

  componentDidMount() {
    //this.props.getUserMap(this.props.auth.user.id);
  }

  render() {
    //const { userMap, loading } = this.props.map;
    // let flightCards;

    // if (userMap === null || loading) {
    //   flightCards = <Spinner />;
    // } else {
    //   flightCards = userMap.flights.map(flight => 
    //     <FlightCard key={flight[0]._id} flight={flight} />
    //   );
    // }

    return (    
      <div>  
        <div className="new-trip-form">
          <div className="card card-info">
            <div className="card-header bg-info text-white">Add new trip</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <InputGroup
                    placeholder="Trip name"
                    name="name"
                    icon="fas fa-map"
                    value={this.state.name}
                    onChange={this.onChange}
                    //error={errors.name}
                  />

                  <TextAreaFieldGroup
                    placeholder="Trip description"
                    name="desc"
                    value={this.state.desc}
                    onChange={this.onChange}
                    //error={errors.text}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="btn-group btn-group flight-menu-controls" role="group">
          <button type="button" className="btn btn-dark">
            Add new trip
          </button>
        </div>
        </div>
    );
  }
}

TripForm.propTypes = {
  addTrip: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
  //onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  //map: state.map,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addTrip })(TripForm);
