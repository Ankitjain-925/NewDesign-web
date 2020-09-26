import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import sitedata from '../../../sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { LanguageFetchReducer } from './../../actions';


import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import "react-toggle/style.css";

import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/DoctorLeftMenu/mobile';
import MyProfile from './Components/myProfile.js';
import KYC from './Components/kyc.js';
import Security from './Components/security.js';
import ServicesAppointment from './Components/serviceAppointments.js';
import DateTime from './Components/dateTime.js';
import OfficeInformation from './Components/officeInformation.js'




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
            selectedCountry: null,
            date: new Date(),
            value: 0,
            openTrust: false,
            time: '',
            openInvt: false,
            openPharma: false
        };
    }

    componentDidMount() {
        this.getUserData();
        this.getMetadata();
    }

    //Get the current User Data
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

     //   //For getting the dropdowns from the database
     getMetadata() {
        axios.get(sitedata.data.path + '/UserProfile/Metadata')
            .then((responce) => {
                if (responce && responce.data && responce.data.length > 0) {
                    var tissue = [], dates = [], times = [];
                    {
                        responce.data[0].tissue && responce.data[0].tissue.length > 0 && responce.data[0].tissue.map(
                            (item) => { tissue.push({ label: item.title, value: item.value }) })
                    }
                    {
                        responce.data[0].dates && responce.data[0].dates.length > 0 && responce.data[0].dates.map(
                            (item) => { dates.push({ label: item.title, value: item.value }) })
                    }
                    {
                        responce.data[0].times && responce.data[0].times.length > 0 && responce.data[0].times.map(
                            (item) => { times.push({ label: item.title, value: item.value }) })
                    }
                    this.setState({
                        tissue: tissue,
                        dates: dates,
                        times: times,
                    });
                }
            })

    }

    handleOpenTrust = () => {
        this.setState({ openTrust: true });
    };
    handleCloseTrust = () => {
        this.setState({ openTrust: false });
    };
    onChange = date => this.setState({ date })
    onChange = time => this.setState({ time })
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        //console.log(`Option selected:`, selectedOption);
    };
    handleChangeCountry = selectedCountry => {
        this.setState({ selectedCountry });
    };
    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleOpenInvt = () => {
        this.setState({ openInvt: true });
    };
    handleCloseInvt = () => {
        this.setState({ openInvt: false });
    };

    handleOpenPharma = () => {
        this.setState({ openPharma: true });
    };
    handleClosePharma = () => {
        this.setState({ openPharma: false });
    };

    render() {
        const { selectedOption, selectedCountry } = this.state;
        const { value } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage="profile" />
                                <LeftMenuMobile isNotShow ={true}  currentPage="profile" />
                                {/* End of Website Menu */}
                                {/* Website Mid Content */}
                                <Grid item xs={12} md={9}>
                                    <Grid className="profilePkg ">

                                        <Grid className="profilePkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="profileTabsUpr">
                                                <Tabs value={value} onChange={this.handleChangeTabs} className="profileTabs">
                                                    <Tab label="My Profile" className="aboutTabsIner" />
                                                    <Tab label="Office information" className="aboutTabsIner" />
                                                    <Tab label="Services & Appointments" className="aboutTabsIner" />
                                                    <Tab label="Security" className="aboutTabsIner" />
                                                    <Tab label="KYC" className="aboutTabsIner" />
                                                    <Tab label="Date & Time" className="aboutTabsIner" />
                                                </Tabs>
                                            </AppBar>
                                        </Grid>

                                        <Grid className="profilePkgIner2">

                                            {/* Start of MyProfile */}
                                            {value === 0 && <TabContainer>
                                                <MyProfile />
                                            </TabContainer>}
                                            {/* End of MyProfile */}


                                            {/* Start of Office information */}
                                            {value === 1 && <TabContainer>
                                                <OfficeInformation />
                                            </TabContainer>}
                                            {/* End of Office information */}

                                            {/* Services & Appointments */}
                                            {value === 2 && <TabContainer>
                                                <ServicesAppointment />
                                            </TabContainer>}
                                            {/* End of Services & Appointments */}

                                            {/* Start of Security Tab */}
                                            {value === 3 && <TabContainer>
                                                <Security user_token = {this.props.stateLoginValueAim.token} LoggedInUser={this.state.LoggedInUser} getUserData = {this.getUserData}/>
                                            </TabContainer>}
                                            {/* End of Security Tab */}

                                            {/* Start of KYC section */}
                                            {value === 4 && <TabContainer>
                                                <KYC />
                                            </TabContainer>}
                                            {/* End of KYC section */}

                                            {/* Start of Date & Time */}
                                            {value === 5 && <TabContainer>
                                                <DateTime times={this.state.times && this.state.times} dates= {this.state.dates && this.state.dates} user_token = {this.props.stateLoginValueAim.token} LoggedInUser={this.state.LoggedInUser} getUserData = {this.getUserData}/>
                                                </TabContainer>}
                                            {/* End of Date & Time */}

                                            {/* End of Tabs */}

                                        </Grid>

                                    </Grid>

                                </Grid>
                                {/* End of Website Mid Content */}

                                {/* Website Right Content */}
                                <Grid item xs={12} md={3}></Grid>
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
    const {settings} = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));