import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    const hideFooter = this.props.location.pathname === '/login' || this.props.location.pathname === '/register'
    return (
      hideFooter ? '' :
      <footer className="color--gray2 color--text-light p-3 text-center">
        Copyright &copy; {new Date().getFullYear()} | FUTURE
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

