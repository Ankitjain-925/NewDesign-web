import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from './../../Components/Menus/PatientLeftMenu/index';
import sitedata from '../../../sitedata';
import Loader from './../../Components/Loader/index';
import { LoginReducerAim } from './../../Login/actions';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from './../../actions';
import axios from 'axios';
const path = sitedata.data.path + '/emergency_record';

class ComponentToPrint extends React.Component {
    render() {
      return (
          <div>
            <img style={{height: '40px', width: 'auto', margin: '30px'}} src={require('../../../assets/images/logo_new.png')} />
            <div style={{textAlign: 'center'}}>
                <div style={{marginLeft: '200px',marginBottom:'20px', textAlign : 'left', fontSize: '24px', fontWeight: '900', textTransform: 'uppercase'}}>Aimedis Emergency Record</div>
                <p style={{marginLeft: '200px', textAlign : 'left', fontSize: '20px', fontWeight: '800'}}>{this.props.User.first_name && this.props.User.first_name} {this.props.User.last_name && this.props.User.last_name}</p> 
                <p style={{marginLeft: '200px', textAlign : 'left', fontSize: '20px', fontWeight: '800'}}>{this.props.User.profile_id &&  this.props.User.profile_id}</p>
                <p style={{marginLeft: '200px', textAlign : 'left', fontSize: '20px', fontWeight: '800'}}>{this.props.User.email && this.props.User.email}</p>
                <p style={{marginLeft: '200px', textAlign : 'left', fontSize: '20px', fontWeight: '800'}}>{this.props.User.mobile && this.props.User.mobile}</p>
                {this.props.User.birthday && <p style={{marginLeft: '200px', fontSize: '20px', fontWeight: '800'}}>Birthday : {this.props.User.birthday}</p>}
                <div style={{fontSize: '22px', fontWeight: '900', marginTop: '50px',textTransform: 'uppercase', marginBottom: '50px', marginLeft:'200px', marginRight: '200px', padding: '20px', borderBottom : '#679be8 1px solid',  borderTop : '#679be8 1px solid', color: '#679be8'}}>Emergency Diagnosis </div>
                {this.props.diagnosisdata && this.props.diagnosisdata.length > 0 ? this.props.diagnosisdata.map((item, index) =>
                (
                    <li style={{lineHeight: '1.5', textAlign: 'left', listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>
                        {item.diagnosis && <p style={{fontSize: '18px', fontWeight: '900'}}>{item.diagnosis}</p>}
                        {item.Emergency_on && <p><b>Emergency on</b> : {item.emergency_on}</p>}
                        {item.ICD_code_label && <p><b>ICD code</b> : {item.ICD_code_label}</p>}
                        <p><b>Travel Diagnosis</b> : {item.travel_diagnosis ? 'Yes' : 'No'}</p>
                        {item.travel_diagnosis && 
                        <p>{item.travelled_to  &&  <p><b>Travelled to</b> : {item.travelled_to}</p>}
                        {item.when_to  &&  <p><b>When to</b> : {item.when_to}</p>}
                        {item.when_until  &&  <p><b>When until</b> : {item.when_until}</p>}  
                        </p>
                        }
                        {item.diagnosed_by && <p><b>Diagnosed by</b> : {item.diagnosed_by}</p>}
                        {item.diagnosed_on && <p><b>Diagnosed on</b> : {item.diagnosed_on}</p>}
                        {item.remarks && <p><b>Remarks</b> : {item.remarks}</p>}
                    </li>
                )): 
            <li style={{listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>} 

            <div style={{fontSize: '22px', fontWeight: '900', marginTop: '50px',textTransform: 'uppercase', marginBottom: '50px', marginLeft:'200px', marginRight: '200px', padding: '20px', borderBottom : '#679be8 1px solid',  borderTop : '#679be8 1px solid', color: '#679be8'}}>Allergies </div>
                {this.props.allergydata && this.props.allergydata.length > 0 ? this.props.allergydata.map((item, index) =>
                (
                    <li style={{lineHeight: '1.5', textAlign: 'left', listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>
                        {item.diagnosis && <p style={{fontSize: '18px', fontWeight: '900'}}>{item.diagnosis}</p>}
                        {item.Emergency_on && <p><b>Emergency on</b> : {item.emergency_on}</p>}
                        {item.ICD_code_label && <p><b>ICD code</b> : {item.ICD_code_label}</p>}
                        <p><b>Travel Diagnosis</b> : {item.travel_diagnosis ? 'Yes' : 'No'}</p>
                        {item.travel_diagnosis && 
                        <p>{item.travelled_to  &&  <p><b>Travelled to</b> : {item.travelled_to}</p>}
                        {item.when_to  &&  <p><b>When to</b> : {item.when_to}</p>}
                        {item.when_until  &&  <p><b>When until</b> : {item.when_until}</p>}  
                        </p>
                        }
                        {item.diagnosed_by && <p><b>Diagnosed by</b> : {item.diagnosed_by}</p>}
                        {item.diagnosed_on && <p><b>Diagnosed on</b> : {item.diagnosed_on}</p>}
                        {item.remarks && <p><b>Remarks</b> : {item.remarks}</p>}
                    </li>
                )): 
            <li style={{listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>} 

            <div style={{fontSize: '22px', fontWeight: '900', marginTop: '50px',textTransform: 'uppercase', marginBottom: '50px', marginLeft:'200px', marginRight: '200px', padding: '20px', borderBottom : '#679be8 1px solid',  borderTop : '#679be8 1px solid', color: '#679be8'}}>Medication </div>
              
                {this.props.mediacationdata && this.props.mediacationdata.length > 0 ? this.props.mediacationdata.map((item, index) =>
                (
                    <li style={{lineHeight: '1.5', textAlign: 'left', listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>
                        {item.substance &&  <p style={{fontSize: '18px', fontWeight: '900'}}>{item.substance}</p>}
                        {item.ATC_code && item.ATC_code.label &&  <p>ATC code : {item.ATC_code.label}</p>}
                        {item.trade_name && <p>Trade Name : {item.trade_name}</p>}
                        {item.time_taken && <p>Time Taken : {item.time_taken && (Array.prototype.map.call(item.time_taken, s => s.label).toString()).split(/[,]+/).join(',  ')} {item.interval && (Array.prototype.map.call(item.interval, s => s.label).toString()).split(/[,]+/).join(',  ')}</p>}
                        {item.reminder_time_taken && <p>Reminder Time Taken : {item.reminder_time_taken && (Array.prototype.map.call(item.reminder_time_taken, s => s.label).toString()).split(/[,]+/).join(',  ')} {item.reminders && (Array.prototype.map.call(item.reminders, s => s.label).toString()).split(/[,]+/).join(',  ')}</p>}
                        {item.remarks && <p>Remarks : {item.remarks}</p>}
                        {item.remarks && <p>Prescribed on : {item.prescribed_on}</p>}
                        {item.lifelong ? <p>Until : {item.lifelong}</p> :
                        <p>Until : {item.until}</p>} 
                    </li>
                )): 
            <li style={{listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>} 

            <div style={{fontSize: '22px', fontWeight: '900', marginTop: '50px', textTransform: 'uppercase',marginBottom: '50px', marginLeft:'200px', marginRight: '200px', padding: '20px', borderBottom : '#679be8 1px solid',  borderTop : '#679be8 1px solid', color: '#679be8'}}>Contact Person in case of an Emergency</div>
                {this.props.contact_partner ? 
               <li style={{lineHeight: '1.5', textAlign: 'left', listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>
               {this.props.contact_partner.name && <p>Contact Name: {this.props.contact_partner.name} </p>}
               {this.props.contact_partner.number && <p>Contact Number : {this.props.contact_partner.number} </p>}
               {this.props.contact_partner.email && <p>Contact E-mail: {this.props.contact_partner.email} </p>}
               {!this.props.contact_partner.name && !this.props.contact_partner.number && !this.props.contact_partner.email && <li style={{listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>}
           </li>: 
            <li style={{listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>} 

            <div style={{fontSize: '22px', fontWeight: '900', marginTop: '50px', textTransform: 'uppercase',marginBottom: '50px', marginLeft:'200px', marginRight: '200px', padding: '20px', borderBottom : '#679be8 1px solid',  borderTop : '#679be8 1px solid', color: '#679be8'}}>Family Doctor </div>
                {this.props.family_doc && this.props.family_doc.length > 0 ? this.props.family_doc.map((item, index) =>
                (<li style={{lineHeight: '1.5', textAlign: 'left', listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>
                        {item.first_name && <p>First Name : {item.first_name}</p>}
                        {item.last_name && <p>Last Name : {item.last_name}</p>}
                        {item.sex && <p>Gender : {item.sex}</p>}
                        {item.speciality && <p>Speciality  : {item.speciality.join(', ')}</p>}
                        {item.mobile && <p>Mobile : {item.mobile}</p>}
                        {item.email && <p>Email : {item.email}</p>}
                   </li>
                )): 
            <li style={{listStyleType : 'none', paddingBottom: '15px', width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>} 

    <div style={{fontSize: '22px', fontWeight: '900', marginTop: '50px',textTransform: 'uppercase', marginBottom: '50px', marginLeft:'200px', marginRight: '200px', padding: '20px', borderBottom : '#679be8 1px solid',  borderTop : '#679be8 1px solid', color: '#679be8'}}>Organ Donar Status</div>
    {this.props.donar && this.props.donar.status !=='Nothing' ?
                <p>
                    Status : {this.props.donar.status}<br />
                    {this.props.donar.options && this.props.donar.options !=='' && 
                        <span>
                    {typeof this.props.donar.options === 'object' ? 
                    <p>
                        <p>{this.props.donar.options.first_name &&  this.props.donar.options.first_name} {this.props.donar.options.last_name && this.props.donar.options.last_name}</p> 
                        <p>{this.props.donar.options.phone && this.props.donar.options.phone}</p>
                        <p>{this.props.donar.options.city && this.props.donar.options.city} {this.props.donar.options.address && this.props.donar.options.address}</p>
                    </p>
                    :
                    this.props.donar.options && <p>  {this.props.donar.options} </p>}   
                    </span>
                }<br/> 
                    {this.props.donar.remarks && <p>Remarks : {this.props.donar.remarks}</p>}
                </p>:<li style={{listStyleType : 'none', paddingBottom: '15px',  width: '400px', marginLeft: '200px', marginTop: '20px'}}>No Data yet</li>} 
        </div>  
            <div style={{textAlign: 'right', marginRight: '100px', marginTop: '50px'}}><div style={{fontSize: '22px', fontWeight: '800'}}>Your Aimedis team</div><br/>
                https://sys.aimedis.io<br/>
                <b>The Aimedis blog:</b>https://blog.aimedis.com<br/>
            </div>
    </div> 
  
      );
    }
  }

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosisdata: [],
            mediacationdata: [],
            allergydata: [],
            family_doc: [],
            donar: {},
            contact_partner: {},
            loaderImage: false,
        };
    }
  
    componentDidMount() {
        this.allemergencyrecord();
    }
  
    allemergencyrecord() {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.get(path + '/' + user_id, 
            { headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({
                    diagnosisdata: response.data.diagnosisdata, mediacationdata: response.data.medicationdata, allergydata: response.data.allergydata,
                    family_doc: response.data.doctor, loaderImage: false, donar: response.data.donardata,
                    contact_partner: response.data.contact_partner
                })
            })
    }

    render() {
        return (
            <Grid className="homeBg">
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={12}>
                        <Grid container direction="row">

                            {/* Website Menu */}
                            <LeftMenu currentPage ="more"/>
                            {/* End of Website Menu */}

                            {/* Website Mid Content */}
                            <Grid item xs={12} md={11}>
                                <Grid className="emrgncyDataUpr">

                                    <Grid container direction="row">
                                        <Grid item xs={12} md={10}>
                                            <Grid className="emrgncyData">
                                                <h1>Your Emergency Data</h1>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row">
                                        <Grid item xs={12} md={9}>

                                            {/* Health Status */}
                                            <Grid className="healthStatus">
                                                <h2>Health Status</h2>
                                                <Grid container direction="row" spacing={3}>
                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="medicalNotify">
                                                            <Grid className="medicalLabl">
                                                                <label>Medications</label>
                                                            </Grid>
                                                            <Grid className="medicalDesp">
                                                            {this.state.mediacationdata && this.state.mediacationdata.length > 0 ? this.state.mediacationdata.map((item, index) => (
                                                             <p><a>{item.substance}</a></p>
                                                            )) : <p>No medications</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="medicalNotify">
                                                            <Grid className="medicalLabl">
                                                                <label>Allergies</label>
                                                            </Grid>
                                                            <Grid className="medicalDesp">
                                                            {this.state.allergydata && this.state.allergydata.length > 0 ? this.state.allergydata.map((item, index) => (
                                                             <p><a>{item.diagnosis}</a></p>
                                                            )) : <p>No Allegies</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="medicalNotify">
                                                            <Grid className="medicalLabl">
                                                                <label>Diagnoses</label>
                                                            </Grid>
                                                            <Grid className="medicalDesp">
                                                            {this.state.diagnosisdata && this.state.diagnosisdata.length > 0 ? this.state.diagnosisdata.map((item, index) => (
                                                             <p><a>{item.diagnosis}</a></p>
                                                            )) : <p>No diagnosis</p>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {/* End of Health Status */}

                                            {/* Contacts & Other info */}
                                            <Grid className="otherInfo">
                                                <h2>Contacts & Other info</h2>
                                                <Grid container direction="row" spacing={3}>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="docCntctMain">
                                                            <Grid className="docCntct">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={7} className="docCntctLft">
                                                                        <label>Family Doctor</label>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={5} className="docCntctRght">
                                                                        <a><img src={require('../../../assets/images/edit.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            
                                                            {this.state.family_doc && this.state.family_doc.length > 0 ? this.state.family_doc.map((item, index) =>(
                                                            <div>
                                                                <Grid className="docInfo"> 
                                                                    <Grid className="docInfoName"><a><img src={require('../../../assets//images/person1.jpg')} alt="" title="" /><span>Mark Anderson M.D.</span></a></Grid>
                                                                    <Grid><a><img src={require('../../../assets//images/phone.svg')} alt="" title="" />{item.mobile}</a></Grid>
                                                                    <Grid><a><img src={require('../../../assets//images/email.svg')} alt="" title="" />{item.email}</a></Grid>
                                                                    <Grid><a><img src={require('../../../assets//images/language.svg')} alt="" title="" />{item.language && item.language.join(', ')}</a></Grid>
                                                                    
                                                                </Grid>
                                                                <Grid className="neuroDises">
                                                                    <Grid className="neuroGen">
                                                                        <Grid><label>{item.speciality && item.speciality.join(', ')}</label></Grid>
                                                                        <p>{item.subspeciality && item.subspeciality.join(', ')}</p>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>))
                                                            : <p>No Family Doctor</p>}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="docCntctMain">
                                                            <Grid className="docCntct">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={7} className="docCntctLft">
                                                                        <label>Emergency Contact</label>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={5} className="docCntctRght">
                                                                        <a><img src={require('../../../assets/images/edit.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            {this.state.contact_partner  &&
                                                            <div> 
                                                                <Grid className="jlyMorr">
                                                                    <Grid><label>{this.state.contact_partner.name && this.state.contact_partner.name}</label></Grid>
                                                                    <p>{this.state.contact_partner.relation && this.state.contact_partner.relation}</p>
                                                                </Grid>
                                                                <Grid className="docInfo docInfoBrdr">
                                                                    <Grid><a><img src={require('../../../assets//images/phone.svg')} alt="" title="" />{this.state.contact_partner.number && this.state.contact_partner.number}</a></Grid>
                                                                    <Grid><a><img src={require('../../../assets//images/email.svg')} alt="" title="" />{this.state.contact_partner.email && this.state.contact_partner.email}</a></Grid>
                                                                </Grid>
                                                            </div>
                                                            }
                                                            {!this.state.contact_partner  && <p>No Family Doctor</p>}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <Grid className="docCntctMain">
                                                            <Grid className="docCntct">
                                                                <Grid container direction="row">
                                                                    <Grid item xs={6} md={7} className="docCntctLft">
                                                                        <label>Organ Donor Status</label>
                                                                    </Grid>
                                                                    <Grid item xs={6} md={5} className="docCntctRght">
                                                                        <a><img src={require('../../../assets//images/edit.svg')} alt="" title="" /></a>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="jlyMorr">
                                                            {this.state.donar && this.state.donar.status !=='Nothing' ?
                                                                <div>
                                                                    <Grid><label>{this.state.donar.status}</label></Grid>
                                                                    {this.state.donar.options && this.state.donar.options !=='' && 
                                                                    <span>
                                                                {typeof this.state.donar.options === 'object' ? 
                                                                    <Grid className="docInfo"> 
                                                                        <Grid className="docInfoName"><a><img src={require('../../../assets//images/person1.jpg')} alt="" title="" /><span>{this.state.donar.options.first_name &&  this.state.donar.options.first_name} {this.state.donar.options.last_name && this.state.donar.options.last_name}</span></a></Grid>
                                                                        <Grid><a><img src={require('../../../assets//images/phone.svg')} alt="" title="" />{this.state.donar.options.phone && this.state.donar.options.phone}</a></Grid>
                                                                        <Grid><a><img src={require('../../../assets//images/language.svg')} alt="" title="" />{this.state.donar.options.city && this.state.donar.options.city}, {this.state.donar.options.address && this.state.donar.options.address},  {this.state.donar.options.postal_code && this.state.donar.options.postal_code}</a></Grid>
                                                                        {/* <Grid><a><img src={require('../../../assets//images/language.svg')} alt="" title="" />{item.language && item.language.join(', ')}</a></Grid> */}
                                                                    </Grid>
                                                                    :
                                                                    this.state.donar.options && <p>  {this.state.donar.options} </p>}   
                                                                    </span>
                                                                }<br/> 
                                                                {this.state.donar.remarks && <p>{this.state.donar.remarks}</p>}
                                                                </div>:  <Grid><label>Not an organ donor</label></Grid>}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                </Grid>
                                            </Grid>
                                            {/* End of Contacts & Other info */}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* End of Website Right Content */}

                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index));