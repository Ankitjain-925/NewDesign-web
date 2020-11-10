import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { LanguageFetchReducer } from './../../actions';
import sitedata from '../../../sitedata';
import Loader from '../Loader/index.js';
import axios from 'axios';

class Date extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TrackRecord: this.props.TrackRecord,
        };
    }

   
      //This is for the Download the Track
      downloadTrack = () => {
        var medication=[], blood_pressure=[],blood_sugar=[],condition_pain=[],diagnosis=[],doctor_visit=[],hospitalization=[],laboratory_result=[],
        marcumar_pass=[],vaccination=[],weight_bmi = [];
        if(this.state.TrackRecord && this.state.TrackRecord.length>0)
        {
            this.state.TrackRecord.map((data)=>{
                switch (data.type) {
                    case "medication":
                        medication.push(data.substance);
                        break;
                    case "blood_pressure":
                        blood_pressure.push(data.rr_systolic+'/'+data.rr_diastolic+' mmHg')
                        break;
                    case "blood_sugar":
                        blood_sugar.push(data.blood_sugar+' mgdl')
                        break;
                    case "condition_pain":
                        condition_pain.push(data.problem)
                        break;
                    case "diagnosis":
                        diagnosis.push(data.diagnosis)
                        break;
                    case "doctor_visit":
                        doctor_visit.push(data.doctor_name)
                        break;
                    case "hospitalization":
                        hospitalization.push(data.hospital_name)
                        break;
                    case "laboratory_result":
                        laboratory_result.push(data.lab_parameter.label+' '+data.value+' '+data.unit.label)
                        break;
                    case "marcumar_pass":
                        marcumar_pass.push(data.quick_value +' mg/dl')
                        break;
                    case "vaccination":
                        vaccination.push(data.vaccination)
                        break;
                    case "weight_bmi":
                        weight_bmi.push((data.weight / (data.height * data.height) * 10000).toFixed(2)+ ' BMI')
                        break;
                    case "default":
                        break;
                                
                }
            })
        }
        var TrackRecord =  {
            medication: medication,blood_pressure: blood_pressure, blood_sugar : blood_sugar, condition_pain: condition_pain,diagnosis:diagnosis,
            doctor_visit:doctor_visit, hospital_visit: hospitalization, laboratory_result: laboratory_result,marcumar_pass:marcumar_pass, 
            vaccination:vaccination,weight_bmi:weight_bmi
        }
       
        this.setState({ loaderImage: true })
        axios.post(sitedata.data.path + '/UserProfile/downloadfullPdf',
            {
                Dieseases: TrackRecord, patientData: {
                    name: this.props.stateLoginValueAim.user.first_name + " " + this.props.stateLoginValueAim.user.last_name,
                    email: this.props.stateLoginValueAim.user.email,
                    DOB: this.props.stateLoginValueAim.user.birthday,
                    Mobile: this.props.stateLoginValueAim.user.mobile,
                    emergency_contact_name : this.props.stateLoginValueAim.user.emergency_contact_name,
                    emergency_email : this.props.stateLoginValueAim.user.emergency_email,
                    emergency_relation : this.props.stateLoginValueAim.user.emergency_relation
                },
            },
            { responseType: 'blob' }
        ).then(res => {
            this.setState({ loaderImage: false })
            var data = new Blob([res.data]);
            if (typeof window.navigator.msSaveBlob === 'function') {
                // If it is IE that support download blob directly.
                window.navigator.msSaveBlob(data, 'report.pdf');
            } else {
                var blob = data;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'report.pdf';
                document.body.appendChild(link);
                link.click(); // create an <a> element and simulate the click operation.
            }
        }).catch(err => {
            this.setState({ loaderImage: false })
         })
    }

     //on adding new data
     componentDidUpdate = (prevProps) => {
        if (prevProps.TrackRecord !== this.props.TrackRecord) {
            this.setState({ TrackRecord: this.props.TrackRecord })
        }
    }
    
    render() {
        return ( 
            <a onClick={()=>{this.downloadTrack()}}>
               {this.state.loaderImage && <Loader />}
                <img src={require('../../../assets/images/download.svg')} alt="" title="" />  Full Report
            </a> 
           
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    const { stateLoginValueAim } = state.LoginReducerAim;
    return {
        stateLanguageType,
        stateLoginValueAim,
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Date));
