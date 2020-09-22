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
        };
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

    handleOpenFancyVdo = () => {
        this.setState({ openFancyVdo: true });
    };
    handleCloseFancyVdo = () => {
        this.setState({ openFancyVdo: false });
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

    // find appointment by location or speciality
    getlocation() {
        console.log("Get location response")
        let radius, Latitude, longitude
        if (this.state.searchDetails.radius) {
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
                longitude: longitude,
                Latitude: Latitude
            }
        })
            .then((responce) => {
                console.log("Get location response", responce)
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
                // () => this.findAppointment('tab2'))
                this.setState({ mapMarkers: markerArray });
                this.setState({ selectedListArray: selectedListArray });
            })
        // }
    }

    handleOpenApoint = () => {
        this.setState({ openApoint: true });
    };
    handleCloseApoint = () => {
        this.setState({ openApoint: false });
    };
    handleChangeSelect = selectedOption => {
        this.setState({ selectedOption });
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
    onChange = date => this.setState({ date })

    render() {
        const { selectedOption, specialityData } = this.state;
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
                                                    <span>Appointments</span>
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
                                                <Grid className="selCalender"><Calendar onChange={this.onChange} value={this.state.date} /></Grid>
                                                <Grid className="selTimeSlot">
                                                    <Grid><label>Select time slot</label></Grid>
                                                    <Grid className="selTimeAM">
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
                                                    </Grid>
                                                </Grid>
                                                <Grid className="delQues">
                                                    <Grid><label>Details / Questions</label></Grid>
                                                    <Grid><textarea></textarea></Grid>
                                                    <Grid className="delQuesBook"><a>Book</a> <a>Cancel</a></Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Modal>
                                {/* End of Video Model */}
                                <Grid item xs={12} md={3}>
                                    <Grid className="apointUpcom">
                                        <h4>Upcoming appointments</h4>

                                        <Grid className="officeVst">
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>7 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" /> Office visit</a>
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
                                                            <a><img src={require('../../../assets/images/cancelAppoint.jpg')} alt="" title="" />Cancel appointment</a>
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
                                                    <a onclick={this.handleOpenFancyVdo}><img src={require('../../../assets/images/video-call.svg')} alt="" title="" /> Video call</a>
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
                                                    <a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" /> Office visit</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="shwAppoints">
                                            <p><a>Show past appointments</a></p>
                                            <p><a onClick={this.handleOpenApoint}>Cancel appointments</a></p>
                                        </Grid>

                                        {/* Cancel appointment */}
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
                                                    <Grid><label>Cancel appointment</label></Grid>
                                                    <p>Please write a short explanation of why you have to cancel the appointment. Thank you.</p>
                                                </Grid>
                                                <Grid className="apontDragCntnt">
                                                    <Grid>
                                                        <Grid><label>Short message</label></Grid>
                                                        <Grid><textarea></textarea></Grid>
                                                        <Grid><input type="submit" value="Cancel appointment" /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Cancel appointment */}

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={8}>
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
                                                                {/* <a onClick={this.handleOpenFancy}>+ Arrange an appointment</a> */}
                                                                <a onClick={this.handleAllowAccess}>+ Arrange an appointment</a>
                                                            </Grid>

                                                            {/* Cancel appointment Model */}
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
                                                                        <div><label>Cancel appointment</label></div>
                                                                        <p>Please write a short explanation of why you have to cancel
                                                                           the appointment. Thank you.</p>
                                                                    </div>
                                                                    <div className="apointMsg">
                                                                        <div><label>Short message</label></div>
                                                                        <div><textarea></textarea></div>
                                                                        <div><input type="submit" value="Cancel appointment" /></div>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                            {/* End of Cancel appointment Model */}

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
                                                            <Grid className="todaySrchRght">
                                                                <a className="syncRght">Sync to your calendar</a>
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
                                                                                    <Grid><label>Specialty</label></Grid>
                                                                                    <Select
                                                                                        value={selectedOption}
                                                                                        onChange={this.handleChangeSelect}
                                                                                        options={specialityData}
                                                                                        placeholder="Select specialty"
                                                                                        className="sel_specialty"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3} className="locat_srvc">
                                                                                    <Grid><label>Location of service</label></Grid>
                                                                                    <input type="text" placeholder="Search for city" />
                                                                                    <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={2} className="srchKm">
                                                                                    <Grid><label>Search within</label></Grid>
                                                                                    <input type="text" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} className="apointType">
                                                                                    <Grid><label>Appointment type</label></Grid>
                                                                                    <FormControlLabel control={<Checkbox name="Video" />} label="Video" />
                                                                                    <FormControlLabel control={<Checkbox name="Office" />} label="Office" />
                                                                                </Grid>
                                                                            </Grid>
                                                                            <div className="showSpcial"><p><img src={require('../../../assets/images/location.png')} alt="" title="" />We are showing you specialists near “Düsseldorf, Germany” in 100km range</p></div>
                                                                        </div>

                                                                        {/* New Design */}
                                                                        <div className="allowAvailList">

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
                                                                                                <a  onclick={this.handleOpenFancyVdo}><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />Video call</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />Office visit</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</a>
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
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />Video call</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />Office visit</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</a>
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
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />Video call</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />Office visit</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</a>
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
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />Video call</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />Office visit</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</a>
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
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />Video call</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />Office visit</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</a>
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
                                                                                                <a><img src={require('../../../assets/images/video-call-copy2.svg')} alt="" title="" />Video call</a>
                                                                                                <a><img src={require('../../../assets/images/ShapeCopy2.svg')} alt="" title="" />Office visit</a>
                                                                                                <a className="addClnder"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</a>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </div>


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
                                                                                    <Grid><label>Specialty</label></Grid>
                                                                                    <Select
                                                                                        value={selectedOption}
                                                                                        onChange={this.handleChangeSelect}
                                                                                        options={specialityData}
                                                                                        placeholder="Select specialty"
                                                                                        className="sel_specialty"
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3} className="locat_srvc">
                                                                                    <Grid><label>Location of service</label></Grid>
                                                                                    <input type="text" placeholder="Search for city" />
                                                                                    <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={2} className="srchKm">
                                                                                    <Grid><label>Search within</label></Grid>
                                                                                    <input type="text" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={4} className="apointType">
                                                                                    <Grid><label>Appointment type</label></Grid>
                                                                                    <FormControlLabel control={<Checkbox name="Video" />} label="Video" />
                                                                                    <FormControlLabel control={<Checkbox name="Office" />} label="Office" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </div>
                                                                        <div className="allowAccessList">
                                                                            <div><a><img src={require('../../../assets/images/location.png')} alt="" title="" /></a></div>
                                                                            <h1>Allow location access</h1>
                                                                            <p>This way we can instantly show you a list of specialists.</p>
                                                                        </div>
                                                                        <div style={{ textAlign: "center" }} className="arng_addEntrynw">
                                                                            <a onClick={this.handleAllowLoc}>Find Appointment</a>
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
                                                                                <h1>Allow location access</h1>
                                                                                <p>This way we can instantly show you a list of specialists.</p>
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
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(GoogleApiWrapper({
    apiKey: 'AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4'
})(Index)));