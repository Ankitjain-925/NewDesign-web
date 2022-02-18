import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Loader from "Screens/Components/Loader/index";
import "react-popper-tooltip/dist/styles.css";
import Modal from "@material-ui/core/Modal";
import { getPatientData } from "Screens/Components/CommonApi/index";
import { Speciality } from "Screens/Login/speciality.js";
import { getLanguage } from "translations/index"
import Select from "react-select";
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
import { GoogleApiWrapper } from "google-maps-react";
import Calendar2 from "react-calendar";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import SPECIALITY from "speciality";
import { subspeciality } from "subspeciality.js";
import { Button } from "@material-ui/core";
import { getProfessionalData } from '../PatientFlow/data'
import { getSpec } from "Screens/Components/BasicMethod/index";

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
      openAllowAccess: this.props.openAllowAccess,
      searchDetails: {},
      openAllowLoc: false,
      openApoint: false,
      cancelappoint: {},
      UpDataDetails: [],
      TasksCss: '',
      selectDocData: {},
      selectedPatient: {},
      patNotSelected:false,
      doctorsData: [],
      plistfilter: false,
      dlistfilter: false,
      filterUser: [],
      filterDocs: [],
      selectSpec3: ''
    };
  }

  componentDidMount() {
    this.getPatientData();
    this.getDoctorData();
    this.specailityList();
    this.getSpecialities();
  }

  getDoctorData = async ()=> {
   const professionals = await getProfessionalData(this.props.House.value, this.props.stateLoginValueAim.token, 'appoint')
    const doctorsData = [], doctorsData1 = [];
     // eslint-disable-next-line no-unused-expressions
    professionals?.professionalArray?.length > 0 && professionals?.professionalArray.map(function (data) {
      if (data.type === 'doctor') {
        doctorsData.push({ label: `${data.first_name} ${data.last_name}`, value: `${data._id}` })
        doctorsData1.push(data);
      }
    })
    this.setState({ doctorsData1: doctorsData1, doctorsData: doctorsData, filterDocs: doctorsData});
  }
  //on adding new data
