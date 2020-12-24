import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import FileViews from './../FileViews/index';
import ReactTooltip from "react-tooltip";
import DownloadFullTrack from './../../DownloadFullTrack/index.js';
import { getDate, newdate, getTime, getImage } from './../../BasicMethod/index';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {GetShowLabel1} from "../../GetMetaData/index.js";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en.json";
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
import * as translationFR from '../../../../translations/fr.json';
import * as translationAR from '../../../../translations/ar.json';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive: this.props.archive,
            loggedinUser: this.props.loggedinUser,
            images: this.props.images,
            TrackRecord: this.props.TrackRecord
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({
                item: this.props.data, loggedinUser: this.props.loggedinUser
            })
        }
        if (prevProps.images !== this.props.images) {
            this.setState({ images: this.props.images })
        }
        if(prevProps.TrackRecord !== this.props.TrackRecord)
        {
            this.setState({ TrackRecord: this.props.TrackRecord})
        }
    }

    render() {
        var item = this.state.item;
        let translate={};
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
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
            default:
                translate = translationEN.text
        }
        let { lab_result, visibility, Download, Delete, visible, img_files, details, hide, title, show, VeiwGraph, date, time, upr_limit, lwr_limit, lab_parameter, first_day_visit, always, edit, date_of_death, date_of_dieses_patient, dob, day_doc_visit, gender_of_relatives, relation_of_relative, Change, speciality, hosp_id, hosp_name, doc_id, traveled, slct_ICD_serch_code, when, to, allergy, enter_code_serch_by_keyword, dignose, of, until, archive, rr_systolic, attachments, time_measure, date_measure,
              confirm_diag, emergancy_dignosis, trvl_diagnosis, value, doc_name,  first_visit_day, last_visit_day, diagnosed, by, notes, save_entry, emergency, diagnosis, review, on, not_mentioned, de_archive } = translate
 
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={12} md={1} className="descpCntntLft">
                    {newdate(item.datetime_on)}
                </Grid>
                <Grid item xs={12} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght descpInerBlue">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg">
                                    <a className="blodPrsurNote"><img src={require('../../../../assets/images/laboratory-result.svg')} alt="" title="" />
                                        <span>{lab_result}</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec scndOptionIner1">
                                    <a onClick={()=>this.props.EidtOption(item.type, item, true)} className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> {item.visible === 'show' ?<span>{visible}</span> : item.visible=== 'hide' ? <span>{hide}</span> : <span>{not_mentioned}</span>}   </a>
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                        {item.visible === 'show' ? <label>{show} {until}</label> : <label>{hide} {until}</label>}
                                        {item.public === 'always' ? <p> {always} </p> : item.public ? <p>{getDate(item.public, this.state.date_format)}</p>: <p>{not_mentioned}</p>}
                                    </ReactTooltip>
                                    <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        {!this.props.Archive ? <ul>
                                            <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />{archive}</a></li>
                                            {this.props.comesfrom === 'patient' &&  <li>
                                                    {item.created_by === this.state.loggedinUser._id && ( !item.updated_by || item.updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a>
                                                    : <a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a>
                                                    }
                                                 </li>}
                                                {this.props.comesfrom !== 'patient' && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            <li><a onClick={() => this.props.downloadTrack(item)}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />{Download}</a></li>
                                            <li><DownloadFullTrack TrackRecord={this.state.TrackRecord}/></li>
                                            <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{Delete}</a></li>
                                        </ul> :
                                            <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />{de_archive}</a></li>
                                                <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{Delete}</a></li>
                                            </ul>}
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="bp_hg addSpc">
                            <label><span>{item.lab_parameter && GetShowLabel1(this.props.lrp, item.lab_parameter && item.lab_parameter.value, this.props.stateLanguageType, true,'lpr')}</span> {item.value && item.value} <span>{item.unit && item.unit.label}</span></label>
                            {/* <p>Normal</p> */}
                        </Grid>

                        <Grid container direction="row" className="addSpc bpJohnMain">
                            <Grid item xs={12} md={12}>
                            <Grid className="bpJohnImg">
                                    <a data-tip data-for={item.track_id + 'created'}><img src={getImage(item.created_by_image, this.state.images)} alt="" title="" />
                                        <span>{item.created_by_temp}</span>
                                    </a>
                                    <ReactTooltip className="timeIconClas_crested" id={item.track_id + 'created'} place="top" effect="solid" backgroundColor="#ffffff">
                                        <p>{item.created_by_temp}</p>
                                        <p>{item.created_by_profile}</p>
                                        <p><img src={getImage(item.created_by_image, this.state.images)} alt="" title="" /></p>
                                    </ReactTooltip>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger={details} open="true">
                                <Grid className="detailCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{value}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.value && item.value} {item.unit && item.unit.label}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{upr_limit}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.upper_limit && item.upper_limit}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{lwr_limit}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.lower_limit && item.lower_limit}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{lab_parameter}</label></Grid>
                                                <Grid item xs={7} md={7} className="lrlp"><span>{item.lab_parameter && GetShowLabel1(this.props.lrp, item.lab_parameter && item.lab_parameter.value, this.props.stateLanguageType, true,'lpr')}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{date} & {time}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.date_measured && getDate(item.date_measured, this.state.date_format)} {item.time_measured && ', ' + getTime(new Date(item.time_measured), this.state.time_foramt)}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                    <Grid className="bp_graph">
                                        {/* <Grid><img src={require('../../../../assets/images/gp.png')} alt="" title="" /></Grid> */}
                                        {item.lab_parameter && item.lab_parameter.value ==='Creatinine' && <Grid><a onClick={()=> this.props.OpenGraph('laboratory_result')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='AST/GOT' && <Grid><a onClick={()=> this.props.OpenGraph('ast/got')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='GGT' && <Grid><a onClick={()=> this.props.OpenGraph('ggt')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='Sodium' && <Grid><a onClick={()=> this.props.OpenGraph('sodium')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='Thrombocytes' && <Grid><a onClick={()=> this.props.OpenGraph('thrombocytes')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='Pancreaticlipase' && <Grid><a onClick={()=> this.props.OpenGraph('pancreaticlipase')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='Leucocytes' && <Grid><a onClick={()=> this.props.OpenGraph('leucocytes')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='Hemoglobine' && <Grid><a onClick={()=> this.props.OpenGraph('hemoglobine')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='Potassium' && <Grid><a onClick={()=> this.props.OpenGraph('potassium')}>{VeiwGraph}</a></Grid>}
                                        {item.lab_parameter && item.lab_parameter.value ==='ALT/GPT' && <Grid><a onClick={()=> this.props.OpenGraph('alt/gpt')}>{VeiwGraph}</a></Grid>}
                                    </Grid>
                                </Grid>
                            </Collapsible>
                        </Grid>
                        <Grid className="addSpc detailMark">
                            <Collapsible trigger={img_files} open="true">
                                <FileViews images={this.state.images} attachfile={item.attachfile} />
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
