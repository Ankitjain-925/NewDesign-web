import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import SelectByTwo from './../../SelectbyTwo/index';
import SelectField from './../../Select/index';
import FileUploader from './../../FileUploader/index';
import ShowHide from './../../ShowHide/index';
import NotesEditor from './../../Editor/index';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {GetShowLabel1} from "../../GetMetaData/index.js";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en.json";
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTrack: this.props.updateTrack,
            date_format: this.props.date_format,
            time_format: this.props.time_format,
            options: this.props.options,
            relativeList: this.props.relativeList,
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

    updateEntryState1 = (value, name) => {
        var state = this.state.updateTrack
        state[name] = value;
        this.setState({ updateTrack: state })
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
        let { attachments, date_of_death, dob, disease_name, notes, save_entry, gender_of_relatives, relation_of_relative, date_of_dieses_patient } = translate

        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="disease_name" label={disease_name} onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.disease_name} />
                    </Grid>
                    <Grid className="fillDia">
                        <SelectByTwo name="gender" label={gender_of_relatives} options={this.state.options} onChange={(e) => this.updateEntryState1(e, 'gender')} value={GetShowLabel1(this.props.options, this.state.updateTrack && this.state.updateTrack.gender && this.state.updateTrack.gender.value, this.props.stateLanguageType)} />
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="relation" label={relation_of_relative} option={this.state.relativeList} onChange={(e) => this.updateEntryState1(e, 'relation')} value={GetShowLabel1(this.props.relativeList, this.state.updateTrack && this.state.updateTrack.relation && this.state.updateTrack.relation.value, this.props.stateLanguageType)} />
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{date_of_dieses_patient}</label></Grid>
                            <DateFormat name="dod_onset" value={this.state.updateTrack.dod_onset ? new Date(this.state.updateTrack.dod_onset) : new Date()} date_format={this.state.date_format} onChange={(e) => this.updateEntryState1(e, 'dod_onset')} />
                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{dob}</label></Grid>
                            <DateFormat name="dob" value={this.state.updateTrack.dob ? new Date(this.state.updateTrack.dob) : new Date()} date_format={this.state.date_format} onChange={(e) => this.updateEntryState1(e, 'dob')} />
                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{date_of_death}</label></Grid>
                            <DateFormat name="dod" value={this.state.updateTrack.dod ? new Date(this.state.updateTrack.dod) : new Date()} date_format={this.state.date_format} onChange={(e) => this.updateEntryState1(e, 'dod')} />
                        </Grid>
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label={notes} onChange={(e) => this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks} />
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" comesFrom="journal" isMulti={true} fileUpload={this.props.FileAttachMulti} />
                    </Grid>
                </Grid>}

                <Grid className="infoShwHidMain3upr">
                    <ShowHide eventdate={true} date_format={this.state.date_format} value={this.state.updateTrack} onChange={(data) => this.props.GetHideShow(data)} />
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
