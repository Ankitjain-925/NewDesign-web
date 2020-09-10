import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../Login/actions';
import { Settings } from './../Login/setting';
import LeftMenu from './../Components/Menus/PatientLeftMenu/index';
import { LanguageFetchReducer } from './../actions';
import DateFormat from './../Components/DateFormat/index';
import TimeFormat from './../Components/TimeFormat/index';
import TimeTaken from './../Components/TimeTaken/index';
import PainIntensity from './../Components/PainIntansity/index';
import Condition from './../Components/Condition/index';
import NotesEditor from './../Components/Editor/index';
import SelectByTwo from './../Components/SelectbyTwo/index';
import MMHG from './../Components/mmHgField/index';
import SelectField from './../Components/Select/index';
import CheckBoxField from './../Components/Checkbox/index';
import Temprature from './../Components/Temprature/index';
import ShowHide from './../Components/ShowHide/index';

import moment from 'moment';

const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
           date : new Date(),
           updateTrack : {},
           time: new Date(),
        };
    }

    onChange= (e, names)=>{
        this.setState({names : e})
        // this.setState({ names : e });
    }
    
    //For getting full data of hide Show
    GetHideShow=(data)=>{
        const state = this.state.updateTrack;
        Object.entries(data).map(([k,v])=>{
            if(k==='publicdatetime') {
                if(v !== null)
                {
                    state['public'] = moment(v).utc();
                }
            }
            state[k] = v
        })
        this.setState({ updateTrack: state });
    }
    updateEntryState1 = (value, name) => {
        const state = this.state.updateTrack;
        state[name] = value;
        this.setState({ updateTrack: state });
    }

    updateEntryState = (e) => {
        const state = this.state.updateTrack;
        state[e.target.name] = e.target.value;
        this.setState({ updateTrack: state });
    }

    render() {
        const { selectedOption } = this.state;
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu currentPage ="journal"/>
                                {/* End of Website Menu */}
                               
                                {/* Website Mid Content */}
                                <Grid item xs={12} md={8}>
                                    <DateFormat name="date" value={this.state.date ? new Date(this.state.date) : new Date()} date_format={this.props.settings.setting.date_format} onChange={(e)=>this.onChange(e, 'date')}/>

                                    <TimeFormat name="time" value={this.state.time ? new Date(this.state.time) : new Date()} time_format={this.props.settings.setting.time_format} onChange={(e)=>this.onChange(e, 'time')}/>
                                    
                                    <TimeTaken name="timetaken" label="Reminder time" time_format={this.props.settings.setting.time_format} onChange={(e)=> this.updateEntryState1(e, 'time_taken')} timeArray={this.state.updateTrack.time_taken} />

                                    <PainIntensity name="pain" Forview={true} onChange={(e)=> this.updateEntryState(e)} value={this.state.updateTrack.pain}/>
                                    <PainIntensity name="pain" onChange={(e)=> this.updateEntryState(e)} value={this.state.updateTrack.pain}/>

                                    <Condition name="condition" Forview={true} onChange={(e)=> this.updateEntryState(e)} value={this.state.updateTrack.pain}/>
                                    <Condition name="condition"  onChange={(e)=> this.updateEntryState(e)} value={this.state.updateTrack.pain}/>
                                    
                                    <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/>    
                                
                                    <SelectByTwo name="visible" label="Visible" options={[{label : 'Show this entry', value: 'show'}, {label: 'Hide this entry', value : 'hide'}]} onChange={(e)=> this.updateEntryState1(e, 'visible')} value={this.state.updateTrack.visible}/>    
                                    <SelectByTwo name="feeling" label="Feelings" options={[{label : 'Relaxed', value: 'relaxed'}, {label: 'Stressed', value : 'stressed'}]} onChange={(e)=> this.updateEntryState1(e, 'feelings')} value={this.state.updateTrack.feelings}/>    

                                    <MMHG name="rr_systolic" Unit="mmHg" label="RR Systolic" onChange={(e)=> this.updateEntryState(e)} value={this.state.updateTrack.rr_systolic}/>    
                                    
                                    <SelectField name="smoking_status" label="Smoking Status" option={[{label : 'Show this entry', value: 'show'}, {label: 'Hide this entry', value : 'hide'}]} onChange={(e)=> this.updateEntryState1(e, 'smoking_status')} value={this.state.updateTrack.smoking_status} />

                                    <CheckBoxField name="allergy" label="Allergy" value={this.state.updateTrack.allergy}  onChange={(e)=>this.updateEntryState1(e, 'allergy')}/>
                                    <CheckBoxField name="review" label="Review" value={this.state.updateTrack.review}  onChange={(e)=>this.updateEntryState1(e, 'review')}/>
                                   
                                    <Temprature name="temprature"  name="temprature" valueType = {this.state.updateTrack.temprature_type} value={this.state.updateTrack.temprature} Options={[{label: '°C', value: 'C'},{label: '°F', value: 'F'}]} onChange={(e)=> this.updateEntryState(e)} onChangeType={(e)=> this.updateEntryState1(e, 'temprature_type')} />

                                    {console.log('updateTrack', this.state.updateTrack)}
                                    <ShowHide date_format= {this.props.settings.setting.date_format} value={this.state.updateTrack} onChange={(data) => this.GetHideShow(data)}/>
                                </Grid>
                                {/* End of Website Right Content */}

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const {settings} = state.Settings;
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