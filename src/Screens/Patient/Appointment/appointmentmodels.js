import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from '@material-ui/core/Modal';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DatePicker from 'react-date-picker';

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
            openMeet: false,
            openCal: false
        };
    }

    handleOpenCal = () => {
        this.setState({ openCal: true });
    };
    handleCloseCal = () => {
        this.setState({ openCal: false });
    };
    handleOpenMeet = () => {
        this.setState({ openMeet: true });
    };
    handleCloseMeet = () => {
        this.setState({ openMeet: false });
    };
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
        const { selectedOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
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
                                {/* End of Website Menu */}

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
                                                    <a><img src={require('../../../assets/images/video-call.svg')} alt="" title="" /> Video call</a>
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
                                            <p><a onClick={this.handleOpenMeet}>UI - Doctor - Appointments (Calendar)</a></p>
                                            <p><a onClick={this.handleOpenCal}>UI - Doctor - Appointments (Calendar - New Appointment)</a></p>
                                        </Grid>

                                        {/* Appointments (Calendar - New Appointment) */}
                                        <Modal
                                            open={this.state.openCal}
                                            onClose={this.handleCloseCal}>
                                            <Grid className="apontBoxCntnt">
                                                <Grid className="apontCourse">
                                                    <Grid className="apontCloseBtn">
                                                        <a onClick={this.handleCloseCal}>
                                                            <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <Grid><label>New appointment</label></Grid>
                                                </Grid>
                                                <Grid className="apointReason">
                                                    <Grid className="reasonInput">
                                                        <Grid><label>Find patient</label></Grid>
                                                        <Grid className="reasonInputImg"><input type="text" placeholder="Enter patient name or ID" />
                                                            <img src={require('../../../assets/images/search-entries.svg')} alt="" title="" />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="reasonInput">
                                                        <Grid><label>Appointment reason</label></Grid>
                                                        <Grid className="reasonInputImg"><input type="text" /></Grid>
                                                    </Grid>
                                                    <Grid container direction="row" className="addBirth">
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
                                                            <Grid container direction="row" className="addTimes">
                                                                <Grid item xs={5} md={5}><input type="text" value="08:45" /></Grid>
                                                                <Grid item xs={2} md={2} className="addTimesHypn"><span>-</span></Grid>
                                                                <Grid item xs={5} md={5}><input type="text" value="09:10" /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="acptVdoCalsUpr">
                                                        <Grid className="acptVdoCals">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="#00ABAF"
                                                                    />
                                                                }
                                                            />
                                                            <span className="acptTxt"><img src={require('../../../assets/images/video-call-copy.svg')} alt="" title="" />Video call</span>
                                                        </Grid>
                                                        <Grid className="acptVdoCals">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="#00ABAF"
                                                                    />
                                                                }
                                                            />
                                                            <span className="acptTxt"><img src={require('../../../assets/images/ShapeCopy24.svg')} alt="" title="" />Office visit</span>
                                                        </Grid>
                                                        <Grid className="acptVdoCals">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="#00ABAF"
                                                                    />
                                                                }
                                                            />
                                                            <span className="acptTxt cstmCalc"><img src={require('../../../assets/images/cal.png')} alt="" title="" />Consultancy (custom calendar)</span>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="calcSub">
                                                        <input type="submit" value="Save" />
                                                        <input type="reset" value="Cancel" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of Appointments (Calendar - New Appointment) */}


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

                                        {/* UI - Doctor - Appointments (Calendar) */}
                                        <Modal
                                            open={this.state.openMeet}
                                            onClose={this.handleCloseMeet}>
                                            <Grid className="meetBoxCntnt">
                                                <Grid className="meetCourse">
                                                    <Grid className="meetCloseBtn">
                                                        <a><img src={require('../../../assets/images/threedots.jpg')} alt="" title="" /></a>
                                                        <a onClick={this.handleCloseMeet}><img src={require('../../../assets/images/closefancy.png')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="meetVdo">
                                                        <Grid className="meetVdoLft">
                                                            <img src={require('../../../assets/images/video-call.svg')} alt="" title="" />
                                                            <span>Video call</span>
                                                        </Grid>
                                                        <Grid className="meetVdoRght">
                                                            <p>9 Aug, 10:00</p>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="meetDetail">
                                                        <h1>James Morrison</h1>
                                                        <span>Details / Questions</span>
                                                        <p>Here we show the text the patient entered in the text field when arranging
                                                        an appointment. Or the appointment title if the doctor was the one who entered it.</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Modal>
                                        {/* End of UI - Doctor - Appointments (Calendar) */}

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Grid className="appointArang">

                                        <Grid className="apointAdd">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={12}>
                                                    <Grid container direction="row">
                                                        <Grid item xs={12} md={6}>
                                                            <h1>Appointments</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid className="arng_addEntrynw">
                                                                {/* <a onClick={this.handleOpenFancy}>+ Arrange an appointment</a> */}
                                                                <a>+ Arrange an appointment</a>
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
                                                                <a onClick={this.handleAllowLoc} className="syncRght">Sync to your calendar</a>
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
                                                                                        options={options}
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


                                                                <a onClick={this.handleAllowAccess}>
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
                                                                                        options={options}
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
export default Index