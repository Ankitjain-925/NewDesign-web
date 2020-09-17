import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import SelectField from './../../Select/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import NotesEditor from './../../Editor/index';
import PainPoint from './../../PointPain/index';
import SelectByTwo from './../../SelectbyTwo/index';
import PainIntensity from './../../PainIntansity/index';
import Condition  from './../../Condition/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            options: this.props.options,
            gender: this.props.gender,
            options2: this.props.options2,
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
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="problem" label="Problem" onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.problem} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Notes" onChange={(e) => this.props.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/>
                    </Grid>
                    <Grid className="fillDia">
                        <Grid><label>Select Pain areas</label></Grid>
                        <PainPoint id="New_id1" gender={this.state.gender} painPoint={this.state.updateTrack && this.state.updateTrack.painPoint ? this.state.updateTrack.painPoint : []} onChange={(e) => this.props.updateEntryState1(e, 'painPoint')} />
                    </Grid>
                    <Grid className="fillDia">
                        <PainIntensity name="pain_intensity" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.pain_intensity}/>
                    </Grid>
                    <Grid className="fillDia">
                        <Condition name="feeling"  onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.feeling}/>
                    </Grid>

                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" fileUpload={this.FileAttachMulti} />
                    </Grid>
                    <Grid className="fillDia">
                        <SelectByTwo name="pain_type" label="Pain Type" options={this.state.options2} onChange={(e) => this.props.updateEntryState1(e, 'pain_type')} value={this.state.updateTrack.pain_type} />
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="pain_quality" label="Pain Quality" option={this.state.options} onChange={(e) => this.props.updateEntryState1(e, 'pain_quality')} value={this.state.updateTrack.pain_quality} />
                    </Grid>
                </Grid>}

                <Grid className="infoShwHidMain3upr">
                    <ShowHide date_format={this.state.date_format} value={this.state.updateTrack} onChange={(data) => this.props.GetHideShow(data)} />
                    <Grid className="infoShwSave3">
                        <input type="submit" value="Save entry" onClick={this.props.AddTrack} />
                    </Grid>
                </Grid>
              
            </div>
        )
    }
}

export default Index;

