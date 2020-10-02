import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AnamnesisFinding from './../../AnamnesisFinding/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import NotesEditor from './../../Editor/index';
import PainPoint from '../../PointPain/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format : this.props.date_format,
            time_format : this.props.time_format,
            options : this.props.options,
            gender: this.props.gender,
        };
    }

    componentDidMount = () => {

    }

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack })
        }
        if (prevProps.options !== this.props.options) {
            this.setState({ options: this.props.options })
        }
    }

    
    updateEntryState1=(value, name)=>{
        var state= this.state.updateTrack
        state[name] = value;
        this.setState({updateTrack: state})
        this.props.updateEntryState1(value, name)
    }

    render() {
        return (
            <div>
                <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <AnamnesisFinding  options= {this.state.options} name="anamesis" label="Field title"  onChange={(e) => this.updateEntryState1(e, 'anamesis')} findingArr={this.state.updateTrack.anamesis} />
                    </Grid>
                    <Grid className="fillDia">
                        <Grid><label>Select Pain Area</label></Grid>
                        <PainPoint id="New_id1" gender={this.state.gender} painPoint={this.state.updateTrack && this.state.updateTrack.painPoint ? this.state.updateTrack.painPoint : []} onChange={(e) => this.updateEntryState1(e, 'painPoint')} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Body Scheme Notes"  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" comesFrom="journal" isMulti="true" fileUpload={(event)=>{this.props.FileAttachMulti(event)}}/>
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

