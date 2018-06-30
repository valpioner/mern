import {
    GET_USER_MAP,
    ADD_FLIGHT,
    USER_MAP_LOADING,
    SELECT_MAP_ELEMENT
  } from '../actions/types';
  
  const initialState = {
    userMap: null,
    loading: false,
    selectedMapElement: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USER_MAP_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_USER_MAP:
        return {
          ...state,
          userMap: action.payload,
          loading: false
        };
      case ADD_FLIGHT:
        return {
          ...state,
          flights: [action.payload, ...state.flights]
        };
      case SELECT_MAP_ELEMENT:
        return {
          ...state,
          selectedMapElement: action.payload
        }
      default:
        return state;
    }
  }
  