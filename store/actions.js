import axios from 'axios';
import ActionType from './constants';
import * as SecureStore from 'expo-secure-store';
import { calcTotalProgress, calcTotalsByNutrient } from '../utils/nutrients';
// import { IP} from 'react-native-dotenv';

const API_URL = 'http://192.168.0.181:3001';

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    if (!email || !password) {
      return dispatch({ type: ActionType.LOGIN_ERROR, payload: 'Please check your credentials. Your email address and/or password is missing.'});
    }
    dispatch({type: ActionType.LOGIN_REQUESTED});
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const {
        currentProgress,
        user: {
          birthdate,
          sex,
        }
      } = data;
      const dailyTotal = calcTotalsByNutrient({
        items: currentProgress,
        sex,
        birthdate,
      });
      const totalGoalMet = currentProgress.length ? calcTotalProgress(dailyTotal) : 0;
      await SecureStore.setItemAsync('BOUNTIFULL_TOKEN_AUTH', data.token);
      return dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: {
          ...data,
          dailyTotal,
          totalGoalMet,
        },
      });
    } catch (err) {
      return dispatch({ type: ActionType.LOGIN_ERROR, payload: err });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({ type: ActionType.LOGOUT_REQUESTED})
    try {
      await SecureStore.deleteItemAsync('BOUNTIFULL_TOKEN_AUTH');
      return dispatch({ type: ActionType.LOGOUT_SUCCESS});
    } catch (err) {
      return dispatch({ type: ActionType.LOGOUT_ERROR, payload: err });
    }
  };
};

// TODO: add Store Token somewhere either in AsyncStorage or Expo-Secure-Store
export const registerUser = ({ name, email, password, birthdate, sex, avatar }) => {
  // console.log(API_URL)
  // console.log('name');
  return async (dispatch) => {
    if (!name || !email || !password || !birthdate || !sex) {
      return dispatch({ type: ActionType.REGISTER_USER_ERROR, payload: 'Please make sure all required information has been provided for registration'});
    }
    try {
      dispatch({type: ActionType.REGISTER_USER_REQUEST});
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        birthdate,
        sex,
        avatar
      });
      const currentProgress = [];
      const dailyTotal = calcTotalsByNutrient({
        items: currentProgress,
        sex,
        birthdate,
      });
      const totalGoalMet =  0;
      await SecureStore.setItemAsync('BOUNTIFULL_TOKEN_AUTH', data.token);
      return dispatch({
        type: ActionType.REGISTER_USER_SUCCESS,
        payload: {
          ...data,
          currentProgress,
          dailyTotal,
          totalGoalMet,
        },
      });
    } catch (err) {
      return dispatch({ type: ActionType.REGISTER_USER_ERROR, payload: err });
    }
  };
};

// TODO: add Store Token somewhere either in AsyncStorage or Expo-Secure-Store
export const updateUser = ({ birthdate, sex, displayName, email, password, avatar }) => {
  return async (dispatch, getState) => {
    if (!email || !password || !displayName || !avatar) {
      return dispatch({ type: ActionType.UPDATE_USER_ERROR, payload: 'No information has been provided to _USER!'});
    }
    try {
      const { 
        user: {
          _id,
        }
      } = getState();
      const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({type: ActionType.UPDATE_USER_REQUESTED});
      const { data } = await axios.put(`${API_URL}/update/${_id}`, {
        email,
        password,
        avatar,
        birthdate,
        sex,
        displayName,
      }, config);
      return dispatch({
        type: ActionType.UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      return dispatch({ type: ActionType.UPDATE_USER_ERROR, payload: err });
    }
  };
};


// TODO: add Token and authorization header to request, store refreshToken in AsyncStorage or Expo-Secure-Store
export const addItem = ( item ) => {
  return async (dispatch, getState) => {
    if (!item) {
      return dispatch({ type: ActionType.ADD_ITEM_ERROR, payload: 'Please make sure all required information has been provided for logging.'});
    }
    try {
      const { 
        user: {
          _id,
          birthdate,
          sex,
        },
        currentProgress,
      } = getState();
      const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const dailyTotal = calcTotalsByNutrient({
        items: currentProgress.concat(item),
        sex,
        birthdate,
      });
      const totalGoalMet = calcTotalProgress(dailyTotal);
      dispatch({type: ActionType.ADD_ITEM_REQUESTED});
      const { data } = await axios.post(`${API_URL}/additem`, {
        user: _id,
        totalGoalMet,
        ...item,
      }, config);
      return dispatch({
        type: ActionType.ADD_ITEM_SUCCESS,
        payload: {
          dailyTotal,
          totalGoalMet,
          currentProgress: currentProgress.concat(item),
        },
      });
    } catch (err) {
      console.error(err);
      return dispatch({ type: ActionType.ADD_ITEM_ERROR, payload: err });
    }
  };
};

// TODO: add Token and authorization header to request, store refreshToken in AsyncStorage or Expo-Secure-Store
export const deleteItem = ( item ) => {
  return async (dispatch, getState) => {
    if (!item) {
      return dispatch({ type: ActionType.DELETE_ITEM_ERROR, payload: 'Please make sure all required information has been provided for deleting.'});
    }
    try {
      const { 
        user: {
          _id,
          birthdate,
          sex,
        },
        currentProgress,
      } = getState();
      const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
      const dailyTotal = calcTotalsByNutrient({
        items: currentProgress.filter(food => food.uniqueId !== item.uniqueId),
        sex,
        birthdate,
      });
      console.log('in actions ', item.uniqueId);
      const totalGoalMet = calcTotalProgress(dailyTotal);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({type: ActionType.DELETE_ITEM_REQUESTED});
      await axios.delete(`${API_URL}/deleteItem/${item.uniqueId}`, {
        ...config
      });
      return dispatch({
        type: ActionType.DELETE_ITEM_SUCCESS,
        payload: {
          dailyTotal,
          totalGoalMet,
          currentProgress: currentProgress.filter(food => food.uniqueId !== item.uniqueId)
        },
      });
    } catch (err) {
      return dispatch({ type: ActionType.DELETE_ITEM_ERROR, payload: err });
    }
  };
};
