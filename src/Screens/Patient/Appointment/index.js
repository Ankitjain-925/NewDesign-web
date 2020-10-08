import React, { Component, Children, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Modal from '@material-ui/core/Modal';
import Select from 'react-select';
import Calendar2 from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Geocode from "react-geocode";
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { LanguageFetchReducer } from './../../actions';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import CalendarToolbar from "./../../Components/CalendarToolbar/index.js";
import DatePicker from 'react-date-picker';
import { getDate, getImage, getSpec } from './../../Components/BasicMethod/index';
import { Redirect, Route } from 'react-router-dom';
import LeftMenu from "../../Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from './../../Components/Menus/PatientLeftMenu/mobile';
import sitedata from "../../../sitedata";
import Autocomplete from './Autocomplete';
import translationEN from '../../../translations/en_json_proofread_13072020.json'
import * as translationDE from '../../../translations/de';
import * as translationSP from '../../../translations/sp.json';
import * as translationCH from '../../../translations/ch';
import * as translationPT from '../../../translations/pt';
import * as translationRS from '../../../translations/rs';
import * as translationNL from '../../../translations/nl';
import * as translationSW from '../../../translations/sw';
import SPECIALITY from '../../../speciality'
import SUBSPECIALITY from '../../../subspeciality'
import Loader from './../../Components/Loader/index';

const CURRENT_DATE = moment().toDate();
const localizer = momentLocalizer(moment)


const modifiers = [
    {
        name: 'offset',
        enabled: true,
        options: {
            offset: [0, 4],
        },
    },
];

let MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myEventsList: [],
            DetialData: {},
            openDash: false,
            date: new Date(),
            openFancy: false,
            openAllowAccess: false,
            selectedOption: {},
            openAllowLoc: false,
            openApoint: false,
            openFancyVdo: false,
            searchDetails: {},
            appointmentData: {},
            successfull: false,
            UpDataDetails: [],
            video_call: true,
            office_visit: true,
            currentSelected: null,
            searchCity: null,
            pastappointment: false,
            show_id: false,
            show_type: 'contact',
            cancelappoint : {},
            cancelsuccess: false,
            message: '',
        };
    }

    componentDidMount() {
        this.getEvent();
        this.patientinfo();
        this.getSpecialities();
        this.getUpcomingAppointment();
        this.getPastAppointment();
    }

    //Show event on the calendar 
    getEvent = () => {
        var finaldata = [];
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/User/AppointmentByDate1',
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.hassuccessed) {
                    let indexout = 0
                    response.data.data && response.data.data.length > 0 && response.data.data.map((data, index) => {
                        axios.get(sitedata.data.path + '/User/AppointOfDate1/' + data._id,
                            {
                                headers: {
                                    'token': user_token,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then((response) => {
                                if (response.data.hassuccessed) {

                                    response.data.data && response.data.data.length > 0 && response.data.data.map((d1, index) => {
                                        if (d1.start_time) {
                                            var t1 = d1.start_time.split(":");
                                        }
                                        if (d1.end_time) {
                                            var t2 = d1.end_time.split(":");
                                        }
                                        let da1 = new Date(data._id);
                                        let da2 = new Date(data._id);
                                        if (t1 && t1.length > 0) {
                                            da1.setHours(t1[0]);
                                            da1.setMinutes(t1[1]);
                                        }
                                        else {
                                            da1.setHours('00');
                                            da1.setMinutes('00');
                                        }
                                        if (t2 && t2.length > 0) {
                                            da2.setHours(t2[0]);
                                            da2.setMinutes(t2[1]);
                                        }
                                        else {
                                            da2.setHours('00');
                                            da2.setMinutes('00');
                                        }
                                        this[`${indexout}_ref`] = React.createRef()
                                        finaldata.push({ id: index, title: d1.docProfile.first_name + " " + d1.docProfile.last_name, start: new Date(da1), end: new Date(da2), indexout: indexout, fulldata: [d1] })
                                    })
                                }
                            }).then(() => {
                                indexout++;
                                this.setState({ myEventsList: finaldata, })
                            })
                    })

                }
                this.setState({ loaderImage: false })

            })

    }

