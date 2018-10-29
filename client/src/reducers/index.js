import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import mapReducer from './mapReducer';
import financialStatementReducer from './financialStatementReducer';
import lifeWheelReducer from './lifeWheelReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  map: mapReducer,
  financialStatement: financialStatementReducer,
  lifeWheel: lifeWheelReducer
});
