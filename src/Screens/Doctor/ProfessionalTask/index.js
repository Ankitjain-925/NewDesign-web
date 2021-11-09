import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LeftMenu from "Screens/Components/Menus/DoctorLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/DoctorLeftMenu/mobile";
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
import { Speciality } from "Screens/Login/speciality.js";
import sitedata from "sitedata";
import { getPatientData } from "Screens/Components/CommonApi/index";
import {
    commonHeader,
    commonCometDelHeader,
} from "component/CommonHeader/index";
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction.js";
import { Redirect, Route } from 'react-router-dom';
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import Select from 'react-select';
import { confirmAlert } from "react-confirm-alert";
import { S3Image } from "Screens/Components/GetS3Images/index";
import TaskView from 'Screens/Components/VirtualHospitalComponents/TaskView/index';
import Loader from "Screens/Components/Loader/index";
import { translationRS } from 'translations/index';
import { getProfessionalData } from "Screens/VirtualHospital/PatientFlow/data";
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
            specilaityList:[],
            assignedTo:[],
            selectSpec: {},
            open: 0,
            doneToday: 0,
            comments: [],
            newComment: {}
        };
    }

    componentDidMount() {
        this.getAddTaskData();
    }

    getAddTaskData = () => {
        this.setState({ loaderImage: true });
        axios
            .get(
                sitedata.data.path + "/vh/ProfessionalTask/" + this.props.stateLoginValueAim.user.profile_id,
                commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
                this.setState({ AllTasks: response.data.data })
                if (response.data.hassuccessed) {
                    var Done = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "done")
                    var Open = response.data.data?.length > 0 && response.data.data.filter((item) => item.status === "open")
                    this.setState({ AllTasks: response.data.data, DoneTask: Done, OpenTask: Open, CountDone: Done.length, CountOpen: Open.length })
                }
                this.setState({ loaderImage: false });
            });
    };

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
        // var { comments } = this.state
        data.house_id = "600c15c2c983431790f904c3-1627046889451"
        if (this.state.comments && this.state.comments.length > 0) {
            data.comments = this.state.comments;
        }
        this.setState({ loaderImage: true })
        if (this.state.newTask._id) {
            axios
                .put(
                    sitedata.data.path + "/vh/AddTask/" + this.state.newTask._id,
                    data,
                    commonHeader(this.props.stateLoginValueAim.token),
                )
                .then((responce) => {
                    this.setState({ loaderImage: false })
                    if (responce.data.hassuccessed) {
                        this.setState({ newTask: {}, fileattach: {}, professional_data: [], fileupods: false, assignedTo: [], q: '', selectSpec: {}, openTask: true });
                        this.getAddTaskData();
                    }
                });
        }
    }

    handleComment = (e) => {
        var comments_by = {
            'first_name': this.props.stateLoginValueAim.user.first_name,
            'last_name': this.props.stateLoginValueAim.user.last_name,
            'alies_id': this.props.stateLoginValueAim.user.alies_id,
            'profile_id': this.props.stateLoginValueAim.user.profile_id,
            'user_id': this.props.stateLoginValueAim.user._id
        }
        let comments = [...this.state.comments];
        comments.push({
            comment: this.state.newComment.comment,
            comment_on: this.props.stateLoginValueAim.user.createdate,
            comment_by: comments_by
        });
        this.setState({
            comments,
            newComment: {}
        });
    }

    removeComment = (index) => {
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
                        <h1>Remove the Comment ?</h1>
                        <p>Are you sure to remove this Comment?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteClickComment(index);
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
    deleteClickComment(index) {
        var array = this.state.comments
        array.splice(index);
        this.setState({ openTask: true })
    }

    // editDocComment = (data) => {
    //     this.setState({ 'newcomment.comment': data })
    // }

    updateCommemtState = (e) => {
        const state = this.state.newComment;
        state['comment'] = e.target.value
        this.setState({ newComment: state });
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
                sitedata.data.path + "/vh/ProfessionalTask/60113fa1b488aa271effa419",
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
        if(state.status === 'done'){
            state['done_on'] = new Date();
        }
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
    getPatientData = async () => {
        var patientArray = [], PatientList1 = [];
        this.setState({ loaderImage: true });
        let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value)
        if (response.isdata) {
            this.setState({ users1: response.PatientList1, users: response.patientArray,loaderImage: false })
        }
        else{
            this.setState({  loaderImage: false });
        } 
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
                        <Grid item xs={11} md={11}>
                            <LeftMenuMobile isNotShow={true} currentPage="professionaltask" />
                            <LeftMenu isNotShow={true} currentPage="professionaltask" />
                            <Grid container direction="row">
                                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">

                                </Grid>
                                {/* End of Menu */}
                                {/* Start of Right Section */}
                                <Grid item xs={1} md={11}>
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={2}>
                                            <Grid className="tskOverView">
                                                <h1>{Tasks_overview}</h1>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>{Open}</label>
                                                    <p>{this.state.CountOpen}</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>{Donetoday}</label>
                                                    <p>{this.state.CountDone}</p>
                                                </Grid>
                                                <Grid className="taskNum taskYelow">
                                                    <label><span></span>{Open}</label>
                                                    <p>{this.state.CountOpen}</p>
                                                </Grid>
                                                <Grid className="taskNum taskGren">
                                                    <label><span></span>{Donetoday}</label>
                                                    <p>{this.state.CountDone}</p>
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
                                                    {/* <Grid item xs={12} md={6}>

                                                        <Grid className="addTaskBtn">
                                                            <Button onClick={this.handleOpenTask}>+ Add Task</Button>
                                                        </Grid>
                                                    </Grid> */}
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
                                                        <Grid className="creatTaskModel">
                                                            <Grid className="creatTaskCntnt">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid className="creatLbl">
                                                                            <Grid className="creatLblClose">
                                                                                <a onClick={this.handleCloseTask}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a>
                                                                            </Grid>
                                                                            <label>{CreateaTask}</label>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12} lg={12}>
                                                                        <Grid className="creatDetail">
                                                                            <Grid className="creatInfoIner">
                                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                                    <Grid item xs={12} md={12}>
                                                                                        {/* <label>Task title</label>
                                                                                        <Grid><input type="text" placeholder="Enter title" /></Grid> */}
                                                                                        <VHfield
                                                                                            label="Task title"
                                                                                            name="task_name"
                                                                                            placeholder="Enter title"
                                                                                            onChange={(e) =>
                                                                                                this.updateEntryState1(e.target.value, e.target.name)
                                                                                            }
                                                                                            value={this.state.newTask.task_name}
                                                                                            check={true}
                                                                                            comesFrom="professional_task"
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={12}>
                                                                                        <label>{ForPatient}</label>
                                                                                        <Grid><input type="text" placeholder={"Search & Select"} value={this.state.q} onChange={this.onChange} disabled={true} />
                                                                                            <ul className={this.state.shown && "patientHint"}>
                                                                                                {userList}
                                                                                            </ul>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    {!this.state.newTask._id && <Grid item xs={12} md={12}>
                                                                                        <Grid className="hideTask">
                                                                                            <FormControlLabel control={<Checkbox name="checkedC" checked={this.state.newTask?.hidePatient} onChange={(e) => this.updateEntryState1(e.target.checked, 'hidePatient')} disabled={true} />} label="Hide task from patient" />
                                                                                        </Grid>
                                                                                    </Grid>}
                                                                                    <Grid item xs={12} md={12} className="taskDescp">
                                                                                        <label>{Taskdescription}</label>
                                                                                        <Grid>
                                                                                            <textarea placeholder="Enter description" name="description" onChange={(e) => this.updateEntryState1(e.target.value, e.target.name)}
                                                                                                value={this.state.newTask.description} disabled={true}></textarea>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={12}>
                                                                                        <label>{Assignedto}</label>
                                                                                        <Grid>
                                                                                            <Select
                                                                                                name="professional"
                                                                                                onChange={(e) =>
                                                                                                    this.updateEntryState3(e)}
                                                                                                value={this.state.assignedTo}
                                                                                                options={this.state.professional_id_list}
                                                                                                placeholder="Search & Select"
                                                                                                className="addStafSelect"
                                                                                                isMulti={true}
                                                                                                isSearchable={true}
                                                                                                isDisabled={true}
                                                                                            />

                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={12}>
                                                                                        <label>{Speciallity}</label>
                                                                                        <Grid className="specialFor">
                                                                                            <Select
                                                                                                onChange={(e) => this.onFieldChange(e)}
                                                                                                options={this.state.specilaityList}
                                                                                                name="specialty_name"
                                                                                                isSearchable={true}
                                                                                                value={this.state.selectSpec}
                                                                                                isDisabled={true}
                                                                                            />
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid container direction="row" alignItems="center">
                                                                                        <Grid item xs={10} md={10} className="dueOn">
                                                                                            <label>{Dueon}</label>
                                                                                            <Grid>
                                                                                                {this.state.openDate ?
                                                                                                    <DateFormat
                                                                                                        name="date"
                                                                                                        value={
                                                                                                            this.state.newTask?.due_on?.date
                                                                                                                ? new Date(this.state.newTask?.due_on?.date)
                                                                                                                : new Date()
                                                                                                        }
                                                                                                        notFullBorder
                                                                                                        date_format={this.state.date_format}
                                                                                                        onChange={(e) => this.updateEntryState1(e, "date")}
                                                                                                        disabled
                                                                                                    /> :
                                                                                                    <TimeFormat
                                                                                                        disabled
                                                                                                        name="time"
                                                                                                        value={
                                                                                                            this.state.newTask?.due_on?.time
                                                                                                                ? new Date(this.state.newTask?.due_on?.time)
                                                                                                                : new Date()
                                                                                                        }
                                                                                                        time_format={this.state.time_format}
                                                                                                        onChange={(e) => this.updateEntryState1(e, "time")}

                                                                                                    />}

                                                                                            </Grid>
                                                                                        </Grid>
                                                                                        <Grid item xs={2} md={2} className="addTime">
                                                                                            <Button onClick={() => { this.openTaskTime() }}>{this.state.openDate ? 'Add time' : 'Add date'}</Button>
                                                                                        </Grid>
                                                                                    </Grid>

                                                                                    <Grid className="assignSecUpr">
                                                                                        <Grid container direction="row" alignItems="center">
                                                                                            <Grid item xs={12} sm={12} md={12}>
                                                                                                <Grid className="assignSec">
                                                                                                    {this.state.newTask._id &&
                                                                                                        <>
                                                                                                            {/* <Grid onClick={() => { this.createDuplicate(this.state.newTask) }}>
                                                                                                                <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                                <label>{Duplicate}</label>
                                                                                                            </Grid>
                                                                                                            <Grid onClick={() => { this.updateEntryState1(true, 'archived') }}>
                                                                                                                <img src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                                <label>{Archive}</label>
                                                                                                            </Grid>
                                                                                                            <Grid>
                                                                                                                <img onClick={(id) => {
                                                                                                                    this.removeTask(id);
                                                                                                                }} src={require('assets/virtual_images/assign-to.svg')} alt="" title="" />
                                                                                                                <label onclick={(id) => { this.removeTask(id) }}>Delete</label>
                                                                                                            </Grid> */}
                                                                                                            <Grid onClick={() => { this.switchStatus() }} className="markDone">
                                                                                                                {this.state.newTask.status === 'done' ? <Grid><img src={require('assets/virtual_images/rightTick.png')} alt="" title="" /></Grid> :
                                                                                                                    <Grid><img src={require('assets/virtual_images/greyImg.jpg')} alt="" title="" /></Grid>
                                                                                                                }
                                                                                                                <label>{Markasdone}</label>
                                                                                                            </Grid>
                                                                                                        </>}
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>

                                                                                    <Grid item xs={12} md={12}>
                                                                                        <label>{Attachments}</label>
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





                                                                                    <Grid item xs={12} md={12}>

                                                                                        <Grid><label>Comments</label></Grid>

                                                                                        {this.state.AllTasks?.length > 0 && this.state.AllTasks.map((data, index) => (

                                                                                            <Grid className="cmntIner cmntInerBrdr">

                                                                                                <Grid className="cmntMsgs">
                                                                                                    <Grid><S3Image imgUrl={data?.comments[index]?.comment_by?.image} /></Grid>
                                                                                                    <Grid>
                                                                                                        <Grid><label> {data?.comments[index]?.comment_by?.first_name} {data?.comments[index]?.comment_by?.last_name}</label><span>{data?.comments[index]?.comment_on}</span></Grid>
                                                                                                        <Grid className="cmntMsgsCntnt"><p>{data?.comments[index]?.comment}</p></Grid>
                                                                                                        <Grid><Button onClick={() => this.editDocComment(data)}>Edit</Button>
                                                                                                            <Button onClick={() => this.removeComment(index)}>Delete</Button></Grid>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        ))}

                                                                                        {/* <Grid className="cmntMsgs">
                                                                                                        <Grid><img src={require('assets/virtual_images/dr1.jpg')} alt="" title="" /></Grid>
                                                                                                        <Grid>
                                                                                                            <Grid><label>Mark Anderson M.D.</label><span>7 Feb at 12:38</span></Grid>
                                                                                                            <Grid className="cmntMsgsCntnt"><p>I’m leaving a short comment right here</p></Grid>
                                                                                                            <Grid><Button>Edit</Button><Button>Delete</Button></Grid>
                                                                                                        </Grid>
                                                                                                    </Grid> */}


                                                                                        <Grid className="addComit">
                                                                                            <textarea
                                                                                                onChange={(e) => this.updateCommemtState(e)}
                                                                                            // value={this.state.comment}
                                                                                            >
                                                                                            </textarea>
                                                                                            <Button onClick={(e) => this.handleComment()}>Add Comment</Button>
                                                                                        </Grid>
                                                                                    </Grid>



                                                                                    <Grid item xs={12} md={12} className="saveTasks">
                                                                                        <a onClick={() => this.handleCloseTask()}><Button onClick={() => this.handleTaskSubmit()}>Save Task & Close</Button></a>
                                                                                    </Grid>
                                                                                </Grid>
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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, houseSelect, authy, Speciality })(
        Index
    )
);