import { createStore, combineReducers } from 'redux';
import initialState from './initialState';
import postsReducer from './postsRedux';
import categoriesReducer from './categoriesRedux';

// tu będą subreducery, na razie pusto
const subreducers = {
    posts: postsReducer,
    categories: categoriesReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  // wsparcie dla Redux DevTools w przeglądarce
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;