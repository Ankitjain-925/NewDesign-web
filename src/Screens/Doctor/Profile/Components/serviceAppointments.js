import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { LanguageFetchReducer } from './../../../actions';
import { Settings } from './../../../Login/setting';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import sitedata, { data } from '../../../../sitedata';
import axios from 'axios';
import Loader from './../../../Components/Loader/index';
import * as translationEN from '../../../../translations/en.json';
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
import * as translationFR from '../../../../translations/fr.json';
import * as translationAR from '../../../../translations/ar.json';
import Toggle from 'react-toggle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TimeFormat from './../../../Components/TimeFormat/index';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const apoinmentdata = {
    type: 'private',
    monday_start: '',
    monday_end: '',
    tuesday_start: '',
    tuesday_end: '',
    wednesday_start: '',
    wednesday_end: '',
    thursday_end: '',
    thursday_start: '',
    friday_start: '',
    friday_end: '',
    saturday_start: '',
    saturday_end: '',
    sunday_start: '',
    sunday_end: '',
    breakslot: false,
    breakslot_start: '',
    breakslot_end: '',
    holidays: false,
    holidays_start: '',
    holidays_end: '',
    custom_text: '',
    duration_of_timeslots: 0

}
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
            DaysforPractices: {},
            firstServiceData: {},
            sencondSeviceData: {},
            thirdServiceData: {},
            weoffer: {},
            holidayAppointment: {},
            updateService: false
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
            this.setState({ paid_services: response.data.data.paid_services })

            var keysArray = Object.keys(apoinmentdata);
            let privateAppointments = null;
            privateAppointments = response.data.data.private_appointments[0];
            if (privateAppointments) {
                if (privateAppointments.holidays) {
                    this.setState({
                        holidayAppointment: {
                            holidays_start: privateAppointments.holidays_start !== '' ? privateAppointments.holidays_start : new Date(),
                            holidays_end: privateAppointments.holidays_end !== '' ? privateAppointments.holidays_end : new Date(),
                            holidays: privateAppointments.holidays
                        }
                    })
                }

                keysArray.map(key => {
                    if (privateAppointments[key] == undefined) {
                        privateAppointments[key] = apoinmentdata[key]
                    }
                })
                this.setState({ UpDataDetails: privateAppointments, StandardSetting: privateAppointments, CustomName: privateAppointments });
            }
            else {
                privateAppointments = {}
                keysArray.map(key => {
                    if (privateAppointments[key] == undefined) {
                        privateAppointments[key] = apoinmentdata[key]
                    }
                })
                this.setState({ UpDataDetails: privateAppointments, StandardSetting: privateAppointments, CustomName: privateAppointments });
            }

            let daysForPractices = null;
            daysForPractices = response.data.data.days_for_practices[0];
            if (daysForPractices) {
                if (daysForPractices.holidays) {
                    this.setState({
                        holidayAppointment: {
                            holidays_start: daysForPractices.holidays_start !== '' ? daysForPractices.holidays_start : new Date(),
                            holidays_end: daysForPractices.holidays_end !== '' ? daysForPractices.holidays_end : new Date(),
                            holidays: daysForPractices.holidays
                        }
                    })

                }

                keysArray.map(key => {
                    if (daysForPractices[key] == undefined) {
                        daysForPractices[key] = apoinmentdata[key]
                    }
                })
                this.setState({ DaysforPractices: daysForPractices, PracticesSetting: daysForPractices })
            } else {
                daysForPractices = {}
                keysArray.map(key => {
                    if (daysForPractices[key] == undefined) {
                        daysForPractices[key] = apoinmentdata[key]
                    }
                })
                this.setState({ DaysforPractices: daysForPractices, PracticesSetting: daysForPractices })
            }

            let onlineAppointment = null
            onlineAppointment = response.data.data.online_appointment[0];
            if (onlineAppointment) {
                if (onlineAppointment.holidays) {
                    this.setState({
                        holidayAppointment: {
                            holidays_start: onlineAppointment.holidays_start !== '' ? onlineAppointment.holidays_start : new Date(),
                            holidays_end: onlineAppointment.holidays_end !== '' ? onlineAppointment.holidays_end : new Date(),
                            holidays: onlineAppointment.holidays
                        }
                    })
                }

                keysArray.map(key => {
                    if (onlineAppointment[key] == undefined) {
                        onlineAppointment[key] = apoinmentdata[key]
                    }
                })

                this.setState({ onlineAppointments: onlineAppointment, OnlineSetting: onlineAppointment })
            } else {
                onlineAppointment = {}
                keysArray.map(key => {
                    if (onlineAppointment[key] == undefined) {
                        onlineAppointment[key] = apoinmentdata[key]
                    }
                })
                this.setState({ onlineAppointments: onlineAppointment, OnlineSetting: onlineAppointment })
            }

            if (response.data.data.we_offer) {
                let weOffer = response.data.data.we_offer;
                if (weOffer.Offer_office_prescription == undefined) {
                    weOffer.Offer_office_prescription = false
                }
                if (weOffer.Offer_online_prescription == undefined) {
                    weOffer.Offer_online_prescription = false
                }
                if (weOffer.Offer_online_sick_certificates == undefined) {
                    weOffer.Offer_online_sick_certificates = false
                }
                if (weOffer.Offer_practice_appointment == undefined) {
                    weOffer.Offer_practice_appointment = false
                }
                if (weOffer.Offre_online_appointments == undefined) {
                    weOffer.Offre_online_appointments = false
                }
                this.setState({ weoffer: weOffer })
            }
            else {
                this.setState({
                    weoffer: {
                        Offer_office_prescription: false,
                        Offer_online_prescription: false,
                        Offer_online_sick_certificates: false,
                        Offer_practice_appointment: false,
                        Offre_online_appointments: false
                    }
                })
            }

            let firstServiceData = this.state.paid_services.find(ele => ele.description === "videochat")
            if (firstServiceData) this.setState({ firstServiceData: firstServiceData })

            let sencondSeviceData = this.state.paid_services.find(ele => ele.description === "prescription")
            if (sencondSeviceData) this.setState({ sencondSeviceData: sencondSeviceData })

            let thirdServiceData = this.state.paid_services.find(ele => ele.description === "appointment")
            if (thirdServiceData) this.setState({ thirdServiceData: thirdServiceData })

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

    saveAllData = () => {
        const user_token = this.props.stateLoginValueAim.token;
        let doctor_id = this.props.stateLoginValueAim.user._id;
        let { firstServiceData, sencondSeviceData, thirdServiceData, weoffer, UpDataDetails, DaysforPractices, onlineAppointments, holidayAppointment } = this.state;
        let dataSave = {};
       
        this.setState({ updateService: false, appoinmentError: false })
        dataSave['paid_services'] = [];
        
        // if (weoffer &&  weoffer.Offer_office_prescription && (!UpDataDetails.duratin_of_timeslots || UpDataDetails.duration_of_timeslots === 0 )){
        //     // console.log('hereee')
        //     this.setState({ appoinmentError: true })
        // }
        // else 
        if(weoffer &&  weoffer.Offer_office_prescription && (!UpDataDetails.duration_of_timeslots || UpDataDetails.duration_of_timeslots === 0)){
   
            this.setState({ appoinmentError: true })
        }
        else if(weoffer &&  weoffer.Offer_practice_appointment && (!DaysforPractices.duration_of_timeslots || DaysforPractices.duration_of_timeslots === 0)){
         
            this.setState({ appoinmentError: true })
        }
        else if(weoffer &&  weoffer.Offre_online_appointments && (!onlineAppointments.duration_of_timeslots || onlineAppointments.duration_of_timeslots === 0)) {
            
            this.setState({ appoinmentError: true })
        }
        else {
           
            if (firstServiceData.created) {
                dataSave['paid_services'].push(firstServiceData)
            }
            if (sencondSeviceData.created) {
                dataSave['paid_services'].push(sencondSeviceData)
            }
            if (thirdServiceData.created) {
                dataSave['paid_services'].push(thirdServiceData)
            }
            dataSave['we_offer'] = weoffer;
            dataSave['days_for_practices'] = DaysforPractices;
            dataSave['online_appointment'] = onlineAppointments;
            dataSave['private_appointments'] = UpDataDetails;

            if (holidayAppointment['holidays']) {
                dataSave['days_for_practices']['holidays'] = holidayAppointment['holidays']
                dataSave['days_for_practices']['holidays_start'] = moment(holidayAppointment['holidays_start']).format('YYYY-MM-DD')
                dataSave['days_for_practices']['holidays_end'] = moment(holidayAppointment['holidays_end']).format('YYYY-MM-DD')
                dataSave['online_appointment']['holidays'] = holidayAppointment['holidays']
                dataSave['online_appointment']['holidays_start'] = moment(holidayAppointment['holidays_start']).format('YYYY-MM-DD')
                dataSave['online_appointment']['holidays_end'] = moment(holidayAppointment['holidays_end']).format('YYYY-MM-DD')
                dataSave['private_appointments']['holidays'] = holidayAppointment['holidays']
                dataSave['private_appointments']['holidays_start'] = moment(holidayAppointment['holidays_start']).format('YYYY-MM-DD')
                dataSave['private_appointments']['holidays_end'] = moment(holidayAppointment['holidays_end']).format('YYYY-MM-DD')
            }
            else {
                dataSave['days_for_practices']['holidays'] = holidayAppointment['holidays']
                dataSave['days_for_practices']['holidays_start'] = ''
                dataSave['days_for_practices']['holidays_end'] = ''
                dataSave['online_appointment']['holidays'] = holidayAppointment['holidays']
                dataSave['online_appointment']['holidays_start'] = ''
                dataSave['online_appointment']['holidays_end'] = ''
                dataSave['private_appointments']['holidays'] = holidayAppointment['holidays']
                dataSave['private_appointments']['holidays_start'] = ''
                dataSave['private_appointments']['holidays_end'] = ''
            }
            dataSave['days_for_practices'] = [dataSave['days_for_practices']];
            dataSave['online_appointment'] = [dataSave['online_appointment']];
            dataSave['private_appointments'] = [dataSave['private_appointments']];
            this.setState({ loaderImage: true, PrivateErr: false });
            // // console.log("dataSave", dataSave)
            axios.put(sitedata.data.path + '/UserProfile/Users/update', dataSave, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((responce) => {
                 
                    this.setState({ loaderImage: false, updateService: true });
                    setTimeout(() => { this.setState({ updateService: false }) }, 5000)
                })
        }
        // }
        // else {
            
        //     this.setState({ appoinmentError: true })
        // }

        // if (this.state.UpDataDetails.duration_of_timeslots && this.state.UpDataDetails.duration_of_timeslots !== 0) {
        //     let monday_start, monday_end, tuesday_start, tuesday_end, wednesday_start, wednesday_end, thursday_end, thursday_start,
        //         friday_start, friday_end, saturday_start, saturday_end, sunday_start, sunday_end, breakslot_start, breakslot_end,
        //         holidays_start, holidays_end
        //     const user_token = this.props.stateLoginValueAim.token;
        //     let doctor_id = this.props.stateLoginValueAim.user._id
        //     if (this.state.StandardSetting.monday == true) {
        //         monday_start = this.state.UpDataDetails.monday_start
        //         monday_end = this.state.UpDataDetails.monday_end
        //     } else {
        //         monday_start = ''
        //         monday_end = ''
        //     }
        //     if (this.state.StandardSetting.tuesday == true) {
        //         tuesday_start = this.state.UpDataDetails.tuesday_start
        //         tuesday_end = this.state.UpDataDetails.tuesday_end
        //     } else {
        //         tuesday_start = ''
        //         tuesday_end = ''
        //     }
        //     if (this.state.StandardSetting.wednesday == true) {
        //         wednesday_start = this.state.UpDataDetails.wednesday_start
        //         wednesday_end = this.state.UpDataDetails.wednesday_end
        //     } else {
        //         wednesday_start = ''
        //         wednesday_end = ''
        //     }
        //     if (this.state.StandardSetting.thursday == true) {
        //         thursday_end = this.state.UpDataDetails.thursday_end
        //         thursday_start = this.state.UpDataDetails.thursday_start
        //     } else {
        //         thursday_end = ''
        //         thursday_start = ''
        //     }
        //     if (this.state.StandardSetting.friday == true) {
        //         friday_start = this.state.UpDataDetails.friday_start
        //         friday_end = this.state.UpDataDetails.friday_end
        //     } else {
        //         friday_start = ''
        //         friday_end = ''
        //     }
        //     if (this.state.StandardSetting.saturday == true) {
        //         saturday_start = this.state.UpDataDetails.saturday_start
        //         saturday_end = this.state.UpDataDetails.saturday_end
        //     } else {
        //         saturday_start = ''
        //         saturday_end = ''
        //     }
        //     if (this.state.StandardSetting.sunday == true) {
        //         sunday_start = this.state.UpDataDetails.sunday_start
        //         sunday_end = this.state.UpDataDetails.sunday_end
        //     } else {
        //         sunday_start = ''
        //         sunday_end = ''
        //     }
        //     if (this.state.StandardSetting.breakslot == true) {
        //         breakslot_start = this.state.UpDataDetails.breakslot_start
        //         breakslot_end = this.state.UpDataDetails.breakslot_end
        //     } else {
        //         breakslot_start = ''
        //         breakslot_end = ''
        //     }
        //     if (this.state.StandardSetting.holidays == true) {
        //         holidays_start = this.state.UpDataDetails.holidays_start
        //         holidays_end = this.state.UpDataDetails.holidays_end
        //     } else {
        //         holidays_start = ''
        //         holidays_end = ''
        //     }
        //     this.setState({ loaderImage: true, PrivateErr: false });
        //     axios.put(sitedata.data.path + '/UserProfile/private_appointments/' + doctor_id, {
        //         type: 'private',
        //         doctor_id: this.state.UpDataDetails.doctor_id,
        //         monday_start: monday_start,
        //         monday_end: monday_end,
        //         tuesday_start: tuesday_start,
        //         tuesday_end: tuesday_end,
        //         wednesday_start: wednesday_start,
        //         wednesday_end: wednesday_end,
        //         thursday_start: thursday_start,
        //         thursday_end: thursday_end,
        //         friday_start: friday_start,
        //         friday_end: friday_end,
        //         saturday_start: saturday_start,
        //         saturday_end: saturday_end,
        //         sunday_start: sunday_start,
        //         sunday_end: sunday_end,
        //         breakslot_start: breakslot_start,
        //         breakslot_end: breakslot_end,
        //         appointment_days: this.state.UpDataDetails.appointment_days,
        //         appointment_hours: this.state.UpDataDetails.appointment_hours,
        //         duration_of_timeslots: this.state.UpDataDetails.duration_of_timeslots,
        //         holidays_start: holidays_start,
        //         holidays_end: holidays_end,
        //         monday: this.state.StandardSetting.monday,
        //         tuesday: this.state.StandardSetting.tuesday,
        //         wednesday: this.state.StandardSetting.wednesday,
        //         thursday: this.state.StandardSetting.thursday,
        //         friday: this.state.StandardSetting.friday,
        //         saturday: this.state.StandardSetting.saturday,
        //         sunday: this.state.StandardSetting.sunday,
        //         breakslot: this.state.StandardSetting.breakslot,
        //         holidays: this.state.StandardSetting.holidays,
        //         custom_text: this.state.CustomName.custom_text
        //     }, {
        //         headers: {
        //             'token': user_token,
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then((responce) => {
        //             this.setState({ loaderImage: false });
        //         })

        // }
        // else {
        //     this.setState({ PrivateErr: true })
        // }

    }


    updateDaysforPractices = (e) => {
        const state = this.state.DaysforPractices;
        state[e.target.name] = e.target.value;
        this.setState({ DaysforPractices: state });
    }
    onChangeDaysforPractices = (time, name) => {
      
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
        let changestate = this.state[stateChange];
        if (changestate[key + '_start'] == '') {
            changestate[key + '_start'] = '00:00'
            changestate[key + '_end'] = '00:00'

        }
        else {
            changestate[key + '_start'] = ''
            changestate[key + '_end'] = ''
        }
     
        this.setState({ [stateChange]: changestate })
    }

    onChange = (event, belong, stateChange, key) => {
      
        if (event) {
            let changestate = this.state[stateChange]
            changestate[key + '_' + belong] = moment(event).format('HH:mm')
            this.setState({ [stateChange]: changestate })
        }
        else if (key !== 'breakslot') {
            let changestate = this.state[stateChange]
            changestate[key + '_' + belong] = '00:00'
            this.setState({ [stateChange]: changestate })
        }
        else {
            let changestate = this.state[stateChange]
            changestate[key + '_' + belong] = '';
       
            this.setState({ [stateChange]: changestate })
        }
    }

    copytoall = (stateChange, key) => {
        let week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        let data = this.state[stateChange];
        let start_time = data[key + "_start"];
        let end_time = data[key + "_end"];
        week.map((days) => {
            if (data[days + "_start"] !== '') {
                data[days + "_start"] = start_time;
            }
            if (data[days + "_end"] !== '') {
                data[days + "_end"] = end_time;
            }
        })
        this.setState({ [stateChange]: data })
    }

    getTime = (time) => {
      
        if (time !== '') {
            let date = new Date();
            let splittime = time.split(":")
            date.setHours(splittime[0], splittime[1])
            return date
        }
        else {
            return ''
        }
    }

    //For checkbox to offer things
    handleweoffer = (value) => {
     
        const state = this.state.weoffer
        state[value] = !state[value];
        this.setState({ weoffer: state });
    }

    handlepaidService = (e, statechange) => {
        let state = this.state[statechange]
        if (e.target.checked) {
            state.description = statechange == 'firstServiceData' ? "videochat" : statechange == 'sencondSeviceData' ? 'prescription' : 'appointment';
            state.created = moment(new Date()).format('MM/DD/YYYY')
        }
        else {
            state = {};
        }
       
        this.setState({ [statechange]: state });
    }

    handleholiday = (statechange) => {
        let state = this.state[statechange];

        state['holidays'] = !state['holidays'];
        if (!state['holidays']) {
            state['holidays_start'] = ''
            state['holidays_end'] = ''
        }
        else {
            state['holidays_start'] = new Date()
            state['holidays_end'] = new Date()
        }
        this.setState({ [statechange]: state });
    }

    handleholidayDate = (statechange, date) => {
        let state = this.state[statechange];
        state['holidays_start'] = date[0].format()
        state['holidays_end'] = date[1].format()
        this.setState({ [statechange]: state });
    }

    onChangebook = (event, key, statechange) => {
        let state = this.state[statechange];
        state[key] = event.target.value
        this.setState({ [statechange]: state });
    }

    changeCustomtext = (event) => {
        let { UpDataDetails } = this.state
        UpDataDetails['custom_text'] = event.target.value
        this.setState({ TempText: UpDataDetails['custom_text'] })
    }

    saveText = () => {
        let { UpDataDetails, TempText } = this.state
        UpDataDetails['custom_text'] = TempText
        this.setState({ UpDataDetails: UpDataDetails, changeText: false })
    }

    changeDuration = (event, stateChange) => {
        let data = this.state[stateChange];
        data[event.target.name] = event.target.value;
       
        this.setState({ [stateChange]: data })
        this.setState({ appoinmentError: false })
    }

    render() {
        let translate={};
        const { onlineAppointments, UpDataDetails, DaysforPractices, weoffer, firstServiceData, sencondSeviceData, thirdServiceData, holidayAppointment, changeText, appoinmentError } = this.state;

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
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
            default:
                translate = translationEN.text
        }
        let { Change, password, set_working_hours,Consultancy_custom_calendar, minutes, is, we_use_authy, before_day_of_appointment, supportive_text, monday, tuseday, wednesday, copy_to_all_time, thursday, friday, saturday, sunday, vdo_call ,set_online_working_hour, plz_fill_break_timeslot_for_aapointment, plz_fill_time_duration_appointment, the_appointment_srvc_success_updated, Current, confirm_password, new_password, two_fac_auth, password_changed, new_and_confirm_pass_not_same, current_pass_not_match, plz_fill_fields,
            Disable, Enable, Services, instant_activation_deactivation_offer_srvc, invite_patient_to_contact_online, copy_time_to_all, chat_vdocall, prescription_and_sick_cert, online_prescription, select_appointment_set_schedule, holiday_period_btw, appointment_system,issue_prescription_and_sickCert_online, onine_sick_cert, appointments, offer_practice_online_appointment, set_timeslot_duration, break_time, appointment_can_be_booked, up_to_days, Max, hourse_before_time_appointment, save_change } = translate;

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid className="srvcApointTab">

                    <Grid className="srvcInst instBrdr">
                        {this.state.updateService && <div className="success_message">{the_appointment_srvc_success_updated}</div>}
                        {this.state.appoinmentError && <div className="err_message">{plz_fill_time_duration_appointment}</div>}
                        <h3>{Services}</h3>
                        <p>{instant_activation_deactivation_offer_srvc}</p>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="chatVoice">
                                    <Grid><img src={require('../../../../assets/images/chat.png')} alt="" title="" /></Grid>
                                    <Grid>
                                        <Grid><label>{chat_vdocall}</label></Grid>
                                        <p>{invite_patient_to_contact_online}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} checked={firstServiceData && firstServiceData.description == 'videochat'} onClick={(e) => { this.handlepaidService(e, 'firstServiceData') }} /></label>
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
                                            <Grid><label>{prescription_and_sick_cert}</label></Grid>
                                            <p>{issue_prescription_and_sickCert_online}</p>
                                        </Grid>
                                    </Grid>

                                    <Grid className="onlinSickCer">
                                        <Grid className="onlinSickContn">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="checkedB"
                                                        color="#00ABAF"
                                                        checked={weoffer && weoffer.Offer_online_sick_certificates ? true : false}
                                                        onChange={() => this.handleweoffer('Offer_online_sick_certificates')}
                                                    />
                                                }
                                                label={onine_sick_cert}
                                            />
                                        </Grid>

                                        <Grid className="onlinSickContn">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="checkedB"
                                                        color="#00ABAF"
                                                        checked={weoffer && weoffer.Offer_online_prescription ? true : false}
                                                        onChange={() => this.handleweoffer('Offer_online_prescription')}
                                                    />
                                                }
                                                label={online_prescription}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} checked={sencondSeviceData && sencondSeviceData.description == 'prescription'} onClick={(e) => { this.handlepaidService(e, 'sencondSeviceData') }} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="apointSchdule">
                                    <Grid><label>{appointments}</label></Grid>
                                    <p>{select_appointment_set_schedule}</p>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <Grid>
                                        <label>
                                            <Toggle icons={false} checked={holidayAppointment && holidayAppointment.holidays} onClick={(e) => { this.handleholiday('holidayAppointment') }} />
                                            <span className="holdyPeriod">{holiday_period_btw}</span>
                                        </label>
                                    </Grid>
                                    {holidayAppointment && holidayAppointment.holidays && <Grid className="enblDate">
                                        <RangePicker
                                            onChange={(date) => this.handleholidayDate('holidayAppointment', date)}
                                            defaultValue={[moment(holidayAppointment.holidays_start, this.props.settings.setting ? this.props.settings.setting.dateFormat : dateFormat), moment(holidayAppointment.holidays_end, this.props.settings.setting ? this.props.settings.setting.dateFormat : dateFormat)]}
                                            format={this.props.settings.setting ? this.props.settings.setting.dateFormat : dateFormat}
                                        />
                                        {/* <span>27/06/2020 - 15/07/2020
                                                                           <img src={require('../../../../assets/images/calIcon.png')} alt="" title="" />
                                        </span> */}
                                    </Grid>}
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
                                        <Grid><label>{appointment_system}</label></Grid>
                                        <p>{offer_practice_online_appointment} Aimedis</p>
                                    </Grid>
                                </Grid>
                                <Grid className="onlinSickVdo">
                                    <img src={require('../../../../assets/images/video-call-copy.svg')} className="vdoCalNow" alt="" title="" />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="checkedB"
                                                color="#00ABAF"
                                                checked={weoffer && weoffer.Offre_online_appointments ? true : false}
                                                onChange={() => this.handleweoffer('Offre_online_appointments')}
                                            />
                                        }
                                        label={vdo_call}
                                    />

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} checked={thirdServiceData && thirdServiceData.description == 'appointment'} onClick={(e) => { this.handlepaidService(e, 'thirdServiceData') }} /></label>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="wrkHourUpr">
                            <Grid container direction="row">
                                <Grid item xs={12} md={6}>
                                    <Grid className="wrkHour">
                                        <Grid><label>{set_online_working_hour}</label></Grid>
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
                                    <Grid className="dayScheduleUpr appointment">
                                        {onlineAppointments.monday_end && onlineAppointments.monday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>{monday}</label></Grid>
                                            <Grid>
                                                <TimeFormat name="time" value={onlineAppointments.monday_start ? this.getTime(onlineAppointments.monday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'monday')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={onlineAppointments.monday_end ? this.getTime(onlineAppointments.monday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'monday')} />
                                            </Grid>
                                            <Grid>
                                                <p onClick={() => this.copytoall('onlineAppointments', 'monday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                            </Grid>
                                        </Grid>}
                                        {onlineAppointments.tuesday_end && onlineAppointments.tuesday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>{tuseday}</label></Grid>
                                            <Grid>
                                                <TimeFormat name="time" value={onlineAppointments.tuesday_start ? this.getTime(onlineAppointments.tuesday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'tuesday')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={onlineAppointments.tuesday_end ? this.getTime(onlineAppointments.tuesday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'tuesday')} />
                                            </Grid>
                                            {onlineAppointments.monday_end == '' && <Grid>
                                                <p onClick={() => this.copytoall('onlineAppointments', 'tuesday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                            </Grid>}

                                        </Grid>}
                                        {onlineAppointments.wednesday_end && onlineAppointments.wednesday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{wednesday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={onlineAppointments.wednesday_start ? this.getTime(onlineAppointments.wednesday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'wednesday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={onlineAppointments.wednesday_end ? this.getTime(onlineAppointments.wednesday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'wednesday')} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('onlineAppointments', 'wednesday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.thursday_end && onlineAppointments.thursday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{thursday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={onlineAppointments.thursday_start ? this.getTime(onlineAppointments.thursday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'thursday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={onlineAppointments.thursday_end ? this.getTime(onlineAppointments.thursday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'thursday')} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('onlineAppointments', 'thursday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.friday_end && onlineAppointments.friday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{friday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={onlineAppointments.friday_start ? this.getTime(onlineAppointments.friday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'friday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={onlineAppointments.friday_end ? this.getTime(onlineAppointments.friday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'friday')} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && onlineAppointments.thursday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('onlineAppointments', 'friday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.saturday_end && onlineAppointments.saturday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{saturday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={onlineAppointments.saturday_start ? this.getTime(onlineAppointments.saturday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'saturday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={onlineAppointments.saturday_end ? this.getTime(onlineAppointments.saturday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'saturday')} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && onlineAppointments.thursday_end == '' && onlineAppointments.friday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('onlineAppointments', 'saturday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {onlineAppointments.sunday_end && onlineAppointments.sunday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{sunday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={onlineAppointments.sunday_start ? this.getTime(onlineAppointments.sunday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'sunday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={onlineAppointments.sunday_end ? this.getTime(onlineAppointments.sunday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'sunday')} />
                                                </Grid>
                                                {onlineAppointments.monday_end == '' && onlineAppointments.tuesday_end == '' && onlineAppointments.wednesday_end == '' && onlineAppointments.thursday_end == '' && onlineAppointments.friday_end == '' && onlineAppointments.saturday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('onlineAppointments', 'sunday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid className="nameSchedule"><label>{set_timeslot_duration}</label></Grid>
                                            <Grid className="nameSchedule">
                                                <input type="text" name="duration_of_timeslots" value={onlineAppointments.duration_of_timeslots} onChange={(e) => this.changeDuration(e, 'onlineAppointments')} /> {minutes}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule appointment">
                                            <Grid className="nameSchedule"><label>{break_time}</label></Grid>
                                            <Grid className="nameSchedule">
                                                <TimeFormat name="time" value={(onlineAppointments.breakslot_start||onlineAppointments.breakslot_start=='') ? this.getTime(onlineAppointments.breakslot_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'onlineAppointments', 'breakslot')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={onlineAppointments.breakslot_end ||onlineAppointments.breakslot_end==''? this.getTime(onlineAppointments.breakslot_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'onlineAppointments', 'breakslot')} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="apontBook">
                                        <Grid><label>{appointment_can_be_booked}</label></Grid>
                                        <Grid><p><span>{up_to_days},</span> <input type="text" onChange={(e) => this.onChangebook(e, 'appointment_days', 'onlineAppointments')} value={onlineAppointments.appointment_days} /> {before_day_of_appointment}</p></Grid>
                                        <Grid><p><span>{Max},</span> <input type="text" value={onlineAppointments.appointment_hours} onChange={(e) => this.onChangebook(e, 'appointment_hours', 'onlineAppointments')} /> {hourse_before_time_appointment}</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid className="instBrdr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className={changeText ? 'display-cls onlinSickVdo officVisit' : 'onlinSickVdo officVisit'}>
                                    <img src={require('../../../../assets/images/ShapeCopy21.svg')} className="vdoCalNow" alt="" title="" />
                                    {!changeText && <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="checkedB"
                                                color="#00ABAF"
                                                checked={weoffer && weoffer.Offer_office_prescription ? true : false}
                                                onChange={() => this.handleweoffer('Offer_office_prescription')}
                                            />
                                        }
                                        label={UpDataDetails.custom_text ? UpDataDetails.custom_text : ''}
                                    />}
                                    {changeText && <input type="text" value={UpDataDetails.custom_text} onChange={this.changeCustomtext} className="custom-text" />}
                                    {!changeText && <img src={require('../../../../assets/images/editBlue.png')} className="editPendata" alt="" title="" onClick={() => this.setState({ changeText: true, TempText: UpDataDetails['custom_text'] })} />}
                                    {changeText && <button className="save" onClick={this.saveText}> Save</button>}
                                    {changeText && <button onClick={() => this.setState({ changeText: false, TempText: '' })}>Cancel</button>}
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid> */}
                        </Grid>
                        <Grid className="wrkHourUpr">
                            <Grid container direction="row">
                                <Grid item xs={12} md={6}>
                                    <Grid className="wrkHour">
                                        <Grid><label>{set_working_hours}</label></Grid>
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
                                    <Grid className="dayScheduleUpr appointment">
                                        {UpDataDetails.monday_end && UpDataDetails.monday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>{monday}</label></Grid>
                                            <Grid>
                                                <TimeFormat name="time" value={UpDataDetails.monday_start ? this.getTime(UpDataDetails.monday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'monday')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={UpDataDetails.monday_end ? this.getTime(UpDataDetails.monday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'monday')} />
                                            </Grid>
                                            <Grid>
                                                <p onClick={() => this.copytoall('UpDataDetails', 'monday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                            </Grid>
                                        </Grid>}
                                        {UpDataDetails.tuesday_end && UpDataDetails.tuesday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>{tuseday}</label></Grid>
                                            <Grid>
                                                <TimeFormat name="time" value={UpDataDetails.tuesday_start ? this.getTime(UpDataDetails.tuesday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'tuesday')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={UpDataDetails.tuesday_end ? this.getTime(UpDataDetails.tuesday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'tuesday')} />
                                            </Grid>
                                            {UpDataDetails.monday_end == '' && <Grid>
                                                <p onClick={() => this.copytoall('UpDataDetails', 'tuesday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                            </Grid>}

                                        </Grid>}
                                        {UpDataDetails.wednesday_end && UpDataDetails.wednesday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{wednesday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={UpDataDetails.wednesday_start ? this.getTime(UpDataDetails.wednesday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'wednesday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={UpDataDetails.wednesday_end ? this.getTime(UpDataDetails.wednesday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'wednesday')} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('UpDataDetails', 'wednesday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.thursday_end && UpDataDetails.thursday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{thursday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={UpDataDetails.thursday_start ? this.getTime(UpDataDetails.thursday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'thursday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={UpDataDetails.thursday_end ? this.getTime(UpDataDetails.thursday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'thursday')} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('UpDataDetails', 'thursday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.friday_end && UpDataDetails.friday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{friday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={UpDataDetails.friday_start ? this.getTime(UpDataDetails.friday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'friday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={UpDataDetails.friday_end ? this.getTime(UpDataDetails.friday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'friday')} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && UpDataDetails.thursday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('UpDataDetails', 'friday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.saturday_end && UpDataDetails.saturday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{saturday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={UpDataDetails.saturday_start ? this.getTime(UpDataDetails.saturday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'saturday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={UpDataDetails.saturday_end ? this.getTime(UpDataDetails.saturday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'saturday')} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && UpDataDetails.thursday_end == '' && UpDataDetails.friday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('UpDataDetails', 'saturday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {UpDataDetails.sunday_end && UpDataDetails.sunday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{sunday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={UpDataDetails.sunday_start ? this.getTime(UpDataDetails.sunday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'sunday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={UpDataDetails.sunday_end ? this.getTime(UpDataDetails.sunday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'sunday')} />
                                                </Grid>
                                                {UpDataDetails.monday_end == '' && UpDataDetails.tuesday_end == '' && UpDataDetails.wednesday_end == '' && UpDataDetails.thursday_end == '' && UpDataDetails.friday_end == '' && UpDataDetails.saturday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('UpDataDetails', 'sunday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid className="nameSchedule"><label>{set_timeslot_duration}</label></Grid>
                                            <Grid className="nameSchedule">
                                                <input type="text" name="duration_of_timeslots" value={UpDataDetails.duration_of_timeslots} onChange={(e) => this.changeDuration(e, 'UpDataDetails')} /> {minutes}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule appointment">
                                            <Grid className="nameSchedule"><label>{break_time}</label></Grid>
                                            <Grid className="nameSchedule">
                                                <TimeFormat name="time" value={UpDataDetails.breakslot_start || UpDataDetails.breakslot_start=='' ? this.getTime(UpDataDetails.breakslot_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'UpDataDetails', 'breakslot')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={UpDataDetails.breakslot_end || UpDataDetails.breakslot_end=='' ? this.getTime(UpDataDetails.breakslot_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'UpDataDetails', 'breakslot')} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="apontBook">
                                        <Grid><label>{appointment_can_be_booked}</label></Grid>
                                        <Grid><p><span>{up_to_days},</span> <input type="text" onChange={(e) => this.onChangebook(e, 'appointment_days', 'UpDataDetails')} value={UpDataDetails.appointment_days} /> {before_day_of_appointment}</p></Grid>
                                        <Grid><p><span>{Max},</span> <input type="text" value={UpDataDetails.appointment_hours} onChange={(e) => this.onChangebook(e, 'appointment_hours', 'UpDataDetails')} /> {hourse_before_time_appointment}</p></Grid>
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
                                                checked={weoffer && weoffer.Offer_practice_appointment ? true : false}
                                                onChange={() => this.handleweoffer('Offer_practice_appointment')}
                                            />
                                        }
                                        label={Consultancy_custom_calendar}
                                    />

                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} md={6}>
                                <Grid className="enableTogle">
                                    <label><Toggle icons={false} /></label>
                                </Grid>
                            </Grid> */}
                        </Grid>
                        <Grid className="wrkHourUpr">
                            <Grid container direction="row">
                                <Grid item xs={12} md={6}>
                                    <Grid className="wrkHour">
                                        <Grid><label>{set_working_hours}</label></Grid>
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
                                    <Grid className="dayScheduleUpr appointment">
                                        {DaysforPractices.monday_end && DaysforPractices.monday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>{monday}</label></Grid>
                                            <Grid>
                                                <TimeFormat name="time" value={DaysforPractices.monday_start ? this.getTime(DaysforPractices.monday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'monday')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={DaysforPractices.monday_end ? this.getTime(DaysforPractices.monday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'monday')} />
                                            </Grid>
                                            <Grid>
                                                <p onClick={() => this.copytoall('DaysforPractices', 'monday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_to_all_time} </p>
                                            </Grid>
                                        </Grid>}
                                        {DaysforPractices.tuesday_end && DaysforPractices.tuesday_end !== '' && <Grid className="daySchedule">
                                            <Grid><label>{tuseday}</label></Grid>
                                            <Grid>
                                                <TimeFormat name="time" value={DaysforPractices.tuesday_start ? this.getTime(DaysforPractices.tuesday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'tuesday')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={DaysforPractices.tuesday_end ? this.getTime(DaysforPractices.tuesday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'tuesday')} />
                                            </Grid>
                                            {DaysforPractices.monday_end == '' && <Grid>
                                                <p onClick={() => this.copytoall('DaysforPractices', 'tuesday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                            </Grid>}

                                        </Grid>}
                                        {DaysforPractices.wednesday_end && DaysforPractices.wednesday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{wednesday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={DaysforPractices.wednesday_start ? this.getTime(DaysforPractices.wednesday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'wednesday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={DaysforPractices.wednesday_end ? this.getTime(DaysforPractices.wednesday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'wednesday')} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('DaysforPractices', 'wednesday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.thursday_end && DaysforPractices.thursday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{thursday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={DaysforPractices.thursday_start ? this.getTime(DaysforPractices.thursday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'thursday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={DaysforPractices.thursday_end ? this.getTime(DaysforPractices.thursday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'thursday')} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('DaysforPractices', 'thursday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.friday_end && DaysforPractices.friday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{friday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={DaysforPractices.friday_start ? this.getTime(DaysforPractices.friday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'friday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={DaysforPractices.friday_end ? this.getTime(DaysforPractices.friday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'friday')} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && DaysforPractices.thursday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('DaysforPractices', 'friday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.saturday_end && DaysforPractices.saturday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{saturday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={DaysforPractices.saturday_start ? this.getTime(DaysforPractices.saturday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'saturday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={DaysforPractices.saturday_end ? this.getTime(DaysforPractices.saturday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'saturday')} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && DaysforPractices.thursday_end == '' && DaysforPractices.friday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('DaysforPractices', 'saturday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                        {DaysforPractices.sunday_end && DaysforPractices.sunday_end !== '' &&
                                            <Grid className="daySchedule">
                                                <Grid><label>{sunday}</label></Grid>
                                                <Grid>
                                                    <TimeFormat name="time" value={DaysforPractices.sunday_start ? this.getTime(DaysforPractices.sunday_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'sunday')} />
                                                    <span>-</span>
                                                    <TimeFormat name="time" value={DaysforPractices.sunday_end ? this.getTime(DaysforPractices.sunday_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'sunday')} />
                                                </Grid>
                                                {DaysforPractices.monday_end == '' && DaysforPractices.tuesday_end == '' && DaysforPractices.wednesday_end == '' && DaysforPractices.thursday_end == '' && DaysforPractices.friday_end == '' && DaysforPractices.saturday_end == '' && <Grid>
                                                    <p onClick={() => this.copytoall('DaysforPractices', 'sunday')}><img src={require('../../../../assets/images/docscopy.svg')} alt="" title="" />
                                                                                    {copy_time_to_all} </p>
                                                </Grid>}
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule">
                                            <Grid className="nameSchedule"><label>{set_timeslot_duration}</label></Grid>
                                            <Grid className="nameSchedule">
                                                <input type="text" name="duration_of_timeslots" value={DaysforPractices.duration_of_timeslots} onChange={(e) => this.changeDuration(e, 'DaysforPractices')} /> {minutes}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="setScheduleUpr">
                                        <Grid className="setSchedule appointment">
                                            <Grid className="nameSchedule"><label>{break_time}</label></Grid>
                                            <Grid className="nameSchedule">
                                                <TimeFormat name="time" value={DaysforPractices.breakslot_start || DaysforPractices.breakslot_start ==='' ? this.getTime(DaysforPractices.breakslot_start) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'start', 'DaysforPractices', 'breakslot')} />
                                                <span>-</span>
                                                <TimeFormat name="time" value={DaysforPractices.breakslot_end || DaysforPractices.breakslot_end ==='' ? this.getTime(DaysforPractices.breakslot_end) : new Date()} time_format={this.props.settings && this.props.settings.setting && this.props.settings.setting.time_format} onChange={(e) => this.onChange(e, 'end', 'DaysforPractices', 'breakslot')} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="apontBook">
                                        <Grid><label>{appointment_can_be_booked}</label></Grid>
                                        <Grid><p><span>{up_to_days},</span> <input type="text" onChange={(e) => this.onChangebook(e, 'appointment_days', 'DaysforPractices')} value={DaysforPractices.appointment_days} />{before_day_of_appointment}</p></Grid>
                                        <Grid><p><span>{Max},</span> <input type="text" value={DaysforPractices.appointment_hours} onChange={(e) => this.onChangebook(e, 'appointment_hours', 'DaysforPractices')} /> {hourse_before_time_appointment}</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Grid item xs={12} md={6} className="savChngsBtn">
                            <input type="submit" value={save_change} onClick={this.saveAllData} />
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