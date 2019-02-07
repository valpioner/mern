import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import './auth.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login container h-100">
        <div className="row h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              <div className="text-center mt-4">
                <h1 className="h2">Sign in</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center mb-4">
                      {/* <img src="img/avatar.jpg" alt="Chris Wood" className="img-fluid rounded-circle" width="132" height="132" /> */}
                      <i className="fas fa-fingerprint user-pic"></i>
                    </div>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email} />
                      <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password} />
                      <div className="mb-2">
                        <div className="custom-control custom-checkbox align-items-center">
                          <input type="checkbox" className="custom-control-input" value="remember-me" name="remember-me" checked="" />
                          <label className="custom-control-label text-small">Remember me next time</label>
                        </div>
                      </div>
                      <input type="submit" className="btn btn-primary btn-block mt-3 mb-3" value="Log in" />
                    </form>
                    <div className="text-center">
                      <small><Link to="/forgot-password">Forgot password?</Link></small><br />
                      <small><Link to="/register">Register</Link></small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
