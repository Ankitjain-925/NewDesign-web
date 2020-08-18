import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../../actions';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosisdata: [],
            mediacationdata: [],
            allergydata: [],
            family_doc: [],
            donar: {},
            contact_partner: {},
            loaderImage: false,
        };
        this.logOutClick = this.logOutClick.bind(this);
    }
    logOutClick = () => {
        console.log('heresss')
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }
    render() {
        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr">
                <Grid className="webLogo">
                    <a href="/"><img src={require('../../../../assets/images/logo_new.png')} alt="" title="" /></a>
                </Grid>
                <Grid className="menuItems">
                    <ul>
                        <li>
                            <a>
                                <img src={require('../../../../assets/images/inactiveJournal.jpg')} alt="" title="" />
                                <span>Journal</span>
                            </a>
                        </li>
                        <li className="menuActv">
                            <a>
                                <img src={require('../../../../assets/images/chatVideoActive.png')} alt="" title="" />
                                <span>Chat & <br /> Videocalls</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src={require('../../../../assets/images/calenderIcon.jpg')} alt="" title="" />
                                <span>Appointments</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src={require('../../../../assets/images/apoint.jpg')} alt="" title="" />
                                <span>My Documents</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src={require('../../../../assets/images/tracker.jpg')} alt="" title="" />
                                <span>Trackers & <br /> Self Data</span>
                            </a>
                        </li>
                        <li>
                            <a className="moreMenu">
                                <img src={require('../../../../assets/images/moreicon.jpg')} alt="" title="" />
                                <span>More</span>

                                <div className="moreMenuList">
                                    <ul>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Second Opinion</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Emergency Patient Data</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Aimedis Online Courses</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Extra Services</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Journal Archive</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Blockchain Access Log</a></li>
                                    </ul>
                                </div>
                            </a>

                        </li>
                        <li>
                            <a className="profilMenu">
                                <img src={require('../../../../assets/images/useru.jpg')} alt="" title="" />
                                <span>My Profile</span>

                                <div className="profilMenuList">
                                    <ul>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Profile Settings</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Language</a></li>
                                        <li><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Dark Mode</a></li>
                                        <li onClick={this.logOutClick}><a><img src={require('../../../../assets/images/menudocs.jpg')} alt="" title="" />Log out</a></li>
                                    </ul>
                                </div>

                            </a>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index));