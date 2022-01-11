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
        console.log("this.props?.House?.value", this.props?.House)
    }

    getStatistics = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/statisticstopinfo/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ Statistics: response.data.data });
                }
                this.setState({ loaderImage: false });
            });
    }

    getrightinfo = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/stasticsrightinfo/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    var finalData = response.data.data && response.data.data.length > 0 && response.data.data.filter((item) => item.step_name)
                    this.setState({ patientflow_data: finalData });
                }
                this.setState({ loaderImage: false });
            });
    }

    render() {
        const { stateLoginValueAim, House } = this.props;
        if (
            stateLoginValueAim.user === "undefined" ||
            stateLoginValueAim.token === 450 ||
            stateLoginValueAim.token === "undefined" ||
            stateLoginValueAim.user.type !== "adminstaff"
        ) {
            return <Redirect to={"/"} />;
        }
        if (House && House?.value === null) {
            return <Redirect to={"/VirtualHospital/space"} />;
        }
        let translate = getLanguage(this.props.stateLanguageType);
        let { Lastmonth, Examinations, Procedures, Appointments, WaitingRoom, EmergencyRoom, Observation, Statistics, TotalPatients,
            Doctors, Nurses, Oneh23min, AvgTimeToStayInHospital, threeM, sixM, oneY, All, ActivityCounter, AvgTimeOfStay, zeroh43min, zeroh18min, zeroh24min, twelvedays } = translate;
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
                             <LeftMenuMobile isNotShow={true} currentPage="more" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}


                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="more" />
                                </Grid>
                                {/* End of Menu */}

                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid className="topLeftSpc">
                                        <Grid item xs={12} md={12}>
                                        <Grid className="staticHeading"><h1>{Statistics}</h1></Grid>
                                        <Grid container direction="row" spacing={3}>
                                        <Grid item xs={12} md={6}> 
                                        <Grid container direction="row" className="staticsAmtUpr" spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Grid className="staticsAmt">
                                                    <Grid><a><img src={require('assets/virtual_images/hotel-bed-2.svg')} alt="" title="" /></a></Grid>
                                                    <Grid><label>{this.state.Statistics[0]}</label><p>{TotalPatients}</p></Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Grid className="staticsAmt">
                                                    <Grid><a><img src={require('assets/virtual_images/user-group-conversation.svg')} alt="" title="" /></a></Grid>
                                                    <Grid className="staticsAmtMid"><label>{this.state.Statistics[1]}</label><p>{Doctors}</p></Grid>
                                                    <Grid><label>{this.state.Statistics[2]}</label><p>{Nurses}</p></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                        <Grid  item xs={12} md={6}>
                                            <StatisticsPatientFlow
                                                step_name={"Patient Flow"}
                                                counts={this.state.patientflow_data}
                                            />
                                        </Grid>
                                        </Grid>
                                        
                                        </Grid>
                                    </Grid>
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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect })(
        Index
    )
);