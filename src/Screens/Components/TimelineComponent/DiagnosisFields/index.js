import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NotesEditor from './../../Editor/index';
import ShowHide from './../../ShowHide/index';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import FileUploader from './../../FileUploader/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format : this.props.date_format,
            time_format : this.props.time_format,
            options : this.props.options,
        };
    }

    componentDidMount = () => {

    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack })
        }

    }
    
    updateEntryState1=(value, name)=>{
        var state= this.state.updateTrack
        state[name] = value;
        this.setState({updateTrack: state})
        this.props.updateEntryState1(value, name)
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
        let {slct_ICD_serch_code, when, to , enter_code_serch_by_keyword,  dignose, of, until, archive, rr_systolic, attachments, time_measure, date_measure,
            date, time }= translate
        
        return (
            <div>
                 {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    
                    {this.props.comesfrom !== 'patient' && 
                    <Grid className="cnfrmDiaUpr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={8} className="cnfrmDiaLft">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="checkedB"
                                            color="#00ABAF"
                                        />
                                    }
                                    label="Confirm diagnosis"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="cnfrmDiaRght">
                                <img src={require('../../../../assets/images/plusgreen.jpg')} alt="" title="" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={12} md={8} className="cnfrmDiaLft">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="checkedB"
                                            color="#00ABAF"
                                        />
                                    }
                                    label="Emergency diagnosis"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="cnfrmDiaRght">
                                <img src={require('../../../../assets/images/plusvan.jpg')} alt="" title="" />
                            </Grid>
                        </Grid>
                    </Grid>}
                        
                    <Grid className="fillDia">
                        <MMHG name="diagnosis" label="Enter Diagnosis" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.diagnosis}/>    
                    </Grid>
                    <Grid className="diaCD">
                        <Grid><label>{slct_ICD_serch_code}</label></Grid>
                        <Grid><a className="diaCDActv">ICD-10</a> <a>ICD-11</a></Grid>
                        <Grid><a className="diaCDActv">ICD-10 WHO</a> <a>ICD-10 CM</a> <a>ICD-10 GM</a></Grid>
                    </Grid>
                    <Grid className="srchDia">
                        <Grid className="srchdoseMg">
                            <input type="text" placeholder={enter_code_serch_by_keyword} />
                            <span><img src={require('../../../../assets/images/search-entries.svg')} alt="" title="" /></span>
                        </Grid>
                    </Grid>
                    <Grid className="travelDia">
                        <Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="checkedB"
                                        name="allergy" 
                                        checked={this.state.updateTrack.allergy === true}
                                        onChange={(e)=> this.updateEntryState1(e.target.checked, 'allergy')}
                                        color="#00ABAF"
                                    />
                                }
                                label="Alergy"
                            />
                        </Grid>
                        <Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        name="travel_diagnosis" 
                                        checked={this.state.updateTrack.travel_diagnosis === true}
                                        onChange={(e)=> this.updateEntryState1(e.target.checked, 'travel_diagnosis')}
                                    />
                                }
                                label="Travel diagnosis"
                            />
                        </Grid>

                    </Grid>
                    {this.state.updateTrack.travel_diagnosis && <div>
                        <Grid className="fillDia">
                                <MMHG name="travelled_to" label="Trevalled to" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.travelled_to}/>    
                        </Grid>
                        <Grid className="fillDia">
                            <Grid className="rrSysto">
                                <Grid><label>{when} {to}</label></Grid>
                                <DateFormat name="when_to" value={this.state.updateTrack.when_to ? new Date(this.state.updateTrack.when_to) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'when_to')}/>
                            </Grid>   
                        </Grid>
                        <Grid className="fillDia">
                            <Grid className="rrSysto">
                                <Grid><label>{when} {until}</label></Grid>
                                <DateFormat name="when_until" value={this.state.updateTrack.when_until ? new Date(this.state.updateTrack.when_until) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'when_until')}/>
                            </Grid>   
                        </Grid>
                    </div>}
                   <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label> {date} {of} {dignose}</label></Grid>
                            <DateFormat name="diagnosed_on" value={this.state.updateTrack.diagnosed_on ? new Date(this.state.updateTrack.diagnosed_on) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'diagnosed_on')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="diagnosed_by" label="Diagnosed by" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.diagnosed_by}/>    
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" isMulti={true} fileUpload={this.props.FileAttachMulti} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
                    </Grid>
                </Grid>}
                <Grid className="infoShwHidMain3upr">
                    
                <ShowHide date_format= {this.state.date_format} value={this.state.updateTrack} onChange={(data) => this.props.GetHideShow(data)}/>
                    <Grid className="infoShwSave3">
                        <input type="submit" value="Save entry" onClick={this.props.AddTrack}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
   
    return {
        stateLanguageType,
    }
};
export default withRouter(connect(mapStateToProps, {  LanguageFetchReducer })(Index));

