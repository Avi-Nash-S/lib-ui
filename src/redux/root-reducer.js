import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import bookReducer from './books/books.reducer.js';
import { reducer as formReducer } from 'redux-form';
import formsReducer from './forms/forms.reducer.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data'],
  blacklist: ['books'],
};

const rootReducer = combineReducers({
  books: bookReducer,
  form: formReducer,
  data: formsReducer,
});

export default persistReducer(persistConfig, rootReducer);
