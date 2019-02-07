import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import './navbar.scss';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">Post Feed</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/map">Map</Link>
        </li>

        <li className="nav-item">
          <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)} >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '40px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      !isAuthenticated ? '' :
      <nav className="navbar navbar-expand navbar-light bg-white">
        <a className="sidebar-toggler d-flex mr-2">
          <i className="hamburger align-self-center"></i>
        </a>

        <div className="navbar-collapse collapse">
          <ul className="navbar-nav ml-auto">
          
            <li className="nav-item dropdown">
              <a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-toggle="dropdown" aria-expanded="false">
                <div className="position-relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle align-middle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <span className="indicator">4</span>
                </div>
              </a>

              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="messagesDropdown">
                <div className="dropdown-menu-header">
                  <div className="position-relative">4 New Messages</div>
                </div>

                <div className="list-group">
                  <a href="#" className="list-group-item">
                    <div className="row no-gutters align-items-center">
                      <div className="col-2">
                        <img className="avatar img-fluid rounded-circle"
                          src={user.avatar} alt={user.name}
                          title="You must have a Gravatar connected to your email to display an image" />
                      </div>
                      <div className="col-10 pl-2">
                        <div>Ashley Briggs</div>
                        <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                        <div className="text-muted small mt-1">15m ago</div>
                      </div>
                    </div>
                  </a>

                  <a href="#" className="list-group-item">
                    <div className="row no-gutters align-items-center">
                      <div className="col-2">
                        <img className="avatar img-fluid rounded-circle mr-1"
                          src={user.avatar} alt={user.name}
                          title="You must have a Gravatar connected to your email to display an image" />
                      </div>
                      <div className="col-10 pl-2">
                        <div className="text-dark">Carl Jenkins</div>
                        <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                        <div className="text-muted small mt-1">2h ago</div>
                      </div>
                    </div>
                  </a>

                  <a href="#" className="list-group-item">
                    <div className="row no-gutters align-items-center">
                      <div className="col-2">
                        <img className="avatar img-fluid rounded-circle mr-1"
                          src={user.avatar} alt={user.name}
                          title="You must have a Gravatar connected to your email to display an image" />
                      </div>
                      <div className="col-10 pl-2">
                        <div className="text-dark">Stacie Hall</div>
                        <div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                        <div className="text-muted small mt-1">4h ago</div>
                      </div>
                    </div>
                  </a>

                  <a href="#" className="list-group-item">
                    <div className="row no-gutters align-items-center">
                      <div className="col-2">
                        <img className="avatar img-fluid rounded-circle mr-1"
                          src={user.avatar} alt={user.name}
                          title="You must have a Gravatar connected to your email to display an image" />
                      </div>
                      <div className="col-10 pl-2">
                        <div className="text-dark">Bertha Martin</div>
                        <div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
                        <div className="text-muted small mt-1">5h ago</div>
                      </div>
                    </div>
                  </a>

                </div>
                
                <div className="dropdown-menu-footer">
                  <a href="#" className="text-muted">Show all messages</a>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" data-toggle="dropdown" aria-expanded="false">
                <span className="d-inline-block d-md-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings align-middle"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </span>
                <span className="d-none d-sm-inline-block">
                  <img
                    className="avatar img-fluid rounded-circle mr-1"
                    src={user.avatar}
                    alt={user.name}
                    title="You must have a Gravatar connected to your email to display an image"
                  />
                  <span className="text-dark mr-1 ml-1">{user.name}</span>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">


                <Link className="dropdown-item" to="/profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user align-middle mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile
                </Link>
                {/* <a className="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart align-middle mr-1"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> Analytics</a> */}
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">Settings &amp; Privacy</Link>
                <Link className="dropdown-item" to="#">Help</Link>
                <Link className="dropdown-item" to="#" onClick={this.onLogoutClick.bind(this)}>Sign out</Link>
              </div>
            </li>

          </ul>
        </div>





        {/* <div className="container">
          <Link className="navbar-brand" to="/">
            MyMaps 0.1
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div> */}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
