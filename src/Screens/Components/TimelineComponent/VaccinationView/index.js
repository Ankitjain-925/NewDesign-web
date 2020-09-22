import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapsible from 'react-collapsible';
import ReactTooltip from "react-tooltip";
import { getDate, newdate, getTime } from './../../BasicMethod/index';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
        var item = this.state.item;

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
        let { vaccinated_by, vaccination, save_entry, until, attachments, reminder_time_taken, date_of_vaccination, trade_name, smoking_status, notes, visible, Change, archive, de_archive, visibility, edit, Delete, show, hide,
            always  } = translate
        return (
            <Grid container direction="row" className="descpCntnt">
                <Grid item xs={1} md={1} className="descpCntntLft">
                    {newdate(item.created_on)}
                </Grid>
                <Grid item xs={11} md={10}>
                    <Grid className="descpInerRght">

                        <Grid container direction="row" className="addSpc">
                            <Grid item xs={12} md={6}>
                                <Grid className="blodPrsurImg">
                                    <a className="diryNote"><img src={require('../../../../assets/images/vaccination.svg')} alt="" title="" />
                                        <span>{vaccination}</span>
                                    </a>
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
                                         <a className="openScndhrf1">
                                            <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd1" />
                                            {!this.props.Archive ? <ul>
                                                <li><a onClick={(data) => this.props.ArchiveTrack(item)}><img src={require('../../../../assets/images/archive-1.svg')} alt="" title="" />{archive}</a></li>
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

                        <Grid className="bp_hg addSpc">
                            <label>{item.vaccination && item.vaccination} <span></span></label>
                            {/* <p>Normal</p> */}
                        </Grid>

                        <Grid container direction="row" className="addSpc bpJohnMain">
                            <Grid item xs={12} md={12}>
                                <Grid className="bpJohnImg">
                                    <a><img src={require('../../../../assets/images/person1.jpg')} alt="" title="" />
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
                                                <Grid item xs={5} md={5}><label>{trade_name}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.trade_name && item.trade_name}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{vaccinated_by}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.vaccinated_by && item.vaccinated_by}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                            <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{date_of_vaccination}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.data_of_vaccination && getDate(item.data_of_vaccination , this.state.date_format)} {item.time_measured && ', ' + getTime(new Date(item.time_measured) , this.state.time_foramt)}</span></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} className="bloodPreBy">
                                           <Grid container direction="row">
                                                <Grid item xs={5} md={5}><label>{reminder_time_taken}</label></Grid>
                                                <Grid item xs={7} md={7}><span>{item.reminder_time_taken && (Array.prototype.map.call(item.reminder_time_taken, s => s.label).toString()).split(/[,]+/).join(',  ')}  </span></Grid>
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
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));