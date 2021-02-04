import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { slide as Menu } from "react-burger-menu";
import PhoneInput from 'react-phone-input-2';
import H_LeftMenu from "../Components/Menus/H_leftMenu/index"
import H_LeftMenuMobile from "../Components/Menus/H_leftMenu/mobile"
import { connect } from "react-redux";
import { LoginReducerAim } from '../Login/actions';
import { Settings } from '../Login/setting';
import { LanguageFetchReducer } from "../actions";
import axios from "axios"
import sitedata from "../../sitedata"

const specialistOptions = [
    { value: 'Specialist1', label: 'Specialist1' },
    { value: 'Specialist2', label: 'Specialist2' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCreate: false,
        };
    }
    componentDidMount(){
    }
    handleaddCreate = () => {
        this.setState({ addCreate: true });
    };
    handleCloseCreate = () => {
        this.setState({ addCreate: false });
    };
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
        localStorage.removeItem("token")
        this.props.history.push('/')
    }


    render() {
        if(this.props.stateLoginValueAim.user.type != "hospitaladmin"){
            this.props.history.push("/")
        }
        const { specialistOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>

                            <Grid container direction="row">
                                {/* Mobile menu */}
                                <H_LeftMenuMobile isNotShow={true} currentPage="createnewuser"/>
                                {/* End of mobile menu */}

                                {/* Website Menu */}
                                <H_LeftMenu isNotShow={true} currentPage="createnewuser" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={10} className="adminCreatUser">
                                    <Grid><a onClick={this.handleaddCreate}>Open Create User Model (Hospital Admin)</a></Grid>

                                    {/* Model setup */}
                                    <Modal
                                        open={this.state.addCreate}
                                        onClose={this.handleCloseCreate}>
                                        <Grid className="nwEntrCntnt">
                                            <Grid className="nwEntrCntntIner">

                                                <Grid className="nwEntrCourse">
                                                    <Grid className="nwEntrCloseBtn nwEntrCloseBtnAdd">
                                                        <a onClick={this.handleCloseCreate}>
                                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <p>New entry</p>
                                                    <Grid><label>Create new user</label></Grid>
                                                </Grid>

                                                <Grid className="docHlthMain">

                                                    <Grid className="spclQues">
                                                        <Grid className="spclQuesIner">
                                                            <Grid><label>Specialty</label></Grid>
                                                            <Grid>
                                                                <Select
                                                                    value={specialistOption}
                                                                    onChange={this.handleSpecialist}
                                                                    options={specialistOptions}
                                                                    placeholder="Select"
                                                                    isSearchable={false}
                                                                    isMulti={false}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>Email address</label></Grid>
                                                        <Grid><input type="email" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>Current password</label></Grid>
                                                        <Grid><input type="password" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>Confirm your password</label></Grid>
                                                        <Grid><input type="password" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>First name</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>Last name</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>

                                                    <Grid className="twoWayAuth">
                                                        <h2>2-factor authentication</h2>
                                                        <p>We use Authy for you to be able to secure your account even more.</p>
                                                        <Grid className="twoWayAuthChk">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        value="checkedB"
                                                                        color="#00ABAF"
                                                                    />
                                                                }
                                                                label="2-factor authentication is enabled"
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <label>Mobile phone number</label>
                                                        <Grid>
                                                            <PhoneInput
                                                                country={'us'}
                                                                value={this.state.phone}
                                                                onChange={phone => this.setState({ phone })}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>Hospital</label></Grid>
                                                        <Grid className="emlCreatSubSrch">
                                                           <input type="text" placeholder="Search by Hospital name or ID" />
                                                           <img src={require('assets/images/InputField.svg')} alt="" title="" />
                                                        </Grid>
                                                    </Grid>

                                                </Grid>

                                                <Grid className="infoShwHidBrdr21"></Grid>
                                                <Grid className="infoShwHidIner21">
                                                    <Grid className="infoShwHidMain21">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={6} md={6}>
                                                                <Grid className="infoShwHid21">
                                                                    <a>Show or Hide <img src={require('assets/images/Info.svg')} alt="" title="" /></a>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6} md={6} className="editShwHid21">
                                                                <a>Edit</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="creatInfo">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={6} md={6} className="creatInfoLft">
                                                                <a>Create</a>
                                                            </Grid>
                                                            <Grid item xs={6} md={6} className="creatInfoRght">
                                                                <a>Cancel</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Modal>
                                    {/* End of Model setup */}

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
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim?state.LoginReducerAim:{};
    const { stateLanguageType } = state.LanguageReducer;
    // const { settings } = state.Settings;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // verifyCode,
        // settings
    }
};

export default connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index)

// export default Index