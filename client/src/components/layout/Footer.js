import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    const hideFooter = this.props.location.pathname === '/login' || this.props.location.pathname === '/register'
    return (
      hideFooter ? '' :
        <footer className="">
          <div className="container">
            <div className="footer-menu pb-5 pt-5">Menu</div>
            <div className="footer-copyright pb-3">
              <span className="legal mr-5">
                &copy; {new Date().getFullYear()} Terms
              </span>
              <span className="social">
                vk, f, t, i
              </span>
            </div>
          </div>
        </footer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  withRouter(Footer)
);

