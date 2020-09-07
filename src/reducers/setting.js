import {GET_SETTING_REQUEST , GET_SETTING_SUCCESS, GET_SETTING_ERROR} from '../actiontypes';


const INITIAL_STATE = {
    settings:{mode : '', date: '' , time : ''}
};

const Settings = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SETTING_REQUEST:
            return { ...state,  settings:{mode : '', date: '' , time : ''}  }
        case GET_SETTING_SUCCESS:
            return { ...state, settings: action.payload }
        case GET_SETTING_ERROR:
            return { ...state, settings:{mode : '', date: '' , time : ''} }    
        default:
            return state;
    }
}
export default Settings;