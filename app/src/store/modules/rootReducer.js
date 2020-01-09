import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import clinic from './clinic/reducer';

export default combineReducers({
  auth,
  clinic,
  user,
});
