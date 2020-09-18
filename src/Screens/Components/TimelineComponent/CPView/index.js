import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Condition from './../../Condition/index';
import FileViews from  './../FileViews/index';
import PainPoint from './../../PointPain/index';
import PainIntensity from './../../PainIntansity/index';
import { getDate, newdate, getTime } from './../../BasicMethod/index';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive: this.props.archive,
<<<<<<< HEAD
            loggedinUser: this.props.loggedinUser
=======
            loggedinUser: this.props.loggedinUser,
            images: this.props.images,
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
<<<<<<< HEAD
            this.setState({ item: this.props.data, loggedinUser: this.props.loggedinUser })
=======
            this.setState({
                item: this.props.data, loggedinUser: this.props.loggedinUser
            })
        }
        if(prevProps.images !== this.props.images)
        {
            this.setState({ images: this.props.images})
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
        }
    }

    render() {
<<<<<<< HEAD
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
            visibility, edit, Delete, condition_pain, RR_diastolic, pain_type, de_archive, pain_quality, always, feeling, date, time } = translate

=======
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
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
<<<<<<< HEAD
                                    <a className="conPainNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>{condition_pain}</span> </a>
=======
                                    <a className="conPainNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Condition and Pain</span> </a>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec scndOptionIner1">
<<<<<<< HEAD
                                    <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>{visible}</span> </a>
=======
                                    <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
<<<<<<< HEAD
                                        {item.visible === 'show' ? <label>{show} {until}</label> : <label>{hide} {until}</label>}
                                        {item.public === 'always' ? <p> {always} </p> : <p>{getDate(item.public, this.state.date_format)}</p>}
=======
                                        {item.visible === 'show' ? <label>Show until</label> : <label>Hide until</label>}
                                        {item.public === 'always' ? <p> Always </p> : <p>{getDate(item.public, this.state.date_format)}</p>}
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
                                    </ReactTooltip>
                                    {/* <a className="bp_vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                            
                                            </a> */}
                                    <a className="openScndhrf1">
                                        <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd1" />
                                        {!this.props.Archive ? <ul>
                                            <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />Archive</a></li>
<<<<<<< HEAD
                                            {this.state.loggedinUser._id === item.created_by && <li><a onClick={() => this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />{edit}</a></li>}
                                            {this.state.loggedinUser._id !== item.created_by && <li><a onClick={() => this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{Change} {visibility}</a></li>}
                                            <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{Delete}</a></li>
                                        </ul> :
                                            <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />{de_archive}</a></li>
                                                <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{Delete}</a></li>
=======
                                            {this.state.loggedinUser._id === item.created_by && <li><a onClick={() => this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />Edit</a></li>}
                                             {this.state.loggedinUser._id !== item.created_by && <li><a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Change Visibility</a></li>}
<li><a onClick={() => this.props.downloadTrack(item)}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />Download</a></li>
                                            <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                        </ul> :
                                            <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />De-Archive</a></li>
                                                <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
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
<<<<<<< HEAD
                                    <Grid className="conPainArea"><label>{pain_areas}</label></Grid>
=======
                                    <Grid className="conPainArea"><label>Pain areas</label></Grid>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
                                    <PainPoint id={item.track_id} gender={this.state.gender} painPoint={item.painPoint} isView={true} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Grid className="conPainRght">
                                    <Grid className="painIntencty">
                                        <PainIntensity name="pain_intensity" Forview={true} onChange={(e) => this.props.updateEntryState(e)} value={item.pain_intensity} />
                                    </Grid>

                                    <Grid className="condIntencty">
                                        <Condition name="feeling" onChange={(e) => this.props.updateEntryState(e)} value={item.feeling} />
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
<<<<<<< HEAD
                                                <Grid item xs={5} md={5}><label>{pain_type}</label></Grid>
=======
                                                <Grid item xs={5} md={5}><label>Pain type</label></Grid>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
                                                <Grid item xs={7} md={7}><span>{item.pain_type && item.pain_type.label}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="painTypeBy">
                                            <Grid container direction="row">
<<<<<<< HEAD
                                                <Grid item xs={5} md={5}><label>{pain_quality}</label></Grid>
=======
                                                <Grid item xs={5} md={5}><label>Pain quality</label></Grid>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
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
                                    <p dangerouslySetInnerHTML={{ __html: item.remarks }} />
                                </Grid>
                            </Collapsible>
<<<<<<< HEAD
=======
                        </Grid>
                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Images & Files" open="true">
                                <FileViews images={this.state.images} attachfile={item.attachfile} />
                            </Collapsible>
>>>>>>> 4f7b64eba60feaeb2f06b8d1b66c0e9a5fdb6094
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Index;