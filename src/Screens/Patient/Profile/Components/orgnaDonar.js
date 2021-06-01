import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from 'sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Settings } from 'Screens/Login/setting';
import { LoginReducerAim } from 'Screens/Login/actions';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import Select from 'react-select';
import Loader from 'Screens/Components/Loader/index';
import Radio from '@material-ui/core/Radio';
import ReactFlagsSelect from 'react-flags-select';
import { GetShowLabel1 } from 'Screens/Components/GetMetaData/index.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    getLanguage
} from "translations/index"
import { updateBlockchain } from 'Screens/Components/BlockchainEntry/index';
import { commonHeader } from 'component/CommonHeader/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tissue: this.props.tissue,
            loaderImage: false,
            selectedOption: "",
            UpDataDetails: [],
            DonorFamily: [],
            OptionData: {},
            flag_phone: 'DE',
            phone: '',
            include_some: [],
            exclude_some: [],
            PassDone: false,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount() {
        console.log('organdonor')
        this.getUserData();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
            this.Upsaterhesus(this.state.exclude_some, 'exclude_some');
            this.Upsaterhesus(this.state.include_some, 'include_some');
        }
    }
    Upsaterhesus = (optionData, name) => {
        var rhesus = [];
        if (optionData && typeof optionData === 'string') {
            optionData = optionData.split(", ")
            rhesus = optionData && optionData.length > 0 && optionData.map((item) => {
                return GetShowLabel1(this.state.tissue, item, this.props.stateLanguageType, false, 'organ')
            })
        }
        else {
            rhesus = optionData;
        }

        if (name === 'include_some') { this.setState({ include_some: rhesus }) }
        else { this.setState({ exclude_some: rhesus }) }

    }
    // For Select one option 
    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        }, () => {
            // this.saveUserData();
        })
    }

    //For update the mobile number
    updateMOBILE = (str) => {
        if (!str || str === 'undefined' || str === null || str === '') {
            return str;
        }
        else {
            var mob = str && str.split("-")
            return mob.pop()

        }
    }

    //Uodate tghe State of Option Data (Name phone etc)
    updateEntryState = (e) => {
        const state = this.state.OptionData;
        state[e.target.name] = e.target.value;
        this.setState({ OptionData: state });
    }

    //For update the flags 
    updateFlags = (e, name) => {
        const state = this.state.OptionData;
        if (name === 'flag_phone') {
            state['phone'] = e + '-' + this.state.phone;
            this.setState({ flag_phone: e });
        }
        this.setState({ OptionData: state });
    }

    //Update the states
    updateEntryState1 = (e) => {
        const state = this.state.OptionData;
        if (e.target.name === 'phone') {
            state[e.target.name] = this.state.flag_phone + '-' + e.target.value;
            this.setState({ phone: e.target.value });
        }
        this.setState({ OptionData: state });
    }

    //Save the User Data of Orgen Donor
    saveUserData = () => {
        this.setState({ loaderImage: true });
        var OptionData
        if (this.state.selectedOption == 'exclude_some') {
            OptionData = this.state.OptionData.exclude_some
        }
        if (this.state.selectedOption == 'include_some') {
            OptionData = this.state.OptionData.include_some
        }
        if (this.state.selectedOption == 'decided_by_following') {
            OptionData = {
                first_name: this.state.OptionData.first_name,
                last_name: this.state.OptionData.last_name,
                phone: this.state.OptionData.phone,
                city: this.state.OptionData.city,
                address: this.state.OptionData.address,
                postal_code: this.state.OptionData.postal_code,
            }
        }
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/organDonor', {
            selectedOption: this.state.selectedOption,
            OptionData: OptionData,
            free_remarks: this.state.OptionData.free_remarks,
        }, commonHeader(user_token))
            .then((responce) => {
                this.getUserData();
                if (this.props.comesFrom) {
                    this.props.EditOrganDonar();
                }
                this.setState({ PassDone: true, loaderImage: false })
                setTimeout(() => { this.setState({ PassDone: false }) }, 5000)

            })
    }

    //For change the Organ / Tissue
    handleChange_multi = (event, name) => {
        const state = this.state.OptionData;
        if (name === 'include_some') { this.setState({ include_some: event }) }
        else { this.setState({ exclude_some: event }) }
        state[name] = event && (Array.prototype.map.call(event, s => s.value).toString()).split(/[,]+/).join(',  ');
        this.setState({ OptionData: state })
    };

    //Get all the information of the current User
    getUserData = () => {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
            commonHeader(user_token)).then((response) => {
                this.setState({ loaderImage: false });
                if (response) {
                    updateBlockchain(this.props.stateLoginValueAim.user, [], response.data.data.organ_donor[0], 'organ_data')
                    if (response.data.data.organ_donor[0].selectedOption) {
                        this.setState({ selectedOption: response.data.data.organ_donor[0].selectedOption })
                    }
                    if (response.data.data.organ_donor[0].free_remarks) {
                        this.setState({ OptionData: { free_remarks: response.data.data.organ_donor[0].free_remarks } })
                    }
                    if (response.data.data.organ_donor[0].selectedOption == "yes_to_all" && response.data.data.organ_donor[0].OptionData) {
                        this.setState({ OptionData: { yes_to_all: response.data.data.organ_donor[0].OptionData } },
                            () => {
                                if (response.data.data.organ_donor[0].free_remarks) {
                                    var state = this.state.OptionData;
                                    state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                    this.setState({ OptionData: state })
                                }
                            })
                    }
                    if (response.data.data.organ_donor[0].selectedOption == "exclude_some" && response.data.data.organ_donor[0].OptionData) {
                        let title, titlefromD = response.data.data.organ_donor[0].OptionData, titles = [];
                        if (titlefromD && titlefromD !== "") {
                            title = response.data.data.organ_donor[0].OptionData.split(", ");
                        }
                        else {
                            title = [];
                        }
                        this.Upsaterhesus(response.data.data.organ_donor[0].OptionData, 'exclude_some')
                        // title.map((item) => {
                        //     titles.push({ value: item, label: item });
                        // })
                        this.setState({ OptionData: { exclude_some: response.data.data.organ_donor[0].OptionData } },
                            () => {
                                if (response.data.data.organ_donor[0].free_remarks) {
                                    var state = this.state.OptionData;
                                    state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                    this.setState({ OptionData: state })
                                }
                            })
                    }
                    if (response.data.data.organ_donor[0].selectedOption == "include_some" && response.data.data.organ_donor[0].OptionData) {
                        let title1, titlefromD1 = response.data.data.organ_donor[0].OptionData, titles1 = [];
                        if (titlefromD1 && titlefromD1 !== "") {
                            title1 = response.data.data.organ_donor[0].OptionData.split(", ");
                        }
                        else {
                            title1 = [];
                        }
                        this.Upsaterhesus(response.data.data.organ_donor[0].OptionData, 'include_some')
                        // title1.map((item) => {
                        //     titles1.push({ value: item, label: item });
                        // })
                        this.setState({ OptionData: { include_some: response.data.data.organ_donor[0].OptionData } },
                            () => {
                                if (response.data.data.organ_donor[0].free_remarks) {
                                    var state = this.state.OptionData;
                                    state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                    this.setState({ OptionData: state })
                                }
                            })
                    }
                    if (response.data.data.organ_donor[0].selectedOption == "decided_by_following" && response.data.data.organ_donor[0].OptionData) {
                        let pho = response.data.data.organ_donor[0].OptionData.phone.split("-");
                        if (pho && pho.length > 0) {
                            this.setState({ flag_phone: pho[0] })
                        }
                        this.setState({ OptionData: response.data.data.organ_donor[0].OptionData },
                            () => {
                                if (response.data.data.organ_donor[0].free_remarks) {
                                    var state = this.state.OptionData;
                                    state['free_remarks'] = response.data.data.organ_donor[0].free_remarks
                                    this.setState({ OptionData: state })
                                }
                            })
                    }
                }
            }).catch((error) => {
                this.setState({ loaderImage: false });
            });
    }

    // fOR update the flag of mobile
    updateFLAG = (str) => {
        var mob = str && str.split("-")
        if (mob && mob.length > 0) {
            if (mob[0] && mob[0].length == 2) {
                return mob[0]
            }
            else { return 'DE' }
        }
    }

    render() {

        let translate = getLanguage(this.props.stateLanguageType)
        let { free_text, format_updated, YesIherewithagreewitha, followingorgantissues, profile, information, ID, pin, QR_code, done, Change, edit_id_pin, edit, and, is, changed, profile_id_taken, profile_id_greater_then_5,
            save_change, email, title, degree, first, last, name, dob, gender, street, add, city, postal_code, country, home_telephone, phone, country_code, Delete,
            mobile_number, number, mobile, Languages, spoken, insurance, allowthisonlyforfollowing, yes_shall_not_decided_by_person, company, of, organ_transplant_declaration, blockchain_secure_organ_donar_Pass,
            easily_select_donar, organ_tissue, dont_allow_transplantation } = translate;

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid>
                    {this.state.PassDone && <div className="success_message">{format_updated}</div>}
                    <Grid className="secureChain">
                        <h4>{blockchain_secure_organ_donar_Pass}</h4>
                        <p>{easily_select_donar}</p>
                    </Grid>

                    <Grid className="organDeclare">
                        <h5>{organ_transplant_declaration}</h5>
                        <Grid><FormControlLabel value="yes_to_all" name="my_choice" checked={this.state.selectedOption === 'yes_to_all'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label={YesIherewithagreewitha} /></Grid>
                        <Grid><FormControlLabel value="exclude_some" name="my_choice" checked={this.state.selectedOption === 'exclude_some'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label={followingorgantissues} /></Grid>
                        <Grid item xs={12} md={5} className="donarLang">
                            <label>{organ_tissue}</label>
                            <Grid>
                                <Select
                                    name="exclude_some"
                                    value={this.state.exclude_some}
                                    onChange={(e) => this.handleChange_multi(e, 'exclude_some')}
                                    options={this.state.tissue}
                                    placeholder=""
                                    isSearchable={true}
                                    className=""
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                />
                            </Grid>
                        </Grid>
                        <Grid><FormControlLabel value="yes" value="include_some" name="my_choice" checked={this.state.selectedOption === 'include_some'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label={allowthisonlyforfollowing} /></Grid>
                        <Grid item xs={12} md={5} className="donarLang">
                            <label>{organ_tissue}</label>
                            <Grid>
                                <Select
                                    name="include_some"
                                    value={this.state.include_some}
                                    onChange={(e) => this.handleChange_multi(e, 'include_some')}
                                    options={this.state.tissue}
                                    placeholder=""
                                    isSearchable={true}
                                    className=""
                                    isMulti={true}
                                    closeMenuOnSelect={false}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="organDecide">
                        <Grid><FormControlLabel value="yes" value="not_allowed" name="my_choice" checked={this.state.selectedOption === 'not_allowed'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label={dont_allow_transplantation} /></Grid>
                        <Grid><FormControlLabel value="yes" value="decided_by_following" color="primary" name="my_choice" checked={this.state.selectedOption === 'decided_by_following'} onChange={this.handleOptionChange.bind(this)} control={<Radio />} label={yes_shall_not_decided_by_person} /></Grid>
                    </Grid>

                    <Grid>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                        <Grid>
                                            <Grid><label>{first} {name}</label></Grid>
                                            <Grid><input type="text" name="first_name" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.first_name} /></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 6}>
                                        <Grid>
                                            <Grid><label>{last} {name}</label></Grid>
                                            <Grid><input type="text" name="last_name" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.last_name} /></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid>
                                            <Grid><label>{street} {add} </label></Grid>
                                            <Grid><input type="text" name="address" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.address} /></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 7}>
                                        <Grid>
                                            <Grid><label>{city}</label></Grid>
                                            <Grid><input type="text" name="city" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.city} /></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={this.props.comesFrom ? 12 : 5}>
                                        <Grid>
                                            <Grid><label>{postal_code}</label></Grid>
                                            <Grid><input type="text" name="postal_code" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.postal_code} /></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid className="OrganMobile">
                                            <Grid><label>{mobile_number}</label></Grid>
                                            <Grid>
                                                {this.updateFLAG(this.state.OptionData.phone) && this.updateFLAG(this.state.OptionData.phone) !== '' &&
                                                    <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { this.updateFlags(e, 'flag_phone') }} name="flag_phone" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.OptionData.phone)} />}
                                                <input type="text"
                                                    className="Mobile_extra"
                                                    placeholder={phone}
                                                    name="phone"
                                                    onChange={this.updateEntryState1}
                                                    value={this.state.OptionData.phone && this.updateMOBILE(this.state.OptionData.phone)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarForm">
                                    <Grid item xs={12} md={12}>
                                        <Grid>
                                            <Grid><label>{free_text}</label></Grid>
                                            <input type="text" name="free_remarks" onChange={this.updateEntryState} value={this.state.OptionData && this.state.OptionData.free_remarks} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="donarFormSubmit">
                                    <Grid item xs={12} md={12}>
                                        <Grid><input type="submit" onClick={this.saveUserData} value={save_change} /></Grid>
                                    </Grid>
                                </Grid>
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