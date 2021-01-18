import { createSelector } from 'reselect';

const INITIAL_STATE = {
  googleUser: null
};

const googleSignIn = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_GOOGLE_USER":
      return {
        ...state,
        googleUser: action.payload
      };
    default:
      return state;
  }
};


const selectGoogleUser = state => state.googleUser;

export const selectCurrentUser = createSelector(
  [selectGoogleUser],
  user => user.googleUser
);

export default googleSignIn;
