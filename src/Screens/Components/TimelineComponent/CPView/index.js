import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Condition from './../../Condition/index';
import PainPoint from './../../PointPain/index';
import PainIntensity from './../../PainIntansity/index';
import { getDate, newdate, getTime } from './../../BasicMethod/index';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive : this.props.archive,
            loggedinUser : this.props.loggedinUser
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({   item: this.props.data, loggedinUser : this.props.loggedinUser})
        }
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
        let { blood_pressure, selct_pain_area, situation, visible, pain_areas, Change, show, hide, until, archive, rr_systolic, attachments, time_measure, date_measure,
            visibility, edit, Delete, condition_pain, RR_diastolic, pain_type, de_archive, pain_quality, always, feeling, date, time }= translate
        
        var item = this.state.item;
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={1} md={1} className="descpCntntLft">
                    {newdate(item.created_on)}
                </Grid>
                <Grid item xs={11} md={10} className="descpCntntRght">
                            <Grid className="descpInerRght">
                                <Grid container direction="row" className="addSpc">
                                    <Grid item xs={12} md={6}>
                                        <Grid className="conPainImg">
                                            <a className="conPainNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>{condition_pain}</span> </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Grid className="bp_vsblSec scndOptionIner1">
                                            <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>{visible}</span> </a>
                                            <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                                <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                            </a>
                                            <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                                {item.visible==='show' ? <label>{show} {until}</label> :  <label>{hide} {until}</label> }
                                                {item.public === 'always' ? <p> {always} </p> : <p>{getDate(item.public, this.state.date_format)}</p> }
                                            </ReactTooltip>
                                            {/* <a className="bp_vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                            
                                            </a> */}
                                            <a className="openScndhrf1">
                                                <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd1" />
                                                {!this.props.Archive ? <ul>
                                                    <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />Archive</a></li>
                                                    {this.state.loggedinUser._id === item.created_by && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                                    {this.state.loggedinUser._id !== item.created_by && <li><a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a></li>}
                                                    <li><a onClick={(deleteKey)=>this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{Delete}</a></li>
                                                </ul>:
                                                <ul>
                                                    <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />{de_archive}</a></li>
                                                    <li><a onClick={(deleteKey)=>this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{Delete}</a></li>
                                                </ul>}
                                            </a>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>

                                <Grid className="conPain_num addSpc">
                                    <label>{item.problem && item.problem}</label>
                                    <p>{item.pain_type && item.pain_type.label}</p>
                                </Grid>

                                <Grid container direction="row" className="addSpc conPain_Cntnt">
                                    <Grid item xs={12} md={5}>
                                        <Grid className="conPain_Img">
                                            <a><img src={require('../../../../assets/images/person1.jpg')} alt="" title="" />
                                                <span>{item.created_by_temp}</span>
                                            </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        {/* <Grid className="conPain_MDCImg">
                                            <a><img src={require('../../../../assets/images/hLogo.jpg')} alt="" title="" />
                                                <span>Illinois Masonic Medical Center</span>
                                            </a>
                                        </Grid> */}
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>

                                <Grid container direction="row" className="addSpc conPainGraph">
                                    <Grid item xs={12} md={5}>
                                        <Grid className="conPainLft">
                                            <Grid className="conPainArea"><label>{pain_areas}</label></Grid>
                                            <PainPoint id={item.track_id} gender={this.state.gender} painPoint={item.painPoint} isView={true} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="conPainRght">
                                            <Grid className="painIntencty">
                                                <PainIntensity name="pain_intensity" Forview={true} onChange={(e)=> this.props.updateEntryState(e)} value={item.pain_intensity}/>
                                            </Grid>

                                            <Grid className="condIntencty">
                                                <Condition name="feeling"  onChange={(e)=> this.props.updateEntryState(e)} value={item.feeling}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="clear"></Grid>
                                </Grid>

                                <Grid className="addSpc detailMark">
                                    <Collapsible trigger="Details" open="true">
                                        <Grid>
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={6} className="painTypeBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{pain_type}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{item.pain_type && item.pain_type.label}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="painTypeBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>{pain_quality}</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{item.pain_quality && item.pain_quality.label}</span></Grid>
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
                                            <p dangerouslySetInnerHTML={{__html: item.remarks}} />
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
