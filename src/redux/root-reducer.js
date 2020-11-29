import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookReducer from './books/books.reducer.js';
import userReducer from './user/user.reducer.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data'],
  blacklist: ['books'],
};

const rootReducer = combineReducers({
  books: bookReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
