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
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
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
            UpDataDetails:{},
            editorState: EditorState.createEmpty()
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

    //For Change Format State
    ChangeFormat = (event, name) => {
        if (name == 'date_format') { this.setState({ dateF: event }) }
        else { this.setState({ timeF: event }) }
        const state = this.state.Format;
        state[name] = event && event.value;
        this.setState({ Format: state })
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
            var title, titlefromD = response.data.data.title;
            if( titlefromD && titlefromD !== "")
            {
                title = response.data.data.title.split(", ");
            }
            else
            {
                title = [];
            }
            if(response.data.data.mobile && response.data.data.mobile !== '')
            {
                let mob = response.data.data.mobile.split("-");
                if(mob && mob.length>0)
                {
                    this.setState({flag_mobile : mob[0]})
                }
            }
            if(response.data.data.phone && response.data.data.phone !== '')
            {
                let pho = response.data.data.phone.split("-");
                if(pho && pho.length>0)
                {
                    this.setState({flag_phone : pho[0]})
                }
            }
            if(response.data.data.fax && response.data.data.fax !== '')
            {
                let fx = response.data.data.fax.split("-");
                if(fx && fx.length>0)
                {
                    this.setState({flag_fax : fx[0]})
                }
            }
            this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id : response.data.data.profile_id});
            this.setState({ speciality_multi: this.state.UpDataDetails.speciality })
            this.setState({ subspeciality_multi: this.state.UpDataDetails.subspeciality })
            this.setState({ name_multi: this.state.UpDataDetails.language })
            this.setState({ birthday: response.data.data.birthday, title : title })
            
            if (response.data.data.practice_image) {
                var find = response.data.data && response.data.data.practice_image && response.data.data.practice_image
                if(find)
                {
                    this.setState({uploadedimage : response.data.data.practice_image})
                    find = find.split('.com/')[1]
                    axios.get(sitedata.data.path + '/aws/sign_s3?find='+find,)
                    .then((response) => {
                        if(response.data.hassuccessed)
                        {
                            this.setState({uploadedimage1:response.data.data})
                        }
                    })
                }
                //  this.setState({ uploadedimage: response.data.data.image })
            }
            if (response.data.data.we_offer) {
                this.setState({ weoffer: response.data.data.we_offer })
            }
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }


    updateEntryState = (e) => {
        const state = this.state.UpDataDetails;
        if (e.target.name === 'is2fa') {
            state[e.target.name] = e.target.checked;
        }
        else {
            state[e.target.name] = e.target.value;
        }
        this.setState({ UpDataDetails: state });
    }
        
    onEditorStateChange = (editorState) => {
        const state = this.state.UpDataDetails;
        state['weoffer_text']= draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log("e", editorState)
        this.setState({
            editorState,
            UpDataDetails:state
          });
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
        const { selectedOption, editorState } = this.state;
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
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
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