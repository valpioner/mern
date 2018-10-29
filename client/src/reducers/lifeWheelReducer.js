import {
  GET_LIFE_WHEEL,
  LIFE_WHEEL_LOADING
} from '../actions/types';

const initialState = {
  lifeWheel: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIFE_WHEEL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LIFE_WHEEL:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
