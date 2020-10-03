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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6



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
            PassFail: false,
            dateF: {},
            timeF: {},
            UpDataDetails: {},
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount = () => {
        this.getUserData()
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



    getUserData() {
        this.setState({ loaderImage: true, UpDataDetails: {} });
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
            
            this.setState({ UpDataDetails: response.data.data, profile_id: response.data.data.profile_id });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    saveData = () => {
        const {UpDataDetails} = this.state;
        const user_token = this.props.stateLoginValueAim.token;
        let updatedata = {
            weoffer_text: UpDataDetails.weoffer_text,
            latest_info: UpDataDetails.latest_info,         
        }
        axios.put(sitedata.data.path + '/UserProfile/Users/update', 
        updatedata, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log('responce', response)
            if(response && response.data.hassuccessed){
                this.setState({PassDone:true})
            }
            else{
                this.setState({PassFail:true})
            }
            
        })
    }

    handleChange = (event) => {
        this.setState({PassDone:false, PassFail: false})
        let state = this.state.UpDataDetails;
        state['weoffer_text'] = event.target.value
        this.setState({ UpDataDetails: state })
    }

    handlelatestChange = (value) => {
        this.setState({PassDone:false, PassFail: false})
        let state = this.state.UpDataDetails;
        state['latest_info'] = value
        this.setState({ UpDataDetails: state })

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
        const { UpDataDetails } = this.state;
        return (
            <div>
                {this.state.loaderImage && <Loader />}
                {this.state.PassDone && <div className="success_message">The information is updated succesfully</div>}
                {this.state.PassFail && <div className="err_message">The information is not updated succesfully</div>}
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>

                        <Grid className="profileInfo">
                            <h1>Office information</h1>
                            <p>This is what patients see when they are arranging an appointment</p>
                        </Grid>

                        <Grid item className="officInfo profileInfoIner">
                            <label>We offer</label>
                            <Grid><input type="text" name="weoffer_text" onChange={this.handleChange} value={this.state.UpDataDetails.weoffer_text ? this.state.UpDataDetails.weoffer_text : ''} /></Grid>
                        </Grid>

                        <Grid className="latstInfo">
                            <label>Latest information</label>
                            <Grid>
                                <ReactQuill name="latest_info" value={this.state.UpDataDetails.latest_info?UpDataDetails.latest_info:''}
                                    onChange={this.handlelatestChange} />
                            </Grid>
                        </Grid>

                        <Grid className="latstInfoBtn">
                            <input type="submit" value="Save changes" onClick={this.saveData}/>
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