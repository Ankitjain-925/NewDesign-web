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
        let { date_measure, time_measure, attachments }= translate
        return (
            <div>
                {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    <Grid className="fillDia">
                        <MMHG name="weight" Unit="kg" label="Weight" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.blood_sugar}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="height" Unit="cm" label="Height" onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.Hba1c}/>    
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{date_measure}</label></Grid>
                            <DateFormat name="date_measured" value={this.state.updateTrack.date_measured ? new Date(this.state.updateTrack.date_measured) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'date_measured')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label>{time_measure}</label></Grid>
                            <TimeFormat name="time_measured" value={this.state.updateTrack.time_measured ? new Date(this.state.updateTrack.time_measured) : new Date()} time_format={this.state.time_format} onChange={(e)=>this.updateEntryState1(e, 'time_measured')}/>
                            
                        </Grid>
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
