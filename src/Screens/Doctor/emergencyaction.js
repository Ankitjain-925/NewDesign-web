import {GET_EMERGENCY_REQUEST, GET_EMERGENCY_FAIL1, GET_EMERGENCY_SUCCESS } from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";


const path = sitedata.data.path + '/UserProfile';
export const EmergencySet = (user_id) => {
    //// console.log(Api+"my api data");
    return (dispatch) => {
        let tmp = {p_id : user_id};
        dispatch({ type: GET_EMERGENCY_SUCCESS, payload:tmp });  
    }      
};