import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import animal from './animal/reducer';
import schedule from './schedule/reducer';

export default combineReducers({
  auth,
  animal,
  user,
  schedule,
});
