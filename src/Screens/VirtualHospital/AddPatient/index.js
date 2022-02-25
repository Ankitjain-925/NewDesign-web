/*global google*/
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Toggle from "react-toggle";
import Select from 'react-select';
import ReactFlagsSelect from 'react-flags-select';
import sitedata from 'sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { OptionList } from "Screens/Login/metadataaction";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import npmCountryList from 'react-select-country-list'
import { Table } from 'reactstrap';
import * as AustraliaC from 'Screens/Components/insuranceCompanies/australia.json';
import * as AustriaC from 'Screens/Components/insuranceCompanies/austria.json';
import * as NetherlandC from 'Screens/Components/insuranceCompanies/dutch.json';
import * as GermanC from 'Screens/Components/insuranceCompanies/german.json';
import * as PhillipinesC from 'Screens/Components/insuranceCompanies/phillippines.json';
import * as SwitzerlandC from 'Screens/Components/insuranceCompanies/switzerland.json';
import * as AmericaC from 'Screens/Components/insuranceCompanies/us.json';
import * as ThailandC from 'Screens/Components/insuranceCompanies/thailand.json';
import { LanguageFetchReducer } from 'Screens/actions';
import Autocomplete from 'Screens/Components/Autocomplete/index';
import Modal from '@material-ui/core/Modal';
import Loader from 'Screens/Components/Loader/index';
import contry from "Screens/Components/countryBucket/countries.json";
import SPECIALITY from 'speciality';
import ReCAPTCHA from "react-google-recaptcha";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import { GetLanguageDropdown, GetShowLabel1, GetShowLabel } from 'Screens/Components/GetMetaData/index.js';
import DateFormat from 'Screens/Components/DateFormat/index'
import { getLanguage } from "translations/index"
import _ from "lodash";
import { commonHeader, commonCometHeader } from 'component/CommonHeader/index';
import { Redirect, Route } from "react-router-dom";
var datas = [];

var letter = /([a-zA-Z])+([ -~])*/,
    number23 = /\d+/,
    specialchar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
