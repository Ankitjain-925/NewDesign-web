import {GET_Withing_REQUEST , GET_Withing_SUCCESS, GET_Withing_ERROR} from '../../../actiontypes';


export const Withings = (data) => {
    return (dispatch) => {
        dispatch({ type: GET_Withing_REQUEST });
           
            let tmp = {
                data :  data,
                }
        dispatch({ type: GET_Withing_SUCCESS, payload :tmp});
                
        } 
    };        