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
import { Settings } from './../../Login/setting';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/PatientLeftMenu/mobile';
import { LanguageFetchReducer } from './../../actions';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { authy } from './../../Login/authy.js';
import Typography from '@material-ui/core/Typography';
import ProfileSection from './Components/profileUpdate';
import SecuritySection from './Components/security';
import DoctorSection from './Components/mydoctors';
import OrganSection from './Components/orgnaDonar';
import ManagementSection from './Components/rightManagement';
import KycSection from './Components/kyc';
import DateTimeSection from './Components/DateTime';
import Timezone from './../../../timezon.json';
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

import * as translationEN from '../../../translations/en.json';
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';
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
            LoggedInUser: {},
            times: [],
            tissue : [],
            dates : [], 
            timezones : [],
        };
    }

    componentDidMount() {
        this.getUserData();
        this.getMetadata();
    }

    // For change the Tabs
    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    //   //For getting the dropdowns from the database
      getMetadata() {
        axios.get(sitedata.data.path + '/UserProfile/Metadata')
            .then((responce) => {
                if (responce && responce.data && responce.data.length > 0) {
                    var tissue = [], dates = [], times = [], zones = [];
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
                    {
                        Timezone && Timezone.length > 0 && Timezone.map(
                            (item) => { zones.push({ label: item.text, value: item.value }) })
                    }
                    this.setState({
                        tissue: tissue,
                        dates: dates,
                        times: times,
                        timezones : zones
                    });
                }
            })

    }

    //Get the current User Data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id =  this.props.stateLoginValueAim && this.props.stateLoginValueAim.user && this.props.stateLoginValueAim.user._id
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
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient' || !this.props.verifyCode || !this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { my_drs, my_profile, Security, organ_donar, right_management, date_time, kyc} = translate;

        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage ="profile"/>
                                <LeftMenuMobile isNotShow ={true}  currentPage ="profile"/>
                                <Notification />
                                {/* Website Mid Content */}
                                <Grid item xs={12} md={8}>
                                    <Grid className="profilePkg ">
                                        <Grid className="profilePkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="profileTabsUpr">
                                                <Tabs value={value} onChange={this.handleChangeTabs} className="profileTabs">
                                                    <Tab label={my_profile} className="aboutTabsIner" />
                                                    <Tab label={Security} className="aboutTabsIner" />
                                                    <Tab label={my_drs} className="aboutTabsIner" />
                                                    <Tab label={organ_donar} className="aboutTabsIner" />
                                                    <Tab label={right_management} className="aboutTabsIner" />
                                                    <Tab label={kyc} className="aboutTabsIner" />
                                                    <Tab label={date_time} className="aboutTabsIner" />
                                                </Tabs>
                                            </AppBar>
                                        </Grid>
                                        <Grid className="profilePkgIner2">
                                            {/* Start of MyProfile */}
                                            {value === 0 && <TabContainer>
                                                <ProfileSection />
                                            </TabContainer>}
                                            {/* End of MyProfile */}
                                            
                                            {/* Start of Security */}
                                            {value === 1 && <TabContainer>
                                                <SecuritySection user_token = {this.props.stateLoginValueAim.token} LoggedInUser={this.state.LoggedInUser} getUserData = {this.getUserData} />
                                            </TabContainer>}
                                            {/* End of Security */}

                                            {/* Start of MyDoctor */}
                                            {value === 2 && <TabContainer>
                                                <DoctorSection />
                                            </TabContainer>}
                                            {/* End of MyDoctor */}

                                             {/* Start of Organ Donor  */}
                                            {value === 3 && <TabContainer>
                                                <OrganSection tissue = {this.state.tissue && this.state.tissue}/>
                                            </TabContainer>}
                                            {/* End of Organ Donor */}

                                            {/* Start of Right Management */}
                                            {value === 4 && <TabContainer>
                                                <ManagementSection />
                                            </TabContainer>}
                                            {/* End of Right Management */}

                                            {/* Start of KYC */}
                                            {value === 5 && <TabContainer>
                                                <KycSection />
                                            </TabContainer>}
                                            {/* End of KYC */}

                                            {/* Start of DateTime */}
                                            {value === 6 && <TabContainer>
                                                <DateTimeSection timezones = {this.state.timezones} times={this.state.times && this.state.times} dates= {this.state.dates && this.state.dates} user_token = {this.props.stateLoginValueAim.token} LoggedInUser={this.state.LoggedInUser} getUserData = {this.getUserData}/>
                                            </TabContainer>}
                                            {/* End of DateTime */}
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
    const {settings} = state.Settings;
    const { verifyCode } = state.authy;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(Index));