import { RECEIVE_API_DATA } from "./ApiCalls.actions";

const ApiCallsReducer = (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_API_DATA:
      return data;
    default:
      return state;
  }
};
export default ApiCallsReducer