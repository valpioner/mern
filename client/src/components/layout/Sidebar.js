import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Sidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const links = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/business">
            Business
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/selfDevelopment">
            Self Development
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/travel">
            Travel
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="sidebar">
        <a className="sidebar-logo" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box align-middle"><path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"></path><polyline points="2.32 6.16 12 11 21.68 6.16"></polyline><line x1="12" y1="22.76" x2="12" y2="11"></line></svg>
          <span class="align-middle">F u t u r e</span>
        </a>
        {links}
      </nav>

      // <nav className="navbar navbar-expand-sm color-wet-asphalt">
      //   <div className="container">
      //     <Link className="navbar-brand" to="/">
      //       MyMaps 0.1
      //     </Link>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#mobile-nav"
      //     >
      //       <span className="navbar-toggler-icon" />
      //     </button>

      //     <div className="collapse navbar-collapse" id="mobile-nav">
      //       <ul className="navbar-nav mr-auto">
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/profiles">
      //             {' '}
      //             Developers
      //           </Link>
      //         </li>
      //       </ul>
      //       {isAuthenticated ? authLinks : guestLinks}
      //     </div>
      //   </div>
      // </nav>
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
