import axios from 'axios';

import {
  USER_MAP_LOADING,
  GET_USER_MAP,
  GET_USER_TRIPS,
  ADD_FLIGHT,
  ADD_TRIP,
  SELECT_MAP_ELEMENT
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

// Get User Trips
export const getUserTrips = userId => dispatch => {
  dispatch(setUserMapLoading());
  axios
    .get(`/api/map/trips/${userId}`)
    .then(res =>
      dispatch({
        type: GET_USER_TRIPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_TRIPS,
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

// Add Trip
export const addTrip = postData => dispatch => {
  //dispatch(clearErrors());
  axios
    .post('/api/map/addTrip', postData)
    .then(res =>
      dispatch({
        type: ADD_TRIP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADD_TRIP,
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

// Select map element
export const selectMapElement = data => dispatch => {
  dispatch({
    type: SELECT_MAP_ELEMENT,
    payload: data
  })
};