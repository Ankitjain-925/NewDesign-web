/*global google*/

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import { Redirect, Route } from 'react-router-dom';
import sitedata from '../../../sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import { LanguageFetchReducer } from './../../actions';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProfileSection from './Components/profileUpdate';
import SecuritySection from './Components/security';
import DoctorSection from './Components/mydoctors';

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            openDash: false,
            date: new Date(),
            value: 0,
            LoggedInUser: {}
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount() {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.getUserData();
    }

    // For change the Tabs
    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    changePassword = (e) => {
        const state1 = this.state.UpDataDetails, state = this.state.passwordDetails;
        state[e.target.name] = e.target.value;
        state1[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state1, passwordDetails: state });

    }

    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false, LoggedInUser: response.data.data });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }
    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        const { value } = this.state;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu />

                                {/* Website Mid Content */}
                                <Grid item xs={12} md={8}>
                                    <Grid className="profilePkg ">
                                        <Grid className="profilePkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="profileTabsUpr">
                                                <Tabs value={value} onChange={this.handleChangeTabs} className="profileTabs">
                                                    <Tab label="My Profile" className="aboutTabsIner" />
                                                    <Tab label="Security" className="aboutTabsIner" />
                                                    <Tab label="My Doctors" className="aboutTabsIner" />
                                                    <Tab label="Organ Donor" className="aboutTabsIner" />
                                                    <Tab label="Rights Management" className="aboutTabsIner" />
                                                    <Tab label="KYC" className="aboutTabsIner" />
                                                    <Tab label="Date & Time" className="aboutTabsIner" />
                                                </Tabs>
                                            </AppBar>
                                        </Grid>
                                        <Grid className="profilePkgIner2">
                                            {/* Start of MyProfile */}
                                            {value === 0 && <TabContainer>
                                                <ProfileSection />
                                            </TabContainer>}
                                            {/* End of MyProfile */}

                                            {value === 1 && <TabContainer>
                                                <SecuritySection user_token = {this.props.stateLoginValueAim.token} LoggedInUser={this.state.LoggedInUser} getUserData = {this.getUserData} />
                                            </TabContainer>}

                                            {value === 2 && <TabContainer>
                                                <DoctorSection />
                                            </TabContainer>}

                                            {value === 3 && <TabContainer>
                                                Organ Donor
                                            </TabContainer>}

                                            {value === 4 && <TabContainer>
                                                Rights Management
                                            </TabContainer>}

                                            {value === 5 && <TabContainer>
                                                KYC
                                            </TabContainer>}

                                            {value === 6 && <TabContainer>
                                                Date & Time
                                            </TabContainer>}
                                        </Grid>
                                        {/* End of Tabs */}
                                    </Grid>
                                </Grid>
                                {/* Website Right Content */}
                                <Grid item xs={12} md={3}>

                                </Grid>
                                {/* End of Website Right Content */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index));