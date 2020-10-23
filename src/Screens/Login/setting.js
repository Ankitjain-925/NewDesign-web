
import {GET_SETTING_REQUEST , GET_SETTING_SUCCESS, GET_SETTING_ERROR} from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";

export const Settings = (data, mode) => {
    return (dispatch) => {
        dispatch({ type: GET_SETTING_REQUEST });
        if(data === 'loggedOut' ){
            let tmp = {setting : { mode : mode }}
            dispatch({ type: GET_SETTING_SUCCESS, payload :tmp});
        }
        else{
            // axios.get(sitedata.data.path + '/UserProfile/updateSetting',
            // {
            // headers: {
            //     'token': user_token,
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
            // }).then((responce) => {
            //     if(responce.data.hassuccessed)
            //     {
                    let tmp = {
                        setting :  data,
                    }
                    dispatch({ type: GET_SETTING_SUCCESS, payload :tmp});
                // }
                // else
                // {
                //     let tmp = {};
                //     dispatch({ type: GET_SETTING_ERROR , payload :tmp});
                // }
        //     })   
        } 
    }        
};