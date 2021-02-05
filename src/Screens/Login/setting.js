import {
  GET_SETTING_REQUEST,
  GET_SETTING_SUCCESS,
  GET_SETTING_ERROR,
} from "actiontypes";
import sitedata from "sitedata.js";
import axios from "axios";

export const Settings = (data, mode) => {
  return (dispatch) => {
    dispatch({ type: GET_SETTING_REQUEST });
    if (data === "loggedOut") {
      let tmp = { setting: { mode: mode } };
      dispatch({ type: GET_SETTING_SUCCESS, payload: tmp });
    } else {
      let tmp = {
        setting: data,
      };
      dispatch({ type: GET_SETTING_SUCCESS, payload: tmp });
    }
  };
};
