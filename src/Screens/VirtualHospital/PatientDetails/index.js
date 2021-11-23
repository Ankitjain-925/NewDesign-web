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
import { get_cur_one, get_gender, get_track, delete_click_track, download_track } from "Screens/Components/CommonApi/index.js";
import { updateBlockchain } from "Screens/Components/BlockchainEntry/index.js";
import GraphView from "Screens/Components/TimelineComponent/GraphView/index";
import { confirmAlert } from "react-confirm-alert";
import {
    getLanguage
} from "translations/index"
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
            valueMob: 0,
            current_select: "diagnosis",
            updateOne: 0,
            updateTrack: {},
            cur_one: {},
            personalinfo: {},
            added_data: [],
            allTrack: [],
            allTrack1: [],
            allTrack2: [],
            Sort: "diagnosed_time",
            isGraph: false,
            current_Graph: "",
            upcoming_appointment: [],
            SARS: [],
            Positive_SARS: [],
            vaccinations: [],
            defaultValue: 20,
            loading: false,
        };
    }

    componentDidMount = () => {
        if (this.props.location.search) {
            var data = this.props.location.search === '?view=4' ? 3 : 0;
            this.handleChangeTab('', data);
            this.handleChangeTabMob('', data);
        }
        this.cur_one();
        this.getPesonalized();
        this.getUpcomingAppointment();
        this.rightInfo();
    }

    handleChangeTab = (event, value) => {
        this.setState({ value });
    };
    handleChangeTabMob = (event, valueMob) => {
        this.setState({ valueMob });
    };

    getUpcomingAppointment() {
        var user_token = this.props.stateLoginValueAim.token;
        axios
            .get(sitedata.data.path + "/UserProfile/UpcomingAppintmentPat/6124d4b92a3d8b47fbb03d03", commonHeader(user_token))
            .then((response) => {
                var upcomingData =
                    response.data.data &&
                    response.data.data.length > 0 &&
                    response.data.data.filter(
                        (data) => data.status !== "cancel" && data.status !== "remove"
                    );
                this.setState({ upcoming_appointment: upcomingData });
            });
    }

    OpenGraph = (current_Graph) => {
        this.setState({ current_Graph: current_Graph, isGraph: true });
    };

    //For Close the Graphs
    CloseGraph = () => {
        this.rightInfo();
        this.getTrack();
        this.setState({ isGraph: false });
    };

    //For get the Track
    getTrack = async () => {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true });
        let response = await get_track(user_token, user_id)
        if (response?.data?.hassuccessed === true) {
            //This is for Aimedis Blockchain Section
            updateBlockchain(
                this.props.stateLoginValueAim.user,
                response.data.data
            );
            var images = [];
            response.data.data = response.data.data.filter((e) => e != null);

            this.rightInfo();
            this.setState({
                allTrack1: response.data.data,
                allTrack2: response.data.data,
                loaderImage: false,
                // defaultValue : 10,
            },
                () => { this.Showdefaults(this.state.allTrack2, this.state.defaultValue) });
        } else {
            this.setState({ allTrack1: [], allTrack2: [], allTrack: [], loaderImage: false });
        }
    };

    //For getting the existing settings
    getPesonalized = () => {
        this.setState({ loaderImage: true });
        axios
            .get(sitedata.data.path + "/UserProfile/updateSetting/6124d4b92a3d8b47fbb03d03", commonHeader(this.props.stateLoginValueAim.token))
            .then((responce) => {
                if (
                    responce.data.hassuccessed &&
                    responce.data.data &&
                    responce.data.data.personalized &&
                    responce.data.data.personalized.length > 0
                ) {
                    this.setState({ added_data: responce.data.data.personalized });
                } else {
                    this.setState({ added_data: [] });
                }
                this.setState({ loaderImage: false });
            });
    };

    //Move to Appointment Page
    MoveAppoint = () => {
        this.props.history.push("/virtualHospital/calendar");
    };

    //Select type for the new Entry
    SelectOption = (value) => {
        this.setState({ current_select: value }, () => {
            this.handleaddInqryNw();
        });
    };

    //Get the RIGHT INFO
    rightInfo() {
        var user_token = this.props.stateLoginValueAim.token;
        axios
            .get(sitedata.data.path + "/rightinfo/patient/6124d4b92a3d8b47fbb03d03",
                commonHeader(user_token))
            .then((response) => {
                this.setState({ personalinfo: response.data.data });
            });
    }

    //Get the Current User Profile
    cur_one = async () => {
        var user_token = this.props.stateLoginValueAim.token;
        let user_id = this.props.stateLoginValueAim.user._id;
        let response = await get_cur_one(user_token, "6124d4b92a3d8b47fbb03d03")
        this.setState({ cur_one: response?.data?.data });
    };

    //This is for the Download the Track
    downloadTrack = async (data) => {
        this.setState({ loaderImage: true });
        let response = await download_track(data, this.props.stateLoginValueAim)
        setTimeout(() => {
            this.setState({ loaderImage: false });
        }, 5000)
    };

    //Delete the perticular track confirmation box
    DeleteTrack = (deletekey) => {
        let translate = getLanguage(this.props.stateLanguageType)
        let { delete_item, ok, do_u_really_want_delete_item, yes, no } = translate;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode === "dark"
                                ? "dark-confirm react-confirm-alert-body"
                                : "react-confirm-alert-body"
                        }
                    >
                        <h1>{delete_item}</h1>
                        <p>{do_u_really_want_delete_item}</p>
                        <div className="react-confirm-alert-button-group">
                            <button
                                onClick={() => {
                                    this.deleteClickTrack(deletekey);
                                    onClose();
                                }}
                            >
                                {yes}
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                {no}
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };

    render() {
        const { value } = this.state;
        const { valueMob } = this.state;
        let translate = getLanguage(this.props.stateLanguageType)
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
                                    <LeftPatientData
                                        upcoming_appointment={this.state.upcoming_appointment}
                                        OpenGraph={this.OpenGraph}
                                        date_format={
                                            this.props.settings &&
                                            this.props.settings.setting &&
                                            this.props.settings.setting.date_format
                                        }
                                        time_format={
                                            this.props.settings &&
                                            this.props.settings.setting &&
                                            this.props.settings.setting.time_format
                                        }
                                        from="patient"
                                        added_data={this.state.added_data}
                                        MoveAppoint={this.MoveAppoint}
                                        SelectOption={this.SelectOption}
                                        personalinfo={this.state.personalinfo}
                                        loggedinUser={this.state.cur_one}
                                        downloadTrack={(data) => this.downloadTrack(data)}
                                        DeleteTrack={(deleteKey) => this.DeleteTrack(deleteKey)} />
                                </Grid>

                                {this.state.isGraph && (
                                    <GraphView
                                        date_format={
                                            this.props.settings &&
                                            this.props.settings.setting &&
                                            this.props.settings.setting.date_format
                                        }
                                        time_format={
                                            this.props.settings &&
                                            this.props.settings.setting &&
                                            this.props.settings.setting.time_format
                                        }
                                        personalinfo={this.state.personalinfo}
                                        current_Graph={this.state.current_Graph}
                                        CloseGraph={this.CloseGraph}
                                    />
                                )}
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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect })(
        Index
    )
);