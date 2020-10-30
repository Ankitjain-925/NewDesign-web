import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import TimeTaken from './../../TimeTaken/index';
import NotesEditor from './../../Editor/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en.json";
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/en.json';

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
    updateEntryState1=(value, name)=>{
        var state= this.state.updateTrack
        state[name] = value;
        this.setState({updateTrack: state})
        this.props.updateEntryState1(value, name)
    }

    render() {

        let translate;
      switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { vaccinated_by, vaccination, reminder_time_taken, save_entry, attachments, date_of_vaccination, trade_name, smoking_status, notes, visible, Change, archive, de_archive, visibility, edit, Delete, show, hide,
            always  } = translate
        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="vaccination" label={vaccination} onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.vaccination}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="trade_name"  label={trade_name} onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.trade_name}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="charge_number"  label="Charge Number" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.charge_number}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="vaccinated_by"  label={vaccinated_by} onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.vaccinated_by}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{date_of_vaccination}</label></Grid>
                            <DateFormat name="data_of_vaccination" value={this.state.updateTrack.date_measured ? new Date(this.state.updateTrack.date_measured) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'data_of_vaccination')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <TimeTaken name="reminder_time_taken" label={reminder_time_taken} time_format={this.state.time_format} onChange={(e)=> this.updateEntryState1(e, 'reminder_time_taken')} timeArray={this.state.updateTrack.reminder_time_taken} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label={notes}  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" comesFrom="journal"isMulti={true} fileUpload={this.props.FileAttachMulti} />
                    </Grid>
                </Grid>}
                <Grid className="infoShwHidMain3upr">
                    
                <ShowHide date_format= {this.state.date_format} value={this.state.updateTrack} onChange={(data) => this.props.GetHideShow(data)}/>
                    <Grid className="infoShwSave3">
                        <input type="submit" value={save_entry} onClick={this.props.AddTrack}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));
