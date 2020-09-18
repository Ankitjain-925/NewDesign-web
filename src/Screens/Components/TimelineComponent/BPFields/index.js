import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import TimeFormat from './../../TimeFormat/index';
import SelectByTwo from './../../SelectbyTwo/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';

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
                        <Grid className="rrSysto">
                            <Grid><label>Date Measured</label></Grid>
                            <DateFormat name="date_measured" value={this.state.updateTrack.date_measured ? new Date(this.state.updateTrack.date_measured) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'date_measured')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>Time Measured</label></Grid>
                            <TimeFormat name="time_measured" value={this.state.updateTrack.time_measured ? new Date(this.state.updateTrack.time_measured) : new Date()} time_format={this.state.time_format} onChange={(e)=>this.props.updateEntryState1(e, 'time_measured')}/>
                            
                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <SelectByTwo name="situation" label="Feelings" options={this.state.options} onChange={(e)=> this.props.updateEntryState1(e, 'situation')} value={this.state.updateTrack.feelings}/>    
                    </Grid>
                  
                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                      <FileUploader name="UploadTrackImageMulti" isMulti="true" fileUpload={this.props.FileAttachMulti} />
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

