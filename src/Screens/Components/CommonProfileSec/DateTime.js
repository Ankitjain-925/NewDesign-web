import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from 'sitedata';
import axios from 'axios';
import { Currency } from "currency1"
import Loader from 'Screens/Components/Loader/index';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from "translations/index"

var languages = [{ value: 'ar', label: 'Arabian' },
{ value: 'ch', label: 'Chinese' },
{ value: 'nl', label: 'Dutch' },
{ value: 'en', label: 'English' },
{ value: 'fr', label: 'French' },
{ value: 'de', label: 'German' },
{ value: 'pt', label: 'Portuguese' },
{ value: 'rs', label: 'Russian' },
{ value: 'sp', label: 'Spanish' },
{ value: 'sw', label: 'Swahili' }]

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Current_state: this.props.LoggedInUser,
            Format: {},
            currency: { value: this.props.settings?.setting?.currency?.country, label: this.props.settings?.setting?.currency?.currency },
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
                    if (responce.data?.data?.msg_language) {
                        let msg_language = responce.data.data.msg_language;
                        let filterData = languages && languages.length > 0 && languages.filter((data) => data.value === msg_language)
                        if (filterData && filterData.length > 0) {
                            this.setState({ msg_language: filterData[0] })
                        }
                    }
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
        else if (name === 'msg_language') { this.setState({ msg_language: event }) }
        else if (name === 'currency') {
            this.setState({ currency: event })
        }
        else { this.setState({ timeF: event }) }
        const state = this.state.Format;
        if (name === 'timezone') { state[name] = event }
        else { state[name] = event && event.value; }
        this.setState({ Format: state })
    }

    //For Set Format
    SetFormat = () => {
        this.setState({ loaderImage: true })
        let { currency } = this.state
        let data = {
            country: currency.value,
            currency: currency.label
        }
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
            date_format: this.state.Format.date_format,
            time_format: this.state.Format.time_format,
            timezone: this.state.Format.timezone,
            msg_language: this.state.Format.msg_language,
            user_id: this.props.LoggedInUser._id,
            user_profile_id: this.props.LoggedInUser.profile_id,
            currency: data
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
        let { currency } = this.state
        let translate = getLanguage(this.props.stateLanguageType)

        let { date, choose_currency, time, currencyLang, format, SMSEmailLanguage, set_the_default, the, is, updated, save_change, Timezone, time_format, time_zone, date_format } = translate

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                {this.state.PassDone && <div className="success_message">{the} {format} {is} {updated}</div>}
                <Grid>
                    <Grid className="datTimFrmt">
                        <h5>{date} & {time_format}</h5>
                        <p>{set_the_default} {date} & {time_format}</p>
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Grid className="dateFormat">
                                <Grid><label>{date_format}</label></Grid>
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
                                        isSearchable={true}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>{SMSEmailLanguage}</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.msg_language}
                                        onChange={(e) => this.ChangeFormat(e, 'msg_language')}
                                        options={languages}
                                        placeholder={SMSEmailLanguage}
                                        name="msg_language"
                                        isSearchable={true}
                                        className="mr_sel"
                                    />
                                </Grid>
                            </Grid>
                            <Grid className="timeFormat">
                                <Grid><label>{currencyLang}</label></Grid>
                                <Grid>
                                    <Select
                                        value={currency}
                                        onChange={(e) => this.ChangeFormat(e, 'currency')}
                                        options={Currency}
                                        placeholder={choose_currency}
                                        name="currency"
                                        isSearchable={true}
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