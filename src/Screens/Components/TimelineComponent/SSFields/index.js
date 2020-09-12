import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NotesEditor from './../../Editor/index';
import SelectField from './../../Select/index';
import ShowHide from './../../ShowHide/index';
import DateFormat from './../../DateFormat/index';

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
                        <SelectField name="smoking_status" label="Smoking Status" option={this.state.options} onChange={(e)=> this.props.updateEntryState1(e, 'smoking_status')} value={this.state.updateTrack.smoking_status} />
                    </Grid>
                    {this.state.updateTrack && this.state.updateTrack.smoking_status && this.state.updateTrack.smoking_status.value !== 'Never_smoked'&& 
                    <div>
                        <Grid className="rrSysto">
                            <Grid><label>From When</label></Grid>
                            <DateFormat name="from_when" value={this.state.updateTrack.from_when ? new Date(this.state.updateTrack.from_when) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'from_when')}/>
                        </Grid> 
                        <Grid className="rrSysto">
                            <Grid><label>Until When</label></Grid>
                            <DateFormat name="until_when" value={this.state.updateTrack.until_when ? new Date(this.state.updateTrack.until_when) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.props.updateEntryState1(e, 'until_when')}/>
                        </Grid>
                    </div>   
                    }
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.props.updateEntryState1(e, 'remarks')} /> 
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

