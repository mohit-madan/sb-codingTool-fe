import { ProgressActionTypes } from './progress.types';

export const setProgressNumber = user => ({
  type: ProgressActionTypes.SET_PROGRESS_NUMBER,
  payload: user
});
