import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from '@material-ui/core/Modal';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { withRouter } from "react-router-dom";
import CometChat from '../../Components/CometChat';
import { LanguageFetchReducer } from './../../actions';
import { LoginReducerAim } from './../../Login/actions';
import { connect } from "react-redux";
import { Settings } from './../../Login/setting';
import Geocode from "react-geocode";
import LeftMenu from "../../Components/Menus/PatientLeftMenu/index";
import axios from "axios"
import sitedata from "../../../sitedata"
import Autocomplete from './Autocomplete';
import translationEN from '../../../translations/en_json_proofread_13072020.json'


const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            openDash: false,
            date: new Date(),
            openFancy: false,
            openAllowAccess: false,
            selectedOption: null,
            openAllowLoc: false,
            openApoint: false,
            openFancyVdo: false,
            searchDetails: {},
            appointmentData: {},
            successfull: false,
            UpDataDetails: [],
            video_call: true,
            office_visit: true
        };
        this.bookAppointment = this.bookAppointment.bind(this)
        this.apointmentType = this.apointmentType.bind(this)
    }
    componentDidMount() {
        this.getGeoLocation()
        this.patientinfo()
        this.getMetadata()
    }
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({ clat: position.coords.latitude })
                this.setState({ clng: position.coords.longitude })
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
        setTimeout(this.onChange, 3000)
        // this.onChange()
    };
    handleCloseFancyVdo = () => {
        this.setState({ openFancyVdo: false, appointDate: [] });
        Object.keys(this.state.allDocData).map((index, i) => {
            console.log("ALL DOC data", index, i)
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
    getMetadata() {
        axios.get(sitedata.data.path + '/UserProfile/Metadata')
            .then((responce) => {
                let specialityData = []
                responce.data[0].speciality && responce.data[0].speciality.map(spec => {
                    specialityData.push({ value: spec.value, label: spec.title })
                })
                this.setState({
                    specialityData: specialityData
                });
            })
        // this.setState({
        //     specialityData : speciality.speciality
        // });
    }

    // findAppointment
    findAppointment = (tab, doc_select, apointType, apointDay, iA) => {
        apointType = apointType.replace(/['"]+/g, '')
        this.setState({
            findDoc: tab, selectedDoc: this.state.allDocData[doc_select],
            mypoint: {
                start: this.state.allDocData[doc_select][apointType][0][apointDay][iA],
                end: this.state.allDocData[doc_select][apointType][0][apointDay][iA + 1],
                type: apointType
            }
        })
    }


    questionDetails = (e) => {
        const state = this.state.UpDataDetails;
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
    }

    bookAppointment() {
        var insurance_no = this.state.personalinfo.insurance && this.state.personalinfo.insurance.length > 0 && this.state.personalinfo.insurance[0] && this.state.personalinfo.insurance[0].insurance_number ? this.state.personalinfo.insurance[0].insurance_number : '';
        this.setState({ loaderImage: true });
        const user_token = this.props.stateLoginValueAim.token;
        axios.post(sitedata.data.path + '/User/appointment', {
            patient: this.props.stateLoginValueAim.user._id,
            doctor_id: this.state.selectedDoc.data._id,
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
                patient_id: this.state.selectedDoc.data.profile_id,
                first_name: this.state.selectedDoc.data.first_name,
                last_name: this.state.selectedDoc.data.last_name,
                email: this.state.selectedDoc.data.email,
                birthday: this.state.selectedDoc.data.birthday,
                profile_image: this.state.selectedDoc.data.image
            }
        })
            .then((responce) => {
                this.setState({ loaderImage: false });
                if (responce.data.hassuccessed === true) {
                    this.setState({ successfull: true })
                    setTimeout(
                        function () {
                            this.setState({ successfull: false, openFancyVdo: false });
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
            alert("please enter city")
        }
        // if (radius && Latitude && longitude) {
        axios.get(sitedata.data.path + '/UserProfile/getLocation/' + radius, {
            params: {
                speciality: this.state.searchDetails.specialty,
                longitude: 77.45375779999999,
                Latitude: 28.6691565
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
    showPlaceDetails(place) {
        place = place.geometry.location
        this.setState({ place });
        this.setState({ mLatitude: place.lat() });
        this.setState({ mlongitude: place.lng() });
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

    apointmentType(event) {
        if (event.target.name == "Video") {
            this.setState({ video_call: this.state.video_call == true ? false : true })
        } else if (event.target.name == "Office") {
            this.setState({ office_visit: this.state.office_visit == true ? false : true })
        }
    }

    handleOpenApoint = () => {
        this.setState({ openApoint: true });
    };
    handleCloseApoint = () => {
        this.setState({ openApoint: false });
    };
    handleChangeSelect = selectedOption => {
        let searchDetails = this.state.searchDetails
        searchDetails["specialty"] = selectedOption.value
        console.log("selectedOption", selectedOption)
        this.setState({ selectedOption: selectedOption, searchDetails: searchDetails });
    };
    handleAllowLoc = () => {
        this.getlocation()
        this.setState({ openAllowLoc: true });
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
        this.setState({ openAllowAccess: true });
    };
    handleCloseAllowAccess = () => {
        this.setState({ openAllowAccess: false });
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
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
        console.log("day_num", day_num)
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
        Object.entries(appointmentData).map(([key, value]) => {
            if (key == days) {
                appointDate = value
            }
        })
        this.setState({ appointDate: appointDate, apointDay: days, selectedDate: date1 })
    }

    render() {
        const { selectedOption, specialityData, allDocData, date, doc_select, appointType, apointDay } = this.state;
        let translate;
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
        let { slct_time_slot, holiday, Details, Questions, cancel, book, appointment_booked, upcming_apointment, office_visit, cancel_apointmnt, show_past_apointment,
            plz_write_short_explnation, short_msg, appointments, appointment, arrng_apointmnt, today, sync_ur_calander, speciality, search_within, Video, Office, type,
            Contact, Services, latest_info, see_avlbl_date, location_of_srvc, this_way_can_instntly_list_of_specility, find_apointment, consultancy_cstm_calnder, vdo_call, allow_location_access, profile_info, profile, information, ID, pin, QR_code, done, Change, edit_id_pin, edit, and, is, changed, profile_id_taken, profile_id_greater_then_5,
        } = translate;


        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                <LeftMenu />
                                {/* Website Menu */}
                                {/* <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <Grid className="webLogo">
                                        <a href="/"><img src={require('../../../assets/images/logo_new.png')} alt="" title="" /></a>
                                    </Grid>
                                    <Grid className="menuItems">
                                        <ul>
                                            <li>
                                                <a className="menuActv">
                                                    <img src={require('../../../assets/images/nav-journal.svg')} alt="" title="" />
                                                    <span>Journal</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/inbox">
                                                    <img src={require('../../../assets/images/nav-chat.svg')} alt="" title="" />
                                                    <span>Chat & <br /> Videocalls</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/appointment">
                                                    <img src={require('../../../assets/images/nav-appointments.svg')} alt="" title="" />
                                                    <span>{appointments}</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/mydocuments">
                                                    <img src={require('../../../assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />
                                                    <span>My Documents</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/trackerselfdata">
                                                    <img src={require('../../../assets/images/nav-trackers.svg')} alt="" title="" />
                                                    <span>Trackers & <br /> Self Data</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="moreMenu">
                                                    <img src={require('../../../assets/images/nav-more.svg')} alt="" title="" />
                                                    <span>More</span>

                                                    <div className="moreMenuList">
                                                        <ul>
                                                            <li><a href="/secondopinion"><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                                            <li><a href="emergencypatientdata"><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                                            <li><a><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                                            <li><a href="/extraservices"><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                                            <li><a href="/journalarchive"><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                                            <li><a href="/blockchainaccesslog"><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                                        </ul>
                                                    </div>
                                                </a>

                                            </li>
                                            <li>
                                                <a className="profilMenu" href="/myprofile">
                                                    <img src={require('../../../assets/images/nav-my-profile.svg')} alt="" title="" />
                                                    <span>My Profile</span>

                                                    <div className="profilMenuList">
                                                        <ul>
                                                            <li><a><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                                            <li><a><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                                            <li><a><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                                            <li><a><img src={require('../../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                                        </ul>
                                                    </div>

                                                </a>
                                            </li>
                                        </ul>
                                    </Grid>
                                </Grid>
                                 */}
                                {/* End of Website Menu */}
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
                                                    <Calendar onChange={this.onChange} value={this.state.date} />
                                                </Grid>
                                                <Grid className="selTimeSlot">
                                                    <Grid><label>{slct_time_slot}</label></Grid>
                                                    <Grid className="selTimeAM">
                                                        {this.state.appointDate && this.state.appointDate.length > 0 ? this.state.appointDate.map((data, iA) => {
                                                            return (
                                                                <Grid>
                                                                    {this.state.appointDate[iA + 1] && this.state.appointDate[iA + 1] !== 'undefined' &&
                                                                        <a onClick={() => { this.findAppointment('tab3', doc_select, appointType, apointDay, iA) }}>
                                                                            {this.state.appointDate[iA] + ' - ' + this.state.appointDate[iA + 1]}
                                                                        </a>}
                                                                </Grid>
                                                            );
                                                        }) : this.state.appointDate !== undefined ?
                                                                <Grid><span>{holiday}!</span></Grid> : ''
                                                        }
                                                    </Grid>
                                                    {/* <Grid className="selTimeAM">
                                                        <Grid><span>AM</span></Grid>
                                                        <Grid><a>09:00 - 09:30</a></Grid>
                                                        <Grid><a>09:30 - 10:00</a></Grid>
                                                        <Grid><a>10:00 - 10:30</a></Grid>
                                                        <Grid><a>10:30 - 11:00</a></Grid>
                                                    </Grid>
                                                    <Grid className="selTimePM">
                                                        <Grid><span>PM</span></Grid>
                                                        <Grid><a>01:00 - 01:30</a></Grid>
                                                        <Grid><a>01:30 - 02:00</a></Grid>
                                                        <Grid><a>02:00 - 02:30</a></Grid>
                                                        <Grid><a>02:30 - 03:00</a></Grid>
                                                    </Grid> */}
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
                                        {this.state.successfull && <div className="success_message">{appointment_booked}</div>}
                                    </Grid>
                                </Modal>
                                {/* End of Video Model */}
                                <Grid item xs={12} md={3}>
                                    <Grid className="apointUpcom">
                                        <h4>{upcming_apointment}</h4>

                                        <Grid className="officeVst">
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>7 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" /> {office_visit}</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Neurology</h3>
                                                <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="officeVst">
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>7 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a className="showDetail">
                                                        <img src={require('../../../assets/images/threedots.jpg')} alt="" title="" />
                                                        <Grid className="cancelAppoint">
                                                            <a><img src={require('../../../assets/images/cancelAppoint.jpg')} alt="" title="" />{cancel_apointmnt}</a>
                                                        </Grid>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="officeVst">
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>9 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a onClick={this.handleOpenFancyVdo}><img src={require('../../../assets/images/video-call.svg')} alt="" title="" /> {vdo_call}</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="officeVst">
                                            <Grid className="pendConfirm">
                                                <p><img src={require('../../../assets/images/yelowBullet.jpg')} alt="" title="" />
                                                    Pending confirmation</p>
                                            </Grid>
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>7 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" /> {office_visit}</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="shwAppoints">
                                            <p><a>{show_past_apointment}</a></p>
                                            <p><a onClick={this.handleOpenApoint}>{cancel_apointmnt}s</a></p>
                                        </Grid>

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
                                                        <Grid><textarea></textarea></Grid>
                                                        <Grid><input type="submit" value={cancel_apointmnt} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of {cancel_apointmnt} */}

                                    </Grid>
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

                                                            {/* {cancel_apointmnt} Model */}
                                                            <Modal
                                                                open={this.state.openFancy}
                                                                onClose={this.handleCloseFancy}
                                                                className="fancyBoxModel">
                                                                <div className="fancyBoxCncl">
                                                                    <div className="cnclCourse">
                                                                        <div className="handleCnclBtn">
                                                                            <a onClick={this.handleCloseFancy}>
                                                                                <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                            </a>
                                                                        </div>
                                                                        <div><label>{cancel_apointmnt}</label></div>
                                                                        <p>{plz_write_short_explnation}</p>
                                                                    </div>
                                                                    <div className="apointMsg">
                                                                        <div><label>{short_msg}</label></div>
                                                                        <div><textarea></textarea></div>
                                                                        <div><input type="submit" value={cancel_apointmnt} /></div>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                            {/* End of {cancel_apointmnt} Model */}

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
                                                            <Grid className="todaySrchLft"><label>{today}</label></Grid>
                                                            <Grid className="movMnth">
                                                                <a><img src={require('../../../assets/images/leftArow.jpg')} alt="" title="" /></a>
                                                                <a><img src={require('../../../assets/images/rightArow.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                            <Grid className="crntMonth">Augest 2020</Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="todaySrchRght">
                                                                <a className="syncRght">{sync_ur_calander}</a>
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
                                                                                    <input type="text" placeholder="Search for city" />
                                                                                    {/* <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} /> */}
                                                                                    <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={2} className="srchKm">
                                                                                    <Grid><label>{search_within}</label></Grid>
                                                                                    <input type="text" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} className="apointType">
                                                                                    <Grid><label>{appointment} {type}</label></Grid>
                                                                                    <FormControlLabel control={this.state.video_call ? <Checkbox checked onClick={this.apointmentType} name="Video" /> : <Checkbox onClick={this.apointmentType} name="Video" />} label={Video} />
                                                                                    <FormControlLabel control={this.state.office_visit ? <Checkbox checked name="Office" onClick={this.apointmentType} /> : <Checkbox name="Office" onClick={this.apointmentType} />} label={Office} />
                                                                                </Grid>
                                                                            </Grid>
                                                                            <div className="showSpcial"><p><img src={require('../../../assets/images/location.png')} alt="" title="" />We are showing you specialists near “Düsseldorf, Germany” in 100km range</p></div>
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
                                                                                            {doc.data && doc.data.speciality && doc.data.speciality.length > 0 && doc.data.speciality.map(spec => (
                                                                                                <Grid className="nuroDr">
                                                                                                    <label>{spec}</label>
                                                                                                    <p>Neurodegerenative diseases</p>
                                                                                                </Grid>
                                                                                            ))}

                                                                                            {/* <Grid className="nuroDr">
                                                                                                <label>NEUROLOGY</label>
                                                                                                <p>Neurodegerenative diseases</p>
                                                                                            </Grid> */}
                                                                                        </Grid>
                                                                                        <Grid item xs={12} md={5}>
                                                                                            <Grid className="srvcTagsCntnt">
                                                                                                <Grid className="srvcTags"> <a>{Contact}</a> <a>{Services}</a> <a>{latest_info}</a> </Grid>
                                                                                                <Grid className="srvcTagsLoc">
                                                                                                    <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.city && doc.data.city}</a>
                                                                                                    <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.mobile && doc.data.mobile}</a>
                                                                                                    <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.email && doc.data.email}</a>
                                                                                                    <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                        {doc.data && doc.data.language && doc.data.language.length > 0 && doc.data.language.join(", ")}</a>
                                                                                                </Grid>
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


                                                                            {/* <div className="allowAvailListIner">
                                                                                <Grid container direction="row" spacing={1}>
                                                                                    <Grid item xs={12} md={3}>
                                                                                        <Grid className="spclistDr">
                                                                                            <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                                                Mark Anderson M.D.
                                                                                      </a>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={5}>
                                                                                        <Grid className="srvcTagsCntnt">
                                                                                            <Grid className="srvcTags"> <a>Contact</a> <a>Services</a> <a>Latest info</a> </Grid>
                                                                                            <Grid className="srvcTagsLoc">
                                                                                                <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                    Sint Michaëlstraat 4, 5935 BL Steyl, Netherlands</a>
                                                                                                <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                    01731508000</a>
                                                                                                <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                    doctor1@aimedis.com</a>
                                                                                                <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                    English, Dutch, French, German, Arabic</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={4}>
                                                                                        <Grid className="avlablDates">
                                                                                            <h3>SEE AVAILABLE DATES FOR:</h3>
                                                                                            <Grid>
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />{vdo_call}</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />{office_visit}</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder}</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>

                                                                            <div className="allowAvailListIner">
                                                                                <Grid container direction="row" spacing={1}>
                                                                                    <Grid item xs={12} md={3}>
                                                                                        <Grid className="spclistDr">
                                                                                            <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                                                Mark Anderson M.D.
                                                                                      </a>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={5}>
                                                                                        <Grid className="srvcTagsCntnt">
                                                                                            <Grid className="srvcTags"> <a>Contact</a> <a>Services</a> <a>Latest info</a> </Grid>
                                                                                            <Grid className="srvcTagsLoc">
                                                                                                <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                    Sint Michaëlstraat 4, 5935 BL Steyl, Netherlands</a>
                                                                                                <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                    01731508000</a>
                                                                                                <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                    doctor1@aimedis.com</a>
                                                                                                <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                    English, Dutch, French, German, Arabic</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={4}>
                                                                                        <Grid className="avlablDates">
                                                                                            <h3>SEE AVAILABLE DATES FOR:</h3>
                                                                                            <Grid>
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />{vdo_call}</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />{office_visit}</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder}</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>

                                                                            <div className="allowAvailListIner">
                                                                                <Grid container direction="row" spacing={1}>
                                                                                    <Grid item xs={12} md={3}>
                                                                                        <Grid className="spclistDr">
                                                                                            <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                                                Mark Anderson M.D.
                                                                                      </a>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={5}>
                                                                                        <Grid className="srvcTagsCntnt">
                                                                                            <Grid className="srvcTags"> <a>Contact</a> <a>Services</a> <a>Latest info</a> </Grid>
                                                                                            <Grid className="srvcTagsLoc">
                                                                                                <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                    Sint Michaëlstraat 4, 5935 BL Steyl, Netherlands</a>
                                                                                                <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                    01731508000</a>
                                                                                                <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                    doctor1@aimedis.com</a>
                                                                                                <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                    English, Dutch, French, German, Arabic</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={4}>
                                                                                        <Grid className="avlablDates">
                                                                                            <h3>SEE AVAILABLE DATES FOR:</h3>
                                                                                            <Grid>
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />{vdo_call}</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />{office_visit}</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder}</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>

                                                                            <div className="allowAvailListIner">
                                                                                <Grid container direction="row" spacing={1}>
                                                                                    <Grid item xs={12} md={3}>
                                                                                        <Grid className="spclistDr">
                                                                                            <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                                                Mark Anderson M.D.
                                                                                      </a>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={5}>
                                                                                        <Grid className="srvcTagsCntnt">
                                                                                            <Grid className="srvcTags"> <a>Contact</a> <a>Services</a> <a>Latest info</a> </Grid>
                                                                                            <Grid className="srvcTagsLoc">
                                                                                                <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                    Sint Michaëlstraat 4, 5935 BL Steyl, Netherlands</a>
                                                                                                <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                    01731508000</a>
                                                                                                <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                    doctor1@aimedis.com</a>
                                                                                                <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                    English, Dutch, French, German, Arabic</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={4}>
                                                                                        <Grid className="avlablDates">
                                                                                            <h3>SEE AVAILABLE DATES FOR:</h3>
                                                                                            <Grid>
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />{vdo_call}</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />{office_visit}</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder}</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>

                                                                            <div className="allowAvailListIner">
                                                                                <Grid container direction="row" spacing={1}>
                                                                                    <Grid item xs={12} md={3}>
                                                                                        <Grid className="spclistDr">
                                                                                            <a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                                                Mark Anderson M.D.
                                                                                      </a>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                        <Grid className="nuroDr">
                                                                                            <label>NEUROLOGY</label>
                                                                                            <p>Neurodegerenative diseases</p>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={5}>
                                                                                        <Grid className="srvcTagsCntnt">
                                                                                            <Grid className="srvcTags"> <a>Contact</a> <a>Services</a> <a>Latest info</a> </Grid>
                                                                                            <Grid className="srvcTagsLoc">
                                                                                                <a><img src={require('../../../assets/images/location-pin.svg')} alt="" title="" />
                                                                                                    Sint Michaëlstraat 4, 5935 BL Steyl, Netherlands</a>
                                                                                                <a><img src={require('../../../assets/images/phone.svg')} alt="" title="" />
                                                                                                    01731508000</a>
                                                                                                <a><img src={require('../../../assets/images/email.svg')} alt="" title="" />
                                                                                                    doctor1@aimedis.com</a>
                                                                                                <a><img src={require('../../../assets/images/language.svg')} alt="" title="" />
                                                                                                    English, Dutch, French, German, Arabic</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={4}>
                                                                                        <Grid className="avlablDates">
                                                                                            <h3>SEE AVAILABLE DATES FOR:</h3>
                                                                                            <Grid>
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />{vdo_call}</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />{office_visit}</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />{consultancy_cstm_calnder}</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div> */}


                                                                        </div>
                                                                        {/* End of New Design */}

                                                                    </div>
                                                                </Modal>
                                                                {/* End of Allow Location Access */}


                                                                <a>
                                                                    <img src={require('../../../assets/images/topicSrch.jpg')} alt="" title="" />
                                                                </a>
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
                                                                                    <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
                                                                                    <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={2} className="srchKm">
                                                                                    <Grid><label>{search_within}</label></Grid>
                                                                                    <input type="text" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} className="apointType">
                                                                                    <Grid><label>{appointment} {type}</label></Grid>
                                                                                    <FormControlLabel control={this.state.video_call ? <Checkbox checked onClick={this.apointmentType} name="Video" /> : <Checkbox onClick={this.apointmentType} name="Video" />} label="Video" />
                                                                                    <FormControlLabel control={this.state.office_visit ? <Checkbox checked name="Office" onClick={this.apointmentType} /> : <Checkbox name="Office" onClick={this.apointmentType} />} label="Office" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </div>
                                                                        <div className="allowAccessList">
                                                                            <div><a><img src={require('../../../assets/images/location.png')} alt="" title="" /></a></div>
                                                                            <h1>{allow_location_access}</h1>
                                                                            <p>{this_way_can_instntly_list_of_specility}</p>
                                                                        </div>
                                                                        <div style={{ textAlign: "center" }} className="arng_addEntrynw">
                                                                            <a onClick={this.handleAllowLoc}>{find_apointment}</a>
                                                                        </div>
                                                                        {/* {this.state.clat || this.state.mLatitude ?
                                                                            <div>
                                                                                <Map
                                                                                    google={this.props.google}
                                                                                    center={this.state.mLatitude ? { lat: this.state.mLatitude, lng: this.state.mlongitude } : { lat: this.state.clat, lng: this.state.clng }}
                                                                                    initialCenter={{
                                                                                        lat: this.state.clat,
                                                                                        lng: this.state.clan
                                                                                    }}
                                                                                    zoom={2}

                                                                                ></Map>
                                                                            </div>
                                                                            : <div className="allowAccessList">
                                                                                <div><a><img src={require('../../../assets/images/location.png')} alt="" title="" /></a></div>
                                                                                <h1>{allow_location_access}</h1>
                                                                                <p>{this_way_can_instntly_list_of_specility}</p>
                                                                            </div>} */}
                                                                    </div>
                                                                </Modal>
                                                                {/* End of Allow Location Access */}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="getCalapoint">
                                            <Calendar onChange={this.onChange} value={this.state.date} />
                                        </Grid>

                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
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
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(GoogleApiWrapper({
    apiKey: 'AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4'
})(Index)));