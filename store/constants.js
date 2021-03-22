// Action Types for different messages that can be sent to the reducers to update the state.
// May be able to consolidate all API fetch requests to just REQUESTED as this is just to update
// loading state. :)

const ActionType = {
  LOGIN_REQUESTED: 'LOGIN_REQUESTED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  ADD_ITEM_REQUESTED: 'ADD_ITEM_REQUESTED',
  ADD_ITEM_ERROR: 'ADD_ITEM_ERROR',
  ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',  
  DELETE_ITEM_REQUESTED: 'DELETE_ITEM_REQUESTED',
  DELETE_ITEM_ERROR: 'DELETE_ITEM_ERROR',
  DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',  
  UPDATE_USER_REQUESTED: 'UPDATE_USER_REQUESTED',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',  
  GET_USER_INFO: 'GET_USER_INFO',
  GET_HISTORY_REQUEST: 'GET_HISTORY_REQUEST',
  REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST',
  REGISTER_USER_ERROR: 'REGISTER_USER_ERROR',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
};

export default ActionType;