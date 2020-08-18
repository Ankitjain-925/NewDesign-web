import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            openDash: false,
            date: new Date(),
        };
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    // fancybox open
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
                                        <a href="/"><img src={require('../../assets/images/logo_new.png')} alt="" title="" /></a>
                                    </Grid>
                                    <Grid className="menuItems">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img src={require('../../assets/images/inactiveJournal.jpg')} alt="" title="" />
                                                    <span>Journal</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/inbox">
                                                    <img src={require('../../assets/images/chatVideo.jpg')} alt="" title="" />
                                                    <span>Chat & <br /> Videocalls</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/appointment" className="menuActv">
                                                    <img src={require('../../assets/images/appointActive.png')} alt="" title="" />
                                                    <span>Appointments</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img src={require('../../assets/images/apoint.jpg')} alt="" title="" />
                                                    <span>My Documents</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img src={require('../../assets/images/tracker.jpg')} alt="" title="" />
                                                    <span>Trackers & <br /> Self Data</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="moreMenu">
                                                    <img src={require('../../assets/images/moreicon.jpg')} alt="" title="" />
                                                    <span>More</span>

                                                    <div className="moreMenuList">
                                                        <ul>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                                        </ul>
                                                    </div>
                                                </a>

                                            </li>
                                            <li>
                                                <a className="profilMenu">
                                                    <img src={require('../../assets/images/useru.jpg')} alt="" title="" />
                                                    <span>My Profile</span>

                                                    <div className="profilMenuList">
                                                        <ul>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                                            <li><a><img src={require('../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
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
                                                    <a><img src={require('../../assets/images/office-visit.svg')} alt="" title="" /> Office visit</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Neurology</h3>
                                                <Grid><a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="officeVst">
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>7 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a className="showDetail">
                                                        <img src={require('../../assets/images/threedots.jpg')} alt="" title="" />
                                                        <Grid className="cancelAppoint">
                                                            <a><img src={require('../../assets/images/cancelAppoint.jpg')} alt="" title="" />Cancel appointment</a>
                                                        </Grid>
                                                    </a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="officeVst">
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>9 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a><img src={require('../../assets/images/video-call.svg')} alt="" title="" /> Video call</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="officeVst">
                                            <Grid className="pendConfirm">
                                                <p><img src={require('../../assets/images/yelowBullet.jpg')} alt="" title="" />
                                                    Pending confirmation</p>
                                            </Grid>
                                            <Grid container direction="row">
                                                <Grid item xs={6} md={6} className="officeVstLft"><label>7 Aug, 09:00</label></Grid>
                                                <Grid item xs={6} md={6} className="officeVstRght">
                                                    <a><img src={require('../../assets/images/office-visit.svg')} alt="" title="" /> Office visit</a>
                                                </Grid>
                                            </Grid>
                                            <Grid className="showSubject">
                                                <h3>Dermatology</h3>
                                                <Grid><a><img src={require('../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</a></Grid>
                                                <Grid><a><img src={require('../../assets/images/office-visit.svg')} alt="" title="" />Illinois Masonic Medical Center</a></Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid className="shwAppoints">
                                            <p><a>Show past appointments</a></p>
                                        </Grid>

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
                                                                <a><img src={require('../../assets/images/leftArow.jpg')} alt="" title="" /></a>
                                                                <a><img src={require('../../assets/images/rightArow.jpg')} alt="" title="" /></a>
                                                            </Grid>
                                                            <Grid className="crntMonth">Augest 2020</Grid>
                                                        </Grid>
                                                        <Grid item xs={6} md={6}>
                                                            <Grid className="todaySrchRght">
                                                                <a className="syncRght">Sync to your calendar</a>
                                                                <a><img src={require('../../assets/images/topicSrch.jpg')} alt="" title="" /></a>
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