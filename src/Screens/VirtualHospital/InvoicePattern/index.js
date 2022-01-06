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



const types = ['A', 'B', 'C', 'D'];


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
            activeshow:false



        };
    }

    componentDidMount() {
        this.getSetting();

    }

    invoice_pattern = (index) => {
        if(index==2){
            this.setState({activeshow:true})
        }
        this.setState({ loaderImage: true })
        let { currency } = this.state
        let data = {
            user_id: this.props.stateLoginValueAim?.user?._id,
            user_profile_id: this.props.stateLoginValueAim?.user?.profile_id,
            invoice_pattern: index,


        }
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', data, commonHeader(this.props.stateLoginValueAim.token)
        ).then((responce) => {
            this.setState({ PassDone: true, loaderImage: false })
            this.getSetting();
            setTimeout(() => { this.setState({ PassDone: false }) }, 5000)
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
        let {  } = translate;

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
                    <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                            <LeftMenuMobile isNotShow={true} currentPage="more" />
                            <Grid container direction="row">
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="more" />
                                </Grid>

                                <Grid item xs={12} md={3} className="colorBtnUpr">
                                    <Grid className="tskOverView ">
                                        <a onClick={() => this.invoice_pattern("0")}>
                                         A
                                           
                                            </a>
                                        <a onClick={() => this.invoice_pattern("1")}>
                                            B
                                        </a>
                                       
                                        <Grid className="buttonCDstyle" >
                                            
                                            <a
                                             onClick={() => this.invoice_pattern("2")}>
                                                C
                                                </a>
                                             <a onClick={() => this.invoice_pattern("3")}>
                                                D
                                            </a>
                                           
                                         
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