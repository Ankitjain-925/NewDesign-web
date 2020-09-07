import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// Added By Ankita
import Register from "./../../Screens/Register";
import Login from "./../../Screens/Login";
import ForgotPass from "./../../Screens/ChangePassword"; 
import ChangePass from "./../../Screens/ChangePassword/changepassword";
import NotFound from "./../../Screens/Components/NotFound";
import PatientChat from "./../../Screens/Patient/Chat/index";
import PatientProfile from "./../../Screens/Patient/Profile/index";
import PatientSecond from "./../../Screens/Patient/More/secondopinion";
import PatientEmergency from "./../../Screens/Patient/More/EmergencyPatientData";
import PatientExtra from "./../../Screens/Patient/More/ExtraServices";
import PatientDocument from "./../../Screens/Patient/MyDocuments/index";
import PatientOnline from "./../../Screens/Patient/More/OnineCoure";
import PaitnetViewCourses from "./../../Screens/Patient/More/viewCourses";
import PatientTracker from "./../../Screens/Patient/Tracker/tracker";
import PatientTimeLine from "./../../Screens/Patient/Journal/index";
import PatientTimeLine1 from "./../../Screens/Patient/Journal/bysir";

class Routermain extends Component {
  render() {
    return (
      <Router basename={'/'}>
        <Grid>
          <Switch>
            {/* Added by Ankita */}
            <Route exact path="/" render={(props) => <Login  {...props} />} />
            <Route exact path="/register" render={(props) => <Register  {...props} />} />
            <Route exact path="/forgot-password" render={(props) => <ForgotPass  {...props} />} />
            <Route exact path="/change-password" render={(props) => <ChangePass  {...props} />} />
            <Route exact path="/patient" render={(props) => <PatientProfile  {...props} />} />
            <Router exact path="/patient/chat" render={(props) => <PatientChat {...props}/>} />
            <Route exact path="/patient/second-opinion" render={(props) => <PatientSecond {...props}/>} />
            <Route exact path="/patient/emergency" render={(props) => <PatientEmergency {...props}/>} />
            <Route exact path="/patient/extra-services" render={(props) => <PatientExtra {...props}/>} />
            <Route exact path="/patient/documents" render={(props) => <PatientDocument {...props} />} />
            <Route exact path="/patient/online-course" render={(props) => <PatientOnline {...props}/>} />
            <Route exact path="/patient/view-course" render={(props) => <PaitnetViewCourses {...props}/>} />
            <Route exact path="/patient/tracker" render={(props) => <PatientTracker {...props}/>} />
            <Route exact path="/patient/journal" render={(props) => <PatientTimeLine {...props}/>} />
            <Route exact path="/patient/bySir" render={(props) => <PatientTimeLine1 {...props}/>} />
            <Route path='*' exact={true} render={(props) => <NotFound {...props} />} />
            {/* End By Ankita */}
          </Switch>
        </Grid>
      </Router>
    )
  }
}
export default Routermain; 