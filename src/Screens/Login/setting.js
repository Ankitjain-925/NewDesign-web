
import {GET_SETTING_REQUEST , GET_SETTING_SUCCESS, GET_SETTING_ERROR} from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";

export const Settings = (user_token) => {
    return (dispatch) => {
        dispatch({ type: GET_SETTING_REQUEST });
        axios.get(sitedata.data.path + '/UserProfile/updateSetting',
        {
        headers: {
            'token': user_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then((responce) => {
            if(responce.data.hassuccessed)
            {
                let tmp = {
                    setting :  responce.data.data,
                }
                dispatch({ type: GET_SETTING_SUCCESS, payload :tmp});
            }
            else
            {
                console.log('here24');
                let tmp = {};
                dispatch({ type: GET_SETTING_ERROR , payload :tmp});
            }
        })   
    }        
};