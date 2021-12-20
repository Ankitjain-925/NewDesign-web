import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Modal from '@material-ui/core/Modal';
import DatePicker from 'react-date-picker';
import Select from 'react-select';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSlot: false,
            selectedOption: null
        };
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

    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "homeBg homeBgDrk" : "homeBg"}>
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>

                            <Grid className="MenuMob">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
                                        <a><img src={require('assets/images/navigation-drawer.svg')} alt="" title="" /></a>
                                    </Grid>
                                    <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
                                        <a href="/"><img src={require('assets/images/LogoPNG.png')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container direction="row">

                                {/* Website Menu */}
                                <Grid className="MenuWeb">
                                    <Grid item xs={12} md={1} className="MenuLeftUpr">
                                        <Grid className="webLogo">
                                            <a href="/"><img src={require('assets/images/LogoPNG.png')} alt="" title="" /></a>
                                        </Grid>
                                        <Grid className="menuItems">
                                            <ul>
                                                <li>
                                                    <a className="menuActv">
                                                        <img src={require('assets/images/nav-journal.svg')} alt="" title="" />
                                                        <span>Journal</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/inbox">
                                                        <img src={require('assets/images/nav-chat.svg')} alt="" title="" />
                                                        <span>Chat & <br /> Videocalls</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/appointment">
                                                        <img src={require('assets/images/nav-appointments.svg')} alt="" title="" />
                                                        <span>Appointments</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/mydocuments">
                                                        <img src={require('assets/images/nav-my-documents-inquiries.svg')} alt="" title="" />
                                                        <span>My Documents</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/trackerselfdata">
                                                        <img src={require('assets/images/nav-trackers.svg')} alt="" title="" />
                                                        <span>Trackers & <br /> Self Data</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="moreMenu">
                                                        <img src={require('assets/images/nav-more.svg')} alt="" title="" />
                                                        <span>More</span>
                                                        <div className="moreMenuList">
                                                            <ul>
                                                                <li><a href="/secondopinion"><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                                                <li><a href="emergencypatientdata"><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                                                <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                                                <li><a href="/extraservices"><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                                                <li><a href="/journalarchive"><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                                                <li><a href="/blockchainaccesslog"><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                                            </ul>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="profilMenu" href="/myprofile">
                                                        <img src={require('assets/images/nav-my-profile.svg')} alt="" title="" />
                                                        <span>My Profile</span>
                                                        <div className="profilMenuList">
                                                            <ul>
                                                                <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                                                <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                                                <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                                                <li><a><img src={require('assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                                            </ul>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </Grid>
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

                                        <Grid className="newRequestMain">
                                            <h4>New Requests</h4>
                                            <Grid className="newRequestUpr">
                                                <Grid className="newRequest">
                                                    <Grid className="newReqInfo">
                                                        <a><img src={require('assets/images/agedman.png')} alt="" title="" />James Morrison</a>
                                                    </Grid>
                                                    <Grid className="newReqInfo">
                                                        <a><img src={require('assets/images/video-call.svg')} alt="" title="" />
                                                            <label>August 14, 2020</label> <span>12:30 - 13:00</span></a>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="newRequest" onClick={this.handleOpenSlot}>
                                                    <Grid className="newReqInfo">
                                                        <a><img src={require('assets/images/agedman.png')} alt="" title="" />James Morrison</a>
                                                    </Grid>
                                                    <Grid className="newReqInfo">
                                                        <a><img src={require('assets/images/video-call.svg')} alt="" title="" />
                                                            <label>August 14, 2020</label> <span>12:30 - 13:00</span></a>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* Model setup */}
                                        <Modal
                                            open={this.state.openSlot}
                                            onClose={this.handleCloseSlot}
                                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme editBoxModel" : "editBoxModel"}>
                                            <Grid className="slotBoxCntnt">
                                                <Grid className="timSltCal">
                                                    <p><img src={require('assets/images/important-info.svg')} alt="" title="" />
                                                        Time slot is already booked on your calendar
                                                    </p></Grid>
                                                <Grid className="slotCourse">
                                                    <a onClick={this.handleCloseSlot} className="clsSltCal">
                                                        <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                    </a>
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} alignItems="center" justify="center">
                                                            <Grid className="jmInfo">
                                                                <a><img src={require('assets/images/agedman.png')} alt="" title="" />James Morrison</a>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6} alignItems="center" justify="center">
                                                            <Grid className="jmInfoVdo">
                                                                <a><img src={require('assets/images/video-call.svg')} alt="" title="" />Video call</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="clear"></Grid>
                                                    <Grid className="augDate">
                                                        <p><label>August 17, 2020</label> <span>09:30 - 10:00</span></p>
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

                                        <Grid className="todaySrch">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={12} alignItems="center" justify="center">
                                                    <Grid container direction="row">
                                                        <Grid item xs={6} md={6} className="todayMnth">
                                                            <Grid className="todaySrchLft"><label>Today</label></Grid>
                                                            <Grid className="movMnth">
                                                                <a><img src={require('assets/images/leftArow.jpg')} alt="" title="" /></a>
                                                                <a><img src={require('assets/images/rightArow.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                            <Grid className="crntMonth">Augest 2020</Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="todaySrchRght todayAddons">
                                                                <a className="syncRght">Sync to your calendar</a>
                                                                <a><img src={require('assets/images/topicSrch.jpg')} alt="" title="" /></a>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={this.handleChange}
                                                                    options={options}
                                                                    placeholder="Week"
                                                                    className="allTimeSelnw comonSelnw"
                                                                    //isMulti= {true}
                                                                    isSearchable={false}
                                                                />
                                                                <a className="calViewnw"><img src={require('assets/images/calendar-view.svg')} alt="" title="" /></a>
                                                                <a className="barViewnw"><img src={require('assets/images/bar.png')} alt="" title="" /></a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="getCalapoint">
                                            {/* <Calendar onChange={this.onChange} value={this.state.date} /> */}
                                            <Grid className="getCalBnr">
                                                <img src={require('assets/images/baner22.jpg')} alt="" title="" />
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
export default Index