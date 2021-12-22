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
import { Redirect, Route } from "react-router-dom";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import Modal from "@material-ui/core/Modal";
import { getPatientData } from "Screens/Components/CommonApi/index";
import { Speciality } from "Screens/Login/speciality.js";
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
import Autocomplete from "Screens/Patient/Appointment/Autocomplete.js";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import Calendar2 from "react-calendar";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import SPECIALITY from "speciality";
import { subspeciality } from "subspeciality.js";
import {
  getDate,
  getImage,
  getSpec,
  timeDiffCalc
} from "Screens/Components/BasicMethod/index";

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
      selectRoom: '',
      openAllowAccess: false,
      searchDetails: {},
      openAllowLoc: false,
      openApoint: false,
      cancelappoint: {},
      UpDataDetails: [],
    };
  }

  componentDidMount() {
    this.getTaskData();
    this.getPatientData();
    this.specailityList();
    this.getSpecialities();
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


  getSpecialities() {
    this.setState({
      specialityData: GetLanguageDropdown(SPECIALITY.speciality.english, this.props.stateLanguageType),
      subspecialityData: GetLanguageDropdown(subspeciality.english, this.props.stateLanguageType),
    });
  }

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

  handleAllowAccess = () => {
    this.getGeoLocation();
    this.setState({ openAllowAccess: true });
  };

  handleCloseAllowAccess = () => {
    this.setState({ openAllowAccess: false });
  };

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

  // find appointment by location or speciality
  getlocation() {
    let radius, Latitude, longitude;
    if (this.state.searchDetails && this.state.searchDetails.radius) {
      radius = this.state.searchDetails.radius + "000";
    } else {
      radius = 20 + "000";
    }
    if (!this.state.mLatitude) {
      longitude = this.state.clng;
      Latitude = this.state.clat;
    } else if (this.state.mLatitude) {
      Latitude = this.state.mLatitude;
      longitude = this.state.mlongitude;
    } else {
    }
    // if (radius && Latitude && longitude) {
    axios
      .get(sitedata.data.path + "/UserProfile/getLocation/" + radius, {
        params: {
          speciality: this.state.searchDetails.specialty,
          longitude: longitude,
          Latitude: Latitude,
        },
      })
      .then((responce) => {
        let markerArray = [];
        let selectedListArray = [];
        let NewArray = [];

        responce.data.data &&
          responce.data.data.length > 0 &&
          responce.data.data.map((item, index) => {
            if (item.data && item.data.image) {
              var find = item.data && item.data.image && item.data.image;
              if (find) {
                find = find.split(".com/")[1];
                axios
                  .get(sitedata.data.path + "/aws/sign_s3?find=" + find)
                  .then((response) => {
                    if (response.data.hassuccessed) {
                      item.data.new_image = response.data.data;
                    }
                  });
              }
            }
            NewArray.push(item);
          });
        this.setState({ allDocData: NewArray });
        this.setState({ mapMarkers: markerArray });
        this.setState({ selectedListArray: selectedListArray });
      });
    // }
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ clat: parseFloat(position.coords.latitude) });
        this.setState({ clng: parseFloat(position.coords.longitude) });
        Geocode.setApiKey("AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4");
        Geocode.enableDebug();
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address = response.results[0].formatted_address;
            this.setState({ MycurrentLocationName: address });
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
  };

  handleOpenFancyVdo = (i, type, data) => {
    this.setState({
      openFancyVdo: true,
      appointmentData: data,
      doc_select: i,
      appointType: type,
    });
    // setTimeout(this.onChange, 5000)
    // this.onChange()
  };

  handleCloseFancyVdo = () => {
    this.setState({
      openFancyVdo: false,
      appointDate: [],
      appointmentData: {},
      currentSelected: null,
    });
    Object.keys(this.state.allDocData).map((index, i) => { });
  };

  handleOpenApoint = (apoint) => {
    this.setState({ openApoint: true, cancelappoint: apoint, });
  };

  handleCloseApoint = () => {
    this.setState({ openApoint: false });
  };

  // Search by City
  showPlaceDetails = (place) => {
    place = place.geometry.location;
    this.setState({ place });
    this.setState({ mLatitude: parseFloat(place.lat()) });
    this.setState({ mlongitude: parseFloat(place.lng()) });
    Geocode.enableDebug();
    Geocode.fromLatLng(this.state.mLatitude, this.state.mlongitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState({ MycurrentLocationName: address });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  apointmentType = (event) => {
    if (event.target.name == "Video") {
      this.setState({
        video_call: this.state.video_call == true ? false : true,
      });
    } else if (event.target.name == "Office") {
      this.setState({
        office_visit: this.state.office_visit == true ? false : true,
      });
    }
  };

  setRadius = (event) => {
    let searchDetails = this.state.searchDetails;
    if (event.target.name == "range") {
      searchDetails["radius"] = event.target.value;
    }
    this.setState({ searchDetails: searchDetails });
  };

  handleChangeSelect = (selectedOption) => {
    let searchDetails = this.state.searchDetails;
    searchDetails["specialty"] = selectedOption.value;
    this.setState({
      selectedOption: selectedOption,
      searchDetails: searchDetails,
    });
  };

  handleAllowLoc = () => {
    this.getlocation();
    this.setState(
      { openAllowAccess: false, openAllowLoc: true, selectedOption: {} },
      () => {
        setTimeout(() => {
          this.setState({ show_type: "contact" });
        }, 2000);
      }
    );
  };

  handleCloseAllowLoc = () => {
    this.setState({ openAllowLoc: false });
  };

  // for cancel Appointment
  CancelAppoint = () => {
    let user_token = this.props.stateLoginValueAim.token;
    let timedifference = new Date(this.state.cancelappoint.date);
    let currentDate = new Date();
    // if (currentDate.getDate() === timedifference.getDate()) {
    if (this.state.cancelappoint.start_time) {
      timedifference = timedifference.setHours(parseInt((this.state.cancelappoint.start_time.split(":"))[0]), parseInt((this.state.cancelappoint.start_time.split(":"))[1]))
      var timedifference1 = timeDiffCalc(currentDate, new Date(timedifference))
      this.setState({ loaderImage: true });
      axios
        .post(
          sitedata.data.path +
          "/UserProfile/abletocancel/" +
          this.state.cancelappoint.doctor_id,
          {
            appointment_type: this.state.cancelappoint.appointment_type,
            timedifference: timedifference1,
          },
          commonHeader(user_token)
        )
        .then((response) => {
          if (response.data.hassuccessed) {
            this.CancelAppointsments()
          }
          else {
            this.setState({
              cancelNable: true,
              openApoint: false,
            });
            window.scroll({
              top: 0,
              behavior: "smooth",
            })
            setTimeout(() => {
              this.setState({ cancelNable: false });
            }, 5000);
          }
          this.setState({
            loaderImage: false,
          });
        })
        .catch((error) => { });
    }
    else {
      this.setState({
        cancelNable: true,
        openApoint: false,
      });
      window.scroll({
        top: 0,
        behavior: "smooth",
      })
      setTimeout(() => {
        this.setState({ cancelNable: false });
      }, 5000);
    }

    // }
    // else {
    //   this.CancelAppointsments()
    // }
  };

  CancelAppointsments = () => {
    let user_token = this.props.stateLoginValueAim.token;
    axios
      .put(
        sitedata.data.path +
        "/UserProfile/GetAppointment/" +
        this.state.cancelappoint._id,
        {
          status: "cancel",
          message: this.state.message,
        },
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({
          cancelsuccess: true,
          loaderImage: false,
          openApoint: false,
        });
        window.scroll({
          top: 0,
          behavior: "smooth",
        })
        setTimeout(() => {
          this.setState({ cancelsuccess: false });
        }, 5000);
        // this.getUpcomingAppointment();
      })
      .catch((error) => { });
  }

  onChange = (date) => {
    this.setState({ date: date });
    var day_num;
    var Month, date1;
    if (date !== undefined && date) {
      day_num = date.getDay();
      Month = date.getMonth() + 1;
      date1 = Month + "-" + date.getDate() + "-" + date.getFullYear();
    } else {
      date = new Date();
      day_num = date.getDay();
      Month = date.getMonth() + 1;
      date1 = Month + "-" + date.getDate() + "-" + date.getFullYear();
    }
    let days;
    switch (day_num) {
      case 1:
        days = "monday";
        break;
      case 2:
        days = "tuesday";
        break;
      case 3:
        days = "wednesday";
        break;
      case 4:
        days = "thursday";
        break;
      case 5:
        days = "friday";
        break;
      case 6:
        days = "saturday";
        break;
      case 0:
        days = "sunday";
        break;
    }
    let appointmentData = this.state.appointmentData;
    let appointDate;
    if (appointmentData) {
      Object.entries(appointmentData).map(([key, value]) => {
        if (key == days) {
          appointDate = value;
        }
      });
    }
    this.setState({
      appointDate: appointDate,
      apointDay: days,
      selectedDate: date1,
    });
  };

  // findAppointment
  findAppointment = (tab, doc_select, apointType, apointDay, iA) => {
    apointType = apointType.replace(/['"]+/g, "");
    this.setState({
      currentSelected: iA,
      findDoc: tab,
      selectedDoc: this.state.allDocData[doc_select],
      mypoint: {
        start:
          this.state.allDocData[doc_select] &&
          this.state.allDocData[doc_select][apointType][0] &&
          this.state.allDocData[doc_select][apointType][0][apointDay][iA],
        end:
          this.state.allDocData[doc_select] &&
          this.state.allDocData[doc_select][apointType][0] &&
          this.state.allDocData[doc_select][apointType][0][apointDay][iA + 1],
        type: apointType,
      },
    });
  };

  questionDetails = (e) => {
    const state = this.state.UpDataDetails;
    state[e.target.name] = e.target.value;
    this.setState({ UpDataDetails: state });
  };

  bookAppointment = () => {
    var insurance_no =
      this.state.personalinfo?.insurance &&
        this.state.personalinfo?.insurance.length > 0 &&
        this.state.personalinfo?.insurance[0] &&
        this.state.personalinfo?.insurance[0].insurance_number
        ? this.state.personalinfo?.insurance[0].insurance_number
        : "";
    // this.setState({ loaderImage: true });
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .post(sitedata.data.path + "/User/appointment", {
        patient: this.state.PatientData[0]?.patient_id,
        doctor_id:
          this.state.selectedDoc?.data && this.state.selectedDoc?.data._id,
        insurance:
          this.state.personalinfo &&
          this.state.personalinfo?.insurance &&
          this.state.personalinfo?.insurance?.length > 0 &&
          this.state.personalinfo?.insurance[0] &&
          this.state.personalinfo?.insurance[0]?.insurance_number &&
          this.state.personalinfo?.insurance[0]?.insurance_number,
        date: this.state.selectedDate,
        start_time: this.state.mypoint.start,
        end_time: this.state.mypoint.end,
        appointment_type: this.state.mypoint.type,
        insurance_number: insurance_no,
        annotations: this.state.UpDataDetails.annotations,
        status: "free",
        // patient_info: {
        //   patient_id: this.props.stateLoginValueAim.user.profile_id,
        //   first_name: this.props.stateLoginValueAim.user.first_name,
        //   last_name: this.props.stateLoginValueAim.user.last_name,
        //   email: this.props.stateLoginValueAim.user.email,
        //   birthday: this.props.stateLoginValueAim.user.birthday,
        //   profile_image: this.props.stateLoginValueAim.user.image,
        //   bucket: this.props.stateLoginValueAim.user.bucket,
        // },
        patient_info: {
          patient_id: this.state.PatientData[0]?.profile_id,
          first_name: this.state.PatientData[0]?.first_name,
          last_name: this.state.PatientData[0]?.last_name,
          // email: this.state.PatientData[0]?.email,
          // birthday: this.props.stateLoginValueAim.user.birthday,
          profile_image: this.state.PatientData[0]?.image,
          // bucket: this.props.stateLoginValueAim.user.bucket,
        },
        lan: this.props.stateLanguageType,
        docProfile: {
          patient_id:
            this.state.selectedDoc.data &&
            this.state.selectedDoc.data.profile_id,
          first_name:
            this.state.selectedDoc.data &&
            this.state.selectedDoc.data.first_name,
          last_name:
            this.state.selectedDoc.data &&
            this.state.selectedDoc.data.last_name,
          email:
            this.state.selectedDoc.data && this.state.selectedDoc.data.email,
          birthday:
            this.state.selectedDoc.data && this.state.selectedDoc.data.birthday,
          profile_image:
            this.state.selectedDoc.data && this.state.selectedDoc.data.image,
          speciality:
            this.state.selectedDoc.data &&
            this.state.selectedDoc.data.speciality,
          subspeciality:
            this.state.selectedDoc.data &&
            this.state.selectedDoc.data.subspeciality,
          phone:
            this.state.selectedDoc.data && this.state.selectedDoc.data.phone,
        },
      })
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed === true) {
          this.setState({
            successfull: true,
            openAllowAccess: false,
            openAllowLoc: false,
            openFancyVdo: false,
            currentSelected: {},
          });
          // this.getUpcomingAppointment();
          // this.getPastAppointment();
          setTimeout(
            function () {
              this.setState({ successfull: false });
            }.bind(this),
            5000
          );
        }
      });
  };

  _getHourMinut = (time) => {
    return time.toString().split(":");
  };

  Isintime = (currentTime, b_start, b_end) => {
    if (!currentTime || !b_end || !b_start) return false;
    let b_start_time, b_end_time, current_time, smint;
    b_start_time =
      parseInt(this._getHourMinut(b_start)[0]) * 60 +
      parseInt(this._getHourMinut(b_start)[1]);
    b_end_time =
      parseInt(this._getHourMinut(b_end)[0]) * 60 +
      parseInt(this._getHourMinut(b_end)[1]);
    current_time =
      parseInt(this._getHourMinut(currentTime)[0]) * 60 +
      parseInt(this._getHourMinut(currentTime)[1]);
    smint = parseInt(this._getHourMinut(currentTime)[1]);


    if (current_time >= b_start_time && current_time < b_end_time) {
      return true;
    } else {
      return false;
    }
  };

  Availabledays = (date, days_upto) => {
    let current_date = new Date();
    let Newdate = new Date();
    if (date && days_upto) {
      current_date = new Date(current_date).setHours(0, 0, 0, 0);
      Newdate = Newdate.setDate(Newdate.getDate() + parseInt(days_upto))
      return (new Date(Date.parse(date.replace(/-/gm, '/'))) < current_date || new Date(Date.parse(date.replace(/-/gm, '/'))) >= Newdate);
    }
    else {
      return false;
    }
  }

  ExitinHoliday = (date, h_start, h_end) => {
    if (h_start && h_end && date) {
      let start_date = new Date(h_start);
      let end_date = new Date(h_end);
      start_date = start_date.setHours(0, 0, 0, 0);
      end_date = end_date.setDate(end_date.getDate() + 1);
      end_date = new Date(end_date).setHours(0, 0, 0, 0);
      return (new Date(Date.parse(date.replace(/-/gm, '/'))) >= start_date && new Date(Date.parse(date.replace(/-/gm, '/'))) < end_date);
    } else {
      return false;
    }
  };


  onFieldChange1 = (e) => {
    let { users } = this.state;
    let UserList = users && users.length > 0 && users.filter((item) => {
      return item && item?.patient_id == e.value;
    })
    this.setState({ PatientData: UserList })
  }

  render() {
    const { stateLoginValueAim, House } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "adminstaff"
    ) {
      return <Redirect to={"/"} />;
    }
    if (House && House?.value === null) {
      return <Redirect to={"/VirtualHospital/institutes"} />;
    }
    let translate = getLanguage(this.props.stateLanguageType);
    let { Appointmentiscanceled,
      select_spec,
      Patient,
      slct_time_slot,
      holiday,
      NotAvailable,
      select_specility,
      Details,
      consultancy_appintment,
      past_apointment,
      Questions,
      cancel,
      book,
      appointment_booked,
      upcming_apointment,
      office_visit,
      cancel_apointmnt,
      hide_past_appointment,
      show_past_apointment,
      km_range,
      we_r_showing_speciality,
      plz_write_short_explnation,
      short_msg,
      appointments,
      UnableCancel,
      appointment,
      arrng_apointmnt,
      today,
      sync_ur_calander,
      speciality,
      search_within,
      Video,
      Office,
      type,
      Contact,
      Services,
      latest_info,
      see_avlbl_date,
      location_of_srvc,
      this_way_can_instntly_list_of_specility,
      find_apointment,
      consultancy_cstm_calnder,
      vdo_call,
      allow_location_access,
      profile_info,
      profile,
      information,
      ID,
      pin,
      QR_code,
      done,
      Change,
      edit_id_pin,
      edit,
      and,
      is,
      changed,
      profile_id_taken,
      profile_id_greater_then_5, } =
      translate;

    const { tabvalue,
      pastappointment,
      selectedOption,
      specialityData,
      subspecialityData,
      allDocData,
      PatientData,
      date,
      doc_select,
      appointType,
      apointDay } = this.state;
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
    var myMarker = require("assets/images/loc2.png");
    return (
      <Grid
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme homeBgDrk"
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
                          <Button onClick={this.handleAllowAccess}>+ Add Appointment</Button>
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


                  <Grid className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark"
                      ? "nwEntrCntnt fltrClear darkTheme"
                      : "nwEntrCntnt fltrClear"
                  }>

                    <Grid className="fltrClearIner">
                      <Grid className="fltrLbl">
                        <Grid className="fltrLblClose">
                          <a onClick={this.handleCloseFil}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a>
                        </Grid>
                        <label>Filters</label>
                      </Grid>
                      {/* <Grid item xs={12} sm={7} md={6}> */}
                      <AppBar position="static" className="appTabs modAppTabs">
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
                          <label>{Patient}</label>
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
                                className="addStafSelect"
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
                                  className="addStafSelect"
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
                                  className="addStafSelect"
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

                {/* Allow Location Access */}
                <Modal
                  open={this.state.openAllowAccess}
                  onClose={this.handleCloseAllowAccess}
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode === "dark"
                      ? "darkTheme editBoxModel"
                      : "editBoxModel"
                  }
                >
                  <div className="alowLocAces 22">
                    <div className="accessCourse">
                      <div className="handleAccessBtn">
                        <a onClick={this.handleCloseAllowAccess}>
                          <img src={require("assets/images/close-search.svg")} alt="" title="" />
                        </a>
                      </div>
                      <Grid container direction="row" spacing={2} className="srchAccessLoc">
                        <Grid item xs={12} md={4}>
                          <label>{Patient}</label>
                          <Grid>
                            <Select
                              name="patient"
                              options={this.state.users1}
                              placeholder="Search & Select"
                              onChange={(e) => this.onFieldChange1(e, "patient")}
                              // value={this.state.selectedPat || ''}
                              className="addStafSelect"
                              isMulti={false}
                              isSearchable={true} />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid><label>{speciality}</label></Grid>
                          <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
                            options={specialityData}
                            placeholder={select_spec}
                            className="sel_specialty"
                          />
                        </Grid>
                        <Grid item xs={12} md={4} className="locat_srvc">
                          <Grid>
                            <label>{location_of_srvc}</label>
                          </Grid>
                          {/* <input type="text" placeholder="Search for city" onPlaceChanged={this.showPlaceDetails.bind(this)} /> */}
                          {/* <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} /> */}
                          <Autocomplete
                            stateLanguageType={this.props.stateLanguageType}
                            onPlaceChanged={this.showPlaceDetails.bind(
                              this
                            )}
                          />
                          <img
                            src={require("assets/images/search-entries.svg")}
                            alt=""
                            title=""
                          />
                        </Grid>
                        <Grid item xs={12} md={2} className="srchKm">
                          <Grid>
                            <label>{search_within}</label>
                          </Grid>
                          <input
                            type="text"
                            name="range"
                            onChange={this.setRadius}
                            value={
                              this.state.searchDetails &&
                                this.state.searchDetails.radius
                                ? this.state.searchDetails.radius
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={3} className="apointType">
                          <Grid>
                            <label>
                              {appointment} {type}
                            </label>
                          </Grid>
                          <FormControlLabel
                            control={
                              this.state.video_call ? (
                                <Checkbox
                                  checked
                                  onClick={this.apointmentType}
                                  name="Video"
                                />
                              ) : (
                                <Checkbox
                                  onClick={this.apointmentType}
                                  name="Video"
                                />
                              )
                            }
                            label={Video}
                          />
                          <FormControlLabel
                            control={
                              this.state.office_visit ? (
                                <Checkbox
                                  checked
                                  name="Office"
                                  onClick={this.apointmentType}
                                />
                              ) : (
                                <Checkbox
                                  name="Office"
                                  onClick={this.apointmentType}
                                />
                              )
                            }
                            label={Office}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className="showSpcial">
                      <p>
                        <img
                          src={require("assets/images/location.png")}
                          alt=""
                          title=""
                        />
                        I am here : “{this.state.MycurrentLocationName}"
                      </p>
                    </div>
                    <div className="allowAccessList">
                      {this.state.clat || this.state.mLatitude ? (
                        <Map
                          className="MapStyle"
                          google={this.props.google}
                          center={
                            this.state.mLatitude
                              ? {
                                lat: this.state.mLatitude,
                                lng: this.state.mlongitude,
                              }
                              : {
                                lat: this.state.clat,
                                lng: this.state.clng,
                              }
                          }
                          initialCenter={{
                            lat: this.state.clat,
                            lng: this.state.clan,
                          }}
                          zoom={10}
                        >
                          <Marker
                            icon={{ url: myMarker }}
                            title={this.state.MycurrentLocationName}
                            name={this.state.MycurrentLocationName}
                            position={
                              this.state.mLatitude
                                ? {
                                  lat: this.state.mLatitude,
                                  lng: this.state.mlongitude,
                                }
                                : {
                                  lat: this.state.clat,
                                  lng: this.state.clng,
                                }
                            }
                          />
                        </Map>
                      ) : (
                        <div>
                          <div>
                            <a>
                              <img
                                src={require("assets/images/location.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </div>
                          <h1>{allow_location_access}</h1>
                          <p>{this_way_can_instntly_list_of_specility}</p>
                        </div>
                      )}
                      {/* <div><a><img src={require('assets/images/location.png')} alt="" title="" /></a></div>
                                                          <h1>{allow_location_access}</h1>
                                                          <p>{this_way_can_instntly_list_of_specility}</p> */}
                    </div>
                    <div
                      style={{ textAlign: "center" }}
                      className="arng_addEntrynw">
                      <a onClick={this.handleAllowLoc}>
                        {find_apointment}</a>
                    </div>
                  </div>
                </Modal>
                {/* End of Allow Location Access */}

                {/* Allow Location Access */}
                <Modal
                  open={this.state.openAllowLoc}
                  onClose={this.handleCloseAllowLoc}
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode === "dark"
                      ? "darkTheme editBoxModel"
                      : "editBoxModel"
                  }
                >
                  <div className="alowLocAces 11">
                    <div className="accessCourse">
                      <div className="handleAccessBtn">
                        <a onClick={this.handleCloseAllowLoc}>
                          <img
                            src={require("assets/images/close-search.svg")}
                            alt=""
                            title=""
                          />
                        </a>
                      </div>
                      <Grid
                        container
                        direction="row"
                        spacing={2}
                        className="srchAccessLoc"
                      >
                        <Grid item xs={12} md={4}>
                          <label>{Patient}</label>
                          <Grid>
                            <Select
                              name="patient"
                              options={this.state.users1}
                              placeholder="Search & Select"
                              onChange={(e) => this.onFieldChange1(e, "patient")}
                              // value={this.state.selectedPat || ''}
                              className="addStafSelect"
                              isMulti={false}
                              isSearchable={true} />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid>
                            <label>{speciality}</label>
                          </Grid>
                          <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
                            options={specialityData}
                            placeholder={select_specility}
                            className="sel_specialty"
                          />
                        </Grid>
                        <Grid item xs={12} md={3} className="locat_srvc">
                          <Grid>
                            <label>{location_of_srvc}</label>
                          </Grid>
                          {/* <input type="text" placeholder="Search for city" /> */}
                          <Autocomplete
                            onPlaceChanged={this.showPlaceDetails.bind(this)}
                          />
                          <img
                            src={require("assets/images/search-entries.svg")}
                            alt=""
                            title=""
                          />
                        </Grid>
                        <Grid item xs={12} md={2} className="srchKm">
                          <Grid>
                            <label>{search_within}</label>
                          </Grid>
                          <input
                            type="text"
                            name="range"
                            value={
                              this.state.searchDetails &&
                                this.state.searchDetails.radius
                                ? this.state.searchDetails.radius
                                : ""
                            }
                            onChange={this.setRadius}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} className="apointType">
                          <Grid>
                            <label>
                              {appointment} {type}
                            </label>
                          </Grid>
                          <FormControlLabel
                            control={
                              this.state.video_call ? (
                                <Checkbox
                                  checked
                                  onClick={this.apointmentType}
                                  name="Video"
                                />
                              ) : (
                                <Checkbox
                                  onClick={this.apointmentType}
                                  name="Video"
                                />
                              )
                            }
                            label={Video}
                          />
                          <FormControlLabel
                            control={
                              this.state.office_visit ? (
                                <Checkbox
                                  checked
                                  name="Office"
                                  onClick={this.apointmentType}
                                />
                              ) : (
                                <Checkbox
                                  name="Office"
                                  onClick={this.apointmentType}
                                />
                              )
                            }
                            label={Office}
                          />
                        </Grid>
                      </Grid>
                      <div className="showSpcial">
                        <p>
                          <img
                            src={require("assets/images/location.png")}
                            alt=""
                            title=""
                          />
                          {we_r_showing_speciality} “
                          {this.state.MycurrentLocationName}” in{" "}
                          {this.state.searchDetails.radius
                            ? this.state.searchDetails.radius
                            : "10"}{" "}
                          {km_range}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "center" }}
                      className="arng_addEntrynw"
                    >
                      <a onClick={this.handleAllowLoc}>{find_apointment}</a>
                    </div>
                    {/* New Design */}
                    <div className="allowAvailList">
                      {allDocData &&
                        allDocData.length > 0 &&
                        allDocData.map((doc, i) => (
                          <div className="allowAvailListIner">
                            <Grid container direction="row" spacing={1}>
                              <Grid item xs={12} md={3}>
                                <Grid className="spclistDr">
                                  {doc.data.new_image ? (
                                    <img
                                      className="doctor_pic"
                                      src={doc.data.new_image}
                                      alt=""
                                      title=""
                                    />
                                  ) : (
                                    <img
                                      className="doctor_pic"
                                      src={require("assets/images/avatar.png")}
                                      alt=""
                                      title=""
                                    />
                                  )}
                                  <a>
                                    {/* <img src={doc.data.image} alt="" title="" /> */}
                                    {doc.data &&
                                      doc.data.first_name &&
                                      doc.data.first_name}{" "}
                                    {doc.data &&
                                      doc.data.last_name &&
                                      doc.data.last_name}{" "}
                                    (
                                    {doc.data &&
                                      doc.data.title &&
                                      doc.data.title}
                                    )
                                  </a>
                                </Grid>
                                <Grid className="nuroDr">
                                  <label>
                                    {doc.data &&
                                      doc.data.speciality &&
                                      doc.data.speciality.length > 0 &&
                                      getSpec(
                                        doc.data.speciality,
                                        this.props.stateLanguageType
                                      )}
                                  </label>
                                  <p>
                                    {doc.data &&
                                      doc.data.subspeciality &&
                                      doc.data.subspeciality.length > 0 &&
                                      getSpec(
                                        doc.data.subspeciality,
                                        this.props.stateLanguageType
                                      )}
                                  </p>
                                </Grid>

                                {/* <Grid className="nuroDr">
                                                                                                <label>NEUROLOGY</label>
                                                                                                <p>Neurodegerenative diseases</p>
                                                                                            </Grid> */}
                              </Grid>
                              <Grid item xs={12} md={5}>
                                <Grid className="srvcTagsCntnt">
                                  <Grid className="srvcTags">
                                    <a
                                      className={
                                        this.state.show_type === "contact" &&
                                        "currentTab"
                                      }
                                      onClick={() => {
                                        this.setState({ show_type: "contact" });
                                      }}
                                    >
                                      {Contact}
                                    </a>
                                    <a
                                      className={
                                        this.state.show_type === "service" &&
                                        "currentTab"
                                      }
                                      onClick={() => {
                                        this.setState({ show_type: "service" });
                                      }}
                                    >
                                      {Services}
                                    </a>
                                    <a
                                      className={
                                        this.state.show_type ===
                                        "information" && "currentTab"
                                      }
                                      onClick={() => {
                                        this.setState({
                                          show_type: "information",
                                        });
                                      }}
                                    >
                                      {latest_info}
                                    </a>
                                  </Grid>
                                  {this.state.show_type === "contact" && (
                                    <Grid className="srvcTagsLoc">
                                      <a>
                                        <img
                                          src={require("assets/images/location-pin.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {doc.data &&
                                          doc.data.city &&
                                          doc.data.city}
                                      </a>
                                      <a>
                                        <img
                                          src={require("assets/images/phone.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {doc.data &&
                                          doc.data.mobile &&
                                          doc.data.mobile}
                                      </a>
                                      <a>
                                        <img
                                          src={require("assets/images/email.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {doc.data &&
                                          doc.data.email &&
                                          doc.data.email}
                                      </a>
                                      <a>
                                        <img
                                          src={require("assets/images/language.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {doc.data &&
                                          doc.data.language &&
                                          doc.data.language.length > 0 &&
                                          doc.data.language.join(", ")}
                                      </a>
                                    </Grid>
                                  )}
                                  {this.state.show_type === "service" && (
                                    <Grid className="srvcTagsLoc">
                                      <a>
                                        {doc.data &&
                                          doc.data.weoffer_text &&
                                          doc.data.weoffer_text}
                                      </a>
                                    </Grid>
                                  )}
                                  {this.state.show_type === "information" && (
                                    <Grid className="srvcTagsLoc">
                                      <a>
                                        {doc.data && doc.data.latest_info && (
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: doc.data.latest_info,
                                            }}
                                          />
                                        )}
                                      </a>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                              <Grid item xs={12} md={4}>
                                <Grid className="avlablDates">
                                  <h3>{see_avlbl_date}:</h3>
                                  <Grid>
                                    {this.state.video_call && (
                                      <a
                                        onClick={() =>
                                          this.handleOpenFancyVdo(
                                            i,
                                            "online_appointment",
                                            doc.online_appointment[0]
                                          )
                                        }
                                      >
                                        <img
                                          src={require("assets/images/video-call-copy2.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {vdo_call}
                                      </a>
                                    )}
                                    {this.state.office_visit && (
                                      <a
                                        onClick={() =>
                                          this.handleOpenFancyVdo(
                                            i,
                                            "appointments",
                                            doc.appointments[0]
                                          )
                                        }
                                      >
                                        <img
                                          src={require("assets/images/ShapeCopy2.svg")}
                                          alt=""
                                          title=""
                                        />
                                        {doc.appointments &&
                                          doc.appointments.length > 0 &&
                                          doc.appointments[0].custom_text
                                          ? doc.appointments[0].custom_text
                                          : office_visit}
                                      </a>
                                    )}
                                    <a
                                      onClick={() =>
                                        this.handleOpenFancyVdo(
                                          i,
                                          "practice_days",
                                          doc.practice_days[0]
                                        )
                                      }
                                      className="addClnder"
                                    >
                                      <img
                                        src={require("assets/images/cal1.png")}
                                        alt=""
                                        title=""
                                      />
                                      {consultancy_cstm_calnder}
                                    </a>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                    </div>
                    {/* End of New Design */}
                  </div>
                </Modal>
                {/* End of Allow Location Access */}

                {/* {cancel_apointmnt} */}
                <Modal
                  open={this.state.openApoint}
                  onClose={this.handleCloseApoint}
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode === "dark"
                      ? "darkTheme editBoxModel"
                      : "editBoxModel"
                  }
                >
                  <Grid className="apontBoxCntnt">
                    <Grid className="apontCourse">
                      <Grid className="apontCloseBtn">
                        <a onClick={this.handleCloseApoint}>
                          <img
                            src={require("assets/images/close-search.svg")}
                            alt=""
                            title=""
                          />
                        </a>
                      </Grid>
                      <Grid>
                        <label>{cancel_apointmnt}</label>
                      </Grid>
                      <p>{plz_write_short_explnation}</p>
                    </Grid>
                    <Grid className="apontDragCntnt">
                      <Grid>
                        <Grid>
                          <label>{short_msg}</label>
                        </Grid>
                        <Grid>
                          <textarea
                            name="message"
                            onChange={(e) => {
                              this.setState({ message: e.target.value });
                            }}
                          ></textarea>
                        </Grid>
                        <Grid>
                          <input
                            type="submit"
                            value={cancel_apointmnt}
                            onClick={this.CancelAppoint}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Modal>
                {/* End of {cancel_apointmnt} */}

                <Modal
                  open={this.state.openFancyVdo}
                  onClose={this.handleCloseFancyVdo}
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode === "dark"
                      ? "darkTheme editBoxModel"
                      : "editBoxModel"
                  }
                >
                  <Grid className="slotBoxMain">
                    <Grid className="slotBoxCourse">
                      <a
                        onClick={this.handleCloseFancyVdo}
                        className="timSlotClose"
                      >
                        <img
                          src={require("assets/images/close-search.svg")}
                          alt=""
                          title=""
                        />
                      </a>
                      <Grid className="selCalenderUpr">
                        <Grid className="selCalender">
                          <Calendar2
                            onChange={(e) => this.onChange(e)}
                            value={this.state.date}
                          />
                        </Grid>
                        <Grid className="selTimeSlot">
                          <Grid>
                            <label>{slct_time_slot}</label>
                          </Grid>

                          <Grid className="selTimeAM">
                            {this.state.appointDate &&
                              this.state.appointDate.length > 0 ?
                              (
                                this.Availabledays(this.state.selectedDate, this.state.appointmentData.appointment_days)
                                  ?
                                  <Grid>
                                    <span>{NotAvailable}!</span>
                                  </Grid>

                                  : this.ExitinHoliday(this.state.selectedDate, this.state.appointmentData.holidays_start,
                                    this.state.appointmentData.holidays_end)
                                    ?
                                    <Grid>
                                      <span>{holiday}!</span>
                                    </Grid> :

                                    (this.state.appointDate.map((data, iA) => {
                                      if (
                                        this.Isintime(
                                          this.state.appointDate[iA],
                                          this.state.appointmentData.breakslot_start,
                                          this.state.appointmentData.breakslot_end,
                                          this.state.appointmentData.holidays_start,
                                          this.state.appointmentData.holidays_end,
                                        )
                                      )
                                        return;

                                      return (
                                        <Grid>
                                          {this.state.appointDate[iA + 1] &&
                                            this.state.appointDate[iA + 1] !==
                                            "undefined" &&
                                            iA === 0 ? (
                                            <a
                                              className={
                                                this.state.currentSelected === 0 &&
                                                "current_selected"
                                              }
                                              onClick={() => {
                                                this.findAppointment(
                                                  "tab3",
                                                  doc_select,
                                                  appointType,
                                                  apointDay,
                                                  iA
                                                );
                                              }}
                                            >
                                              {this.state.appointDate[iA] +
                                                " - " +
                                                this.state.appointDate[iA + 1]}
                                            </a>
                                          ) : (
                                            this.state.appointDate[iA + 1] &&
                                            this.state.appointDate[iA + 1] !==
                                            "undefined" && (
                                              <a
                                                className={
                                                  this.state.currentSelected &&
                                                    this.state.currentSelected === iA
                                                    ? "current_selected"
                                                    : ""
                                                }
                                                onClick={() => {
                                                  this.findAppointment(
                                                    "tab3",
                                                    doc_select,
                                                    appointType,
                                                    apointDay,
                                                    iA
                                                  );
                                                }}
                                              >
                                                {this.state.appointDate[iA] +
                                                  " - " +
                                                  this.state.appointDate[iA + 1]}
                                              </a>
                                            )
                                          )}
                                        </Grid>
                                      );
                                    })
                                    )


                              )
                              :
                              this.state.appointDate !== undefined ? (
                                <Grid>
                                  <span>{NotAvailable}!</span>
                                </Grid>
                              ) : (
                                <Grid>
                                  <span>{NotAvailable}!</span>
                                </Grid>
                              )}
                          </Grid>
                        </Grid>
                        <Grid className="delQues">
                          <Grid>
                            <label>
                              {Details} / {Questions}
                            </label>
                          </Grid>
                          <Grid>
                            <textarea
                              name="annotations"
                              onChange={(e) => {
                                this.questionDetails(e);
                              }}
                            ></textarea>
                          </Grid>
                          <Grid className="delQuesBook">
                            <a onClick={this.bookAppointment}>{book}</a>
                            <a
                              onClick={this.handleCloseFancyVdo}>
                              {cancel}
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Modal>
                {/* End of Video Model */}

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
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4",
    })(Index)
  )
);
