import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import TimeTaken from './../../TimeTaken/index';
import NotesEditor from './../../Editor/index';
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
                        <MMHG name="vaccination" label="Vaccination" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.blood_sugar}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="trade_name"  label="Trade Name" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.Hba1c}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="vaccinated_by"  label="Vccinated By" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.Hba1c}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>Date of Vaccination</label></Grid>
                            <DateFormat name="data_of_vaccination" value={this.state.updateTrack.date_measured ? new Date(this.state.updateTrack.date_measured) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'data_of_vaccination')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <TimeTaken name="reminder_time_taken" label="Reminder time taken" time_format={this.state.time_format} onChange={(e)=> this.props.updateEntryState1(e, 'reminder_time_taken')} timeArray={this.state.updateTrack.reminder_time_taken} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.props.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
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

