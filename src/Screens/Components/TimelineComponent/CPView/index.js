import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Condition from './../../Condition/index';
import FileViews from  './../FileViews/index';
import PainPoint from './../../PointPain/index';
import PainIntensity from './../../PainIntansity/index';
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
            gender: this.props.gender
        };
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({
                item: this.props.data, loggedinUser: this.props.loggedinUser
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
                                <Grid className="conPainImg">
                                    <a className="conPainNote"><img src={require('../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg')} alt="" title="" /><span>Condition and Pain</span> </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec scndOptionIner1">
                                    <a onClick={()=>this.props.EidtOption(item.type, item, true)} className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                        {item.visible === 'show' ? <label>Show until</label> : <label>Hide until</label>}
                                        {item.public === 'always' ? <p> Always </p> : item.public ? <p>{getDate(item.public, this.state.date_format)}</p>: <p>Not mentioned</p>}
                                    </ReactTooltip>
                                    {/* <a className="bp_vsblDots"><img src={require('../../../../assets/images/nav-more.svg')} alt="" title="" />
                                            
                                            </a> */}
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

                        <Grid className="conPain_num addSpc">
                            <label>{item.problem && item.problem}</label>
                            <p>{item.pain_type && item.pain_type.label}</p>
                        </Grid>

                        <Grid container direction="row" className="addSpc conPain_Cntnt">
                            <Grid item xs={12} md={5}>
                                <Grid className="conPain_Img">
                                    <a><img src={getImage(item.created_by_image, this.state.images)} alt="" title="" />

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
                                    <Grid className="conPainArea"><label>Pain areas</label></Grid>
                                    <PainPoint id={item.track_id} gender={this.state.gender} painPoint={item.painPoint} isView={true} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Grid className="conPainRght">
                                    <Grid className="painIntencty">
                                        <PainIntensity name="pain_intensity" Forview={true} onChange={(e) => this.props.updateEntryState(e)} value={item.pain_intensity} />
                                    </Grid>

                                    <Grid className="condIntencty">
                                        <Condition name="feeling" Forview={true} onChange={(e) => this.props.updateEntryState(e)} value={item.feeling} />
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
                                                <Grid item xs={5} md={5}><label>Pain type</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.pain_type && item.pain_type.label}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="painTypeBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Pain quality</label></Grid>
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