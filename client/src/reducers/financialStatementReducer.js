import {
  GET_FINANCIAL_STATEMENT,
  FINANCIAL_STATEMENT_LOADING
} from '../actions/types';

const initialState = {
  statement: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FINANCIAL_STATEMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FINANCIAL_STATEMENT:
      return {
        ...state,
        statement: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
