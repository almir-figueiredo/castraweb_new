import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'castraweb',
      storage,
      whitelist: ['auth', 'schedule', 'animal'],
    },
    reducers
  );

  return persistedReducer;
};
