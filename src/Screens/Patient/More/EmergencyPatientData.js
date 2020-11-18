import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/PatientLeftMenu/mobile';
import sitedata from '../../../sitedata';
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../actions';
import { Redirect, Route } from 'react-router-dom';
import { authy } from './../../Login/authy.js';
import EmergencyCall from './../../Components/EmergencyPage/index'
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';
import Notification from "../../Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";

const path = sitedata.data.path + '/emergency_record';


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
  
    componentDidMount() {
    }
  
    render() {
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
        let { ur_emergancy_data } = translate;

        const { stateLoginValueAim } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'patient' || !this.props.verifyCode || !this.props.verifyCode.code) {
            return (<Redirect to={'/'} />);
        }
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <LeftMenu  isNotShow ={true} currentPage ="more"/>
                            <LeftMenuMobile isNotShow ={true}  currentPage ="more"/>
                            <Notification />
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                <Grid className="emrgncyDataUpr">
                                   
                                    {/* call Emergency Section */}
                                    <EmergencyCall byUser="patient"/>

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
    const {settings} = state.Settings;
    const { verifyCode } = state.authy;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,

        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(Index));