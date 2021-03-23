import ActionType from './constants';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  currentProgress: null,
  fact: '',
};

// separate out actions into different reducers and combine.

const reducer = (state = initialState, action) => {
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
        user: {
          ...action.payload.user,
        },
        currentProgress: action.payload.currentProgress,
        fact: action.payload.fact,
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
        ...state,
        user: null,
        currentProgress: null,
        error: null,
        isLoading: false,
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
        user: {
          ...action.payload.user,
        },
        currentProgress: action.payload.currentProgress,
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
          ...state.user,
          ...action.payload.updated
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
        currentProgress: state.currentProgress.concat(action.payload),
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
          currentProgress: state.currentProgress.filter(item => item.id !== action.payload.id),
        };
    default:
      return state;
  }
};

export default reducer;