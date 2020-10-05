import React, { Component, Children, useState } from 'react';
// import { usePopper } from 'react-popper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/DoctorLeftMenu/mobile';
import sitedata from '../../../sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { LanguageFetchReducer } from './../../actions';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import CalendarToolbar from "./../../Components/CalendarToolbar/index.js";
import Modal from '@material-ui/core/Modal';
import DatePicker from 'react-date-picker';
import { getImage } from './../../Components/BasicMethod/index';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import translationEN from '../../../translations/en_json_proofread_13072020.json'
import * as translationDE from '../../../translations/de';
import * as translationSP from '../../../translations/sp.json';
import * as translationCH from '../../../translations/ch';
import * as translationPT from '../../../translations/pt';
import * as translationRS from '../../../translations/rs';
import * as translationNL from '../../../translations/nl';
import * as translationSW from '../../../translations/sw';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
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
            openSlot: false,
            selectedOption: null,
            myEventsList: [],
            DetialData: {},
            newAppoinments: [],
            appoinmentSelected: {},
            appioinmentTimes: [],
            clashtime: false,
            UpDataDetails: {},
            DaysforPractices: {},
            onlineAppointments: {},
            suggestTime:[],
            current_selected:''
        };
    }

    componentDidMount() {
        this.getUserData()
        this.getEvent();
        this.getAppoinment()
    }

    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });
            const types = ['private_appointments', 'days_for_practices', 'online_appointment']
            types.map(opoinmentData => {

                if (response.data.data[opoinmentData]) {
                    let Appointments = response.data.data[opoinmentData][0];
                    if (Appointments) {
                        if (Appointments.holidays) {
                            this.setState({
                                holidayAppointment: {
                                    holidays_start: Appointments.holidays_start !== '' ? Appointments.holidays_start : new Date(),
                                    holidays_end: Appointments.holidays_end !== '' ? Appointments.holidays_end : new Date(),
                                    holidays: Appointments.holidays
                                }
                            })
                        }

                        if (opoinmentData == types[0]) {
                            let workingDays = []
                            days.map(weekday => {
                                if (Appointments[weekday + '_start'] && Appointments[weekday + '_start'] !== '') {
                                    workingDays.push(weekday)
                                }
                            })
                            this.setState({
                                UpDataDetails: { workingDays: workingDays, duration_of_timeslots: Appointments.duration_of_timeslots, breakslot: { breakslot: Appointments.breakslot, breakslot_end: Appointments.breakslot_end, breakslot_start: Appointments.breakslot_start } }
                            })
                        }

                        if (opoinmentData == types[1]) {
                            let workingDays = []
                            days.map(weekday => {
                                if (Appointments[weekday + '_start'] && Appointments[weekday + '_start'] !== '') {
                                    workingDays.push(weekday)
                                }
                            })
                            this.setState({
                                DaysforPractices: { workingDays: workingDays, duration_of_timeslots: Appointments.duration_of_timeslots, breakslot: { breakslot: Appointments.breakslot, breakslot_end: Appointments.breakslot_end, breakslot_start: Appointments.breakslot_start } }
                            })
                        }

                        if (opoinmentData == types[2]) {
                            let workingDays = []
                            days.map(weekday => {
                                if (Appointments[weekday + '_start'] && Appointments[weekday + '_start'] !== '') {
                                    workingDays.push(weekday)
                                }
                            })
                            this.setState({
                                onlineAppointments: { workingDays: workingDays, duration_of_timeslots: Appointments.duration_of_timeslots, breakslot: { breakslot: Appointments.breakslot, breakslot_end: Appointments.breakslot_end, breakslot_start: Appointments.breakslot_start } }
                            })
                        }
                    }
                }
            })


        })
    }

    getEvent = () => {
        var finaldata = [];
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/User/AppointmentByDate',
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
                    let appioinmentTimes = []
                    response.data.data && response.data.data.length > 0 && response.data.data.map((data, index) => {
                        axios.get(sitedata.data.path + '/User/AppointOfDate/' + data._id,
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
                                        if (d1.status !== 'free') {
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
                                            this[`${indexout}_ref`] = React.createRef();
                                            appioinmentTimes.push({
                                                start: new Date(da1).valueOf(),
                                                end: new Date(da2).valueOf()
                                            })
                                            finaldata.push({ id: index, title: d1.patient_info.first_name + " " + d1.patient_info.last_name, start: new Date(da1), end: new Date(da2), indexout: indexout, fulldata: [d1] })
                                        }
                                    })
                                }
                            }).then(() => {
                                indexout++;
                                this.setState({
                                    myEventsList: finaldata,
                                    appioinmentTimes: appioinmentTimes
                                })
                            })
                    })

                }
                this.setState({ loaderImage: false })

            })

    }

    getAppoinment = () => {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/UpcomingAppintmentDoc',
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("response", response)
                let newAppoint = []
                response.data.data.map(d1 => {
                    console.log("d1", d1)
                    if (d1.start_time) {
                        var t1 = d1.start_time.split(":");
                    }
                    if (d1.end_time) {
                        var t2 = d1.end_time.split(":");
                    }
                    let da1 = new Date(moment(d1.date, 'MM-DD-YYYY').format('YYYY-MM-DD'));
                    let da2 = new Date(moment(d1.date, 'MM-DD-YYYY').format('YYYY-MM-DD'));
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
                    d1['starttimeValueof'] = new Date(da1).valueOf()
                    d1['endtimeValueof'] = new Date(da2).valueOf()
                    newAppoint.push(d1)
                })

                if (response && response.data.hassuccessed) this.setState({ newAppoinments: newAppoint })
            })
    }

    updateAppointment(status, id, data) {
        this.setState({ openSlot: false })
        var Delete_Document, click_on_YES_document;
        // if (this.props.stateLanguageType === 'de') {
        //     Delete_Document = translationDE.text.Delete_Document;
        //     click_on_YES_document = translationDE.text.click_on_YES_document;
        // }else {
        //     Delete_Document = translationEN.text.Delete_Document;
        //     click_on_YES_document = translationEN.text.click_on_YES_document;
        // }
        confirmAlert({
            //title: Delete_Document,
            message: 'Are you sure you want to book this appoinment?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => this.updateAppointmentDetails(status, id, data)
                },
                {
                    label: 'NO',
                }
            ]
        })
    }

    updateAppointmentDetails(status, id, data) {
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/GetAppointment/' + id, {
            status: status,
            email: data.patient_info.email,
            lan: this.props.stateLanguageType,
            docProfile: {
                first_name: this.props.stateLoginValueAim.user.first_name ? this.props.stateLoginValueAim.user.first_name : '',
                last_name: this.props.stateLoginValueAim.user.last_name ? this.props.stateLoginValueAim.user.last_name : ''
            }
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.getAppoinment();
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    handleOpenSlot = (data) => {
        const { appioinmentTimes } = this.state;
        let clashtime = false;
        appioinmentTimes.map(datatime => {
            if ((datatime.start <= data.starttimeValueof && datatime.end >= data.starttimeValueof) || (datatime.start <= data.endtimeValueof && datatime.end >= data.endtimeValueof)) {
                clashtime = true;
            }
        })
        this.setState({ openSlot: true, appoinmentSelected: data, clashtime: clashtime, suggesteddate: new Date(), suggestTime:[] });
    };
    handleCloseSlot = () => {
        this.setState({ openSlot: false, clashtime: false });
    };

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
                    event: data.event,
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
                        <p style={{ backgroundColor: 'none', fontSize: 11, margin: 0, lineHeight: '12px' }}> {moment(data.event.start).format('hh:mm') + '-' + moment(data.event.end).format('hh:mm')} </p>
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
        console.log("event", event)
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
                    className: 'tooltip-container',
                    closeOnReferenceHidden: false
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
                        <Grid className="meetBoxCntnt margin-remove">
                            <Grid className="meetCourse">
                                <Grid className="meetCloseBtn">
                                    <a><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></a>
                                    <a onClick={this.handleCloseMeet}><img src={require('../../../assets/images/closefancy.png')} alt="" title="" /></a>
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
                                    <p>{data.annotations}</p>
                                </Grid>
                            </Grid>
                        </Grid>

                    ))}

            </div>
        );
    }

    onChange = (date) => {
        this.setState({ suggesteddate: date })
        const { appioinmentTimes, appoinmentSelected, onlineAppointments } = this.state;
        let clashtime = false;
        if(appoinmentSelected.appointment_type =='online_appointment'){
            let weeknumber = moment(date).day();
            if(onlineAppointments.workingDays.includes(days[weeknumber+1])){

            }
            else {
                this.setState({suggestTime:[]})
            }
        }
        appioinmentTimes.map(datatime => {
            if ((datatime.start <= appoinmentSelected.starttimeValueof && datatime.end >= appoinmentSelected.starttimeValueof) || (datatime.start <= appoinmentSelected.endtimeValueof && datatime.end >= appoinmentSelected.endtimeValueof)) {
                clashtime = true;
            }
        })
        this.setState({ clashtime: clashtime, suggesteddate: new Date(),suggestTime:[] });
    
        console.log("date", date)
    }

    render() {
        const { appoinmentSelected, myEventsList, newAppoinments, clashtime } = this.state;
        const { stateLoginValueAim, Doctorsetget } = this.props;
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
        const {holiday} = translate
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'doctor') {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="appointment" />
                                <LeftMenuMobile isNotShow={true} currentPage="appointment" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={11}>
                                    <Grid className="appointArang">
                                        <Grid className="apointAdd">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={12}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <h1>Appointments</h1>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="arng_addEntrynw">
                                                                <a>+ Arrange an appointment</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {newAppoinments && newAppoinments.length > 0 && <Grid className="newRequestMain">
                                            <h4>New Requests</h4>
                                            <Grid className="newRequestUpr">
                                                {newAppoinments && newAppoinments.map((data) => (
                                                    <Grid className="newRequest" onClick={() => this.handleOpenSlot(data)}>
                                                        <Grid className="newReqInfo">
                                                            <a><img src={data.patient_info && data.patient_info.profile_image ? getImage(data.patient_info.profile_image, this.state.images) : require('../../../assets/images/dr1.jpg')} alt="" title="" />{data.patient_info.first_name + ' ' + data.patient_info.last_name}</a>
                                                        </Grid>
                                                        <Grid className="newReqInfo">
                                                            <a>{data.appointment_type == 'online_appointment' && <img src={require('../../../assets/images/video-call.svg')} alt="" title="" />}
                                                                {data.appointment_type == 'practice_appointment' && <img src={require('../../../assets/images/dates.png')} alt="" title="" />}
                                                                {data.appointment_type == 'private_appointment' && <img src={require('../../../assets/images/ShapeCopy21.svg')} alt="" title="" />}

                                                                <label>{moment(data.date, 'MM-DD-YYYY').format('MMMM DD, YYYY')}</label> <span>{data.start_time} - {data.end_time}</span></a>
                                                        </Grid>
                                                    </Grid>))}
                                            </Grid>
                                        </Grid>}

                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.openSlot}
                                            onClose={this.handleCloseSlot}>
                                            <Grid className="slotBoxCntnt">
                                                {clashtime && <Grid className="timSltCal">
                                                    <p><img src={require('../../../assets/images/important-info.svg')} alt="" title="" />
                                                        Time slot is already booked on your calendar
                                                  </p></Grid>}
                                                <Grid className="slotCourse">
                                                    <a onClick={this.handleCloseSlot} className="clsSltCal">
                                                        <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                    </a>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} alignItems="center" justify="center">
                                                            <Grid className="jmInfo">
                                                                <a><img src={appoinmentSelected.patient_info && appoinmentSelected.patient_info.profile_image ? getImage(appoinmentSelected.patient_info.profile_image, this.state.images) : require('../../../assets/images/dr1.jpg')} alt="" title="" />{appoinmentSelected.patient_info ? (appoinmentSelected.patient_info.first_name + ' ' + appoinmentSelected.patient_info.last_name) : ''}</a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6} alignItems="center" justify="center">
                                                            <Grid className="jmInfoVdo">
                                                                <a>{appoinmentSelected.appointment_type == 'online_appointment' && <img src={require('../../../assets/images/video-call.svg')} alt="" title="" />}
                                                                    {appoinmentSelected.appointment_type == 'practice_appointment' && <img src={require('../../../assets/images/dates.png')} alt="" title="" />}
                                                                    {appoinmentSelected.appointment_type == 'private_appointment' && <img src={require('../../../assets/images/ShapeCopy21.svg')} alt="" title="" />}
                                                                    {appoinmentSelected.appointment_type == 'practice_appointment' ? 'Consultancy Appointment' : (appoinmentSelected.appointment_type == 'online_appointment' ? 'Video call' : 'Office visit')}</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="clear"></Grid>
                                                    <Grid className="augDate">
                                                        <p><label>{moment(appoinmentSelected.date, 'MM-DD-YYYY').format('MMMM DD, YYYY')}</label> <span>{appoinmentSelected.start_time} - {appoinmentSelected.end_time}</span></p>
                                                    </Grid>
                                                    <Grid className="detailQues">
                                                        <label>Details / Questions</label>
                                                        <p>{appoinmentSelected.annotations}</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="detailQuesSub">
                                                    <input type="submit" value="Book appointment" onClick={() => { this.updateAppointment('accept', appoinmentSelected._id, appoinmentSelected) }} />
                                                    <span>or</span>
                                                </Grid>
                                                <Grid className="slotTimDat">
                                                    <Grid container direction="row" className="addBirthSlot">
                                                        <Grid item xs={6} md={6}>
                                                            <Grid><label>Date of appoinments</label></Grid>
                                                            <Grid>
                                                                <DatePicker
                                                                    onChange={this.onChange}
                                                                    value={this.state.suggesteddate}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        {this.state.suggesteddate && <Grid item xs={6} md={6}>
                                                            <Grid><label>Select a time</label></Grid>
                                                            <Grid className="selTimeAM">
                                                                {this.state.suggestTime && this.state.suggestTime.length > 0 ? this.state.suggestTime.map((data, iA) => {
                                                                    return (
                                                                        <Grid>
                                                                                <a className={this.state.currentSelected && this.state.currentSelected === iA ? 'current_selected' : ''} >
                                                                                    {data.start + ' - ' + data.end}
                                                                                </a>
                                                                        </Grid>
                                                                    );
                                                                }) : this.state.appointDate !== undefined ?
                                                                        <Grid><span>{holiday}!</span></Grid> : ''
                                                                }
                                                            </Grid>
                                                        </Grid>}
                                                    </Grid>
                                                    <Grid className="SuggNwTim">
                                                        <input type="submit" value="Suggest new time" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Model setup */}

                                        <Grid className="getCalapoint">
                                            <Grid className="getCalBnr">
                                                <Calendar
                                                    localizer={localizer}
                                                    events={myEventsList}
                                                    startAccessor="start"
                                                    endAccessor="end"
                                                    popup
                                                    // popupOffset={{ x: 30, y: 20 }}
                                                    style={{ minHeight: 900 }}

                                                    step={60}
                                                    onShowMore={(events, date) => console.log("events", events)}
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
                                                />

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
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));