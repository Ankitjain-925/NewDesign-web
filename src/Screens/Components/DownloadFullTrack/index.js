import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "./../../Login/actions";
import { LanguageFetchReducer } from "../../actions";
import * as translationEN from "../../../translations/en.json";
import * as translationDE from "../../../translations/de.json";
import * as translationPT from "../../../translations/pt.json";
import * as translationSP from "../../../translations/sp.json";
import * as translationRS from "../../../translations/rs.json";
import * as translationSW from "../../../translations/sw.json";
import * as translationCH from "../../../translations/ch.json";
import * as translationNL from "../../../translations/nl.json";
import * as translationFR from "../../../translations/fr.json";
import * as translationAR from "../../../translations/ar.json";
import sitedata from "../../../sitedata";
import { pure } from "recompose";
import Loader from "../Loader/index.js";
import axios from "axios";

class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TrackRecord: this.props.TrackRecord,
    };
  }

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
      anamnesis = [];
    if (this.state.TrackRecord && this.state.TrackRecord.length > 0) {
      this.state.TrackRecord.map((data) => {
        switch (data.type) {
          case "medication":
            medication.push(data.substance);
            break;
          case "blood_pressure":
            blood_pressure.push(
              data.rr_systolic + "/" + data.rr_diastolic + " mmHg"
            );
            break;
          case "blood_sugar":
            blood_sugar.push(data.blood_sugar + " mgdl");
            break;
          case "condition_pain":
            condition_pain.push(data.problem);
            break;
          case "diagnosis":
            diagnosis.push(data.diagnosis);
            break;
          case "doctor_visit":
            doctor_visit.push(data.doctor_name);
            break;
          case "hospitalization":
            hospitalization.push(data.hospital_name);
            break;
          case "laboratory_result":
            laboratory_result.push(
              data.lab_parameter &&
                data.lab_parameter.label +
                  " " +
                  data.value +
                  " " +
                  data.unit.label
            );
            break;
          case "marcumar_pass":
            marcumar_pass.push(data.quick_value + " mg/dl");
            break;
          case "vaccination":
            vaccination.push(data.vaccination);
            break;
          case "weight_bmi":
            weight_bmi.push(
              ((data.weight / (data.height * data.height)) * 10000).toFixed(2) +
                " BMI"
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
    };

    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/UserProfile/downloadfullPdf",
        {
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
      nextState.TrackRecord !== this.state.TrackRecord
    );
  }

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
    let { full_report } = translate;
    return (
      <a
        onClick={() => {
          this.downloadTrack();
        }}
      >
        {this.state.loaderImage && <Loader />}
        <img
          src={require("../../../assets/images/download.svg")}
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
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Date)
  )
);
