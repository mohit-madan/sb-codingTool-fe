import { ProgressActionTypes } from './progress.types';

const INITIAL_STATE = {
  progressNumber: 1
};

const progressNumberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProgressActionTypes.SET_PROGRESS_NUMBER:
      return {
        ...state,
        progressNumber: action.payload
      };
    default:
      return state;
  }
};

export default progressNumberReducer;
