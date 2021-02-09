import { userActions } from "../../_actions";

export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";

export const requestApiData = () => ({ type: REQUEST_API_DATA });
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data });

export const fetchData =  () => {
    try {
      const data =   userActions.responsePagination({pageNumber:1,limit:20,push:true})
      return data;
    } catch (e) {
      console.log(e);
    }
};