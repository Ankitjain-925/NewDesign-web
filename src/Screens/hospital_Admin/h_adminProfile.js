import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from 'sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import LeftMenu from "Screens/Components/Menus/H_leftMenu/index"
import LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile"
import Loader from 'Screens/Components/Loader/index';
import translationEN from "./translations/en_json_proofread_13072020.json"
import translationDE from "./translations/de.json"
import "./style.css";
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { commonHeader,commonCometHeader } from 'component/CommonHeader/index';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            openDash: false,
            date: new Date(),
            age: '',
            name: 'hai',
            labelWidth: 0,
            name_multi: [],
            age: '',
            name: 'hai',
            labelWidth: '',
            gender: '',
            language: [],
            userDetails: [],
            weoffer: [],
            language: [],
            speciality: [],
            uploadedimage: '',
            file: '',
            imagePreviewUrl: '',
            genderdata: [],
            languageData: [],
            specialityData: [],
            addressDetails: [],
            title_degreeData: [],
            subspeciality: [],
            UpDataDetails: [],
            speciality_multi: [],
            insurance_count: 1,
            insuranceDetails: {},
            insurancefull: [],
            UpDataDetailsdicard: [],
            speciality_multidiscard: [],
            name_multidiscard: [],
            passwordDetails: [],
            loaderImage: false,
            regisError1: '',
            regisError2: "",
            city: '',
            area: '',
            allDocData: {},
            insuranceArray: {},
            moreone: false,
            profile_id: '',
            selectCountry: [],
            flag_fax: 'DE',
            flag_phone: 'DE',
            flag_mobile: 'DE',
            flag_emergency_number: 'DE',
            mobile: '',
            phone: '',
            fax: '',
            updateIns: -1,
            error3: false,
            succUpdate: false,
            copied: false,
            value: 0,
            qrOpen: false,
            chngPinOpen: false,
            ChangedPIN: false,
            DuplicateAlies: false,
            toSmall: false,
            phonevalidate: false,
            addInsuranceOpen: false,
            editInsuranceOpen: false,
            editInsuData: {},
            insurnanceAdded: false,
            selectedCountry: '',
            q: '',
            filteredCompany: [],
            editIndex: null,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    // On change the Birthday
    onChange = (date) => {
        const state = this.state.UpDataDetails;
        state['birthday'] = date
        this.setState({ UpDataDetails: state })
    }

    componentDidMount() {
        this.getUserData();
    }

    //Save the User profile
    saveUserData = () => {
        const user_token = this.props.stateLoginValueAim.token;
        this.setState({loaderImage: true})
        axios.put(sitedata.data.path + '/UserProfile/Users/update', {
            first_name: this.state.UpDataDetails.first_name,
            last_name: this.state.UpDataDetails.last_name,
        }, commonHeader(user_token)).then((responce) => {
            if (responce.data.hassuccessed) {
                this.setState({ succUpdate: true })
                this.setState({ loaderImage: false });
                setTimeout(() => { this.setState({ succUpdate: false }) }, 5000)
                this.getUserData();
                axios.put('https://api-eu.cometchat.io/v2.0/users/' + this.state.profile_id.toLowerCase(), {
                    name: this.state.UpDataDetails.first_name + ' ' + this.state.UpDataDetails.last_name
                },
                commonCometHeader())
                    .then((res) => {
                        var data = update_CometUser(this.props?.stateLoginValueAim?.user?.profile_id.toLowerCase() , res.data.data)
                     })
            }
            else {
                this.setState({ loaderImage: false });
                if (responce.data.message === 'Phone is not verified') {
                    this.setState({ phonevalidate: true })
                }
                this.setState({ error3: true })
                setTimeout(() => { this.setState({ error3: false }) }, 5000)
            }
        })
    }

    //For getting User Data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, commonHeader(user_token)).then((response) => {
            this.setState({ UpDataDetails: response.data.data});
            this.setState({ loaderImage: false });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    //Update the State
    updateEntryState = (e) => {
        const state = this.state.UpDataDetails;
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
    }

    //For updating gender and country
    EntryValueName = (value, name) => {
        const state = this.state.UpDataDetails;
        state[name] = value;
        this.setState({ UpDataDetails: state });
    }
    
    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;

        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            default :
                translate = translationEN.text
        }
        let { profile_information, this_is_h_admin, save_change, entry, email, recEmp_FirstName, recEmp_LastName, profile_updated} = translate
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        {this.state.loaderImage && <Loader />}
                        <Grid item xs={12} md={12}>

                            <Grid container direction="row">
                                {/* Mobile menu */}
                                <LeftMenuMobile isNotShow={true} currentPage="course_list" />
                                {/* End of mobile menu */}

                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="course_list" />
                                {/* End of Website Menu */}
                                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                                    <Grid className="profilePkg ">
                                        <Grid className="profilePkgIner2">
                                            <Grid className="profileMy">
                                                <Grid className="profileInfo">
                                                    {this.state.succUpdate && <div className="success_message">{profile_updated}</div>}
                                                    <h1>{profile_information}</h1>
                                                    <p>{this_is_h_admin} {profile_information}</p>
                                                </Grid>
                                            </Grid>
                            

                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={8}>
                                                    <Grid className="profileInfo">

                                                        <Grid className="profileInfoIner">
                                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <label>{email}</label>
                                                                    <Grid><input name="email" type="text" onChange={this.updateEntryState} value={this.state.UpDataDetails.email} disabled /></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="profileInfoIner titleDegre">
                                                            <Grid container direction="row" alignItems="center" spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <label>{recEmp_FirstName}</label>
                                                                    <Grid><input type="text" name="first_name" value={this.state.UpDataDetails.first_name} onChange={this.updateEntryState} /></Grid>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <label>{recEmp_LastName}</label>
                                                                    <Grid><input type="text" name="last_name" onChange={this.updateEntryState} value={this.state.UpDataDetails.last_name} /></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid> 
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={4}></Grid>
                                                <Grid className="clear"></Grid>
                                            </Grid>

                            
                                            <Grid className="infoSub">
                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <Grid><input type="submit" onClick={this.saveUserData} value={save_change} /></Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}></Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>      
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim ? state.LoginReducerAim : {};
    const { stateLanguageType } = state.LanguageReducer;
    // const { settings } = state.Settings;
    // const {Doctorsetget} = state.Doctorset;
    // const {catfil} = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));