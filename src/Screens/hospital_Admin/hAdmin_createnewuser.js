import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PhoneInput from 'react-phone-input-2';
import H_LeftMenu from "Screens/Components/Menus/H_leftMenu/index"
import H_LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile"
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from "Screens/actions";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { getLanguage } from 'translations/index';

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
    componentDidMount() {
    }
    handleaddCreate = () => {
        this.setState({ addCreate: true });
    };
    handleCloseCreate = () => {
        this.setState({ addCreate: false });
    };
    logOutClick = async () => {
        var data = await update_CometUser(this.props?.stateLoginValueAim?.user?.profile_id.toLowerCase(), { lastActiveAt: Date.now() })
        if (data) {
            let email = "";
            let password = "";
            this.props.LoginReducerAim(email, password);
            let languageType = 'en';
            this.props.LanguageFetchReducer(languageType);
        }
        localStorage.removeItem("token")
        this.props.history.push('/')
    }


    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let { OpenCreateUserModelHospitalAdmin, new_entry, Confirm_your_password, Create, cancel, create_new_user, mobile_number,
            First_name, speciality, email, Last_name, two_fac_auth, Currentpassword, Hospital, we_use_authy, ShoworHide, edit } = translate;
        if (this.props.stateLoginValueAim.user.type != "hospitaladmin") {
            this.props.history.push("/")
        }
        const { specialistOption } = this.state;
        return (
            <Grid className="homeBg darkTheme">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Mobile menu */}
                                <H_LeftMenuMobile isNotShow={true} currentPage="createnewuser" />
                                {/* End of mobile menu */}

                                {/* Website Menu */}
                                <H_LeftMenu isNotShow={true} currentPage="createnewuser" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={10} className="adminCreatUser">
                                    <Grid><a onClick={this.handleaddCreate}>{OpenCreateUserModelHospitalAdmin}</a></Grid>

                                    {/* Model setup */}
                                    <Modal
                                        open={this.state.addCreate}
                                        onClose={this.handleCloseCreate}
                                        className="darkTheme">
                                        <Grid className="nwEntrCntnt">
                                            <Grid className="nwEntrCntntIner">

                                                <Grid className="nwEntrCourse">
                                                    <Grid className="nwEntrCloseBtn nwEntrCloseBtnAdd">
                                                        <a onClick={this.handleCloseCreate}>
                                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                        </a>
                                                    </Grid>
                                                    <p>{new_entry}</p>
                                                    <Grid><label>{create_new_user}</label></Grid>
                                                </Grid>

                                                <Grid className="docHlthMain">

                                                    <Grid className="spclQues">
                                                        <Grid className="spclQuesIner">
                                                            <Grid><label>{speciality}</label></Grid>
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
                                                        <Grid><label>{email}</label></Grid>
                                                        <Grid><input type="email" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>{Currentpassword}</label></Grid>
                                                        <Grid><input type="password" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>{Confirm_your_password}</label></Grid>
                                                        <Grid><input type="password" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>{First_name}</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>{Last_name}</label></Grid>
                                                        <Grid><input type="text" /></Grid>
                                                    </Grid>

                                                    <Grid className="twoWayAuth">
                                                        <h2>{two_fac_auth}</h2>
                                                        <p>{we_use_authy}</p>
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
                                                        <label>{mobile_number}</label>
                                                        <Grid>
                                                            <PhoneInput
                                                                country={'us'}
                                                                value={this.state.phone}
                                                                onChange={phone => this.setState({ phone })}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid className="emlCreatSub">
                                                        <Grid><label>{Hospital}</label></Grid>
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
                                                                    <a>{ShoworHide} <img src={require('assets/images/Info.svg')} alt="" title="" /></a>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6} md={6} className="editShwHid21">
                                                                <a>{edit}</a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="creatInfo">
                                                        <Grid container direction="row" justify="center" alignItems="center">
                                                            <Grid item xs={6} md={6} className="creatInfoLft">
                                                                <a>{Create}</a>
                                                            </Grid>
                                                            <Grid item xs={6} md={6} className="creatInfoRght">
                                                                <a>{cancel}</a>
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
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim ? state.LoginReducerAim : {};
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // verifyCode,
        settings
    }
};

export default connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index)

// export default Index