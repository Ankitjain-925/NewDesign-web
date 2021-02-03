import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MMHG from "./../../mmHgField/index";
import FileUploader from "./../../JournalFileUploader/index";
import ShowHide from "./../../ShowHide/index";
import NotesEditor from "./../../Editor/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "./../../../actions";
import {
    translationAR,
    translationSW,
    translationSP,
    translationRS,
    translationEN,
    translationNL,
    translationDE,
    translationCH,
    translationPT,
    translationFR
  } from "translations/index"
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

    componentDidMount = () => { };
    updateEntryState1 = (value, name) => {
        var state = this.state.updateTrack;
        state[name] = value;
        this.setState({ updateTrack: state });
        this.props.updateEntryState1(value, name);
    };

    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack });
        }
    };

    render() {
        let translate = {};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text;
                break;
            case "de":
                translate = translationDE.text;
                break;
            case "pt":
                translate = translationPT.text;
                break;
            case "sp":
                translate = translationSP.text;
                break;
            case "rs":
                translate = translationRS.text;
                break;
            case "nl":
                translate = translationNL.text;
                break;
            case "ch":
                translate = translationCH.text;
                break;
            case "sw":
                translate = translationSW.text;
                break;
            case "fr":
                translate = translationFR.text;
                break;
            case "ar":
                translate = translationAR.text;
                break;
            default:
                translate = translationEN.text;
        }
        let { attachments, save_entry, notes, respiration } = translate;
        return (
            <div>
                {!this.props.visibility && (
                    <Grid className="cnfrmDiaMain">
                        <Grid className="fillDia">
                            <MMHG
                                name="respiration"
                                Unit="/min"
                                label={respiration}
                                onChange={(e) => this.props.updateEntryState(e)}
                                value={this.state.updateTrack.respiration}
                            />
                        </Grid>
                    </Grid>
                )}

                <Grid className="infoShwHidMain3upr">
                    <ShowHide
                        eventdate={true}
                        date_format={this.state.date_format}
                        value={this.state.updateTrack}
                        onChange={(data) => this.props.GetHideShow(data)}
                    />
                    <Grid className="infoShwSave3">
                        <input
                            type="submit"
                            value={save_entry}
                            onClick={this.props.AddTrack}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType,
    };
};
export default withRouter(
    connect(mapStateToProps, { LanguageFetchReducer })(Index)
);
