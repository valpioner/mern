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

        const actionIcons = (
          <div>
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 align-middle"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></a>
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
          </div>
        );

        const income = (
          <div>
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th style={{ width: 65 + '%' }}>Description</th>
                  <th style={{ width: 20 + '%' }}>Cash Flow</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Salary @ Euristiq</td>
                  <td>$3500</td>
                  <td className="table-action">{actionIcons}</td>
                </tr>
                <tr>
                  <td><b>Interest/Dividends:</b></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Real Estate/Business:</b></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>IT platform "Future"</td>
                  <td>$700</td>
                  <td className="table-action">{actionIcons}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

        const assets = (
          <div>
            <table className="table table-sm table-hover">
              <tbody>
                <tr>
                  <td><b>Savings:</b></td>
                  <td>$11500</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Real Estate/Business:</b></td>
                  <td><b>Down Payment:</b></td>
                  <td><b>Cost:</b></td>
                </tr>
                <tr>
                  <td>IT platform "Future"</td>
                  <td>$700</td>
                  <td>$18000</td>
                </tr>
                <tr>
                  <td><b>Stocks/Funds/CDs:</b></td>
                  <td><b># of Shares:</b></td>
                  <td><b>Cost/Share:</b></td>
                </tr>
                <tr>
                  <td><b>Precious Metals, Etc.:</b></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        );

        const liabilities = (
          <div>
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th style={{ width: 65 + '%' }}></th>
                  <th style={{ width: 20 + '%' }}></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Home Mortgage:</b></td>
                  <td>$20000</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>School Loans:</b></td>
                  <td>$0</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Car Loans:</b></td>
                  <td>$4000</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Credit Card Debit:</b></td>
                  <td>$2000</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Banl Loan:</b></td>
                  <td>$0</td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Real Estate/Business:</b></td>
                  <td><b>Mortgage/Liability:</b></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        );

        const expenses = (
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th style={{ width: 70 + '%' }}>Description</th>
                <th style={{ width: 15 + '%' }}>Amount</th>
                <th style={{ width: 15 + '%' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taxes:</td>
                <td>$300</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>Home Mortgage Payment:</td>
                <td>$200</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>School Load Payment</td>
                <td>$0</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>Car Load Payment</td>
                <td>$100</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>Credit Card Payment</td>
                <td>$0</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>Bank Loan Payment</td>
                <td>$200</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>Children Expenses</td>
                <td>$80</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
              <tr>
                <td>Other Expenses</td>
                <td>$750</td>
                <td className="table-action">{actionIcons}</td>
              </tr>
            </tbody>
          </table>
        );

        content = (
          // <div>
          //   <p className="lead text-muted">Welcome {user.name}</p>
          //   <p>You have not yet setup a profile, please add some info</p>
          //   <Link to="/create-profile" className="btn btn btn-info">
          //     Create Profile
          //   </Link>
          // </div>

          <div className="financial-statement-conteiner">
            <div className="financial-statement">
              <div className="statement-section flex-column d-flex">

                <div className="statement-section">
                  <div className="section-header d-flex">
                    <div className="section-header__number">1</div>
                    <div className="section-header__text">Income</div>
                  </div>
                  <div className="section-content">{income}</div>
                </div>

                <div className="statement-section">
                  <div className="section-header d-flex">
                    <div className="section-header__number">2</div>
                    <div className="section-header__text">Expences</div>
                  </div>
                  <div className="section-content">{expenses}</div>
                </div>

              </div>
              <div className="statement-section statement-summary">
                <div className="summary-content flex-column">
                  <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Salary" />
                    <div className="input-group-append">
                      <div className="input-group-text">+</div>
                    </div>
                  </div>

                  <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Passive income" />
                    <div className="input-group-append">
                      <div className="input-group-text">=</div>
                    </div>
                  </div>

                  <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Total Income" />
                    <div className="input-group-append">
                      <div className="input-group-text">-</div>
                    </div>
                  </div>

                  <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Total expenses" />
                    <div className="input-group-append">
                      <div className="input-group-text">=</div>
                    </div>
                  </div>

                  <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">$</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Monthly Cash Flow" />
                    <div className="input-group-append">
                      <div className="input-group-text">:)</div>
                    </div>
                  </div>

                  <div>If <b>Passive Income</b> > <b>Total Expenses</b> you are out or Rat Race</div>
                </div>
              </div>
            </div>
            <h4 className="statement-header">Balance Sheet</h4>
            <div className="balance-sheet d-flex">
              <div className="statement-section">
                <div className="section-header d-flex">
                  <div className="section-header__number">3</div>
                  <div className="section-header__text">Assets</div>
                </div>
                <div className="section-content">{assets}</div>
              </div>

              <div className="statement-section">
                <div className="section-header d-flex">
                  <div className="section-header__number">4</div>
                  <div className="section-header__text">Liabilities</div>
                </div>
                <div className="section-content">{liabilities}</div>
              </div>

            </div>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="statement-header">Financial Statement</h1>
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
