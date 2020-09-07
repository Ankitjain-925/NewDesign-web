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


    render() {

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Grid className="rghtMgnt">
                            <h5>Rights Management</h5>
                            <p>Setup who can see your data and who can upload data to your profile</p>
                        </Grid>

                        <Grid className="emrgncyAccess">
                            <p>Emergency access to my emergency files for hospital and doctors</p>
                            <Grid>
                                <FormControlLabel value="yes" name="emergency_access" checked={this.state.emergency_access === 'yes'} onChange={this.handleemergency_access.bind(this)} control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" name="emergency_access" checked={this.state.emergency_access === 'no'} onChange={this.handleemergency_access.bind(this)} control={<Radio />} label="No" />
                            </Grid>
                        </Grid>

                        <Grid className="otpAccess">
                            <h5>Please specify what kind of right management you prefer? </h5>
                            <Grid>
                                <FormControlLabel checked={this.state.opt === 'in'} value='in' onChange={(e) => { this.setState({ opt: e.target.value }) }} name="opt" control={<Radio />} label="Opt-In" />
                                <p>A new item is automatically HIDDEN to Doctors & Nurses in case of a regular profile
                                access (PIN & ID) & must manually be made VISIBLE by me (SHOW ALWAYS or SHOW UNTIL
                                A SPECIFIED DATE.)</p>
                                <FormControlLabel checked={this.state.opt === 'out'} value='out' onChange={(e) => { this.setState({ opt: e.target.value }) }} name="opt" control={<Radio />} label="Opt-Out" />
                                <p>A new item is automatically VISIBLE to Doctors & Nurses in case of a regular profile
                                access (PIN & ID) & must manually be made INVISIBLE by me (HIDE ALWAYS or HIDE UNTIL
                                A SPECIFIED DATE.)</p>
                            </Grid>
                        </Grid>

                        <Grid className="spcifyKind">
                            <h5>Apply a right managment setting of ALL Items</h5>
                            {this.state.iserr && <div className="err_message">Please mention the date-time for until</div>}
                            <Grid><FormControlLabel onChange={(e) => { this.setState({ opt_set: e.target.value }) }}
                                value='always' checked={this.state.opt_set === 'always'} control={<Radio />} label="Make all items VISIBLE now (Until changed) " /></Grid>
                            <Grid>
                                <FormControlLabel onChange={(e) => { this.setState({ opt_set: e.target.value }) }}
                                    value='until' checked={this.state.opt_set === 'until'} control={<Radio />} label="Make all items VISIBLE until" />
                                <Grid className="vsblAllTim">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={8}>
                                            <TextField
                                                type="datetime-local"
                                                defaultValue="2018-08-24T10:30"
                                                name="opt_until" value={this.updateDatetime(this.state.opt_until)} onChange={(e) => { this.setState({ opt_until: e.target.value }) }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12} md={8} className="rghtMgntBtn">
                                <input type="submit" onClick={this.optSettting.bind(this)} value="Save changes" />
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