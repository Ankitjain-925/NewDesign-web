import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from "Screens/Login/authy.js";
import { OptionList } from "Screens/Login/metadataaction";
import Grid from '@material-ui/core/Grid';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getLanguage } from 'translations/index';
import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { Currency } from "currency1";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Button from "@material-ui/core/Button";
import Loader from "Screens/Components/Loader/index";



var languages = [{ value: 'ar', label: 'Arabian' },
{ value: 'ch', label: 'Chinese' },
{ value: 'nl', label: 'Dutch' },
{ value: 'en', label: 'English' },
{ value: 'fr', label: 'French' },
{ value: 'de', label: 'German' },
{ value: 'pt', label: 'Portuguese' },
{ value: 'rs', label: 'Russian' },
{ value: 'sp', label: 'Spanish' },
{ value: 'sw', label: 'Swahili' },
{ value: 'tr', label: 'Turkish' }]

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state: this.props.LoggedInUser,
            Format: {},
            currency: {},
            dates: this.props.dates,
            times: this.props.times,
            timezones: this.props.timezones,
            loaderImage: false,
            PassDone: false,
            dateF: {},
            timeF: {},
            timezone: {},
            activeshow: false,
            showDemo: 5,
            invoice_pattern: 5
        };
    }

    componentDidMount() {
        this.getSetting();
    }

    demo_pattern = (index) => {
        this.setState({ showDemo: index })
    }

    invoice_pattern = (value) => {
        this.setState({ loaderImage: true })
        let { currency } = this.state
        let data = {
            user_id: this.props.stateLoginValueAim?.user?._id,
            user_profile_id: this.props.stateLoginValueAim?.user?.profile_id,
            invoice_pattern: value,
        }
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', data, commonHeader(this.props.stateLoginValueAim.token)
        ).then((response) => {
            this.setState({ PassDone: true, loaderImage: false, invoice_pattern: value, showDemo: value })
            this.getSetting();
            setTimeout(() => { this.setState({ PassDone: false, loaderImage: false }) },
                5000)
        })
    }

    getSetting = () => {
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/updateSetting',
            commonHeader(this.props.stateLoginValueAim.token))
            .then((responce) => {
                if (responce.data.hassuccessed && responce.data.data) {                    
                    if (responce.data?.data?.invoice_pattern) {
                        this.setState({ invoice_pattern: responce.data?.data?.invoice_pattern , showDemo: responce.data?.data?.invoice_pattern })
                    }
                    this.props.Settings(responce.data.data);
                }
                else {
                    this.setState({ user_id: this.props.stateLoginValueAim.user._id });
                }
                this.setState({ loaderImage: false })
            })
    }

    render() {

        const { selectedOption, attachedFile } = this.state;
        let translate = getLanguage(this.props.stateLanguageType)
        let { Apply, Applied, ViewDemo } = translate;

        return (
            <Grid className={
                this.props.settings &&
                    this.props.settings.setting &&
                    this.props.settings.setting.mode &&
                    this.props.settings.setting.mode === "dark"
                    ? "homeBg darkTheme"
                    : "homeBg"
            }>

                <Grid className="homeBgIner">
                    {this.state.loaderImage && <Loader />}
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="more" />
                            <Grid container direction="row">
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="more" />
                                </Grid>
                                <Grid item xs={12} md={11} className="colorbtn">
                                    <Grid className="tskOverView tskOverView2">
                                        <Grid className="pattern-sec">
                                            <a onClick={() => this.demo_pattern(1)}><Button className={this.state.invoice_pattern === 1 && "appliedbutton"}>A</Button></a>
                                            <a onClick={() => this.demo_pattern(1)}>{ViewDemo} A</a>
                                            <a onClick={() => this.invoice_pattern(1)}>{this.state.invoice_pattern === 1 ? <span className="AppliedPattern">{Applied}</span> : <span className="ApplyPattern">{Apply}</span>}</a>
                                        </Grid>
                                        <Grid className="pattern-sec">
                                            <a onClick={() => this.demo_pattern(2)}><Button className={this.state.invoice_pattern === 2 && "appliedbutton"}>B</Button></a>
                                            <a onClick={() => this.demo_pattern(2)}>{ViewDemo} B</a>
                                            <a onClick={() => this.invoice_pattern(2)}>{this.state.invoice_pattern === 2 ? <span className="AppliedPattern">{Applied}</span> : <span className="ApplyPattern">{Apply}</span>}</a>
                                        </Grid>
                                        <Grid className="pattern-sec">
                                            <a onClick={() => this.demo_pattern(3)}><Button className={this.state.invoice_pattern === 3 && "appliedbutton"}>C</Button></a>
                                            <a onClick={() => this.demo_pattern(3)}>{ViewDemo} C</a>
                                            <a onClick={() => this.invoice_pattern(3)}>{this.state.invoice_pattern === 3 ? <span className="AppliedPattern">{Applied}</span> : <span className="ApplyPattern">{Apply}</span>}</a>
                                        </Grid>
                                        <Grid className="pattern-sec">
                                            <a onClick={() => this.demo_pattern(4)}><Button className={this.state.invoice_pattern === 4 && "appliedbutton"}>D</Button></a>
                                            <a onClick={() => this.demo_pattern(4)}>{ViewDemo} D</a>
                                            <a onClick={() => this.invoice_pattern(4)}>{this.state.invoice_pattern === 4 ? <span className="AppliedPattern">{Applied}</span> : <span className="ApplyPattern">{Apply}</span>}</a>
                                        </Grid>
                                        <Grid className="pattern-sec">
                                            <a onClick={() => this.demo_pattern(5)}><Button className={this.state.invoice_pattern === 5 && "appliedbutton"}>E</Button></a>
                                            <a onClick={() => this.demo_pattern(5)}>{ViewDemo} E</a>
                                            <a onClick={() => this.invoice_pattern(5)}>{this.state.invoice_pattern === 5 ? <span className="AppliedPattern">{Applied}</span> : <span className="ApplyPattern">{Apply}</span>}</a>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <Grid className="demOverView">
                                            {this.state.showDemo == 1 &&
                                                <>
                                                    <h1>{ViewDemo} A</h1>
                                                    <img
                                                        src={require("assets/virtual_images/IP5.png")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </>}
                                            {this.state.showDemo == 2 &&
                                                <>
                                                    <h1>{ViewDemo} B</h1>
                                                    <img
                                                        src={require("assets/virtual_images/IP2.png")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </>}
                                            {this.state.showDemo == 3 &&
                                                <>
                                                    <h1>{ViewDemo} C</h1>
                                                    <img
                                                        src={require("assets/virtual_images/IP3.png")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </>}
                                            {this.state.showDemo == 4 &&
                                                <>
                                                    <h1>{ViewDemo} D</h1>
                                                    <img
                                                        src={require("assets/virtual_images/IP1.png")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </>}
                                            {this.state.showDemo == 5 &&
                                                <>
                                                    <h1>{ViewDemo} E</h1>
                                                    <img
                                                        src={require("assets/virtual_images/IP4.png")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </>}
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
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        metadata,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        OptionList,
        LanguageFetchReducer,
        Settings,
        authy,

    })(Index)
);