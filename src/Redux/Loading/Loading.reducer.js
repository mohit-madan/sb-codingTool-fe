import { LoadingActionTypes } from './Loading.types';

const INITIAL_STATE = {
  loading: false
};

const LoadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoadingActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default LoadingReducer;
