import { ShowCodedAsActionTypes } from './Show_Coded_As.types';

const INITIAL_STATE = {
  showCodedAs: null
};

const showCodedAsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShowCodedAsActionTypes.SET_SHOW_CODED_AS:
      return {
        ...state,
        showCodedAs: action.payload
      };
    default:
      return state;
  }
};

export default showCodedAsReducer;
