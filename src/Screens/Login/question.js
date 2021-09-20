import {
    GET_QUESTION_REQUEST,
    GET_QUESTION_FAIL,
    GET_QUESTION_SUCCESS,
  } from "actiontypes";
  import sitedata from "sitedata.js";
  import axios from "axios";
  
  
  export const Question = (getting, house_id, callBack = () => { }) => {
    return (dispatch) => {
      console.log('herewwe', getting, house_id)
      if (getting && house_id) {
        dispatch({ type: GET_QUESTION_REQUEST });
        axios
          .get(sitedata.data.path + "/vh/AddSpecialty/house_id")
          .then((responce) => {
            console.log("data", responce)
            if (responce && responce.data && responce.data.length > 0) {
              dispatch({ type: GET_QUESTION_SUCCESS, payload: responce.data[0] });
              callBack();
            }
          })
          .catch((error) => {
            dispatch({ type: GET_QUESTION_FAIL });
            Question();
          });
      }
      else {
        dispatch({ type: GET_QUESTION_FAIL });
        callBack();
      }
    };
  };
  