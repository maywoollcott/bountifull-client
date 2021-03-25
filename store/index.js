import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const initialState = {
  user: null,
  error: null,
  isLoading: false,
  currentProgress: null,
  dailyTotal: null,
  totalGoalMet: null,
  fact: '',
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)
));

export default store;