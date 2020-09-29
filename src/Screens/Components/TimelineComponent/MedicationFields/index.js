import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import TimeTaken from './../../TimeTaken/index';
import NotesEditor from './../../Editor/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import SelectField from './../../Select/index';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            options: this.props.options,
            reminder: this.props.reminders,

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
            // case "de":
            //     translate = translationDE.text
            //     break;
            // case "pt":
            //     translate = translationPT.text
            //     break;
            // case "sp":
            //     translate = translationSP.text
            //     break;
            // case "rs":
            //     translate = translationRS.text
            //     break;
            // case "nl":
            //     translate = translationNL.text
            //     break;
            // case "ch":
            //     translate = translationCH.text
            //     break;
            // case "sw":
            //     translate = translationSW.text
            //     break;
            case "default":
                translate = translationEN.text
        }
        let { specific_date, interval, reminder, reminder_time_taken, notes, atc_code, lab_result, upr_limit, unit, lwr_limit, on, prescribed, save_entry, to_be_consume, pain_areas, Change, show, hide, until, archive, rr_systolic, attachments, time_measure, date_measure,
            enter_dosage, edit, Delete, enter_a_sbstnce, first_visit_day, pain_type, de_archive, ur_trade_name, always, feeling, date, time } = translate

        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="substance" label={enter_a_sbstnce} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.substance} />
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="ATC_code" label={atc_code} option={this.state.options} onChange={(e) => this.updateEntryState1(e, 'ATC_code')} value={this.state.updateTrack.ATC_code} />
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="trade_name" label={ur_trade_name} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.trade_name} />
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="dosage" label={enter_dosage} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.dosage} />
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{prescribed} {on} </label></Grid>
                            <DateFormat name="prescribed_on" value={this.state.updateTrack.prescribed_on ? new Date(this.state.updateTrack.prescribed_on) : new Date()} date_format={this.state.date_format} onChange={(e) => this.updateEntryState1(e, 'prescribed_on')} />
                        </Grid>
                    </Grid>

                    {!this.state.updateTrack.lifelong &&
                        <Grid className="fillDia">
                            <Grid className="rrSysto">
                                <Grid><label>{specific_date}</label></Grid>
                                <DateFormat name="until" value={this.state.updateTrack.until ? new Date(this.state.updateTrack.until) : new Date()} date_format={this.state.date_format} onChange={(e) => this.updateEntryState1(e, 'until')} />
                            </Grid>
                        </Grid>
                    }

                    <Grid className="fillDia">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={true}
                                    color="#00ABAF"
                                    name="lifelong"
                                    checked={this.state.updateTrack.lifelong === true}
                                    onChange={(e) => this.updateEntryState1(e.target.checked, 'lifelong')}
                                />
                            }
                            label="Lifelong"
                        />
                    </Grid>

                    <Grid className="fillDia">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={true}
                                    color="#00ABAF"
                                    name="lifelong"
                                    checked={this.state.updateTrack.ondemand === true}
                                    onChange={(e) => this.updateEntryState1(e.target.checked, 'ondemand')}
                                />
                            }
                            label="On Demand"
                        />
                    </Grid>

                    <Grid className="fillDia">
                        <SelectField name="interval" isMulti={true} closeMenuOnSelect={false} label={interval} option={this.state.reminder} onChange={(e) => this.updateEntryState1(e, 'interval')} value={this.state.updateTrack.interval} />
                    </Grid>
                    <Grid className="fillDia">
                        <TimeTaken name="time_taken" label={to_be_consume} time_format={this.state.time_format} onChange={(e) => this.updateEntryState1(e, 'time_taken')} timeArray={this.state.updateTrack.time_taken} />
                    </Grid>

                    <Grid className="fillDia">
                        <SelectField name="reminders" isMulti={true} closeMenuOnSelect={false} label={reminder} option={this.state.reminder} onChange={(e) => this.updateEntryState1(e, 'reminders')} value={this.state.updateTrack.reminders} />
                    </Grid>
                    <Grid className="fillDia">
                        <TimeTaken name="reminder_time_taken" label={reminder_time_taken} time_format={this.state.time_format} onChange={(e) => this.updateEntryState1(e, 'reminder_time_taken')} timeArray={this.state.updateTrack.reminder_time_taken} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label={notes} onChange={(e) => this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks} />
                    </Grid>

                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" isMulti={true} fileUpload={this.props.FileAttachMulti} />
                    </Grid>
                </Grid>}

                <Grid className="infoShwHidMain3upr">

                    <ShowHide date_format={this.state.date_format} value={this.state.updateTrack} onChange={(data) => this.props.GetHideShow(data)} />
                    <Grid className="infoShwSave3">
                        <input type="submit" value={save_entry} onClick={this.props.AddTrack} />
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

