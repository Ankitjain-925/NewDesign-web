import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import SelectField from './../../Select/index';
import FileUploader from './../../FileUploader/index';
import NotesEditor from './../../Editor/index';
import ShowHide from './../../ShowHide/index';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
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
        let { date_doc_visit, attachments } = translate

        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="doctor_name" label="Doctor Name" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.doctor_name}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="doctor_id" label="Doctor ID" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.doctor_id}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <SelectField name="specialty" label="Speciality" option={this.state.options} onChange={(e)=> this.updateEntryState1(e, 'specialty')} value={this.state.updateTrack.specialty} />    
                    </Grid>
                  
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{date_doc_visit}</label></Grid>
                            <DateFormat name="date_doctor_visit" value={this.state.updateTrack.date_doctor_visit ? new Date(this.state.updateTrack.date_doctor_visit) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'date_doctor_visit')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" isMulti={true} fileUpload={this.props.FileAttachMulti} />
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

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType
    }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index));