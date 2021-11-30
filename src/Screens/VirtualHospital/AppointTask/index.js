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
import { Redirect, Route } from "react-router-dom";
import { AddFavDoc2 } from "Screens/Components/BasicMethod/index";

const options = [
  { value: "data1", label: "Data1" },
  { value: "data2", label: "Data2" },
  { value: "data3", label: "Data3" },
];

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
      tabvalue: 0,
      selectedOption: null,
      events: [],
      finaldata: [],
      myEventsList: [],
      appioinmentTimes: [],
      appioinmentEventList: [],
      taskEventList: []
    };
  }

  componentDidMount() {
    this.getTaskData();
  }

  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
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
          let indexout = 0;
          let appioinmentTimes = [];
          response.data.data &&
            response.data.data.length > 0 &&
            response.data.data.map((data, index) => {
              if (data && data.task_name) {
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
            })
        }
        setTimeout(() => {
          this.setState({ loaderImage: false });
        }, 3000);
      })
  };

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

  // DateCellCompnent = ({ children, value }) => {
  //   return React.cloneElement(Children.only(children), {
  //     style: {
  //       ...children.style,
  //       // backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
  //     },
  //   });
  // };

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

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {} =
          translate;
    const { tabvalue, selectedOption, events, data } = this.state;
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
                        {/* <Grid className="appontTask">
                          <Button>+ Appointment or Task</Button>
                        </Grid> */}
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
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index)
);
