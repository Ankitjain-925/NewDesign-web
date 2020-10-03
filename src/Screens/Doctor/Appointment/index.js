import React, { Component, Children, useState } from 'react';
// import { usePopper } from 'react-popper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Select from 'react-select';
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
import { getDate, getImage } from './../../Components/BasicMethod/index';
import { Redirect, Route } from 'react-router-dom';

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
            appoinmentSelected: {}
        };
    }

    componentDidMount() {
        this.getEvent();
        this.getAppoinment()
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
                                        console.log("index", index)
                                        this[`${indexout}_ref`] = React.createRef()
                                        finaldata.push({ id: index, title: d1.patient_info.first_name + " " + d1.patient_info.last_name, start: new Date(da1), end: new Date(da2), indexout: indexout, fulldata: [d1] })
                                    })
                                }
                            }).then(() => {
                                console.log("finaldata", finaldata)
                                indexout++;
                                this.setState({
                                    myEventsList: finaldata,
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
                if (response && response.data.hassuccessed) this.setState({ newAppoinments: response.data.data })
            })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    handleOpenSlot = (data) => {
        this.setState({ openSlot: true, appoinmentSelected: data });
    };
    handleCloseSlot = () => {
        this.setState({ openSlot: false });
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
        console.log("tooltipRef", event)
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
                                    <p>Here we show the text the patient entered in the text field when arranging
                                an appointment. Or the appointment title if the doctor was the one who entered it.</p>
                                </Grid>
                            </Grid>
                        </Grid>

                    ))}

            </div>
        );
    }

    render() {
        const { appoinmentSelected, myEventsList, newAppoinments } = this.state;
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'doctor') {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
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
                                        {newAppoinments && newAppoinments.length>0 &&<Grid className="newRequestMain">
                                            <h4>New Requests</h4>
                                            <Grid className="newRequestUpr">
                                                {newAppoinments && newAppoinments.map((data) => (
                                                    <Grid className="newRequest" onClick={()=>this.handleOpenSlot(data)}>
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
                                                <Grid className="timSltCal">
                                                    <p><img src={require('../../../assets/images/important-info.svg')} alt="" title="" />
                                                        Time slot is already booked on your calendar
                                                  </p></Grid>
                                                <Grid className="slotCourse">
                                                    <a onClick={this.handleCloseSlot} className="clsSltCal">
                                                        <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                    </a>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} alignItems="center" justify="center">
                                                            <Grid className="jmInfo">
                                                                <a><img src={appoinmentSelected.patient_info && appoinmentSelected.patient_info.profile_image ? getImage(appoinmentSelected.patient_info.profile_image, this.state.images) : require('../../../assets/images/dr1.jpg')} alt="" title="" />{appoinmentSelected.patient_info?(appoinmentSelected.patient_info.first_name + ' ' +  appoinmentSelected.patient_info.last_name):''}</a>
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
                                                        <p>I am feeling a stabbing pain in my left arm. And it’s not getting any better..</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="detailQuesSub">
                                                    <input type="submit" value="Book appointment" />
                                                    <span>or</span>
                                                </Grid>
                                                <Grid className="slotTimDat">
                                                    <Grid container direction="row" className="addBirthSlot">
                                                        <Grid item xs={6} md={6}>
                                                            <Grid><label>Date of birth</label></Grid>
                                                            <Grid>
                                                                <DatePicker
                                                                    onChange={this.onChange}
                                                                    value={this.state.date}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid><label>Select a time</label></Grid>
                                                            <Grid container direction="row" className="addTimesSlot">
                                                                <Grid item xs={5} md={5}><input type="text" value="08:45" /></Grid>
                                                                <Grid item xs={2} md={2} className="addTimesHypnSlot"><span>-</span></Grid>
                                                                <Grid item xs={5} md={5}><input type="text" value="09:10" /></Grid>
                                                            </Grid>
                                                        </Grid>
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