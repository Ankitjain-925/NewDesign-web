import {combineReducers} from 'redux';
// import signupReducer from './signupReducers';
import LanguageReducer from './languageReducers'
import LoginReducerAim from './LoginReducers'
import Doctorset from './Doctorset'
import filterate from './Filterthis'
import authy from './auth';
import EmergencySet from './EmergencySet';
import cometreducer from './cometreducer';
import Settings from './setting'
import Fitbit from './fitbit';
import Withings from './withing'; 

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
    EmergencySet : EmergencySet,
    Settings : Settings,
    Fitbit : Fitbit,
    Withings : Withings
});

export default (allReducers);