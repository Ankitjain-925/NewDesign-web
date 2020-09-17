import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import Condition from './../../Condition/index';
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
                                            <a className="conPainNote"><img src={require('../../../../assets/images/covid-19.svg')} alt="" title="" /><span>Covid 19 Diary</span> </a>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Grid className="bp_vsblSec scndOptionIner1">
                                            <a className="bp_vsblEye"><img src={require('../../../../assets/images/eye2.png')} alt="" title="" /> <span>Visible</span> </a>
                                            <a className="vsblTime" data-tip data-for={item.track_id + 'visibility'}>
                                                <img src={require('../../../../assets/images/clock.svg')} alt="" title="" />
                                            </a>
                                            <ReactTooltip className="timeIconClas" id={item.track_id + 'visibility'} place="top" effect="solid" backgroundColor="#ffffff">
                                                {item.visible==='show' ? <label>Show until</label> :  <label>Hide until</label> }
                                                {item.public === 'always' ? <p> Always </p> : <p>{getDate(item.public, this.state.date_format)}</p> }
                                            </ReactTooltip>
                                                 <a className="openScndhrf1">
                                                <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd1" />
                                                {!this.props.Archive ? <ul>
                                                    <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />Archive</a></li>
                                                    {this.state.loggedinUser._id === item.created_by && <li><a onClick={()=>this.props.EidtOption(item.type, item)}><img src={require('../../../../assets/images/edit-1.svg')} alt="" title="" />Edit</a></li>}
                                                    {this.state.loggedinUser._id !== item.created_by && <li><a onClick={()=>this.props.EidtOption(item.type, item, true)}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Change Visibility</a></li>}
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

                                <Grid className="conPain_num addSpc">
                                    <label>{item.temprature && item.temprature}</label>
                                    <p>{item.temprature_type && item.temprature_type.label}</p>
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
                                            <Grid className="conPainArea"><label>Pain areas</label></Grid>
                                            <PainPoint id={item.track_id} gender={this.state.gender} painPoint={item.painPoint} isView={true} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Grid className="conPainRght">
                                            <Grid className="painIntencty">
                                                <PainIntensity name="pains" Forview={true} onChange={(e)=> this.props.updateEntryState(e)} value={item.pains}/>
                                            </Grid>

                                            <Grid className="condIntencty">
                                                <Condition name="conditions"  onChange={(e)=> this.props.updateEntryState(e)} value={item.conditions}/>
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
                                                        <Grid item xs={5} md={5}><label>Temparture</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{item.temprature && item.temprature} {item.temprature_type && item.temprature_type.Collapsible}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="painTypeBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>O2 saturation</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{item.saturaion && item.saturaion}</span></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="painTypeBy">
                                                    <Grid container direction="row">
                                                        <Grid item xs={5} md={5}><label>Location</label></Grid>
                                                        <Grid item xs={7} md={7}><span>{item.country && item.country.label}</span></Grid>
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
                                            <p dangerouslySetInnerHTML={{__html: item.symptoms}} />
                                        </Grid>
                                    </Collapsible>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
        )
    }
}

export default Index;