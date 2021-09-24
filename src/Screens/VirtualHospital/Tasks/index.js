import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index";
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import sitedata from "sitedata";
import {
    commonHeader,
    commonCometDelHeader,
} from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "../Institutes/selecthouseaction";
import { Redirect, Route } from 'react-router-dom';
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import Select from 'react-select';
import { confirmAlert } from "react-confirm-alert";
import { S3Image } from "Screens/Components/GetS3Images/index";
import TaskView from 'Screens/Components/VirtualHospitalComponents/TaskView/index';
import Loader from "Screens/Components/Loader/index";

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

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
            openTask: false,
            tabvalue: 0,
            tabvalue2: 0,
            q: '',
            selectedUser: '',
            professional_data: [],
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            patient_doc: [],
            patient_doc1: [],
            patient_id_list: [],
            patient_id_list1: [],
            allPatData: [],
            allPatData1: [],
            users: [],
            users1: [],
            openAssign: false,
            newStaff: {},
            ProfMessage: false,
            newTask: {},
            Fileadd: '',
            AllTasks: {},
            shown: false,
            professionalArray: [],
            ArchivedTasks: [],
            loaderImage: false,
            hope: false,
            openDate: true,
            openTime: false,
            button: 'Add time',
            options:[
                { value: 'data1', label: 'Data1' },
                { value: 'data2', label: 'Data2' },
                { value: 'data3', label: 'Data3' },
            ]
        };
    }

    componentDidMount() {
        this.getAddTaskData();
    }
    // open model Add Task
    handleOpenTask = () => {
        this.getPatientData();
        this.setState({ openTask: true, newTask: {} });
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
        this.getProfessionalData();
        this.setState({ openAssign: true });
    }
    // close model Assign
    handleCloseAssign = () => {
        this.setState({ openAssign: false });
    }
    // submit Assign model
    handleAssignSubmit = () => {
        const state = this.state.newTask;
        state['assigned_to'] = this.state.professional_data;
        this.setState({ newTask: state });
    };

    createDuplicate = (data) => {
        delete data._id;
        data.archived = false;
        this.setState({ newTask: data })

    }
    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
            // newTask : Fileadd

        });
    };

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
                        this.setState({ newTask: {}, fileattach: {}, professional_data: [], fileupods: false });
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
                        this.setState({ newTask: {}, fileattach: {}, professional_data: [], fileupods: false })
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
            sitedata.data.path + "/vh/GetAllArchivedTask/"+ this.props?.House?.value,
            commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((response) => {
            if(response.data.hassuccessed){
                this.setState({ArchivedTasks:  response.data.data,  tabvalue2: 3 });
            }
            this.setState({loaderImage: false });
        });
    }

    // get Add task data
    getAddTaskData = () => {
        this.setState({ loaderImage: true });
        axios
        .get(
            sitedata.data.path + "/vh/GetAllTask/"+ this.props?.House?.value,
            commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((response) => {
            this.setState({ AllTasks: response.data.data })
            if(response.data.hassuccessed){
                var Done = response.data.data?.length>0 && response.data.data.filter((item) => item.status==="done")
                var Open = response.data.data?.length>0 && response.data.data.filter((item) => item.status==="open")
                this.setState({AllTasks:  response.data.data, DoneTask : Done, OpenTask: Open})
            }
            this.setState({loaderImage: false });
        });
    };

    // For adding a date,time
    updateEntryState1 = (value, name) => {
        var due_on = this.state.newTask?.due_on ? this.state.newTask?.due_on : {};
        const state = this.state.newTask;
        if (name === 'date' || name === 'time') {
            due_on[name] = value;
            state['due_on'] = due_on;
            console.log('asda asd', state)
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
        var professional_data = this.state.professional_data;
        var ProfAy = this.state.professional_data?.length > 0 && this.state.professional_data.filter((data, index) => data.user_id === e.value);
        if (ProfAy && ProfAy.length > 0) {
            this.setState({ ProfMessage: "Already Exist!" });
        }
        else {
            var GetProf = this.state.professionalArray?.length > 0 && this.state.professionalArray.filter((data, index) => data.user_id === e.value);
            console.log('professional_data', professional_data, GetProf)
            professional_data.push(GetProf[0]);
            this.setState({ ProfMessage: false });
        }
         this.setState({ professional_data : professional_data});
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
                this.setState({loaderImage: false });
               
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
        this.setState({ newTask: data, openTask: true });
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

    myColor(position) {
        if (this.state.active === position) {
            return "#00a891";
        }
        return "";
    }

    color(position) {
        if (this.state.active === position) {
            return "white";
        }
        return "";
    }

    onClick = () => {
        this.setState({ hope: true });
    }


    openTaskTime = () => {
        if (this.state.button == "Add time") {
            this.setState({ openDate: false, openTime: true, button: "close"})
        }
        else {
            this.setState({ openDate: true, openTime: false, button: "Add time" })
        }
    }

    render() {
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
                                                <h1>Tasks overview</h1>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>Open</label>
                                                    <p>13</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>Done today</label>
                                                    <p>63</p>
                                                </Grid>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>Open</label>
                                                    <p>13</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>Done today</label>
                                                    <p>63</p>
                                                </Grid>
                                                <Grid className="showArchiv"><p onClick={() => { this.getArchived() }}><a>Show archived tasks</a></p></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <Grid className="topLeftSpc taskViewMob">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        {/* <AppBar position="static" className="taskTabs">
                                                            <Tabs value={tabvalue} onChange={this.handleChangeTab}>
                                                                <Tab label="My Tasks" className="taskTabsIner" />
                                                                <Tab label="All Tasks" className="taskTabsIner" />
                                                                <Tab label="Tasks overview" className="taskTabsIner taskTabsMob" />
                                                            </Tabs>
                                                        </AppBar> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>

                                                        <Grid className="addTaskBtn">
                                                            <Button onClick={this.handleOpenTask}>+ Add Task</Button>
                                                        </Grid>
                                                    </Grid>
                                                    {/* Model setup */}
                                                
                                                    {/* End of Model setup */}
                                                </Grid>
                                                <Grid className="taskDetailMob">
                                                    {/* {tabvalue === 0 && <TabContainer> */}
                                                    <Grid className="taskCntntMng">
                                                        <Grid container direction="row" alignItems="center">
                                                            <Grid item xs={8} sm={8} md={8}>
                                                                <AppBar position="static" className="billTabs">
                                                                    <Tabs value={tabvalue2} onChange={this.handleChangeTab2}>
                                                                        <Tab label="ALL" className="billtabIner" />
                                                                        <Tab label="Done" className="billtabIner" />
                                                                        <Tab label="Open" className="billtabIner" />
                                                                        <Tab label="Archived" className="billtabIner" />
                                                                    </Tabs>
                                                                </AppBar>
                                                            </Grid>
                                                            <Grid item xs={4} sm={4} md={4}>
                                                                <Grid className="taskSort">
                                                                    <a><img src={require('assets/virtual_images/sort.png')} alt="" title="" /></a>
                                                                    <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {tabvalue2 === 0 && <TabContainer>
                                                        <Grid className="allInerTabs">
                                                            {this.state.AllTasks.length > 0 && this.state.AllTasks.map((data) => (
                                                                <Grid>
                                                                    <TaskView data={data} removeTask={(id) => this.removeTask(id)} editTask={(data) => this.editTask(data)} />
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </TabContainer>}
                                                    {tabvalue2 === 1 && <TabContainer>
                                                        <Grid className="allInerTabs">
                                                            {this.state.DoneTask.length > 0 && this.state.DoneTask.map((data) => (
                                                                <Grid>
                                                                    <TaskView data={data} removeTask={(id) => this.removeTask(id)} editTask={(data) => this.editTask(data)} />
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </TabContainer>}
                                                    {tabvalue2 === 2 && <TabContainer>
                                                        <Grid className="allInerTabs">
                                                            {this.state.OpenTask.length > 0 && this.state.OpenTask.map((data) => (
                                                                <Grid>
                                                                    <TaskView data={data} removeTask={(id) => this.removeTask(id)} editTask={(data) => this.editTask(data)} />
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </TabContainer>}
                                                    {tabvalue2 === 3 && <TabContainer>
                                                        <Grid className="allInerTabs">
                                                            {this.state.ArchivedTasks.length > 0 && this.state.ArchivedTasks.map((data) => (
                                                                <Grid>
                                                                    <TaskView data={data} removeTask={(id) => this.removeTask(id)} editTask={(data) => this.editTask(data)} />
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </TabContainer>}
                                                    {/* </TabContainer>} */}
                                                    {/* {tabvalue === 1 && <TabContainer>
                                                        All Tasks
                                                    </TabContainer>}
                                                    {tabvalue === 2 && <TabContainer>
                                                        <Grid className="tskOverView tskOverMob">
                                                            <Grid className="taskNum taskYelow">
                                                                <label><span></span>Open</label>
                                                                <p>13</p>
                                                            </Grid>
                                                            <Grid className="taskNum taskGren">
                                                                <label><span></span>Done today</label>
                                                                <p>63</p>
                                                            </Grid>
                                                            <Grid className="taskNum taskYelow">
                                                                <label><span></span>Open</label>
                                                                <p>13</p>
                                                            </Grid>
                                                            <Grid className="taskNum taskGren">
                                                                <label><span></span>Done today</label>
                                                                <p>63</p>
                                                            </Grid>
                                                            <Grid className="showArchiv"><p><a>Show archived tasks</a></p></Grid>
                                                        </Grid>
                                                    </TabContainer>} */}
                                                </Grid>
                                            </Grid>
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