import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Home from "./../../Screens/Home";
import Inbox from "./../../Screens/Inbox";
import Inboxchat from "./../../Screens/Inbox/inboxchat";
import Inboxmessages from "./../../Screens/Inbox/inboxmessages";
import OnlineCourses from "./../../Screens/OnlineCourses";
import Appointment from "./../../Screens/Appointment";

// Added By Ankita
import Register from './../../Screens/Register';
import Login from './../../Screens/Login';
import ForgotPass from './../../Screens/ChangePassword'; 
import ChangePass from './../../Screens/ChangePassword/changepassword';
import NotFound from './../../Screens/Components/NotFound';
import PatientChat from './../../Screens/Patient/Chat/index';
import PatientProfile from './../../Screens/Patient/Profile/index';


class Routermain extends Component {
  render() {
    return (
      <Router basename={'/'}>
        <Grid>
          <Switch>
            {/* Change by Ankita */}
            <Route exact path="/home" component={Home} />

            {/* <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/inboxchat" component={Inboxchat} />
            <Route exact path="/inboxmessages" component={Inboxmessages} />
            <Route exact path="/onlinecourses" component={OnlineCourses} />
            <Route exact path="/appointment" component={Appointment} /> */}



            {/* Added by Ankita */}
            <Route exact path="/inboxchat" component={Inboxchat} />
            <Route exact path="/" render={(props) => <Login  {...props} />} />
            <Route exact path="/register" render={(props) => <Register  {...props} />} />
            <Route exact path="/forgot-password" render={(props) => <ForgotPass  {...props} />} />
            <Route exact path="/change-password" render={(props) => <ChangePass  {...props} />} />
            <Route exact path="/patient" render={(props) => <PatientProfile  {...props} />} />
            <Router exact path="/patient/chat" render={(props) => <PatientChat {...props}/>} />
            <Route path='*' exact={true} render={(props) => <NotFound {...props} />} />
            {/* End By Ankita */}
          </Switch>
        </Grid>
      </Router>
    )
  }
}
export default Routermain; 