import { LoadingActionTypes } from './Loading.types';

export const setLoading = user => ({
  type: LoadingActionTypes.SET_LOADING,
  payload: user
});
