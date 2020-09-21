import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from '../../mmHgField/index';
import Temprature from '../../Temprature';
import SelectField from '../../Select/index';
import FileUploader from '../../FileUploader/index';
import ShowHide from '../../ShowHide/index';
import NotesEditor from '../../Editor/index';
import PainPoint from '../../PointPain/index';
import PainIntensity from '../../PainIntansity/index';
import Condition from '../../Condition/index';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
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
        let { selct_pain_area, attachments } = translate

        return (
            <div>
                <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <Temprature name="temprature" name="temprature" valueType={this.state.updateTrack.temprature_type} value={this.state.updateTrack.temprature} Options={this.state.options2} onChange={(e) => this.props.updateEntryState(e)} onChangeType={(e) => this.props.updateEntryState1(e, 'temprature_type')} />
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="saturaion" Unit="%" label="O2 Saturation" onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.blood_sugar} />
                    </Grid>

                    <Grid className="fillDia">
                        <Grid><label>{selct_pain_area}</label></Grid>
                        <PainPoint id="New_id1" gender={this.state.gender} painPoint={this.state.updateTrack && this.state.updateTrack.painPoint ? this.state.updateTrack.painPoint : []} onChange={(e) => this.props.updateEntryState1(e, 'painPoint')} />
                    </Grid>
                    <Grid className="fillDia">
                        <PainIntensity name="pains" onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.pains} />
                    </Grid>
                    <Grid className="fillDia">
                        <Condition name="conditions" onChange={(e) => this.props.updateEntryState(e)} value={this.state.updateTrack.conditions} />
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="country" label="Where you are located" option={this.state.options} onChange={(e) => this.props.updateEntryState1(e, 'country')} value={this.state.updateTrack.country} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="symptoms" label="Symptoms & Notes" onChange={(e) => this.props.updateEntryState1(e, 'symptoms')} value={this.state.updateTrack.symptoms} />
                    </Grid>

                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" fileUpload={this.FileAttachMulti} />
                    </Grid>

                </Grid>

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
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));

