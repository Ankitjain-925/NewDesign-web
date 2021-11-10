import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import TaskSectiuonVH from "Screens/Components/VirtualHospitalComponents/TaskSectionVH";
import { Speciality } from "Screens/Login/speciality.js";

var patientArray = [];

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
            ArchivedTasks: [],
            loaderImage: false,
            Open: 0,
            doneToday: 0,
            AllTasks :[],
            DoneTask : [],
        };
    }

    componentDidMount() { 
        this.getAddTaskData();
    }

    //User list will be show/hide
    toggle = () => {
        this.setState({
            shown: !this.state.shown
        });
    }

    //Get Archived
    getArchived = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/GetAllArchivedTask/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ ArchivedTasks: response.data.data, tabvalue2: 3 });
                }
                this.setState({ loaderImage: false });
            });
    }

    //get Add task data
    getAddTaskData = () => {
        this.setState({ loaderImage: true });
        axios
<<<<<<< HEAD
            .get(
                sitedata.data.path + "/vh/GetAllTask/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ AllTasks: response.data.data })
                if (response.data.hassuccessed) {
                    var Done = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "done")
                    var Open = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "open")
                    this.setState({ AllTasks: response.data.data, DoneTask: Done, OpenTask: Open })
                }
                this.setState({ loaderImage: false });
                 
            });
    };

    // For adding a date,time
    updateEntryState1 = (value, name) => {
        var due_on = this.state.newTask?.due_on ? this.state.newTask?.due_on : {};
        const state = this.state.newTask;
        if (name === 'date' || name === 'time') {
            due_on[name] = value;
            state['due_on'] = due_on;
        }
        else {
            state[name] = value;
        }
        this.setState({ newTask: state });
    };

    //Switch status done / open
    switchStatus = () => {
        const state = this.state.newTask;
        state['status'] = state.status === 'done' ? 'open' : 'done';
        this.setState({ newTask: state });
    }
    //Select the patient name
    updateEntryState2 = (user) => {
        var user1 = this.state.users?.length > 0 && this.state.users.filter((data) => data.user_id === user.value)
        if (user1 && user1.length > 0) {
            const state = this.state.newTask;
            state['patient'] = user1[0]
            state['patient_id'] = user1[0].user_id
            state['case_id'] = user1[0].case_id
            this.setState({ newTask: state })
        }
    }

    //Select the professional name
    updateEntryState3 = (e) => {
         this.setState({assignedTo: e}, 
            ()=>{
                var data = e?.length>0 && e.reduce(( last, current, index )=> {
                    let isProf = this.state.professionalArray?.length > 0 && this.state.professionalArray.filter((data, index) => data.user_id === current.value);
                    if(isProf && isProf.length>0){
                        last.push(isProf[0]);
                    }
                    return last;
                  }, []);
                const state = this.state.newTask;
                state['assinged_to'] = data;
                this.setState({ newTask: state });
            })
    } 

    // Delete Professional from the
    deleteProf = (index) => {
        var ProfAy = this.state.professional_data?.length > 0 && this.state.professional_data.filter((data, index1) => index1 !== index);
        this.setState({ professional_data: ProfAy });
        this.setState({ ProfMessage: false });
    };

    //Change the UserList
    onChange = (event) => {
        const q = event.target.value.toLowerCase();
        this.setState({ q }, () => this.filterList());
    }

    // Get the Patient data
    getPatientData = () => {
        var patientArray = [], PatientList1 = [];
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/getPatientFromVH/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ allPatData: response.data.data })
                    // var images = [];
                    for (let i = 0; i < this.state.allPatData.length; i++) {
                        var find = this.state.allPatData[i].patient?.image;
                        var name = '';
                        if (this.state.allPatData[i]?.patient?.first_name && this.state.allPatData[i]?.patient?.last_name) {
                            name = this.state.allPatData[i]?.patient?.first_name + ' ' + this.state.allPatData[i]?.patient?.last_name
                        }
                        else if (this.state.allPatData[i].patient?.first_name) {
                            name = this.state.allPatData[i].patient?.first_name
                        }

                        patientArray.push({
                            last_name: this.state.allPatData[i].patient?.last_name,
                            user_id: this.state.allPatData[i].patient?.patient_id,
                            image: this.state.allPatData[i].patient?.image,
                            first_name: this.state.allPatData[i].patient?.first_name,
                            profile_id: this.state.allPatData[i].patient?.profile_id,
                            type: this.state.allPatData[i].patient?.type,
                            case_id: this.state.allPatData[i]._id
                        })
                        // PatientList.push({ value: this.state.allPatData[i]._id, label: name })

                        PatientList1.push({ profile_id: this.state.allPatData[i].patient?.profile_id, value: this.state.allPatData[i].patient?.patient_id, name: name })
                    }
                    this.setState({ users1: PatientList1, users: patientArray })
                }
                this.setState({ loaderImage: false });
            });

    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ users: nextProps.users, filteredUsers: nextProps.users }, () => this.filterList());
    // }

    filterList = () => {
        let users = this.state.users1;
        let q = this.state.q;
        users = users && users.length > 0 && users.filter(function (user) {
            return (user.name.toLowerCase().indexOf(q) != -1 || user.profile_id.toLowerCase().indexOf(q) != -1);
            // return  // returns true or false
        });
        this.setState({ filteredUsers: users });
        if (this.state.q == '') {
            this.setState({ filteredUsers: [] });
        }
    }

    //Delete the perticular service confirmation box
    removeTask = (id) => {
        this.setState({ message: null, openTask: false });
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "dark-confirm react-confirm-alert-body"
                                : "react-confirm-alert-body"
                        }
                    >

                        <h1>Remove the Task ?</h1>
                        <p>Are you sure to remove this Task?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteClickTask(id);
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            },
        });
    };
    deleteClickTask(id) {
        this.setState({ loaderImage: true });
        axios
            .delete(sitedata.data.path + "/vh/AddTask/" + id, commonHeader(this.props.stateLoginValueAim.token))
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.getAddTaskData();
                }
                this.setState({ loaderImage: false });

            })
            .catch((error) => { });
    }
    // open Edit model
    editTask = (data) => {
        var assignedTo = data?.assinged_to?.length>0 && data?.assinged_to.map((data)=>{
            var name = '';
            if (data?.first_name && data?.last_name) {
                name = data?.first_name + ' ' + data?.last_name
            }
            else if (data?.first_name) {
                name = data?.first_name
=======
        .get(
            sitedata.data.path + "/vh/GetAllTask/" + this.props?.House?.value,
            commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((response) => {
            this.setState({ AllTasks: response.data.data })
            if (response.data.hassuccessed) {
                var Done = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "done")
                var Open = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "open")
                var GetDate = response.data.data?.length > 0 && response.data.data.filter((item) => {
                    var d1 = (new Date(item.done_on)).setHours(0, 0, 0, 0);
                    var d2 = (new Date()).setHours(0, 0, 0, 0);
                    return (d1===d2);
                })
                this.setState({ AllTasks: response.data.data, DoneTask: Done, OpenTask: Open, Open: Open?.length, doneToday : GetDate?.length })
>>>>>>> 0541ddb958f2ab176af4b3a75ac9d7188c63147a
            }
            this.setState({ loaderImage: false });
        });
    };


    render() {
        let {Tasks_overview, Open, Donetoday, } = this.state;
        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="task" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="task" />
                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={12} md={11}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={2} className="tskOverWeb">
                                            <Grid className="tskOverView">
                                                <h1>{Tasks_overview}</h1>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>{"Open"}</label>
                                                    <p>{this.state.Open}</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>{"Done today"}</label>
                                                    <p>{this.state.doneToday}</p>
                                                </Grid>
                                                <Grid className="showArchiv"><p onClick={() => { this.getArchived() }}><a>Show archived tasks</a></p></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <TaskSectiuonVH getArchived={()=>this.getArchived()} getAddTaskData={()=>{this.getAddTaskData()}} AllTasks={this.state.AllTasks} DoneTask={this.state.DoneTask} OpenTask={this.state.OpenTask} ArchivedTasks={this.state.ArchivedTasks} tabvalue2={this.state.tabvalue2}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Right Section */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
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
    const { speciality } = state.Speciality;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House,
        settings,
        verifyCode,
        speciality
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect,  Speciality })(
        Index
    )
);