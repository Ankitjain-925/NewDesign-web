import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NotesEditor from './../../Editor';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import TimeFormat from './../../TimeFormat/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format : this.props.date_format,
            time_format : this.props.time_format,
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
                    <Grid className="fillDia">
                        <MMHG name="rr_systolic" Unit="mmHg" label="RR Systolic" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.rr_systolic}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="rr_diastolic" Unit="mmHg" label="RR Diastolic" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.rr_systolic}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="heart_frequncy" Unit="b/min" label="Heart Rate" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.rr_systolic}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <DateFormat name="date_measured" value={this.state.updateTrack.date_measured ? new Date(this.state.updateTrack.date_measured) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'date_format')}/>
                    </Grid>
                    <Grid className="fillDia">
                        <TimeFormat name="time_measured" value={this.state.updateTrack.time_measured ? new Date(this.state.updateTrack.time_measured) : new Date()} time_format={this.state.time_format} onChange={(e)=>this.props.updateEntryState1(e, 'time_format')}/>
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="heart_frequncy" Unit="b/min" label="Heart Rate" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.rr_systolic}/>    
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
                                    />
                                }
                                label="Travel diagnosis"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <Grid><label>Date of diagnose</label></Grid>
                        <Grid><input type="text" /></Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <Grid><label>Diagnosed by</label></Grid>
                        <Grid><input type="text" /></Grid>
                    </Grid>
                    <Grid className="fill_editor">
                        <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.updateEntryState1(e, 'remarks')} /> 
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                        <Grid className="attchInput">
                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                            <a>Browse <input type="file" /></a> or drag here
                                                                </Grid>
                        <p>Supported file types: .jpg, .png, .pdf</p>
                    </Grid>
                </Grid>

                <Grid className="infoShwHidMain3upr">
                    <Grid className="infoShwHidMain3">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs={6} md={6}>
                                <Grid className="infoShwHid3">
                                    <a className="visibleAllShw">Show or Hide <img src={require('../../../../assets/images/Info.svg')} alt="" title="" />
                                        <Grid className="visibleAll">
                                            All entries are by default visible to professionals you give
                                            access to your profile. You can edit these settings additionally
                                            on each entry or set a general rule in your <a>profile settings</a>
                                        </Grid>
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} md={6} className="editShwHid3">
                                <a>Edit</a>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="infoShwSave3">
                        <input type="submit" value="Save entry" />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Index;

