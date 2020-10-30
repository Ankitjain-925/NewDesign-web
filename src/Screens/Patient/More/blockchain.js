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
import Collapsible from 'react-collapsible';
import sitedata from '../../../sitedata';
import "react-toggle/style.css";
import { getDate, getImage } from './../../Components/BasicMethod/index'
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/en.json';
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PatientFullData: {}
        };
        // new Timer(this.logOutClick.bind(this))
    }

    componentDidMount() {
        this.getHyperdata()
    }


    getHyperdata = () => {
        axios.post(sitedata.data.path + '/blockchain/dataManager', {
            path: "dataManager/getDetails/patient",
            data: { "_selfId": this.props.stateLoginValueAim.user.profile_id, "_patientId": this.props.stateLoginValueAim.user.profile_id }
        })
            .then(response3 => {
                this.setState({ PatientFullData: response3.data });
            })
            .catch(err => {
                axios.post(sitedata.data.path + '/blockchain/dataManager', {
                    path: "dataManager/generate/token/patient",
                    data: { "_password": '123456' }
                })
                    .then(response5 => {
                        axios.post(sitedata.data.path + '/blockchain/dataManager', {
                            path: "dataManager/add/patient",
                            data: {
                                "_patientId": this.props.stateLoginValueAim.user.profile_id,
                                "_publicKey": response5.data.address,
                                "_patientData": {
                                    "email": this.props.stateLoginValueAim.user.email,
                                    "First Name": this.props.stateLoginValueAim.user.first_name,
                                    "Last Name": this.props.stateLoginValueAim.user.last_name,
                                    "DOB": this.props.stateLoginValueAim.user.birthday,
                                    "Sex": this.props.stateLoginValueAim.user.sex,
                                    "Address": this.props.stateLoginValueAim.user.city,
                                    "Contact Email": this.props.stateLoginValueAim.user.email,
                                    "Language": this.props.stateLoginValueAim.user.language
                                }
                            }
                        })
                            .then(response6 => {
                                this.getHyperdata()
                            })
                    })
            })


    }

    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient') {
            return (<Redirect to={'/'} />);
        }
        let translate
      switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { blockchain_access_log, created_by, log_type, time_created } = translate;


        return ( 
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage="more" />
                                <LeftMenuMobile isNotShow ={true}  currentPage ="more"/>
                                {/* End of Website Menu */}

                                {/* Website Mid Content */}
                                <Grid item xs={12} md={8}>
                                    <Grid className="blockChainLog">
                                        <h1>{blockchain_access_log}</h1>
                                        <Grid className="blockChainDtail">

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainHead">
                                                    <Grid><label>{log_type}</label></Grid>
                                                    <Grid><label>{created_by}</label></Grid>
                                                    <Grid><label>{time_created}</label></Grid>
                                                </Grid>

                                                {Object.entries(this.state.PatientFullData).map(([key, value]) => (
                                                    (key !== '' && key == "Track Record") && <div>
                                                        {typeof value !== "string" && <div>
                                                            {Object.entries(value).map(([k, v]) => (
                                                                <div>
                                                                    <Grid className="blochChainIner">
                                                                        <Grid><label>{v.type && v.type.charAt(0).toUpperCase() + v.type.slice(1).replace("_", " ")}</label></Grid>
                                                                        <Grid><label>{v.created_by_temp && v.created_by_temp}</label></Grid>
                                                                        <Grid><label>{v.created_on && getDate(v.created_on)}</label></Grid>
                                                                        <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                                    </Grid>
                                                                    <Collapsible trigger="">
                                                                        <Grid container direction="row" className="subsDetails">
                                                                            <Grid item xs={12} md={10}>
                                                                                {k !== '' && typeof v === "string" ?
                                                                                    <Grid container direction="row">
                                                                                        <Grid item xs={12} md={5}><span>{k}</span></Grid>
                                                                                        <Grid item xs={12} md={7}><label>{v}</label></Grid>
                                                                                    </Grid>
                                                                                    : <div>
                                                                                        {Object.entries(v).map(([k1, v1]) => (
                                                                                            k1 !== '' && k1 !== 'track_id' && k1 !== 'created_by_temp2' && k1 !== 'review_by' &&
                                                                                            k1 !== 'review_on' && k1 !== 'review_by_temp' && k1 !== 'emergency_by_temp' && k1 !== 'created_at' && k1 !== 'created_by'
                                                                                            && k1 !== 'emergency_on' && k1 !== 'emergency_by' && k1 !== "created_by_temp" && k1 !== "datetime_on" && k1 !== "type"
                                                                                            && typeof v1 === 'string' && <Grid container direction="row">
                                                                                                <Grid item xs={12} md={5}><span>{k1.charAt(0).toUpperCase() + k1.slice(1).replace("_", " ")}</span></Grid>
                                                                                                <Grid item xs={12} md={7}><label>{v1}</label></Grid>
                                                                                            </Grid>
                                                                                        ))}
                                                                                    </div>}
                                                                                {/* <Grid container direction="row">
                                                                                    <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                                    <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                                                </Grid>
                                                                                <Grid container direction="row">
                                                                                    <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                                    <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                                                </Grid> */}
                                                                            </Grid>
                                                                            {/* <Grid item xs={12} md={6}>
                                                                                <Grid container direction="row">
                                                                                    <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                                    <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                                                </Grid>
                                                                                <Grid container direction="row">
                                                                                    <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                                    <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                                                </Grid>
                                                                                <Grid container direction="row">
                                                                                    <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                                    <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                                                </Grid>
                                                                            </Grid> */}
                                                                        </Grid>
                                                                    </Collapsible>
                                                                </div>
                                                            ))}
                                                        </div>}
                                                    </div>
                                                ))}




                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>
                                            {/* 
                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    <Grid container direction="row" className="subsDetails">
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Diagnosed by</span></Grid>
                                                                <Grid item xs={12} md={7}><label>Mark Anderson M.D.</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                            <Grid container direction="row">
                                                                <Grid item xs={12} md={5}><span>Date of diagnose</span></Grid>
                                                                <Grid item xs={12} md={7}><label>20/05/2020</label></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid>

                                            <Grid className="blockChainUpr">
                                                <Grid className="blochChainIner">
                                                    <Grid><label>Diagnosis</label></Grid>
                                                    <Grid><label>Mark Anderson M.D.</label></Grid>
                                                    <Grid><label>20/05/2020</label></Grid>
                                                    <img src={require('../../../assets/images/down2.png')} alt="" title="" className="cstmDown" />
                                                </Grid>
                                                <Collapsible trigger="">
                                                    Dummy
                                                </Collapsible>
                                            </Grid>
                                            <Grid className="blockChainBrdr"></Grid> */}

                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* End of Website Right Content */}

                            </Grid>
                        </Grid>
                    </Grid >
                </Grid >
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
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