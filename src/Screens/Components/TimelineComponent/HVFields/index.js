import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import SelectField from './../../Select/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import NotesEditor from './../../Editor/index';

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
                        <MMHG name="hospital_name" label="Hospital Name" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.blood_sugar}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="hospital_id" label="Hospital ID" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.Hba1c}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="specialty" label="Specaility" option={this.state.options} onChange={(e)=> this.props.updateEntryState1(e, 'specialty')} value={this.state.updateTrack.specialty} />    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="doctor_id" label="Doctor ID" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.Hba1c}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>First Visit Day</label></Grid>
                            <DateFormat name="first_visit_date" value={this.state.updateTrack.first_visit_date ? new Date(this.state.updateTrack.first_visit_date) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'first_visit_date')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>Last Visit Day</label></Grid>
                            <DateFormat name="last_visit_date" value={this.state.updateTrack.last_visit_date ? new Date(this.state.updateTrack.last_visit_date) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'last_visit_date')}/>
                        </Grid>   
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

