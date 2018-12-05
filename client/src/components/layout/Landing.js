import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-header pt-5 pb-5">
          <div className="container">

          <Link to="/login" className="btn btn btn-light">
            Login
          </Link>
          <Link to="/register" className="btn btn btn-info mr-2">
            Sign Up
          </Link>
          <br/>
          <br/>
          <br/>
          Header
          
          </div>
        </div>

        <div className="landing-services pt-5 pb-5">
          <div className="container">Services</div>
        </div>

        <div className="landing-top-5 pt-5 pb-5">
          <div className="container">Top 5</div>
        </div>



        {/* <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);