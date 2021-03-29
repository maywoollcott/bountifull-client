import ActionType from './constants';

export const initialState = {
  user: null,
  error: null,
  isLoading: false,
  currentProgress: null,
  dailyTotal: null,
  totalGoalMet: null,
  fact: '',
  dateSelectedState:''
};

// separate out actions into different reducers and combine.

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.LOGIN_REQUESTED:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case ActionType.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case ActionType.LOGOUT_REQUESTED:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case ActionType.LOGOUT_ERROR:
      return {
        ...state,
        user: null,
        currentProgress: null,
        error: action.payload,
        isLoading: false,
      };
    case ActionType.LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case ActionType.REGISTER_USER_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case ActionType.REGISTER_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ActionType.REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        fact: action.payload.fact,
        isLoading: false,
      };
    case ActionType.UPDATE_USER_REQUESTED:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case ActionType.UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload
        },
        isLoading: false,
      };
    case ActionType.ADD_ITEM_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.ADD_ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ActionType.ADD_ITEM_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
      case ActionType.DELETE_ITEM_REQUESTED:
        return {
          ...state,
          isLoading: true,
        };
      case ActionType.DELETE_ITEM_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case ActionType.DELETE_ITEM_SUCCESS:
        return {
          ...state,
          currentProgress: state.currentProgress.filter(item => item.uniqueId !== action.payload.uniqueId),
        };
      case ActionType.ADD_DAILY_TOTAL:
        return {
          ...state,
          ...action.payload,
        };
      case ActionType.FETCH_REQUESTED:
        return {
          ...state,
          isLoading: true,
        };
      case ActionType.FETCH_ERROR:
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case ActionType.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
        };
    default:
      return state;
  }
};

export default reducer;