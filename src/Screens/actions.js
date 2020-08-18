import {GET_LANGUAGE_TYPE, GET_LANGUAGE_TYPE_FAIL } from '../actiontypes';
// import { ToastActionsCreators } from 'react-native-redux-toast';
export const LanguageFetchReducer = (selectedLanguage) => {
    //console.log(Api+"my api data");
    return (dispatch) => {
            dispatch({ type: GET_LANGUAGE_TYPE, payload: selectedLanguage});
    }      
};