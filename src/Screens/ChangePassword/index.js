import React, { Component } from 'react';
import { LanguageFetchReducer } from '../actions';
import { Redirect, Route } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import { LoginReducerAim } from '../Login/actions';
import Grid from '@material-ui/core/Grid';
import { authy } from '../Login/authy.js';
import * as translationEN from '../../translations/en_json_proofread_13072020.json';

import {
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import sitedata from '../../sitedata';
import Loader from './../Components/Loader/index';
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
            loaderImage: false
        };

    }
    handleChange = (input, value) => {
        this.setState({
            [input]: value,
            errorMsg: '',
        });
    }
    componentDidMount = () => {

    }

    //send the email on email id for the reset password
    BtnSubmit = () => {

        var email_not_exist, email_exist;
        var validEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (!validEmail.test(this.state.inputEmail)) {
            this.setState({ emailValid: false })
        }
        else {
            let userEmail = this.state.inputEmail;
            this.setState({ emailValid: true, loaderImage: true })
            axios.post(path + '/forgotPassword?email=' + userEmail, { lan: this.props.stateLanguageType, passFrom: 'landing' }
            )
                .then((response) => {
                    this.setState({ loaderImage: false })
                    if (response.data.status === 450) {
                        this.setState({
                            createHospitalError: true,
                            errorMsg: "Email does not exist",
                        });
                    }
                    else {

                        this.setState({
                            successMsg: true,
                            successMsgText: "Please check your email for change password",
                            inputEmail: ''
                        });
                        setTimeout(
                            function () {
                                this.setState({
                                    successMsg: false,
                                    successMsgText: '',
                                });
                                this.props.history.push('/');
                            }
                                .bind(this),
                            3000
                        )

                    }
                }).catch((error) => { });
        }
    }

    render() {
        const { stateLoginValueAim } = this.props;
        const { myLogin } = this.state;
        if (stateLoginValueAim.token !== 450 && this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }

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
        let { email, forget_password, plz_enter_valid_email } = translate

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
                                                <DropdownMenu className="changeLangIner">
                                                    <DropdownItem><NavLink>Nederlands - NL</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>German (Deutsch)</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Chinese</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Portuguese (Portugues)</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink>Spanish (Espanol)</NavLink></DropdownItem>
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
                            <h1>{forget_password}</h1>
                        </Grid>
                        <Grid className="logFormMain">
                            <Grid className="logForm">
                                {this.state.errorMsg && this.state.errorMsg !== '' && <div className="err_message">
                                    {this.state.errorMsg}</div>}
                                {this.state.successMsg && this.state.successMsgText &&
                                    <div className="success_message">{this.state.successMsgText}</div>}
                                {this.state.emailValid === false ? plz_enter_valid_email : ''}
                                <Grid className="logRow">
                                    <Grid><label>{email}</label></Grid>
                                    <Grid><input type="text"
                                        value={this.state.inputEmail} onChange={e => this.handleChange('inputEmail', e.target.value)} /></Grid>
                                </Grid>

                                <Grid className="logRow">
                                    <Grid className="regCrtAc">
                                        <input type="submit" value={forget_password} onClick={this.BtnSubmit.bind(this)} />
                                    </Grid >
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
    const { verifyCode } = state.authy;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        verifyCode
    }
};

export default connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, authy })(Index)
// export default Index;