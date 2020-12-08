import React, { Component, useLayoutEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import NotesEditor from './../../Editor/index';
import ShowHide from './../../ShowHide/index';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from './../../mmHgField/index';
import DateFormat from './../../DateFormat/index';
import FileUploader from './../../FileUploader/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
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
            date_format : this.props.date_format,
            time_format : this.props.time_format,
            options : this.props.options,
            allDocData1 : [],
            MyDocList : [],
            icdinr : '',
            icd : ''
        };
    }

    componentDidMount = () => {
        this.getAllDoc();
    }

    getAllDoc=()=>{
        const user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var images = [], Reccimages = [];
            this.setState({ allDocData1: response.data.data })
        })
    }
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.updateTrack !== this.props.updateTrack) {
            this.setState({ updateTrack: this.props.updateTrack })
        }
    }

    updateEntryState1=(value, name)=>{
        if(name === 'diagnosed_by')
        {
            this.search_user(value);
        }
        var state= this.state.updateTrack
        state[name] = value;
        this.setState({updateTrack: state})
        this.props.updateEntryState1(value, name)
    }

    updateEntryState2=(value, name)=>{
        var User_name = '';
        if(value.last_name){ User_name = value.first_name +' '+value.last_name; }
        else{ User_name = value.first_name; }
        var state= this.state.updateTrack
        state[name] = User_name
        this.setState({updateTrack: state,  MyDocList: [] })
        this.props.updateEntryState1(User_name, name)
    }
    
    search_user = (event)=> {
        let serach_value = this.SearchUser(event, this.state.allDocData1)
        this.setState({ MyDocList: serach_value })
    }

    SearchUser = (searchKey, searchInto) => {
        return searchInto.filter(user => {
            searchKey = searchKey.toLowerCase()
            let name = `${user.first_name} ${user.last_name}`
            name = name.toLowerCase().search(searchKey)
            if (name > -1) {
                return user
            }
            else {
                return false
            }
        })
    };

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
        let {slct_ICD_serch_code, when, to , enter_code_serch_by_keyword, Enter_Diagnosis, allergy, dignose, of, until, archive, rr_systolic, attachments, time_measure, date_measure,
            date, time, confirm_diag, emergancy_dignosis, trvl_diagnosis, travelled_to, diagnosed, by, notes, save_entry }= translate
        let diagnosed_by = diagnosed+" "+by
        let {MyDocList} = this.state;
        return ( 
            <div>
                 {!this.props.visibility && <Grid className="cnfrmDiaMain">
                    
                    {this.props.comesfrom !== 'patient' && 
                    <Grid className="cnfrmDiaUpr">
                        <Grid container direction="row">
                            <Grid item xs={12} md={8} className="cnfrmDiaLft">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="checkedB"
                                            color="#00ABAF"
                                        />
                                    }
                                    label={confirm_diag}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="cnfrmDiaRght 444">
                                <img src={require('../../../../assets/images/confirmed-diagnosis.svg')} alt="" title="" />
                            </Grid>
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={12} md={8} className="cnfrmDiaLft">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="checkedB"
                                            color="#00ABAF"
                                        />
                                    }
                                    label={emergancy_dignosis}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="cnfrmDiaRght 555">
                                <img src={require('../../../../assets/images/emergency-diagnosis.svg')} alt="" title="" />
                            </Grid>
                        </Grid>
                    </Grid>}
                        
                    <Grid className="fillDia">
                        <MMHG name="diagnosis" label={Enter_Diagnosis} onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.diagnosis}/> 
                    </Grid>
                    <Grid className="diaCD">
                        <Grid><label>{slct_ICD_serch_code}</label></Grid>
                        <Grid><a onClick={()=>{this.setState({icd: 'icd-10'})}} className={this.state.icd==='icd-10' ? "diaCDActv" : ''}>ICD-10</a> <a className={this.state.icd==='icd-11' ? "diaCDActv" : ''} onClick={()=>{this.setState({icd: 'icd-11'})}}>ICD-11</a></Grid>
                        {this.state.icd === 'icd-10' && <Grid>
                            <a onClick={()=>{this.setState({icdinr: 'icd-10-who'})}} className={this.state.icdinr==='icd-10-who' ? "diaCDActv" : ''}>ICD-10 WHO</a>
                            <a onClick={()=>{this.setState({icdinr: 'icd-10-cm'})}} className={this.state.icdinr==='icd-10-cm' ? "diaCDActv" : ''}>ICD-10 CM</a> 
                            <a onClick={()=>{this.setState({icdinr: 'icd-10-gm'})}} className={this.state.icdinr==='icd-10-gm' ? "diaCDActv" : ''}>ICD-10 GM</a>
                        </Grid>}
                    </Grid>
                    <Grid className="srchDia">
                        <Grid className="srchdoseMg">
                            <input type="text" placeholder={enter_code_serch_by_keyword} />
                            <span><img src={require('../../../../assets/images/search-entries.svg')} alt="" title="" /></span>
                        </Grid>
                    </Grid>
                    <Grid className="travelDia">
                        <Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="checkedB"
                                        name="allergy" 
                                        checked={this.state.updateTrack.allergy === true}
                                        onChange={(e)=> this.updateEntryState1(e.target.checked, 'allergy')}
                                        color="#00ABAF"
                                    />
                                }
                                label={allergy}
                            />
                        </Grid>
                        <Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="checkedB"
                                        color="#00ABAF"
                                        name="travel_diagnosis" 
                                        checked={this.state.updateTrack.travel_diagnosis === true}
                                        onChange={(e)=> this.updateEntryState1(e.target.checked, 'travel_diagnosis')}
                                    />
                                }
                                label={trvl_diagnosis}
                            />
                        </Grid>

                    </Grid>
                    {this.state.updateTrack.travel_diagnosis && <div>
                        <Grid className="fillDia">
                                <MMHG name="travelled_to" label={travelled_to} onChange={(e)=> this.props.updateEntryState(e)} value={this.state.updateTrack.travelled_to}/>    
                        </Grid>
                        <Grid className="fillDia">
                            <Grid className="rrSysto">
                                <Grid><label>{when} {to}</label></Grid>
                                <DateFormat name="when_to" value={this.state.updateTrack.when_to ? new Date(this.state.updateTrack.when_to) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'when_to')}/>
                            </Grid>   
                        </Grid>
                        <Grid className="fillDia">
                            <Grid className="rrSysto">
                                <Grid><label>{when} {until}</label></Grid>
                                <DateFormat name="when_until" value={this.state.updateTrack.when_until ? new Date(this.state.updateTrack.when_until) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'when_until')}/>
                            </Grid>   
                        </Grid>
                    </div>}
                   <Grid className="fillDia">
                        <Grid className="rrSysto">
                            <Grid><label> {date} {of} {dignose}</label></Grid>
                            <DateFormat name="diagnosed_on" value={this.state.updateTrack.diagnosed_on ? new Date(this.state.updateTrack.diagnosed_on) : new Date()} date_format={this.state.date_format} onChange={(e)=>this.updateEntryState1(e, 'diagnosed_on')}/>
                        </Grid>   
                    </Grid>
                    <Grid className="fillDia">
                        <MMHG name="diagnosed_by" label={diagnosed_by} onChange={(e)=> this.updateEntryState1(e.target.value, 'diagnosed_by')} value={this.state.updateTrack.diagnosed_by}/>    
                        <ul className="insuranceHint1" style={{display : MyDocList.length>0 ? 'block' : 'none'}}>
                        {MyDocList && MyDocList.length>0 && MyDocList.map((t)=>(
                            <li onClick={()=>this.updateEntryState2(t, 'diagnosed_by')} value={`${t.first_name} ${t.last_name}`}>{t.first_name && t.first_name} {t.last_name && t.last_name}</li>
                        ))}
                        </ul>
                    </Grid>
                    <Grid className="attchForms attchImg">
                        <Grid><label>{attachments}</label></Grid>
                        <FileUploader name="UploadTrackImageMulti" comesFrom="journal" isMulti={true} fileUpload={this.props.FileAttachMulti} />
                    </Grid>
                    <Grid className="fillDia">
                        <NotesEditor name="remarks" label={notes}  onChange={(e)=> this.updateEntryState1(e, 'remarks')} value={this.state.updateTrack.remarks}/> 
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
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
   
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    }
};
export default withRouter(connect(mapStateToProps, {  LanguageFetchReducer })(Index));

