import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import FileViews from  './../FileViews/index';
import { getDate, newdate, getTime, getImage } from './../../BasicMethod/index';

import * as translationEN from "../../../../translations/en.json"
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive : this.props.archive,
            loggedinUser : this.props.loggedinUser, 
            images : this.props.images,
           
        };
    }

  componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({   item: this.props.data, loggedinUser : this.props.loggedinUser})
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
                    <Grid className="descpInerRght descpInerBlue">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg">
                                    <a className="blodPrsurNote"><img src={require('../../../../assets/images/blood-pressure-sugar.svg')} alt="" title="" />
                                        <span>Blood Pressure</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid className="bp_vsblSec scndOptionIner1">
                                    <a onClick={()=>this.props.EidtOption(item.type, item, true)} className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                    <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                        <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                    </a>
                                    <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                        {item.visible==='show' ? <label>Show until</label> :  <label>Hide until</label> }
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
                                                <li><a onClick={(deleteKey)=>this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                            </ul>:
                                            <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />De-Archive</a></li>
                                                <li><a onClick={(deleteKey)=>this.props.DeleteTrack(item.track_id)}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Delete</a></li>
                                            </ul>}
                                        </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="bp_hg addSpc">
                            <label>{item.rr_systolic && item.rr_systolic}/{item.rr_diastolic && item.rr_diastolic} <span>mmHg</span></label>
                            {/* <p>Normal</p> */}
                        </Grid>

                        <Grid container direction="row" className="addSpc bpJohnMain">
                            <Grid item xs={12} md={12}>
                                <Grid className="bpJohnImg">
                                    <a><img src={getImage(item.created_by_image, this.state.images)} alt="" title="" />

                                        <span>{item.created_by_temp}</span>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid className="clear"></Grid>
                        </Grid>

                        <Grid className="addSpc detailMark">
                            <Collapsible trigger="Details" open="true">
                                <Grid className="detailCntnt">
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>RR Systolic</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.rr_systolic && item.rr_systolic}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Feeling</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.situation && item.situation.label}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>RR Diastolic</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.rr_diastolic && item.rr_diastolic}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Date & Time</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.date_measured && getDate(item.date_measured , this.state.date_format)} {item.time_measured && ', ' + getTime(new Date(item.time_measured) , this.state.time_foramt)}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>Heart Rate</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.heart_frequncy && item.heart_frequncy}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid className="clear"></Grid>
                                    </Grid>
                                    <Grid className="bp_graph">
                                        {/* <Grid><img src={require('../../../../assets/images/gp.png')} alt="" title="" /></Grid> */}
                                        {/* {console.log('this.props', this.props)} */}
                                        <Grid><a onClick={()=> this.props.OpenGraph('blood_pressure')}>Veiw Graph</a></Grid>
                                    </Grid>
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

