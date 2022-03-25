import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import { getProfessionalData } from 'Screens/VirtualHospital/PatientFlow/data';
import FileUploader from 'Screens/Components/JournalFileUploader/index';
import { Speciality } from 'Screens/Login/speciality.js';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from 'Screens/VirtualHospital/Institutes/selecthouseaction';
import VHfield from 'Screens/Components/VirtualHospitalComponents/VHfield/index';
import { getPatientData } from 'Screens/Components/CommonApi/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import TimeFormat from 'Screens/Components/TimeFormat/index';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import TaskView from 'Screens/Components/VirtualHospitalComponents/TaskView/index';
import { getLanguage } from 'translations/index';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import {
  getDate,
  newdate,
  getTime,
  getImage,
} from 'Screens/Components/BasicMethod/index';
import _ from 'lodash';
import FileViews from '../../../Components/TimelineComponent/FileViews/index';

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
      userFilter: '',
      openAssign: false,
      newStaff: {},
      ProfMessage: false,
      newTask: {},
      Fileadd: '',
      AllTasks: this.props.AllTasks,
      shown: false,
      professionalArray: [],
      patientForFilter: this.props.patientForFilter,
      ArchivedTasks: this.props.ArchivedTasks,
      loaderImage: false,
      hope: false,
      openDate: true,
      specilaityList: [],
      wardList: [],
      roomList: [],
      assignedTo: [],
      assignedTo2: '',
      selectSpec: {},
      selectSpec2: '',
      selectWard: '',
      selectRoom: '',
      DoneTask: this.props.DoneTask,
      noWards: false,
      AllTaskCss: '',
      DoneTaskCss: '',
      OpenTaskCss: '',
      ArchivedTasksCss: '',
      text: '',
      errorMsg: '',
      openServ: false,
      editcomment: false,
      check: {},
      allWards: '',
      newComment: '',
      length: '',
      selectedPat: {},
      professional_id_list1: [],
      images: [],
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.tabvalue2 !== this.props.tabvalue2 ||
      prevProps.AllTasks !== this.props.AllTasks ||
      prevProps.ArchivedTasks !== this.props.ArchivedTasks ||
      prevProps.DoneTask !== this.props.DoneTask ||
      prevProps.OpenTask !== this.props.OpenTask ||
      prevProps.patientForFilter !== this.props.patientForFilter
    ) {
      this.setState({
        tabvalue2: this.props.tabvalue2 || 0,
        AllTasks: this.props.AllTasks,
        ArchivedTasks: this.props.ArchivedTasks,
        DoneTask: this.props.DoneTask,
        OpenTask: this.props.OpenTask,
        patientForFilter: this.props.patientForFilter,
      });
    }
    if (prevProps.patient !== this.props.patient) {
      let user = { value: this.props.patient?.patient_id };
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
      const state = this.state.newTask;
      this.setState({
        selectSpec: {
          label: this.props.location?.state?.speciality?.specialty_name,
          value: this.props.location?.state?.speciality?._id,
        },
      });
      state['speciality'] = this.props.location?.state?.speciality;
      state['patient'] = this.props.location?.state?.user;
      this.setState({ newTask: state });
      this.setState({ openTask: true });
    }
    if (
      this.props.history.location?.state?.data &&
      this.props.history.location?.state?.data === true
    ) {
      this.setState({ openTask: true });
    }
  }

  // manage assign to list
  selectProf = (listing, data) => {
    var showdata = data;
    var alredyAssigned =
      listing &&
      listing?.length > 0 &&
      listing.map((item) => {
        return item.user_id;
      });
    if (alredyAssigned && alredyAssigned.length > 0) {
      showdata =
        data?.length > 0 &&
        data.filter((item) => !alredyAssigned.includes(item.value));
      var assignedto =
        data?.length > 0 &&
        data.filter((item) => alredyAssigned.includes(item.value));
      this.setState({ assignedTo: assignedto });
    }
    this.setState({ professional_id_list1: showdata });
  };

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
      q: '',
      selectSpec: {},
    });
    if (this.props.patient) {
      let user = { value: this.props.patient?.patient_id };
      this.updateEntryState2(user);
    }
  };
  // close model Add Task
  handleCloseTask = () => {
    this.setState({ openTask: false, newTask: {} });
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
    this.setState({ noWards: false });
  };
  handleOpenRvw = () => {
    this.setState({ noWards: true });
  };
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
      first_name: this.props.stateLoginValueAim.user.first_name,
      last_name: this.props.stateLoginValueAim.user.last_name,
      alies_id: this.props.stateLoginValueAim.user.alies_id,
      profile_id: this.props.stateLoginValueAim.user.profile_id,
      user_id: this.props.stateLoginValueAim.user._id,
      image: this.props.stateLoginValueAim.user.image,
    };
    let comments =
      this.state.newTask.comments?.length > 0
        ? this.state.newTask.comments
        : [];
    comments.push({
      comment: this.state.newComment,
      comment_on: new Date(),
      comment_by: comments_by,
    });
    var state = this.state.newTask;
    state['comments'] = comments;
    this.setState({
      newTask: state,
      newComment: '',
    });
  };
  updateTaskFilter = (e) => {
    const state = this.state.check;
    state[e.target.name] = e.target.value == 'true' ? true : false;
    this.setState({ taskFilter: state });
  };
  // submit Task model
  handleTaskSubmit = () => {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Task_title_cant_be_empty,
      Plz_select_a_Patient,
      Something_went_wrong,
    } = translate;
    this.setState({ errorMsg: '' });

    var data = this.state.newTask;
    if (
      !data.task_name ||
      (data && data.task_name && data.task_name.length < 1)
    ) {
      this.setState({ errorMsg: Task_title_cant_be_empty });
    } else if (
      !data.patient ||
      (data && data.patient && data.patient.length < 1)
    ) {
      this.setState({ errorMsg: Plz_select_a_Patient });
    } else {
      if (data?.patient?.speciality?._id !== data?.speciality?._id) {
        this.setSpeciality(data?.speciality, data?.case_id);
      }
      delete data?.patient?.speciality;
      if (this.state.fileupods) {
        data.attachments = this.state.fileattach;
      }
      data.house_id = this.props?.House?.value;
      this.setState({ loaderImage: true });
      if (this.state.newTask._id) {
        axios
          .put(
            sitedata.data.path + '/vh/AddTask/' + this.state.newTask._id,
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
                q: '',
                selectSpec: {},
              });
              this.props.getAddTaskData();
              this.handleCloseTask();
              this.props.getArchived();
            } else {
              this.setState({ errorMsg: Something_went_wrong });
            }
          });
      } else {
        data.done_on = '';
        data.priority = 0;
        data.archived = false;
        data.status = 'open';
        data.created_at = new Date();
        if (!data?.due_on?.date) {
          let due_on = data?.due_on || {};
          due_on['date'] = new Date();
          data.due_on = due_on;
        }
        if (!data?.due_on?.time) {
          let due_on = data?.due_on || {};
          due_on['time'] = new Date();
          data.due_on = due_on;
        }
        axios
          .post(
            sitedata.data.path + '/vh/AddTask',
            data,
            commonHeader(this.props.stateLoginValueAim.token)
          )
          .then((responce) => {
            this.setState({
              newTask: {},
              fileattach: {},
              professional_data: [],
              fileupods: false,
              assignedTo: [],
              q: '',
              selectSpec: {},
              newComment: '',
            });
            this.props.getAddTaskData();
            this.handleCloseTask();
          })
          .catch(function (error) {
            console.log(error);
            this.setState({ errorMsg: Something_went_wrong });
          });
      }
    }
  };

  updateCommemtState = (e) => {
    this.setState({ newComment: e });
  };

  removeComment = (index) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { remove_comment, No, Yes, you_sure_to_remove_comment } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1>{remove_comment}</h1>
            <p>{you_sure_to_remove_comment}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>

              <button
                onClick={() => {
                  this.removebtn(index);
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  removebtn = (index) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { RemoveComment, really_want_to_remove_comment, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1 class="alert-btn">{RemoveComment}</h1>
            <p>{really_want_to_remove_comment}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>

              <button
                onClick={() => {
                  this.deleteClickComment(index);
                  onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  deleteClickComment(index) {
    var state = this.state.newTask;
    var array = this.state.newTask.comments;
    array.splice(index, 1);
    state['comments'] = array;
    this.setState({ newTask: state, openTask: true });
  }

  editComment = (index) => {
    this.setState({ editcomment: index });
  };

  oNEditText(e, index) {
    var state = this.state.newTask;
    state['comments'][index]['comment'] = e.target.value;
    this.setState({ newTask: state });
  }

  setSpeciality = (data, case_id) => {
    // this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + '/cases/AddCase/' + case_id,
        {
          speciality: {
            background_color: data.background_color,
            color: data.color,
            specialty_name: data.specialty_name,
            _id: data._id,
          },
          wards: {},
          rooms: {},
          bed: '',
        },
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce1) => {});
  };
  // onKeyUp = (e) => {
  //   if (e.key === "Enter") {
  //
  //   }
  // };

  // For adding a date,time
  updateEntryState1 = (value, name) => {
    var due_on = this.state.newTask?.due_on ? this.state.newTask?.due_on : {};
    const state = this.state.newTask;
    if (name === 'date' || name === 'time') {
      due_on[name] = value;
      state['due_on'] = due_on;
    } else {
      state[name] = value;
    }
    this.setState({ newTask: state });
  };

  //Switch status done / open
  switchStatus = () => {
    const state = this.state.newTask;
    state['status'] = state.status === 'done' ? 'open' : 'done';
    if (state.status === 'done') {
      state['done_on'] = new Date();
    }
    this.setState({ newTask: state });
  };

  //Select the patient name
  updateEntryState2 = (user) => {
    var user1 =
      this.state.users?.length > 0 &&
      this.state.users.filter((data) => data.patient_id === user.value);
    if (user1 && user1.length > 0) {
      const state = this.state.newTask;
      state['patient'] = user1[0];
      state['patient_id'] = user1[0].patient_id;
      state['case_id'] = user1[0].case_id;
      if (!user.label) {
        user['label'] =
          user1[0].first_name && user1[0].last_name
            ? user1[0].first_name + ' ' + user1[0].last_name
            : user1[0].first_name;
      }
      if (!state?.speciality) {
        state['speciality'] = user1[0].speciality;
        this.setState({
          selectSpec: {
            label: user1[0]?.speciality?.specialty_name,
            value: user1[0]?.speciality?._id,
          },
        });
      }
      this.setState({ newTask: state, selectedPat: user });
    }
  };
  // let filterbadge =
  //     this.state.selectedUserType.length +
  //     this.state.selectFacility.length +
  //     this.state.selectedType.length;

  updateUserFilter = (e) => {
    this.setState({ userFilter: e });
  };

  //Select the professional name
  updateEntryState4 = (e) => {
    this.setState({ assignedTo2: e });
  };
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
      state['assinged_to'] = data;
      this.setState({ newTask: state }, () => {
        this.selectProf(
          this.state.newTask?.assinged_to,
          this.state.professional_id_list
        );
      });
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
    let response = await getPatientData(
      this.props.stateLoginValueAim.token,
      this.props?.House?.value,
      'taskpage'
    );
    if (response?.isdata) {
      this.setState(
        { users1: response.PatientList1, users: response.patientArray },
        () => {
          if (this.props.location?.state?.user) {
            let user =
              this.state.users1.length > 0 &&
              this.state.users1.filter(
                (user) => user.value === this.props.location?.state?.user.value
              );
            // if (user?.length > 0) {
            //   this.setState({ q: user[0]?.name, selectedUser: user[0] });
            // }
            this.updateEntryState2(this.props.location?.state?.user);
          }
        }
      );
    } else {
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
    if (this.state.q == '') {
      this.setState({ filteredUsers: [] });
    }
  };

  //{Delete} the perticular service confirmation box
  removeTask = (id) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { remove_task, you_sure_to_remove_task, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1>{remove_task}</h1>
            <p>{you_sure_to_remove_task}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.removeTask2(id);
                  // onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  removeTask2 = (id) => {
    this.setState({ message: null, openTask: false });
    let translate = getLanguage(this.props.stateLanguageType);
    let { RemoveTask, really_want_to_remove_task, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm react-confirm-alert-body'
                : 'react-confirm-alert-body'
            }
          >
            <h1 class="alert-btn">{RemoveTask}</h1>
            <p>{really_want_to_remove_task}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  this.deleteClickTask(id);
                  onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  FilterText = (e) => {
    this.setState({ text: e.target.value });
    let track1 = this.props.AllTasks;
    let FilterFromSearch1 =
      track1 &&
      track1.length > 0 &&
      track1.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ AllTasks: FilterFromSearch1 });

    let track2 = this.props.DoneTask;
    let FilterFromSearch2 =
      track2 &&
      track2.length > 0 &&
      track2.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ DoneTask: FilterFromSearch2 });

    let track3 = this.props.OpenTask;
    let FilterFromSearch3 =
      track3 &&
      track3.length > 0 &&
      track3.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ OpenTask: FilterFromSearch3 });

    let track4 = this.props.ArchivedTasks;
    let FilterFromSearch4 =
      track4 &&
      track4.length > 0 &&
      track4.filter((obj) => {
        return JSON.stringify(obj)
          .toLowerCase()
          .includes(e.target?.value?.toLowerCase());
      });
    this.setState({ ArchivedTasks: FilterFromSearch4 });
  };
  //for delete the Task
  deleteClickTask(id) {
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path + '/vh/AddTask/' + id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.props.getAddTaskData();
        }
        this.setState({ loaderImage: false });
      })
      .catch((error) => {});
  }
  // open Edit model
  editTask = (data) => {
    // var assignedTo =
    //   data?.assinged_to?.length > 0 &&
    //   data?.assinged_to.map((data) => {
    //     var name = "";
    //     if (data?.first_name && data?.last_name) {
    //       name = data?.first_name + " " + data?.last_name;
    //     } else if (data?.first_name) {
    //       name = data?.first_name;
    //     }
    //     return { label: name, value: data._id };
    //   });
    this.selectProf(data?.assinged_to, this.state.professional_id_list);
    var pat1name = '';
    if (data?.patient?.first_name && data?.patient?.last_name) {
      pat1name = data?.patient?.first_name + ' ' + data?.patient?.last_name;
    } else if (data?.first_name) {
      pat1name = data?.patient?.first_name;
    }
    var deep = _.cloneDeep(data);
    this.setState({
      newTask: deep,
      openTask: true,
      // assignedTo: assignedTo,
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
      return '#00a891';
    }
    return '';
  }

  color(position) {
    if (this.state.active === position) {
      return 'white';
    }
    return '';
  }

  onClick = () => {
    this.setState({ hope: true });
  };

  // Clear filter
  clearFilter = () => {
    let { tabvalue2, DoneTask, OpenTask, ArchivedTasks } = this.state;
    this.setState({
      userFilter: '',
      assignedTo2: '',
      selectSpec2: '',
      AllTasks: this.props.AllTasks,
      DoneTask: this.props.DoneTask,
      OpenTask: this.props.OpenTask,
      ArchivedTasks: this.props.ArchivedTasks,
      wardList: '',
      roomList: '',
      allWards: '',
      noWards: false,
      AllTaskCss: '',
    });
  };

  findData = () => {
    let {
      userFilter,
      assignedTo2,
      selectSpec2,
      tabvalue2,
      selectRoom,
      selectWard,
      check,
    } = this.state;
    let done = check && check?.done && check.done == true ? 'done' : '';
    let open = check && check?.open && check.open == true ? 'open' : '';
    let status = [];
    if (tabvalue2 === 0) {
      if (done && done.length > 0) {
        status = [done];
      }
      if (open && open.length > 0) {
        status = [open];
      }
      if (done && done.length > 0 && open && open.length > 0) {
        status = [done, open];
      }
    } else if (tabvalue2 === 1) {
      status = ['done'];
    } else if (tabvalue2 === 2) {
      status = ['open'];
    }

    var data = { house_id: this.props.House?.value };
    if (selectWard?.value) {
      data.ward_id = selectWard?.value;
    }
    if (selectRoom?.value) {
      data.room_id = selectRoom?.value;
    }
    if (status && status.length > 0) {
      data.status = status;
    }
    if (selectSpec2?.value) {
      data.speciality_id = selectSpec2?.value;
    }
    if (assignedTo2 && assignedTo2.length > 0) {
      data.assigned_to =
        assignedTo2 &&
        assignedTo2.length > 0 &&
        assignedTo2.map((item) => {
          return item.value;
        });
    }
    if (userFilter && userFilter.length > 0) {
      data.patient_id =
        userFilter &&
        userFilter.length > 0 &&
        userFilter.map((item) => {
          return item.value;
        });
    }

    let dd = axios
      .post(
        sitedata.data.path + '/vh/TaskFilter',
        data,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          return responce.data.data ? responce.data.data : [];
        }
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
    return dd;
  };

  applyFilter = () => {
    let {
      userFilter,
      assignedTo2,
      selectSpec2,
      tabvalue2,
      selectRoom,
      selectWard,
    } = this.state;

    let tasks = '';
    if (tabvalue2 === 0) {
      tasks = this.props.AllTasks;
    } else if (tabvalue2 === 1) {
      tasks = this.props.DoneTask;
    } else if (tabvalue2 === 2) {
      tasks = this.props.OpenTask;
    } else if (tabvalue2 === 3) {
      tasks = this.props.ArchivedTasks;
    }
    let data2 = this.findData();
    data2.then((resp) => {
      if (tabvalue2 === 0) {
        this.setState({ AllTasks: resp, AllTaskCss: 'filterApply' });
      } else if (tabvalue2 === 1) {
        this.setState({ DoneTask: resp, DoneTaskCss: 'filterApply' });
      } else if (tabvalue2 === 2) {
        this.setState({ OpenTask: resp, OpenTaskCss: 'filterApply' });
      }
    });
    this.handleCloseRvw();
  };

  //On Changing the specialty id
  onFieldChange2 = (e) => {
    this.setState({
      selectRoom: '',
      selectWard: '',
      wardList: [],
      roomList: [],
    });
    let specialityList =
      this.props &&
      this.props.speciality &&
      this.props.speciality.SPECIALITY.filter((item) => {
        return item && item._id == e.value;
      });
    let wardsFullData =
      specialityList && specialityList.length > 0 && specialityList[0].wards;
    let wards_data =
      wardsFullData &&
      wardsFullData.length > 0 &&
      wardsFullData.map((item) => {
        return { label: item.ward_name, value: item._id };
      });
    this.setState({
      selectSpec2: e,
      wardList: wards_data,
      allWards: wardsFullData,
    });
  };

  // ward Change
  onWardChange = (e) => {
    this.setState({ selectRoom: '' });
    let { allWards } = this.state;
    let wardDetails =
      allWards &&
      allWards.length > 0 &&
      allWards.filter((item) => {
        return item && item._id == e.value;
      });
    let roomsData =
      wardDetails && wardDetails.length > 0 && wardDetails[0].rooms;
    let rooms =
      roomsData &&
      roomsData.length > 0 &&
      roomsData.map((item) => {
        return { label: item.room_name, value: item._id };
      });
    this.setState({ selectWard: e, roomList: rooms });
  };

  //room cahnge
  onRoomChange = (e) => {
    this.setState({ selectRoom: e });
  };
  onFieldChange = (e) => {
    const state = this.state.newTask;
    this.setState({ selectSpec: e });
    var speciality =
      this.props.speciality?.SPECIALITY &&
      this.props?.speciality?.SPECIALITY.length > 0 &&
      this.props?.speciality?.SPECIALITY.filter((data) => data._id === e.value);
    if (speciality && speciality.length > 0) {
      state['speciality'] = {
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
      CreateaTask,
      ForPatient,
      Taskdescription,
      Assignedto,
      Ward,
      Room,
      Speciallity,
      Patient,
      Staff,
      Dueon,
      Comments,
      filters,
      Taskstatus,
      speciality,
      Duplicate,
      applyFilters,
      clear_all_filters,
      Submit,
      Archive,
      Delete,
      edit,
      AddComment,
      save_task_and_close,
      Markasdone,
      remove_time,
      Attachments,
      add_task,
      Addtime,
      Entertitle,
      Search_Select,
      Enterdescription,
      EditComment,
      EnterComment,
      Search,
      Filterbypatient,
      FilterbyStaff,
      FilterbySpeciality,
      FilterbyWard,
      FilterbyRoom,
      Tasktitle,
      ALL,
      Done,
      Open,
      Archived,
      Hide_task_from_patient,
      rr_systolic,
      RR_diastolic,
      Hba1c,
      situation,
      smoking_status,
      status,
      from,
      when,
      until,
      age,
      gender,
      diabetes,
      blood_pressure,
      blood_sugar,
      place_of_residence,
      treatment_so_far,
      family_history,
      allergies,
      place_of_birth,
      phenotyp_race,
      medical_preconditions,
      premedication,
      travel_history_last_month,
      image_evaluation,
      pain_level,
      itch,
      pain,
      size_progress,
      warm,

      yes,
      no,
      cold,
      sexual_active,
      sun_before,
      body_temp,
      payment_done,
    } = translate;
    const {
      tabvalue,
      tabvalue2,
      professional_data,
      newTask,
      AllTasks,
      AllTaskCss,
      DoneTaskCss,
      OpenTaskCss,
      ArchivedTasksCss,
    } = this.state;
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
    let { userFilter, assignedTo2, selectSpec2, selectWard, selectRoom } =
      this.state;
    return (
      <Grid className="topLeftSpc taskViewMob">
        <Grid container direction="row">
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            {this.props.comesFrom !== 'Professional' && (
              <Grid className="addTaskBtn">
                <Button onClick={this.handleOpenTask}>{add_task}</Button>
                {/* <label>{filterbedge}</label> */}
              </Grid>
            )}
          </Grid>
          {/* Model setup */}
          <Modal
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === 'dark'
                ? 'darkTheme'
                : ''
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
                            src={require('assets/images/close-search.svg')}
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
                            <VHfield
                              label={Tasktitle}
                              name="task_name"
                              placeholder={Entertitle}
                              onChange={(e) =>
                                this.updateEntryState1(
                                  e.target.value,
                                  e.target.name
                                )
                              }
                              value={this.state.newTask.task_name || ''}
                              disabled={
                                this.props.comesFrom === 'Professional'
                                  ? true
                                  : false ||
                                    this.state.newTask?.task_type ===
                                      'picture_evaluation'
                              }
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <label>{ForPatient}</label>
                            {this.props.comesFrom === 'detailTask' ? (
                              <h2>
                                {this.props.patient?.first_name}{' '}
                                {this.props.patient?.last_name}
                              </h2>
                            ) : this.props.comesFrom === 'Professional' ? (
                              <h2>
                                {this.state.newTask?.patient?.first_name}{' '}
                                {this.state.newTask?.patient?.last_name}
                              </h2>
                            ) : this.state.newTask?.task_type ===
                              'picture_evaluation' ? (
                              <h2>
                                {this.state.newTask?.patient?.first_name}{' '}
                                {this.state.newTask?.patient?.last_name}
                              </h2>
                            ) : (
                              <Grid>
                                <Select
                                  name="patient"
                                  options={this.state.users1}
                                  placeholder={Search_Select}
                                  onChange={(e) => this.updateEntryState2(e)}
                                  value={this.state.selectedPat || ''}
                                  className="addStafSelect"
                                  isMulti={false}
                                  isSearchable={true}
                                />

                                {/* <input
                                    type="text"
                                    placeholder={"Search & Select"}
                                    value={this.state.q}
                                    onChange={this.onChange}
                                  />
                
                                  <ul className={this.state.shown && "patientHint"}>
                                    {userList}
                                  </ul> */}
                              </Grid>
                            )}
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
                                          'hidePatient'
                                        )
                                      }
                                      disabled={
                                        this.props.comesFrom === 'Professional'
                                          ? true
                                          : false
                                      }
                                    />
                                  }
                                  label={Hide_task_from_patient}
                                />
                              </Grid>
                            </Grid>
                          )}

                          {this.state.newTask.task_type !==
                            'picture_evaluation' && (
                            <Grid item xs={12} md={12} className="taskDescp">
                              <label>{Taskdescription}</label>
                              <Grid>
                                <textarea
                                  placeholder={Enterdescription}
                                  name="description"
                                  onChange={(e) =>
                                    this.updateEntryState1(
                                      e.target.value,
                                      e.target.name
                                    )
                                  }
                                  value={this.state.newTask.description || ''}
                                  disabled={
                                    this.props.comesFrom === 'Professional'
                                      ? true
                                      : false
                                  }
                                ></textarea>
                              </Grid>
                            </Grid>
                          )}

                          {this.state.newTask.task_type ===
                            'picture_evaluation' && (
                            <Grid item xs={12} md={12} className="taskDescp">
                              <Grid className="stndQues stndQues1">
                                <Grid>
                                  <label>Added On</label>
                                </Grid>
                                <p>
                                  {getDate(
                                    this.state.newTask &&
                                      this.state.newTask?.created_at,
                                    this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting?.date_format
                                  )}
                                </p>
                                <Grid>
                                  <label>{age}</label>
                                </Grid>
                                <p>
                                  {getDate(
                                    this.state.newTask &&
                                      this.state.newTask?.dob,
                                    this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting?.date_format
                                  )}
                                </p>
                                <Grid>
                                  <label>{gender}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.sex}
                                </p>
                                <Grid>
                                  <h2>{blood_pressure}</h2>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{rr_systolic}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.rr_systolic}
                                    </p>
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{RR_diastolic}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.rr_diastolic}
                                    </p>
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <h2>{diabetes}</h2>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{blood_sugar}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.blood_sugar}
                                    </p>
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{Hba1c}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.Hba1c}
                                    </p>
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{situation}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.situation &&
                                        this.state.newTask?.situation?.label}
                                    </p>
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <h2>{smoking_status}</h2>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{status}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.smoking_status &&
                                        this.state.newTask?.smoking_status
                                          ?.label}
                                    </p>
                                  </Grid>
                                  {!this.state.newTask?.smoking_status ||
                                    (this.state.newTask &&
                                      this.state.newTask?.smoking_status &&
                                      this.state.newTask?.smoking_status
                                        ?.value !== 'Never_smoked' && (
                                        <>
                                          <Grid xs={4} md={4}>
                                            <label>
                                              {from} {when}
                                            </label>
                                            <p>
                                              {this.state.newTask &&
                                              !this.state.newTask?.from_when ? (
                                                '-'
                                              ) : (
                                                <>
                                                  {getDate(
                                                    this.state.newTask
                                                      ?.from_when,
                                                    this.props.settings &&
                                                      this.props.settings
                                                        ?.setting &&
                                                      this.props.settings
                                                        ?.setting?.date_format
                                                  )}
                                                </>
                                              )}
                                            </p>
                                          </Grid>
                                          <Grid xs={4} md={4}>
                                            <label>
                                              {until} {when}
                                            </label>
                                            <p>
                                              {this.state.newTask &&
                                              !this.state.newTask
                                                ?.until_when ? (
                                                '-'
                                              ) : (
                                                <>
                                                  {getDate(
                                                    this.state.newTask
                                                      ?.until_when,
                                                    this.props.settings &&
                                                      this.props.settings
                                                        ?.setting &&
                                                      this.props.settings
                                                        ?.setting?.date_format
                                                  )}
                                                </>
                                              )}
                                            </p>
                                          </Grid>
                                        </>
                                      ))}
                                </Grid>
                                <Grid>
                                  <label>{allergies}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.allergies,
                                  }}
                                />
                                <Grid>
                                  <label>{family_history}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.family_history,
                                  }}
                                />
                                <Grid>
                                  <label>{treatment_so_far}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.treatment_so_far,
                                  }}
                                />
                                <Grid>
                                  <label>{place_of_residence}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.residenceCountry &&
                                    this.state.newTask?.residenceCountry?.label}
                                </p>
                                <Grid>
                                  <label>{place_of_birth}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.country &&
                                    this.state.newTask?.country?.label}
                                </p>
                                <Grid>
                                  <label>{phenotyp_race}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.race,
                                  }}
                                />
                                <Grid>
                                  <label>{travel_history_last_month}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.history_month,
                                  }}
                                />
                                <Grid>
                                  <label>{medical_preconditions}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.medical_precondition,
                                  }}
                                />
                                <Grid>
                                  <label>{premedication}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.premedication,
                                  }}
                                />
                                <Grid>
                                  <label>{image_evaluation}</label>
                                </Grid>
                                <div className="imageEvalSize">
                                  <FileViews
                                    comesFrom="Picture_Task"
                                    images={this.state.images}
                                    attachfile={this.state.newTask?.fileattach}
                                  />
                                </div>
                                <Grid>
                                  <label>Start From</label>
                                </Grid>
                                <p>
                                  {getDate(
                                    this.state.newTask &&
                                      this.state.newTask?.start_date,
                                    this.props.settings &&
                                      this.props.settings?.setting &&
                                      this.props.settings?.setting?.date_format
                                  )}
                                </p>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={3} md={3}>
                                    <label>{warm}</label>
                                    {this.state.newTask &&
                                    this.state.newTask?.warm === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{size_progress}</label>

                                    {this.state.newTask &&
                                    this.state.newTask?.size_progress ===
                                      true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{itch}</label>

                                    {this.state.newTask &&
                                    this.state.newTask?.itch === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3}>
                                    <label>{pain}</label>

                                    {this.state.newTask &&
                                    this.state.newTask?.pain === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <label>{pain_level}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.pain_intensity}
                                </p>
                                <Grid>
                                  <label>{body_temp}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.body_temp}
                                </p>
                                <Grid>
                                  <label>{sun_before}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.sun_before}
                                </p>
                                <Grid>
                                  <label>{cold}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.cold}
                                </p>
                                <Grid>
                                  <label>{sexual_active}</label>
                                </Grid>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      this.state.newTask &&
                                      this.state.newTask?.sexual_active,
                                  }}
                                />
                                <Grid>
                                  <label>{payment_done}</label>
                                </Grid>
                                {this.state.newTask &&
                                this.state.newTask?.is_payment === true ? (
                                  <p>{yes}</p>
                                ) : (
                                  <p>{no}</p>
                                )}
                              </Grid>
                            </Grid>
                          )}
                          <Grid item xs={12} md={12}>
                            <label>{Assignedto}</label>
                            <Grid>
                              <Select
                                name="professional"
                                onChange={(e) => this.updateEntryState3(e)}
                                value={this.state.assignedTo}
                                options={this.state.professional_id_list1}
                                placeholder={Search_Select}
                                className="addStafSelect"
                                isMulti={true}
                                isSearchable={true}
                                isDisabled={
                                  this.props.comesFrom === 'Professional'
                                    ? true
                                    : false
                                }
                              />
                            </Grid>
                          </Grid>
                          {this.state.newTask &&
                          this.state.newTask?.task_type ===
                            'picture_evaluation' ? null : (
                            <Grid item xs={12} md={12}>
                              <label>{Speciallity}</label>
                              <Grid className="specialFor">
                                <Select
                                  onChange={(e) => this.onFieldChange(e)}
                                  options={this.state.specilaityList}
                                  name="specialty_name"
                                  isSearchable={true}
                                  className="addStafSelect"
                                  value={this.state.selectSpec}
                                  isDisabled={
                                    this.props.comesFrom === 'Professional'
                                      ? true
                                      : false
                                  }
                                />
                              </Grid>
                            </Grid>
                          )}

                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={12} md={12} className="dueOn">
                              <label>{Dueon}</label>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                className="timeTask"
                              >
                                <Grid item xs={8} md={8}>
                                  {/* {this.state.openDate ? ( */}
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
                                      this.updateEntryState1(e, 'date')
                                    }
                                    disabled={
                                      this.props.comesFrom === 'Professional'
                                        ? true
                                        : false
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  md={4}
                                  className={
                                    this.state.openDate
                                      ? 'addTimeTask'
                                      : 'addTimeTask1'
                                  }
                                >
                                  {this.state.openDate ? (
                                    <Button
                                      onClick={() => {
                                        this.openTaskTime();
                                      }}
                                    >
                                      {Addtime}
                                    </Button>
                                  ) : (
                                    <>
                                      <TimeFormat
                                        className="timeFormatTask"
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
                                          this.updateEntryState1(e, 'time')
                                        }
                                        disabled={
                                          this.props.comesFrom ===
                                          'Professional'
                                            ? true
                                            : false
                                        }
                                      />
                                      <span
                                        className="addTimeTask1span"
                                        onClick={() => {
                                          this.setState({ openDate: true });
                                        }}
                                      >
                                        {remove_time}
                                      </span>
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* I'm working here stop */}

                          <Grid className="assignSecUpr">
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={12} sm={12} md={12}>
                                <Grid className="assignSec">
                                  {this.state.newTask._id && (
                                    <>
                                      {this.state.newTask.task_type ===
                                        'picture_evaluation' ||
                                        (this.props.comesFrom !==
                                          'Professional' && (
                                          <>
                                            <Grid
                                              onClick={() => {
                                                this.createDuplicate(
                                                  this.state.newTask
                                                );
                                              }}
                                            >
                                              <img
                                                src={require('assets/virtual_images/assign-to.svg')}
                                                alt=""
                                                title=""
                                              />
                                              <label>{Duplicate}</label>
                                            </Grid>

                                            {this.state.newTask.archived ==
                                            true ? (
                                              <Grid
                                                onClick={() => {
                                                  this.updateEntryState1(
                                                    false,
                                                    'archived'
                                                  );
                                                }}
                                                className="activeOntask"
                                              >
                                                <img
                                                  src={require('assets/images/archive-white.svg')}
                                                  alt=""
                                                  title=""
                                                />
                                                <label>{Archive}</label>
                                              </Grid>
                                            ) : (
                                              <Grid
                                                onClick={() => {
                                                  this.updateEntryState1(
                                                    true,
                                                    'archived'
                                                  );
                                                }}
                                              >
                                                <img
                                                  src={require('assets/images/archive.svg')}
                                                  alt=""
                                                  title=""
                                                />
                                                <label>{Archive}</label>
                                              </Grid>
                                            )}
                                            <Grid>
                                              <img
                                                onClick={(id) => {
                                                  this.removeTask(id);
                                                }}
                                                src={require('assets/virtual_images/deleteNew.png')}
                                                alt=""
                                                title=""
                                                className="manage-size"
                                              />
                                              <label
                                                onclick={(id) => {
                                                  this.removeTask(id);
                                                }}
                                              >
                                                {Delete}
                                              </label>
                                            </Grid>
                                          </>
                                        ))}
                                      <Grid
                                        onClick={() => {
                                          this.switchStatus();
                                        }}
                                        className="markDone"
                                      >
                                        {this.state.newTask.status ===
                                        'done' ? (
                                          <Grid className="revwFiles ">
                                            <Grid className="activeOntask">
                                              <img
                                                src={require('assets/virtual_images/greyImg.png')}
                                                alt=""
                                                title=""
                                              />
                                            </Grid>
                                          </Grid>
                                        ) : (
                                          <Grid className="revwFiles">
                                            <Grid>
                                              <img
                                                src={require('assets/virtual_images/greyImg.png')}
                                                alt=""
                                                title=""
                                              />
                                            </Grid>
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

                          {this.props.comesFrom !== 'Professional' && (
                            <Grid item xs={12} md={12}>
                              <label>{Attachments}</label>
                              <FileUploader
                                // cur_one={this.props.cur_one}
                                attachfile={
                                  this.state.newTask &&
                                  this.state.newTask.attachments
                                    ? this.state.newTask.attachments
                                    : []
                                }
                                name="UploadTrackImageMulti"
                                isMulti="true"
                                fileUpload={(event) => {
                                  this.FileAttachMulti(event);
                                }}
                              />
                            </Grid>
                          )}
                          {this.props.comesFrom === 'Professional' && (
                            <Grid item xs={12} md={12}>
                              <Grid>
                                <label>{Comments}</label>
                              </Grid>
                              {this.state.newTask?.comments?.length > 0 &&
                                this.state.newTask?.comments.map(
                                  (data, index) => (
                                    <Grid className="cmntIner cmntInerBrdr">
                                      <Grid className="cmntMsgs">
                                        <Grid>
                                          <S3Image
                                            imgUrl={data?.comment_by?.image}
                                          />
                                        </Grid>
                                        <Grid>
                                          <Grid>
                                            <label>
                                              {data?.comment_by?.first_name}{' '}
                                              {data?.comment_by?.last_name}
                                            </label>
                                            <span>
                                              {getDate(
                                                data.comment_on,
                                                this.props.settings?.setting
                                                  ?.date_format
                                              )}
                                            </span>{' '}
                                            -
                                            <span>
                                              {getTime(
                                                new Date(data.comment_on),
                                                this.props.settings?.setting
                                                  ?.time_format
                                              )}
                                            </span>
                                          </Grid>
                                          <Grid className="addComit">
                                            {this.state.editcomment ===
                                            index ? (
                                              <>
                                                <textarea
                                                  placeholder={EditComment}
                                                  name="comment"
                                                  onChange={(e) =>
                                                    this.oNEditText(e, index)
                                                  }
                                                  value={data?.comment}
                                                ></textarea>
                                                <Button
                                                  className="editBtn-comment"
                                                  onClick={() =>
                                                    this.editComment(false)
                                                  }
                                                >
                                                  {Submit}
                                                </Button>
                                              </>
                                            ) : (
                                              <p>{data?.comment}</p>
                                            )}
                                          </Grid>
                                          {this.props.stateLoginValueAim.user
                                            .profile_id ===
                                            data.comment_by?.profile_id && (
                                            <Grid>
                                              {/* <Button onClick={() => this.editComment(data)}>Edit</Button> */}
                                              <Button
                                                onClick={() =>
                                                  this.removeComment(index)
                                                }
                                              >
                                                {Delete}
                                              </Button>
                                              <Button
                                                onClick={() =>
                                                  this.editComment(index)
                                                }
                                              >
                                                {edit}
                                              </Button>
                                            </Grid>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  )
                                )}
                              <Grid className="addComit">
                                <textarea
                                  placeholder={EnterComment}
                                  name="comment"
                                  onChange={(e) =>
                                    this.updateCommemtState(e.target.value)
                                  }
                                  value={this.state.newComment || ''}
                                ></textarea>

                                <Button onClick={(e) => this.handleComment()}>
                                  {AddComment}
                                </Button>
                              </Grid>
                            </Grid>
                          )}

                          <Grid item xs={12} md={12} className="saveTasks">
                            <a>
                              <div className="err_message">
                                {this.state.errorMsg}
                              </div>
                              <Button onClick={() => this.handleTaskSubmit()}>
                                {save_task_and_close}
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
              <Grid item xs={12} sm={6} md={7}>
                <AppBar position="static" className="billTabs">
                  <Tabs value={tabvalue2} onChange={this.handleChangeTab2}>
                    <Tab label={ALL} className="billtabIner" />
                    <Tab label={Done} className="billtabIner" />
                    <Tab label={Open} className="billtabIner" />
                    {this.props.comesFrom !== 'Professional' &&
                      this.props.comesFrom !== 'detailTask' && (
                        <Tab label={Archived} className="billtabIner" />
                      )}
                  </Tabs>
                </AppBar>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <Grid className="taskSort">
                  {this.state.showinput && (
                    <input
                      className="TaskSearch"
                      type="text"
                      name="search"
                      placeholder={Search}
                      value={this.state.text}
                      onChange={this.FilterText}
                    />
                  )}
                  <a>
                    {!this.state.showinput ? (
                      <img
                        src={require('assets/virtual_images/search-entries.svg')}
                        alt=""
                        title=""
                        onClick={() => {
                          this.setState({ showinput: !this.state.showinput });
                        }}
                      />
                    ) : (
                      <img
                        src={require('assets/images/close-search.svg')}
                        alt=""
                        title=""
                        onClick={() => {
                          this.setState({
                            showinput: !this.state.showinput,
                            text: '',
                          });
                          this.clearFilter();
                        }}
                      />
                    )}
                  </a>

                  {this.props.comesFrom !== 'Professional' &&
                    this.props.comesFrom !== 'detailTask' && (
                      <>
                        {tabvalue2 === 0 && (
                          <a className={AllTaskCss}>
                            <img
                              src={
                                AllTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />{' '}
                          </a>
                        )}
                        {tabvalue2 === 1 && (
                          <a className={DoneTaskCss}>
                            {' '}
                            <img
                              src={
                                AllTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />{' '}
                          </a>
                        )}
                        {tabvalue2 === 2 && (
                          <a className={OpenTaskCss}>
                            {' '}
                            <img
                              src={
                                AllTaskCss === 'filterApply'
                                  ? require('assets/virtual_images/sort-active.png')
                                  : require('assets/virtual_images/sort.png')
                              }
                              alt=""
                              title=""
                              onClick={this.handleOpenRvw}
                            />{' '}
                          </a>
                        )}
                      </>
                    )}

                  {tabvalue2 === 3 && (
                    <a className={ArchivedTasksCss}>
                      {' '}
                      <img
                        src={
                          ArchivedTasksCss === 'filterApply'
                            ? require('assets/virtual_images/sort-active.png')
                            : require('assets/virtual_images/sort.png')
                        }
                        alt=""
                        title=""
                        onClick={this.handleOpenRvw}
                      />{' '}
                    </a>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {tabvalue2 === 0 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.AllTasks?.length > 0 &&
                  this.state.AllTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 1 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.DoneTask?.length > 0 &&
                  this.state.DoneTask.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 2 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.OpenTask?.length > 0 &&
                  this.state.OpenTask.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
          {tabvalue2 === 3 && (
            <TabContainer>
              <Grid className="allInerTabs">
                {this.state.ArchivedTasks?.length > 0 &&
                  this.state.ArchivedTasks.map((data) => (
                    <Grid>
                      <TaskView
                        data={data}
                        removeTask={(id) => this.removeTask(id)}
                        editTask={(data) => this.editTask(data)}
                        comesFrom={this.props.comesFrom}
                      />
                    </Grid>
                  ))}
              </Grid>
            </TabContainer>
          )}
        </Grid>
        <Modal open={this.state.noWards} onClose={this.handleCloseRvw}>
          <Grid
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === 'dark'
                ? 'nwEntrCntnt fltrClear darkTheme'
                : 'nwEntrCntnt fltrClear'
            }
          >
            <Grid className="fltrClearIner">
              <Grid className="fltrLbl">
                <Grid className="fltrLblClose">
                  <a onClick={this.handleCloseRvw}>
                    <img
                      src={require('../../../../assets/images/close-search.svg')}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <label>{filters}</label>
              </Grid>

              <TabContainer>
                <Grid className="fltrForm">
                  {tabvalue2 === 0 && (
                    <Grid className="fltrInput">
                      <label>{Taskstatus}</label>
                      <Grid className="addInput">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="open"
                              value={
                                this.state.check &&
                                this.state.check.open &&
                                this.state.check.open == true
                                  ? false
                                  : true
                              }
                              color="#00ABAF"
                              checked={this.state.check.open}
                              onChange={(e) => this.updateTaskFilter(e)}
                            />
                          }
                          label={Open}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="done"
                              value={
                                this.state.check &&
                                this.state.check.done &&
                                this.state.check.done == true
                                  ? false
                                  : true
                              }
                              color="#00ABAF"
                              checked={this.state.check.done}
                              onChange={(e) => this.updateTaskFilter(e)}
                            />
                          }
                          label={Done}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Grid className="fltrInput">
                    <label>{Patient}</label>
                    <Grid className="addInput">
                      <Select
                        name="professional"
                        onChange={(e) => this.updateUserFilter(e)}
                        value={this.state.userFilter}
                        options={this.state.patientForFilter}
                        placeholder={Filterbypatient}
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="fltrInput">
                    <label>{Staff}</label>
                    <Grid className="addInput">
                      <Select
                        name="professional"
                        onChange={(e) => this.updateEntryState4(e)}
                        value={this.state.assignedTo2}
                        options={this.state.professional_id_list}
                        placeholder={FilterbyStaff}
                        className="addStafSelect"
                        isMulti={true}
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  <Grid className="fltrInput">
                    <label>{speciality}</label>
                    <Grid className="addInput">
                      <Select
                        onChange={(e) => this.onFieldChange2(e)}
                        options={this.state.specilaityList}
                        name="specialty_name"
                        value={this.state.selectSpec2}
                        placeholder={FilterbySpeciality}
                        isMulti={false}
                        className="addStafSelect"
                        isSearchable={true}
                      />
                    </Grid>
                  </Grid>
                  {this.state.wardList && this.state.wardList.length > 0 && (
                    <Grid className="fltrInput">
                      <label>{Ward}</label>
                      <Grid className="addInput">
                        <Select
                          onChange={(e) => this.onWardChange(e)}
                          options={this.state.wardList}
                          name="ward_name"
                          value={this.state.selectWard}
                          placeholder={FilterbyWard}
                          isMulti={false}
                          className="addStafSelect"
                          isSearchable={true}
                        />
                      </Grid>
                    </Grid>
                  )}
                  {this.state.roomList && this.state.roomList.length > 0 && (
                    <Grid className="fltrInput">
                      <label>{Room}</label>
                      <Grid className="addInput">
                        <Select
                          onChange={(e) => this.onRoomChange(e)}
                          options={this.state.roomList}
                          name="room_name"
                          value={this.state.selectRoom}
                          placeholder={FilterbyRoom}
                          isMulti={false}
                          className="addStafSelect"
                          isSearchable={true}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid className="aplyFltr">
                  <Grid className="aplyLft">
                    <label className="filterCursor" onClick={this.clearFilter}>
                      {clear_all_filters}
                    </label>
                  </Grid>
                  <Grid className="aplyRght">
                    <Button onClick={this.applyFilter}>{applyFilters}</Button>
                  </Grid>
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
