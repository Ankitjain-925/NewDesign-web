import {combineReducers} from 'redux';
// import signupReducer from './signupReducers';
import LanguageReducer from './languageReducers'
import LoginReducerAim from './LoginReducers'
import Doctorset from './Doctorset'
import filterate from './Filterthis'
import authy from './auth';
import EmergencySet from './EmergencySet';
import cometreducer from './cometreducer';

const allReducers = combineReducers({
    //signupReducer: signupReducer,
    // XTesting: XTesting,
    // placeReducer: placeReducer,
	LanguageReducer : LanguageReducer,
    LoginReducerAim : LoginReducerAim,
    Doctorset       : Doctorset,
    filterate       : filterate ,
    authy: authy,
    cometreducer: cometreducer,
    EmergencySet : EmergencySet

});

export default (allReducers);