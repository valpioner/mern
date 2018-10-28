import axios from 'axios';

import {
  GET_FINANCIAL_STATEMENT,
  FINANCIAL_STATEMENT_LOADING,
  GET_ERRORS,
} from './types';

// Get current Financial Statement
export const getCurrentFinancialStatement = () => dispatch => {
  dispatch(setFinancialStatementLoading());
  axios
    .get('/api/financialStatement')
    .then(res =>
      dispatch({
        type: GET_FINANCIAL_STATEMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FINANCIAL_STATEMENT,
        payload: {}
      })
    );
};

// Create Financial Statement
export const createFinancialStatement = (statementData, history) => dispatch => {
  axios
    .post('/api/profile', statementData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Financial Statement loading
export const setFinancialStatementLoading = () => {
  return {  
    type: FINANCIAL_STATEMENT_LOADING
  };
};
