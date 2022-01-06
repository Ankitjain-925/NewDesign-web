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
            showDemo: 0,
            showAplMsg: "A"
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
            this.setState({ PassDone: true, loaderImage: false, showAplMsg: value })
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
                    if (responce.data?.data?.msg_language) {
                        let msg_language = responce.data.data.msg_language;
                        let filterData = languages && languages.length > 0 && languages.filter((data) => data.value === msg_language)
                        if (filterData && filterData.length > 0) {
                            this.setState({ msg_language: filterData[0] })
                        }
                    }
                    if (responce.data?.data?.currency) {
                        let currency = responce.data.data.currency;
                        let filterData = Currency && Currency.length > 0 && Currency.filter((data) => data.value === currency.country)
                        if (filterData && filterData.length > 0) {
                            this.setState({ currency: filterData[0] })
                        }
                    }
                    this.setState({ timezone: responce.data.data.timezone, timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                    this.setState(responce.data.data);
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
        let { } = translate;

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
                                        <Grid>
                                            <a onClick={() => this.demo_pattern(1)}><Button>A</Button></a>
                                            <p onClick={() => this.demo_pattern(1)}>View Demo A</p>
                                            <a onClick={() => this.invoice_pattern(1)}>{this.state.showAplMsg === 1 ? "Appiled" : "Apply"}</a>
                                        </Grid>
                                        <Grid>
                                            <a onClick={() => this.demo_pattern(2)}><Button>B</Button></a>
                                            <p onClick={() => this.demo_pattern(2)}>View Demo B</p>
                                            <a onClick={() => this.invoice_pattern(2)}>{this.state.showAplMsg === 2 ? "Appiled" : "Apply"}</a>
                                        </Grid>
                                        <Grid>
                                            <a onClick={() => this.demo_pattern(3)}><Button>C</Button></a>
                                            <p onClick={() => this.demo_pattern(3)}>View Demo C</p>
                                            <a onClick={() => this.invoice_pattern(3)}>{this.state.showAplMsg === 3 ? "Appiled" : "Apply"}</a>
                                        </Grid>
                                        <Grid>
                                            <a onClick={() => this.demo_pattern(4)}><Button>D</Button></a>
                                            <p onClick={() => this.demo_pattern(4)}>View Demo D</p>
                                            <a onClick={() => this.invoice_pattern(4)}>{this.state.showAplMsg === 4 ? "Appiled" : "Apply"}</a>
                                        </Grid>
                                        <Grid>
                                            <a onClick={() => this.demo_pattern(5)}><Button>E</Button></a>
                                            <p onClick={() => this.demo_pattern(5)}>View Demo E</p>
                                            <a onClick={() => this.invoice_pattern(5)}>{this.state.showAplMsg === 5 ? "Appiled" : "Apply"}</a>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={12} className="colorbtn">
                                        <Grid className="demOverView">
                                            {this.state.showDemo == 1 && <h1>View Demo A</h1>}
                                            {this.state.showDemo == 2 && <h1>View Demo B</h1>}
                                            {this.state.showDemo == 3 && <h1>View Demo C</h1>}
                                            {this.state.showDemo == 4 && <h1>View Demo D</h1>}
                                            {this.state.showDemo == 5 && <h1>View Demo E</h1>}
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