class Index extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.city = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.filterList = this.filterList.bind(this)
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
            UpDataDetails: [],
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
            UpDataDetails: {},
            speciality_multi: [],
            insurance_count: 1,
            insuranceDetails: {},
            insurancefull: [],
            UpDataDetailsdicard: [],
            speciality_multidiscard: [],
            name_multidiscard: [],
            passwordDetails: [],
            loaderImage: false,
            regisError: '',
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
            emergency_number: '',
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
            selectedCountry: {},
            q: '',
            filteredCompany: [],
            editIndex: null,
            bloodgroup: [],
            rhesusgroup: [],
            bloods: {},
            rhesus: {},
            insu1: false,
            contact_partner: {},
            hidden: true,
            recaptcha: false,
            getIDPIN: false,
            idpin: {},
            newemail: false

        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    SetMode = (e) => {
        var mode = this.state.newemail === false ? true : false;
        this.setState({ newemail: mode })
    }

    ScrolltoTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }
    //on recaptcha click
    onChangeRec = (value) => {
        this.setState({ recaptcha: value });
    };
    // On change the Birthday
    onChange = (date) => {
        const state = this.state.UpDataDetails;
        state['birthday'] = date
        this.setState({ UpDataDetails: state })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
            this.GetLanguageMetadata();
        }
    }
    handlePinClose = (key) => {
        this.setState({ [key]: false });
    };

    openIdPin = () => {
        this.setState({ getIDPIN: true })
    }

    componentDidMount() {
        this.getMetadata();
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry, insuranceDetails: { insurance: '', insurance_number: '', insurance_type: '' } })
        /*---location---*/
        this.city = new google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            { types: ["geocode"] }
        );
        this.city.addListener("place_changed", this.handlePlaceChanged);
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
    updateEntryState11 = (e) => {
        const state = this.state.contact_partner;
        state['number'] = this.state.flag_emergency_number + '-' + e.target.value;
        this.setState({ emergency_number: e.target.value });
        this.setState({ contact_partner: state });
    }
    //Update the states
    updateEntryState1 = (e) => {
        const state = this.state.UpDataDetails;
        if (e.target.name === 'mobile') {
            state[e.target.name] = this.state.flag_mobile + '-' + e.target.value;
            this.setState({ mobile: e.target.value });
        }
        if (e.target.name === 'fax') {
            state[e.target.name] = this.state.flag_fax + '-' + e.target.value;
            this.setState({ fax: e.target.value });
        }
        if (e.target.name === 'phone') {
            state[e.target.name] = this.state.flag_phone + '-' + e.target.value;
            this.setState({ phone: e.target.value });
        }
        if (e.target.name === 'emergency_number') {
            state[e.target.name] = this.state.flag_emergency_number + '-' + e.target.value;
            this.setState({ emergency_number: e.target.value });
        }
        this.setState({ UpDataDetails: state });
    }

    //For change the title of user
    onSelectDegree(event) {
        this.setState({ title: event });
        const state = this.state.UpDataDetails;
        state["title"] = event.label
        this.setState({ UpDataDetails: state });
    }

    //For change the title of user
    onSelectBlood(event) {
        this.setState({ bloods: event });
        const state = this.state.UpDataDetails;
        state["blood_group"] = event.label
        this.setState({ UpDataDetails: state });
    }

    //For change the title of user
    onSelectRshesus(event) {
        this.setState({ rhesus: event });
        const state = this.state.UpDataDetails;
        state["rhesus"] = event.value
        this.setState({ UpDataDetails: state });
    }
    //For update the flags 
    updateFlags = (e, name) => {
        const state = this.state.UpDataDetails;
        if (name === 'flag_mobile') {
            state['mobile'] = e + '-' + this.state.mobile;
            this.setState({ flag_mobile: e });
        }
        if (name === 'flag_fax') {
            state['fax'] = e + '-' + this.state.fax;
            this.setState({ flag_fax: e });
        }

        if (name === 'flag_phone') {
            state['phone'] = e + '-' + this.state.phone;
            this.setState({ flag_phone: e });
        }
        if (name === 'flag_emergency_number') {

            const state = this.state.contact_partner;
            state['number'] = e + '-' + this.state.emergency_number;
            this.setState({ flag_emergency_number: e });
            this.setState({ contact_partner: state });
            // state['emergency_number'] = e + '-' + this.state.phone;
        }
        this.setState({ UpDataDetails: state });
    }

    //For chnaging the Place of city.
    handlePlaceChanged() {
        const place = this.city.getPlace();
        this.setState({ city: place.formatted_address })
        this.setState({
            area: {
                type: "Point",
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
            }
        })
    }

    //For getting the dropdowns from the database
    getMetadata() {
        this.setState({ allMetadata: this.props.metadata },
            () => {
                this.GetLanguageMetadata();
            })
    }

    GetLanguageMetadata = () => {
        var Allgender = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.gender && this.state.allMetadata.gender.length > 0 && this.state.allMetadata.gender, this.props.stateLanguageType)
        var rhesusgroup = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.rhesus && this.state.allMetadata.rhesus.length > 0 && this.state.allMetadata.rhesus, this.props.stateLanguageType)
        let AllMaritalOption = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.maritalStatus && this.state.allMetadata.maritalStatus.length > 0 && this.state.allMetadata.maritalStatus, this.props.stateLanguageType)
        this.setState({
            AllMaritalOption: AllMaritalOption,
            genderdata: Allgender,
            languageData: this.state.allMetadata && this.state.allMetadata.languages && this.state.allMetadata.languages.length > 0 && this.state.allMetadata.languages,
            specialityData: GetLanguageDropdown(SPECIALITY.speciality.english, this.props.stateLanguageType),
            title_degreeData: this.state.allMetadata && this.state.allMetadata.title_degreeData && this.state.allMetadata.title_degreeData.length > 0 && this.state.allMetadata.title_degreeData,
            bloodgroup: this.state.allMetadata && this.state.allMetadata.bloodgroup && this.state.allMetadata.bloodgroup.length > 0 && this.state.allMetadata.bloodgroup,
            rhesusgroup: rhesusgroup,
            handleMaritalStatus: AllMaritalOption
        });
    }

    //For change the language and the Speciality
    handleChange_multi = (event, name) => {
        const state = this.state.UpDataDetails;
        if (name == "languages") {
            this.setState({ name_multi: event });
            state['language'] = event && (Array.prototype.map.call(event, s => s.value))
        }
        if (name == "speciality") {
            this.setState({ speciality_multi: event });
        }
        this.setState({ UpDataDetails: state })
    };

    //For update the state of the Profile
    handleChange1 = (e) => {
        const state = this.state.UpDataDetails
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
    }

    //For checkbox to offer things
    handleweoffer = (e) => {
        const state = this.state.weoffer
        state[e.target.name] = e.target.value;
        this.setState({ weoffer: state });
    }

    //Save the User profile
    saveUserData1 = () => {
        if (this.state.insuranceDetails.insurance !== "" && this.state.insuranceDetails.insurance_country !== "") {
            if (datas.some(data => data.insurance === this.state.insuranceDetails.insurance)) {
                this.handlePinClose("editInsuranceOpen");
            }
            else {
                datas.push(this.state.insuranceDetails)
                this.setState({
                    insurance_count: this.state.insurance_count + 1, insurancefull: datas,
                    insuranceDetails: { insurance: '', insurance_type: '', insurance_number: '' }
                })
            }
            const user_token = this.props.stateLoginValueAim.token;
            this.setState({ insu1: false })
            this.handlePinClose("addInsuranceOpen");
        }
        else {
            this.setState({ insu1: true })
        }
    }
    //For validate the email is correct or not
    validateEmail = (elementValue) => {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    };
    //Save the User profile
    saveUserData = () => {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            plz_fill_mob_number,
            pswd_not_valid,
            email_not_valid,
            plz_fill_fullname_user,
            Plz_fill_the_recaptcha
        } = translate;

        const { UpDataDetails } = this.state;
        this.setState({ regisError: null });
        if (
            UpDataDetails.first_name &&
            UpDataDetails.last_name &&
            UpDataDetails.first_name !== "" &&
            UpDataDetails.last_name !== ""
        ) {
            if (this.validateEmail(UpDataDetails.email)) {
                if (
                    UpDataDetails &&
                    UpDataDetails.password &&
                    UpDataDetails.password.match(letter) &&
                    UpDataDetails.password.match(number23) &&
                    UpDataDetails.password.match(specialchar)
                ) {
                    // if (UpDataDetails.mobile && UpDataDetails.mobile !== "") {
                        if (UpDataDetails?.mobile?.split('-')?.[0]) {
                            var country_code = UpDataDetails?.mobile?.split('-')?.[0].toLowerCase();
                        } else {
                            var country_code = "de";
                        }
                        if (this.state.recaptcha) {

                            var getBucket = contry?.length > 0 && contry.filter((value, key) => value.code === country_code.toUpperCase());
                            var savedata = _.cloneDeep(this.state.UpDataDetails);
                            var parent_id = this.props.stateLoginValueAim?.user?.parent_id ? this.props.stateLoginValueAim?.user?.parent_id : '0';
                            savedata.type = 'patient';
                            savedata.country_code = country_code;
                            savedata.mobile = UpDataDetails?.mobile?.split('-')?.[1];
                            savedata.lan = this.props.stateLanguageType;
                            savedata.parent_id = parent_id;
                            savedata.insurance = datas;
                            if (this.state.city) {
                                savedata.area = this.state.area;
                                savedata.city = this.state.city;
                            }
                            savedata.institute_id = this.props.stateLoginValueAim?.user?.institute_id.length > 0 ? this.props.stateLoginValueAim?.user?.institute_id[0] : '';
                            savedata.institute_name = this.props.stateLoginValueAim?.user?.institute_name;
                            savedata.parent_id = this.props.stateLoginValueAim?.user?._id;
                            savedata.emergency_contact_name = this.state.contact_partner.name;
                            savedata.emergency_relation = this.state.contact_partner.relation;
                            savedata.emergency_email = this.state.contact_partner.email;
                            savedata.emergency_number = this.state.contact_partner.number;
                            savedata.bucket = getBucket[0].bucket;
                            savedata.token = this.state.recaptcha;
                            // axios
                            //     .post(sitedata.data.path + "/UserProfile/AddNewUseradiitional/", savedata)
                            //     .then((responce) => {
                                    this.setState({ loaderImage: false });
                                    // if (responce.data.hassuccessed === true) {
                                        // this.setState({
                                        //     idpin: { profile_id: responce.data?.data?.profile_id, pin: responce.data?.data?.pin }, contact_partner: {},
                                        //     UpDataDetails: {}, first_name: '', last_name: '', bloods: {}, rhesus: {}, speciality_multi: [], name_multi: [], area: '', city: '', recaptcha: false
                                        // })
                                        // this.captcha.reset();
                                        // datas = [];
                                        // this.openIdPin();
                                        // axios
                                        //     .post(
                                        //         "https://api-eu.cometchat.io/v2.0/users",
                                        //         {
                                        //             uid: responce.data.data.profile_id,
                                        //             name:
                                        //                 UpDataDetails.first_name + " " + UpDataDetails.last_name,
                                        //         },
                                        //         commonCometHeader()
                                        //     )
                                        //     .then((res) => { });
                                            console.log('savedata', savedata)
                                            if(this.state.newemail && !savedata.mobile){
                                                this.props.history.push({
                                                    pathname: '/virtualHospital/print_approval',
                                                    state: { data: savedata, needUpload: false }
                                                })
                                            }
                                            else{
                                                this.props.history.push({
                                                    pathname: '/virtualHospital/approved_add',
                                                    state: { data: savedata, needUpload: false }
                                                })
                                            }
                                    // } else if (responce.data.message === "Phone is not verified") {
                                    //     this.ScrolltoTop();
                                    //     this.setState({
                                    //         successfull: false,
                                    //         Mnotvalid: true,
                                    //         alreadyerror: false,
                                    //     });
                                    // } else {
                                    //     this.ScrolltoTop();
                                    //     this.setState({
                                    //         successfull: false,
                                    //         alreadyerror: true,
                                    //         Mnotvalid: false,
                                    //     });
                                    // }
                                // })
                                // .catch((err) => { });
                        }
                        else {
                            this.setState({ regisError: Plz_fill_the_recaptcha });
                            this.ScrolltoTop();
                        }
                        // }else {
                        //     this.setState({ regisError: "Please fill the city "});
                        // }
                    // } else {
                    //     this.setState({ regisError: plz_fill_mob_number });
                    //     this.ScrolltoTop();
                    // }
                } else {
                    this.setState({ regisError: pswd_not_valid });
                    this.ScrolltoTop();
                }
            } else {
                this.setState({ regisError: email_not_valid });
                this.ScrolltoTop();
            }
        } else {
            this.setState({ regisError: plz_fill_fullname_user });
            this.ScrolltoTop();
        }

    }

    //For open the Insurance Edit popup
    editKYCopen(event, i) {
        this.setState({ editInsuranceOpen: true, insuranceDetails: event, editIndex: i })
    }


    //For update the insurance country
    updatesinsurancesCountry(keys, e) {
        datas[keys].insurance_country = e.value;
        this.setState({ insurancefull: datas })
    }

    //Update Insurance
    updatesinsurances = (keys, e) => {
        if (e.target.name === 'insurance') {
            datas[keys].insurance = e.target.value;
            const q = e.target.value.toLowerCase();
            this.setState({ q }, () => this.filterList(datas[keys].insurance_country));
            this.setState({ updateIns: keys })
        }
        if (e.target.name === 'insurance_number') {
            datas[keys].insurance_number = e.target.value;
        }
        this.setState({ insurancefull: datas })
    }

    //For removing the insurance 
    removeInsurance = (keys, e) => {
        datas.splice(keys, 1);
        this.setState({ insurancefull: datas })
    }

    Upsaterhesus = (rhesusfromD) => {
        var rhesus = GetShowLabel1(this.state.rhesusgroup, rhesusfromD, this.props.stateLanguageType, false, "rhesus")
        this.setState({ rhesus: rhesus })
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

    //Calling when city is updated
    updateEntryCity = (place) => {
        this.setState({ city: place.formatted_address })
        this.setState({
            area: {
                type: "Point",
                coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
            }
        })
        const state = this.state.UpDataDetails;
        state["city"] = place.formatted_address;
        this.setState({ UpDataDetails: state });
    }

    // For update full insurance
    updateInsurancee = (e) => {
        if (e.target.name === "insurance") {
            const q = e.target.value.toLowerCase();
            this.setState({ q }, () => this.filterList(this.state.insuranceDetails.insurance_country));
            this.setState({ updateIns: -2 })
        }
        const state = this.state.insuranceDetails;
        state[e.target.name] = e.target.value;
        this.setState({ insuranceDetails: state });
    }


    // For Add more insurance model
    handleAddInsurance = () => {
        this.setState({ addInsuranceOpen: true });
    }

    //To add Insurance
    insuranceForm = (e) => {
        const state = this.state.insuranceDetails;
        if (e.target.name == 'insurance') {
            const q = e.target.value.toLowerCase();
            this.setState({ q }, () => this.filterList(this.state.insuranceDetails.insurance_country));
        }
        state[e.target.name] = e.target.value;
        this.setState({ insuranceDetails: state });
    }

    //Update contact State
    contact_partnerState = (e) => {
        let state = this.state.contact_partner;
        state[e.target.name] = e.target.value;
        this.setState({ contact_partner: state })
    }

    selectCountry = (event) => {
        const state = this.state.insuranceDetails;
        state['insurance_country'] = event.value;
        this.setState({ insuranceDetails: state });
        this.setState({ selectedCountry: event })
    }

    //For insurance Countries getting the list
    filterList(data) {
        let iCompany;
        switch (data) {
            case "AU":
                iCompany = AustraliaC.australia
                break;
            case "AT":
                iCompany = AustriaC.austria
                break;
            case "US":
                iCompany = AmericaC.us
                break;
            case "NL":
                iCompany = NetherlandC.dutch
                break;
            case "DE":
                iCompany = GermanC.german
                break;
            case "PH":
                iCompany = PhillipinesC.phillippines
                break;
            case "CH":
                iCompany = SwitzerlandC.switzerland
                break;
            case "TH":
                iCompany = ThailandC.thailand
                break;
        }
        let q = this.state.q;
        iCompany = iCompany && iCompany.length > 0 && iCompany.filter(function (company) {
            const companyLower = company.toLowerCase()
            return companyLower.indexOf(q) != -1;
        })
        this.setState({ filteredCompany: iCompany });
        if (this.state.q == '') {
            this.setState({ filteredCompany: [] });
        }
    }

    toggle = (event) => {
        const state = this.state.insuranceDetails;
        state['insurance'] = event;
        this.setState({ insuranceDetails: state });
        if (this.state.active === event) {
            this.setState({ active: null })
        } else {
            this.setState({ active: event })
        }
    }

    //For show or hide the Password
    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    };
    //For filter the country for add insuance
    filterCountry = (i) => {
        let countryList = this.state.selectCountry
        let name
        name = countryList.filter(value => {
            if (value.value == i) {
                return value.label
            }
        })
        return name[0].label
    }

    //For filter the country for add insuances
    filterCountry1 = (i) => {
        let countryList = this.state.selectCountry
        let name
        name = countryList.filter(value => {
            if (value.value == i) {
                return value.label
            }
        })
        return name[0]
    }

    handleMaritalStatus = (e) => {
        const state = this.state.UpDataDetails;
        state["marital_status"] = e
        this.setState({ UpDataDetails: state })
    }

    render() {
        const { stateLoginValueAim, House } = this.props;
        const { value, editInsuData, insurancefull, editIndex, insuranceDetails } = this.state;
        const companyList = this.state.filteredCompany && this.state.filteredCompany.map(company => {
            return (
                <li className="list-group-item" value={company}
                    onClick={() => { this.setState({ q: company }); this.toggle(company); this.setState({ filteredCompany: [] }) }}
                >{company}</li>
            )
        });

        let translate = getLanguage(this.props.stateLanguageType)
        let { Citizenship, created_user_id_and_pin, Register_characters, Register_Passwordshould, Register_letter, Register_number, Register_special, Register_Password,
            Mnotvalids, EmailExists, Contact, Register_Name, relation, phone, select_marital_status, organ_donar_status, not_an_organ, emergency, telephone_nmbr, marital_status,
            Rhesus, InsurancecompanyError, Addcompany, Blood, BacktoPatientFlow, profile, information, ID, pin, QR_code, done, Change, edit_id_pin, edit, and, is, changed, profile_id_taken, profile_id_greater_then_5,
            save_change, email, title, degree, first, last, name, dob, gender, street, add, city, postal_code, country, home_telephone, country_code, Delete, male, female, other,
            mobile_number, number, mobile, Languages, spoken, AliesID, Pin, pin_greater_then_4, insurance, add_more, company, of, info_copied, profile_updated, profile_not_updated, mobile_number_not_valid, insurance_added } = translate;

        if (
            stateLoginValueAim.user === "undefined" ||
            stateLoginValueAim.token === 450 ||
            stateLoginValueAim.token === "undefined" ||
            stateLoginValueAim.user.type !== "adminstaff"
        ) {
            return <Redirect to={"/"} />;
        }
        if (House && House?.value === null) {
            return <Redirect to={"/VirtualHospital/institutes"} />;
        }
        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "homeBg darkTheme homeBgDrk"
                        : "homeBg"
                }
            >
                <Grid className="homeBgIner">
                    {this.state.loaderImage && <Loader />}
                    <Grid container direction="row">
                        <Grid item xs={12} md={12} >
                            {/* Mobile menu */}
                            <LeftMenuMobile isNotShow={true} currentPage="more" />
                            <Grid container direction="row" >
                                {/* Start of Menu */}
                                <Grid item xs={12} md={1} className="MenuLeftUpr">
                                    <LeftMenu isNotShow={true} currentPage="more" />
                                </Grid>
                                {/* Website Mid Content */}
                                <Grid item xs={12} md={10} lg={8}>
                                    <Grid className="backFlow backFlow1" onClick={() => { this.props.history.push('/virtualHospital/patient-flow') }}>
                                        <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />{BacktoPatientFlow}</a>
                                    </Grid>
                                    <Grid className="profilePkg ">
                                        <Grid className="profilePkgIner2">
                                            <div>
                                                {this.state.loaderImage && <Loader />}
                                                <Grid className="profileMy">
                                                    <Grid className="profileInfo">
                                                        {this.state.succUpdate && <div className="success_message">{profile_updated}</div>}
                                                        {this.state.phonevalidate && <div className="err_message">{mobile_number_not_valid}</div>}

                                                        <h1>{"Create new User"}</h1>
                                                    </Grid>
                                                </Grid>
                                                <Modal
                                                    open={this.state.getIDPIN}
                                                    onClose={() => this.handlePinClose("getIDPIN")}
                                                    className={this.props.settings &&
                                                        this.props.settings.setting &&
                                                        this.props.settings.setting.mode === 'dark' ? "darkTheme editBoxModel" : "editBoxModel"}>
                                                    <Grid className="editBoxCntnt">
                                                        <Grid className="editCourse">
                                                            <Grid className="editCloseBtn">
                                                                <a onClick={() => this.handlePinClose("getIDPIN")}>
                                                                    <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                                </a>
                                                            </Grid>
                                                            <Grid><label>{created_user_id_and_pin}</label></Grid>
                                                        </Grid>
                                                        <Grid className="editPinform">
                                                            <Grid className="editField">
                                                                <h5>{AliesID} {this.state.idpin?.profile_id}</h5>
                                                                <h5>{Pin}{this.state.idpin?.pin}</h5>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Modal>
                                                <Grid container direction="row" alignItems="center">
                                                    <Grid item xs={12} md={8}>
                                                        <div className="err_message">
                                                            {this.state.regisError}
                                                            {this.state.Mnotvalid && Mnotvalids}
                                                            {this.state.alreadyerror && EmailExists}
                                                        </div>
                                                        <Grid className="profileInfo">
                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={10} md={10}>
                                                                        <label>{email}</label>
                                                                        <Grid><input name="email" type="text" onChange={this.updateEntryState} value={this.state.UpDataDetails.email || ''} /></Grid>

                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={2} md={2}
                                                                    >
                                                                        <label>{"Patient do not have email, first created by hospital"}</label>
                                                                        <Toggle
                                                                            className="switchBtn"
                                                                            icons={false}
                                                                            checked={this.state.newemail}
                                                                            // name="email"
                                                                            onChange={(e) => this.SetMode(e)}
                                                                        />

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="registerRow passInstMain rlativeDiv">
                                                                <Grid>
                                                                    <label>{Register_Password}</label>
                                                                </Grid>
                                                                <Grid className="registerPass">
                                                                    <input
                                                                        type={this.state.hidden ? "password" : "text"}
                                                                        name="password"
                                                                        onChange={this.handleChange1}
                                                                        value={this.state.UpDataDetails.password || ''}
                                                                    />
                                                                    {this.state.hidden && (
                                                                        <a onClick={this.toggleShow}>
                                                                            <img
                                                                                src={require("assets/images/showeye.svg")}
                                                                                alt=""
                                                                                title=""
                                                                            />
                                                                        </a>
                                                                    )}
                                                                    {!this.state.hidden && (
                                                                        <a onClick={this.toggleShow}>
                                                                            <img
                                                                                src={require("assets/images/hide.svg")}
                                                                                alt=""
                                                                                title=""
                                                                            />
                                                                        </a>
                                                                    )}
                                                                </Grid>

                                                                {this.state.UpDataDetails && this.state.UpDataDetails.password ? (
                                                                    <div className="passInst">
                                                                        <div className="passInstIner">
                                                                            <p>{Register_Passwordshould}</p>
                                                                            {/* <img src={require('assets/images/passArrow.png')} alt="" title="" className="passArow" /> */}
                                                                            <ul>
                                                                                <li>
                                                                                    {this.state.UpDataDetails?.password?.length > 8 && (
                                                                                        <a>
                                                                                            <img
                                                                                                src={require("assets/images/CheckCircle.svg")}
                                                                                                alt=""
                                                                                                title=""
                                                                                            />
                                                                                            {Register_characters}
                                                                                        </a>
                                                                                    )}
                                                                                    {this.state.UpDataDetails?.password?.length <= 8 && (
                                                                                        <a>
                                                                                            <img
                                                                                                src={require("assets/images/CloseCircle.svg")}
                                                                                                alt=""
                                                                                                title=""
                                                                                            />
                                                                                            {Register_characters}
                                                                                        </a>
                                                                                    )}
                                                                                </li>
                                                                                <li>
                                                                                    {this.state.UpDataDetails?.password && !this.state.UpDataDetails?.password.match(
                                                                                        letter
                                                                                    ) && (
                                                                                            <a>
                                                                                                <img
                                                                                                    src={require("assets/images/CloseCircle.svg")}
                                                                                                    alt=""
                                                                                                    title=""
                                                                                                />
                                                                                                {Register_letter}
                                                                                            </a>
                                                                                        )}
                                                                                    {this.state.UpDataDetails?.password && this.state.UpDataDetails?.password.match(
                                                                                        letter
                                                                                    ) && (
                                                                                            <a>
                                                                                                <img
                                                                                                    src={require("assets/images/CheckCircle.svg")}
                                                                                                    alt=""
                                                                                                    title=""
                                                                                                />
                                                                                                {Register_letter}
                                                                                            </a>
                                                                                        )}
                                                                                </li>
                                                                                <li>

                                                                                    {this.state.UpDataDetails?.password && !this.state.UpDataDetails?.password.match(number23) && (
                                                                                        <a>
                                                                                            <img
                                                                                                src={require("assets/images/CloseCircle.svg")}
                                                                                                alt=""
                                                                                                title=""
                                                                                            />
                                                                                            {Register_number}
                                                                                        </a>
                                                                                    )}
                                                                                    {this.state.UpDataDetails?.password && this.state.UpDataDetails?.password.match(number23) && (
                                                                                        <a>
                                                                                            <img
                                                                                                src={require("assets/images/CheckCircle.svg")}
                                                                                                alt=""
                                                                                                title=""
                                                                                            />
                                                                                            {Register_number}
                                                                                        </a>
                                                                                    )}
                                                                                </li>
                                                                                <li>
                                                                                    {this.state.UpDataDetails?.password && !this.state.UpDataDetails?.password.match(
                                                                                        specialchar
                                                                                    ) && (
                                                                                            <a>
                                                                                                <img
                                                                                                    src={require("assets/images/CloseCircle.svg")}
                                                                                                    alt=""
                                                                                                    title=""
                                                                                                />
                                                                                                {Register_special}
                                                                                            </a>
                                                                                        )}
                                                                                    {this.state.UpDataDetails?.password && this.state.UpDataDetails?.password.match(
                                                                                        specialchar
                                                                                    ) && (
                                                                                            <a>
                                                                                                <img
                                                                                                    src={require("assets/images/CheckCircle.svg")}
                                                                                                    alt=""
                                                                                                    title=""
                                                                                                />
                                                                                                {Register_special}
                                                                                            </a>
                                                                                        )}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="passInst">
                                                                        <div className="passInstIner">
                                                                            <p>{Register_Passwordshould}</p>
                                                                            <img
                                                                                src={require("assets/images/passArrow.png")}
                                                                                alt=""
                                                                                title=""
                                                                                className="passArow"
                                                                            />
                                                                            <ul>
                                                                                <li>
                                                                                    <a>
                                                                                        <img
                                                                                            src={require("assets/images/CloseCircle.svg")}
                                                                                            alt=""
                                                                                            title=""
                                                                                        />
                                                                                        {Register_characters}
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a>
                                                                                        <img
                                                                                            src={require("assets/images/CloseCircle.svg")}
                                                                                            alt=""
                                                                                            title=""
                                                                                        />
                                                                                        {Register_letter}
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a>
                                                                                        <img
                                                                                            src={require("assets/images/CloseCircle.svg")}
                                                                                            alt=""
                                                                                            title=""
                                                                                        />
                                                                                        {Register_number}
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a>
                                                                                        <img
                                                                                            src={require("assets/images/CloseCircle.svg")}
                                                                                            alt=""
                                                                                            title=""
                                                                                        />
                                                                                        {Register_special}
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ) || ''
                                                                }
                                                            </Grid>

                                                            <Grid className="profileInfoIner titleDegre">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={3}>
                                                                        <label>{title} / {degree}</label>
                                                                        <Grid>
                                                                            <Select
                                                                                value={this.state.title}
                                                                                onChange={(e) => this.onSelectDegree(e)}
                                                                                options={this.state.title_degreeData || ''}
                                                                                placeholder={"Mr."}
                                                                                name="title"
                                                                                isSearchable={false}
                                                                                className="mr_sel"

                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}>
                                                                        <label>{first} {name}</label>
                                                                        <Grid><input type="text" name="first_name" value={this.state.UpDataDetails.first_name || ''} onChange={this.updateEntryState} /></Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}>
                                                                        <label>{last} {name}</label>
                                                                        <Grid><input type="text" name="last_name" onChange={this.updateEntryState} value={this.state.UpDataDetails.last_name || ''} /></Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoDate">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={4}>
                                                                        <label>{dob}</label>
                                                                        <Grid>
                                                                            <DateFormat name="birthday" value={this.state.UpDataDetails.birthday ? new Date(this.state.UpDataDetails.birthday) : new Date()} onChange={this.onChange} date_format={this.props.settings.setting && this.props.settings.setting.date_format} onChange={this.onChange} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{gender}</label>
                                                                        <Grid>
                                                                            <a onClick={() => this.EntryValueName('male', 'sex')} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'male' && "SelectedGender"}>{male}</a>
                                                                            <a onClick={() => this.EntryValueName('female', 'sex')} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'female' && "SelectedGender"}>{female}</a>
                                                                            <a onClick={() => this.EntryValueName('other', 'sex')} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'other' && "SelectedGender"}> {other}</a>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{marital_status}</label>
                                                                        <Grid className="cntryDropTop">
                                                                            <Select
                                                                                placeholder={select_marital_status}
                                                                                options={this.state.AllMaritalOption}
                                                                                value={this.state.UpDataDetails && this.state.UpDataDetails.marital_status && GetShowLabel1(
                                                                                    this.state.handleMaritalStatus,
                                                                                    this.state.UpDataDetails.marital_status.value,
                                                                                    this.props.stateLanguageType
                                                                                ) || ''}
                                                                                className="cntryDrop"
                                                                                // value ={this.state.UpDataDetails && this.state.UpDataDetails.marital_status && GetShowLabel(this.state.UpDataDetails.marital_status, this.props.stateLanguageType)}
                                                                                onChange={this.handleMaritalStatus} />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{street} {add}</label>
                                                                        <Grid><input type="text" name="address" onChange={this.updateEntryState} value={this.state.UpDataDetails.address ? this.state.UpDataDetails.address : ''} /></Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{city}</label>
                                                                        <Grid>
                                                                            <Autocomplete value={this.state.city} stateLanguageType={this.props.stateLanguageType} onPlaceChanged={this.updateEntryCity.bind(this)} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}>
                                                                        <label>{postal_code}</label>
                                                                        <Grid><input type="text" name="pastal_code" onChange={this.updateEntryState} value={this.state.UpDataDetails.pastal_code ? this.state.UpDataDetails.pastal_code : ''} /></Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{country}</label>
                                                                        <Grid className="cntryDropTop">
                                                                            <Select
                                                                                value={this.state.UpDataDetails.country || ''}
                                                                                onChange={(e) => this.EntryValueName(e, 'country')}
                                                                                options={this.state.selectCountry}
                                                                                placeholder=""
                                                                                isSearchable={true}
                                                                                name="country"
                                                                                className="cntryDrop"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}></Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{Citizenship} {country}</label>
                                                                        <Grid className="cntryDropTop">
                                                                            <Select
                                                                                value={this.state.UpDataDetails.citizen_country || ''}
                                                                                onChange={(e) => this.EntryValueName(e, 'citizen_country')}
                                                                                options={this.state.selectCountry}
                                                                                placeholder=""
                                                                                isSearchable={true}
                                                                                name="country"
                                                                                className="cntryDrop"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}></Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{home_telephone}</label>
                                                                        <Grid>
                                                                            {this.updateFLAG(this.state.UpDataDetails.phone) && this.updateFLAG(this.state.UpDataDetails.phone) !== '' &&
                                                                                <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { this.updateFlags(e, 'flag_phone') }} name="flag_phone" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.UpDataDetails.phone)} />}
                                                                            <input type="text"
                                                                                className="Mobile_extra"
                                                                                placeholder={phone}
                                                                                name="phone"
                                                                                onChange={this.updateEntryState1}
                                                                                value={this.state.UpDataDetails.phone && this.updateMOBILE(this.state.UpDataDetails.phone) || ''}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}></Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{mobile_number}</label>
                                                                        <Grid>
                                                                            {this.updateFLAG(this.state.UpDataDetails.mobile) && this.updateFLAG(this.state.UpDataDetails.mobile) !== '' &&
                                                                                <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { this.updateFlags(e, 'flag_mobile') }} name="flag_mobile" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.UpDataDetails.mobile)} />}
                                                                            <input type="text"
                                                                                className="Mobile_extra"
                                                                                placeholder={mobile}
                                                                                name="mobile"
                                                                                type="text"
                                                                                onChange={this.updateEntryState1}
                                                                                value={this.state.UpDataDetails.mobile && this.updateMOBILE(this.state.UpDataDetails.mobile) || ''}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}></Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={8}>
                                                                        <label>{Languages} {spoken}</label>
                                                                        <Grid>
                                                                            <Select
                                                                                value={this.state.name_multi || ''}
                                                                                name="languages"
                                                                                closeMenuOnSelect={false}
                                                                                onChange={(e) => { this.handleChange_multi(e, 'languages') }}
                                                                                options={this.state.languageData}
                                                                                placeholder=""
                                                                                isSearchable={true}
                                                                                className="profile-language"
                                                                                isMulti={true}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}></Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="profileInfoIner">
                                                                <Grid container direction="row" alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} md={4}>
                                                                        <label>{Blood}</label>
                                                                        <Grid>
                                                                            <Select
                                                                                value={this.state.bloods || ''}
                                                                                name="bloodgroup"
                                                                                onChange={(e) => { this.onSelectBlood(e, 'bloodgroup') }}
                                                                                options={this.state.bloodgroup}
                                                                                placeholder=""
                                                                                isSearchable={false}
                                                                                className="profile-language"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={4}>
                                                                        <label>{Rhesus}</label>
                                                                        <Grid>
                                                                            <Select
                                                                                value={this.state.rhesus || ''}
                                                                                name="rhesus"
                                                                                onChange={(e) => { this.onSelectRshesus(e, 'rhesus') }}
                                                                                options={this.state.rhesusgroup}
                                                                                placeholder=""
                                                                                isSearchable={false}
                                                                                className="profile-language"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}></Grid>
                                                                    <Grid className="clear"></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}></Grid>
                                                    <Grid className="clear"></Grid>
                                                </Grid>

                                                <Grid>
                                                    <Grid className="insrnceTbl"><h3>{emergency} {Contact}</h3></Grid>
                                                    <Grid className="emrgncyFrmInpt">
                                                        <Grid><label>{Register_Name}</label></Grid>
                                                        <Grid><input type="text" name="name" value={this.state.contact_partner.name || ''} onChange={this.contact_partnerState} /></Grid>
                                                    </Grid>
                                                    <Grid className="emrgncyFrmInpt">
                                                        <Grid><label>{relation}</label></Grid>
                                                        <Grid><input name="relation" value={this.state.contact_partner.relation || ''} onChange={this.contact_partnerState} /></Grid>
                                                    </Grid>
                                                    <Grid className="emrgncyFrmInpt">
                                                        <Grid><label>{telephone_nmbr}</label></Grid>
                                                        <Grid>
                                                            {/* <PhoneInput
                            country={'us'}
                            value={this.state.phone}
                            onChange={phone => this.setState({ phone })}
                        /> */}
                                                            {this.updateFLAG(this.state.contact_partner.number) && this.updateFLAG(this.state.contact_partner.number) !== '' &&
                                                                <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { this.updateFlags(e, 'flag_emergency_number') }} name="flag_emergency_number" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.contact_partner.number)} />}
                                                            <input type="text"
                                                                className="Mobile_extra Emergency_number"
                                                                placeholder={phone}
                                                                onChange={this.updateEntryState11}
                                                                value={this.state.contact_partner.number && this.updateMOBILE(this.state.contact_partner.number) || ''}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid className="emrgncyFrmInpt">
                                                        <Grid><label>{email}</label></Grid>
                                                        <Grid><input name="email" value={this.state.contact_partner.email || ''} onChange={this.contact_partnerState} /></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="insrnceTbl">
                                                    <Grid><h3>{insurance}</h3></Grid>
                                                    <Grid className="profileIdRght">
                                                        <a onClick={this.handleAddInsurance}>{Addcompany}</a>
                                                    </Grid>
                                                    {/* Add more insurance model Open */}
                                                    <Modal
                                                        open={this.state.addInsuranceOpen}
                                                        onClose={() => this.handlePinClose("addInsuranceOpen")}
                                                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme editBoxModel" : "editBoxModel"}>
                                                        <Grid className="editBoxCntnt">
                                                            <Grid className="editCourse">
                                                                <Grid className="editCloseBtn">
                                                                    <a onClick={() => this.handlePinClose("addInsuranceOpen")}>
                                                                        <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                                    </a>
                                                                </Grid>
                                                                <Grid><label>{add_more} {insurance}</label></Grid>
                                                            </Grid>
                                                            <Grid className="editPinform">
                                                                <Grid className="editField">
                                                                    {this.state.insurnanceAdded && <div className="success_message">{insurance_added}</div>}
                                                                    {this.state.insu1 && <div className="err_message">{InsurancecompanyError}</div>}
                                                                    <label>{country} {of} {insurance}</label>
                                                                    <Grid className="cntryDropTop">
                                                                        <Select
                                                                            onChange={this.selectCountry}
                                                                            options={this.state.selectCountry}
                                                                            placeholder=""
                                                                            isSearchable={true}
                                                                            name="insurance_country"
                                                                            className="cntryDrop"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid className="editField">
                                                                    <label>{insurance} {company}</label>
                                                                    <Grid><input type="text" name="insurance" value={(insuranceDetails && insuranceDetails.insurance) && insuranceDetails.insurance} onChange={this.insuranceForm} /></Grid>
                                                                    <ul className="insuranceHint" style={{ height: companyList && companyList.length > 0 ? '150px' : '' }}>
                                                                        {companyList}
                                                                    </ul>
                                                                </Grid>

                                                                <Grid className="editField">
                                                                    <label>{insurance} {number}</label>
                                                                    <Grid><input type="text" name="insurance_number" onChange={(e) => this.insuranceForm(e)} /></Grid>
                                                                </Grid>
                                                                <Grid>
                                                                    <input type="submit" onClick={this.saveUserData1} value={save_change} />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Modal>
                                                    {/* Add more insurance model Close */}
                                                    <Table>
                                                        <thead>
                                                            <tr>
                                                                <th>{country} {of} {insurance}</th>
                                                                <th>{insurance} {company}</th>
                                                                <th>{insurance} {number}</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {insurancefull && insurancefull.length > 0 && insurancefull.map((insu, i) => (
                                                                <tr>
                                                                    <td>{this.filterCountry(insu.insurance_country)}</td>
                                                                    <td>{insu.insurance}</td>
                                                                    <td>{insu.insurance_number}</td>
                                                                    <td className="presEditDot scndOptionIner pivoted"><a className="openScndhrf">
                                                                        <img src={require('assets/images/three_dots_t.png')} alt="" title="" className="openScnd" />
                                                                        <ul>
                                                                            <li><a onClick={() => this.editKYCopen(insu, i)}><img src={require('assets/images/edit.svg')} alt="" title="" />{edit}</a></li>
                                                                            <li><a onClick={() => this.removeInsurance(i, insu)} ><img src={require('assets/images/close-search.svg')} alt="" title="" />{Delete}</a></li>
                                                                        </ul>
                                                                    </a></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                    {/* Edit insurance model OPen */}
                                                    <Modal
                                                        open={this.state.editInsuranceOpen}
                                                        onClose={() => this.handlePinClose("editInsuranceOpen")}
                                                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme editBoxModel" : "editBoxModel"}>
                                                        <Grid className="editBoxCntnt">
                                                            <Grid className="editCourse">
                                                                <Grid className="editCloseBtn">
                                                                    <a onClick={() => this.handlePinClose("editInsuranceOpen")}>
                                                                        <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                                                    </a>
                                                                </Grid>
                                                                <Grid><label>{edit} {insurance}</label></Grid>
                                                            </Grid>
                                                            <Grid className="editPinform">
                                                                <Grid className="editField">
                                                                    {this.state.insu1 && <div className="err_message">{InsurancecompanyError}</div>}
                                                                    {this.state.insurnanceAdded && <div className="success_message">{insurance_added}</div>}
                                                                    <label>{country} {of} {insurance}</label>
                                                                    <Grid className="cntryDropTop">
                                                                        <Select
                                                                            value={datas && datas[editIndex] && datas[editIndex].insurance_country ? this.filterCountry1(datas[editIndex] && datas[editIndex].insurance_country) : ''}
                                                                            onChange={(event) => this.updatesinsurancesCountry(editIndex, event)}
                                                                            options={this.state.selectCountry}
                                                                            placeholder=""
                                                                            isSearchable={true}
                                                                            name="insurance_country"
                                                                            className="cntryDrop"
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid className="editField">
                                                                    <label>{insurance} {company}</label>
                                                                    <Grid><input type="text" value={datas && datas[editIndex] && datas[editIndex].insurance ? datas[editIndex] && datas[editIndex].insurance : ''} name="insurance" onChange={(event) => this.updatesinsurances(editIndex, event)} /></Grid>
                                                                    <ul className="insuranceHint" style={{ height: companyList && companyList.length > 0 ? '150px' : '' }}>
                                                                        {companyList}
                                                                    </ul>
                                                                </Grid>

                                                                <Grid className="editField">
                                                                    <label>{insurance} {number}</label>
                                                                    <Grid><input type="text" value={datas && datas[editIndex] && datas[editIndex].insurance_number ? datas[editIndex] && datas[editIndex].insurance_number : ''} name="insurance_number" onChange={(event) => this.updatesinsurances(editIndex, event)} /></Grid>
                                                                </Grid>
                                                                <Grid>
                                                                    <input type="submit" onClick={this.saveUserData1} value={save_change} />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Modal>
                                                    {/* Edit insurance Model close */}
                                                </Grid>

                                                <Grid className="infoSub">
                                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                                        <Grid item xs={12} md={5}>
                                                            <Grid className="recaptchaMargin">
                                                                <ReCAPTCHA
                                                                    sitekey={"6Lfgib4cAAAAAKWDXLFxlUQ8o4zb529nqkP0k1b3"}
                                                                    onChange={this.onChangeRec}
                                                                    ref={(r) => this.captcha = r}
                                                                />
                                                            </Grid>
                                                            <Grid><input type="submit" onClick={this.saveUserData} value={save_change} /></Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={7}></Grid>
                                                        <Grid className="clear"></Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        {/* End of Tabs */}
                                    </Grid>
                                </Grid>
                                {/* Website Right Content */}
                                <Grid item xs={12} md={3}></Grid>
                                {/* End of Website Right Content */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        metadata,
    }
};
export default withRouter(connect(mapStateToProps, { OptionList, LoginReducerAim, LanguageFetchReducer, Settings })(Index));