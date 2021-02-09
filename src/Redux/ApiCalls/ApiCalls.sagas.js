import { REQUEST_API_DATA, receiveApiData } from "./ApiCalls.actions";
import { fetchData } from "./ApiCalls.actions";

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
    // do api call
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}
export  function* handler() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}