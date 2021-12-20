import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Button } from "@material-ui/core";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarToolbar from "Screens/Components/CalendarToolbar/index.js";
import moment from "moment";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import Modal from "@material-ui/core/Modal";
import { getPatientData } from "Screens/Components/CommonApi/index";
import { Speciality } from "Screens/Login/speciality.js";
import { AppointFilter } from "Screens/Components/MultiFilter/index.js";
import {
  getLanguage
} from "translations/index"
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "../Institutes/selecthouseaction";

const CURRENT_DATE = moment().toDate();
const localizer = momentLocalizer(moment);

const modifiers = [
  {
    name: "offset",
    enabled: true,
    options: {
      offset: [0, 4],
    },
  },
];
function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

//  var da1 = new Date(9, 4, 2021);
// let da2 = new Date();
// var d1 = (new Date()).setHours("00");
// var d2 = (new Date()).setHours("05")

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
      tabvalue: 0,
      selectedOption: null,
      events: [],
      finaldata: [],
      appioinmentTimes: [],
      appioinmentEventList: [],
      taskEventList: [],
      myEventsList: [],
      openFil: false,
      specilaityList: [],
      check: {},
      wardList: [],
      roomList: [],
      setFilter: "All",
      userFilter: '',
      selectSpec2: '',
      selectWard: '',
      selectRoom: ''
    };
  }

  componentDidMount() {
    this.getTaskData();
    this.getPatientData();
    this.specailityList();
  }

  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
    if (tabvalue == 0) {
      this.setState({ showField: false, setFilter: "All", userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '' })
    } else if (tabvalue == 1) {
      this.setState({ showField: true, setFilter: "Appointment", userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '' })
    } else if (tabvalue == 2) {
      this.setState({ showField: false, setFilter: "Task", userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '' })
    }
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  GetTime = (start_time) => {
    let da1 = new Date();
    if (start_time) {
      var t1 = start_time.split(":");
    }
    else {
      var t1 = this.state.startTime.split(":");
    }
    if (t1 && t1.length > 0) {
      da1.setHours(t1[0]);
      da1.setMinutes(t1[1]);
    } else {
      da1.setHours("00");
      da1.setMinutes("00");
    }
    if (
      this.props.settings &&
      this.props.settings.setting &&
      this.props.settings.setting.time_format &&
      this.props.settings.setting.time_format === "12"
    ) {
      return moment(da1).format("hh:mm a");
    } else {
      return moment(da1).format("HH:mm");
    }
  };

  //get Add task data
  getTaskData = () => {
    var taskdata = [], appioinmentdata = [];
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/getAppointTask/" + this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          this.showDataCalendar(response)
        }
        setTimeout(() => {
          this.setState({ loaderImage: false });
        }, 3000);
      })
  };

  showDataCalendar = (response) => {
    let indexout = 0;
    let appioinmentTimes = [];
    var taskdata = [], appioinmentdata = [];
    let length = response.data.data.length
    if (length < 1) {
      this.setState({ myEventsList: [], appioinmentEventList: [], appioinmentTimes: [], taskEventList: [] })

    }
    response.data && response.data.data &&
      response.data.data.length > 0 &&
      response.data.data.map((data, index) => {
        if (data && data.task_name) {
          this.setState({ loaderImage: true });
          if (data &&
            data?.due_on &&
            data?.due_on?.time &&
            data?.due_on?.date &&
            data?.task_name) {

            var datetime1 = new Date(data?.due_on?.time);
            var hours1 = datetime1.getHours()
            var minutes1 = datetime1.getMinutes()
            var hourminutes1 = hours1 + ":" + minutes1
            var t1 = hourminutes1.split(":")
            this.setState({ startTime: hourminutes1 })

            datetime1.setHours(datetime1.getHours() + 11);
            datetime1.setMinutes(datetime1.getMinutes() + 59);
            var hours2 = datetime1.getHours()
            var minutes2 = datetime1.getMinutes()
            var hourminutes2 = hours2 + ":" + minutes2
            var t2 = hourminutes2.split(":");

            var da1 = new Date(data?.due_on?.date);
            var da2 = new Date(data?.due_on?.date);
            if (t1 && t1.length > 0) {
              da1.setHours(t1[0])
              da1.setMinutes(t1[1])
            } else {
              da1.setHours("00");
              da1.setMinutes("00");
            }
            if (t2 && t2.length > 0) {
              da2.setHours(t2[0]);
              da2.setMinutes(t2[0]);
            } else {
              da2.setHours("00");
              da2.setMinutes("00");
            }
            this[`${indexout}_ref`] = React.createRef();
            appioinmentTimes.push({
              start: new Date(da1).valueOf(),
              end: new Date(da2).valueOf(),
            });
            var title = data?.task_name;
            taskdata.push({
              id: index,
              title: title,
              start: new Date(da1),
              end: new Date(da2),
              indexout: indexout,
              fulldata: [data],
            });
            indexout++;
            this.setState({ myEventsList: taskdata, taskEventList: taskdata, appioinmentTimes: appioinmentTimes, })
            this.setState({ loaderImage: true });
            this.handleCloseFil();
          }
        } else {
          if (data.start_time) {
            var t1 = data.start_time.split(":");
          }
          if (data.end_time) {
            var t2 = data.end_time.split(":");
          }
          let da1 = new Date(data.date);
          let da2 = new Date(data.date);
          if (t1 && t1.length > 0) {
            da1.setHours(t1[0]);
            da1.setMinutes(t1[1]);
          } else {
            da1.setHours("00");
            da1.setMinutes("00");
          }
          if (t2 && t2.length > 0) {
            da2.setHours(t2[0]);
            da2.setMinutes(t2[1]);
          } else {
            da2.setHours("00");
            da2.setMinutes("00");
          }
          this[`${indexout}_ref`] = React.createRef();
          appioinmentTimes.push({
            start: new Date(da1).valueOf(),
            end: new Date(da2).valueOf(),
          });
          appioinmentdata.push({
            id: index,
            title:
              data.patient_info.first_name +
              " " +
              data.patient_info.last_name,
            start: new Date(da1),
            end: new Date(da2),
            indexout: indexout,
            fulldata: [data],
          });
        }
        indexout++;
        this.setState({ myEventsList: [...this.state.myEventsList, ...appioinmentdata], appioinmentEventList: appioinmentdata, appioinmentTimes: appioinmentTimes, })
        this.handleCloseFil();
      })
  }


  EventComponent = (data) => {
    return (
      <TooltipTrigger
        placement="right"
        trigger="click"
        tooltip={(datas) =>
          this.Tooltip({
            getTooltipProps: datas.getTooltipProps,
            getArrowProps: datas.getArrowProps,
            tooltipRef: datas.tooltipRef,
            arrowRef: datas.arrowRef,
            placement: datas.placement,
            event: data.event,
          })
        }
        className="ThisEventShower"
        modifiers={modifiers}
      >
        {({ getTriggerProps, triggerRef }) => (
          <span
            {...getTriggerProps({
              ref: triggerRef,
              className: "trigger",
              /* your props here */
            })}
          // onClick={() => this.CallEvents(data.event)}
          >
            <p className="calendar-cont"> {data.event.title} </p>
            <p className="calendar-date">
              {" "}
              {moment(data.event.start).format("hh:mm") +
                "-" +
                moment(data.event.end).format("hh:mm")}{" "}
            </p>
          </span>
        )}
      </TooltipTrigger>
    );
  };

  EventDaysComponent = (data) => {
    return (
      <TooltipTrigger
        placement="right"
        trigger="click"
        tooltip={(datas) =>
          this.Tooltip({
            getTooltipProps: datas.getTooltipProps,
            getArrowProps: datas.getArrowProps,
            tooltipRef: datas.tooltipRef,
            arrowRef: datas.arrowRef,
            placement: datas.placement,
            event: data.event,
          })
        }
        modifiers={modifiers}
      >
        {({ getTriggerProps, triggerRef }) => (
          <span
            {...getTriggerProps({
              ref: triggerRef,
              className: "trigger",
              /* your props here */
            })}
          // onClick={() => this.CallEvents(data.event)}
          >
            <p
              style={{
                backgroundColor: "none",
                fontSize: 11,
                margin: 0,
                fontWeight: 700,
              }}
            >
              {" "}
              {data.event.title}:{" "}
              {moment(data.event.start).format("hh:mm A") +
                "-" +
                moment(data.event.end).format("hh:mm A")}
            </p>
            {/* <p style={{ backgroundColor: 'none', fontSize: 11, margin: 0, lineHeight: '12px' }}> {moment(data.event.start).format('hh:mm') + '-' + moment(data.event.end).format('hh:mm')} </p> */}
          </span>
        )}
      </TooltipTrigger>
    );
  };

  Tooltip = ({
    getTooltipProps,
    getArrowProps,
    tooltipRef,
    arrowRef,
    placement,
    event,
  }) => {
    let translate = getLanguage(this.props.stateLanguageType)

    let {
      DetailsQuestions,
      vdo_call,
      // office_visit,
      Task,
      consultancy_appintment,
    } = translate;
    return (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: "tooltip-container",
          closeOnReferenceHidden: false,
        })}
      >
        <div
          {...getArrowProps({
            ref: arrowRef,
            "data-placement": placement,
            className:
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                ? "darktheme tooltip-arrow "
                : "tooltip-arrow ",
          })}
        />

        {event &&
          event.fulldata.length > 0 &&
          event.fulldata.map((data, index) => (
            <Grid
              className={
                this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode === "dark"
                  ? "darktheme meetBoxCntnt"
                  : "meetBoxCntnt"
              }
            >
              <Grid className="meetCourse">
                <Grid className="meetCloseBtn">
                  {/* <a><img src={require('assets/images/three_dots_t.png')} alt="" title="" /></a> */}
                  {/* <a><img src={require('assets/images/close-search.svg')} alt="" title="" /></a> */}
                </Grid>
                <Grid className="meetVdo">
                  <Grid className="meetVdoLft">
                    {data.appointment_type == "online_appointment" && (
                      <img
                        src={require("assets/images/video-call.svg")}
                        alt=""
                        title=""
                      />
                    )}
                    {data.appointment_type == "practice_days" && (
                      <img
                        src={require("assets/images/cal.png")}
                        alt=""
                        title=""
                      />
                    )}
                    {data.appointment_type == "appointments" && (
                      <img
                        src={require("assets/images/office-visit.svg")}
                        alt=""
                        title=""
                      />
                    )}
                    <span>

                      {data.appointment_type == "practice_days"
                        ? consultancy_appintment
                        : data.appointment_type == "online_appointment"
                          ? vdo_call
                          : this.state.appointmentDatas && this.state.appointmentDatas.appointments && this.state.appointmentDatas.appointments.length > 0 && this.state.appointmentDatas.appointments[0].custom_text
                            ? this.state.appointmentDatas.appointments[0].custom_text : Task
                      }
                    </span>
                  </Grid>
                  <Grid className="meetVdoRght">
                    <p>
                      {moment(new Date(data.date || data.due_on.date), "MM-DD-YYYY").format(
                        "D MMM"
                      )}
                      , {this.GetTime(data.start_time)}
                    </p>
                  </Grid>
                </Grid>
                <Grid className="meetDetail">
                  <h1>{event.title}</h1>
                  {data?.appointment_type == true ? <span>{DetailsQuestions}</span> : <span>{data.description}</span>}
                  <p>{data.annotations}</p>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </div>
    );
  };

  //open fiter modal
  handleCloseFil = () => {
    this.setState({ openFil: false })
  }
  // close filter modal
  handleOpenFil = () => {
    this.setState({ openFil: true, q: "" })
  }

  updateUserFilter = (e) => {
    this.setState({ userFilter: e })
  }

  updateTaskFilter = (e) => {
    const state = this.state.check;
    state[e.target.name] = e.target.value == "true" ? true : false;
    this.setState({ taskFilter: state });
  }

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

  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
    });
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

  //On Changing the specialty id
  onFieldChange2 = (e) => {
    this.setState({ selectRoom: '', selectWard: '' })
    let data = JSON.parse(localStorage.getItem("redux_localstorage_simple"));
    let specialityList = data && data.Speciality && data.Speciality.speciality && data.Speciality.speciality.SPECIALITY.filter((item) => {
      return item && item._id == e.value;
    })
    let wardsFullData = specialityList && specialityList.length > 0 && specialityList[0].wards
    let wards_data = wardsFullData && wardsFullData.length > 0 && wardsFullData.map((item) => {
      return { label: item.ward_name, value: item._id }
    })
    this.setState({ selectSpec2: e, wardList: wards_data, allWards: wardsFullData })
  }

  // ward Change
  onWardChange = (e) => {
    this.setState({ selectRoom: '' })
    let { allWards } = this.state
    let wardDetails = allWards && allWards.length > 0 && allWards.filter((item) => {
      return item && item._id == e.value;
    })
    let roomsData = wardDetails && wardDetails.length > 0 && wardDetails[0].rooms
    let rooms = roomsData && roomsData.length > 0 && roomsData.map((item) => {
      return { label: item.room_name, value: item._id }
    })
    this.setState({ selectWard: e, roomList: rooms })
  }

  //room cahnge
  onRoomChange = (e) => {
    this.setState({ selectRoom: e })
  }

  moveTask = () => {
    this.props.history.push({
      pathname: '/virtualHospital/tasks',
      state: { data: true }
    })
  }

  applyFilter = () => {
    let { selectSpec2, selectWard, selectRoom, userFilter, setFilter, check } = this.state
    var id = userFilter && userFilter?.length > 0 && userFilter.map((data) => { return data.value })
    let done = check && check?.done && check.done == true ? 'done' : ''
    let open = check && check?.open && check.open == true ? 'open' : ''
    let status = []
    if (done && done.length > 0) {
      status = [done]
    }
    if (open && open.length > 0) {
      status = [open]
    }
    if ((done && done.length > 0) && (open && open.length > 0)) {
      status = [done, open]
    }

    var data = { house_id: this.props.House?.value, };
    if (selectWard?.value) { data.ward_id = selectWard?.value }
    if (selectRoom?.value) { data.room_id = selectRoom?.value }
    if (setFilter) { data.filter = setFilter }
    if (status && status.length > 0) { data.status = status }
    if (selectSpec2?.value) { data.speciality_id = selectSpec2?.value }
    if (userFilter && userFilter.length > 0) { data.patient_id = userFilter && userFilter.length > 0 && userFilter.map((item) => { return item.value }) }
    axios.post(
      sitedata.data.path + "/vh/CalenderFilter",
      data,
      commonHeader(this.props.stateLoginValueAim.token)
    )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          this.showDataCalendar(responce)
          this.setState({ loaderImage: false, openFil: false });
        }
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

  clearFilter = () => {
    this.setState({ loaderImage: true });
    this.setState({ userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '', openFil: false, allWards: '', wardList: [], roomList: [] });
    this.getTaskData();
    this.setState({ loaderImage: false });
  }


  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { } =
      translate;
    const { tabvalue, selectedOption, events, data } = this.state;
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
      <Grid
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme"
            : "homeBg"
        }
      >
        <Grid className="homeBgIner">
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              {/* Mobile menu */}
              <LeftMenuMobile isNotShow={true} currentPage="calendar" />
              <Grid container direction="row">
                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="calendar" />
                </Grid>
                {/* End of Menu */}

                {/* Start of Right Section */}
                <Grid item xs={12} md={11}>
                  <Grid className="topLeftSpc">
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={12} sm={7} md={6}>
                        <AppBar position="static" className="appTabs">
                          <Tabs
                            value={tabvalue}
                            onChange={this.handleChangeTab}
                          >
                            <Tab label="All" className="appTabIner" />
                            <Tab label="Appointments" className="appTabIner" />
                            <Tab label="Tasks" className="appTabIner" />
                          </Tabs>
                        </AppBar>

                      </Grid>

                      <Grid item xs={12} sm={5} md={6}>
                        <Grid className="appontTask">
                          <Button>+ Add Appointment</Button>
                          <Button onClick={() => { this.moveTask() }}>+ Add Task</Button>
                          <a className="srchSort" onClick={this.handleOpenFil}>
                            <img src={require("assets/virtual_images/sort.png")} alt="" title="" />
                          </a>
                        </Grid>

                      </Grid>
                    </Grid>
                    {tabvalue === 0 && (
                      <TabContainer>
                        <Grid className="timeSchdul">
                          <Grid className="calenderDetails">
                            <Grid className="getCalapoint">
                              <Grid className="getCalBnr">

                                <Calendar

                                  localizer={localizer}
                                  events={this.state.myEventsList}
                                  value={this.state.data}
                                  startAccessor="start"
                                  endAccessor="end"
                                  style={{ minHeight: 900 }}
                                  popup
                                  style={{ minHeight: 900 }}
                                  onShowMore={(events, date) => { }}
                                  messages={{
                                    showMore: (total) => (
                                      <div
                                        style={{ cursor: "pointer" }}
                                        onMouseOver={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                        }}
                                      >
                                        {`+${total} more`}
                                      </div>
                                    ),
                                  }}
                                  components={{
                                    month: { event: this.EventComponent },
                                    week: { event: this.EventComponent },
                                    day: { event: this.EventDaysComponent },
                                    dateCellWrapper: this.DateCellCompnent,
                                    toolbar: CalendarToolbar,
                                  }}
                                />
                              </Grid>
                            </Grid>

                            {/* <img src={require('assets/virtual_images/calendar2.jpg')} alt="" title="" /> */}
                          </Grid>
                        </Grid>
                      </TabContainer>
                    )}
                    {tabvalue === 1 && (
                      <TabContainer>   <Grid className="timeSchdul">
                        <Grid className="calenderDetails">
                          <Grid className="getCalapoint">
                            <Grid className="getCalBnr">
                              <Calendar
                                localizer={localizer}
                                events={this.state.appioinmentEventList}
                                value={this.state.data}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ minHeight: 900 }}
                                popup
                                style={{ minHeight: 900 }}
                                onShowMore={(events, date) => { }}
                                messages={{
                                  showMore: (total) => (
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onMouseOver={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                      }}
                                    >
                                      {`+${total} more`}
                                    </div>
                                  ),
                                }}
                                components={{
                                  month: { event: this.EventComponent },
                                  week: { event: this.EventComponent },
                                  day: { event: this.EventDaysComponent },
                                  dateCellWrapper: this.DateCellCompnent,
                                  toolbar: CalendarToolbar,
                                }}
                              />
                            </Grid>
                          </Grid>

                          {/* <img src={require('assets/virtual_images/calendar2.jpg')} alt="" title="" /> */}
                        </Grid>
                      </Grid>
                      </TabContainer>

                    )}
                    {tabvalue === 2 && (
                      <TabContainer> <Grid className="timeSchdul">
                        <Grid className="calenderDetails">
                          <Grid className="getCalapoint">
                            <Grid className="getCalBnr">
                              <Calendar
                                localizer={localizer}
                                events={this.state.taskEventList}
                                value={this.state.data}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ minHeight: 900 }}
                                popup
                                style={{ minHeight: 900 }}
                                onShowMore={(events, date) => { }}
                                messages={{
                                  showMore: (total) => (
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onMouseOver={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                      }}
                                    >
                                      {`+${total} more`}
                                    </div>
                                  ),
                                }}
                                components={{
                                  month: { event: this.EventComponent },
                                  week: { event: this.EventComponent },
                                  day: { event: this.EventDaysComponent },
                                  dateCellWrapper: this.DateCellCompnent,
                                  toolbar: CalendarToolbar,
                                }}
                              />
                            </Grid>
                          </Grid>

                          {/* <img src={require('assets/virtual_images/calendar2.jpg')} alt="" title="" /> */}
                        </Grid>
                      </Grid></TabContainer>
                    )}
                  </Grid>
                </Grid>

                {/* End of Right Section */}
                <Modal open={this.state.openFil} onClose={this.handleCloseFil}>

                  <Grid className="fltrClear">
                    <Grid className="fltrClearIner">
                      <Grid className="fltrLbl">
                        <Grid className="fltrLblClose">
                          <a onClick={this.handleCloseFil}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a>
                        </Grid>
                        <label>Filters</label>
                      </Grid>
                      {/* <Grid item xs={12} sm={7} md={6}> */}
                      <AppBar position="static" className="modAppTabs">
                        <Tabs
                          value={tabvalue}
                          onChange={this.handleChangeTab}
                        >
                          <Tab label="All" className="appTabIner" />
                          <Tab label="Appointments" className="appTabIner" />
                          <Tab label="Tasks" className="appTabIner" />
                        </Tabs>
                      </AppBar>

                      {/* </Grid> */}

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
                        {!this.state.showField && (<>
                          <Grid className="fltrInput">
                            <label>Speciality</label>
                            <Grid className="addInput">
                              <Select
                                onChange={(e) => this.onFieldChange2(e)}
                                options={this.state.specilaityList}
                                name="specialty_name"
                                value={this.state.selectSpec2}
                                placeholder="Filter by Speciality"
                                isMulti={false}
                                isSearchable={true} />
                            </Grid>
                          </Grid>


                          {this.state.wardList && this.state.wardList.length > 0 &&
                            <Grid className="fltrInput">
                              <label>Ward</label>
                              <Grid className="addInput">
                                <Select
                                  onChange={(e) => this.onWardChange(e)}
                                  options={this.state.wardList}
                                  name="ward_name"
                                  value={this.state.selectWard}
                                  placeholder="Filter by Ward"
                                  isMulti={false}
                                  isSearchable={true} />
                              </Grid>
                            </Grid>
                          }

                          {this.state.roomList && this.state.roomList.length > 0 &&
                            <Grid className="fltrInput">
                              <label>Room</label>
                              <Grid className="addInput">
                                <Select
                                  onChange={(e) => this.onRoomChange(e)}
                                  options={this.state.roomList}
                                  name="room_name"
                                  value={this.state.selectRoom}
                                  placeholder="Filter by Room"
                                  isMulti={false}
                                  isSearchable={true} />
                              </Grid>
                            </Grid>
                          }

                          <Grid className="fltrInput">
                            <Grid><label>Task status:</label></Grid>
                            <Grid className="addInput">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="open"
                                    value={this.state.check && this.state.check.open && this.state.check.open == true ? false : true}
                                    color="#00ABAF"
                                    checked={this.state.check.open}
                                    onChange={(e) =>
                                      this.updateTaskFilter(e)
                                    }
                                  />
                                }
                                label="Open"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="done"
                                    value={this.state.check && this.state.check.done && this.state.check.done == true ? false : true}
                                    color="#00ABAF"
                                    checked={this.state.check.done}
                                    onChange={(e) =>
                                      this.updateTaskFilter(e)
                                    }
                                  />
                                }
                                label="Done"
                              />
                            </Grid>

                          </Grid>
                        </>)}



                      </Grid>

                      <Grid className="aplyFltr">
                        <Grid className="aplyLft"><label className="filterCursor" onClick={this.clearFilter}>Clear all filters</label></Grid>
                        <Grid className="aplyRght"><Button onClick={this.applyFilter}>Apply filters</Button></Grid>
                      </Grid>

                    </Grid>
                  </Grid>
                </Modal>

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
    speciality
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
