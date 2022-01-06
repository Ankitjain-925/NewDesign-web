import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SelectField from "Screens/Components/Select/index";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import NotesEditor from "../../Editor/index";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import { getPatientData } from "Screens/Components/CommonApi/index";
import { LanguageFetchReducer } from "Screens//actions";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "react-select";
import { LoginReducerAim } from "Screens/Login/actions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { pure } from "recompose";
import PropTypes from "prop-types";
import { getLanguage } from "translations/index"
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noWards: false,
            value: 0,
            newdata: [],
            buttonField: false,
            users1: {}
        };
    }

    // componentDidMount = () => {
    //     this.getPatientData();
    // };

    // handleOpenRvw = () => {
    //     this.setState({ noWards: true });
    // }

    // handleCloseRvw = () => {
    //     this.setState({ noWards: false });
    // }

    // handleChangeTab = (event, value) => {
    //     this.setState({ value });
    // };

    // onFieldChange1 = (e, name) => {
    //     //   console.log('e',e,name)
    //     var state = this.state.newdata;
    //     state[name] = e
    //     this.setState({ newdata: state });
    //     // console.log('nghch',this.state.newdata)
    // }

    // //Get patient list
    // getPatientData = async () => {
    //     this.setState({ loaderImage: true });
    //     let response = await getPatientData(this.props.stateLoginValueAim.token, this.props?.House?.value)
    //     if (response.isdata) {
    //         this.setState({ users1: response.PatientList1, users: response.patientArray, loaderImage: false })
    //         // console.log('users1',this.state.users1)
    //     }
    //     else {
    //         this.setState({ loaderImage: false });
    //     }
    // }

    // handleChange1 = (e, name) => {
    //     var state = this.state.newdata;
    //     state[name] = e.target.value
    //     this.setState({ newdata: state });
    // };

    // handleChange2 = (e, name) => {
    //     // console.log('e',e,name)
    //     var state = this.state.newdata
    //     state[name] = e.value
    //     this.setState({ newdata: state });
    //     // console.log('e',e)
    // };

    // updateEntryState1 = (value, name) => {
    //     var state = this.state.newdata;
    //     state[name] = value;
    //     this.setState({ newdata: state });
    // };

    // updateEntryState2 = (e) => {
    //     if (e === true) {
    //         this.setState({ buttonField: true })
    //     } else {
    //         this.setState({ buttonField: false })
    //     }
    //     // console.log("e", e, name)
    // }

    // handleSubmit = () => {
    //     console.log("data", this.state.newdata)
    //     this.setState({ newdata: {} })
    // };

    render() {
        const { value } = this.state;
        let translate = getLanguage(this.props.stateLanguageType)
        let {
          save_entry,
          rr_systolic,
          attachments,
          time_measure,
          date_measure,
          RR_diastolic,
          heart_rate,
          feeling,
        } = translate;
    
        return (
            <div>
              <Grid className="cnfrmDiaMain">
              {/* <Grid className="fillDia">
              <SelectByTwo
                name="option"
                label={"Who would you like to send this to ?"}
                options={this.state.options}
                onChange={(e) => this.updateEntryState1(e, "option")}
                value={GetShowLabel1(
                  this.state.options,
                  this.state.updateTrack &&
                    this.state.updateTrack.situation &&
                    this.state.updateTrack.situation.value,
                  this.props.stateLanguageType
                )}
              />
              {this.state.updateTrack.option === 'specific' && (
               <Grid className="fillDia">
                <SelectField
                    name="patient"
                    isSearchable={true}
                    label={'select patient'}
                    option={this.state.options}
                    onChange={(e) => this.updateEntryState1(e, "patient")}
                    value={GetShowLabel1(
                    this.props.options,
                    this.state.updateTrack &&
                        this.state.updateTrack.patient &&
                        this.state.updateTrack.patient.value,
                    this.props.stateLanguageType,
                    false,
                    "specialty"
                    )}
                />
                </Grid>
               )}
                <SelectField
                    name="promotion_type"
                    isSearchable={true}
                    label={"Promotion Type"}
                    option={this.state.options}
                    onChange={(e) => this.updateEntryState1(e, "promotion_type")}
                    value={GetShowLabel1(
                    this.props.options,
                    this.state.updateTrack &&
                        this.state.updateTrack.promotion_type &&
                        this.state.updateTrack.promotion_type.value,
                    this.props.stateLanguageType,
                    false,
                    "specialty"
                    )}
                />
            </Grid>
            <Grid className="infoShwSave3">
                    <input
                    type="submit"
                    value={save_entry}
                    // onClick={this.props.AddTrack}
                    />
                </Grid> */}
                </Grid>
            </div>
                    
        )
    }
}
const mapStateToProps = (state) => {
    const { stateLanguageType } = state.LanguageReducer;
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
      } = state.LoginReducerAim;
    return {
        stateLanguageType,
        stateLoginValueAim
    };
};
export default pure(
    withRouter(connect(mapStateToProps, { LanguageFetchReducer, LoginReducerAim, })(Index))
);