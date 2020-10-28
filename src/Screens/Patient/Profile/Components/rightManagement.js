import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from './../../../actions';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Loader from './../../../Components/Loader/index';
import DateFormat from './../../../Components/DateFormat/index'
import * as translationEN from '../../../../translations/en.json';

class Index extends Component {
    constructor(props) {
       super(props);
        this.state = {
            selectedOption: '',
            Language: [],
            loaderImage: false,
            selectedOption: "",
            emergency_access: '',
            exclude_doctors: '',
            StandardSetting: {},
            newStandardSetting: {},
            opt: '',
            opt_set: '',
            opt_until: '',
            iserr: false,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount() {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        this.getUserData();
    }


    //Check all valiedation for the Opt
    optSettting = () => {
        if (this.state.opt_set === 'until') {
            if (this.state.opt_until && this.state.opt_until !== '') {
                this.SaveOptSetting();

            }
            else {
                this.setState({ iserr: true })
            }
        }
        else {
            this.SaveOptSetting();
        }
    }

    //For update the Date Time when using Until
    updateDatetime = (str) => {
        if (!str || str === 'undefined' || str === null || str === '') {
            return str;
        }
        else {
            var n = str.includes("Z");
            if (n) {
                var t = str.split(":")
                t.pop()
                var re = t.join(":")
                return re;
            }
            else { return str }
        }
    }

    //For save the opt setting
    SaveOptSetting = () => {
        this.setState({ loaderImage: true });
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/Rigt_management', {
            emergency_access: this.state.emergency_access,
            opt: this.state.opt,
            opt_set: this.state.opt_set,
            opt_until: this.state.opt_until
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((responce) => {
                this.setState({ loaderImage: false });
            })
    }

    //Set the emergency access state
    handleemergency_access(changeEvent) {
        this.setState({ emergency_access: changeEvent.target.value });
    }

    //Get the right Management information from the DB
    getUserData = () => {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ loaderImage: false });
            if (response) {
                if (response.data.data.Rigt_management[0].activated_general_right) {
                    this.setState({ selectedOption: response.data.data.Rigt_management[0].activated_general_right })
                }
                if (response.data.data.Rigt_management[0].emergency_access) {
                    this.setState({ emergency_access: response.data.data.Rigt_management[0].emergency_access })
                }
                if (response.data.data.Rigt_management[0].exclude_all_doctors) {
                    this.setState({ exclude_doctors: response.data.data.Rigt_management[0].exclude_all_doctors })
                }
                if (response.data.data.Rigt_management[0].who_else_other_than_me) {
                    this.setState({ StandardSetting: response.data.data.Rigt_management[0].who_else_other_than_me })
                }
                if (response.data.data.Rigt_management[0].who_else_other_than_me_newEntries) {
                    this.setState({ newStandardSetting: response.data.data.Rigt_management[0].who_else_other_than_me_newEntries })
                }
                if (response.data.data.Rigt_management[0].opt) {
                    this.setState({ opt: response.data.data.Rigt_management[0].opt })
                }
                if (response.data.data.Rigt_management[0].opt_set) {
                    this.setState({ opt_set: response.data.data.Rigt_management[0].opt_set })
                }
                if (response.data.data.Rigt_management[0].opt_until) {
                    this.setState({ opt_until: response.data.data.Rigt_management[0].opt_until })
                }
            }
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }
      // On change the Date
      onChange = (date) => {
        this.setState({ opt_until: date })
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
        let {right_management, setup_who_can_see_upload_data, emergancy_access_for_hospital_doc, specify_kind_of_right_management,
            automatically_visible_content, automatically_hidden_content, Opt_In, Opt_Out, apply_right_management_for_all_items,
            plz_mention_date_time, make_all_item_visible_now_untill,make_all_item_hide_now_untill,make_all_item_hide_untill, make_all_item_visible_untill, save_change }=translate

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Grid className="rghtMgnt">
                            <h5>{right_management}</h5>
                            <p>{setup_who_can_see_upload_data}</p>
                        </Grid>

                        <Grid className="emrgncyAccess">
                            <p>{emergancy_access_for_hospital_doc}</p>
                            <Grid>
                                <FormControlLabel value="yes" name="emergency_access" checked={this.state.emergency_access === 'yes'} onChange={this.handleemergency_access.bind(this)} control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" name="emergency_access" checked={this.state.emergency_access === 'no'} onChange={this.handleemergency_access.bind(this)} control={<Radio />} label="No" />
                            </Grid>
                        </Grid>

                        <Grid className="otpAccess">
                            <h5>{specify_kind_of_right_management}</h5>
                            <Grid>
                                <FormControlLabel checked={this.state.opt === 'in'} value='in' onChange={(e) => { this.setState({ opt: e.target.value }) }} name="opt" control={<Radio />} label={Opt_In} />
                                <p>{automatically_hidden_content}</p>
                                <FormControlLabel checked={this.state.opt === 'out'} value='out' onChange={(e) => { this.setState({ opt: e.target.value }) }} name="opt" control={<Radio />} label={Opt_Out} />
                                <p>{automatically_visible_content}</p>
                            </Grid>
                        </Grid>

                        <Grid className="spcifyKind">
                            <h5>{apply_right_management_for_all_items}</h5>
                            {this.state.iserr && <div className="err_message">{plz_mention_date_time}</div>}
                            <Grid><FormControlLabel onChange={(e) => { this.setState({ opt_set: e.target.value }) }}
                                value='always' checked={this.state.opt_set === 'always'} control={<Radio />} label={this.state.opt === 'out' ? make_all_item_visible_now_untill : make_all_item_hide_now_untill} /></Grid>
                            <Grid>
                                <FormControlLabel onChange={(e) => { this.setState({ opt_set: e.target.value }) }}
                                    value='until' checked={this.state.opt_set === 'until'} control={<Radio />} label={this.state.opt === 'out'? make_all_item_visible_untill : make_all_item_hide_untill} />
                                <Grid className="vsblAllTim">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={8}>
                                        
                                        <DateFormat name="opt_until" value={this.state.opt_until? new Date(this.state.opt_until) : new Date()} onChange={this.onChange} date_format={this.props.settings.setting && this.props.settings.setting.date_format} onChange={this.onChange} />
                                        {/* <DateFormat value={this.state.opt_until ? new Date(this.state.opt_until) : new Date()} onChange={this.onChange} date_format={this.props.settings.setting && this.props.settings.setting.date_format} name="opt_until" value={this.updateDatetime()} onChange={(date) => { this.setState({ opt_until: date }) }} /> */}
                                            {/* <TextField
                                                type="datetime-local"
                                                defaultValue="2018-08-24T10:30"
                                                name="opt_until" value={this.updateDatetime(this.state.opt_until)} onChange={(e) => { this.setState({ opt_until: e.target.value }) }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            /> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12} md={8} className="rghtMgntBtn">
                                <input type="submit" onClick={this.optSettting.bind(this)} value={save_change} />
                            </Grid>
                        </Grid>

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