getUpcomingAppointment() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/UpcomingAppintmentPat', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var upcomingData= response.data.data && response.data.data.length>0 && response.data.data.filter((data)=>data.status!=='cancel' && data.status!=='remove')
            this.setState({ upcomingAppointment: upcomingData, loaderImage: false })
        })
    }

    getPastAppointment = () => {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/PastAppintmentPat', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ pastAppointment: response.data.data, loaderImage: false })
        })
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({ clat: parseFloat( position.coords.latitude) })
                this.setState({ clng:  parseFloat(position.coords.longitude) })
                Geocode.setApiKey("AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4");
                Geocode.enableDebug();
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(response => {
                    const address = response.results[0].formatted_address;
                    this.setState({ MycurrentLocationName: address })
                }, error => {
                    console.error(error);
                });
            }
            )
        }
    }

    handleOpenFancyVdo = (i, type, data) => {
        this.setState({ openFancyVdo: true, appointmentData: data, doc_select: i, appointType: type });
        setTimeout(this.onChange, 5000)
        // this.onChange()
    };
    handleCloseFancyVdo = () => {
        this.setState({ openFancyVdo: false, appointDate: [], appointmentData: {}, currentSelected: null });
        Object.keys(this.state.allDocData).map((index, i) => {

        })
    };

    //For patient Info..
    patientinfo() {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ personalinfo: response.data.data, loaderImage: false })
            })
    }

    // Get Speciality DATA
    getSpecialities() {
        let specialityData = [], subspecialityData = []
        SPECIALITY.speciality && SPECIALITY.speciality.english && SPECIALITY.speciality.english.map(speciality => {
            specialityData.push(speciality)
        })
        SUBSPECIALITY.subspeciality && SUBSPECIALITY.subspeciality.english && SUBSPECIALITY.subspeciality.english.map(subspeciality => {
            subspecialityData.push(subspeciality)
        })
        this.setState({
            specialityData: specialityData,
            subspecialityData: subspecialityData
        });
    }

    // findAppointment
    findAppointment = (tab, doc_select, apointType, apointDay, iA) => {
        apointType = apointType.replace(/['"]+/g, '')
        this.setState({
            currentSelected: iA,
            findDoc: tab, selectedDoc: this.state.allDocData[doc_select],
            mypoint: {
                start: this.state.allDocData[doc_select] && this.state.allDocData[doc_select][apointType][0] && this.state.allDocData[doc_select][apointType][0][apointDay][iA],
                end: this.state.allDocData[doc_select] && this.state.allDocData[doc_select][apointType][0] && this.state.allDocData[doc_select][apointType][0][apointDay][iA + 1],
                type: apointType
            }
        })
    }


    questionDetails = (e) => {
        const state = this.state.UpDataDetails;
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
    }

    bookAppointment =() =>{
        var insurance_no = this.state.personalinfo.insurance && this.state.personalinfo.insurance.length > 0 && this.state.personalinfo.insurance[0] && this.state.personalinfo.insurance[0].insurance_number ? this.state.personalinfo.insurance[0].insurance_number : '';
        this.setState({ loaderImage: true });
        const user_token = this.props.stateLoginValueAim.token;
        axios.post(sitedata.data.path + '/User/appointment', {
            patient: this.props.stateLoginValueAim.user._id,
            doctor_id: this.state.selectedDoc.data && this.state.selectedDoc.data._id,
            insurance: this.state.personalinfo.insurance[0].insurance_number,
            date: this.state.selectedDate,
            start_time: this.state.mypoint.start,
            end_time: this.state.mypoint.end,
            appointment_type: this.state.mypoint.type,
            insurance_number: insurance_no,
            annotations: this.state.UpDataDetails.details,
            status: 'free',
            patient_info: {
                patient_id: this.props.stateLoginValueAim.user.profile_id,
                first_name: this.props.stateLoginValueAim.user.first_name,
                last_name: this.props.stateLoginValueAim.user.last_name,
                email: this.props.stateLoginValueAim.user.email,
                birthday: this.props.stateLoginValueAim.user.birthday,
                profile_image: this.props.stateLoginValueAim.user.image,
                bucket: this.props.stateLoginValueAim.user.bucket,
            },
            lan: this.props.stateLanguageType,
            docProfile: {
                patient_id: this.state.selectedDoc.data && this.state.selectedDoc.data.profile_id,
                first_name: this.state.selectedDoc.data && this.state.selectedDoc.data.first_name,
                last_name: this.state.selectedDoc.data && this.state.selectedDoc.data.last_name,
                email: this.state.selectedDoc.data && this.state.selectedDoc.data.email,
                birthday: this.state.selectedDoc.data && this.state.selectedDoc.data.birthday,
                profile_image: this.state.selectedDoc.data && this.state.selectedDoc.data.image,
                speciality: this.state.selectedDoc.data && this.state.selectedDoc.data.speciality,
                subspeciality: this.state.selectedDoc.data && this.state.selectedDoc.data.subspeciality
            }
        })
            .then((responce) => {
                this.setState({ loaderImage: false });
                if (responce.data.hassuccessed === true) {
                    this.setState({ successfull: true, openAllowAccess: false, openAllowLoc: false,  openFancyVdo: false, currentSelected: {}  })
                    this.getUpcomingAppointment()
                    setTimeout(
                        function () {
                            this.setState({ successfull: false, });
                        }
                            .bind(this),
                        5000
                    );
                }
            })
    }

    // find appointment by location or speciality
    getlocation() {
        let radius, Latitude, longitude
        if (this.state.searchDetails && this.state.searchDetails.radius) {
            radius = this.state.searchDetails.radius + '000'
        } else {
            radius = 20 + '000'
        }
        if (!this.state.mLatitude) {
            longitude = this.state.clng
            Latitude = this.state.clat
        } else if (this.state.mLatitude) {
            Latitude = this.state.mLatitude
            longitude = this.state.mlongitude
        } else {

        }
        // if (radius && Latitude && longitude) {
        axios.get(sitedata.data.path + '/UserProfile/getLocation/' + radius, {
            params: {
                speciality: this.state.searchDetails.specialty,
                longitude: longitude,
                Latitude: Latitude
            }
        })
            .then((responce) => {
                let markerArray = [];
                let selectedListArray = [];
                let NewArray = [];
            
                responce.data.data && responce.data.data.length > 0 && responce.data.data.map((item, index) => {
                    if (item.data && item.data.image) {
                        var find = item.data && item.data.image && item.data.image
                        if (find) {
                            find = find.split('.com/')[1]
                            axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find,)
                                .then((response) => {
                                    if (response.data.hassuccessed) {
                                        item.data.new_image = response.data.data
                                    }
                                })
                        }
                    }
                    NewArray.push(item)
                })
                this.setState({ allDocData: NewArray })
                this.setState({ mapMarkers: markerArray });
                this.setState({ selectedListArray: selectedListArray });
            })
        // }
    }
    // Search by City
    showPlaceDetails=(place)=> {
        place = place.geometry.location
        this.setState({ place });
        this.setState({ mLatitude: parseFloat(place.lat()) });
        this.setState({ mlongitude: parseFloat(place.lng()) });
        Geocode.enableDebug();
        Geocode.fromLatLng(this.state.mLatitude, this.state.mlongitude).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState({ MycurrentLocationName: address })
            },
            error => {
                console.error(error);
            }
        );
    }

    apointmentType=(event)=> {
        if (event.target.name == "Video") {
            this.setState({ video_call: this.state.video_call == true ? false : true })
        } else if (event.target.name == "Office") {
            this.setState({ office_visit: this.state.office_visit == true ? false : true })
        }
    }

    openPastApointment() {
        window.scrollTo({
            top: 0
        })
        this.setState({ pastappointment: this.state.pastappointment ? false : true })
    }

    handleOpenApoint = (apoint) => {
        this.setState({ openApoint: true, cancelappoint: apoint._id });
    };

    // for cancel Appointment
   CancelAppoint = ()=>{
        let user_token = this.props.stateLoginValueAim.token
        this.setState({ loaderImage: true });
        axios.put(sitedata.data.path + '/UserProfile/GetAppointment/'+this.state.cancelappoint,{
            status : 'cancel',
            message : this.state.message,
        }, {headers:{
            'token': user_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}).then((response) =>{
            this.setState({cancelsuccess: true, loaderImage: false, openApoint: false})
            setTimeout(()=>{ this.setState({cancelsuccess: false}) }, 5000)
            this.getUpcomingAppointment();
        }).catch((error) => {});
    }

    handleCloseApoint = () => {
        this.setState({ openApoint: false });
    };
    setRadius = event => {
        let searchDetails = this.state.searchDetails
        if (event.target.name == "range") {
            searchDetails["radius"] = event.target.value
        }
        this.setState({ searchDetails: searchDetails });
    };
    handleChangeSelect = selectedOption => {
        let searchDetails = this.state.searchDetails
        searchDetails["specialty"] = selectedOption.value
        this.setState({ selectedOption: selectedOption, searchDetails: searchDetails });
    };
    handleAllowLoc = () => {
        this.getlocation()
        this.setState({ openAllowAccess: false, openAllowLoc: true, selectedOption: {} },
            ()=>{
                setTimeout(()=>{
                    this.setState({show_type: 'contact'})
                }, 2000)
               
            });
        
    };
    handleCloseAllowLoc = () => {
        this.setState({ openAllowLoc: false });
    };
    handleOpenFancy = () => {
        this.setState({ openFancy: true });
    };
    handleCloseFancy = () => {
        this.setState({ openFancy: false });
    };
    handleAllowAccess = () => {
        this.getGeoLocation();
        this.setState({ openAllowAccess: true });
    };
    handleCloseAllowAccess = () => {
        this.setState({ openAllowAccess: false });
    };
    handleOpenDash = () => {
        this.setState({ openDash: true });
    };
    handleCloseDash = () => {
        this.setState({ openDash: false });
    };
    onChange = (date) => {
        let day_num
        let Month, date1
        if (date !== undefined && date) {
            day_num = date.getDay()
            Month = date.getMonth() + 1;
            date1 = Month + '-' + date.getDate() + '-' + date.getFullYear()
        } else {
            date = new Date()
            day_num = date.getDay()
            Month = date.getMonth() + 1;
            date1 = Month + '-' + date.getDate() + '-' + date.getFullYear()
        }
        let days
        switch (day_num) {
            case 1:
                days = "monday"
                break;
            case 2:
                days = "tuseday"
                break;
            case 3:
                days = "wednesday"
                break;
            case 4:
                days = "thursday"
                break;
            case 5:
                days = "friday"
                break;
            case 6:
                days = "saturday"
                break;
            case 0:
                days = "sunday"
                break;
        }
        let appointmentData = this.state.appointmentData
        let appointDate
        if (appointmentData) {
            Object.entries(appointmentData).map(([key, value]) => {
                if (key == days) {
                    appointDate = value
                }
            })
        }
        this.setState({ appointDate: appointDate, apointDay: days, selectedDate: date1 })
    }

    setAppointDate(date) {
        date = new Date(date)
        let m = date.getMonth() + 1
        let month
        switch (m) {
            case 1:
                month = "Jan"
                break;
            case 2:
                month = "Feb"
                break;
            case 3:
                month = "Mar"
                break;
            case 4:
                month = "Apr"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "Jun"
                break;
            case 7:
                month = "Jul"
                break;
            case 8:
                month = "Aug"
                break;
            case 9:
                month = "Sep"
                break;
            case 10:
                month = "Oct"
                break;
            case 11:
                month = "Nov"
                break;
            case 12:
                month = "Dec"
                break;
        }
        let day = date.getDate()
        let returnDate = day + ' ' + month
        return returnDate
    }

    EventComponent = (data) => {
        return (
            <TooltipTrigger
                placement="right"
                trigger="click"
                tooltip={datas => this.Tooltip({
                    getTooltipProps: datas.getTooltipProps,
                    getArrowProps: datas.getArrowProps,
                    tooltipRef: datas.tooltipRef,
                    arrowRef: datas.arrowRef,
                    placement: datas.placement,
                    event: data.event
                })}
                modifiers={modifiers}
            >
                { ({
                    getTriggerProps, triggerRef
                }) =>
                    <span {...getTriggerProps({
                        ref: triggerRef,
                        className: 'trigger'
                        /* your props here */
                    })}
                    // onClick={() => this.CallEvents(data.event)}
                    >
                        <p style={{ backgroundColor: 'none', fontSize: 11, margin: 0, fontWeight: 700 }}> {data.event.title} </p>
                        <p style={{ backgroundColor: 'none', fontSize: 11, margin: 0 }}> {moment(data.event.start).format('hh:mm') + '-' + moment(data.event.end).format('hh:mm')} </p>
                    </span>}
            </TooltipTrigger>
        )
    }



    DateCellCompnent = ({ children, value }) => {
        return React.cloneElement(Children.only(children), {
            style: {
                ...children.style,
                // backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
            },
        })
    }

    CallEvents = (event) => {
        var user_token = this.props.stateLoginValueAim.token;
        let Month = event.start.getMonth() + 1;
        let date = Month + '-' + event.start.getDate() + '-' + event.start.getFullYear();
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/User/AppointOfDate/' + date,
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.hassuccessed) {
                    this.setState({ SelectDate: date, DetialData: response.data.data })
                }
                this.setState({ loaderImage: false })
            })

    }


    MyCustomHeader = ({ label }) => (
        <div>
            CUSTOM HEADER:
            <div>{label}</div>
            <MyOtherNestedComponent />
        </div>
    )


    Tooltip = ({
        getTooltipProps,
        getArrowProps,
        tooltipRef,
        arrowRef,
        placement,
        event
    }) => {
        return (
            <div
                {...getTooltipProps({
                    ref: tooltipRef,
                    className: 'tooltip-container'
                })}
            >
                <div
                    {...getArrowProps({
                        ref: arrowRef,
                        'data-placement': placement,
                        className: 'tooltip-arrow'
                    })}
                />

                {event && event.fulldata.length > 0 &&
                    event.fulldata.map((data, index) => (
                        <Grid className="meetBoxCntnt">
                            <Grid className="meetCourse">
                                <Grid className="meetCloseBtn">
                                    {/* <a><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></a> */}
                                    {/* <a onClick={this.handleCloseMeet}><img src={require('../../../assets/images/closefancy.png')} alt="" title="" /></a> */}
                                </Grid>
                                <Grid className="meetVdo">
                                    <Grid className="meetVdoLft">
                                        {data.appointment_type == 'online_appointment' && <img src={require('../../../assets/images/video-call.svg')} alt="" title="" />}
                                        {data.appointment_type == 'practice_appointment' && <img src={require('../../../assets/images/dates.png')} alt="" title="" />}
                                        {data.appointment_type == 'private_appointment' && <img src={require('../../../assets/images/ShapeCopy21.svg')} alt="" title="" />}
                                        <span>{data.appointment_type == 'practice_appointment' ? 'Consultancy Appointment' : (data.appointment_type == 'online_appointment' ? 'Video call' : 'Office visit')}</span>
                                    </Grid>
                                    <Grid className="meetVdoRght">
                                        <p>{moment(data.date, 'MM-DD-YYYY').format('D MMM')}, {data.start_time}</p>
                                    </Grid>
                                </Grid>
                                <Grid className="meetDetail">
                                    <h1>{event.title}</h1>
                                    <span>Details / Questions</span>
                                    <p>{event.fulldata && event.fulldata.length>0 && event.fulldata[0].annotations}</p>
                                </Grid>
                            </Grid>
                        </Grid>

                    ))}

            </div>
        );
    }

    render() {
        const {  myEventsList } = this.state;
        const { pastappointment, selectedOption, specialityData, subspecialityData, allDocData, date, doc_select, appointType, apointDay } = this.state;
        let translate;
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { slct_time_slot, holiday, Details, past_apointment, Questions, cancel, book, appointment_booked, upcming_apointment, office_visit, cancel_apointmnt, hide_past_appointment, show_past_apointment,
            plz_write_short_explnation, short_msg, appointments, appointment, arrng_apointmnt, today, sync_ur_calander, speciality, search_within, Video, Office, type,
            Contact, Services, latest_info, see_avlbl_date, location_of_srvc, this_way_can_instntly_list_of_specility, find_apointment, consultancy_cstm_calnder, vdo_call, allow_location_access, profile_info, profile, information, ID, pin, QR_code, done, Change, edit_id_pin, edit, and, is, changed, profile_id_taken, profile_id_greater_then_5,
        } = translate;
        const { stateLoginValueAim } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }
        var myMarker = require('../../../assets/images/loc2.png');
        var theirMarker = require('../../../assets/images/loc.png');
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
            <Grid className="homeBgIner">
            {this.state.loaderImage && <Loader />}
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">
                            <LeftMenu isNotShow={true} currentPage="appointment" />
                            <LeftMenuMobile isNotShow={true} currentPage="appointment" />
                            {/* Video Model */}

                            <Modal
                                    open={this.state.openFancyVdo}
                                    onClose={this.handleCloseFancyVdo}>
                                    <Grid className="slotBoxMain">
                                        <Grid className="slotBoxCourse">
                                            <a onClick={this.handleCloseFancyVdo} className="timSlotClose">
                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                            </a>
                                            <Grid className="selCalenderUpr">
                                                <Grid className="selCalender">
                                                    <Calendar2 onChange={this.onChange} value={this.state.date} />
                                                </Grid>
                                                <Grid className="selTimeSlot" >
                                                    <Grid><label>{slct_time_slot}</label></Grid>
                                                    <Grid className="selTimeAM">
                                                        {this.state.appointDate && this.state.appointDate.length > 0 ? this.state.appointDate.map((data, iA) => {
                                                            return (
                                                                <Grid>
                                                                    {this.state.appointDate[iA + 1] && this.state.appointDate[iA + 1] !== 'undefined' &&
                                                                        <a className={this.state.currentSelected && this.state.currentSelected === iA ? 'current_selected' : ''} onClick={() => { this.findAppointment('tab3', doc_select, appointType, apointDay, iA) }}>
                                                                            {this.state.appointDate[iA] + ' - ' + this.state.appointDate[iA + 1]}
                                                                        </a>}
                                                                </Grid>
                                                            );
                                                        }) : this.state.appointDate !== undefined ?
                                                                <Grid><span>{holiday}!</span></Grid> : ''
                                                        }
                                                    </Grid>
                                                  
                                                </Grid>
                                                <Grid className="delQues">
                                                    <Grid><label>{Details} / {Questions}</label></Grid>
                                                    <Grid><textarea name="details" onClick={this.questionDetails}></textarea></Grid>
                                                    <Grid className="delQuesBook">
                                                        <a onClick={this.bookAppointment}>{book}</a>
                                                        <a onClick={() => { this.setState({ openFancyVdo: false }) }}>{cancel}</a></Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Modal>
                                {/* End of Video Model */}
{/* {cancel_apointmnt} */}
<Modal
                                                open={this.state.openApoint}
                                                onClose={this.handleCloseApoint}>
                                                <Grid className="apontBoxCntnt">
                                                    <Grid className="apontCourse">
                                                        <Grid className="apontCloseBtn">
                                                            <a onClick={this.handleCloseApoint}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>{cancel_apointmnt}</label></Grid>
                                                        <p>{plz_write_short_explnation}</p>
                                                    </Grid>
                                                    <Grid className="apontDragCntnt">
                                                        <Grid>
                                                            <Grid><label>{short_msg}</label></Grid>
                                                            <Grid><textarea name="message" onChange={(e)=>{this.setState({message: e.target.value})}}></textarea></Grid>
                                                            <Grid><input type="submit" value={cancel_apointmnt} onClick={this.CancelAppoint}/></Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal>
                                            {/* End of {cancel_apointmnt} */}

                                             {/* Allow Location Access */}
                                             <Modal
                                                                    open={this.state.openAllowLoc}
                                                                    onClose={this.handleCloseAllowLoc}>
                                                                    <div className="alowLocAces">
                                                                        <div className="accessCourse">
                                                                            <div className="handleAccessBtn">
                                                                                <a onClick={this.handleCloseAllowLoc}>
                                                                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                                </a>
                                                                            </div>
                                                                            <Grid container direction="row" spacing={2} className="srchAccessLoc">
                                                                                <Grid item xs={12} md={3}>
                                                                                    <Grid><label>{speciality}</label></Grid>
                                                                                    <Select
                                                                                        value={selectedOption}
                                                                                        onChange={this.handleChangeSelect}
                                                                                        options={specialityData}
                                                                                        placeholder="Select specialty"
                                                                                        className="sel_specialty"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3} className="locat_srvc">
                                                                                    <Grid><label>{location_of_srvc}</label></Grid>
                                                                                    {/* <input type="text" placeholder="Search for city" /> */}
                                                                                    <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
                                                                                    <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={2} className="srchKm">
                                                                                    <Grid><label>{search_within}</label></Grid>
                                                                                    <input type="text" name="range" value={this.state.searchDetails && this.state.searchDetails.radius ? this.state.searchDetails.radius : ''} onChange={this.setRadius} />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} className="apointType">
                                                                                    <Grid><label>{appointment} {type}</label></Grid>
                                                                                    <FormControlLabel control={this.state.video_call ? <Checkbox checked onClick={this.apointmentType} name="Video" /> : <Checkbox onClick={this.apointmentType} name="Video" />} label={Video} />
                                                                                    <FormControlLabel control={this.state.office_visit ? <Checkbox checked name="Office" onClick={this.apointmentType} /> : <Checkbox name="Office" onClick={this.apointmentType} />} label={Office} />
                                                                                </Grid>
                                                                            </Grid>
                                                                            <div className="showSpcial"><p><img src={require('../../../assets/images/location.png')} alt="" title="" />We are showing you specialists near “{this.state.MycurrentLocationName}” in {this.state.searchDetails.radius ? this.state.searchDetails.radius : '10'}km range</p></div>
                                                                        </div>
                                                                        <div style={{ textAlign: "center" }} className="arng_addEntrynw">
                                                                            <a onClick={this.handleAllowLoc}>{find_apointment}</a>
                                                                        </div>
                                                                        {/* New Design */}
                                                                        <div className="allowAvailList">
                                                                            {allDocData && allDocData.length > 0 && allDocData.map((doc, i) => (
                                                                                <div className="allowAvailListIner">
                                                                                    <Grid container direction="row" spacing={1}>
                                                                                        <Grid item xs={12} md={3}>
                                                                                            <Grid className="spclistDr">
                                                                                                {doc.data.new_image
                                                                                                    ? <img className="doctor_pic" src={doc.data.new_image} alt="" title="" />
                                                                                                    : <img className="doctor_pic" src={require('../../../assets/images/avatar.png')} alt="" title="" />}
                                                                                                <a>
                                                                                                    {/* <img src={doc.data.image} alt="" title="" /> */}
                                                                                                    {doc.data && doc.data.first_name && doc.data.first_name} {doc.data && doc.data.last_name && doc.data.last_name} ({doc.data && doc.data.title && doc.data.title})
                                                                                                </a>
                                                                                            </Grid>
                                                                                            <Grid className="nuroDr">
                                                                                                <label>{doc.data && doc.data.speciality && doc.data.speciality.length > 0 && getSpec(doc.data.speciality)}</label>
                                                                                                <p>{doc.data && doc.data.subspeciality && doc.data.subspeciality.length > 0 && getSpec(doc.data.subspeciality)}</p>
                                                                                            </Grid>

                                                                                            {/* <Grid className="nuroDr">
                                                                                                <label>NEUROLOGY</label>
                                                                                                <p>Neurodegerenative diseases</p>
                                                                                            </Grid> */}
                                                                                        </Grid>
                                                                                        <Grid item xs={12} md={5}>
                                                                                            <Grid className="srvcTagsCntnt">
                                                                                                <Grid className="srvcTags"> 
                                                                                                    <a className={this.state.show_type==='contact' && "currentTab"} onClick={()=>{this.setState({show_type: 'contact'})}}>{Contact}</a> 
                                                                                                    <a className={this.state.show_type==='service' && "currentTab"} onClick={()=>{this.setState({show_type: 'service'})}}>{Services}</a> 
                                                                                                    <a className={this.state.show_type==='information' && "currentTab"} onClick={()=>{this.setState({show_type: 'information'})}}>{latest_info}</a> 
                                                                                                </Grid>
                                                                                                {this.state.show_type === 'contact' && <Grid className="srvcTagsLoc">
                                                                                                    <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.city && doc.data.city}</a>
                                                                                                    <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.mobile && doc.data.mobile}</a>
                                                                                                    <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.email && doc.data.email}</a>
                                                                                                    <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.language && doc.data.language.length > 0 && doc.data.language.join(", ")}</a>
                                                                                                </Grid>}
                                                                                                {this.state.show_type === 'service' && <Grid className="srvcTagsLoc">
                                                                                                    <a>{doc.data && doc.data.weoffer_text && doc.data.weoffer_text}</a>
                                                                                                </Grid>}
                                                                                                {this.state.show_type === 'information' && <Grid className="srvcTagsLoc">
                                                                                                    <a>{doc.data && doc.data.latest_info && <span dangerouslySetInnerHTML={{ __html: doc.data.latest_info }} />}</a>
                                                                                                </Grid>} 
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                        <Grid item xs={12} md={4}>
                                                                                            <Grid className="avlablDates">
                                                                                                <h3>{see_avlbl_date}:</h3>
                                                                                                <Grid>
                                                                                                    {this.state.video_call &&
                                                                                                        <a onClick={() => this.handleOpenFancyVdo(i, "online_appointment", doc.online_appointment[0])}><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />{vdo_call}</a>
                                                                                                    }
                                                                                                    {this.state.office_visit &&
                                                                                                        <a onClick={() => this.handleOpenFancyVdo(i, "appointments", doc.appointments[0])}><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />{office_visit}</a>
                                                                                                    }
                                                                                                    <a onClick={() => this.handleOpenFancyVdo(i, "practice_days", doc.practice_days[0])} className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder}</a>
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
                                 <Grid item xs={12} md={3}>
                                    {pastappointment && pastappointment == true ?
                                        <Grid className="apointUpcom">
                                            <h4>{past_apointment}</h4>
                                            {this.state.pastAppointment && this.state.pastAppointment.length > 0 && this.state.pastAppointment.map(apoint => (
                                                <Grid className="officeVst">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} className="officeVstLft"><label>{apoint.Appointdate && this.setAppointDate(apoint.Appointdate)}, {apoint.start_time}</label></Grid>
                                                        <Grid item xs={6} md={6} className="officeVstRght">
                                                            {apoint.appointment_type == "appointments" ? <a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" /> {office_visit} </a> :
                                                                apoint.appointment_type == "online_appointment" ? <a><img src={require('../../../assets/images/video-call.svg')} alt="" title="" /> {vdo_call} </a> :
                                                                    <a><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder} </a>}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="showSubject">
                                                        <Grid container direction="row">
                                                            <Grid item xs={6} md={6} className="officeVstLft nuroDr">
                                                                <h3>{apoint.docProfile && apoint.docProfile.speciality && getSpec(apoint.docProfile.speciality)}</h3>
                                                                <p>{apoint.docProfile && apoint.docProfile.subspeciality && getSpec(apoint.docProfile.subspeciality) }</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />{apoint.docProfile && `${apoint.docProfile.first_name} ${apoint.docProfile.last_name}`}</a></Grid>
                                                        {/* <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid> */}
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Grid className="shwAppoints">
                                                <p><a onClick={this.openPastApointment.bind(this)}>{hide_past_appointment}</a></p>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Grid className="apointUpcom">
                                            <h4>{upcming_apointment}</h4>
                                            {this.state.upcomingAppointment && this.state.upcomingAppointment.length > 0 && this.state.upcomingAppointment.map(apoint => (
                                                <Grid className="officeVst">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} className="officeVstLft"><label>{apoint.Appointdate && this.setAppointDate(apoint.Appointdate)}, {apoint.start_time}</label></Grid>
                                                        <Grid item xs={6} md={6} className="officeVstRght">
                                                            {apoint.appointment_type == "appointments" ? <a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" /> {office_visit} </a> :
                                                                apoint.appointment_type == "online_appointment" ? <a><img src={require('../../../assets/images/video-call.svg')} alt="" title="" /> {vdo_call} </a> :
                                                                    <a><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder} </a>}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="showSubject">
                                                        <Grid container direction="row">
                                                            <Grid item xs={6} md={6} className="officeVstLft nuroDr">
                                                                <h3>{apoint.docProfile && apoint.docProfile.speciality &&  getSpec(apoint.docProfile.speciality)}</h3>
                                                                <p>{apoint.docProfile && apoint.docProfile.subspeciality &&  getSpec(apoint.docProfile.subspeciality)}</p>
                                                            </Grid>

                                                            <Grid item xs={6} md={6} className="officeVstRght">
                                                                <a className="showDetail">
                                                                    {apoint.status === "free" && <img src={require('../../../assets/images/threedots.jpg')} alt="" title="" />}
                                                                    <Grid className="cancelAppoint">
                                                                        <a onClick={()=>{this.handleOpenApoint(apoint)}}><img src={require('../../../assets/images/cancelAppoint.jpg')} alt="" title="" />{cancel_apointmnt}</a>
                                                                    </Grid>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />{apoint.docProfile && `${apoint.docProfile.first_name} ${apoint.docProfile.last_name}`}</a></Grid>
                                                        {/* <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid> */}
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Grid className="shwAppoints">
                                                <p><a onClick={this.openPastApointment.bind(this)}>{show_past_apointment}</a></p>
                                                {/* <p><a onClick={}>{cancel_apointmnt}</a></p> */}
                                            </Grid>

                                            {/* {cancel_apointmnt} */}
                                            {/* <Modal
                                                open={this.state.openApoint}
                                                onClose={this.handleCloseApoint}>
                                                <Grid className="apontBoxCntnt">
                                                    <Grid className="apontCourse">
                                                        <Grid className="apontCloseBtn">
                                                            <a onClick={this.handleCloseApoint}>
                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                            </a>
                                                        </Grid>
                                                        <Grid><label>{cancel_apointmnt}</label></Grid>
                                                        <p>{plz_write_short_explnation}</p>
                                                    </Grid>
                                                    <Grid className="apontDragCntnt">
                                                        <Grid>
                                                            <Grid><label>{short_msg}</label></Grid>
                                                            <Grid><textarea name="message" onChange={(e)=>{this.setState({message: e.target.value})}}></textarea></Grid>
                                                            <Grid><input type="submit" value={cancel_apointmnt} onClick={this.CancelAppoint}/></Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Modal> */}
                                            {/* End of {cancel_apointmnt} */}

                                        </Grid>
                                    }
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Grid className="appointArang">
                                        <Grid className="apointAdd">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={12}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <h1>{appointments}</h1>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="arng_addEntrynw">
                                                                {/* <a onClick={this.handleOpenFancy}>+ Arrange an appointment</a> */}
                                                                <a onClick={this.handleAllowAccess}>+ {arrng_apointmnt}</a>
                                                            </Grid>
                                                            {this.state.successfull && <div className="success_message">{appointment_booked}</div>}
                                                            {this.state.cancelsuccess && <div className="success_message">Appointment is canceled</div>}
                                                          
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                           {/* Allow Location Access */}
                           <Modal
                                                                    open={this.state.openAllowAccess}
                                                                    onClose={this.handleCloseAllowAccess}>
                                                                    <div className="alowLocAces">
                                                                        <div className="accessCourse">
                                                                            <div className="handleAccessBtn">
                                                                                <a onClick={this.handleCloseAllowAccess}>
                                                                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                                </a>
                                                                            </div>
                                                                            <Grid container direction="row" spacing={2} className="srchAccessLoc">
                                                                                <Grid item xs={12} md={3}>
                                                                                    <Grid><label>{speciality}</label></Grid>
                                                                                    <Select
                                                                                        value={selectedOption}
                                                                                        onChange={this.handleChangeSelect}
                                                                                        options={specialityData}
                                                                                        placeholder="Select specialty"
                                                                                        className="sel_specialty"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3} className="locat_srvc">
                                                                                    <Grid><label>{location_of_srvc}</label></Grid>
                                                                                    {/* <input type="text" placeholder="Search for city" onPlaceChanged={this.showPlaceDetails.bind(this)} /> */}
                                                                                    {/* <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} /> */}
                                                                                    <Autocomplete stateLanguageType={this.props.stateLanguageType} onPlaceChanged={this.showPlaceDetails.bind(this)} />
                                                                                    <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={2} className="srchKm">
                                                                                    <Grid><label>{search_within}</label></Grid>
                                                                                    <input type="text" name="range" onChange={this.setRadius} value={this.state.searchDetails && this.state.searchDetails.radius ? this.state.searchDetails.radius : ''} />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} className="apointType">
                                                                                    <Grid><label>{appointment} {type}</label></Grid>
                                                                                    <FormControlLabel  control={this.state.video_call ? <Checkbox checked onClick={this.apointmentType} name="Video" /> : <Checkbox onClick={this.apointmentType} name="Video" />} label="Video" />
                                                                                    <FormControlLabel control={this.state.office_visit ? <Checkbox checked name="Office" onClick={this.apointmentType} /> : <Checkbox name="Office" onClick={this.apointmentType} />} label="Office" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </div>
                                                                                                <div className="showSpcial"><p><img src={require('../../../assets/images/location.png')} alt="" title="" />I am here :  “{this.state.MycurrentLocationName}"</p></div>
                                                                        <div className="allowAccessList">
                                                                        
                                                                        {this.state.clat || this.state.mLatitude ?
                                                                                <Map
                                                                                    className="MapStyle"
                                                                                    google={this.props.google}
                                                                                    center={this.state.mLatitude ? { lat: this.state.mLatitude, lng: this.state.mlongitude } : { lat: this.state.clat, lng: this.state.clng }}
                                                                                    initialCenter={{
                                                                                        lat: this.state.clat,
                                                                                        lng: this.state.clan
                                                                                    }}
                                                                                    zoom={10}

                                                                                >
                                                                                    <Marker
                                                                                        icon={{ url: myMarker, }}
                                                                                        title={this.state.MycurrentLocationName} name={this.state.MycurrentLocationName}
                                                                                        position={this.state.mLatitude ? { lat: this.state.mLatitude, lng: this.state.mlongitude } : { lat: this.state.clat, lng: this.state.clng }}
                                                                                    />
                                                                                </Map>
                                                                        :   <div>
                                                                                <div><a><img src={require('../../../assets/images/location.png')} alt="" title="" /></a></div>
                                                                                <h1>{allow_location_access}</h1>
                                                                                <p>{this_way_can_instntly_list_of_specility}</p>
                                                                            </div>}
                                                                            {/* <div><a><img src={require('../../../assets/images/location.png')} alt="" title="" /></a></div>
                                                                            <h1>{allow_location_access}</h1>
                                                                            <p>{this_way_can_instntly_list_of_specility}</p> */}
                                                                        </div>
                                                                        <div style={{ textAlign: "center" }} className="arng_addEntrynw">
                                                                            <a onClick={this.handleAllowLoc}>{find_apointment}</a>
                                                                        </div>
                                                                     
                                                                    </div>
                                                                </Modal>
                                                                {/* End of Allow Location Access */}
                                        <Grid className="getCalapoint">
                                            <Grid className="getCalBnr">
                                                
                                                {this.state.myEventsList && this.state.myEventsList.length>0 &&
                                                <Calendar
                                                    localizer={localizer}
                                                    events={myEventsList}
                                                    startAccessor="start"
                                                    endAccessor="end"
                                                    popup
                                                    popupOffset={{ x: 30, y: 20 }}
                                                    style={{ minHeight: 900 }}

                                                    step={60}
                                                    messages={{
                                                        showMore: total => (
                                                            <div
                                                                style={{ cursor: 'pointer' }}
                                                                onMouseOver={e => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                }}
                                                            >{`+${total} more`}
                                                            </div>
                                                        ),
                                                    }}
                                                    components={{
                                                        month: { event: this.EventComponent },
                                                        dateCellWrapper: this.DateCellCompnent,
                                                        toolbar: CalendarToolbar
                                                    }}
                                                />}

                                                {/* <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                                                    Popper element
                                                    <div ref={setArrowElement} style={styles.arrow} />
                                                </div> */}
                                                {/* <img src={require('../../../assets/images/uidoc.jpg')} alt="" title="" /> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(GoogleApiWrapper({
    apiKey: 'AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4'
})(Index)));