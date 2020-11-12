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

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state: this.props.LoggedInUser,
            Format: {},
            dates: this.props.dates,
            times: this.props.times,
            timezones: this.props.timezones,
            loaderImage: false,
            PassDone: false,
            dateF: {},
            timeF: {},
            timezone: {},
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
                    'token': this.props.stateLoginValueAim.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed && responce.data.data) {
                    this.setState({ timezone: responce.data.data.timezone, timeF: { label: responce.data.data.time_format, value: responce.data.data.time_format }, dateF: { label: responce.data.data.date_format, value: responce.data.data.date_format }, })
                    this.props.Settings(responce.data.data);
                }
                else {
                    this.props.Settings({ user_id: this.props.stateLoginValueAim.user._id });
                }
                this.setState({ loaderImage: false })
            })
    }

    //For Change Format State
    ChangeFormat = (event, name) => {
        if (name === 'date_format') { this.setState({ dateF: event }) }
        else if (name === 'timezone') { this.setState({ timezone: event }) }
        else { this.setState({ timeF: event }) }
        const state = this.state.Format;
        if (name === 'timezone') { state[name] = event }
        else { state[name] = event && event.value; }
        this.setState({ Format: state })
    }

    //For Set Format
    SetFormat = () => {
        this.setState({ loaderImage: true })
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
            date_format: this.state.Format.date_format,
            time_format: this.state.Format.time_format,
            timezone: this.state.Format.timezone,
            user_id: this.props.LoggedInUser._id,
            user_profile_id: this.props.LoggedInUser.profile_id,
        }, {
            headers: {
                'token': this.props.stateLoginValueAim.token,
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
        let { date, time, format, set_the_default, the, is, time_zone, date_format, time_format, updated, save_change, Timezone } = translate

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
                                        placeholder={date_format}
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
                                        placeholder={time_format}
                                        name="time_format"
                                        isSearchable={false}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className="timeFormat">
                                <Grid><label>{Timezone}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.timezone}
                                        onChange={(e) => this.ChangeFormat(e, 'timezone')}
                                        options={this.state.timezones}
                                        placeholder={time_zone}
                                        name="timezone"
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