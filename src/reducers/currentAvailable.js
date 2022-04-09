import {
    GET_CURRENT_REQUEST,
    GET_CURRENT_FAIL,
    GET_CURRENT_SUCCESS,
  } from "../actiontypes";
  
  const data = {
    CheckCurrent: { current_available: false },
  };
  
  const currentAvaliable = (state = data, action) => {
    switch (action.type) {
      case GET_CURRENT_REQUEST:
        return { CheckCurrent: { current_available: false } };
      case GET_CURRENT_SUCCESS:
        return { CheckCurrent: { ...action.payload } };
      case GET_CURRENT_FAIL:
        return { CheckCurrent: { current_available: false } };
      default:
        return state;
    }
  };
  export default currentAvaliable;