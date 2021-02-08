import { GET_fitbit_SUCCESS } from '../../../actiontypes';


export const Fitbit = (data) => {
    return (dispatch) => {
             dispatch({ type: GET_fitbit_SUCCESS, payload :data});
                
        } 
    }      