import {
    GET_CURRENT_SUCCESS,
  } from "../../../../actiontypes";
  
  export const currentAvaliable = (data) => {
    return (dispatch) => {
      let tmp = data;
      dispatch({ type: GET_CURRENT_SUCCESS, payload: tmp });
    };
  };