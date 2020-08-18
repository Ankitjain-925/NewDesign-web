
import {GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_ERROR } from '../../actiontypes';
import sitedata from '../../sitedata.js';
import axios from "axios";
import { COMETCHAT_CONSTANTS } from '../Components//CometChat/consts';
import * as actions from '../Components/CometChat/store/action';
const path = sitedata.data.path + '/UserProfile';
const path1 = sitedata.data.path + '/User';

export const LoginReducerAim = (email, password) => {
    return (dispatch) => {
        dispatch({ type: GET_LOGIN_REQUEST });
        axios.post(path+'/UserLogin',{ email, password})
        .then((response) =>{
          let tmp;
          if(response.data.hassuccessed === false){
            let tmp = {
              token : response.data.status,
              message: response.data.message
            }
            dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});
            
          }
          else if(response.data.status === 450){
            tmp = {
              token : response.data.status,
              user_type:'',
              
            }
            dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});
          }
          else{
            axios.get(path1+'/getKyc/'+response.data.user._id , 
            {
              headers: {
                  'token': response.data.token,
                  'Content-Type': 'multipart/form-data',
              }
          })
          .then((response1) => {
            var iskyc = response1.data.data;
            tmp = {
              token:response.data.token,
              user:response.data.user,
              kyc: iskyc
            }
            dispatch( actions.auth( response.data.user.profile_id, COMETCHAT_CONSTANTS.AUTH_KEY ) ) 
            dispatch({ type: GET_LOGIN_SUCCESS, payload :tmp});  
          })
           
          
      }
        }).catch((error) => {
            let tmp = 'error';
           dispatch({ type: GET_LOGIN_ERROR , payload :tmp});
      });
    }      
};