componentDidUpdate = (prevProps) => {
    if (prevProps.openAllowAccess !== this.props.openAllowAccess ) {
      this.getPatientData();
      this.setState({ selectDocData: {}, selectedPatient: {}, openAllowAccess: this.props.openAllowAccess });
    }
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

  //open fiter modal
  handleCloseFil = () => {
    this.setState({ openFil: false })
  }

  // Get the Patient data
  getPatientData = async () => {
    this.setState({ loaderImage: true });
    let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value, 'arrangeappoint')
    if (response.isdata) {

      this.setState({ users1: response.PatientList1, filterUser :response.PatientList1, users: response.patientArray }, () => {
        if (this.props?.match?.params?.id) {
          let user =
            this.state.users1.length > 0 &&
            this.state.users1.filter(
              (user) =>
                user.value === this.props?.match?.params?.id
            );

          if (user?.length > 0) {
            this.selectPatient(user[0])
          }
        }
        this.setState({ loaderImage: false });
      });
    }
    else {
      this.setState({ loaderImage: false });
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
    let specialityList = this.props.speciality?.SPECIALITY && this.props.speciality?.SPECIALITY.length > 0 && this.props.speciality?.SPECIALITY.filter((item) => {
      return item && item._id == e.value;
    })
    let wardsFullData = specialityList && specialityList.length > 0 && specialityList[0].wards
    let wards_data = wardsFullData && wardsFullData.length > 0 && wardsFullData.map((item) => {
      return { label: item.ward_name, value: item._id }
    })
    this.setState({ selectSpec2: e, wardList: wards_data, allWards: wardsFullData })
  }

  //On Changing the specialty id
  onFieldChange3 = (e) => {
    this.setState({ selectSpec3: e })
  }

  UpdateDocList = ()=>{
    if(this.state.selectSpec3?.value){
      var filterDocs = this.state.doctorsData1.map((item) =>{ 
        var exstingOrnot =item?.speciality.some((iy)=> iy.value === this.state.selectSpec3.value)
        if(exstingOrnot){
          return item._id;
        }
      });
      var doctorsData = this.state.doctorsData.filter((item)=>filterDocs.includes(item.value)) 
      this.setState({filterDocs: doctorsData, dlistfilter: false })
    }
    else{
      this.setState({ dlistfilter: false, filterDocs: this.state.doctorsData })
    }
  }

  ClearDocList = ()=>{
    this.setState({selectSpec3: '', dlistfilter: false, filterDocs: this.state.doctorsData})
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
    this.setState({ selectWard: e })
  }

  UpdatePatientList = ()=>{
    if(this.state.selectSpec2?.value && this.state.selectWard?.value ){
      var filterUser1 = this.state.users.map((item) => {
        if(item.speciality?._id === this.state.selectSpec2.value && item.wards?._id === this.state.selectWard.value){
          return item.patient_id;
        }
      }).filter((item)=> item !== 'undefined')
      var filterUser = this.state.users1.filter((item) => filterUser1.includes(item?.value))
      this.setState({filterUser: filterUser, plistfilter: false })
    }
    else{
      this.setState({filterUser: this.state.users1, plistfilter: false })
    }
  }

  ClearPatientList = ()=>{
    this.setState({filterUser: this.state.users1, plistfilter: false, wardList: [], selectSpec2: '', selectWard: ''})
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


  handleCloseAllowAccess = () => {
    this.setState({ openAllowAccess: false, selectDocData: {} });
    this.props.handleCloseAllowAccess();
  };

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

  //For patient Info..
  patientinfo(user_id) {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
      .then((response) => {
        this.setState({ personalinfo: response.data.data, loaderImage: false });
      });
  }

  bookAppointment = () => {
    var insurance_no =
      this.state.personalinfo?.insurance &&
        this.state.personalinfo?.insurance.length > 0 &&
        this.state.personalinfo?.insurance[0] &&
        this.state.personalinfo?.insurance[0].insurance_number
        ? this.state.personalinfo?.insurance[0].insurance_number
        : "";
    this.setState({ loaderImage: true });
    const user_token = this.props.stateLoginValueAim.token;
    if (this.state.personalinfo &&
      this.state.personalinfo?.first_name !== "") {
      axios
        .post(sitedata.data.path + "/User/appointment", {
          patient: this.state.personalinfo?._id,
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
          house_id: this.props?.House?.value,
          patient_info: {
            patient_id: this.state.personalinfo?.profile_id,
            first_name: this.state.personalinfo?.first_name,
            last_name: this.state.personalinfo?.last_name,
            email: this.state.personalinfo?.email,
            birthday: this.state.personalinfo?.birthday,
            profile_image: this.state.personalinfo?.image,
            bucket: this.state.personalinfo?.bucket,
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
            this.props.getTaskData();
            this.getPatientData();
            setTimeout(
              function () {
                this.setState({ successfull: false });
              }.bind(this),
              5000
            );
          }
        });
    } else if (!this.state.personalinfo) {
      this.setState({ patNotSelected: true })
      setTimeout(() => {
        this.setState({ patNotSelected: false })
      }, 3000);
    }
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

  selectPatient = (e) => {
    this.patientinfo(e?.value);
    this.setState({ selectedPatient: e })
  }

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
        <>
    {this.state.loaderImage && <Loader />}
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
                  <div className="alowLocAces1">
                  <div className="alowLocAces1Inner">
                    <div className="accessCourse">
                      <div className="handleAccessBtn">
                        <a onClick={this.handleCloseAllowAccess}>
                          <img src={require("assets/images/close-search.svg")} alt="" title="" />
                        </a>
                      </div>
                      <Grid container direction="row" spacing={2}  className="srchAccessLoc">
                        <Grid item xs={12} md={4}  className="filterPatlist">
                        {this.state.plistfilter && (
                          <div className="filterPatlistInner">
                            <Grid>
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
                              <Grid>
                                <label>{Ward}</label>
                                <Grid className="addInput">
                                  <Select
                                    onChange={(e) => this.onWardChange(e)}
                                    options={this.state.wardList}
                                    name="ward_name"
                                    value={this.state.selectWard}
                                    placeholder={FilterbyWard}
                                    isMulti={false}
                                    isSearchable={true} />
                                </Grid>
                              </Grid>
                            }
                            <Button onClick={this.UpdatePatientList}>{"Ok"}</Button>
                            <Button onClick={this.ClearPatientList}>{"Cancel"}</Button>
                          </div>)}
                          <label>{Patient}
                              <img src={(this.state.selectSpec2 && this.state.selectWard) ? require("assets/virtual_images/sort-active.png") :require("assets/virtual_images/sort.png")} alt="" title="" onClick={()=>{this.setState({plistfilter: true})}} />
                          </label>
                          <Grid>
                            <Select
                              name="patient"
                              options={this.state.filterUser}
                              placeholder={Search_Select}
                              onChange={(e) => this.selectPatient(e)}
                              value={selectedPatient || ''}
                              className="addStafSelect"
                              isMulti={false}
                              isSearchable={true} />
                              
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} className="filterPatlist">
                        {this.state.dlistfilter && (
                          <div className="filterPatlistInner">
                            <Grid>
                                  <label>{speciality}</label>
                                  <Grid className="addInput">
                                    <Select
                                      onChange={(e) => this.onFieldChange3(e)}
                                      options={this.state.specialityData}
                                      name="specialty_name"
                                      value={this.state.selectSpec3}
                                      placeholder={FilterbySpeciality}
                                      className="addStafSelect"
                                      isMulti={false}
                                      isSearchable={true} />
                                  </Grid>
                            </Grid>
                            <Button onClick={this.UpdateDocList}>{"Ok"}</Button>
                            <Button onClick={this.ClearDocList}>{"Cancel"}</Button>
                          </div>)}
                          <label>{capab_Doctors}
                          <img src={(this.state.selectSpec3) ? require("assets/virtual_images/sort-active.png") :require("assets/virtual_images/sort.png")} alt="" title="" onClick={()=>{this.setState({dlistfilter: true})}} />
                          </label>
                          <Grid>
                          <Select
                            value={selectDocData || ''}
                            onChange={this.handleDocSelect}
                            options={this.state.filterDocs}
                            placeholder={`${select} ${capab_Doctors}`}
                            className="sel_specialty"
                          />
                          </Grid>
                        </Grid>
                        {/* <Grid item xs={12} md={3} className="apointType">
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
                        </Grid> */}
                      </Grid>
                    </div>
                 
                   
                    <div
                      style={{ textAlign: "center" }}
                      className="arng_addEntrynw">
                      <a onClick={this.handleAllowLoc}>
                        {find_apointment}</a>
                    </div>
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
                  <div className="alowLocAces1">
                  <div className="alowLocAces1Inner">
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
                              placeholder=""
                              onChange={(e) => this.onFieldChange1(e, "patient")}
                              value={selectedPatient || ''}
                              className="addStafSelect"
                              isMulti={false}
                              isSearchable={true} />
                              
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid><label>{capab_Doctors}</label></Grid>
                          <Select
                            value={selectDocData || ''}
                            onChange={this.handleDocSelect}
                            options={doctorsData}
                            placeholder={`${select} ${capab_Doctors}`}
                            className="sel_specialty"
                          />
                        </Grid>

                        {/* <Grid item xs={12} md={4} className="apointType">
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
                        </Grid> */}
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
                          <div key = {i} className="allowAvailListIner">
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
                                    {/* {this.state.video_call && ( */}
                                      {/* <a
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
                                      </a> */}
                                    {/* )} */}
                                    {/* {this.state.office_visit && ( */}
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
                                    {/* )}
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
                                    </a> */}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                    </div>
                    </div>
                    {/* End of New Design */}
                  </div>
                </Modal>
                {/* End of Allow Location Access */}

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
                      {patNotSelected && <p className="err_message">{plz_select_patient}</p>}
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
      </>
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