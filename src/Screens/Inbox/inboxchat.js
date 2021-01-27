import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Index extends Component {
    render() {
        return (
            <Grid className="homeBg">
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <Grid item xs={12} md={1} className="MenuLeftUpr">
                                <Grid className="webLogo">
                                    <a href="/"><img src={require('../../assets/images/LogoPNG.png')} alt="" title="" /></a>
                                </Grid>
                                <Grid className="menuItems">
                                    <ul>
                                        <li className="webItems">
                                            <a>
                                                <svg className="inactiveItem" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                                    <title>2A1F6B6D-F34D-4BF5-9528-F9F4BD68EBB8</title>
                                                    <g id="aimedis" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="UI---Components" transform="translate(-875.000000, -4251.000000)">
                                                            <g id="Nav-Journal/Inactive" transform="translate(866.000000, 4243.000000)">
                                                                <g id="Group" transform="translate(1.000000, 0.000000)">
                                                                    <g id="journal" transform="translate(8.000000, 8.000000)">
                                                                        <rect id="Rectangle" x="0" y="0.003" width="24" height="24"></rect>
                                                                        <path d="M19,8.001 L5,8.001 C3.896,8.001 3,7.104 3,6.001 L3,4.001 C3,2.899 3.896,2.001 5,2.001 L19,2.001 C20.104,2.001 21,2.899 21,4.001 L21,6.001 C21,7.104 20.104,8.001 19,8.001 Z M5,4.001 L5,6.001 L19,6.001 L19,4.001 L5,4.001 Z" id="Shape" fill="#BFC1C1" fill-rule="nonzero"></path>
                                                                        <g id="Group" transform="translate(3.000000, 9.000000)" fill="#BFC1C1" fill-rule="nonzero">
                                                                            <path d="M16,6.001 L2,6.001 C0.896,6.001 0,5.104 0,4.001 L0,2.001 C0,0.899 0.896,0.001 2,0.001 L16,0.001 C17.104,0.001 18,0.899 18,2.001 L18,4.001 C18,5.104 17.104,6.001 16,6.001 Z M2,2.001 L2,4.001 L16,4.001 L16,2.001 L2,2.001 Z" id="Shape"></path>
                                                                            <path d="M16,13.001 L2,13.001 C0.896,13.001 0,12.104 0,11.001 L0,9.001 C0,7.898 0.896,7.001 2,7.001 L16,7.001 C17.104,7.001 18,7.898 18,9.001 L18,11.001 C18,12.104 17.104,13.001 16,13.001 Z M2,9.001 L2,11.001 L16,11.001 L16,9.001 L2,9.001 Z" id="Shape"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                <span>Journal</span>
                                            </a>
                                        </li>
                                        <li className="menuActv">
                                            <a href="/inbox">
                                                <img src={require('../../assets/images/chatVideoActive.png')} alt="" title="" />
                                                <span>Chat & <br/> Videocalls</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/appointment">
                                                <img src={require('../../assets/images/calenderIcon.jpg')} alt="" title="" />
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

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                {/* Inbox page Content */}

                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={12} md={3}>
                                        <Grid className="chatContact">

                                            <Grid container direction="row" justify="center" alignItems="center" className="chatContactTxt">
                                                <Grid item xs={8} md={8}>
                                                    <h2>Chats</h2>
                                                </Grid>
                                                <Grid item xs={4} md={4} className="chatIconEdit">
                                                    <img src={require('../../assets/images/chatIcon.png')} alt="" title="" />
                                                </Grid>
                                            </Grid>

                                            <Grid className="contactSrch">
                                                <img src={require('../../assets/images/search-entries.svg')} alt="" title="" />
                                                <input type="text" placeholder="Search" />
                                            </Grid>

                                            <Grid className="onlineListing">

                                                <Grid className="chatClnt">
                                                    <Grid className="chatClntLft">
                                                        <a><img src={require('../../assets/images/chat11.jpg')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="chatClntMid">
                                                        <a>Darren Adams</a>
                                                        <p>Just sent you the documents</p>
                                                    </Grid>
                                                    <Grid className="chatClntRght">
                                                        <a>
                                                            <img src={require('../../assets/images/seenimg.png')} alt="" title="" />
                                                            <span>08:30 PM</span>
                                                        </a>
                                                        <p>
                                                            <img src={require('../../assets/images/pin.png')} alt="" title="" />
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="chatClntBrder"><Grid className="chatBrderIner"></Grid></Grid>

                                                <Grid className="chatClnt">
                                                    <Grid className="chatClntLft">
                                                        <a><img src={require('../../assets/images/chat44.jpg')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="chatClntMid">
                                                        <a>Ashish Asharaful</a>
                                                        <p><img src={require('../../assets/images/thumb.png')} alt="" title="" /></p>
                                                    </Grid>
                                                    <Grid className="chatClntRght">
                                                        <a>
                                                            <img src={require('../../assets/images/seenimg.png')} alt="" title="" />
                                                            <span>08:30 PM</span>
                                                        </a>
                                                        <p>
                                                            <img src={require('../../assets/images/pin.png')} alt="" title="" />
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="chatClntBrder"><Grid className="chatBrderIner"></Grid></Grid>

                                                <Grid className="chatClnt">
                                                    <Grid className="chatClntLft">
                                                        <a><img src={require('../../assets/images/chat33.jpg')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="chatClntMid">
                                                        <a>Yi Chun-Hwa</a>
                                                        <p><img src={require('../../assets/images/thumb.png')} alt="" title="" /></p>
                                                    </Grid>
                                                    <Grid className="chatClntRght">
                                                        <a>
                                                            <img src={require('../../assets/images/seenimg.png')} alt="" title="" />
                                                            <span>08:30 PM</span>
                                                        </a>
                                                        <p>
                                                            <img src={require('../../assets/images/pin.png')} alt="" title="" />
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="chatClntBrder"><Grid className="chatBrderIner"></Grid></Grid>

                                                <Grid className="chatClnt">
                                                    <Grid className="chatClntLft">
                                                        <a><img src={require('../../assets/images/chat33.jpg')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="chatClntMid">
                                                        <a>Yi Chun-Hwa</a>
                                                        <p>Ok</p>
                                                    </Grid>
                                                    <Grid className="chatClntRght">
                                                        <a>
                                                            <img src={require('../../assets/images/seenimg.png')} alt="" title="" />
                                                            <span>08:30 PM</span>
                                                        </a>
                                                        <p>
                                                            <img src={require('../../assets/images/pin.png')} alt="" title="" />
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="chatClntBrder"><Grid className="chatBrderIner"></Grid></Grid>

                                                <Grid className="chatClnt">
                                                    <Grid className="chatClntLft">
                                                        <a><img src={require('../../assets/images/chat55.jpg')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="chatClntMid">
                                                        <a>Justine Robinson</a>
                                                        <p>Ah ok no worries</p>
                                                    </Grid>
                                                    <Grid className="chatClntRght">
                                                        <a>
                                                            <img src={require('../../assets/images/seenimg.png')} alt="" title="" />
                                                            <span>11:30 PM</span>
                                                        </a>
                                                        <p>
                                                            <img src={require('../../assets/images/pin.png')} alt="" title="" />
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="chatClntBrder"><Grid className="chatBrderIner"></Grid></Grid>

                                                <Grid className="chatClnt">
                                                    <Grid className="chatClntLft">
                                                        <a><img src={require('../../assets/images/chat66.jpg')} alt="" title="" /></a>
                                                    </Grid>
                                                    <Grid className="chatClntMid">
                                                        <a>Neeshaan El Pasha</a>
                                                        <p>Incoming Audio Call</p>
                                                    </Grid>
                                                    <Grid className="chatClntRght">
                                                        <a>
                                                            <img src={require('../../assets/images/seenimg.png')} alt="" title="" />
                                                            <span>01:30 PM</span>
                                                        </a>
                                                        <p>
                                                            <img src={require('../../assets/images/pin.png')} alt="" title="" />
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="chatClntBrder"><Grid className="chatBrderIner"></Grid></Grid>

                                            </Grid>

                                            <Grid className="chatMenu">
                                                <Grid><img src={require('../../assets/images/chatPerson.jpg')} alt="" title="" /></Grid>
                                                <Grid><img src={require('../../assets/images/chatcall.jpg')} alt="" title="" /></Grid>
                                                <Grid><img src={require('../../assets/images/chatmessage.jpg')} alt="" title="" /></Grid>
                                                <Grid><img src={require('../../assets/images/chatdots.jpg')} alt="" title="" /></Grid>
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Grid className="strt_msgs">
                                            <label>
                                                Select a chat to start messaging
                                         </label>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* End of Inbox page Content */}
                            </Grid>
                            {/* End of Website Right Content */}

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default Index