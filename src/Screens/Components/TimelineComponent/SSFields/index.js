import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NotesEditor from './../../Editor/index';
import SelectField from './../../Select/index';
import ShowHide from './../../ShowHide/index';
import DateFormat from './../../DateFormat/index';
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
import * as translationNL from '../../../../translations/nl.json';
import * as translationFR from '../../../../translations/fr.json';
import * as translationAR from '../../../../translations/ar.json';
import {GetShowLabel1} from '../../GetMetaData/index.js';

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

        let translate={};
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
            case "fr":
                translate = translationFR.text
                break;
            case "ar":
                translate = translationAR.text
                break;
            default:
                translate = translationEN.text
        }
        let { from, when, until, smoking_status, notes, save_entry} = translate

        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <SelectField name="smoking_status" label={smoking_status} option={this.state.options} onChange={(e)=> this.updateEntryState1(e, 'smoking_status')} value={GetShowLabel1(this.props.options, this.state.updateTrack && this.state.updateTrack.smoking_status && this.state.updateTrack.smoking_status.value, this.props.stateLanguageType, false,'anamnesis')} />
                    </Grid>
                    {(!this.state.updateTrack.smoking_status || (this.state.updateTrack.smoking_status && this.state.updateTrack.smoking_status.value !=='Never_smoked')) &&
                    <div>
                        <Grid className="rrSysto">
                            <Grid><label>{from} {when}</label></Grid>
                            <DateFormat name="from_when" value={this.state.updateTrack.from_when ? new Date(this.state.updateTrack.from_when) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'from_when')}/>
                        </Grid> 
                        <Grid className="rrSysto">
                            <Grid><label>{until} {when}</label></Grid>
                            <DateFormat name="until_when" value={this.state.updateTrack.until_when ? new Date(this.state.updateTrack.until_when) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'until_when')}/>
                        </Grid>
                    </div>}   
                    
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label={notes}  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
                    </Grid>
                </Grid>}
                
                <Grid className="infoShwHidMain3upr">
                <ShowHide eventdate={true} date_format= {this.state.date_format} value={this.state.updateTrack} onChange={(data) => this.props.GetHideShow(data)}/>
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
