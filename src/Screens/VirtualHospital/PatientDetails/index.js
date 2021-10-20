import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LeftPatientData from 'Screens/Components/VirtualHospitalComponents/LeftPatientData';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import PatientJournal from 'Screens/Components/VirtualHospitalComponents/PatientTabsContent/patient-journal';
import PatientTasks from 'Screens/Components/VirtualHospitalComponents/PatientTabsContent/patient-tasks';
import PatientDocuments from 'Screens/Components/VirtualHospitalComponents/PatientTabsContent/patient-documents';
import PatientPersonalInfo from 'Screens/Components/VirtualHospitalComponents/PatientTabsContent/patient-personalinfo';
import PatientRoom from 'Screens/Components/VirtualHospitalComponents/PatientTabsContent/patient-room';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import {
    commonHeader,
    commonCometDelHeader,
  } from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import { Redirect, Route } from 'react-router-dom';

function TabContainer(props) {
    return (
        <Typography component="div">
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
            value: 0,
            valueMob: 0
        };
    }

    componentDidMount =()=>{
        if(this.props.location.search){
            var data = this.props.location.search === '?view=4' ? 3 : 0 ;
            this.handleChangeTab('', data);
            this.handleChangeTabMob('', data);
        }
    }
    
    handleChangeTab = (event, value) => {
        this.setState({ value });
    };
    handleChangeTabMob = (event, valueMob) => {
        this.setState({ valueMob });
    };
    render() {
        const { value } = this.state;
        const { valueMob } = this.state;
        return (
            <Grid className={
                this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark"
                  ? "homeBg darkTheme"
                  : "homeBg"
              }>
                <Grid className="homeBgIner vh-section">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            
                        <LeftMenuMobile isNotShow={true} currentPage="chat" />
                        <Grid className="tskTabsMob">
                                <AppBar position="static" className="tskTabs">
                                    <Tabs value={valueMob} onChange={this.handleChangeTabMob}>
                                        <Tab label="Overview" className="tsktabIner tsktabInerMob" />
                                        <Tab label="Journal" className="tsktabIner" />
                                        <Tab label="Tasks" className="tsktabIner" />
                                        <Tab label="Documents / Files" className="tsktabIner" />
                                        <Tab label="Room" className="tsktabIner" />
                                        <Tab label="Personal info" className="tsktabIner" />
                                    </Tabs>
                                </AppBar>
                            </Grid>
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Mid Section */}
                                <Grid item xs={11} md={4} className="LeftPatientDataWeb">
                                    <LeftPatientData />
                                </Grid>
                                {/* End of Mid Section */}
                                {/* Start of Right Section */}
                                <Grid item xs={11} md={7}>
                                    {/* Tabs Content */}
                                    <Grid className="tskTabsweb">
                                        <AppBar position="static" className="tskTabs">
                                            <Tabs value={value} onChange={this.handleChangeTab}>
                                                <Tab label="Journal" className="tsktabIner" />
                                                <Tab label="Tasks" className="tsktabIner" />
                                                <Tab label="Documents / Files" className="tsktabIner" />
                                                <Tab label="Personal info" className="tsktabIner" />
                                            </Tabs>
                                        </AppBar>
                                    </Grid>
                                    <div className="TabContainerWeb">
                                        {value === 0 && <TabContainer>
                                            <PatientJournal />
                                        </TabContainer>}
                                        {value === 1 && <TabContainer>
                                            <PatientTasks />
                                        </TabContainer>}
                                        {value === 2 && <TabContainer>
                                            <PatientDocuments />
                                        </TabContainer>}
                                        {/* {value === 3 && <TabContainer>
                                            <PatientRoom />
                                        </TabContainer>} */}
                                        {value === 3 && <TabContainer>
                                            <PatientPersonalInfo />
                                        </TabContainer>}
                                    </div>
                                    <div className="TabContainerMob">
                                        {valueMob === 0 && <TabContainer>{
                                            <LeftPatientData />
                                        }</TabContainer>}
                                        {valueMob === 1 && <TabContainer>
                                            <PatientJournal />
                                        </TabContainer>}
                                        {valueMob === 2 && <TabContainer>
                                            <PatientTasks />
                                        </TabContainer>}
                                        {valueMob === 3 && <TabContainer>
                                            <PatientDocuments />
                                        </TabContainer>}
                                        {/* {valueMob === 4 && <TabContainer>
                                            <PatientRoom />
                                        </TabContainer>} */}
                                        {valueMob === 4 && <TabContainer>
                                            <PatientPersonalInfo />
                                        </TabContainer>}
                                    </div>
                                    {/* End of Tabs Content */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
      state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    return {
      stateLanguageType,
      stateLoginValueAim,
      loadingaIndicatoranswerdetail,
      House,
      settings,
      verifyCode,
    };
  };
  export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings,authy, houseSelect })(
      Index
    )
  );