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
import * as translationEN from '../../../../translations/en.json';
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/en.json';

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
                    this.props.Settings(responce.data.data); 
                }
                else{
                    this.props.Settings({user_id : this.props.stateLoginValueAim.user._id}); 
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
            this.getSetting();
            setTimeout(() => { this.setState({ PassDone: false }) }, 5000)
        })
    }

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
        let { date, time, format, set_the_default, the, is, updated, save_change, pharmacy_prescription_model, pharma_prescription, send_prescription_to_pharmacy, uplod_scanned_prescription, browse, or, or_drag_here, suported_file_type_jpg_png, patient_id, Pharmacy, search_pharmacy_by_name_id, show_pharmacy_within_radious, short_msg_optional, add_this_patient_journal, send_invite } = translate
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
                            <a onClick={this.handleOpenPharma}>{pharmacy_prescription_model}</a>
                        </Grid>
                        {/* Pharmacy Prescription */}
                        <Modal
                            open={this.state.openPharma}
                            onClose={this.handleClosePharma}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme" : ""}>
                            <Grid className="phrmBoxCntnt">
                                <Grid className="phrmCourse">
                                    <Grid className="phrmCloseBtn">
                                        <a onClick={this.handleClosePharma}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{pharma_prescription}</label></Grid>
                                    <p>{send_prescription_to_pharmacy}</p>
                                </Grid>
                                <Grid className="phrmLinkUpr">
                                    <Grid className="upScanForms upScanImg">
                                        <Grid><label>{uplod_scanned_prescription}</label></Grid>
                                        <Grid className="upScanInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>{browse} <input type="file" /></a> {or_drag_here}
                                        </Grid>
                                        <p>{suported_file_type_jpg_png}</p>
                                    </Grid>
                                    <Grid className="scanInputs">
                                        <Grid><label>{patient_id}</label></Grid>
                                        <Grid><input type="text" /></Grid>
                                    </Grid>
                                    <Grid className="scanInputs">
                                        <Grid><label>{Pharmacy}</label></Grid>
                                        <Grid className="scanInputPhrm">
                                            <input type="text" placeholder={search_pharmacy_by_name_id} />
                                            <img src={require('../../../../assets/images/srchInputField.svg')} alt="" title="" />
                                        </Grid>
                                    </Grid>
                                    <Grid className="scanInputs">
                                        <Grid><label>{show_pharmacy_within_radious}</label></Grid>
                                        <Grid className="scanInputKm">
                                            <input type="text" /><span>km</span>
                                        </Grid>
                                    </Grid>
                                    <Grid className="scanInputs shrtMsgOpt">
                                        <Grid><label>{short_msg_optional}</label></Grid>
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
                                            label={add_this_patient_journal}
                                        />
                                    </Grid>
                                    <Grid className="scanInputsSub">
                                        <input type="submit" value={send_invite} />
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