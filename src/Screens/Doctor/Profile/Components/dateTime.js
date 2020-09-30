import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import axios from 'axios';
import Loader from './../../../Components/Loader/index';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
import { LanguageFetchReducer } from './../../../actions';
import * as translationEN from '../../../../translations/en_json_proofread_13072020.json';
import DatePicker from 'react-date-picker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import TimePicker from 'react-time-picker';
import Modal from '@material-ui/core/Modal';

const Linkoptions = [
    { value: 'kaldasch@gmail.com', label: 'kaldasch@gmail.com' },
    { value: 'ap@gmail.in', label: 'ap@gmail.in' },
    { value: 'test@gmail.in', label: 'test@gmail.in' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state: this.props.LoggedInUser,
            Format: {},
            dates: this.props.dates,
            times: this.props.times,
            loaderImage: false,
            PassDone: false,
            dateF: {},
            timeF: {},
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount = () => {
        this.getSetting()
    }

    //For getting the existing settings
    getSetting = () => {
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/updateSetting',
            {
                headers: {
                    'token': this.props.user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed && responce.data.data) {
                    this.setState({ timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                }
                this.setState({ loaderImage: false })
            })
    }

    //For Change Format State
    ChangeFormat = (event, name) => {
        if (name == 'date_format') { this.setState({ dateF: event }) }
        else { this.setState({ timeF: event }) }
        const state = this.state.Format;
        state[name] = event && event.value;
        this.setState({ Format: state })
    }

    //For Set Format
    SetFormat = () => {
        this.setState({ loaderImage: true })
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
            date_format: this.state.Format.date_format,
            time_format: this.state.Format.time_format,
            user_id: this.props.LoggedInUser._id,
            user_profile_id: this.props.LoggedInUser.profile_id,
        }, {
            headers: {
                'token': this.props.user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((responce) => {
            this.setState({ PassDone: true, loaderImage: false })
            this.props.Settings(this.props.user_token);
            setTimeout(() => { this.setState({ PassDone: false }) }, 5000)
        })
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
        let { date, time, format, set_the_default, the, is, updated, save_change } = translate
        const { selectedOption } = this.state;
        return (
            <div>
                {this.state.loaderImage && <Loader />}
                {this.state.PassDone && <div className="success_message">{the} {format} {is} {updated}</div>}
                <Grid>

                    <Grid className="datTimFrmt">
                        <h5>{date} & {time} {format}</h5>
                        <p>{set_the_default} {date} & {time} {format}</p>
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4}>

                            <Grid className="dateFormat">
                                <Grid><label>{date} {format}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.dateF}
                                        onChange={(e) => this.ChangeFormat(e, 'date_format')}
                                        options={this.state.dates}
                                        placeholder="Date format"
                                        name="date_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>{time} {format}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.timeF}
                                        onChange={(e) => this.ChangeFormat(e, 'time_format')}
                                        options={this.state.times}
                                        placeholder="Time format"
                                        name="time_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className="timDatSubmit">
                                <input type="submit" onClick={this.SetFormat} value={save_change} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid>
                        <Grid className="phamraLink">
                            <a onClick={this.handleOpenPharma}>Pharmacy Prescription Model</a>
                        </Grid>
                        {/* Pharmacy Prescription */}
                        <Modal
                            open={this.state.openPharma}
                            onClose={this.handleClosePharma}>
                            <Grid className="phrmBoxCntnt">
                                <Grid className="phrmCourse">
                                    <Grid className="phrmCloseBtn">
                                        <a onClick={this.handleClosePharma}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>Pharmacy Prescription</label></Grid>
                                    <p>Send prescriptions to pharmacies</p>
                                </Grid>
                                <Grid className="phrmLinkUpr">
                                    <Grid className="upScanForms upScanImg">
                                        <Grid><label>Upload scanned prescriptions</label></Grid>
                                        <Grid className="upScanInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>Browse <input type="file" /></a> or drag here
                    </Grid>
                                        <p>Supported file types: .jpg, .png, .pdf</p>
                                    </Grid>
                                    <Grid className="scanInputs">
                                        <Grid><label>Patient ID</label></Grid>
                                        <Grid><input type="text" /></Grid>
                                    </Grid>
                                    <Grid className="scanInputs">
                                        <Grid><label>Pharmacy</label></Grid>
                                        <Grid className="scanInputPhrm">
                                            <input type="text" placeholder="Search Pharmacy by name or ID" />
                                            <img src={require('../../../../assets/images/srchInputField.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                    <Grid className="scanInputs">
                                        <Grid><label>Show Pharmacies within my radius of</label></Grid>
                                        <Grid className="scanInputKm">
                                            <input type="text" /><span>km</span>
                                        </Grid>
                                    </Grid>
                                    <Grid className="scanInputs shrtMsgOpt">
                                        <Grid><label>Short message (optional)</label></Grid>
                                        <Grid><textarea></textarea></Grid>
                                    </Grid>
                                    <Grid className="jurnlTatent">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="checkedB"
                                                    color="#00ABAF"
                                                />
                                            }
                                            label="Add this to Patient Journal"
                                        />
                                    </Grid>
                                    <Grid className="scanInputsSub">
                                        <input type="submit" value="Send invites" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of Pharmacy Prescription */}
                    </Grid>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
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