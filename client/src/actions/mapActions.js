import axios from 'axios';

import {
  USER_MAP_LOADING,
  GET_USER_MAP,
  ADD_FLIGHT
} from './types';

// Get User Map
export const getUserMap = userId => dispatch => {
  dispatch(setUserMapLoading());
  axios
    .get(`/api/map/${userId}`)
    .then(res =>
      dispatch({
        type: GET_USER_MAP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_MAP,
        payload: null
      })
    );
};

// Add Post
export const addFlight = postData => dispatch => {
  //dispatch(clearErrors());
  axios
    .post('/api/map/addFlight', postData)
    .then(res =>
      dispatch({
        type: ADD_FLIGHT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADD_FLIGHT,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setUserMapLoading = () => {
  return {
    type: USER_MAP_LOADING
  };
};
