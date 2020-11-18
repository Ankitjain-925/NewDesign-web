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
import { authy } from './../../Login/authy.js';
import { getImage } from './../../Components/BasicMethod/index';
import { Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import * as translationEN from '../../../translations/en.json'
import * as translationDE from '../../../translations/de';
import * as translationSP from '../../../translations/sp.json';
import * as translationCH from '../../../translations/ch';
import * as translationPT from '../../../translations/pt';
import * as translationRS from '../../../translations/rs';
import * as translationNL from '../../../translations/nl';
import * as translationSW from '../../../translations/sw';
import Loader from './../../Components/Loader/index.js';
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const types = ['private_appointmentss', 'days_for_practices', 'online_appointment'];
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
            suggestTime: [],
            current_selected: '',
            currentSelected: -1
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
                                    workingDays.push({ value: weekday, start: Appointments[weekday + '_start'], end: Appointments[weekday + '_end'] })
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
                                    workingDays.push({ value: weekday, start: Appointments[weekday + '_start'], end: Appointments[weekday + '_end'] })
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
                                    workingDays.push({ value: weekday, start: Appointments[weekday + '_start'], end: Appointments[weekday + '_end'] })
                                }
                            })
                            this.setState({
                                onlineAppointments: { workingDays: workingDays, duration_of_timeslots: Appointments.duration_of_timeslots, breakslot: { breakslot: Appointments.breakslot, breakslot_end: Appointments.breakslot_end, breakslot_start: Appointments.breakslot_start } }
                            })
                        }
                    }
                }
            })
            setTimeout(()=>{ this.setState({ loaderImage: false })}, 3000);


        })
    }
    GetTime=(start_time)=>{
        let da1 = new Date();
        if (start_time) {
            var t1 = start_time.split(":");
        }
        
        if (t1 && t1.length > 0) {
            da1.setHours(t1[0]);
            da1.setMinutes(t1[1]);
        }
        else {
            da1.setHours('00');
            da1.setMinutes('00');
        }
        if(this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format && this.props.settings.setting.time_format==='12')
        {
            return moment(da1).format('hh:mm a')
        }
        else{
            return moment(da1).format('HH:mm')
        }
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
                setTimeout(()=>{ this.setState({ loaderImage: false })}, 3000);

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
         
                let newAppoint = []
                if (response.data.hassuccessed) {
                    response.data.data.map(d1 => {
                     
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
                }

                if (response && response.data.hassuccessed) this.setState({ newAppoinments: newAppoint })
            })
    }

    updateAppointment(status, id, data) {
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
        let { r_u_sure_want_book_appointment, yes, no } = translate;
        
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
            message: r_u_sure_want_book_appointment,
            buttons: [
                {
                    label: yes,
                    onClick: () => this.updateAppointmentDetails(status, id, data)
                },
                {
                    label: no,
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
            this.getEvent();
        }).catch((error) => {
     
        });
    }

    suggestingTime = () => {
        const { currentSelected, appoinmentSelected, suggesteddate, suggestTime } = this.state;
        if(currentSelected!==-1){
            let timeslot = suggestTime[currentSelected];
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/SuggestTimeSlot', {
            email: appoinmentSelected.patient_info.email,
            lan: this.props.stateLanguageType,
            _id: appoinmentSelected._id,
            oldSchedule: moment(new Date(appoinmentSelected.date)).format('MM-DD-YYYY') + " " + appoinmentSelected.start_time + "-" + appoinmentSelected.end_time,
            timeslot: moment(new Date(suggesteddate)).format('MM-DD-YYYY') + " " + timeslot.start + "-" + timeslot.end,
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
            if (response.data.hassuccessed) {
                this.setState({ openSlot: false, suggestTime: [], suggesteddate: new Date(), appoinmentSelected: {} })
            }
            this.getAppoinment();
        })
        }
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    handleOpenSlot = (data) => {
        const { appioinmentTimes } = this.state;
        let temptimes = [];
        let date = new Date(moment(new Date(data.date), 'M-DD-YYYY').format())
        let suggestTime = [];
        let dateFormat = moment(date).format('DD/MM/YYYY');
        let statemanger = 'onlineAppointments';

        let clashtime = false;
        appioinmentTimes.map(datatime => {
            if ((datatime.start <= data.starttimeValueof && datatime.end >= data.starttimeValueof) || (datatime.start <= data.endtimeValueof && datatime.end >= data.endtimeValueof)) {
                clashtime = true;
            }
        })


        if (data.appointment_type == types[2]) {
            statemanger = 'onlineAppointments'
        }
        else if (data.appointment_type == types[0]) {
            statemanger = 'UpDataDetails'
        } else {
            statemanger = 'DaysforPractices'
        }

        let weeknumber = moment(date).day();
        var appiInd = -1;
        if (this.state[statemanger].workingDays) appiInd = this.state[statemanger].workingDays.findIndex(person => person.value.includes(days[weeknumber - 1]))
        if (appiInd !== -1) {
            let start = this.state[statemanger].workingDays[appiInd].start;
            let end = this.state[statemanger].workingDays[appiInd].end;
            var time = moment(start, 'H:mm');
            while (time.add(this.state[statemanger].duration_of_timeslots, 'minutes').valueOf() < moment(end, 'H:mm').valueOf()) {

                var firsttime = moment(time, 'H:mm').add(-parseInt(this.state[statemanger].duration_of_timeslots) + 1, 'minutes');
                var endtime = moment(firsttime, 'H:mm').add(this.state[statemanger].duration_of_timeslots, 'minutes');
                let dataq = { start: firsttime.format('H:mm'), end: endtime.format('H:mm') }
                temptimes.push(dataq)
            }
        }

        temptimes.map(tiems => {
            let clashtimes = false
            appioinmentTimes.map(datatime => {
                if ((datatime.start <= moment(dateFormat + ' ' + tiems.start, 'DD/MM/YYYY H:mm').valueOf() && datatime.end > moment(dateFormat + ' ' + tiems.start, 'DD/MM/YYYY H:mm').valueOf()) || (datatime.start < moment(dateFormat + ' ' + tiems.end, 'DD/MM/YYYY H:mm').valueOf() && datatime.end >= moment(dateFormat + ' ' + tiems.end, 'DD/MM/YYYY H:mm').valueOf())) {
                    clashtimes = true;
                }

            })
            if (!clashtimes) {
                suggestTime.push(tiems)
            }
        })

        this.setState({ openSlot: true, appoinmentSelected: data, clashtime: clashtime, suggesteddate: date, suggestTime: suggestTime, currentSelected: -1 });
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
                        <p className="calendar-cont"> {data.event.title} </p>
                        <p className="calendar-date"> {moment(data.event.start).format('hh:mm') + '-' + moment(data.event.end).format('hh:mm')} </p>
                    </span>}
            </TooltipTrigger>
        )
    }

    EventDaysComponent = (data) => {
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
                        <p style={{ backgroundColor: 'none', fontSize: 11, margin: 0, fontWeight: 700 }}> {data.event.title}:  {moment(data.event.start).format('hh:mm A') + '-' + moment(data.event.end).format('hh:mm A')}</p>
                        {/* <p style={{ backgroundColor: 'none', fontSize: 11, margin: 0, lineHeight: '12px' }}> {moment(data.event.start).format('hh:mm') + '-' + moment(data.event.end).format('hh:mm')} </p> */}
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
                setTimeout(()=>{ this.setState({ loaderImage: false })}, 3000);
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
        let { DetailsQuestions } = translate
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
                        <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "darkTheme meetBoxCntnt margin-remove" : "meetBoxCntnt margin-remove"}>
                            <Grid className="meetCourse">
                                <Grid className="meetCloseBtn">
                                    {/* <a><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></a> */}
                                    {/* <a><img src={require('../../../assets/images/closefancy.png')} alt="" title="" /></a> */}
                                </Grid>
                                <Grid className="meetVdo">
                                    <Grid className="meetVdoLft">
                                        {data.appointment_type == 'online_appointment' && <img src={require('../../../assets/images/video-call.svg')} alt="" title="" />}
                                        {data.appointment_type == 'practice_days' && <img src={require('../../../assets/images/dates.png')} alt="" title="" />}
                                        {data.appointment_type == 'private_appointments' && <img src={require('../../../assets/images/ShapeCopy21.svg')} alt="" title="" />}
                                        <span>{data.appointment_type == 'practice_days' ? 'Consultancy Appointment' : (data.appointment_type == 'online_appointment' ? 'Video call' : 'Office visit')}</span>
                                    </Grid>
                                    <Grid className="meetVdoRght">
                                        <p>{moment(new Date(data.date), 'MM-DD-YYYY').format('D MMM')}, {this.GetTime(data.start_time)}</p>
                                    </Grid>
                                </Grid>
                                <Grid className="meetDetail">
                                    <h1>{event.title}</h1>
                                    <span>{DetailsQuestions}</span>
                                    <p>{data.annotations}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}

            </div>
        );
    }

    onChange = (date) => {

        console.log('here2', this.state.onlineAppointments, this.state.UpDataDetails, this.state.DaysforPractices)
        
        const { appioinmentTimes, appoinmentSelected, onlineAppointments, UpDataDetails, DaysforPractices } = this.state;
        let temptimes = [];
        let suggestTime = [];
        let dateFormat = date;
        let statemanger = 'onlineAppointments';

        if (appoinmentSelected.appointment_type == types[2]) {
            statemanger = 'onlineAppointments'
        }
        else if (appoinmentSelected.appointment_type == types[0]) {
            statemanger = 'UpDataDetails'
        } else {
            statemanger = 'DaysforPractices'
        }

        let weeknumber = moment(date).day();
        var appiInd = -1
        if (this.state[statemanger].workingDays) appiInd = this.state[statemanger].workingDays.findIndex(person => person.value.includes(days[weeknumber - 1]))
        console.log('appiInd', appiInd, days[weeknumber-1])
        if (appiInd !== -1) {
            console.log('heree45')
            let start = this.state[statemanger].workingDays[appiInd].start;
            let end = this.state[statemanger].workingDays[appiInd].end;
            var time = moment(start, 'H:mm');
            while (time.add(this.state[statemanger].duration_of_timeslots, 'minutes').valueOf() < moment(end, 'H:mm').valueOf()) {

                var firsttime = moment(time, 'H:mm').add(-parseInt(this.state[statemanger].duration_of_timeslots) + 1, 'minutes');
                var endtime = moment(firsttime, 'H:mm').add(this.state[statemanger].duration_of_timeslots, 'minutes');
                let dataq = { start: firsttime.format('H:mm'), end: endtime.format('H:mm') }
                temptimes.push(dataq)
               
            }
        }
        else {
            //   suggestTime:[]
        }
        console.log('temptimes2', temptimes)
        temptimes.map(tiems => {
            let clashtime = false
            appioinmentTimes.map(datatime => {
                if ((datatime.start <= moment(dateFormat + ' ' + tiems.start, 'DD/MM/YYYY H:mm').valueOf() && datatime.end > moment(dateFormat + ' ' + tiems.start, 'DD/MM/YYYY H:mm').valueOf()) || (datatime.start < moment(dateFormat + ' ' + tiems.end, 'DD/MM/YYYY H:mm').valueOf() && datatime.end >= moment(dateFormat + ' ' + tiems.end, 'DD/MM/YYYY H:mm').valueOf())) {
                    clashtime = true;
                }

            })
            if (!clashtime) {
                suggestTime.push(tiems)
            }
        })
        

        this.setState({ suggesteddate: date, suggestTime: suggestTime , currentSelected: -1},
            ()=>{this.setState({ openSlot: true })});
        // this.setState({ suggesteddate: date })
    }

    selectTimeSlot = (index) => {

        this.setState({ currentSelected: index })
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
        let { holiday, appointments, new_rqst, time_slot_alredy_booke_calender, office_visit, vdo_call, Details,
            suggest_new_time, Questions, or, slct_a_time, date_of_appointment, book_appointment } = translate


        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'doctor' || !this.props.verifyCode || !this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
                <Grid className="homeBgIner">
                {this.state.loaderImage && <Loader />}
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="appointment" />
                                <LeftMenuMobile isNotShow={true} currentPage="appointment" />
                                <Notification />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={11}>
                                    <Grid className="appointArang">
                                        <Grid className="apointAdd">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={12}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6}>
                                                            <h1>{appointments}</h1>
                                                        </Grid>
                                                       
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {newAppoinments && newAppoinments.length > 0 && <Grid className="newRequestMain">
                                            <h4>{new_rqst}</h4>
                                            <Grid className="newRequestUpr">
                                                {newAppoinments && newAppoinments.map((data) => (
                                                    <Grid className="newRequest" onClick={() => this.handleOpenSlot(data)}>
                                                        <Grid className="newReqInfo">
                                                            <a><img src={data.patient_info && data.patient_info.profile_image ? getImage(data.patient_info.profile_image, this.state.images) : require('../../../assets/images/dr1.jpg')} alt="" title="" />{data.patient_info.first_name + ' ' + data.patient_info.last_name}</a>
                                                        </Grid>
                                                        <Grid className="newReqInfo">
                                                            <a>{data.appointment_type == 'online_appointment' && <img src={require('../../../assets/images/video-call.svg')} alt="" title="" />}
                                                                {data.appointment_type == 'practice_days' && <img src={require('../../../assets/images/dates.png')} alt="" title="" />}
                                                                {data.appointment_type == 'private_appointments' && <img src={require('../../../assets/images/ShapeCopy21.svg')} alt="" title="" />}

                                                                <label>{moment(new Date(data.date), 'MM-DD-YYYY').format('MMMM DD, YYYY')}</label> <span>{this.GetTime(data.start_time)} - {this.GetTime(data.end_time)}</span></a>
                                                        </Grid>
                                                    </Grid>))}
                                            </Grid>
                                        </Grid>}

                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.openSlot}
                                            onClose={this.handleCloseSlot}
                                            className={this.props.settings&&this.props.settings.setting && this.props.settings.setting.mode &&this.props.settings.setting.mode === 'dark' ?"darkTheme":""}
                                            >
                                            <Grid className="slotBoxCntnt">
                                                {clashtime && <Grid className="timSltCal">
                                                    <p><img src={require('../../../assets/images/important-info.svg')} alt="" title="" />
                                                        {time_slot_alredy_booke_calender}
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
                                                                    {appoinmentSelected.appointment_type == 'practice_days' && <img src={require('../../../assets/images/dates.png')} alt="" title="" />}
                                                                    {appoinmentSelected.appointment_type == 'private_appointments' && <img src={require('../../../assets/images/ShapeCopy21.svg')} alt="" title="" />}
                                                                    {appoinmentSelected.appointment_type == 'practice_days' ? 'Consultancy Appointment' : (appoinmentSelected.appointment_type == 'online_appointment' ? vdo_call : office_visit)}</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="clear"></Grid>
                                                    <Grid className="augDate">
                                                        <p><label>{moment(new Date(appoinmentSelected.date), 'MM-DD-YYYY').format('MMMM DD, YYYY')}</label> <span>{this.GetTime(appoinmentSelected.start_time)} - {this.GetTime(appoinmentSelected.end_time)}</span></p>
                                                    </Grid>
                                                    <Grid className="detailQues">
                                                        <label>{Details} / {Questions}</label>
                                                        <p>{appoinmentSelected.annotations}</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="detailQuesSub">
                                                    <input type="submit" value={book_appointment} onClick={() => { this.updateAppointment('accept', appoinmentSelected._id, appoinmentSelected) }} />
                                                    <span>{or}</span>
                                                </Grid>
                                                <Grid className="slotTimDat">
                                                    <Grid container direction="row" className="addBirthSlot">
                                                        <Grid item xs={6} md={6}>
                                                            <Grid><label>{date_of_appointment}</label></Grid>
                                                            <Grid>
                                                                <DatePicker
                                                                    onChange={(e)=>this.onChange(e)}
                                                                    value={this.state.suggesteddate}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        {this.state.suggesteddate && <Grid item xs={6} md={6}>
                                                            <Grid><label>{slct_a_time}</label></Grid>
                                                            <Grid className="selTimeAM suggent-time scroll-hidden">
                                                                {this.state.suggestTime && this.state.suggestTime.length > 0 ? this.state.suggestTime.map((data, iA) => {
                                                                    return (
                                                                        <Grid>
                                                                            <a onClick={(e) => this.selectTimeSlot(iA)} className={this.state.currentSelected !== undefined && this.state.currentSelected === iA ? 'current_selected' : ''} >
                                                                                {moment(data.start, 'H:mm').format('hh:mm A') + ' - ' + moment(data.end, 'H:mm').format('hh:mm A')}
                                                                            </a>
                                                                        </Grid>
                                                                    );
                                                                }) : this.state.suggesteddate !== undefined ?
                                                                        <Grid><span>{holiday}!</span></Grid> : ''
                                                                }
                                                            </Grid>
                                                        </Grid>}
                                                    </Grid>
                                                    <Grid className={this.state.currentSelected !== undefined && this.state.currentSelected !== -1 ? 'detailQuesSub' : 'SuggNwTim'}>
                                                        <input type="submit" value={suggest_new_time} onClick={() => this.suggestingTime()} />
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
                                                    style={{ minHeight: 900 }}
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
                                                        week: { event: this.EventComponent },
                                                        day: { event: this.EventDaysComponent },
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
    const { verifyCode } = state.authy;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(Index));