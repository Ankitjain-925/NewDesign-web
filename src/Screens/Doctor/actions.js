import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_FAIL,
  GET_PATIENT_SUCCESS,
} from "../../actiontypes";
import sitedata from "../../sitedata.js";
import axios from "axios";

const path = sitedata.data.path + "/UserProfile";
export const Doctorset = (user_id, pin) => {
  //// console.log(Api+"my api data");
  return (dispatch) => {
    let tmp = { p_id: user_id, p_pin: pin };
    dispatch({ type: GET_PATIENT_SUCCESS, payload: tmp });
  };
};
