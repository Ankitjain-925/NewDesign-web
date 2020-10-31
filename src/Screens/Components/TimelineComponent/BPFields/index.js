import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import TimeFormat from './../../TimeFormat/index';
import SelectByTwo from './../../SelectbyTwo/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en.json"
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
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            options: this.props.options,
        };
    }

    componentDidMount = () => {

    }

    updateEntryState1=(value, name)=>{
        var state= this.state.updateTrack
        state[name] = value;
        this.setState({updateTrack: state})
        this.props.updateEntryState1(value, name)
    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack })
        }

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
        let { blood_pressure, visible, show, hide, until, archive, rr_systolic, attachments, time_measure, date_measure,
            visibility, edit, Delete, RR_diastolic, heart_rate, view_fullscren, always, feeling, date, time } = translate


        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="rr_systolic" Unit="mmHg" label={rr_systolic} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.rr_systolic} />
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="rr_diastolic" Unit="mmHg" label={RR_diastolic} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.rr_diastolic} />
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="heart_frequncy" Unit="b/min" label={heart_rate} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.heart_frequncy} />
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{date_measure}</label></Grid>
                            <DateFormat name="date_measured" value={this.state.updateTrack.date_measured ? new Date(this.state.updateTrack.date_measured) : new Date()} date_format={this.state.date_format} onChange={(e) => this.updateEntryState1(e, 'date_measured')} />
                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{time_measure}</label></Grid>
                            <TimeFormat name="time_measured" value={this.state.updateTrack.time_measured ? new Date(this.state.updateTrack.time_measured) : new Date()} time_format={this.state.time_format} onChange={(e) => this.updateEntryState1(e, 'time_measured')} />

                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <SelectByTwo name="situation" label="Feelings" options={this.state.options} onChange={(e) => this.updateEntryState1(e, 'situation')} value={this.state.updateTrack.feelings} />
                    </Grid>

                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" comesFrom="journal" isMulti={true} fileUpload={this.props.FileAttachMulti} />
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

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));


