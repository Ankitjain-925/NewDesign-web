import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import FileViews from './../FileViews/index';
import ReactTooltip from "react-tooltip"
import { getDate, newdate, getTime, getImage } from './../../BasicMethod/index';

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
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({
                item: this.props.data, loggedinUser: this.props.loggedinUser,
            })
        }
        if(prevProps.images !== this.props.images)
        {
            this.setState({ images: this.props.images})
        }
    }

    render() {
        var item = this.state.item;
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={12} md={1} className="descpCntntLft">
                    {newdate(item.datetime_on)}
                </Grid>
                <Grid item xs={12} md={10} className="descpCntntRght">
                    <Grid className="descpInerRght">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="diagnosImg">
                                    <a className="diagnosNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Diagnosis</span> </a>
                                    <a className="diagnosAwrd" data-tip data-for={item.track_id + 'review'} ><img src={require('../../../../assets/images/confirmed-diagnosis.svg')} alt="" title="" /></a>
                                    {item.review_by && <ReactTooltip className="timeIconClas" id={item.track_id + 'review'} place="top" effect="solid" backgroundColor="#ffffff">
                                        <label>Review By</label>
                                        <p> {item.review_by_temp ? item.review_by_temp : ''} </p>
                                        <label>Review On</label>
                                        <p> {item.review_on && getDate(item.review_on, this.state.date_format)}</p>
                                    </ReactTooltip>}
                                    <a className="diagnosBus" data-tip data-for={item.track_id + 'emergency'}><img src={require('../../../../assets/images/emergency-diagnosis.svg')} alt="" title="" /></a>
                                    {item.emergency_by && <ReactTooltip className="timeIconClas" id={item.track_id + 'emergency'} place="top" effect="solid" backgroundColor="#ffffff">
                                        <label>Emergency By</label>
                                        <p> {item.emergency_by_temp ? item.emergency_by_temp : ''} </p>
                                        <label>Emergency On</label>
                                        <p> {item.review_on && getDate(item.emergency_on, this.state.date_format)}</p>
                                    </ReactTooltip>}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec scndOptionIner1">
                                    <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                        {item.visible === 'show' ? <label>Show until</label> : <label>Hide until</label>}
                                        {item.public === 'always' ? <p> Always </p> : item.public ? <p>{getDate(item.public, this.state.date_format)}</p>: <p>Not mentioned</p>}
                                    </ReactTooltip>
                                    <a className="openScndhrf1">
                                        <a className="vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" /></a>
                                        {!this.props.Archive ? <ul>
                                            <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />Archive</a></li>
                                            {this.props.comesfrom === 'patient' &&  <li>
                                                    {item.created_by === this.state.loggedinUser._id && ( !item.updated_by || item.updated_by ==="") ? 
                                                    <a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />Edit</a>
                                                    : <a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Change Visibility</a>
                                                    }
                                                 </li>}
                                                {this.props.comesfrom !== 'patient' && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />Edit</a></li>}
<li><a onClick={() => this.props.downloadTrack(item)}><img src={require('../../../../assets/images/download.svg')} alt="" title="" />Download</a></li>
                                            <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                        </ul> :
                                            <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />De-Archive</a></li>
                                                <li><a onClick={(deleteKey) => this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                            </ul>}
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="icd_num addSpc">
                            <label>{item.diagnosis && item.diagnosis}</label>
                            <a data-tip data-for="icdtxtTip">{item.ICD_code}</a>
                            <ReactTooltip className="icdtxtClas" id="icdtxtTip" place="top" effect="solid" backgroundColor="#ffffff">
                                <h4>{item.ICD_code_label}</h4>
                            </ReactTooltip>
                        </Grid>

                        <Grid container direction="row" className="addSpc markCntntMain">
                            <Grid item xs={12} md={5}>
                                <Grid className="markCntntImg">
                                    <a><img src={getImage(item.created_by_image, this.state.images)} alt="" title="" />

                                        <span>{item.created_by_temp}</span>
                                    </a>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} md={7}>
                                <Grid className="markMDCntntImg">
                                    <a><img src={require('../../../../assets/images/hLogo.jpg')} alt="" title="" />
                                        <span>Illinois Masonic Medical Center</span>
                                    </a>
                                </Grid>
                            </Grid> */}
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Details" open="true">
                                <Grid className="detailCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Diagnosed by</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.diagnosed_by && item.diagnosed_by}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Allergy</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.allergy ? 'Yes' : 'No'}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Diagnosed on</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.diagnosed_on && getDate(item.diagnosed_on, this.state.date_format)}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="diagnoBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Travel Diagnosis</label></Grid>
                                                <Grid item xs={7} md={7}>
                                                    <span>{item.travel_diagnosis ? 'Yes' : 'No'}</span>
                                                    <a className="yesInfo" data-tip data-for="yesInfoTip">
                                                        <img src={require('../../../../assets/images/yesinfo.jpg')} alt="" title="" />
                                                    </a>
                                                    <ReactTooltip className="yesInfoClas" id="yesInfoTip" place="top" effect="solid" backgroundColor="#ffffff">
                                                        <h4>Traveled to {item.travelled_to && item.travelled_to}</h4>
                                                        <p>{item.when_to && getDate(item.when_to, this.state.date_format)} - {item.when_until && getDate(item.when_until, this.state.date_format)}</p>
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
                                    <p dangerouslySetInnerHTML={{ __html: item.remarks }} />
                                </Grid>
                            </Collapsible>
                        </Grid>
                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Images & Files" open="true">
                                <FileViews images={this.state.images} attachfile={item.attachfile} />
                            </Collapsible>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Index;

