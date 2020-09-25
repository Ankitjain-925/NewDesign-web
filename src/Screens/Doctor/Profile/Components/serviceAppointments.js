import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { LanguageFetchReducer } from './../../../actions';
import { Settings } from './../../../Login/setting';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import sitedata from '../../../../sitedata';
import axios from 'axios';
import Loader from './../../../Components/Loader/index';
import * as translationEN from '../../../../translations/en_json_proofread_13072020.json';
import Toggle from 'react-toggle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state: this.props.LoggedInUser,
            Password: {},
            is2faDone: false,
            PassDone: false,
            notmatch: false,
            loaderImage: false,
            fillall: false,
            onlineAppointments: {},
            UpDataDetails: {},
            DaysforPractices: {}
        };
    }

    componentDidMount() {
        this.getUserData();
    }

    //For Change Password State
    ChangePass = (e) => {
        const state = this.state.Password;
        state[e.target.name] = e.target.value;
        this.setState({ Password: state }, () => {
            if (this.state.Current_state.password !== this.state.Password.current_pass) { this.setState({ notmatch: true, fillall: false }) }
            else { this.setState({ notmatch: false, fillall: false }) }
        });
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
            console.log("response.data.data.private_appointments", response.data.data.private_appointments)
            if (response.data.data.private_appointments[0]) {
                this.setState({ UpDataDetails: response.data.data.private_appointments[0] });
                this.setState({ StandardSetting: response.data.data.private_appointments[0] });
                this.setState({ CustomName: response.data.data.private_appointments[0] });
            }
            if (response.data.data.days_for_practices[0]) {
                this.setState({ DaysforPractices: response.data.data.days_for_practices[0] })
                this.setState({ PracticesSetting: response.data.data.days_for_practices[0] })
            }
            if (response.data.data.online_appointment[0]) {
                this.setState({ onlineAppointments: response.data.data.online_appointment[0] })
                this.setState({ OnlineSetting: response.data.data.online_appointment[0] })
            }
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    updatePrivate = (e) => {
        const state = this.state.UpDataDetails;
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
    }
    onChangePrivate = (time, name) => {
        const state = this.state.UpDataDetails;
        // state[name] = moment(time).format("HH:mm");
        if (time === null) {
            state[name] = '';
        }
        else {
            state[name] = moment(time).format("HH:mm");
        }

        this.setState({ UpDataDetails: state });
    }
    savePrivateData() {
        if (this.state.UpDataDetails.duration_of_timeslots && this.state.UpDataDetails.duration_of_timeslots !== 0) {
            let monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_end, thursday_start,
                friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end, breakslot_start, breakslot_end,
                holidays_start, holidays_end
            const user_token = this.props.stateLoginValueAim.token;
            let doctor_id = this.props.stateLoginValueAim.user._id
            if (this.state.StandardSetting.monday == true) {
                monday_start = this.state.UpDataDetails.monday_start
                monday_end = this.state.UpDataDetails.monday_end
            } else {
                monday_start = ''
                monday_end = ''
            }
            if (this.state.StandardSetting.tuesday == true) {
                tuesday_start = this.state.UpDataDetails.tuesday_start
                tuesday_end = this.state.UpDataDetails.tuesday_end
            } else {
                tuesday_start = ''
                tuesday_end = ''
            }
            if (this.state.StandardSetting.wednesday == true) {
                wednesday_start = this.state.UpDataDetails.wednesday_start
                wednesday_end = this.state.UpDataDetails.wednesday_end
            } else {
                wednesday_start = ''
                wednesday_end = ''
            }
            if (this.state.StandardSetting.thursday == true) {
                thursday_end = this.state.UpDataDetails.thursday_end
                thursday_start = this.state.UpDataDetails.thursday_start
            } else {
                thursday_end = ''
                thursday_start = ''
            }
            if (this.state.StandardSetting.friday == true) {
                friday_start = this.state.UpDataDetails.friday_start
                friday_end = this.state.UpDataDetails.friday_end
            } else {
                friday_start = ''
                friday_end = ''
            }
            if (this.state.StandardSetting.saturday == true) {
                saturday_start = this.state.UpDataDetails.saturday_start
                saturday_end = this.state.UpDataDetails.saturday_end
            } else {
                saturday_start = ''
                saturday_end = ''
            }
            if (this.state.StandardSetting.sunday == true) {
                sunday_start = this.state.UpDataDetails.sunday_start
                sunday_end = this.state.UpDataDetails.sunday_end
            } else {
                sunday_start = ''
                sunday_end = ''
            }
            if (this.state.StandardSetting.breakslot == true) {
                breakslot_start = this.state.UpDataDetails.breakslot_start
                breakslot_end = this.state.UpDataDetails.breakslot_end
            } else {
                breakslot_start = ''
                breakslot_end = ''
            }
            if (this.state.StandardSetting.holidays == true) {
                holidays_start = this.state.UpDataDetails.holidays_start
                holidays_end = this.state.UpDataDetails.holidays_end
            } else {
                holidays_start = ''
                holidays_end = ''
            }
            this.setState({ loaderImage: true, PrivateErr: false });
            axios.put(sitedata.data.path + '/UserProfile/private_appointments/' + doctor_id, {
                type: 'private',
                doctor_id: this.state.UpDataDetails.doctor_id,
                monday_start: monday_start,
                monday_end: monday_end,
                tuesday_start: tuesday_start,
                tuesday_end: tuesday_end,
                wednesday_start: wednesday_start,
                wednesday_end: wednesday_end,
                thursday_start: thursday_start,
                thursday_end: thursday_end,
                friday_start: friday_start,
                friday_end: friday_end,
                saturday_start: saturday_start,
                saturday_end: saturday_end,
                sunday_start: sunday_start,
                sunday_end: sunday_end,
                breakslot_start: breakslot_start,
                breakslot_end: breakslot_end,
                appointment_days: this.state.UpDataDetails.appointment_days,
                appointment_hours: this.state.UpDataDetails.appointment_hours,
                duration_of_timeslots: this.state.UpDataDetails.duration_of_timeslots,
                holidays_start: holidays_start,
                holidays_end: holidays_end,
                monday: this.state.StandardSetting.monday,
                tuesday: this.state.StandardSetting.tuesday,
                wednesday: this.state.StandardSetting.wednesday,
                thursday: this.state.StandardSetting.thursday,
                friday: this.state.StandardSetting.friday,
                saturday: this.state.StandardSetting.saturday,
                sunday: this.state.StandardSetting.sunday,
                breakslot: this.state.StandardSetting.breakslot,
                holidays: this.state.StandardSetting.holidays,
                custom_text: this.state.CustomName.custom_text
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((responce) => {
                    this.setState({ loaderImage: false });
                })

        }
        else {
            this.setState({ PrivateErr: true })
        }

    }


    updateDaysforPractices = (e) => {
        const state = this.state.DaysforPractices;
        state[e.target.name] = e.target.value;
        this.setState({ DaysforPractices: state });
    }
    onChangeDaysforPractices = (time, name) => {
        console.log('dasd', time, name)
        const state = this.state.DaysforPractices;
        // state[name] = moment(time).format("HH:mm");
        if (time === null) {
            state[name] = '';
        }
        else {
            state[name] = moment(time).format("HH:mm");
        }
        this.setState({ DaysforPractices: state });
    }
    saveDaysforPractices() {
        if (this.state.DaysforPractices.duration_of_timeslots && this.state.DaysforPractices.duration_of_timeslots !== 0) {
            this.setState({ loaderImage: true, PracticeErr: false });
            let monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_end, thursday_start,
                friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end, breakslot_start, breakslot_end,
                holidays_start, holidays_end
            const user_token = this.props.stateLoginValueAim.token;
            let doctor_id = this.props.stateLoginValueAim.user._id
            if (this.state.PracticesSetting.monday == true) {
                monday_start = this.state.DaysforPractices.monday_start
                monday_end = this.state.DaysforPractices.monday_end
            } else {
                monday_start = ''
                monday_end = ''
            }
            if (this.state.PracticesSetting.tuesday == true) {
                tuesday_start = this.state.DaysforPractices.tuesday_start
                tuesday_end = this.state.DaysforPractices.tuesday_end
            } else {
                tuesday_start = ''
                tuesday_end = ''
            }
            if (this.state.PracticesSetting.wednesday == true) {
                wednesday_start = this.state.DaysforPractices.wednesday_start
                wednesday_end = this.state.DaysforPractices.wednesday_end
            } else {
                wednesday_start = ''
                wednesday_end = ''
            }
            if (this.state.PracticesSetting.thursday == true) {
                thursday_end = this.state.DaysforPractices.thursday_end
                thursday_start = this.state.DaysforPractices.thursday_start
            } else {
                thursday_end = ''
                thursday_start = ''
            }
            if (this.state.PracticesSetting.friday == true) {
                friday_start = this.state.DaysforPractices.friday_start
                friday_end = this.state.DaysforPractices.friday_end
            } else {
                friday_start = ''
                friday_end = ''
            }
            if (this.state.PracticesSetting.saturday == true) {
                saturday_start = this.state.DaysforPractices.saturday_start
                saturday_end = this.state.DaysforPractices.saturday_end
            } else {
                saturday_start = ''
                saturday_end = ''
            }
            if (this.state.PracticesSetting.sunday == true) {
                sunday_start = this.state.DaysforPractices.sunday_start
                sunday_end = this.state.DaysforPractices.sunday_end
            } else {
                sunday_start = ''
                sunday_end = ''
            }
            if (this.state.PracticesSetting.breakslot == true) {
                breakslot_start = this.state.DaysforPractices.breakslot_start
                breakslot_end = this.state.DaysforPractices.breakslot_end
            } else {
                breakslot_start = ''
                breakslot_end = ''
            }
            if (this.state.PracticesSetting.holidays == true) {
                holidays_start = this.state.DaysforPractices.holidays_start
                holidays_end = this.state.DaysforPractices.holidays_end
            } else {
                holidays_start = ''
                holidays_end = ''
            }

            axios.put(sitedata.data.path + '/UserProfile/DaysforPractices/' + doctor_id, {
                type: 'private',
                doctor_id: this.state.DaysforPractices.doctor_id,
                monday_start: monday_start,
                monday_end: monday_end,
                tuesday_start: tuesday_start,
                tuesday_end: tuesday_end,
                wednesday_start: wednesday_start,
                wednesday_end: wednesday_end,
                thursday_start: thursday_start,
                thursday_end: thursday_end,
                friday_start: friday_start,
                friday_end: friday_end,
                saturday_start: saturday_start,
                saturday_end: saturday_end,
                sunday_start: sunday_start,
                sunday_end: sunday_end,
                breakslot_start: breakslot_start,
                breakslot_end: breakslot_end,
                appointment_days: this.state.DaysforPractices.appointment_days,
                appointment_hours: this.state.DaysforPractices.appointment_hours,
                duration_of_timeslots: this.state.DaysforPractices.duration_of_timeslots,
                holidays_start: holidays_start,
                holidays_end: holidays_end,
                monday: this.state.PracticesSetting.monday,
                tuesday: this.state.PracticesSetting.tuesday,
                wednesday: this.state.PracticesSetting.wednesday,
                thursday: this.state.PracticesSetting.thursday,
                friday: this.state.PracticesSetting.friday,
                saturday: this.state.PracticesSetting.saturday,
                sunday: this.state.PracticesSetting.sunday,
                breakslot: this.state.PracticesSetting.breakslot,
                holidays: this.state.PracticesSetting.holidays,
                custom_text: 'offline'
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((responce) => {
                    this.setState({ loaderImage: false });
                })
        }
        else {
            this.setState({ PracticeErr: true })
        }
    }


    updateOnlineAppointments = (e) => {
        const state = this.state.onlineAppointments;
        state[e.target.name] = e.target.value;
        this.setState({ onlineAppointments: state });
    }
    onChangeOnlineAppointments = (time, name) => {
        const state = this.state.onlineAppointments;
        // state[name] = moment(time).format("HH:mm");
        if (time === null) {
            state[name] = '';
        }
        else {
            state[name] = moment(time).format("HH:mm");
        }
        this.setState({ onlineAppointments: state });
    }

    saveOnlineAppointments() {
        if (this.state.onlineAppointments.duration_of_timeslots && this.state.onlineAppointments.duration_of_timeslots !== 0) {
            this.setState({ loaderImage: true, PublicErr: false });
            let monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_end, thursday_start,
                friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end, breakslot_start, breakslot_end,
                holidays_start, holidays_end
            const user_token = this.props.stateLoginValueAim.token;
            let doctor_id = this.props.stateLoginValueAim.user._id
            if (this.state.OnlineSetting.monday == true) {
                monday_start = this.state.onlineAppointments.monday_start
                monday_end = this.state.onlineAppointments.monday_end
            } else {
                monday_start = ''
                monday_end = ''
            }
            if (this.state.OnlineSetting.tuesday == true) {
                tuesday_start = this.state.onlineAppointments.tuesday_start
                tuesday_end = this.state.onlineAppointments.tuesday_end
            } else {
                tuesday_start = ''
                tuesday_end = ''
            }
            if (this.state.OnlineSetting.wednesday == true) {
                wednesday_start = this.state.onlineAppointments.wednesday_start
                wednesday_end = this.state.onlineAppointments.wednesday_end
            } else {
                wednesday_start = ''
                wednesday_end = ''
            }
            if (this.state.OnlineSetting.thursday == true) {
                thursday_end = this.state.onlineAppointments.thursday_end
                thursday_start = this.state.onlineAppointments.thursday_start
            } else {
                thursday_end = ''
                thursday_start = ''
            }
            if (this.state.OnlineSetting.friday == true) {
                friday_start = this.state.onlineAppointments.friday_start
                friday_end = this.state.onlineAppointments.friday_end
            } else {
                friday_start = ''
                friday_end = ''
            }
            if (this.state.OnlineSetting.saturday == true) {
                saturday_start = this.state.onlineAppointments.saturday_start
                saturday_end = this.state.onlineAppointments.saturday_end
            } else {
                saturday_start = ''
                saturday_end = ''
            }
            if (this.state.OnlineSetting.sunday == true) {
                sunday_start = this.state.onlineAppointments.sunday_start
                sunday_end = this.state.onlineAppointments.sunday_end
            } else {
                sunday_start = ''
                sunday_end = ''
            }
            if (this.state.OnlineSetting.breakslot == true) {
                breakslot_start = this.state.onlineAppointments.breakslot_start
                breakslot_end = this.state.onlineAppointments.breakslot_end
            } else {
                breakslot_start = ''
                breakslot_end = ''
            }
            if (this.state.OnlineSetting.holidays == true) {
                holidays_start = this.state.onlineAppointments.holidays_start
                holidays_end = this.state.onlineAppointments.holidays_end
            } else {
                holidays_start = ''
                holidays_end = ''
            }
            axios.put(sitedata.data.path + '/UserProfile/onlineAppointments/' + doctor_id, {
                type: 'private',
                doctor_id: this.state.DaysforPractices.doctor_id,
                monday_start: monday_start,
                monday_end: monday_end,
                tuesday_start: tuesday_start,
                tuesday_end: tuesday_end,
                wednesday_start: wednesday_start,
                wednesday_end: wednesday_end,
                thursday_start: thursday_start,
                thursday_end: thursday_end,
                friday_start: friday_start,
                friday_end: friday_end,
                saturday_start: saturday_start,
                saturday_end: saturday_end,
                sunday_start: sunday_start,
                sunday_end: sunday_end,
                breakslot_start: breakslot_start,
                breakslot_end: breakslot_end,
                appointment_days: this.state.onlineAppointments.appointment_days,
                appointment_hours: this.state.onlineAppointments.appointment_hours,
                duration_of_timeslots: this.state.onlineAppointments.duration_of_timeslots,
                holidays_start: holidays_start,
                holidays_end: holidays_end,
                monday: this.state.OnlineSetting.monday,
                tuesday: this.state.OnlineSetting.tuesday,
                wednesday: this.state.OnlineSetting.wednesday,
                thursday: this.state.OnlineSetting.thursday,
                friday: this.state.OnlineSetting.friday,
                saturday: this.state.OnlineSetting.saturday,
                sunday: this.state.OnlineSetting.sunday,
                breakslot: this.state.OnlineSetting.breakslot,
                holidays: this.state.OnlineSetting.holidays,
                custom_text: 'online'
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((responce) => {
                    this.setState({ loaderImage: false });
                })
        }
        else {
            this.setState({ PublicErr: true })
        }
    }

    selectWeek = (stateChange, key) => {
        let changestate = this.state[stateChange]
        if (changestate[key + '_start'] == '') {
            changestate[key + '_start'] = '00:00'
            changestate[key + '_end'] = '00:00'
        }
        else {
            changestate[key + '_start'] = ''
            changestate[key + '_end'] = ''
        }
        this.setState({ changestate })
    }


    render() {
        let translate;
        const { onlineAppointments, UpDataDetails, DaysforPractices } = this.state;
        console.log("onlineAppointments", onlineAppointments)
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            // case "de":
            //     translate = translationDE.text
            //     break;
            // case "pt":
            //     translate = translationPT.text
            //     break;
            // case "sp":
            //     translate = translationSP.text
            //     break;
            // case "rs":
            //     translate = translationRS.text
            //     break;
            // case "nl":
            //     translate = translationNL.text
            //     break;
            // case "ch":
            //     translate = translationCH.text
            //     break;
            // case "sw":
            //     translate = translationSW.text
            //     break;
            case "default":
                translate = translationEN.text
        }
        let { Change, password, is, we_use_authy, supportive_text, Current, confirm_password, new_password, two_fac_auth, password_changed, new_and_confirm_pass_not_same, current_pass_not_match, plz_fill_fields,
            Disable, Enable } = translate;

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid className="srvcApointTab">

                    <Grid className="srvcInst instBrdr">
                        <h3>Services</h3>
                        <p>Instant activation and deactivation of services you offer</p>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="chatVoice">
                                    <Grid><img src={require('../../../../assets/images/chat.png')} alt="" title="" /></Grid>
                                    <Grid>
                                        <Grid><label>Chat & Videocalls</label></Grid>
                                        <p>Invite your patients to contact you online</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="prescSickUpr">
                                    <Grid className="prescSick">
                                        <Grid><img src={require('../../../../assets/images/docs.png')} alt="" title="" /></Grid>
                                        <Grid>
                                            <Grid><label>Prescriptions & Sick Certificates</label></Grid>
                                            <p>Issue prescriptions & sick certificates online</p>
                                        </Grid>
                                    </Grid>

                                    <Grid className="onlinSickCer">
                                        <Grid className="onlinSickContn">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="checkedB"
                                                        color="#00ABAF"
                                                    />
                                                }
                                                label="Online Sick Certificates"
                                            />
                                        </Grid>
                                        <Grid className="onlinSickContn">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="checkedB"
                                                        color="#00ABAF"
                                                    />
                                                }
                                                label="Online Prescriptions"
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="apointSchdule">
                                    <Grid><label>Appointments</label></Grid>
                                    <p>Select appointment types and set your schedule</p>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <Grid>
                                        <label>
                                            <Toggle icons={false} />
                                            <span className="holdyPeriod">Holiday period between:</span>
                                        </label>
                                    </Grid>
                                    <Grid className="enblDate">
                                        <span>27/06/2020 - 15/07/2020
                                                                           <img src={require('../../../../assets/images/calIcon.png')} alt="" title="" />
                                        </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="prescSickVdo">
                                    <Grid><img src={require('../../../../assets/images/docs.png')} alt="" title="" /></Grid>
                                    <Grid>
                                        <Grid><label>Appointment System</label></Grid>
                                        <p>Offer practice and online appointment with Aimedis</p>
                                    </Grid>
                                </Grid>
                                <Grid className="onlinSickVdo">
                                    <img src={require('../../../../assets/images/video-call-copy.svg')} className="vdoCalNow" alt="" title="" />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="checkedB"
                                                color="#00ABAF"
                                            />
                                        }
                                        label="Video call"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="wrkHourUpr">
                            <Grid container direction="row">
                                <Grid item xs={12} md={6}>
                                    <Grid className="wrkHour">
                                        <Grid><label>Set online working hours</label></Grid>
                                        <Grid>
                                            <a className={onlineAppointments.monday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'monday')}>M</a>
                                            <a className={onlineAppointments.tuesday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'tuesday')}>T</a>
                                            <a className={onlineAppointments.wednesday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'wednesday')}> W</a>
                                            <a className={onlineAppointments.thursday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'thursday')}>T</a>
                                            <a className={onlineAppointments.friday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'friday')}>F</a>
                                            <a className={onlineAppointments.saturday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'saturday')}>S</a>
                                            <a className={onlineAppointments.sunday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('onlineAppointments', 'sunday')}>S</a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="dayScheduleUpr">
                                        {onlineAppointments.monday_end && onlineAppointments.monday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>Monday</label></Grid>
                                            <Grid>
                                                <input type="text" value={onlineAppointments.monday_start} />
                                                <span>-</span>
                                                <input type="text" value={onlineAppointments.monday_end} />
                                            </Grid>
                                            <Grid>
                                                <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                            </Grid>
                                        </Grid>}
                                        {onlineAppointments.tuesday_end && onlineAppointments.tuesday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>Tuesday</label></Grid>
                                            <Grid>
                                                <input type="text" value={onlineAppointments.tuesday_start} />
                                                <span>-</span>
                                                <input type="text" value={onlineAppointments.tuesday_end} />
                                            </Grid>
                                            {onlineAppointments.monday_end == '' && <Grid>
                                                <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                            </Grid>}

                                        </Grid>}
                                        {onlineAppointments.wednesday_end && onlineAppointments.wednesday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Wednesday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={onlineAppointments.wednesday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={onlineAppointments.wednesday_end} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.thursday_end && onlineAppointments.thursday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Thursday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={onlineAppointments.thursday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={onlineAppointments.thursday_end} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.friday_end && onlineAppointments.friday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Friday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={onlineAppointments.friday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={onlineAppointments.friday_end} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && onlineAppointments.thursday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.saturday_end && onlineAppointments.saturday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Saturday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={onlineAppointments.saturday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={onlineAppointments.saturday_end} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && onlineAppointments.thursday_end == '' && onlineAppointments.friday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.sunday_end && onlineAppointments.sunday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Sunday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={onlineAppointments.sunday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={onlineAppointments.sunday_end} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && onlineAppointments.thursday_end == '' && onlineAppointments.friday_end == '' && onlineAppointments.saturday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid><label>Set timeslot duration:</label></Grid>
                                            <Grid>
                                                <input type="text" value="10:30" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid><label>Break time:</label></Grid>
                                            <Grid>
                                                <input type="text" value={onlineAppointments.breakslot_start} />
                                                <span>-</span>
                                                <input type="text" value={onlineAppointments.breakslot_end} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="apontBook">
                                        <Grid><label>Appointment can be booked:</label></Grid>
                                        <Grid><p><span>Up to days,</span> <input type="text" value="28" /> before the day of appointment</p></Grid>
                                        <Grid><p><span>Max,</span> <input type="text" value="28" /> hours, before the time of appointment</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="onlinSickVdo officVisit">
                                    <img src={require('../../../../assets/images/ShapeCopy21.svg')} className="vdoCalNow" alt="" title="" />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="checkedB"
                                                color="#00ABAF"
                                            />
                                        }
                                        label="Office visit"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="wrkHourUpr">
                            <Grid container direction="row">
                                <Grid item xs={12} md={6}>
                                    <Grid className="wrkHour">
                                        <Grid><label>Set online working hours</label></Grid>
                                        <Grid>
                                            <a className={UpDataDetails.monday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'monday')}>M</a>
                                            <a className={UpDataDetails.tuesday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'tuesday')}>T</a>
                                            <a className={UpDataDetails.wednesday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'wednesday')}> W</a>
                                            <a className={UpDataDetails.thursday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'thursday')}>T</a>
                                            <a className={UpDataDetails.friday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'friday')}>F</a>
                                            <a className={UpDataDetails.saturday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'saturday')}>S</a>
                                            <a className={UpDataDetails.sunday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('UpDataDetails', 'sunday')}>S</a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="dayScheduleUpr">
                                        {UpDataDetails.monday_end && UpDataDetails.monday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>Monday</label></Grid>
                                            <Grid>
                                                <input type="text" value={UpDataDetails.monday_start} />
                                                <span>-</span>
                                                <input type="text" value={UpDataDetails.monday_end} />
                                            </Grid>
                                            <Grid>
                                                <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                            </Grid>
                                        </Grid>}
                                        {UpDataDetails.tuesday_end && UpDataDetails.tuesday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>Tuesday</label></Grid>
                                            <Grid>
                                                <input type="text" value={UpDataDetails.tuesday_start} />
                                                <span>-</span>
                                                <input type="text" value={UpDataDetails.tuesday_end} />
                                            </Grid>
                                            {UpDataDetails.monday_end == '' && <Grid>
                                                <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                            </Grid>}

                                        </Grid>}
                                        {UpDataDetails.wednesday_end && UpDataDetails.wednesday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Wednesday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={UpDataDetails.wednesday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={UpDataDetails.wednesday_end} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.thursday_end && UpDataDetails.thursday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Thursday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={UpDataDetails.thursday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={UpDataDetails.thursday_end} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.friday_end && UpDataDetails.friday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Friday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={UpDataDetails.friday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={UpDataDetails.friday_end} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && UpDataDetails.thursday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.saturday_end && UpDataDetails.saturday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Saturday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={UpDataDetails.saturday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={UpDataDetails.saturday_end} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && UpDataDetails.thursday_end == '' && UpDataDetails.friday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.sunday_end && UpDataDetails.sunday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Sunday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={UpDataDetails.sunday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={UpDataDetails.sunday_end} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && UpDataDetails.thursday_end == '' && UpDataDetails.friday_end == '' && UpDataDetails.saturday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid><label>Set timeslot duration:</label></Grid>
                                            <Grid>
                                                <input type="text" value="10:30" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid><label>Break time:</label></Grid>
                                            <Grid>
                                                <input type="text" value="10:30" />
                                                <span>-</span>
                                                <input type="text" value="11:30" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="apontBook">
                                        <Grid><label>Appointment can be booked:</label></Grid>
                                        <Grid><p><span>Up to days,</span> <input type="text" value="28" /> before the day of appointment</p></Grid>
                                        <Grid><p><span>Max,</span> <input type="text" value="28" /> hours, before the time of appointment</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="onlinSickVdo officVisit">
                                    <img src={require('../../../../assets/images/dates.png')} className="vdoCalNow mngDates" alt="" title="" />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="checkedB"
                                                color="#00ABAF"
                                            />
                                        }
                                        label="Consultancy (custom calendar)"
                                    />
                                    <img src={require('../../../../assets/images/editBlue.png')} className="editPendata" alt="" title="" />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="wrkHourUpr">
                            <Grid container direction="row">
                                <Grid item xs={12} md={6}>
                                    <Grid className="wrkHour">
                                        <Grid><label>Set online working hours</label></Grid>
                                        <Grid>
                                            <a className={DaysforPractices.monday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'monday')}>M</a>
                                            <a className={DaysforPractices.tuesday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'tuesday')}>T</a>
                                            <a className={DaysforPractices.wednesday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'wednesday')}> W</a>
                                            <a className={DaysforPractices.thursday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'thursday')}>T</a>
                                            <a className={DaysforPractices.friday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'friday')}>F</a>
                                            <a className={DaysforPractices.saturday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'saturday')}>S</a>
                                            <a className={DaysforPractices.sunday_end !== '' && 'seleted-days'} onClick={() => this.selectWeek('DaysforPractices', 'sunday')}>S</a>
                                        </Grid>
                                    </Grid>
                                    <Grid className="dayScheduleUpr">
                                        {DaysforPractices.monday_end && DaysforPractices.monday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>Monday</label></Grid>
                                            <Grid>
                                                <input type="text" value={DaysforPractices.monday_start} />
                                                <span>-</span>
                                                <input type="text" value={DaysforPractices.monday_end} />
                                            </Grid>
                                            <Grid>
                                                <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                            </Grid>
                                        </Grid>}
                                        {DaysforPractices.tuesday_end && DaysforPractices.tuesday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>Tuesday</label></Grid>
                                            <Grid>
                                                <input type="text" value={DaysforPractices.tuesday_start} />
                                                <span>-</span>
                                                <input type="text" value={DaysforPractices.tuesday_end} />
                                            </Grid>
                                            {DaysforPractices.monday_end == '' && <Grid>
                                                <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                            </Grid>}

                                        </Grid>}
                                        {DaysforPractices.wednesday_end && DaysforPractices.wednesday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Wednesday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={DaysforPractices.wednesday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={DaysforPractices.wednesday_end} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.thursday_end && DaysforPractices.thursday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Thursday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={DaysforPractices.thursday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={DaysforPractices.thursday_end} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.friday_end && DaysforPractices.friday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Friday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={DaysforPractices.friday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={DaysforPractices.friday_end} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && DaysforPractices.thursday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.saturday_end && DaysforPractices.saturday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Saturday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={DaysforPractices.saturday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={DaysforPractices.saturday_end} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && DaysforPractices.thursday_end == '' && DaysforPractices.friday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.sunday_end && DaysforPractices.sunday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>Sunday</label></Grid>
                                                <Grid>
                                                    <input type="text" value={DaysforPractices.sunday_start} />
                                                    <span>-</span>
                                                    <input type="text" value={DaysforPractices.sunday_end} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && DaysforPractices.thursday_end == '' && DaysforPractices.friday_end == '' && DaysforPractices.saturday_end == '' && <Grid>
                                                    <p><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    Copy time to all </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid><label>Set timeslot duration:</label></Grid>
                                            <Grid>
                                                <input type="text" value="10:30" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid><label>Break time:</label></Grid>
                                            <Grid>
                                                <input type="text" value="10:30" />
                                                <span>-</span>
                                                <input type="text" value="11:30" />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="apontBook">
                                        <Grid><label>Appointment can be booked:</label></Grid>
                                        <Grid><p><span>Up to days,</span> <input type="text" value="28" /> before the day of appointment</p></Grid>
                                        <Grid><p><span>Max,</span> <input type="text" value="28" /> hours, before the time of appointment</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Grid item xs={12} md={6} className="savChngsBtn">
                            <input type="submit" value="Save changes" />
                        </Grid>
                        <Grid item xs={12} md={6}> </Grid>
                    </Grid>

                </Grid>
            </div>
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