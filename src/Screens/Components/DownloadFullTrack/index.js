import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import {
  getLanguage
} from "translations/index"
import sitedata from "sitedata";
import { pure } from "recompose";
import Loader from "../Loader/index.js";
import axios from "axios";
import {
  getReminder, getDate, getTime
} from "Screens/Components/BasicMethod/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TrackRecord: this.props.TrackRecord,
    };
  }

  getFamilyDoc = async (user_token, user_id) => {
    var data = '';
    if(user_id)
    {
      await axios
      .get(sitedata.data.path + "/UserProfile/Users/"+user_id, {
        headers: {
          token: user_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        data = response.data.data
        return data;
      });
    }
    return data;
  };
  //This is for the Download the Track
  downloadTrack = () => {
    var medication = [],
      blood_pressure = [],
      blood_sugar = [],
      condition_pain = [],
      diagnosis = [],
      doctor_visit = [],
      hospitalization = [],
      laboratory_result = [],
      marcumar_pass = [],
      vaccination = [],
      weight_bmi = [],
      VTrial = [],
      fanamnesis = [],
      covid_19 = [],
      diary = [],
      smoking_status = [],
      anamnesis = [],
      respiration = [];
      var time1 = '';
    if (this.state.TrackRecord && this.state.TrackRecord.length > 0) {
      this.state.TrackRecord.map((data) => {
        switch (data.type) {
          case "medication":
            // medication.push(data.substance);
             medication.push(data.substance + ', '+ data?.dosage + data?.unit?.label + ' ('+ getReminder(data.time_taken,  this.props?.settings?.setting.time_format)+') since '+ getDate(data.prescribed_on, this.props?.settings?.setting.date_format ));
            break;
          case "blood_pressure":
            time1 = data.time_measured ? getTime(new Date(data.time_measured), 12) : '';
            blood_pressure.push(
              data.rr_systolic + "/" + data.rr_diastolic + " mmHg on "+  getDate( data.date_measured, 'mm/dd/yyyy' )+' at '+ time1
            );
            break;
          case "blood_sugar":
            time1 = data.time_measured ? getTime(new Date(data.time_measured), 12) : '';
            blood_sugar.push(data.blood_sugar + " mgdl on "+  getDate( data.date_measured, 'mm/dd/yyyy' )+' at '+ time1) ;
            break;
          case "condition_pain":
            condition_pain.push(data.problem +' on '+ getDate( data.event_date, 'mm/dd/yyyy' ));
            break;
          case "diagnosis":
            diagnosis.push(data.diagnosis);
            break;
          case "doctor_visit":
            doctor_visit.push(data.doctor_name +' on '+ getDate( data.date_doctor_visit, 'mm/dd/yyyy' ));
            break;
          case "hospitalization":
            hospitalization.push(data.hospital_name+' from '+ getDate( data.first_visit_date, 'mm/dd/yyyy' ) + ' until '+  getDate( data.last_visit_date, 'mm/dd/yyyy' ));
            break;
          case "laboratory_result":
            time1 = data.time_measured ? getTime(new Date(data.time_measured), 12) : '';
            laboratory_result.push(
              data.lab_parameter &&
                data.lab_parameter.label +
                  " " +
                  data.value +
                  " " +
                  data.unit.label +" on "+  getDate( data.date_measured, 'mm/dd/yyyy' )+' at '+ time1
            );
            break;
          case "marcumar_pass":
            time1 = data.time_measured ? getTime(new Date(data.time_measured), 12) : '';
            marcumar_pass.push(data.quick_value + " mg/dl on "+  getDate( data.date_measured, 'mm/dd/yyyy' )+' at '+ time1) ;
            break;
          case "vaccination":
            vaccination.push(data.vaccination + ' on '+ getDate(data.data_of_vaccination, 'mm/dd/yyyy' ));
            break;
          case "weight_bmi":
            time1 = data.time_measured ? getTime(new Date(data.time_measured), 12) : '';
            weight_bmi.push(
              ((data.weight / (data.height * data.height)) * 10000).toFixed(2) +
                " BMI on "+  getDate( data.date_measured, 'mm/dd/yyyy' )+' at '+ time1
            );
            break;
          case "anamnesis":
            anamnesis.push(data.remarks);
          case "smoking_status":
            smoking_status.push(
              data.smoking_status && data.smoking_status.label
            );
          case "family_anamnesis":
            var dess =
              data.relation && data.relation.label
                ? data.disease_name + " - " + data.relation.label
                : data.disease_name;
            fanamnesis.push(dess);
          case "diary":
            diary.push(data.free_text);
          case "respiration":
            respiration.push(data.respiration);
          case "covid_19":
            covid_19.push(data.temprature);
          case "vaccination_trial":
            var trial =
              data.temprature &&
              data.temprature + " -" + data.problem &&
              data.problem;
            VTrial.push(trial);
          default:
            break;
        }
      });
    }
 
    var TrackRecord = {
      medication: medication.filter((e) => e != null),
      blood_pressure: blood_pressure.filter((e) => e != null),
      blood_sugar: blood_sugar.filter((e) => e != null),
      condition_pain: condition_pain.filter((e) => e != null),
      diagnosis: diagnosis.filter((e) => e != null),
      doctor_visit: doctor_visit.filter((e) => e != null),
      hospital_visit: hospitalization.filter((e) => e != null),
      laboratory_result: laboratory_result.filter((e) => e != null),
      marcumar_pass: marcumar_pass.filter((e) => e != null),
      vaccination: vaccination.filter((e) => e != null),
      weight_bmi: weight_bmi.filter((e) => e != null),
      diary: diary.filter((e) => e != null),
      family_anamnesis: fanamnesis.filter((e) => e != null),
      smoking_status: smoking_status.filter((e) => e != null),
      anamnesis: anamnesis.filter((e) => e != null),
      covid_19_diary: covid_19.filter((e) => e != null),
      covid_19_vaccination_trial: VTrial.filter((e) => e != null),
      respiration: respiration.filter((e)=> e != null)
    };
    var user_id =  this.props.stateLoginValueAim?.user?.family_doc?.[0];
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    this.getFamilyDoc(user_token, user_id).then((result) => {
      console.log('docArray', result)
    axios
    .post(sitedata.data.path + "/UserProfile/downloadfullPdf", {
          Dieseases: TrackRecord,
          patientData: {
            name:
              this.props.stateLoginValueAim.user.first_name +
              " " +
              this.props.stateLoginValueAim.user.last_name,
            email: this.props.stateLoginValueAim.user.email,
            DOB: this.props.stateLoginValueAim.user.birthday,
            Mobile: this.props.stateLoginValueAim.user.mobile,
            emergency_contact_name: this.props.stateLoginValueAim.user
              .emergency_contact_name,
            emergency_email: this.props.stateLoginValueAim.user.emergency_email,
            emergency_relation: this.props.stateLoginValueAim.user
              .emergency_relation,
            family_doctor: result?.first_name+' '+ result?.last_name + '- ('+ result?.alies_id +')'
          },
        },
        { responseType: "blob" }
      )
      .then((res) => {
        this.setState({ loaderImage: false });
        var data = new Blob([res.data]);
        if (typeof window.navigator.msSaveBlob === "function") {
          // If it is IE that support download blob directly.
          window.navigator.msSaveBlob(data, "report.pdf");
        } else {
          var blob = data;
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "report.pdf";
          document.body.appendChild(link);
          link.click(); // create an <a> element and simulate the click operation.
        }
      })
      .catch((err) => {
        this.setState({ loaderImage: false });
      });
    })
    .catch((err) => {
      this.setState({ loaderImage: false });
    });
  };

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.TrackRecord !== this.props.TrackRecord) {
      this.setState({ TrackRecord: this.props.TrackRecord });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.TrackRecord !== this.props.TrackRecord ||
      nextState.TrackRecord !== this.state.TrackRecord || 
      nextProps.stateLanguageType !==  this.props.stateLanguageType
    );
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { full_report } = translate;
    return (
      <a
        onClick={() => {
          this.downloadTrack();
        }}
      >
        {this.state.loaderImage && <Loader />}
        <img
          src={require("assets/images/download.svg")}
          alt=""
          title=""
        />{" "}
        {full_report}
      </a>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { stateLoginValueAim } = state.LoginReducerAim;
  return {
    stateLanguageType,
    stateLoginValueAim,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index)
  )
);
