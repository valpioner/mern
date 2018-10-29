import axios from 'axios';

import {
  GET_LIFE_WHEEL,
  LIFE_WHEEL_LOADING,
  GET_ERRORS
} from './types';

// Get current Financial Statement
export const getCurrentLifeWheel = () => dispatch => {
  dispatch(setLifeWheelLoading());
  axios
    .get('/api/lifeWheel')
    .then(res =>
      dispatch({
        type: GET_LIFE_WHEEL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LIFE_WHEEL,
        payload: {}
      })
    );
};

// Create Financial Statement
export const createLifeWheel = (data, history) => dispatch => {
  axios
    .post('/api/lifeWheel', data)
    // .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Financial Statement loading
export const setLifeWheelLoading = () => {
  return {  
    type: LIFE_WHEEL_LOADING
  };
};
