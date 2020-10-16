import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { connect } from "react-redux";
import { LoginReducerAim } from '../../Login/actions';
import { Settings } from '../../Login/setting';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from '../../actions';
import sitedata from '../../../sitedata';
import Loader from '../../Components/Loader/index';
import axios from "axios";

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openFancyLanguage: this.props.openFancyLanguage,
            languageValue: this.props.languageValue, 
            loaderImage : false,  
        };
    }

    //For close the pop up
    handleCloseFancyLanguage=()=>{
        this.props.handleCloseFancyLanguage();
    }
 
    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.openFancyLanguage !== this.props.openFancyLanguage) {
           this.setState({openFancyLanguage : this.props.openFancyLanguage})
        }
        if (prevProps.languageValue !== this.props.languageValue) {
            this.setState({languageValue : this.props.languageValue})
         }
    }

    // Change Language function
changeLanguage = (e) => {
    this.setState({ languageValue: e.target.value })
}
//For set the language
SetLanguage = () => {
    this.setState({ loaderImage: true })
    if (!this.state.languageValue) {
        this.setState({ loaderImage: false, languageBlank: true })
    } else {
        this.setState({ languageBlank: false })
        axios.put(sitedata.data.path + '/UserProfile/updateSetting', {
            language: this.state.languageValue,
            user_id: this.props.stateLoginValueAim.user._id,
            user_profile_id: this.props.stateLoginValueAim.user.profile_id
        }, {
            headers: {
                'token': this.props.stateLoginValueAim.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((responce) => {
            this.setState({ PassDone: true, loaderImage: false })
            this.props.Settings(this.props.stateLoginValueAim.token);
            setTimeout(() => { this.setState({ PassDone: false, openFancyLanguage: false }) }, 5000)
        })
    }
}

    render() {
        return (
            <div>
            {this.state.loaderImage && <Loader />}
            <Modal
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={this.state.openFancyLanguage}
            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ?"darkTheme":""}
            onClose={this.handleCloseFancyLanguage}>
            <Grid className="LanguageBoxMain">
                <Grid className="nwPresCourse">
                    <Grid className="nwPresCloseBtn">
                        <a onClick={this.handleCloseFancyLanguage}>
                            <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                        </a>
                    </Grid>
                    <Grid><label>Select Language</label></Grid>
                </Grid>
                {this.state.PassDone && <div className="success_message">Language is Updated!</div>}
                {this.state.languageBlank && <div className="err_message">Language is not selected.</div>}
                <div className="languageHead"></div>
                <Grid className="languageBox">
                    <Grid className="row">
                        <Grid className="col-sm-6 col-xl-6">
                            <Grid>
                                <input value="en" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "en" ? "checked" : ""} />
                                <label>English</label>
                            </Grid>
                            <Grid>
                                <input value="de" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "de" ? "checked" : ""} />
                                <label>Germany</label>
                            </Grid>
                            <Grid>
                                <input value="rs" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "rs" ? "checked" : ""} />
                                <label>Russian</label>
                            </Grid>
                            <Grid>
                                <input value="nl" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "nl" ? "checked" : ""} />
                                <label>Dutch</label>
                            </Grid>
                        </Grid>
                        <Grid className="col-sm-6 col-xl-6">
                            <Grid>
                                <input value="sp" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "sp" ? "checked" : ""} />
                                <label>Spanish</label>
                            </Grid>
                            <Grid>
                                <input value="pt" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "pt" ? "checked" : ""} />
                                <label>Portuguese</label>
                            </Grid>
                            <Grid>
                                <input value="ch" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "ch" ? "checked" : ""} />
                                <label>Chinese</label>
                            </Grid>
                            <Grid>
                                <input value="sw" onChange={this.changeLanguage} name="language" type="radio" checked={this.state.languageValue == "sw" ? "checked" : ""} />
                                <label>Swahili</label>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className="infoShwHidBrdr2"></Grid>
                <Grid className="infoShwHidIner2">
                    <Grid className="infoShwSave2">
                        <input type="submit" value="Save changes" onClick={this.SetLanguage} />
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
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


