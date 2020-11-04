import {GET_fitbit_REQUEST , GET_fitbit_SUCCESS, GET_fitbit_ERROR} from '../../../actiontypes';


export const Fitbit = (data) => {
    return (dispatch) => {
             dispatch({ type: GET_fitbit_SUCCESS, payload :data});
                
        } 
    }      