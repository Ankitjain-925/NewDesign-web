import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NotesEditor from './../../Editor/index';
import ShowHide from './../../ShowHide/index';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import FileUploader from './../../FileUploader/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

    render() {
        return (
            <div>
                 <Grid className="cnfrmDiaMain">
                    
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
                        <Grid><label>Select an ICD catalogue and search for code</label></Grid>
                        <Grid><a className="diaCDActv">ICD-10</a> <a>ICD-11</a></Grid>
                        <Grid><a className="diaCDActv">ICD-10 WHO</a> <a>ICD-10 CM</a> <a>ICD-10 GM</a></Grid>
                    </Grid>
                    <Grid className="srchDia">
                        <Grid className="srchdoseMg">
                            <input type="text" placeholder="Enter code or search by keywords" />
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
                                        onChange={(e)=> this.props.updateEntryState1(e.target.checked, 'allergy')}
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
                                        onChange={(e)=> this.props.updateEntryState1(e.target.checked, 'travel_diagnosis')}
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
                                <Grid><label>When to</label></Grid>
                                <DateFormat name="when_to" value={this.state.updateTrack.when_to ? new Date(this.state.updateTrack.when_to) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'when_to')}/>
                            </Grid>   
                        </Grid>
                        <Grid className="fillDia">
                            <Grid className="rrSysto">
                                <Grid><label>When unit</label></Grid>
                                <DateFormat name="when_until" value={this.state.updateTrack.when_until ? new Date(this.state.updateTrack.when_until) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'when_until')}/>
                            </Grid>   
                        </Grid>
                    </div>}
                   <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>Date of Diagnose</label></Grid>
                            <DateFormat name="diagnosed_on" value={this.state.updateTrack.diagnosed_on ? new Date(this.state.updateTrack.diagnosed_on) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'diagnosed_on')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="diagnosed_by" label="Diagnosed by" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.diagnosed_by}/>    
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                      <FileUploader name="UploadTrackImageMulti" isMulti="true" fileUpload={this.props.FileAttachMulti} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.props.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
                    </Grid>
                </Grid>
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

export default Index;

