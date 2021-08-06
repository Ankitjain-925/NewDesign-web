import {
    GET_HOUSE_REQUEST,
    GET_HOUSE_SUCCESS,
  } from "actiontypes";
  
  export const houseSelect = (data) => {
    return (dispatch) => {
      dispatch({ type: GET_HOUSE_REQUEST });
      if (data === "loggedOut") {
        dispatch({ type: GET_HOUSE_SUCCESS, payload: false });
      } else {
        dispatch({ type: GET_HOUSE_SUCCESS, payload: data });
      }
    };
  };