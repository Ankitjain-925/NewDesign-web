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
import { confirmAlert } from "react-confirm-alert"; // Import
import { translationRS } from 'translations/index';
import {
    getLanguage
} from "translations/index"
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
            hope: false,
            openDate: true,
            specilaityList: [],
            assignedTo: [],
            selectSpec: {},
            Open: 0,
            doneToday: 0,
            AllTasks :[],
            DoneTask : [],
        };
    }

    componentDidMount() { 
        this.getAddTaskData();
        this.getPatientData();
        this.getProfessionalData();
        this.specailityList();
    }

    //to get the speciality list 
    specailityList = () => {
        var spec = this.props.speciality?.SPECIALITY && this.props?.speciality?.SPECIALITY.length > 0 && this.props?.speciality?.SPECIALITY.map((data) => {
            return { label: data.specialty_name, value: data._id }
        })
        this.setState({ specilaityList: spec })
    }
    // open model Add Task
    handleOpenTask = () => {
        this.setState({ openTask: true, newTask: {}, assignedTo: [], q: '', selectSpec: {} });
    }
    // close model Add Task
    handleCloseTask = () => {
        this.setState({ openTask: false });
    }
    handleChangeTab = (event, tabvalue) => {
        this.setState({ tabvalue });
    };
    handleChangeTab2 = (event, tabvalue2) => {
        if (tabvalue2 == 3) {
            this.getArchived();
        }
        this.setState({ tabvalue2 });
    };
    // open model Assign
    handleOpenAssign = () => {
        this.setState({ openAssign: true });
    }
    // close model Assign
    handleCloseAssign = () => {
        this.setState({ openAssign: false });
    }
    // submit Assign model
    handleAssignSubmit = () => {
        const state = this.state.newTask;
        state['assinged_to'] = this.state.professional_data;
        this.setState({ newTask: state });
    };

    createDuplicate = (data) => {
        delete data._id;
        data.archived = false;
        this.setState({ newTask: data })

    }

    //User list will be show/hide
    toggle = () => {
        this.setState({
            shown: !this.state.shown
        });
    }

    // submit Task model
    handleTaskSubmit = () => {
        var data = this.state.newTask
        if (this.state.fileupods) {
            data.attachments = this.state.fileattach
        }
        data.house_id = this.props?.House?.value
        this.setState({ loaderImage: true })
        if (this.state.newTask._id) {
            axios
                .put(
                    sitedata.data.path + "/vh/AddTask/" + this.state.newTask._id,
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    this.setState({ loaderImage: false })
                    if (responce.data.hassuccessed) {
                        this.setState({ newTask: {}, fileattach: {}, professional_data: [], fileupods: false, assignedTo: [], q: '', selectSpec: {} });
                        this.getAddTaskData();
                    }
                });
        }
        else {
            data.done_on = ''
            data.priority = 0
            data.archived = false
            data.status = 'open'

            axios
                .post(
                    sitedata.data.path + "/vh/AddTask",
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {


                    this.setState({ loaderImage: false })

                    if (responce.data.hassuccessed) {
                        let patient_id = data && data?.patient_id
                        console.log("id is:- ",patient_id)
                        let id = this.props && this.props?.settings && this.props?.settings?.setting && this.props?.settings?.setting?.user_id
                        let url = sitedata.data.path + `/User/AddTrack/${patient_id}`
                        if ((data?.hidePatient == "false") || (!data.hidePatient)) {
                            let newDate = new Date();
                            data["created_by"] = id
                            data["public"] = "always"
                            data["publicdatetime"] = null
                            data["visible"] = "show"
                            data["type"] = "task"
                            data["datetime_on"] = newDate
                            data["created_on"] = newDate
                            axios.put(
                                url,
                                {data: data},
                                commonHeader(this.props.stateLoginValueAim.token)
                            ).then(res => {
                                // let response = JSON.parse(res)
                                console.log("welcome")
                            })
                                .catch(function (error) {
                                    console.log("error", error)
                                })
                        }
                        this.setState({ newTask: {}, fileattach: {}, professional_data: [], fileupods: false, assignedTo: [], q: '', selectSpec: {} });
                        this.getAddTaskData();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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
        this.setState({ assignedTo: e },
            () => {
                var data = e?.length > 0 && e.reduce((last, current, index) => {
                    let isProf = this.state.professionalArray?.length > 0 && this.state.professionalArray.filter((data, index) => data.user_id === current.value);
                    if (isProf && isProf.length > 0) {
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
    deleteClickTask = (id) => {
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
        var assignedTo = data?.assinged_to?.length > 0 && data?.assinged_to.map((data) => {
            var name = '';
            if (data?.first_name && data?.last_name) {
                name = data?.first_name + ' ' + data?.last_name
            }
            else if (data?.first_name) {
                name = data?.first_name
            }
            return { label: name, value: data._id }
        })
        var pat1name = '';
        if (data?.patient?.first_name && data?.patient?.last_name) {
            pat1name = data?.patient?.first_name + ' ' + data?.patient?.last_name
        }
        else if (data?.first_name) {
            pat1name = data?.patient?.first_name
        }
        this.setState({ newTask: data, openTask: true, assignedTo: assignedTo, q: pat1name, selectSpec: { label: data?.speciality?.specialty_name, value: data?.speciality?._id } });
    };

    // Get the Professional data
    getProfessionalData = () => {
        var professionalList = [], professionalList1 = [],
            professionalArray = [];
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/hospitaladmin/GetProfessional/" + this.props?.House?.value,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ allProfData: response.data.data })
                    // var images = [];
                    for (let i = 0; i < this.state.allProfData.length; i++) {
                        var name = '';
                        if (this.state.allProfData[i]?.first_name && this.state.allProfData[i]?.last_name) {
                            name = this.state.allProfData[i]?.first_name + ' ' + this.state.allProfData[i]?.last_name
                        }
                        else if (this.state.allProfData[i]?.first_name) {
                            name = this.state.allProfData[i]?.first_name
                        }
                        professionalArray.push({
                            first_name: this.state.allProfData[i].first_name,
                            last_name: this.state.allProfData[i].last_name,
                            user_id: this.state.allProfData[i]._id,
                            profile_id: this.state.allProfData[i].profile_id,
                            alies_id: this.state.allProfData[i].alies_id,
                            image: this.state.allProfData[i].image
                        })
                        professionalList.push({ value: this.state.allProfData[i]._id, label: name })
                        // professionalList1.push({ profile_id: this.state.allProfData[i].profile_id, value: this.state.allProfData[i]._id, label: name })
                    }
                    this.setState({ loaderImage: false, professionalArray: professionalArray, professional_id_list: professionalList })
                }
                else {
                    this.setState({ loaderImage: false })
                }
            });

    };

    myColor =(position) => {
        if (this.state.active === position) {
            return "#00a891";
        }
        return "";
    }

    color=(position)=> {
        if (this.state.active === position) {
            return "white";
        }
        return "";
    }

    onClick = () => {
        this.setState({ hope: true });
    }

    //On Changing the specialty id 
    onFieldChange = (e) => {
        const state = this.state.newTask;
        this.setState({ selectSpec: e })
        var speciality = this.props.speciality?.SPECIALITY && this.props?.speciality?.SPECIALITY.length > 0 && this.props?.speciality?.SPECIALITY.filter((data) => data._id === e.value)
        if (speciality && speciality.length > 0) {
            state['speciality'] = {
                background_color: speciality[0]?.background_color,
                color: speciality[0]?.color,
                specialty_name: speciality[0]?.specialty_name,
                _id: speciality[0]?._id
            };
            this.setState({ newTask: state });
        }
    }

    openTaskTime = () => {
        this.setState({ openDate: !this.state.openDate })
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { Tasks_overview, Open, Donetoday, CreateaTask, ForPatient, Taskdescription, Assignedto, Speciallity, Dueon, Duplicate, Archive, Markasdone, Attachments } = translate;
        const { tabvalue, tabvalue2, professional_data, newTask, AllTasks } = this.state;
        const userList = this.state.filteredUsers && this.state.filteredUsers.map(user => {
            return (
                <li key={user.id} style={{ background: this.myColor(user.id), color: this.color(user.id) }} value={user.profile_id}
                    onClick={() => { this.setState({ q: user.name, selectedUser: user }); this.updateEntryState2(user); this.toggle(user.id); this.setState({ filteredUsers: [] }) }}
                >{user.name} ( {user.profile_id} )</li>
            )
        });

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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy, houseSelect, Speciality })(
        Index
    )
);