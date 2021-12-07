import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import TotalPatientView from "Screens/Components/VirtualHospitalComponents/TotalPatientView/index";
import StatisticsPatientFlow from "Screens/Components/VirtualHospitalComponents/StatisticsPatientFlow/index";
import StatisticsStaffAction from "Screens/Components/VirtualHospitalComponents/StatisticsStaffAction/index";
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
import {
    getLanguage
} from "translations/index"


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
            selectedCountry: null,
            date: new Date(),
            tabvalue: 0,
            patientflow_data: [],
            Statistics: {},
            rightinfo: [],    
            

        }
    };
    handleChangeTab = (event, tabvalue) => {
        this.setState({ tabvalue });
    };

    
    

    componentDidMount() {
        this.getStatistics();
        this.getrightinfo();
    }

    getStatistics = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/statisticstopinfo/600c15c2c983431790f904c3-1627046889451",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ Statistics: response.data.data });
                    console.log("statistics", this.state.Statistics)
                }
                this.setState({ loaderImage: false });
            });
    }

    getrightinfo = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/stasticsrightinfo/600c15c2c983431790f904c3-1627046889451",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ patientflow_data: response.data.data });
                    console.log("info", this.state.patientflow_data)

                }
                this.setState({ loaderImage: false });
            });
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Lastmonth, Examinations, Procedures, Appointments, WaitingRoom, EmergencyRoom, Observation } = translate;
        const { tabvalue } = this.state;
        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            {/* Mobile menu */}
                            <LeftMenuMobile isNotShow={true} currentPage="chat" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="chat" />
                                </Grid>
                                {/* End of Menu */}

                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        <Grid item xs={12} md={12}>
                                            <Grid className="staticHeading"><h1>Statistics</h1></Grid>

                                            <Grid container direction="row" spacing={3}>
                                                <Grid item xs={12} md={9}>
                                                    <Grid container direction="row" className="staticsAmtUpr" spacing={3}>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <Grid className="staticsAmt">
                                                                <Grid><a><img src={require('assets/virtual_images/hotel-bed-2.svg')} alt="" title="" /></a></Grid>
                                                                <Grid><label>1,845</label><p>Total Patients</p></Grid>
                                                            </Grid>
                                                        </Grid> */}

                                                        <TotalPatientView />

                                                        <Grid item xs={12} md={4}>
                                                            <Grid>
                                                                <Grid className="staticsAmt">
                                                                    <Grid><a><img src={require('assets/virtual_images/user-group-conversation.svg')} alt="" title="" /></a></Grid>
                                                                    <Grid className="staticsAmtMid"><label>34</label><p>Doctors</p></Grid>
                                                                    <Grid><label>72</label><p>Nurses</p></Grid>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <Grid className="staticsAmt">
                                                                <Grid><a><img src={require('assets/virtual_images/timecheck.svg')} alt="" title="" /></a></Grid>
                                                                <Grid><label>1h 23min</label><p>Avg. Time of Stay in Hospital</p></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* <Grid className="modeChngUpr">
                                                        <Grid className="staffAction">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={12} md={5}><h3>Staff actions</h3></Grid>
                                                                <Grid item xs={12} md={7}>
                                                                    <Grid className="staffLastMnth">
                                                                        <label>Last month</label>
                                                                        <a>3m</a>
                                                                        <a>6m</a>
                                                                        <a>1y</a>
                                                                        <a>All</a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container direction="row">
                                                            <Grid className="modeChng">
                                                                <Grid><a><img src={require('assets/virtual_images/user-clipboard.svg')} alt="" title="" /></a></Grid>
                                                                <Grid>
                                                                    <label>34</label>
                                                                    <p>Diagnoses made</p>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="modeChng">
                                                                <Grid><a><img src={require('assets/virtual_images/user-clipboard.svg')} alt="" title="" /></a></Grid>
                                                                <Grid>
                                                                    <label>72</label>
                                                                    <p>Medication administered</p>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="modeChng">
                                                                <Grid><a><img src={require('assets/virtual_images/user-clipboard.svg')} alt="" title="" /></a></Grid>
                                                                <Grid>
                                                                    <label>42</label>
                                                                    <p>Prescriptions issued</p>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid> */}

                                                    <StatisticsStaffAction />

                                                    <Grid className="staffGraphUpr">
                                                        <Grid className="staffGraph">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={12} md={6}>
                                                                    <AppBar position="static" className="invoicHsptal">
                                                                        <Tabs value={tabvalue} onChange={this.handleChangeTab}>
                                                                            <Tab label="Invoice amount" className="invoicHsptalIner" />
                                                                            <Tab label="Patients in Hospital" className="invoicHsptalIner" />
                                                                        </Tabs>
                                                                    </AppBar>
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <Grid className="invoicLastMnth">
                                                                        <label>{Lastmonth}</label><a>3m</a><a>6m</a><a>1y</a><a>All</a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className="staffGraphCntnt">
                                                            {tabvalue === 0 && <TabContainer>
                                                                <Grid className="invoicHsptalData">
                                                                    <img src={require('assets/virtual_images/statisticsImg.jpg')} alt="" title="" />
                                                                </Grid>
                                                            </TabContainer>}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={12} md={3}>
                                                    {/* <Grid className="patntFlow">
                                                        <p>Patients in Flow</p>
                                                        <Grid className="patntFlowIner">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>Reception</label></Grid>
                                                                <Grid item xs={4} md={4}><span>2</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>Waiting Rooms</label></Grid>
                                                                <Grid item xs={4} md={4}><span>16</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>Waiting Rooms</label></Grid>
                                                                <Grid item xs={4} md={4}><span>16</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center" className="patntFlowLast">
                                                                <Grid item xs={8} md={8}><label>Billing</label></Grid>
                                                              <Grid item xs={4} md={4}><span>0</span></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid> */}

                                                    {/* {this.state.patientflow_data?.length > 0 && this.state.patientflow_data?.map((data) => ( */}
                                                        
                                                      
                                                        <>
                                                        {/* <p>{data.step_name}</p> */}
                                                            <StatisticsPatientFlow 

                                                                   step_name={"Patient Flow"}
                                                                 counts={this.state.patientflow_data} 
                                                               


                                                             />,
                                                             {/* { console.log('data',data)}   */}
                                                            {/* { console.log('data.heading',data.heading)}  */}

                                                        </>
                                                        
                                                    {/* ))} */}

                                                    <Grid className="patntFlow">
                                                        <p>Activity Counter</p>
                                                        <Grid className="actvtyFilter">
                                                            <a>Last month</a><a>3m</a><a>6m</a><a>1y</a><a>All</a>
                                                        </Grid>
                                                        <Grid className="patntFlowIner">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>{Examinations}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>16</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>{Procedures}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>28</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center" className="patntFlowLast">
                                                                <Grid item xs={8} md={8}><label>{Appointments}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>71</span></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="patntFlow">
                                                        <p>Avg. Time of stay</p>
                                                        <Grid className="patntFlowIner">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>{WaitingRoom}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>0 h 43 min</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>{EmergencyRoom}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>0 h 18 min</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} md={8}><label>{Examinations}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>0 h 24 min</span></Grid>
                                                            </Grid>
                                                            <Grid container direction="row" alignItems="center" className="patntFlowLast">
                                                                <Grid item xs={8} md={8}><label>{Observation}</label></Grid>
                                                                <Grid item xs={4} md={4}><span>12 days</span></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Right Section */}
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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect })(
        Index
    )
);