import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import './sidebar.scss';

class Sidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const logo = (
      <a className="sidebar-brand" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box align-middle"><path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"></path><polyline points="2.32 6.16 12 11 21.68 6.16"></polyline><line x1="12" y1="22.76" x2="12" y2="11"></line></svg>
        <span className="align-middle">F u t u r e</span>
      </a>
    );

    const dashboardIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders align-middle"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
    );

    const links = (
      <ul className="sidebar-nav">
        <li className="sidebar-header">
          Main
        </li>

        <li className="sidebar-item">
          <Link className="sidebar-link" to="/dashboard">
            {dashboardIcon}
            <span className="align-middle">Dashboard</span>
            <span className="sidebar-badge badge badge-primary">6</span>
          </Link>
        </li>

        <li className="sidebar-item">
          <Link className="sidebar-link collapsed" to="/travel" data-toogle="#travelSubMenu" data-toggle="collapse" data-target="#travelSubMenu">
            <i className="fas fa-globe-americas"></i>
            Travel
          </Link>
          <ul id="travelSubMenu" className="sidebar-dropdown list-unstyled collapse">
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/map">Map
                <span className="sidebar-badge badge badge-secondary">New</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/map">Menu 2</Link>
            </li>
          </ul>
        </li>

      </ul>
    );

    return (
      !isAuthenticated ? '' : 
      <nav className="sidebar sidebar-sticky">
        <div className="sidebar-content">
          {logo}
          {links}
        </div>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Sidebar
);
