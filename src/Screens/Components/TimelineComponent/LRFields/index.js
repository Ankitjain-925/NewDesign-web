import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import SelectField from './../../Select/index';
import TimeFormat from './../../TimeFormat/index';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format : this.props.date_format,
            time_format : this.props.time_format,
            lrpUnit : this.props.lrpUnit,
            lrpEnglish : this.props.lrpEnglish
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
                        <MMHG name="value" label="Enter Value" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.value}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="unit" label="Unit" option={this.state.lrpUnit} onChange={(e)=> this.props.updateEntryState1(e, 'unit')} value={this.state.updateTrack.unit} />    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="upper_limit" Unit= "mg/dl" label="Upper Limit" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.upper_limit}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="lower_limit" Unit= "mg/dl" label="Lower Limit"  onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.lower_limit} />    
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="lab_parameter" label="Laboratory Parameter" option={this.state.lrpEnglish} onChange={(e)=> this.props.updateEntryState1(e, 'lab_parameter')} value={this.state.updateTrack.lab_parameter} />    
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
                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" fileUpload={this.FileAttachMulti} />
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

