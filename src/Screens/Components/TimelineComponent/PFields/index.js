import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
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
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="attchForms attchImg">
                        <Grid><label>Attachments</label></Grid>
                        <FileUploader name="UploadTrackImageMulti"  isMulti="true" fileUpload={(event)=>{this.props.FileAttachMulti(event)}}/>
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

export default Index;

