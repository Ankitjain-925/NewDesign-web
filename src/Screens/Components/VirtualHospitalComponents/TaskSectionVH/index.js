import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import { getProfessionalData } from "Screens/VirtualHospital/PatientFlow/data";
import FileUploader from "Screens/Components/JournalFileUploader/index";
import { Speciality } from "Screens/Login/speciality.js";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { Redirect, Route } from "react-router-dom";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import { getPatientData } from "Screens/Components/CommonApi/index";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import Select from "react-select";
import { confirmAlert } from "react-confirm-alert";
import TaskView from "Screens/Components/VirtualHospitalComponents/TaskView/index";
import { getLanguage } from "translations/index";
import { S3Image } from "Screens/Components/GetS3Images/index";
import { getDate, newdate, getTime, getImage } from "Screens/Components/BasicMethod/index";
import { MultiFilter } from "../../MultiFilter/index";
import FileViews from "../../TimelineComponent/FileViews/index";

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTask: this.props.openTask,
      tabvalue: 0,
      tabvalue2: this.props.tabvalue2 || 0,
      q: "",
      selectedUser: "",
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
      userFilter: '',
      openAssign: false,
      newStaff: {},
      ProfMessage: false,
      newTask: {},
      Fileadd: "",
      AllTasks: this.props.AllTasks,
      shown: false,
      professionalArray: [],
      ArchivedTasks: this.props.ArchivedTasks,
      loaderImage: false,
      hope: false,
      openDate: true,
      specilaityList: [],
      assignedTo: [],
      assignedTo2: '',
      selectSpec: {},
      selectSpec2: '',
      DoneTask: this.props.DoneTask,
      noWards: false,
      AllTaskCss: '',
      DoneTaskCss: '',
      OpenTaskCss: '',
      ArchivedTasksCss: '',
      text: ''
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.tabvalue2 !== this.props.tabvalue2 ||
      prevProps.AllTasks !== this.props.AllTasks ||
      prevProps.ArchivedTasks !== this.props.ArchivedTasks ||
      prevProps.DoneTask !== this.props.DoneTask ||
      prevProps.OpenTask !== this.props.OpenTask
    ) {
      this.setState({
        tabvalue2: this.props.tabvalue2 || 0,
        AllTasks: this.props.AllTasks,
        ArchivedTasks: this.props.ArchivedTasks,
        DoneTask: this.props.DoneTask,
        OpenTask: this.props.OpenTask,
      });
    }
    if (prevProps.patient !== this.props.patient) {
      let user = { value: this.props.patient?.patient_id }
      this.updateEntryState2(user);
    }
  };

  componentDidMount() {
    this.getPatientData();
    this.getProfessionalData();
    this.specailityList();

    if (
      this.props.location?.state?.speciality &&
      this.props.location?.state?.user
    ) {
      if (this.props.location?.state?.speciality) {
        const state = this.state.newTask;
        this.setState({
          selectSpec: {
            label: this.props.location?.state?.speciality?.specialty_name,
            value: this.props.location?.state?.speciality?._id,
          },
        });
        state["speciality"] = this.props.location?.state?.speciality;
        this.setState({ newTask: state });
      }
      this.setState({ openTask: true });
    }
  }

  //to get the speciality list
  specailityList = () => {
    var spec =
      this.props.speciality?.SPECIALITY &&
      this.props?.speciality?.SPECIALITY.length > 0 &&
      this.props?.speciality?.SPECIALITY.map((data) => {
        return { label: data.specialty_name, value: data._id };
      });
    this.setState({ specilaityList: spec });
  };
  // open model Add Task
  handleOpenTask = () => {
    this.setState({
      openTask: true,
      newTask: {},
      assignedTo: [],
      q: "",
      selectSpec: {},
    });
  };
  // close model Add Task
  handleCloseTask = () => {
    this.setState({ openTask: false });
  };
  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
  };
  handleChangeTab2 = (event, tabvalue2) => {
    if (tabvalue2 == 3) {
      this.props.getArchived();
    }
    this.setState({ tabvalue2 });
  };

  createDuplicate = (data) => {
    delete data._id;
    data.archived = false;
    this.setState({ newTask: data });
  };
  handleCloseRvw = () => {
    this.setState({ noWards: false })
  }
  handleOpenRvw = () => {
    this.setState({ noWards: true })
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
      shown: !this.state.shown,
    });
  };

  handleComment = (e) => {
    var comments_by = {
      'first_name': this.props.stateLoginValueAim.user.first_name,
      'last_name': this.props.stateLoginValueAim.user.last_name,
      'alies_id': this.props.stateLoginValueAim.user.alies_id,
      'profile_id': this.props.stateLoginValueAim.user.profile_id,
      'user_id': this.props.stateLoginValueAim.user._id,
      'image': this.props.stateLoginValueAim.user.image
    }
    let comments = this.state.newTask.comments?.length > 0 ? this.state.newTask.comments : [];
    comments.push({
      comment: this.state.newComment,
      comment_on: new Date(),
      comment_by: comments_by
    });
    var state = this.state.newTask;
    state['comments'] = comments;
    this.setState({
      newTask: state,
      newComment: ''
    });
  }

  // submit Task model
  handleTaskSubmit = () => {
    var data = this.state.newTask;
    if (this.state.fileupods) {
      data.attachments = this.state.fileattach;
    }
    data.house_id = this.props?.House?.value;
    this.setState({ loaderImage: true });
    if (this.state.newTask._id) {
      axios
        .put(
          sitedata.data.path + "/vh/AddTask/" + this.state.newTask._id,
          data,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          this.setState({ loaderImage: false });
          if (responce.data.hassuccessed) {
            this.setState({
              newTask: {},
              fileattach: {},
              professional_data: [],
              fileupods: false,
              assignedTo: [],
              q: "",
              selectSpec: {},
            });
            this.props.getAddTaskData();
          }
        });
    } else {
      data.done_on = "";
      data.priority = 0;
      data.archived = false;
      data.status = "open";

      axios
        .post(
          sitedata.data.path + "/vh/AddTask",
          data,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {

          this.setState({ loaderImage: false });
          if (responce.data.hassuccessed) {
            let patient_id = data && data?.patient_id
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
                { data: data },
                commonHeader(this.props.stateLoginValueAim.token)
              ).then(res => {
                // let response = JSON.parse(res)
              })
                .catch(function (error) {
                  console.log("error", error)
                })
            }
            this.setState({
              newTask: {},
              fileattach: {},
              professional_data: [],
              fileupods: false,
              assignedTo: [],
              q: "",
              selectSpec: {},
              newComment: ''
            });
            this.props.getAddTaskData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  updateCommemtState = (e) => {
    this.setState({ newComment: e });
  }

  // For adding a date,time
  updateEntryState1 = (value, name) => {
    var due_on = this.state.newTask?.due_on ? this.state.newTask?.due_on : {};
    const state = this.state.newTask;
    if (name === "date" || name === "time") {
      due_on[name] = value;
      state["due_on"] = due_on;
    } else {
      state[name] = value;
    }
    this.setState({ newTask: state });
  };

  //Switch status done / open
  switchStatus = () => {
    const state = this.state.newTask;
    state["status"] = state.status === "done" ? "open" : "done";
    if (state.status === "done") {
      state["done_on"] = new Date();
    }
    this.setState({ newTask: state });
  };

  //Select the patient name
  updateEntryState2 = (user) => {
    var user1 = this.state.users?.length > 0 &&
      this.state.users.filter((data) => data.patient_id === user.value);
    if (user1 && user1.length > 0) {
      const state = this.state.newTask;
      state["patient"] = user1[0];
      state["patient_id"] = user1[0].patient_id;
      state["case_id"] = user1[0].case_id;
      this.setState({ newTask: state });
    }
  };

  updateUserFilter = (e) => {
    this.setState({ userFilter: e })
  }
  //Select the professional name
  updateEntryState4 = (e) => {
    this.setState({ assignedTo2: e })
  }
  updateEntryState3 = (e) => {
    this.setState({ assignedTo: e }, () => {
      var data =
        e?.length > 0 &&
        e.reduce((last, current, index) => {
          let isProf =
            this.state.professionalArray?.length > 0 &&
            this.state.professionalArray.filter(
              (data, index) => data.user_id === current.value
            );
          if (isProf && isProf.length > 0) {
            last.push(isProf[0]);
          }
          return last;
        }, []);
      const state = this.state.newTask;
      state["assinged_to"] = data;
      this.setState({ newTask: state });
    });
  };

  //Change the UserList
  onChange = (event) => {
    const q = event.target.value.toLowerCase();
    this.setState({ q }, () => this.filterList());
  };

  // Get the Patient data
  getPatientData = async () => {
    this.setState({ loaderImage: true });
    let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value)
    if (response.isdata) {
      this.setState({ users1: response.PatientList1, users: response.patientArray }, () => {
        if (this.props.location?.state?.user) {
          let user =
            this.state.users1.length > 0 &&
            this.state.users1.filter(
              (user) =>
                user.value === this.props.location?.state?.user.value
            );

          if (user?.length > 0) {
            this.setState({ q: user[0]?.name, selectedUser: user[0] });
          }
          this.updateEntryState2(this.props.location?.state?.user);
        }
      });
    }
    else {
      this.setState({ loaderImage: false });
    }
  };

  filterList = () => {
    let users = this.state.users1;
    let q = this.state.q;
    users =
      users &&
      users.length > 0 &&
      users.filter(function (user) {
        return (
          user.label.toLowerCase().indexOf(q) != -1 ||
          user.profile_id.toLowerCase().indexOf(q) != -1
        );
        // return  // returns true or false
      });
    this.setState({ filteredUsers: users });
    if (this.state.q == "") {
      this.setState({ filteredUsers: [] });
    }
  };

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

  FilterText = (e) => {
    this.setState({ text: e.target.value })
    let track1 = this.props.AllTasks;
    let FilterFromSearch1 = track1 && track1.length > 0 && track1.filter((obj) => {
      return JSON.stringify(obj).toLowerCase().includes(e.target?.value?.toLowerCase());
    });
    this.setState({ AllTasks: FilterFromSearch1 })

    let track2 = this.props.DoneTask;
    let FilterFromSearch2 = track2 && track2.length > 0 && track2.filter((obj) => {
      return JSON.stringify(obj).toLowerCase().includes(e.target?.value?.toLowerCase());
    });
    this.setState({ DoneTask: FilterFromSearch2 })

    let track3 = this.props.OpenTask;
    let FilterFromSearch3 = track3 && track3.length > 0 && track3.filter((obj) => {
      return JSON.stringify(obj).toLowerCase().includes(e.target?.value?.toLowerCase());
    });
    this.setState({ OpenTask: FilterFromSearch3 })

    let track4 = this.props.ArchivedTasks;
    let FilterFromSearch4 = track4 && track4.length > 0 && track4.filter((obj) => {
      return JSON.stringify(obj).toLowerCase().includes(e.target?.value?.toLowerCase());
    });
    this.setState({ ArchivedTasks: FilterFromSearch4 })
  }
  deleteClickTask(id) {
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path + "/vh/AddTask/" + id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.props.getAddTaskData();
        }
        this.setState({ loaderImage: false });
      })
      .catch((error) => { });
  }
  // open Edit model
  editTask = (data) => {
    var assignedTo =
      data?.assinged_to?.length > 0 &&
      data?.assinged_to.map((data) => {
        var name = "";
        if (data?.first_name && data?.last_name) {
          name = data?.first_name + " " + data?.last_name;
        } else if (data?.first_name) {
          name = data?.first_name;
        }
        return { label: name, value: data._id };
      });
    var pat1name = "";
    if (data?.patient?.first_name && data?.patient?.last_name) {
      pat1name = data?.patient?.first_name + " " + data?.patient?.last_name;
    } else if (data?.first_name) {
      pat1name = data?.patient?.first_name;
    }
    this.setState({
      newTask: data,
      openTask: true,
      assignedTo: assignedTo,
      q: pat1name,
      selectSpec: {
        label: data?.speciality?.specialty_name,
        value: data?.speciality?._id,
      },
    });
  };

  // Get the Professional data
  getProfessionalData = async () => {
    this.setState({ loaderImage: true });
    var data = await getProfessionalData(
      this.props?.House?.value,
      this.props.stateLoginValueAim.token
    );
    if (data) {
      this.setState({
        loaderImage: false,
        professionalArray: data.professionalArray,
        professional_id_list: data.professionalList,
      });
    } else {
      this.setState({ loaderImage: false });
    }
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
  };

  // Clear filter
  clearFilter = () => {
    let { tabvalue2, DoneTask, OpenTask, ArchivedTasks } = this.state
    this.setState({ userFilter: '', assignedTo2: '', selectSpec2: '', AllTasks: this.props.AllTasks, DoneTask: this.props.DoneTask, OpenTask: this.props.OpenTask, ArchivedTasks: this.props.ArchivedTasks })
    // if (tabvalue2 === 0) {
    //   this.setState({ AllTasks: this.props.AllTasks, AllTaskCss: '' })
    // }
    // else if (tabvalue2 === 1) {
    //   this.setState({ DoneTask: this.props.DoneTask, DoneTaskCss: '' })
    // }
    // else if (tabvalue2 === 2) {
    //   this.setState({ OpenTask: this.props.OpenTask, OpenTaskCss: '' })
    // }
    // else if (tabvalue2 === 3) {
    //   this.setState({ ArchivedTasks: this.props.ArchivedTasks, ArchivedTasksCss: '' })
    // }
    this.setState({ noWards: false })
  }
  applyFilter = () => {
    let { userFilter, assignedTo2, selectSpec2, tabvalue2 } = this.state
    let tasks = ''
    if (tabvalue2 === 0) {
      tasks = this.props.AllTasks
    }
    else if (tabvalue2 === 1) {
      tasks = this.props.DoneTask
    }
    else if (tabvalue2 === 2) {
      tasks = this.props.OpenTask
    }
    else if (tabvalue2 === 3) {
      tasks = this.props.ArchivedTasks
    }
    let data = MultiFilter(userFilter, assignedTo2, selectSpec2, tasks)

    if (tabvalue2 === 0) {
      this.setState({ AllTasks: data, AllTaskCss: 'filterApply' })
    }
    else if (tabvalue2 === 1) {
      this.setState({ DoneTask: data, DoneTaskCss: 'filterApply' })
    }
    else if (tabvalue2 === 2) {
      this.setState({ OpenTask: data, OpenTaskCss: 'filterApply' })
    }
    else if (tabvalue2 === 3) {
      this.setState({ ArchivedTasks: data, ArchivedTasksCss: 'filterApply' })
    }

    this.handleCloseRvw();

  }

  //On Changing the specialty id
  onFieldChange2 = (e) => {
    this.setState({ selectSpec2: e })
  }

  onFieldChange = (e) => {
    const state = this.state.newTask;
    this.setState({ selectSpec: e });
    var speciality =
      this.props.speciality?.SPECIALITY &&
      this.props?.speciality?.SPECIALITY.length > 0 &&
      this.props?.speciality?.SPECIALITY.filter((data) => data._id === e.value);
    if (speciality && speciality.length > 0) {
      state["speciality"] = {
        background_color: speciality[0]?.background_color,
        color: speciality[0]?.color,
        specialty_name: speciality[0]?.specialty_name,
        _id: speciality[0]?._id,
      };
      this.setState({ newTask: state });
    }
  };


  openTaskTime = () => {
    this.setState({ openDate: !this.state.openDate });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Tasks_overview,
      Open,
      Donetoday,
      CreateaTask,
      ForPatient,
      Taskdescription,
      Assignedto,
      Speciallity,
      Dueon,
      Duplicate,
      Archive,
      Markasdone,
      Attachments,
    } = translate;
    const { tabvalue, tabvalue2, professional_data, newTask, AllTasks, AllTaskCss, DoneTaskCss, OpenTaskCss, ArchivedTasksCss } =
      this.state;
    const userList =
      this.state.filteredUsers &&
      this.state.filteredUsers.map((user) => {
        return (
          <li
            key={user.id}
            style={{
              background: this.myColor(user.id),
              color: this.color(user.id),
            }}
            value={user.profile_id}
            onClick={() => {
              this.setState({ q: user.label, selectedUser: user });
              this.updateEntryState2(user);
              this.toggle(user.id);
              this.setState({ filteredUsers: [] });
            }}
          >
            {user.label} ( {user.profile_id} )
          </li>
        );
      });

    return (
      <Grid className="topLeftSpc taskViewMob">
        <Grid container direction="row">
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
            {this.props.comesFrom !== 'Professional' && <Grid className="addTaskBtn">
              <Button onClick={this.handleOpenTask}>+ Add Task</Button>
            </Grid>}
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
            open={this.state.openTask}
            onClose={this.handleCloseTask}
          >
            <Grid className="creatTaskModel">
              <Grid className="creatTaskCntnt">
                <Grid container direction="row">
                  <Grid item xs={12} md={12}>
                    <Grid className="creatLbl">
                      <Grid className="creatLblClose">
                        <a onClick={this.handleCloseTask}>
                          <img
                            src={require("assets/virtual_images/closefancy.png")}
                            alt=""
                            title=""
                          />
                        </a>
                      </Grid>
                      <label>{CreateaTask}</label>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid className="creatDetail">
                      <Grid className="creatInfoIner">
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item xs={12} md={12}>
                            {/* <label>Task title</label>
                                                            <Grid><input type="text" placeholder="Enter title" /></Grid> */}
                            <VHfield
                              label="Task title"
                              name="task_name"
                              placeholder="Enter title"
                              onChange={(e) =>
                                this.updateEntryState1(
                                  e.target.value,
                                  e.target.name
                                )
                              }
                              value={this.state.newTask.task_name}
                              disabled={this.props.comesFrom === 'Professional' ? true : false}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <label>{ForPatient}</label>
                            {(this.props.comesFrom === 'detailTask') ? <h2>{this.props.patient?.first_name} {this.props.patient?.last_name}</h2> :
                              this.props.comesFrom === 'Professional' ? <h2>{this.state.newTask?.patient?.first_name} {this.state.newTask?.patient?.last_name}</h2>
                                : <Grid>
                                  <input
                                    type="text"
                                    placeholder={"Search & Select"}
                                    value={this.state.q}
                                    onChange={this.onChange}
                                  />
                                  <ul className={this.state.shown && "patientHint"}>
                                    {userList}
                                  </ul>
                                </Grid>}
                          </Grid>
                          {!this.state.newTask._id && (
                            <Grid item xs={12} md={12}>
                              <Grid className="hideTask">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="checkedC"
                                      checked={this.state.newTask?.hidePatient}
                                      onChange={(e) =>
                                        this.updateEntryState1(
                                          e.target.checked,
                                          "hidePatient"
                                        )
                                      }
                                      disabled={this.props.comesFrom === 'Professional' ? true : false}
                                    />
                                  }
                                  label="Hide task from patient"
                                />
                              </Grid>
                            </Grid>
                          )}
                          <Grid item xs={12} md={12} className="taskDescp">
                            <label>{Taskdescription}</label>
                            <Grid>
                              <textarea
                                placeholder="Enter description"
                                name="description"
                                onChange={(e) =>
                                  this.updateEntryState1(
                                    e.target.value,
                                    e.target.name
                                  )
                                }
                                value={this.state.newTask.description}
                                disabled={this.props.comesFrom === 'Professional' ? true : false}
                              ></textarea>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <label>{Assignedto}</label>
                            <Grid>
                              <Select
                                name="professional"
                                onChange={(e) => this.updateEntryState3(e)}
                                value={this.state.assignedTo}
                                options={this.state.professional_id_list}
                                placeholder="Search & Select"
                                className="addStafSelect"
                                isMulti={true}
                                isSearchable={true}
                                isDisabled={this.props.comesFrom === 'Professional' ? true : false}
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
                                isDisabled={this.props.comesFrom === 'Professional' ? true : false}
                              />
                            </Grid>
                          </Grid>
                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={10} md={10} className="dueOn">
                              <label>{Dueon}</label>
                              <Grid>
                                {this.state.openDate ? (
                                  <DateFormat
                                    name="date"
                                    value={
                                      this.state.newTask?.due_on?.date
                                        ? new Date(
                                          this.state.newTask?.due_on?.date
                                        )
                                        : new Date()
                                    }
                                    notFullBorder
                                    date_format={this.state.date_format}
                                    onChange={(e) =>
                                      this.updateEntryState1(e, "date")
                                    }
                                    disabled={this.props.comesFrom === 'Professional' ? true : false}
                                  />
                                ) : (
                                  <TimeFormat
                                    name="time"
                                    value={
                                      this.state.newTask?.due_on?.time
                                        ? new Date(
                                          this.state.newTask?.due_on?.time
                                        )
                                        : new Date()
                                    }
                                    time_format={this.state.time_format}
                                    onChange={(e) =>
                                      this.updateEntryState1(e, "time")
                                    }
                                    disabled={this.props.comesFrom === 'Professional' ? true : false}
                                  />
                                )}
                              </Grid>
                            </Grid>
                            <Grid item xs={2} md={2} className="addTime">
                              <Button
                                onClick={() => {
                                  this.openTaskTime();
                                }}
                              >
                                {this.state.openDate ? "Add time" : "Add date"}
                              </Button>
                            </Grid>
                          </Grid>

                          <Grid className="assignSecUpr">
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={12} sm={12} md={12}>
                                <Grid className="assignSec">
                                  {this.state.newTask._id && (
                                    <>
                                      {this.props.comesFrom !== 'Professional' && <>
                                        <Grid
                                          onClick={() => {
                                            this.createDuplicate(
                                              this.state.newTask
                                            );
                                          }}
                                        >
                                          <img
                                            src={require("assets/virtual_images/assign-to.svg")}
                                            alt=""
                                            title=""
                                          />
                                          <label>{Duplicate}</label>
                                        </Grid>
                                        <Grid
                                          onClick={() => {
                                            this.updateEntryState1(
                                              true,
                                              "archived"
                                            );
                                          }}
                                        >
                                          <img
                                            src={require("assets/virtual_images/assign-to.svg")}
                                            alt=""
                                            title=""
                                          />
                                          <label>{Archive}</label>
                                        </Grid>
                                        <Grid>
                                          <img
                                            onClick={(id) => {
                                              this.removeTask(id);
                                            }}
                                            src={require("assets/virtual_images/assign-to.svg")}
                                            alt=""
                                            title=""
                                          />
                                          <label
                                            onclick={(id) => {
                                              this.removeTask(id);
                                            }}
                                          >
                                            Delete
                                          </label>
                                        </Grid>
                                      </>}
                                      <Grid
                                        onClick={() => {
                                          this.switchStatus();
                                        }}
                                        className="markDone"
                                      >
                                        {this.state.newTask.status ===
                                          "done" ? (
                                          <Grid>
                                            <img
                                              src={require("assets/virtual_images/rightTick.png")}
                                              alt=""
                                              title=""
                                            />
                                          </Grid>
                                        ) : (
                                          <Grid>
                                            <img
                                              src={require("assets/virtual_images/greyImg.jpg")}
                                              alt=""
                                              title=""
                                            />
                                          </Grid>
                                        )}
                                        <label>{Markasdone}</label>
                                      </Grid>
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          {this.props.comesFrom !== 'Professional' && <Grid item xs={12} md={12}>
                            <label>{Attachments}</label>
                            <FileUploader
                              // cur_one={this.props.cur_one}
                              attachfile={
                                this.state.newTask &&
                                  this.state.newTask.attachfile
                                  ? this.state.newTask.attachfile
                                  : []
                              }
                              name="UploadTrackImageMulti"
                              isMulti="true"
                              fileUpload={(event) => {
                                this.FileAttachMulti(event);
                              }}
                            />
                          </Grid>}
                          <Grid className="addSpc detailMark">
                            <FileViews
                              attachfile={this.state.newTask?.attachments}
                            />
                          </Grid>
                          {this.props.comesFrom === 'Professional' && <Grid item xs={12} md={12}>
                            <Grid><label>Comments</label></Grid>
                            {this.state.newTask?.comments?.length > 0 && this.state.newTask?.comments.map((data, index) => (
                              <Grid className="cmntIner cmntInerBrdr">

                                <Grid className="cmntMsgs">
                                  <Grid><S3Image imgUrl={data?.comment_by?.image} /></Grid>
                                  <Grid>
                                    <Grid><label>{data?.comment_by?.first_name} {data?.comment_by?.last_name}</label><span>{getDate(
                                      data.comment_on,
                                      this.props.settings?.setting?.date_format
                                    )}</span> -
                                      <span>{getTime(
                                        new Date(data.comment_on),
                                        this.props.settings?.setting?.time_format
                                      )}</span>
                                    </Grid>
                                    <Grid className="cmntMsgsCntnt"><p>{data?.comment}</p></Grid>
                                    <Grid>
                                      <Button onClick={() => this.editDocComment(data)}>Edit</Button>
                                      <Button onClick={() => this.removeComment(index)}>Delete</Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}
                            <Grid className="addComit">
                              <textarea
                                placeholder="Enter Comment"
                                name="comment"
                                onChange={(e) =>
                                  this.updateCommemtState(
                                    e.target.value
                                  )
                                }
                                value={this.state.newComment}
                              ></textarea>

                              <Button onClick={(e) => this.handleComment()}>Add Comment</Button>
                            </Grid>
                          </Grid>}

                          <Grid item xs={12} md={12} className="saveTasks">
                            <a onClick={() => this.handleCloseTask()}>
                              <Button onClick={() => this.handleTaskSubmit()}>
                                Save Task & Close
                              </Button>
                            </a>
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
                    {(this.props.comesFrom !== "detailTask" || this.props.comesFrom !== "Professional") && (
                      <Tab label="Archived" className="billtabIner" />
                    )}
                  </Tabs>
                </AppBar>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Grid className="taskSort">
                  <Input type='text' name='search' placeholder="Search" value={this.state.text} onChange={this.FilterText}></Input>
                  <a>
                    <img
                      src={require("assets/virtual_images/search-entries.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                  {tabvalue2 === 0 &&
                    <a className={AllTaskCss}> <img src={require("assets/virtual_images/sort.png")} alt="" title="" onClick={this.handleOpenRvw} /> </a>
                  }
                  {tabvalue2 === 1 &&
                    <a className={DoneTaskCss}> <img src={require("assets/virtual_images/sort.png")} alt="" title="" onClick={this.handleOpenRvw} /> </a>
                  }
                  {tabvalue2 === 2 &&
                    <a className={OpenTaskCss}> <img src={require("assets/virtual_images/sort.png")} alt="" title="" onClick={this.handleOpenRvw} /> </a>
                  }
                  {tabvalue2 === 3 &&
                    <a className={ArchivedTasksCss}> <img src={require("assets/virtual_images/sort.png")} alt="" title="" onClick={this.handleOpenRvw} /> </a>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {tabvalue2 === 0 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.AllTasks.length > 0 &&
                  this.state.AllTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 1 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.DoneTask.length > 0 &&
                  this.state.DoneTask.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 2 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.OpenTask.length > 0 &&
                  this.state.OpenTask.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 3 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.ArchivedTasks.length > 0 &&
                  this.state.ArchivedTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
        </Grid>
        <Modal open={this.state.noWards} onClose={this.handleCloseRvw}>
          <Grid className="fltrClear">
            <Grid className="fltrClearIner">
              <Grid className="fltrLbl">
                <Grid className="fltrLblClose">
                  <a onClick={this.handleCloseRvw}><img src={require('../../../../assets/images/closefancy.png')} alt="" title="" /></a>
                </Grid>
                <label>Filters</label>
              </Grid>
              {/* <AppBar position="static" className="fltrTabs">
                                <Tabs 
                                // value={value}
                                 onChange={this.handleChangeTab}>
                                    <Tab label="My Tasks" className="fltrtabIner" />
                                    <Tab label="All Tasks" className="fltrtabIner" />
                                </Tabs>
                            </AppBar> */}
              {/* {value === 0 && */}
              <TabContainer>
                <Grid className="fltrForm">
                  <Grid className="fltrInput">
                    <label>Patient</label>
                    <Grid className="addInput">

                      <Select
                        name="professional"
                        onChange={(e) => this.updateUserFilter(e)}
                        value={this.state.userFilter}
                        options={this.state.users1}
                        placeholder="Filter by patient"
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="fltrInput">
                    <label>Staff</label>
                    <Grid className="addInput">
                      <Select
                        name="professional"
                        onChange={(e) => this.updateEntryState4(e)}
                        value={this.state.assignedTo2}
                        options={this.state.professional_id_list}
                        placeholder="Filter by Staff"
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="fltrInput">
                    <label>Speciality</label>
                    <Grid className="addInput">
                      <Select
                        onChange={(e) => this.onFieldChange2(e)}
                        options={this.state.specilaityList}
                        name="specialty_name"
                        value={this.state.selectSpec2}
                        placeholder="Filter by Speciality"
                        isMulti={true}
                        isSearchable={true} />
                    </Grid>
                  </Grid>
                  {/* <Grid className="fltrInput">
                                        <label>Ward</label>
                                        <Grid className="addInput">
                                            <input type="text" placeholder="Filter by Ward" />
                                            <img src={require('../../../../assets/images/add.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                    <Grid className="fltrInput">
                                        <label>Room</label>
                                        <Grid className="addInput">
                                            <input type="text" placeholder="Filter by Room" />
                                            <img src={require('../../../../assets/images/add.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid> */}
                </Grid>
                <Grid className="aplyFltr">
                  <Grid className="aplyLft"><label className="filterCursor" onClick={this.clearFilter}>Clear all filters</label></Grid>
                  <Grid className="aplyRght"><Button onClick={this.applyFilter}>Apply filters</Button></Grid>
                </Grid>
              </TabContainer>
              {/* } */}
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
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
    speciality,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    Speciality,
  })(Index)
);
