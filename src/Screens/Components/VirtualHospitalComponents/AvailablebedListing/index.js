import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { AllBedOnWard } from "Screens/VirtualHospital/PatientFlow/data";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction";
import { Speciality } from "Screens/Login/speciality.js";
import { getLanguage } from "translations/index";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speciality_id: this.props.speciality_id,
      ward_id: this.props.ward_id,
      AllBeds: 0
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.speciality_id !== this.props.speciality_id || prevProps.ward_id !== this.props.ward_id) {
      this.setState({ speciality_id: this.props.speciality_id, ward_id: this.props.ward_id });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.speciality_id !== this.props.speciality_id || nextProps.ward_id !== this.props.ward_id ||
      nextState.AllBeds == this.state.AllBeds
    );
  }

  GetBedAvailability = async () => {
    if (this.props.speciality_id && this.props.ward_id && this.props?.House?.value) {
      var response = await AllBedOnWard(this.props.speciality_id, this.props.ward_id, this.props?.House?.value, this.props.stateLoginValueAim.token);
      if (response.data.hassuccessed) {
        this.setState({ AllBeds: response?.data?.data })
        }
    }
  }



  render() {
    // this.GetBedAvailability();
    let translate = getLanguage(this.props.stateLanguageType);
    let { available } = translate;
    return (
      <span>{this.state.AllBeds} {available}</span>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { speciality } = state.Speciality;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    speciality
  };
};
export default pure(withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    Speciality
  })(Index)
));


