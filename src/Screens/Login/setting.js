
import {GET_SETTING_REQUEST , GET_SETTING_SUCCESS, GET_SETTING_ERROR} from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";

export const Settings = (user_token, mode) => {
    return (dispatch) => {
        dispatch({ type: GET_SETTING_REQUEST });
        if(user_token === 'loggedOut' ){
            console.log('hereee')
            let tmp = {setting : { mode : mode }}
            dispatch({ type: GET_SETTING_SUCCESS, payload :tmp});
        }
        else{
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
                    let tmp = {};
                    dispatch({ type: GET_SETTING_ERROR , payload :tmp});
                }
            })   
        } 
    }        
};