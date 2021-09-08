import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index";
import FlowPatientView from "Screens/Components/VirtualHospitalComponents/FlowPatientView/index";
import CommentsView from "Screens/Components/VirtualHospitalComponents/CommentsView/index";
import AssignedToData from "Screens/Components/VirtualHospitalComponents/AssignedToData/index";
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
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


var new_data = [
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
    'https://images.unsplash.com/photo-1626634913593-e5b88fd85627?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1626649216179-938ba30eca07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1626619633396-1769230c1342?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
]


// var allcomments = [{
//     professional_data: [{
//         // url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
//         // text: "thirdone try comment",
//         // comment_by: "D_1Q1J4SSCm",
//         // comment_id: "60ae03a79d9ebe17f0a92858_D_1Q1J4SSCm_1622636888816"
//     }]
// }]

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
            text: '',
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
            openAssign: false,
            newStaff: {},
            ProfMessage: false,
            newTask: {},
            Fileadd: '',
            AllTasks: {},
        };
    }

    componentDidMount() {
        this.getPatientData();
        this.getProfessionalData();
        this.getAddTaskData();
    }
    // open model Add Task
    handleOpenTask = () => {
        this.setState({ openTask: true });
    }
    // close model Add Task
    handleCloseTask = () => {
        this.setState({ openTask: false });
    }
    handleChangeTab = (event, tabvalue) => {
        this.setState({ tabvalue });
    };
    handleChangeTab2 = (event, tabvalue2) => {
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
        console.log("professional_data", this.state.professional_data)
        const state = this.state.newTask;
        state['assigned_to'] = this.state.professional_data;
        this.setState({ newTask: state });
        // this.setState({
        //     newTask: this.state.professional_data
        // });
    };

    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
            // newTask : Fileadd

        });
        console.log("FileAttach", Fileadd)
    };
    // submit Task model
    handleTaskSubmit = () => {
        var data = this.state.newTask
        data.attachment = this.state.fileattach
        data.house_id = '600c15c2c983431790f904c3-1627046889451'
        data.status = 'open'
        data.priority = 0
        data.done_on = ''
        console.log("status", this.state.newTask.status)
        if (this.state.newTask._id) {
            axios
                .put(
                    sitedata.data.path + "/vh/AddTask/" + this.state.newTask._id,
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    this.setState({
                        newTask: {},
                    });
                    this.getAddTaskData();
                });
        }
        else {
            axios
                .post(
                    sitedata.data.path + "/vh/AddTask",
                    data,
                    commonHeader(this.props.stateLoginValueAim.token)
                )
                .then((responce) => {
                    this.setState({ newTask: {}, fileattach: {} })
                    this.getAddTaskData();

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    // get Add task data
    getAddTaskData = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/GetAllTask/600c15c2c983431790f904c3-1627046889451",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ AllTasks: response.data.data })
                console.log("response", response)
            });
    };

    // For adding a date,time
    updateEntryState1 = (e, name) => {
        if (name === 'date_measured') {
            const state = this.state.newTask;
            state['date_measured'] = e
            this.setState({ newTask: state });
        }
        else if (name === 'time_measured') {
            const state = this.state.newTask;
            state['time_measured'] = e
            this.setState({ newTask: state });
        }
        else {
            const state = this.state.newTask;
            state[e.target.name] = e.target.value;
            this.setState({ newTask: state });
        }
    };
    //Select the patient name
    updateEntryState2 = (e) => {
        const state = this.state.newTask;
        state['patient'] = e.label
        this.setState({ newTask: state });
    }
    //Select the professional name
    updateEntryState3 = (e) => {
        let professional_data = [...this.state.professional_data];
        var ProfAy = this.state.professional_data?.length > 0 && this.state.professional_data.filter((data, index) => data.value === e.value);
        if (ProfAy && ProfAy.length > 0) {
            this.setState({ ProfMessage: "Already Exist!" });
        }
        else {
            professional_data.push(e);
            this.setState({ ProfMessage: false });
        }
        this.setState({
            professional_data
        });
    }
    // Delete Professional from the
    deleteProf = (index) => {
        var ProfAy = this.state.professional_data?.length > 0 && this.state.professional_data.filter((data, index1) => index1 !== index);
        this.setState({ professional_data: ProfAy });
        this.setState({ ProfMessage: false });
    };

    // getPatientData = () => {
    //     var PatientList = [], PatientList1 = [];
    //     patientArray = [];
    //     this.setState({ loaderImage: true });
    //     axios
    //         .get(
    //             sitedata.data.path + "/vh/getPatientFromVH/600c15c2c983431790f904c3-1627046889451",
    //             commonHeader(this.props.stateLoginValueAim.token)
    //         )
    //         .then((response) => {
    //             this.setState({ allPatData: response.data.data })
    //             for (let i = 0; i < this.state.allPatData.length; i++) {
    //                 var name = '';
    //                 if (this.state.allPatData[i]?.patient?.first_name && this.state.allPatData[i]?.patient?.last_name) {
    //                     name = this.state.allPatData[i]?.patient?.first_name + ' ' + this.state.allPatData[i]?.patient?.last_name
    //                 }
    //                 else if (this.state.allPatData[i].patient?.first_name) {
    //                     name = this.state.allPatData[i].patient?.first_name
    //                 }
    //                 patientArray.push({
    //                     name: name,
    //                     id: this.state.allPatData[i]._id,
    //                     // profile_id: this.state.allPatData[i].profile_id,
    //                     alies_id: this.state.allPatData[i].alies_id
    //                 })
    //                 PatientList.push({ value: this.state.allPatData[i]._id, label: name })
    //                 PatientList1.push({ profile_id: this.state.allPatData[i].profile_id, value: this.state.allPatData[i]._id, label: name })
    //             }
    //             this.setState({ users: patientArray, patient_id_list: PatientList, patient_id_list1: PatientList1 })
    //             console.log("image",this.state.allPatData)
    //         });

    // };

    // Get the Professional data
    getProfessionalData = () => {
        var professionalList = [], professionalList1 = [],
            professionalArray = [];
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/hospitaladmin/GetProfessional/60fabfe5b3394533f7f9a6dc-1629349858559",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ allProfData: response.data.data })
                for (let i = 0; i < this.state.allProfData.length; i++) {
                    var name = '';
                    if (this.state.allProfData[i]?.first_name && this.state.allProfData[i]?.last_name) {
                        name = this.state.allProfData[i]?.first_name + ' ' + this.state.allProfData[i]?.last_name
                    }
                    else if (this.state.allProfData[i]?.first_name) {
                        name = this.state.allProfData[i]?.first_name
                    }
                    professionalArray.push({
                        name: name,
                        id: this.state.allProfData[i]._id,
                        // profile_id: this.state.allProfData[i].profile_id,
                        alies_id: this.state.allProfData[i].alies_id
                    })
                    professionalList.push({ value: this.state.allProfData[i]._id, label: name })
                    professionalList1.push({ profile_id: this.state.allProfData[i].profile_id, value: this.state.allProfData[i]._id, label: name })
                }
                this.setState({ users: professionalArray, professional_id_list: professionalList, professional_id_list1: professionalList1 })
            });

    };

    // Get the Patient data
    getPatientData = () => {
        var PatientList = [], PatientList1 = [];
        patientArray = [];
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/getPatientFromVH/600c15c2c983431790f904c3-1627046889451",
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ allPatData: response.data.data })
                var images = [];
                for (let i = 0; i < this.state.allPatData.length; i++) {
                    var find = this.state.allPatData[i]?.patient?.image;
                    // console.log('find', find)
                    if (find) {
                        var find1 = find.split(".com/")[1];
                        axios
                            .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
                            .then((response2) => {
                                if (response2.data.hassuccessed) {
                                    images.push({
                                        image: find,
                                        new_image: response2.data.data,
                                    });
                                    this.setState({ images: images });
                                }
                            });
                    }
                    var name = '';
                    if (this.state.allPatData[i]?.patient?.first_name && this.state.allPatData[i]?.patient?.last_name) {
                        name = this.state.allPatData[i]?.patient?.first_name + ' ' + this.state.allPatData[i]?.patient?.last_name
                    }
                    else if (this.state.allPatData[i].patient?.first_name) {
                        name = this.state.allPatData[i].patient?.first_name
                    }
                    patientArray.push({
                        name: name,
                        id: this.state.allPatData[i]._id,
                        alies_id: this.state.allPatData[i].alies_id
                    })
                    PatientList.push({ value: this.state.allPatData[i]._id, label: name })
                    PatientList1.push({ profile_id: this.state.allPatData[i].profile_id, value: this.state.allPatData[i]._id, label: name })
                }
                this.setState({ users: patientArray, patient_id_list: PatientList, patient_id_list1: PatientList1 })
                // console.log("image", this.state.images)
            });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ users: nextProps.users, filteredUsers: nextProps.users }, () => this.filterList());
    }

    filterList = () => {
        let users = this.state.users;
        let q = this.state.q;
        users = users && users.length > 0 && users.filter(function (user) {
            return (user.name.toLowerCase().indexOf(q) != -1 || user.alies_id.toLowerCase().indexOf(q) != -1);
            // return  // returns true or false
        });
        this.setState({ filteredUsers: users });
        if (this.state.q == '') {
            this.setState({ filteredUsers: [] });
        }
    }

    //Delete the perticular service confirmation box
    removeTask = (id) => {
        console.log("id", id)
        this.setState({ message: null });
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
        axios
            .delete(sitedata.data.path + "/vh/AddTask/" + id, commonHeader(this.props.stateLoginValueAim.token))
            .then((response) => {
                this.getAddTaskData();
            })
            .catch((error) => { });
    }
    // open Edit model
    editTask = (data) => {
        console.log("data", data.task_name);
        this.setState({ newTask: data, openTask: true });
    };


    render() {
        const { tabvalue, tabvalue2, professional_data, newTask, AllTasks } = this.state;
        const userList = this.state.filteredUsers && this.state.filteredUsers.map(user => {
            return (
                <li key={user.id} style={{ background: this.myColor(user.id), color: this.color(user.id) }} value={user.profile_id}
                    onClick={() => { this.setState({ q: user.name, selectedUser: user.profile_id, selectedprofile: user.profile_id }); this.toggle(user.id); this.setState({ filteredUsers: [] }) }}
                >{user.name} ( {user.profile_id} )</li>
            )
        });

        // var viewComments = this.state.tasks?.comments.length > 0 && this.state.tasks.comments.filter((data, index) => index <= 1)
        // var count = this.state.tasks?.comments.length - 2 > 0 ? this.state.tasks?.comments.length - 2 : 0;
        // console.log("viewComments", viewComments)
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
                                                <Grid className="showArchiv"><p><a>Show archived tasks</a></p></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={10}>
                                            <Grid className="topLeftSpc taskViewMob">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={6}>
                                                        <AppBar position="static" className="taskTabs">
                                                            <Tabs value={tabvalue} onChange={this.handleChangeTab}>
                                                                <Tab label="My Tasks" className="taskTabsIner" />
                                                                <Tab label="All Tasks" className="taskTabsIner" />
                                                                <Tab label="Tasks overview" className="taskTabsIner taskTabsMob" />
                                                            </Tabs>
                                                        </AppBar>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>

                                                        <Grid className="addTaskBtn">
                                                            <Button onClick={this.handleOpenTask}>+ Add Task</Button>
                                                        </Grid>
                                                    </Grid>
                                                    {/* Model setup */}
                                                    <Modal
                                                        className={
                                                            this.props.settings &&
                                                                this.props.settings.setting &&
                                                                this.props.settings.setting.mode &&
                                                                this.props.settings.setting.mode === "dark"
                                                                ? "darkTheme"
                                                                : ""
                                                        }
                                                        open={this.state.openTask} onClose={this.handleCloseTask}>
                                                        <Grid className="rvewFiles">
                                                            <Grid className="rvewFilesinner">
                                                                {/* <Grid container direction="row">
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid className="rvwCadio">
                                                                            <Button>Cardiology</Button><h3>Review patient files</h3><p>07/02/2021, 9:03 AM</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid> */}
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* <Grid className="asignUpr">
                                                                            <Grid className="asignLft"> */}

                                                                        <Grid className="enterSpclUpr">
                                                                            <Grid className="enterSpclMain">
                                                                                <Grid className="nwDiaCloseBtn">
                                                                                    <a onClick={this.handleCloseTask}><img src={require("assets/images/close-search.svg")} alt="" title="" />
                                                                                    </a>
                                                                                </Grid>
                                                                                <Grid className="enterSpcl">


                                                                                    <Grid>
                                                                                        <VHfield
                                                                                            label="Task name"
                                                                                            name="task_name"
                                                                                            placeholder="Enter task name"
                                                                                            onChange={(e) =>
                                                                                                this.updateEntryState1(e)
                                                                                            }
                                                                                            value={this.state.newTask.task_name}
                                                                                        />
                                                                                    </Grid>

                                                                                    <Grid>
                                                                                        <VHfield
                                                                                            label="Description"
                                                                                            name="description"
                                                                                            placeholder="Enter description"
                                                                                            onChange={(e) =>
                                                                                                this.updateEntryState1(e)}
                                                                                            value={this.state.newTask.description}
                                                                                        />
                                                                                    </Grid>

                                                                                    <Grid className="patientTask">
                                                                                        <Grid>Patient</Grid>

                                                                                        <Select
                                                                                            label="Patient"
                                                                                            name="patient"
                                                                                            onChange={(e) =>
                                                                                                this.updateEntryState2(e)}
                                                                                            value={this.state.newTask.patient}
                                                                                            options={this.state.patient_id_list}
                                                                                            isSearchable={true}
                                                                                        />
                                                                                    </Grid>

                                                                                    <Grid className="makeCmpt">
                                                                                        <Grid container direction="row" alignItems="center">
                                                                                            <Grid item xs={12} sm={6} md={6}>

                                                                                            </Grid>
                                                                                            <Grid item xs={12} sm={6} md={6}>
                                                                                                <Grid className="addDue">
                                                                                                    <Grid><label>Due on</label></Grid>
                                                                                                    <Grid>
                                                                                                        <DateFormat
                                                                                                            name="date_measured"
                                                                                                            value={
                                                                                                                this.state.newTask.date_measured
                                                                                                                    ? new Date(this.state.newTask.date_measured)
                                                                                                                    : new Date()
                                                                                                            }
                                                                                                            notFullBorder
                                                                                                            date_format={this.state.date_format}
                                                                                                            onChange={(e) => this.updateEntryState1(e, "date_measured")}
                                                                                                        />

                                                                                                        <Grid>
                                                                                                            <label>Add time</label></Grid>
                                                                                                        <TimeFormat
                                                                                                            name="time_measured"
                                                                                                            value={
                                                                                                                this.state.newTask.time_measured
                                                                                                                    ? new Date(this.state.newTask.time_measured)
                                                                                                                    : new Date()
                                                                                                            }
                                                                                                            time_format={this.state.time_format}
                                                                                                            onChange={(e) => this.updateEntryState1(e, "time_measured")}
                                                                                                        /></Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>

                                                                                    <Grid className="assignSecUpr">
                                                                                        <Grid container direction="row" alignItems="center">
                                                                                            <Grid item xs={12} sm={12} md={12}>
                                                                                                <Grid className="assignSec">
                                                                                                    <Grid>
                                                                                                        <img onClick={this.handleOpenAssign} src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                        <a onClick={this.handleOpenAssign}><label>+ Assign to</label></a>
                                                                                                    </Grid>
                                                                                                    {/* <Grid>
                                                                                                        <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                        <label>Duplicate</label>
                                                                                                    </Grid>
                                                                                                    <Grid>
                                                                                                        <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                        <label>Archive</label>
                                                                                                    </Grid> */}
                                                                                                    <Grid>
                                                                                                        <img onClick={(id) => {
                                                                                                            this.removeTask(id);
                                                                                                        }} src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                        <label onclick={(id) => { this.removeTask(id) }}>Delete</label>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>

                                                                                    <Modal open={this.state.openAssign}
                                                                                        onClose={this.handleCloseAssign}>
                                                                                        <Grid className="addStaff">
                                                                                            <Grid className="addStaffIner">
                                                                                                <Grid container direction="row">
                                                                                                    <Grid item xs={12} md={12}>
                                                                                                        <Grid className="movPtntCntnt">
                                                                                                            <Grid className="addStaffLbl">
                                                                                                                <Grid className="addStaffClose closeMove">
                                                                                                                    <a onClick={this.handleCloseAssign}>
                                                                                                                        <img src={require('assets/virtual_images/closebtn.png')} alt="" title="" />
                                                                                                                    </a>
                                                                                                                </Grid>
                                                                                                                <label>Staff on patient</label>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                        <Grid className="addStafClient">
                                                                                                            <Grid className="addStafClientLft">
                                                                                                                <img src={require('assets/virtual_images/james.jpg')} alt="" title="" />
                                                                                                            </Grid>
                                                                                                            <Grid>
                                                                                                                <label>{this.state.newTask?.name}</label> <p>P_mDnkbR30d</p>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                        <Grid className="addStafMgnt">
                                                                                                            <Grid className="addStafdrop">
                                                                                                                <Grid className="err_message"><label>{this.state.ProfMessage}</label></Grid>
                                                                                                                <Grid><label>Add staff</label></Grid>
                                                                                                                <Select
                                                                                                                    name="professional"
                                                                                                                    onChange={(e) =>
                                                                                                                        this.updateEntryState3(e)}
                                                                                                                    value={this.state.newStaff.professional}
                                                                                                                    options={this.state.professional_id_list}
                                                                                                                    placeholder="Search & Select"
                                                                                                                    className="addStafSelect"
                                                                                                                    isSearchable={true} />
                                                                                                            </Grid>
                                                                                                        </Grid>

                                                                                                        <Grid className="stafLstCntnt">

                                                                                                            {this.state.professional_data?.length > 0 && this.state.professional_data.map((data, index) => (
                                                                                                                <Grid className="stafLst">
                                                                                                                    <Grid className="stafLft">
                                                                                                                        <a><img src={require('assets/virtual_images/dr2.jpg')} alt="" title="" /></a>
                                                                                                                        <span>{data.label}</span>
                                                                                                                    </Grid>
                                                                                                                    <Grid className="stafRght">
                                                                                                                        <a onClick={() => this.deleteProf(index)}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                    </Grid>
                                                                                                                </Grid>
                                                                                                            ))}

                                                                                                            {/* </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></a>
                                                                                                                    <span>Mark Anderson M.D.</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/BernhardBreil.png')} alt="" title="" /></a>
                                                                                                                    <span>Ahmad Nazeri</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/YehoushuaWestover.png')} alt="" title="" /></a>
                                                                                                                    <span>Angela Longoria</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/102.png')} alt="" title="" /></a>
                                                                                                                    <span>Conan Matusov</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/101.png')} alt="" title="" /></a>
                                                                                                                    <span>Ezequiel Dengra</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/YehoushuaWestover.png')} alt="" title="" /></a>
                                                                                                                    <span>Angela Longoria</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                            <Grid className="stafLst">
                                                                                                                <Grid className="stafLft">
                                                                                                                    <a><img src={require('assets/virtual_images/102.png')} alt="" title="" /></a>
                                                                                                                    <span>Conan Matusov</span>
                                                                                                                </Grid>
                                                                                                                <Grid className="stafRght">
                                                                                                                    <a><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /></a>
                                                                                                                </Grid> */}
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                                <Grid className="addStafClos">
                                                                                                    <a onClick={this.handleCloseAssign}><Button onClick={() => this.handleAssignSubmit()}>Save & Close</Button></a>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Modal>


                                                                                    <Grid className="attchFile">
                                                                                        <Grid>
                                                                                            <label>Attachments</label>
                                                                                        </Grid>
                                                                                        <FileUploader
                                                                                            // cur_one={this.props.cur_one}
                                                                                            attachfile={
                                                                                                this.state.newTask && this.state.newTask.attachfile
                                                                                                    ? this.state.newTask.attachfile
                                                                                                    : []
                                                                                            }
                                                                                            name="UploadTrackImageMulti"
                                                                                            isMulti="true"
                                                                                            fileUpload={(event) => {
                                                                                                this.FileAttachMulti(event);
                                                                                            }}
                                                                                        />
                                                                                    </Grid>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="cmntUpr">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={12} md={12}>
                                                                            <Grid className="saveTask">
                                                                                <a onClick={() => this.handleCloseTask()}><Button onClick={() => this.handleTaskSubmit()}>Save Task & Close</Button></a>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Modal>
                                                    {/* End of Model setup */}
                                                </Grid>
                                                <Grid className="taskDetailMob">
                                                    {tabvalue === 0 && <TabContainer>
                                                        <Grid className="taskCntntMng">
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item xs={8} sm={8} md={8}>
                                                                    <AppBar position="static" className="billTabs">
                                                                        <Tabs value={tabvalue2} onChange={this.handleChangeTab2}>
                                                                            <Tab label="ALL" className="billtabIner" />
                                                                            <Tab label="Done" className="billtabIner" />
                                                                            <Tab label="Open" className="billtabIner" />
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
                                                                        <Grid className="allTabCntnt">
                                                                            <Grid container direction="row" alignItems="center">
                                                                                <Grid item xs={12} sm={8} md={6}>
                                                                                    <Grid className="revwFiles">
                                                                                        <Grid><img src={require('assets/virtual_images/greyImg.jpg')} alt="" title="" /></Grid>
                                                                                        <Grid className="revwFilesRght cardioColor">
                                                                                            <Grid><Button>Cardiology</Button></Grid>
                                                                                            <Grid><label>{data.task_name}</label></Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                   <Grid className="allInfo">
                                                                                        <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                        <Grid className="allInfoRght">
                                                                                            <Grid><label>{data.name}</label></Grid>
                                                                                            <p>{data.profile_id}</p>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={8} md={6}>
                                                                                    <Grid className="attchNoteMain">
                                                                                        <Grid className="attchNoteUpr">
                                                                                            <Grid className="attchNote">
                                                                                                <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                                <label>1</label>
                                                                                            </Grid>
                                                                                            <Grid className="attchNote attchImg">
                                                                                                <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                                <label>1</label>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                        <Grid className="attchOpen">
                                                                                            <Button><label></label>{data.status}</Button>
                                                                                        </Grid>
                                                                                        <Grid className="userPics">
                                                                                            <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                            <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                            <Link><span>+1</span></Link>
                                                                                        </Grid>
                                                                                        {/* <Grid className="userDots"> */}
                                                                                        {/* <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button> */}
                                                                                        <Grid item xs={6} md={6} className="spcMgntRght7 presEditDot scndOptionIner">
                                                                                            <a className="openScndhrf">
                                                                                                <img
                                                                                                    src={require("assets/images/three_dots_t.png")}
                                                                                                    alt=""
                                                                                                    title=""
                                                                                                    className="openScnd specialuty-more"
                                                                                                />
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        <a
                                                                                                            onClick={() => {
                                                                                                                this.editTask(data);
                                                                                                            }}
                                                                                                        >
                                                                                                            <img
                                                                                                                src={require("assets/images/details.svg")}
                                                                                                                alt=""
                                                                                                                title=""
                                                                                                            />
                                                                                                            Edit Task
                                                                                                        </a>
                                                                                                    </li>

                                                                                                    <li
                                                                                                        onClick={() => {
                                                                                                            this.removeTask(data._id);
                                                                                                        }}
                                                                                                    >
                                                                                                        <a>
                                                                                                            <img
                                                                                                                src={require("assets/images/cancel-request.svg")}
                                                                                                                alt=""
                                                                                                                title=""
                                                                                                            />
                                                                                                            Delete Task
                                                                                                        </a>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </a>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                ))}
                                                                {/* <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght NeuroColor">
                                                                                    <Grid><Button>Neurology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght radiologyColor">
                                                                                    <Grid><Button>Radiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght OncologyColor">
                                                                                    <Grid><Button>Oncology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght cardioColor">
                                                                                    <Grid><Button>Cardiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="allTabCntnt">
                                                                    <Grid container direction="row" alignItems="center">
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="revwFiles">
                                                                                <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid>
                                                                                <Grid className="revwFilesRght cardioColor">
                                                                                    <Grid><Button>Cardiology</Button></Grid>
                                                                                    <Grid><label>Review patient files</label></Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Grid className="allInfo">
                                                                                <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid>
                                                                                <Grid className="allInfoRght">
                                                                                    <Grid><label>Benito Noboa</label></Grid>
                                                                                    <p>P_ukd832kd2</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={8} md={6}>
                                                                            <Grid className="attchNoteMain">
                                                                                <Grid className="attchNoteUpr">
                                                                                    <Grid className="attchNote">
                                                                                        <img src={require('assets/virtual_images/paragraph-normal.svg')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                    <Grid className="attchNote attchImg">
                                                                                        <img src={require('assets/virtual_images/attatchment.png')} alt="" title="" />
                                                                                        <label>1</label>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid className="attchOpen">
                                                                                    <Button><label></label>Open</Button>
                                                                                </Grid>
                                                                                <Grid className="userPics">
                                                                                    <Link><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Link>
                                                                                    <Link><img src={require('assets/virtual_images/james.jpg')} alt="" title="" /></Link>
                                                                                    <Link><span>+1</span></Link>
                                                                                </Grid>
                                                                                <Grid className="userDots">
                                                                                    <Button><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid> */}
                                                            </Grid>
                                                        </TabContainer>}
                                                        {tabvalue2 === 1 && <TabContainer>
                                                            {/* Done tab content */}
                                                            if(status=="open")
                                                        </TabContainer>}
                                                        {tabvalue2 === 2 && <TabContainer>
                                                            Open tab content
                                                        </TabContainer>}
                                                    </TabContainer>}
                                                    {tabvalue === 1 && <TabContainer>
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
                                                    </TabContainer>}
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