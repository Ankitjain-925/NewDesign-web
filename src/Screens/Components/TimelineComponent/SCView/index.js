import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.data || {},
        };
    }

    componentDidMount = () => {

    }

    render() {
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
        let { diagnosed, until, visible, multiple_lesions_again_suggest, mild_depresive_episode, blood, picture, add_profile, BMI, height, weight, pain_type, de_archive,
            depression, ur_trade_name, always, feeling, date, time, by, allergy, on, diagnosis, travel } = translate

        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={1} md={1} className="descpCntntLft">
                    <a>21 <span>May</span></a>
                </Grid>
                <Grid item xs={11} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="diagnosImg">
                                    <a className="diagnosNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>{diagnosis}</span> </a>
                                    <a className="diagnosAwrd"><img src={require('../../../../assets/images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                    <a className="diagnosBus"><img src={require('../../../../assets/images/emergency-diagnosis.svg')} alt="" title="" /></a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="vsblSec">
                                    <a className="vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>{visible}</span> </a>
                                    <a className="vsblTime" data-tip data-for="timeIconTip">
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id="timeIconTip" place="top" effect="solid" backgroundColor="#ffffff">
                                        <label>{visible} {until}</label>
                                        <p>12/08/2020</p>
                                    </ReactTooltip>
                                    <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="icd_num addSpc">
                            <label>{depression}</label>
                            <a data-tip data-for="icdtxtTip">ICD: F32.0</a>
                            <ReactTooltip className="icdtxtClas" id="icdtxtTip" place="top" effect="solid" backgroundColor="#ffffff">
                                <h4>{mild_depresive_episode}</h4>
                            </ReactTooltip>
                        </Grid>

                        <Grid container direction="row" className="addSpc markCntntMain">
                            <Grid item xs={12} md={5}>
                                <Grid className="markCntntImg">
                                    <a><img src={require('../../../../assets/images/person1.jpg')} alt="" title="" />
                                        <span>Mark Anderson M.D. (Doctor)</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Grid className="markMDCntntImg">
                                    <a><img src={require('../../../../assets/images/hLogo.jpg')} alt="" title="" />
                                        <span>Illinois Masonic Medical Center</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Details" open="true">
                                <Grid className="detailCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{diagnosed} {by}</label></Grid>
                                                <Grid item xs={7} md={7}><span>Mark Anderson M.D.</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{allergy}</label></Grid>
                                                <Grid item xs={7} md={7}><span>No</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{diagnosed} {on}</label></Grid>
                                                <Grid item xs={7} md={7}><span>20/05/2020</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{travel} {diagnosis}</label></Grid>
                                                <Grid item xs={7} md={7}>
                                                    <span>Yes</span>
                                                    <a className="yesInfo" data-tip data-for="yesInfoTip">
                                                        <img src={require('../../../../assets/images/yesinfo.jpg')} alt="" title="" />
                                                    </a>
                                                    <ReactTooltip className="yesInfoClas" id="yesInfoTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                        <h4>Traveled to Africa</h4>
                                                        <p>06/02/2020 - 26/02/2020</p>
                                                    </ReactTooltip>
                                                </Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                </Grid>
                            </Collapsible>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Notes" open="true">
                                <Grid className="detailCntnt">
                                    <p>
                                        {multiple_lesions_again_suggest}
                                    </p>
                                </Grid>
                            </Collapsible>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Images & Files" open="true">
                                <Grid className="imgsFile">
                                    <a><img src={require('../../../../assets/images/agedman.png')} alt="" title="" />
                                        <label>IMG_23_6_2020_09_18.jpg</label></a>
                                    <a><img src={require('../../../../assets/images/pdfimg.png')} alt="" title="" />
                                        <label>No_name_file.pdf</label></a>
                                </Grid>
                            </Collapsible>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));


