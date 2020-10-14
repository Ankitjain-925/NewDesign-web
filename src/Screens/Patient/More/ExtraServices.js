import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Toggle from 'react-toggle';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/PatientLeftMenu/mobile';
import { LanguageFetchReducer } from './../../actions';
import Loader from './../../Components/Loader/index';
import { Redirect, Route } from 'react-router-dom';
import sitedata from '../../../sitedata';
import "react-toggle/style.css";
import * as translationEN from "../../../translations/en_json_proofread_13072020.json"

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaderImage: false,
            paid_services: [],
            firstServiceData: {},
            secondServiceData: {},
            firstActive: false,
            secondActive: false,
            activated: false,
            deactivated: false,
            error3: false
        };
        // new Timer(this.logOutClick.bind(this))
    }

    componentDidMount() {
        this.getUserData();
    }

    //Not need yet this for the payment
    fromDollarToCent = (amount) => { return parseInt(amount * 100); }
    fromEuroToCent = (amount) => { return parseInt(amount * 100); }
    successPayment = (data) => {
        this.setState({ activated: true })
        setTimeout(() => { this.setState({ activated: false }) }, 5000)
        this.getUserData()
    };

    //If error comes from the API
    errorPayment = (data) => {
        this.setState({ error3: true })
        setTimeout(() => { this.setState({ error3: false }) }, 5000)
        this.getUserData();
    };

    // onToken = (amount, description  )=> token =>{
    //     const user_token = this.props.stateLoginValueAim.token;
    //     axios.post(sitedata.data.path+'/stripeCheckout',{
    //         description,
    //         source: token.id,
    //         currency: CURRENCY,
    //         amount: this.fromEuroToCent(amount)
    //     },{headers:{
    //         'token': user_token,
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }})
    //     .then(this.successPayment)
    //     .catch(this.errorPayment);
    // };

    //Other API with no payment setting for Activate services
    onToken = (description) => {
        this.setState({ loaderImage: true, activated: false, deactivated: false })
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/Bookservice', {
            description
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(this.successPayment)
            .catch(this.errorPayment);
    };

    //For deactivate the services
    Deactivate = (desc) => {
        this.setState({ loaderImage: true, activated: false, deactivated: false })
        axios.delete(sitedata.data.path + '/UserProfile/Bookservice/' + desc,
            {
                headers: {
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed) {
                    if (desc === "Doc Around The Clock") {
                        this.setState({ firstActive: false, deactivated: true })
                    }
                    if (desc === "Data services") {
                        this.setState({ secondActive: false, deactivated: true })
                    }
                    setTimeout(() => { this.setState({ deactivated: false }) }, 5000)
                }
                else {
                    this.setState({ error3: true })
                    setTimeout(() => { this.setState({ error3: false }) }, 5000)
                }
                this.setState({ loaderImage: false })
                this.getUserData();
            })
    }

    //Get the current user data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.data.paid_services) {
                this.setState({ paid_services: response.data.data.paid_services, firstServiceData: {}, secondServiceData: {} })
                for (let i = 0; i < this.state.paid_services.length; i++) {
                    if (this.state.paid_services[i].description == "Doc Around The Clock") {
                        this.setState({ firstServiceData: this.state.paid_services[i], firstActive: true })
                    }
                    if (this.state.paid_services[i].description == "Data services") {
                        this.setState({ secondServiceData: this.state.paid_services[i], secondActive: true })
                    }
                }
            }
            this.setState({ loaderImage: false });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }
    render() {
        const { stateLoginValueAim } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }

        let translate
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
        let { extra, srvc, is, activated, activate, available,  deactivated, srvc_not_updt_cannt_reach_srvr, on, doc_around_clock, cntct_aimedis_medi_team_24_7,
            data_srvcs, stay_upto_date_orgnize_data } = translate;

        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <LeftMenu  isNotShow ={true} currentPage="more" />
                            <LeftMenuMobile isNotShow ={true}  currentPage ="more"/>
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                <Grid className="extraSrvcUpr">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={10}>
                                            <Grid className="extraSrvc">
                                                <h1>{extra} {srvc}</h1>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {this.state.activated && <div className="success_message">{srvc} {is} {activated}</div>}
                                    {this.state.deactivated && <div className="success_message">{srvc} {is} {deactivated}</div>}
                                    {this.state.error3 && <div className="err_message">{srvc_not_updt_cannt_reach_srvr}</div>}

                                    <Grid className="actvMain">
                                        <h2>{activated}</h2>
                                        <Grid container direction="row" spacing="3">
                                            {this.state.firstServiceData && this.state.firstServiceData.created &&
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="docArundUpr">
                                                        <Grid className="docArund">
                                                            <Grid><img src={require('../../../assets/images/24.svg')} alt="" title="" /></Grid>
                                                            <Grid><label>{doc_around_clock}</label></Grid>
                                                            <Grid><p>{cntct_aimedis_medi_team_24_7}</p></Grid>
                                                        </Grid>
                                                        <Grid className="srvcActiv">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={12} md={9}>
                                                                    <p>{srvc} {activated} {on} <span>{this.state.firstServiceData.created}</span></p>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Grid className="acvtTogle">
                                                                        <label><Toggle icons={false} checked={this.state.firstActive} onClick={() => this.Deactivate('Doc Around The Clock')} /></label>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>}

                                            {this.state.secondServiceData && this.state.secondServiceData.created &&
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="docArundUpr">
                                                        <Grid className="docArund">
                                                            <Grid className="dataSrvcImg"><img src={require('../../../assets/images/dataSrvc.png')} alt="" title="" /></Grid>
                                                            <Grid><label>{data_srvcs}</label></Grid>
                                                            <Grid><p>{stay_upto_date_orgnize_data}</p></Grid>
                                                        </Grid>
                                                        <Grid className="srvcActiv">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={12} md={9}>
                                                                    <p>{srvc} {activated} {on} <span>{this.state.firstServiceData.created}</span></p>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Grid className="acvtTogle">
                                                                        <label><Toggle icons={false} checked={this.state.secondActive} onClick={() => this.Deactivate('Data services')} /></label>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>}
                                        </Grid>
                                    </Grid>

                                    <Grid className="actvMain">
                                        <h2>{available}</h2>
                                        <Grid container direction="row" spacing="3">

                                            {!this.state.firstServiceData || !this.state.firstServiceData.created &&
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="docArundUpr">
                                                        <Grid className="docArund">
                                                            <Grid><img src={require('../../../assets/images/24.svg')} alt="" title="" /></Grid>
                                                            <Grid><label>{doc_around_clock}</label></Grid>
                                                            <Grid><p>{cntct_aimedis_medi_team_24_7}</p></Grid>
                                                        </Grid>
                                                        <Grid className="srvcActiv">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={12} md={9}>
                                                                    <p>{activate} {srvc} </p>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Grid className="acvtTogle">
                                                                        <label><Toggle icons={false} onClick={() => this.onToken('Doc Around The Clock')} /></label>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>}

                                            {!this.state.secondServiceData || !this.state.secondServiceData.created &&
                                                <Grid item xs={12} md={3}>
                                                    <Grid className="docArundUpr">
                                                        <Grid className="docArund">
                                                            <Grid className="dataSrvcImg"><img src={require('../../../assets/images/dataSrvc.png')} alt="" title="" /></Grid>
                                                            <Grid><label>{data_srvcs}</label></Grid>
                                                            <Grid><p>{stay_upto_date_orgnize_data}</p></Grid>
                                                        </Grid>
                                                        <Grid className="srvcActiv">
                                                            <Grid container direction="row" justify="center" alignItems="center">
                                                                <Grid item xs={12} md={9}>
                                                                    <p>{activate} {srvc}</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <Grid className="acvtTogle">
                                                                        <label><Toggle icons={false} onClick={() => this.onToken('Data services')} /></label>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>}
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                            {/* End of Website Right Content */}

                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));