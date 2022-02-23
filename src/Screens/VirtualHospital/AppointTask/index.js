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
import { Speciality } from "Screens/Login/speciality.js";
import { getLanguage } from "translations/index"
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
import { commonHeader } from "component/CommonHeader/index";
import { authy } from "Screens/Login/authy.js";
import { houseSelect } from "../Institutes/selecthouseaction";
import Autocomplete from "Screens/Patient/Appointment/Autocomplete.js";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import Geocode from "react-geocode";
import Calendar2 from "react-calendar";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import SPECIALITY from "speciality";
import { subspeciality } from "subspeciality.js";
import { getSpec, timeDiffCalc, filterPatient, isLessThanToday } from "Screens/Components/BasicMethod/index";
import Loader from "Screens/Components/Loader/index";
import { getProfessionalData } from '../../VirtualHospital/PatientFlow/data'
import ArrangeAppoint from "./arrangeAppoint";


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
      TasksCss: '',
      selectDocData: {},
      selectedPatient: {},
      patNotSelected: false,
      doctorsData1: []
    };
  }

  componentDidMount() {
    this.getTaskData();
    this.specailityList();
    this.getSpecialities();
  }

  handleChangeTab = (event, tabvalue) => {
    this.setState({ tabvalue });
    if (tabvalue == 0) {
      this.setState({ showField: true, setFilter: "All", userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '' })
    } else if (tabvalue == 1) {
      this.setState({ showField: true, setFilter: "Appointment", userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '' })
    } else if (tabvalue == 2) {
      this.setState({ showField: true, setFilter: "Task", userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '' })
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

  setFilterValue = (data) =>{
    if(data?.house_id === this.props.House?.value){
      let specialityList = this.props.speciality?.SPECIALITY && this.props.speciality?.SPECIALITY.length > 0 && this.props.speciality?.SPECIALITY.filter((item) => item && item._id === data.speciality_id)
      let wardsFullData = specialityList && specialityList.length > 0 && specialityList[0].wards
      let wards_data = wardsFullData && wardsFullData.length > 0 && wardsFullData.map((item) => {
        return { label: item.ward_name, value: item._id }
      })
      let CurrentSpec = {value: specialityList?.[0]?._id, label: specialityList?.[0]?.specialty_name}
      let getCurrentWard = wards_data && wards_data.length > 0 && wards_data.filter((item) => item && item.value === data.ward_id)
      let check = {open : data?.status?.includes('open') ? true: false , done : data?.status?.includes('done') ? true: false }
      let tabvalue = data?.filter === 'Appointment' ? 1 : data?.filter === 'Task' ? 2 : 0;
      this.setState({ selectSpec2: CurrentSpec, wardList: wards_data, allWards: wardsFullData, selectWard: getCurrentWard?.[0] , check: check, tabvalue: tabvalue})
    }
    
  }
  //get Add task data
  getTaskData = (isclear) => {
    if(!isclear && this.props?.settings?.setting?.calendar_filter?.house_id){
      // this.setState({selectWard: this.props.settings.setting.calendar_filter?.})
     this.setFilterValue(this.props.settings.setting.calendar_filter);
     this.applyfilterOndata(this.props?.settings?.setting?.calendar_filter)
    }
    else{
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
    }
    
  };

  showDataCalendar = (response) => {
    let indexout = 0;
    let appioinmentTimes = [];
    var taskdata = [], appioinmentdata = [];
    if (response?.data?.data) {
      var patientForFilterArr = filterPatient(response.data.data);
      this.setState({ patientForFilter: patientForFilterArr });
    }
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
            this.setState({ taskEventList: taskdata, appioinmentTimes: appioinmentTimes, })
          }
          // this.setState({ loaderImage: false });
          // this.handleCloseFil();
        } else {
          if (isLessThanToday(data?.date)) {
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
                data?.patient_info?.first_name +
                " " +
                data?.patient_info?.last_name,
              start: new Date(da1),
              end: new Date(da2),
              indexout: indexout,
              fulldata: [data],
            });
          }
          // this.setState({ loaderImage: false });
          // this.handleCloseFil();
        }
        indexout++;
        this.setState({ myEventsList: [...taskdata, ...appioinmentdata], appioinmentEventList: appioinmentdata, appioinmentTimes: appioinmentTimes, })
        // this.handleCloseFil();
      })
      this.setState({ loaderImage: false });
      this.handleCloseFil();
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
      with_professional
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
                  {data.docProfile ? <h1>{event.title} {with_professional} ({data?.docProfile?.first_name} {data?.docProfile?.last_name}) - {data?.docProfile?.email}</h1> : <h1>{event.title}</h1>}
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
    var tabvalue = this.state.tabvalue
    if (tabvalue == 0) {
      this.setState({ showField: true, setFilter: "All", userFilter: '', selectSpec2: this.state.selectSpec2, selectWard: this.state.selectWard, selectRoom: '' })
    } else if (tabvalue == 1) {
      this.setState({ showField: true, setFilter: "Appointment", userFilter: '', selectSpec2: this.state.selectSpec2, selectWard: this.state.selectWard, selectRoom: '' })
    } else if (tabvalue == 2) {
      this.setState({ showField: true, setFilter: "Task", userFilter: '', selectSpec2: this.state.selectSpec2, selectWard: this.state.selectWard, selectRoom: '' })
    }
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

  //User list will be show/hide
  toggle = () => {
    this.setState({
      shown: !this.state.shown,
    });
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
    let specialityList = this.props.speciality?.SPECIALITY && this.props.speciality?.SPECIALITY.length > 0 && this.props.speciality?.SPECIALITY.filter((item) => {
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

  handleAllowAccess = async () => {
    // const professionals = await getProfessionalData(this.props.House.value, this.props.stateLoginValueAim.token)
    // const doctorsData = [], doctorsData1 = [];
    // // eslint-disable-next-line no-unused-expressions
    // await professionals?.professionalArray?.length > 0 && professionals?.professionalArray?.map(function (data) {
    //   if (data.type === 'doctor') {
    //     doctorsData.push({ label: `${data.first_name} ${data.last_name}`, value: `${data.user_id}` })
    //     doctorsData1.push(data);
    //   }
    // })

    // this.getGeoLocation();
    this.setState({ openAllowAccess: true});
  };

  handleCloseAllowAccess = () => {
    this.setState({ openAllowAccess: false, selectDocData: {} });
  };

  applyFilter = (isSave) => {
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
    this.applyfilterOndata(data, isSave)
  }

  applyfilterOndata = (data, isSave) =>{
    this.setState({loaderImage: true})
    axios.post(
      sitedata.data.path + "/vh/CalenderFilter",
      data,
      commonHeader(this.props.stateLoginValueAim.token)
    )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          if(isSave){
            this.updateOnsetting(data);
          }
          this.showDataCalendar(responce)
          this.setState({ TasksCss: 'filterApply', loaderImage: false, openFil: false });
        }
        this.setState({loaderImage: false})
      })
      .catch((error) => {
        this.setState({ loaderImage: false, TasksCss: '' });
      });
  }

  updateOnsetting = (data) =>{
    axios
    .put(   
      sitedata.data.path + "/UserProfile/updateSetting",
      {
        calendar_filter: data,
        user_id: this.props.stateLoginValueAim.user._id,
        user_profile_id: this.props.stateLoginValueAim.user.profile_id,
      },
      commonHeader(this.props.stateLoginValueAim.token)
    )
    .then((response) => {
      this.getSetting();
    });
  }

  getSetting = () => {
    axios.get(sitedata.data.path + '/UserProfile/updateSetting',
    commonHeader(this.props.stateLoginValueAim.token))
    .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
            this.props.Settings(responce.data.data);
        }   
    })
}

  clearFilter = () => {
    this.setState({ loaderImage: true });
    this.setState({ TasksCss: '', userFilter: '', selectSpec2: '', selectWard: '', selectRoom: '', openFil: false, allWards: '', wardList: [], roomList: [] });
    this.updateOnsetting({})
    this.getTaskData('clear');
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
          // speciality: this.state.searchDetails.specialty,
          // longitude: longitude,
          // Latitude: Latitude,
          doctor_id: this.state.selectDocData && this.state.selectDocData.value
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
            var datas = item?.data?.houses?.length > 0 && item.data.houses.filter((item) => item.value === this.props.House?.value)
            if (datas && datas.length > 0) {
              NewArray.push(item);
            }
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

  handleDocSelect = (data) => {
    this.setState({ selectDocData: data })
  }

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


  render() {

    let translate = getLanguage(this.props.stateLanguageType);
    let { Appointmentiscanceled, add_task, AddAppointment,
      select_spec, Taskstatus, clear_all_filters, applyFilters, capab_Doctors, select,
      Patient, speciality, Ward, Room,
      slct_time_slot, Iamhere,
      holiday,
      Filterbypatient,
      NotAvailable,
      FilterbyWard,
      FilterbyRoom,
      Search_Select,
      select_specility,
      Details,
      Questions,
      cancel,
      book,
      office_visit,
      cancel_apointmnt,
      km_range,
      we_r_showing_speciality,
      plz_write_short_explnation,
      short_msg,
      appointment,
      search_within,
      Video,
      Office,
      type,
      Contact,
      Services,
      latest_info,
      see_avlbl_date,
      location_of_srvc, Tasks,
      this_way_can_instntly_list_of_specility,
      find_apointment, Appointments, filters,
      consultancy_cstm_calnder,
      vdo_call, All, Open, done,
      justapply,applyFiltersandsave,
      allow_location_access, FilterbySpeciality, plz_select_patient } =
      translate;
      

    const { tabvalue, patNotSelected,
      pastappointment,
      selectedOption,
      specialityData,
      subspecialityData,
      allDocData,
      PatientData,
      date,
      doc_select,
      appointType,
      apointDay, doctorsData,
      selectDocData, selectedPatient } = this.state;

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
        {this.state.loaderImage && <Loader />}
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
                            <Tab label={All} className="appTabIner" />
                            <Tab label={Appointments} className="appTabIner" />
                            <Tab label={Tasks} className="appTabIner" />
                          </Tabs>
                        </AppBar>

                      </Grid>

                      <Grid item xs={12} sm={5} md={6}>
                        <Grid className="appontTask apponTaskhos">
                          <Button onClick={this.handleAllowAccess}>{AddAppointment}</Button>
                          <Button onClick={() => { this.moveTask() }}>{add_task}</Button>
                        </Grid>

                      </Grid>
                    </Grid>
                    <div className="todaySrch filterAtright">
                      <a className={this.state.TasksCss + " barViewnw"} onClick={this.handleOpenFil}>
                        <img src={this.state.TasksCss === 'filterApply' ? require("assets/virtual_images/sort-active.png") : require("assets/virtual_images/sort.png")} alt="" title="" />
                      </a>
                    </div>
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
                      <TabContainer>   
                        <Grid className="timeSchdul">
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
                          <a onClick={this.handleCloseFil}><img src={require('assets/images/close-search.svg')} alt="" title="" /></a>
                        </Grid>
                        <label>{filters}</label>
                      </Grid>
                      {/* <Grid item xs={12} sm={7} md={6}> */}
                      <AppBar position="static" className="appTabs modAppTabs">
                        <Tabs
                          value={tabvalue}
                          onChange={this.handleChangeTab}
                        >
                          <Tab label={All} className="appTabIner" />
                          <Tab label={Appointments} className="appTabIner" />
                          <Tab label={Tasks} className="appTabIner" />
                        </Tabs>
                      </AppBar>

                      {/* </Grid> */}

                      <Grid className="fltrForm">
                        {/* <Grid className="fltrInput">
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
                        </Grid> */}
                        {this.state.showField && (<>
                          <Grid className="fltrInput">
                            <label>{speciality}</label>
                            <Grid className="addInput">
                              <Select
                                onChange={(e) => this.onFieldChange2(e)}
                                options={this.state.specilaityList}
                                name="specialty_name"
                                value={this.state.selectSpec2}
                                placeholder={FilterbySpeciality}
                                className="addStafSelect"
                                isMulti={false}
                                isSearchable={true} />
                            </Grid>
                          </Grid>
                          {this.state.wardList && this.state.wardList.length > 0 &&
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
                                  isSearchable={true} />
                              </Grid>
                            </Grid>
                          }
{/* 
                          {this.state.roomList && this.state.roomList.length > 0 &&
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
                                  isSearchable={true} />
                              </Grid>
                            </Grid>
                          } */}

                          <Grid className="fltrInput">
                            <Grid><label>{Taskstatus}</label></Grid>
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
                                label={Open}
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
                                label={done}
                              />
                            </Grid>

                          </Grid>
                        </>)}
                      </Grid>
                      <Grid className="aplyFltr">
                        <Grid className="aplyLft"><label className="filterCursor" onClick={this.clearFilter}>{clear_all_filters}</label></Grid>
                        <Grid className="aplyRght1"><Button onClick={() => this.applyFilter(false)}>{justapply}</Button></Grid>
                        <Grid className="aplyRght1"><Button onClick={() => this.applyFilter(true)}>{applyFiltersandsave}</Button></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Modal>
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
                <ArrangeAppoint getTaskData={() => this.getTaskData()} handleCloseAllowAccess={()=>{ this.handleCloseAllowAccess()}} openAllowAccess={this.state.openAllowAccess} />
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
  })((Index)
  )
);