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
const CURRENT_DATE = moment().toDate();
const localizer = momentLocalizer(moment)
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

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
            DetialData:{}
        };
    }

    componentDidMount() {
        this.getEvent();
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
                                        finaldata.push({ id: index, title: d1.patient_info.first_name + " " + d1.patient_info.last_name, start: new Date(da1), end: new Date(da2), indexout: indexout, fulldata:[d1] })
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

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    handleOpenSlot = () => {
        this.setState({ openSlot: true });
    };
    handleCloseSlot = () => {
        this.setState({ openSlot: false });
    };

    EventComponent = (data) => {
        return (
            <TooltipTrigger
                placement="right"
                trigger="click"
                tooltip={datas=>this.Tooltip({
                    getTooltipProps:datas.getTooltipProps,
                    getArrowProps:datas.getArrowProps,
                    tooltipRef:datas.tooltipRef,
                    arrowRef:datas.arrowRef,
                    placement:datas.placement,
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
    }) =>{
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
                        <div className="calendarevent">
                            {event.fulldata && event.fulldata.length > 0 && event.fulldata.map((data) => (
                                <div>
                                    <p>{data.start_time && data.start_time} to {data.end_time && data.end_time}</p>
                                    <p>{data.appointment_type && data.appointment_type.replace('_', ' ')}</p>
                                    <p>{data.patient_info.first_name && data.patient_info.first_name}  {data.patient_info.last_name && data.patient_info.last_name}</p>
                                    <p>{data.patient_info.patient_id && data.patient_info.patient_id}</p>
                                    <p>{data.patient_info.email && data.patient_info.email}</p>
                                    <p>{data.annotations && data.annotations}</p>
                                </div>
                            ))}
                        </div>
                    }
        
            </div>
        );
    }

    render() {
        const { selectedOption, myEventsList } = this.state;
        return (
            <Grid className="homeBg">
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
                                        <Grid className="todaySrch">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={12} alignItems="center" justify="center">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} className="todayMnth">
                                                            <Grid className="todaySrchLft"><label>Today</label></Grid>
                                                            <Grid className="movMnth">
                                                                <a><img src={require('../../../assets/images/leftArow.jpg')} alt="" title="" /></a>
                                                                <a><img src={require('../../../assets/images/rightArow.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                            <Grid className="crntMonth">Augest 2020</Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="todaySrchRght todayAddons">
                                                                <a className="syncRght">Sync to your calendar</a>
                                                                <a><img src={require('../../../assets/images/topicSrch.jpg')} alt="" title="" /></a>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={this.handleChange}
                                                                    options={options}
                                                                    placeholder="Day"
                                                                    className="allTimeSelnw comonSelnw"
                                                                    //isMulti= {true}
                                                                    isSearchable={false}
                                                                />
                                                                <a className="calViewnw"><img src={require('../../../assets/images/calendar-view.svg')} alt="" title="" /></a>
                                                                <a className="barViewnw"><img src={require('../../../assets/images/bar.png')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
                                                        dateCellWrapper: this.DateCellCompnent
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