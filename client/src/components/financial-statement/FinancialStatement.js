import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentFinancialStatement } from '../../actions/financialStatementActions';
import Spinner from '../common/Spinner';

class FinancialStatement extends Component {
  componentDidMount() {
    this.props.getCurrentFinancialStatement();
  }

  render() {
    const { user } = this.props.auth;
    console.log('user: ', user);
    const { statement, loading } = this.props.financialStatement;

    let content;

    if (statement === null || loading) {
      content = <Spinner />;
    } else {
      // Check if logged in user has financial statement data
      if (Object.keys(statement).length > 0) {
        content = (
          <div>
            <p className="lead text-muted">
            ssssssssss
              {/* Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> */}
            </p>
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Financial Statement</h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FinancialStatement.propTypes = {
  getCurrentFinancialStatement: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  financialStatement: state.financialStatement,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentFinancialStatement })(
  FinancialStatement
);
