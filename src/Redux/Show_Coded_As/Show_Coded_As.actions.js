import { ShowCodedAsActionTypes } from './Show_Coded_As.types';

export const setShowCodedAs = user => ({
  type: ShowCodedAsActionTypes.SET_SHOW_CODED_AS,
  payload: user
});
