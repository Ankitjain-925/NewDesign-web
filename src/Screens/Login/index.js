import React, { Component } from 'react';
import { LanguageFetchReducer } from '../actions';
import { Redirect, Route } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from './actions';
import { Settings } from './setting';
import Grid from '@material-ui/core/Grid';
import { authy } from './authy.js';
import { NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import sitedata from '../../sitedata';
import * as translationEN from '../../translations/en';
import * as translationDE from '../../translations/de';
import * as translationES from '../../translations/es';
import * as translationCH from '../../translations/ch';
import { EmergencySet } from '../Doctor/emergencyaction.js';
import { Doctorset } from '../Doctor/actions';
import * as translationPT from '../../translations/pt';
import queryString from 'query-string';
import Loader from './../Components/Loader/index';
import Emergency from '../Nurse/Emergency';
const path = sitedata.data.path + '/UserProfile';


class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            hidden: true,
            password: "",
            dropDownValue: 'Select',
            inputEmail: "",
            inputPass: "",
            show: false,
            myLogin: false,
            weoffer: [],
            loginError: false,
            logintoken: '',
            anotherlogin: false,
            loggedIn: false,
            loginError2: false,
            loginError9: false,
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    changeValue(languageType) {
        this.setState({ dropDownValue: languageType });
        this.props.LanguageFetchReducer(languageType);
    }

    // componentDidMount = () => {
    //      this.logoutUser();
    //     if (this.props.stateLanguageType !== 'English') {
    //         this.setState({ dropDownValue: this.props.stateLanguageType })
    //     }
    // }
    componentDidMount = () =>{
        this.logoutUser();
        // this.movedashboard();
        this.unsetCategory();
      
        let url = this.props.location.search;
        let params = queryString.parse(url);
         this.setState({logintoken : params.token})
        setTimeout(()=>{ 
          this.logoutUser(); }, 5000);
      }
      
      logoutUser= ()=> {
          this.props.authy(false);
          let languageType = 'en';
          this.props.LanguageFetchReducer(languageType);
          this.anotherPatient();
      }
      anotherPatient=()=>
      {
         var user_id = null;
         var pin = null;
         this.props.EmergencySet(user_id);
         this.props.Doctorset(user_id, pin);
      }
      unsetCategory()
      {
        let category ="all";
        // this.props.filterate(category);
      }
      
    //Link for the register
    register = () => {
        this.props.history.push('/register');
    }

    //Link for the forgot Password
    forgotPassword = () => {
        this.props.history.push('/forgot-password');
    }
    // logoutUser = () => {
    //     let email = "";
    //     let password = "";
    //     this.props.LoginReducerAim(email, password);
    //     this.props.authy(false);
    //     let languageType = 'en';
    //     this.props.LanguageFetchReducer(languageType);
    // }
    handleChange = (input, value) => {
        this.setState({
            [input]: value
        })
    }
    //For validate the email
    validateEmail = (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }

    //Send email and Password to login
    BtnSubmit = () => {
        this.setState({ loginError: false, loginError2: false, loginError9: false })
        if (this.state.inputPass && this.state.inputPass !== '') {
            if (this.validateEmail(this.state.inputEmail)) {
                if (this.state.logintoken != '' && this.state.logintoken != undefined) {
                    let email = this.state.inputEmail;
                    let password = this.state.inputPass;
                    let logintoken = this.state.logintoken;
                    this.setState({ loaderImage: true })
                    this.props.LoginReducerAim(email, password, logintoken);
                    setTimeout(
                        function () {
                            this.setState({ myLogin: true });
                            this.setState({ loaderImage: false })
                            if (this.props.stateLoginValueAim.token !== 450 && this.props.stateLoginValueAim.user !== 'undefined' && this.props.stateLoginValueAim.user !== null) {
                                if (!this.props.stateLoginValueAim.user.is2fa) {
                                    this.props.authy(true);
                                }
                                this.setState({ anotherlogin: true })
                            }
                            else {
                                this.setState({ thisverify: false })
                            }

                        }.bind(this),
                        3000
                    );
                } else {
                    let email = this.state.inputEmail;
                    let password = this.state.inputPass;
                    this.setState({ loaderImage: true })
                    this.props.LoginReducerAim(email, password);
                    setTimeout(
                        function () {
                            this.setState({ myLogin: true });
                            this.setState({ loaderImage: false })
                            if (this.props.stateLoginValueAim && this.props.stateLoginValueAim.user && !this.props.stateLoginValueAim.user.is2fa) {  
                                this.props.authy(true);
                            }
                            else if (this.props.stateLoginValueAim.token === 450) {
                                this.setState({ thisverify: false })
                            }
                            else {
                                this.setState({ thisverify: true })
                            }
                        }
                            .bind(this),
                        3000
                    );
                }
            } else {
                this.setState({ loginError2: true })
            }
        }
        else {
            this.setState({ loginError9: true })
        }
    }

    //For verify the code of Authy
    Verifycode = () => {
        this.setState({ loaderImage: true })
        axios.post(path + '/verifyLogin', { mob_token: this.state.mob_token, authyId: this.props.stateLoginValueAim.user.authyId },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ loaderImage: false })
                if (response.data.hassuccessed === true) {
                    this.props.authy(true);
                }
                else {
                    this.setState({ loginError1: true })
                }
            })
    }
    // handlePasswordChange(e) {
    //     this.setState({ password: e.target.value });
    // }
    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }
    componentDidMount() {
        if (this.props.password) {
            this.setState({ password: this.props.password });
        }
    }
    render() {
        const { stateLoginValueAim } = this.props;
        const { myLogin } = this.state;


        let Log_into_Aimedis, login_Email_address, login_Password, login_Forgotpassword,
            login_LOGIN_btn, login_an_account, login_Registerhere
            ;

        // de => German
        if (this.props.stateLanguageType === 'German') {
            Log_into_Aimedis = translationDE.text.Log_into_Aimedis;
            login_Email_address = translationDE.text.login_Email_address;
            login_Password = translationDE.text.login_Password;
            login_Forgotpassword = translationDE.text.login_Forgotpassword;
            login_LOGIN_btn = translationDE.text.login_LOGIN_btn;
            login_an_account = translationDE.text.login_an_account;
            login_Registerhere = translationDE.text.login_Registerhere;
        }

        // es => Spanish
        if (this.props.stateLanguageType === 'Spanish') {
            Log_into_Aimedis = translationES.text.Log_into_Aimedis;
            login_Email_address = translationES.text.login_Email_address;
            login_Password = translationES.text.login_Password;
            login_Forgotpassword = translationES.text.login_Forgotpassword;
            login_LOGIN_btn = translationES.text.login_LOGIN_btn;
            login_an_account = translationES.text.login_an_account;
            login_Registerhere = translationES.text.login_Registerhere;
        }

        // ch => Chinese
        if (this.props.stateLanguageType === 'Chinese') {
            Log_into_Aimedis = translationCH.text.Log_into_Aimedis;
            login_Email_address = translationCH.text.login_Email_address;
            login_Password = translationCH.text.login_Password;
            login_Forgotpassword = translationCH.text.login_Forgotpassword;
            login_LOGIN_btn = translationCH.text.login_LOGIN_btn;
            login_an_account = translationCH.text.login_an_account;
            login_Registerhere = translationCH.text.login_Registerhere;
        }

        // pt => Portuguese
        else if (this.props.stateLanguageType === 'Portuguese') {
            Log_into_Aimedis = translationPT.text.Log_into_Aimedis;
            login_Email_address = translationPT.text.login_Email_address;
            login_Password = translationPT.text.login_Password;
            login_Forgotpassword = translationPT.text.login_Forgotpassword;
            login_LOGIN_btn = translationPT.text.login_LOGIN_btn;
            login_an_account = translationPT.text.login_an_account;
            login_Registerhere = translationPT.text.login_Registerhere;
        }

        // en => English
        else {
            Log_into_Aimedis = translationEN.text.Log_into_Aimedis;
            login_Email_address = translationEN.text.login_Email_address;
            login_Password = translationEN.text.login_Password;
            login_Forgotpassword = translationEN.text.login_Forgotpassword;
            login_LOGIN_btn = translationEN.text.login_LOGIN_btn;
            login_an_account = translationEN.text.login_an_account;
            login_Registerhere = translationEN.text.login_Registerhere;
        }
        if (stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'patient' && this.props.verifyCode.code) {
            if (stateLoginValueAim.kyc) {
                return (<Redirect to={'/patient'} />);
            }
            else {
                return (<Redirect to={'/patient'} />);
            }
        }
        if (stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'doctor' && this.props.verifyCode.code) {
            if (stateLoginValueAim.kyc) {
                return (<Redirect to={'/doctor'} />);
            }
            else {
                return (<Redirect to={'/doctor'} />);
            }
        }
        if (stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'pharmacy' && this.props.verifyCode.code) {
            if (stateLoginValueAim.kyc) {
                return (<Redirect to={'/pharmacy'} />);
            }
            else {
                return (<Redirect to={'/pharmacy'} />);
            }
        }
        if (stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'paramedic' && this.props.verifyCode.code) {
            return (<Redirect to={'/paramedic'} />);
        }
        if (stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'insurance' && this.props.verifyCode.code) {
            return (<Redirect to={'/insurance'} />);
        }
        if ((stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'nurse' && this.props.verifyCode.code)) {
            if (stateLoginValueAim.kyc) {
                return (<Redirect to={'/nurse'} />);
            }
            else {
                return (<Redirect to={'/nurse'} />);
            }
        }
        if ((stateLoginValueAim.token !== 450 && stateLoginValueAim.user.type === 'therapist' && this.props.verifyCode.code)) {
            if (stateLoginValueAim.kyc) {
                return (<Redirect to={'/nurse'} />);
            }
            else {
                return (<Redirect to={'/nurse'} />);
            }
        }

        else {
            return (
                <Grid>
                      {this.state.loaderImage && <Loader />}
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={11} md={10}>
                            <Grid className="regHead">
                                <Grid container direction="row" justify="center">
                                    <Grid item xs={6} sm={6} className="LogoForms">
                                        <a><img src={require('../../assets/images/logo_new.png')} alt="" title="" /></a>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <Grid className="regSelectTop">
                                            <Grid className="changeLang">
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret>
                                                        {this.state.dropDownValue}
                                                    </DropdownToggle>
                                                    {/* 
                                                en => English
                                                de => German  

                                            */}
                                                    <DropdownMenu className="langInerFooter">
                                                        <DropdownItem onClick={() => { this.changeValue('English') }}><NavLink>English</NavLink></DropdownItem>
                                                        <DropdownItem onClick={() => { this.changeValue('German') }}><NavLink>German</NavLink></DropdownItem>
                                                        <DropdownItem onClick={() => { this.changeValue('Chinese') }}><NavLink>Chinese</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink>Portuguese</NavLink></DropdownItem>
                                                        <DropdownItem onClick={() => { this.changeValue('Spanish') }}><NavLink>Spanish</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink>Russian</NavLink></DropdownItem>
                                                        <DropdownItem><NavLink>Swahili</NavLink></DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justify="center" alignItems="center">

                        <Grid item xs={11} sm={7} md={7}>

                            <Grid className="logData">
                                <h1>{Log_into_Aimedis}</h1>
                            </Grid>
                            <Grid className="logFormMain">
                                <Grid className="logForm">
                                    <div className="err_message">
                                        {
                                            this.state.loginError1 ? 'Code is not verified.' :
                                                this.state.loginError2 ? 'Email is not valid' :
                                                    this.state.loginError9 ? 'Password can not be empty' :
                                                        this.state.loginError === false && stateLoginValueAim.token === 450 && myLogin && stateLoginValueAim.message ?
                                                            stateLoginValueAim.message === "User does not exist" ? 'User does not exist' :
                                                                stateLoginValueAim.message === "User is blocked" ? 'User is blocked' :
                                                                    stateLoginValueAim.message === "Wrong password" ? 'Wrong password' : false
                                                            : false}
                                    </div>
                                    <Grid className="logRow">
                                        <Grid><label>{login_Email_address}</label></Grid>
                                        <Grid><input type="text"
                                            value={this.state.inputEmail} onChange={e => this.handleChange('inputEmail', e.target.value)} /></Grid>
                                    </Grid>
                                    <Grid className="logRow logpassInst">

                                        <Grid container direction="row">
                                            <Grid item xs={11} sm={6} md={6}><label>{login_Password}</label></Grid>
                                            <Grid item xs={11} sm={6} md={6} className="logFrgtpass">
                                                <label><a onClick={this.forgotPassword}>{login_Forgotpassword}</a></label>
                                            </Grid>
                                        </Grid>

                                        <Grid className="logPass">
                                            <input
                                                type={this.state.hidden ? "password" : "text"}
                                                value={this.state.inputPass} onChange={e => this.handleChange('inputPass', e.target.value)} />
                                            {this.state.hidden &&
                                                <a onClick={this.toggleShow}>
                                                    <img src={require('../../assets/images/showeye.svg')} alt="" title="" />
                                                </a>
                                            }
                                            {!(this.state.hidden) &&
                                                <a onClick={this.toggleShow}>
                                                    <img src={require('../../assets/images/hide.svg')} alt="" title="" />
                                                </a>
                                            }
                                        </Grid>
                                        {this.state.thisverify &&
                                            <Grid className="logRow">
                                                <Grid><label>2 Factor authentication</label></Grid>
                                                <Grid><input type="text"
                                                    value={this.state.mob_token} onChange={e => this.setState({ mob_token: e.target.value })} /></Grid>
                                            </Grid>
                                        }
                                    </Grid>
                                    <Grid className="logRow">
                                        {!this.state.thisverify ?
                                            <Grid className="regCrtAc">
                                                <input type="submit" value={login_LOGIN_btn} onClick={this.BtnSubmit.bind(this)} />
                                            </Grid > :
                                            <Grid className="regCrtAc">
                                                <input type="submit" value="VERIFY" onClick={this.Verifycode.bind(this)} />
                                            </Grid >}
                                    </Grid>
                                    <p className="regOnlog">{login_an_account} <a onClick={this.register}>{login_Registerhere}</a></p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
}
const mapStateToProps = (state) => {

    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { verifyCode } = state.authy;
    const { settings } = state.Settings;
    const { Emergencysetget }= state.EmergencySet;
    const { Doctorsetget } = state.Doctorset;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        verifyCode,
        settings,
        Doctorsetget,
        Emergencysetget
    }
};

export default connect(mapStateToProps, { Doctorset,EmergencySet, LoginReducerAim, LanguageFetchReducer, authy, Settings })(Index)

// export default Index;