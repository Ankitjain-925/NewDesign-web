import {
  GET_SPECAILITY_REQUEST,
  GET_SPECAILITY_SUCCESS,
  GET_SPECAILITY_FAIL,
} from "actiontypes";
import sitedata from "sitedata.js";
import axios from "axios";


export const Speciality = (getting, callBack= ()=>{}) => {
  return (dispatch) => {
      if(getting){
          dispatch({ type: GET_SPECAILITY_REQUEST });
          axios
          .get(sitedata.data.path + "/vh/AddSpecialty/" + this.props?.House?.value)
            .then((responce) => {
              console.log("data",responce)
              if (responce && responce.data && responce.data.length > 0) {
                dispatch({ type: GET_SPECAILITY_SUCCESS, payload: responce.data[0] });
                callBack();
              }
            })
            .catch((error) => {
              dispatch({ type: GET_SPECAILITY_FAIL });
              Speciality();
            });
          }
          else{
              dispatch({ type: GET_SPECIALITY_FAIL }); 
              callBack();
          }
      };
};
