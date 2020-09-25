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

import { Editor } from 'react-draft-wysiwyg';
const weOfferOptions = [
    { value: 'Service name', label: 'Service name' },
    { value: 'Service name', label: 'Service name' },
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
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>

                        <Grid className="officArng">
                            <h2>Office information</h2>
                            <p>This is what patients see when they are arranging an appointment</p>
                        </Grid>

                        <Grid item className="officInfo">
                            <label>We offer</label>
                            <Grid>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={weOfferOptions}
                                    placeholder=""
                                    isSearchable={false}
                                    isMulti={true}
                                />
                            </Grid>
                        </Grid>

                        <Grid className="latstInfo">
                            <label>Latest information</label>
                            <Grid className="latstInfoEditor">
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            </Grid>
                        </Grid>

                        <Grid className="latstInfoBtn">
                            <input type="submit" value="Save changes" />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
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