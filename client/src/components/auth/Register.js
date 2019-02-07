import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import './auth.scss';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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

  componentWillReceiveProps(newxtProps) {
    if (newxtProps.errors) {
      this.setState({ errors: newxtProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register container h-100">
        <div className="row h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              <div className="text-center mt-4">
                <h1 className="h2">Sign up</h1>
                <p className="lead">Create your account</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center mb-4">
                      {/* <img src="img/avatar.jpg" alt="Chris Wood" className="img-fluid rounded-circle" width="132" height="132" /> */}
                      <i className="fas fa-user-plus user-pic"></i>
                    </div>
                    <form onSubmit={this.onSubmit} noValidate>
                      <TextFieldGroup
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name} />
                      <TextFieldGroup
                        placeholder="Email Address"
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
                      <TextFieldGroup
                        placeholder="Confirm Password"
                        name="password2"
                        type="password"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2} />
                      <input type="submit" className="btn btn-primary btn-block mt-4 mb-3" value="Register" />
                    </form>
                    <div className="text-center">
                      <small><Link to="/login">Already have an account? Login</Link></small>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
