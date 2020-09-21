import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// Added By Ankita Patient Component
import Register from "./../../Screens/Register";
import Login from "./../../Screens/Login";
import ForgotPass from "./../../Screens/ChangePassword"; 
import ChangePass from "./../../Screens/ChangePassword/changepassword";
import NotFound from "./../../Screens/Components/NotFound";
import PatientProfile from "./../../Screens/Patient/Profile/index";
import PatientSecond from "./../../Screens/Patient/More/secondopinion";
import PatientEmergency from "./../../Screens/Patient/More/EmergencyPatientData";
import PatientExtra from "./../../Screens/Patient/More/ExtraServices";
import PatientDocument from "./../../Screens/Patient/MyDocuments/index";
import PatientOnline from "./../../Screens/Patient/More/OnineCoure";
import PaitnetViewCourses from "./../../Screens/Patient/More/viewCourses";
import PatientTracker from "./../../Screens/Patient/Tracker/tracker";
import PatientTimeLine from "./../../Screens/Patient/Journal/index";
import PatientChats from "./../../Screens/Patient/Chat/index"
import PatientTimeLine1 from "./../../Screens/ViewTimelineComponent/index.js";
import PatientBlockchain from "./../../Screens/Patient/More/blockchain.js";
import PatientarchiveJournal from "./../../Screens/Patient/More/archiveJournal.js";


//Paramedic Component
import ParamedicEmergency from "./../../Screens/Paramedic/EmergencySection";
import ParamedicProfile from './../../Screens/Paramedic/Profile/index';
import ParamedicOnline from './../../Screens/Paramedic/onlineCourse/index';
import ParamedicChats from './../../Screens/Paramedic/Chat/index';

//Insurance Component
import InsuranceEmergency from "./../../Screens/Insurance/EmergencySection";
import InsuranceProfile from './../../Screens/Insurance/Profile/index';
import InsuranceOnline from './../../Screens/Insurance/onlineCourse/index';
import InsuranceChats from './../../Screens/Insurance/Chat/index';

import AGGrid from "./../../Screens/AGGrid/index"
//Doctor Component
import DoctorService from "./../../Screens/Doctor/Services/index.js"

class Routermain extends Component {
  render() {
    return (
      <Router basename={'/'}>
        <Grid>
          <Switch>
            {/* Added by Ankita */}
            <Route exact path="/" render={(props) => <Login  {...props} />} />
            <Route exact path="/register" render={(props) => <Register  {...props} />} />
            <Route exact path="/AgGrid" render={(props) => <AGGrid  {...props} />} />
            <Route exact path="/forgot-password" render={(props) => <ForgotPass  {...props} />} />
            <Route exact path="/change-password" render={(props) => <ChangePass  {...props} />} />
            <Route exact path="/patient" render={(props) => <PatientProfile  {...props} />} />
            <Route exact path="/patient/second-opinion" render={(props) => <PatientSecond {...props}/>} />
            <Route exact path="/patient/emergency" render={(props) => <PatientEmergency {...props}/>} />
            <Route exact path="/patient/extra-services" rensder={(props) => <PatientExtra {...props}/>} />
            <Route exact path="/patient/documents" render={(props) => <PatientDocument {...props} />} />
            <Route exact path="/patient/online-course" render={(props) => <PatientOnline {...props}/>} />
            <Route exact path="/patient/view-course" render={(props) => <PaitnetViewCourses {...props}/>} />
            <Route exact path="/patient/tracker" render={(props) => <PatientTracker {...props}/>} />
            <Route exact path="/patient/journal" render={(props) => <PatientTimeLine {...props}/>} />
            <Route exact path="/patient/Timelinecomponents" render={(props) => <PatientTimeLine1 {...props}/>} />
            <Route exact path="/patient/chats" render={(props) => <PatientChats {...props}/>} />
            <Route exact path="/patient/blockchain" render={(props) => <PatientBlockchain {...props}/>} />
            <Route exact path="/patient/archiveJournal" render={(props) => <PatientarchiveJournal {...props}/>} />

            <Route exact path="/paramedic" render={(props) => <ParamedicEmergency {...props}/>} />
            <Route exact path="/paramedic/profile" render={(props) => <ParamedicProfile {...props}/>} />
            <Route exact path="/paramedic/chats" render={(props) => <ParamedicChats {...props}/>} />
            <Route exact path="/paramedic/online-course" render={(props) => <ParamedicOnline {...props}/>} />

            
            <Route exact path="/insurance" render={(props) => <InsuranceEmergency {...props}/>} />
            <Route exact path="/insurance/profile" render={(props) => <InsuranceProfile {...props}/>} />
            <Route exact path="/insurance/chats" render={(props) => <InsuranceChats {...props}/>} />
            <Route exact path="/insurance/online-course" render={(props) => <InsuranceOnline {...props}/>} />
            
            {/* Doctor Router Start*/}
            <Route exact path="/doctor" render={(props) => <DoctorService {...props}/>} />
            <Route exact path="/doctor/patient" render={(props) => <DoctorService {...props}/>} />
            {/* Doctor Router End*/}
            
            
            <Route path='*' exact={true} render={(props) => <NotFound {...props} />} />
            {/* End By Ankita */}
            
          </Switch>
        </Grid>
      </Router>
    )
  }
}
export default Routermain; 