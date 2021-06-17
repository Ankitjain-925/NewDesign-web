/*global google*/
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
// import DatePicker from 'react-date-picker';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import ReactFlagsSelect from 'react-flags-select';
import sitedata from 'sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { OptionList } from "Screens/Login/metadataaction";
import QRCode from 'qrcode.react';
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
import Autocomplete from 'Screens/Components/Autocomplete/index';
import { LanguageFetchReducer } from 'Screens/actions';
import Modal from '@material-ui/core/Modal';
import Loader from 'Screens/Components/Loader/index';
import SPECIALITY from 'speciality';
import { GetLanguageDropdown, GetShowLabel1, GetShowLabel } from 'Screens/Components/GetMetaData/index.js';
import DateFormat from 'Screens/Components/DateFormat/index'
import {
    getLanguage
} from "translations/index"
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { commonHeader } from 'component/CommonHeader/index';
var datas = [];
var insurances = [];

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
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        // $("#clickIcon").click(function () {
        //     $("input[id='my_file']").click();
        //   });
        // this.setState({
        //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        // });
        this.getMetadata();
        this.getUserData();
        // this.alldoctor();
        this.firstLoginUpdate();
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        /*---location---*/
        this.city = new google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            { types: ["geocode"] }
        );
        this.city.addListener("place_changed", this.handlePlaceChanged);
    }


    firstLoginUpdate = () => {
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/Users/update', {
            firstlogin: true,
        }, commonHeader(user_token)).then((responce) => { })
    }

    // Copy the Profile id and PIN
    copyText = (copyT) => {
        this.setState({ copied: false })
        var copyText = document.getElementById(copyT);
        var textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        this.setState({ copied: true })
        setTimeout(() => {
            this.setState({ copied: false })
        }, 5000)
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

    //For open QR code
    handleQrOpen = () => {
        this.setState({ qrOpen: true });
    };
    handleQrClose = () => {
        this.setState({ qrOpen: false });
    };

    //for open the Change profile Dialog
    handlePinOpen = () => {
        this.setState({ chngPinOpen: true });
    };
    handlePinClose = (key) => {
        this.setState({ [key]: false });
    };

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

    componentDidUpdate = (prevProps) => {
        if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
            this.GetLanguageMetadata();
            if (this.state.rhesus && this.state.rhesus.value) {
                this.Upsaterhesus(this.state.rhesus.value);
            }

        }
    }

    //For getting the dropdowns from the database
    getMetadata() {

        this.setState({ allMetadata: this.props.metadata },
            () => {
                this.GetLanguageMetadata();
            })
        // axios.get(sitedata.data.path + '/UserProfile/Metadata')
        //     .then((responce) => {
        //         if (responce && responce.data && responce.data.length > 0) {
        //             this.setState({ allMetadata: responce.data[0] })
        //             this.GetLanguageMetadata();
        //         }
        //     })
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


    // getMetadata() {
    //     axios.get(sitedata.data.path + '/UserProfile/Metadata')
    //         .then((responce) => {
    //             if (responce && responce.data && responce.data.length > 0) {
    //                 var Gender = [], Languages = [], Speciality = [], Titles = [];
    //                 {
    //                     responce.data[0].gender && responce.data[0].gender.length > 0 && responce.data[0].gender.map(
    //                         (item) => { Gender.push({ label: item.title, value: item.value }) })
    //                 }
    //                 {
    //                     responce.data[0].languages && responce.data[0].languages.length > 0 && responce.data[0].languages.map(
    //                         (item) => { Languages.push({ label: item.title, value: item.value }) })
    //                 }
    //                 {
    //                     responce.data[0].speciality && responce.data[0].speciality.length > 0 && responce.data[0].speciality.map(
    //                         (item) => { Speciality.push({ label: item.title, value: item.value }) })
    //                 }
    //                 {
    //                     responce.data[0].title_degreeData && responce.data[0].title_degreeData.length > 0 && responce.data[0].title_degreeData.map(
    //                         (item) => { Titles.push({ label: item.title, value: item.value }) })
    //                 }
    //                 this.setState({
    //                     genderdata: Gender,
    //                     languageData: Languages,
    //                     specialityData: Speciality,
    //                     title_degreeData: Titles,
    //                     bloodgroup: responce.data[0].bloodgroup,
    //                     rhesusgroup: responce.data[0].rhesus 
    //                 });
    //             }
    //         })

    // }

    //Getting Doctor to add as Family doctor
    // alldoctor() {

    //     const user_token = this.props.stateLoginValueAim.token;
    //     axios.get(sitedata.data.path + '/UserProfile/DoctorUsers', {
    //         headers: {
    //             'token': user_token,
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => {
    //             this.setState({ allDocData: response.data.data })
    //         })
    // }

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
        const state = this.state.userDetails
        state[e.target.name] = e.target.value;
        this.setState({ userDetails: state });
    }

    //For checkbox to offer things
    handleweoffer = (e) => {
        const state = this.state.weoffer
        state[e.target.name] = e.target.value;
        this.setState({ weoffer: state });
    }

    // For add the insurance
    addmore_insurance() {
        datas.push(this.state.insuranceDetails)
        this.setState({ insurance_count: this.state.insurance_count + 1, insurancefull: datas })
        this.setState({ insuranceDetails: { insurance: '', insurance_type: '', insurance_number: '' } })
        this.setState({ moreone: true })
    }

    //Save the User profile
    saveUserData1 = () => {
        if (this.state.insuranceDetails.insurance !== "" && this.state.insuranceDetails.insurance_country !== "") {
            if (datas.some(data => data.insurance === this.state.insuranceDetails.insurance)) {

            }
            else {
                datas.push(this.state.insuranceDetails)
                this.setState({ insurancefull: datas })
            }
            const user_token = this.props.stateLoginValueAim.token;
            this.setState({ insu1: false, loaderImage: true })
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                insurance: datas
            }, commonHeader(user_token)).then((responce) => {
                if (responce.data.hassuccessed) {
                    this.setState({ editInsuranceOpen: false, addInsuranceOpen: false, succUpdate: true, insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
                    this.setState({ loaderImage: false });
                    setTimeout(() => { this.setState({ succUpdate: false }) }, 5000)
                    this.getUserData();
                }
            })
        }
        else {
            this.setState({ insu1: true })
        }
    }
    //Save the User profile
    saveUserData = () => {
        if (!this.state.UpDataDetails.mobile.includes("-")) {
            const state2 = this.state.UpDataDetails
            state2['mobile'] = 'DE-' + this.state.UpDataDetails.mobile;

            this.setState({ UpDataDetails: state2 })
        }
        if (this.state.insuranceDetails.insurance !== "" && this.state.insuranceDetails.insurance_country !== "") {
            if (datas.some(data => data.insurance === this.state.insuranceDetails.insurance)) {

            }
            else {
                datas.push(this.state.insuranceDetails)
                this.setState({ insurancefull: datas })
            }
        }
        if (this.state.flag_emergency_number && this.state.flag_emergency_number === '' && this.state.flag_emergency_number === 'undefined') {
            this.setState({ flag_emergency_number: 'DE' })
        }
        if (this.state.flag_mobile && this.state.flag_mobile === '' && this.state.flag_mobile === 'undefined') {
            this.setState({ flag_mobile: 'DE' })
        }
        if (this.state.flag_phone && this.state.flag_phone === '' && this.state.flag_phone === 'undefined') {
            this.setState({ flag_phone: 'DE' })
        }
        if (this.state.flag_fax && this.state.flag_fax === '' && this.state.flag_fax === 'undefined') {
            this.setState({ flag_fax: 'DE' })
        }
        this.setState({ loaderImage: true, phonevalidate: false });
        this.setState({ regisError1: "" })
        this.setState({ regisError2: "" })
        const user_token = this.props.stateLoginValueAim.token;
        this.setState({ insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
        var parent_id = this.state.UpDataDetails.parent_id ? this.state.UpDataDetails.parent_id : '0';

        axios.put(sitedata.data.path + '/UserProfile/Users/update', {
            type: 'patient',
            pin: this.state.UpDataDetails.pin,
            first_name: this.state.UpDataDetails.first_name,
            last_name: this.state.UpDataDetails.last_name,
            nick_name: this.state.UpDataDetails.nick_name,
            title: this.state.UpDataDetails.title,
            birthday: this.state.UpDataDetails.birthday,
            language: this.state.UpDataDetails.language,
            speciality: this.state.speciality_multi,
            phone: this.state.UpDataDetails.phone,
            mobile: this.state.UpDataDetails.mobile,
            fax: this.state.UpDataDetails.fax,
            website: this.state.UpDataDetails.website,
            email: this.state.UpDataDetails.email,
            password: this.state.UpDataDetails.password,
            sex: this.state.UpDataDetails.sex,
            marital_status: this.state.UpDataDetails.marital_status,
            street: this.state.UpDataDetails.street,
            city: this.state.city,
            area: this.state.area,
            address: this.state.UpDataDetails.address,
            emergency_contact_name: this.state.contact_partner.name,
            emergency_relation: this.state.contact_partner.relation,
            emergency_email: this.state.contact_partner.email,
            emergency_number: this.state.contact_partner.number,
            family_doc: this.state.UpDataDetails.family_doc,
            insurance: datas,
            is2fa: this.state.UpDataDetails.is2fa,
            country: this.state.UpDataDetails.country,
            pastal_code: this.state.UpDataDetails.pastal_code,
            blood_group: this.state.UpDataDetails.blood_group,
            rhesus: this.state.UpDataDetails.rhesus,
        }, commonHeader(user_token)).then((responce) => {
            if (responce.data.hassuccessed) {
                this.setState({ editInsuranceOpen: false, addInsuranceOpen: false, succUpdate: true, insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
                this.setState({ loaderImage: false });
                setTimeout(() => { this.setState({ succUpdate: false }) }, 5000)
                this.getUserData();
                axios.put('https://api-eu.cometchat.io/v2.0/users/' + this.state.profile_id.toLowerCase(), {
                    name: this.state.UpDataDetails.first_name + ' ' + this.state.UpDataDetails.last_name
                },
                    {
                        headers: {
                            'appId': '220824e717b58ac',
                            'apiKey': 'fc177a4e50f38129dca144f6270b91bfc9444736',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
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

    // Check the Alies is duplicate or not
    changePin = (e) => {
        const state = this.state.UpDataDetails;
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
        if (e.target.value.length > 3 && e.target.value !== '') {
            this.setState({ toSmall1: false });
        }
        else {
            this.setState({ toSmall1: true })
        }
    }
    //Chnage Id Pin by here
    ChangeIDPIN = () => {
        if (!this.state.DuplicateAlies && !this.state.toSmall && !this.state.toSmall1) {
            this.setState({ loaderImage: true });
            const user_token = this.props.stateLoginValueAim.token;
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                pin: this.state.UpDataDetails.pin,
                alies_id: this.state.UpDataDetails.alies_id,
            }, commonHeader(user_token)).then((responce) => {
                if (responce.data.hassuccessed) {
                    this.setState({ ChangedPIN: true })
                    setTimeout(() => { this.setState({ ChangedPIN: false }) }, 5000)
                }
                this.setState({ loaderImage: false });
                this.getUserData();
                this.handlePinClose("chngPinOpen");
            })
        }
    }

    // Check the Alies is duplicate or not
    changeAlies = (e) => {
        const state = this.state.UpDataDetails;
        state[e.target.name] = e.target.value;
        this.setState({ UpDataDetails: state });
        if (e.target.value.length > 5 && e.target.value !== '') {
            this.setState({ loaderImage: true, toSmall: false });
            const user_token = this.props.stateLoginValueAim.token;
            axios.get(sitedata.data.path + '/UserProfile/checkAlies?alies_id=' + e.target.value, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed) { this.setState({ DuplicateAlies: true }) }
                else { this.setState({ DuplicateAlies: false }) }
                this.setState({ loaderImage: false });
            })
        }
        else {
            this.setState({ toSmall: true })
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
        // if (e.target.name === 'insurance_country') {
        //     datas[keys].insurance_country = e.target.value;
        // }
        this.setState({ insurancefull: datas })
    }

    //For removing the insurance 
    removeInsurance = (keys, e) => {
        datas.splice(keys, 1);
        this.setState({ insurancefull: datas })
    }

    Upsaterhesus = (rhesusfromD) => {
        var rhesus = GetShowLabel1(this.state.rhesusgroup, rhesusfromD, this.props.stateLanguageType)
        this.setState({ rhesus: rhesus })
    }

    //For getting User Data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
            commonHeader(user_token)).then((response) => {
                var state1 = this.state.contact_partner;
                state1['relation'] = response.data.data && response.data.data.emergency_relation
                state1['email'] = response.data.data && response.data.data.emergency_email
                state1['name'] = response.data.data && response.data.data.emergency_contact_name
                state1['number'] = response.data.data && response.data.data.emergency_number
                this.setState({ contact_partner: state1 },
                    () => {
                        if (response.data.data && response.data.data.emergency_number && response.data.data.emergency_number !== '') {
                            let fen = response.data.data.emergency_number.split("-");
                            if (fen && fen.length > 0) {
                                this.setState({ flag_emergency_number: fen[0] })
                            }
                        }
                    })
                var title = {}, titlefromD = response.data.data.title;
                var bloodfromD = response.data.data.blood_group, rhesusfromD = response.data.data.rhesus,
                    bloods = {};
                var language = [], languagefromD = response.data.data.language;
                if (languagefromD && languagefromD.length > 0) {
                    languagefromD.map((item) => {
                        language.push({ value: item, label: item.replace(/_/g, " ") });
                    })

                }

                if (bloodfromD && bloodfromD !== "") {
                    bloods = { label: bloodfromD, value: bloodfromD }
                }
                if (rhesusfromD && rhesusfromD !== "") {
                    this.Upsaterhesus(rhesusfromD)
                }
                if (titlefromD && titlefromD !== "") {
                    title = { label: titlefromD, value: titlefromD }
                }
                if (response.data.data.mobile && response.data.data.mobile !== '') {
                    let mob = response.data.data.mobile.split("-");
                    if (mob && mob.length > 0) {
                        this.setState({ flag_mobile: mob[0] })
                    }
                }
                if (response.data.data.phone && response.data.data.phone !== '') {
                    let pho = response.data.data.phone.split("-");
                    if (pho && pho.length > 0) {
                        this.setState({ flag_phone: pho[0] })
                    }
                }
                if (response.data.data.fax && response.data.data.fax !== '') {
                    let fx = response.data.data.fax.split("-");
                    if (fx && fx.length > 0) {
                        this.setState({ flag_fax: fx[0] })
                    }
                }
                // if (response.data.data.emergency_number && response.data.data.emergency_number !== '') {
                //     let fen = response.data.data.emergency_number.split("-");
                //     if (fen && fen.length > 0) {
                //         this.setState({ flag_emergency_number: fen[0] })
                //     }
                // }

                this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id: response.data.data.profile_id });
                this.setState({ speciality_multi: this.state.UpDataDetails.speciality })
                this.setState({ name_multi: language, title: title, bloods: bloods })
                this.setState({
                    insurancefull: this.state.UpDataDetails.insurance,
                    insuranceDetails: { insurance: '', insurance_number: '', insurance_type: '' }
                })
                datas = this.state.UpDataDetails.insurance;

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
        const { stateLoginValueAim, Doctorsetget } = this.props;
        const { value, editInsuData, insurancefull, editIndex, insuranceDetails } = this.state;
        const companyList = this.state.filteredCompany && this.state.filteredCompany.map(company => {
            return (
                <li className="list-group-item" value={company}
                    onClick={() => { this.setState({ q: company }); this.toggle(company); this.setState({ filteredCompany: [] }) }}
                >{company}</li>
            )
        });

        let translate = getLanguage(this.props.stateLanguageType)
        let { Contact, Register_Name, relation, phone, select_marital_status, organ_donar_status, not_an_organ, emergency, telephone_nmbr, marital_status,
            Rhesus, InsurancecompanyError, Addcompany, Blood, profile_info, profile, information, ID, pin, QR_code, done, Change, edit_id_pin, edit, and, is, changed, profile_id_taken, profile_id_greater_then_5,
            save_change, email, title, degree, first, last, name, dob, gender, street, add, city, postal_code, country, home_telephone, country_code, Delete, male, female, other,
            mobile_number, number, mobile, Languages, spoken, pin_greater_then_4, insurance, add_more, company, of, info_copied, profile_updated, profile_not_updated, mobile_number_not_valid, insurance_added } = translate;


        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid className="profileMy">
                    <Grid className="profileInfo">
                        {this.state.copied && <div className="success_message">{info_copied}</div>}
                        {this.state.succUpdate && <div className="success_message">{profile_updated}</div>}
                        {this.state.error3 && <div className="err_message">{profile_not_updated}</div>}
                        {this.state.phonevalidate && <div className="err_message">{mobile_number_not_valid}</div>}
                        {this.state.ChangedPIN && <div className="success_message">{profile} {ID} {and} {pin} {is} {changed}</div>}
                        <h1>{profile} {information}</h1>
                        <p>{profile_info}</p>
                    </Grid>
                </Grid>
                <Grid className="profileId">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Grid className="profileIdLft">
                                <Grid container direction="row" alignItems="center" spacing={1}>
                                    <Grid item xs={12} md={7}>
                                        <label>{profile} {ID}</label><span id="profile_id">{this.state.UpDataDetails.alies_id && this.state.UpDataDetails.alies_id}</span>
                                        <a><img src={require('assets/images/copycopy.svg')} onClick={() => this.copyText('profile_id')} alt="" title="" /></a>
                                        <a><img src={require('assets/images/qr-code.svg')} onClick={this.handleQrOpen} alt="" title="" /></a>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <label>{pin}</label><span id="profile_pin">{this.state.UpDataDetails.pin && this.state.UpDataDetails.pin}</span>
                                        <a><img src={require('assets/images/copycopy.svg')} onClick={() => this.copyText('profile_pin')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* QR Model setup */}
                        <Modal
                            open={this.state.qrOpen}
                            onClose={this.handleQrClose}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme qrBoxModel" : "qrBoxModel"}>
                            <Grid className="qrBoxCntnt">
                                <Grid className="qrCourse">
                                    <Grid className="qrCloseBtn">
                                        <a onClick={this.handleQrClose}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{profile} {QR_code}</label></Grid>
                                </Grid>
                                <Grid className="qrCourseImg">
                                    <Grid> <QRCode value={this.state.UpDataDetails && this.state.UpDataDetails.profile_id} /></Grid>
                                    <Grid><input type="submit" value={done} onClick={this.handleQrClose} /></Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of QR Model setup */}
                        <Grid item xs={12} md={4}>
                            <Grid className="profileIdRght">
                                <a onClick={this.handlePinOpen}>{Change} {ID} / {pin}</a>
                            </Grid>
                        </Grid>
                        {/* Change ID and Pin */}
                        <Modal
                            open={this.state.chngPinOpen}
                            onClose={() => this.handlePinClose("chngPinOpen")}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme editBoxModel" : "editBoxModel"}>

                            <Grid className="editBoxCntnt">
                                <Grid className="editCourse">
                                    <Grid className="editCloseBtn">
                                        <a onClick={() => this.handlePinClose("chngPinOpen")}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{edit} {ID} {and} {pin}</label></Grid>
                                    <p>{edit_id_pin}</p>
                                </Grid>
                                <Grid className="editPinform">
                                    <Grid className="editField">
                                        <label>{profile} {ID}</label>
                                        <Grid><input type="text" name="alies_id" onChange={this.changeAlies} value={this.state.UpDataDetails.alies_id} /></Grid>
                                        {this.state.DuplicateAlies && <p>{profile_id_taken}</p>}
                                        {this.state.toSmall && <p>{profile_id_greater_then_5}</p>}
                                    </Grid>
                                    <Grid className="editField">
                                        <label>{pin}</label>
                                        <Grid><input type="text" name="pin" onChange={this.changePin} value={this.state.UpDataDetails.pin} /></Grid>
                                        {this.state.toSmall1 && <p>{pin_greater_then_4}</p>}
                                    </Grid>
                                    <Grid>
                                        <input type="submit" onClick={this.ChangeIDPIN} value={save_change} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of Change ID and Pin */}
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
                                    <Grid item xs={12} md={3}>
                                        <label>{title} / {degree}</label>
                                        <Grid>
                                            <Select
                                                value={this.state.title}
                                                onChange={(e) => this.onSelectDegree(e)}
                                                options={this.state.title_degreeData}
                                                placeholder="Mr."
                                                name="title"
                                                isSearchable={false}
                                                className="mr_sel"

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>{first} {name}</label>
                                        <Grid><input type="text" name="first_name" value={this.state.UpDataDetails.first_name} onChange={this.updateEntryState} /></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>{last} {name}</label>
                                        <Grid><input type="text" name="last_name" onChange={this.updateEntryState} value={this.state.UpDataDetails.last_name} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoDate">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <label>{dob}</label>
                                        <Grid>
                                            {/* <DatePicker
                                                name="birthday"
                                                value={this.state.UpDataDetails.birthday ? new Date(this.state.UpDataDetails.birthday) : new Date()}
                                                onChange={this.onChange}
                                            /> */}
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
                                        <Grid>
                                            <Select
                                                placeholder={select_marital_status}
                                                options={this.state.AllMaritalOption}
                                                value={this.state.UpDataDetails && this.state.UpDataDetails.marital_status && GetShowLabel1(
                                                    this.state.handleMaritalStatus,
                                                    this.state.UpDataDetails.marital_status.value,
                                                    this.props.stateLanguageType
                                                )}
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

                                            <Autocomplete value={this.state.city} stateLanguageType={this.props.stateLanguageType} onPlaceChanged={this.updateEntryCity.bind(this)} />                                        </Grid>
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
                                        <Grid>
                                            <Select
                                                value={this.state.UpDataDetails.country}
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
                                        <label>{home_telephone}</label>
                                        <Grid>
                                            {this.updateFLAG(this.state.UpDataDetails.phone) && this.updateFLAG(this.state.UpDataDetails.phone) !== '' &&
                                                <ReactFlagsSelect searchable={true} placeholder={country_code} onSelect={(e) => { this.updateFlags(e, 'flag_phone') }} name="flag_phone" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.UpDataDetails.phone)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder={phone}
                                                name="phone"
                                                onChange={this.updateEntryState1}
                                                value={this.state.UpDataDetails.phone && this.updateMOBILE(this.state.UpDataDetails.phone)}
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
                                                <ReactFlagsSelect searchable={true} placeholder="Country Code" onSelect={(e) => { this.updateFlags(e, 'flag_mobile') }} name="flag_mobile" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.UpDataDetails.mobile)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder={mobile}
                                                name="mobile"
                                                type="text"
                                                onChange={this.updateEntryState1}
                                                value={this.state.UpDataDetails.mobile && this.updateMOBILE(this.state.UpDataDetails.mobile)}
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
                                                value={this.state.name_multi}
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
                                                value={this.state.bloods}
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
                                                value={this.state.rhesus}
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
                        <Grid><input type="text" name="name" value={this.state.contact_partner.name} onChange={this.contact_partnerState} /></Grid>
                    </Grid>
                    <Grid className="emrgncyFrmInpt">
                        <Grid><label>{relation}</label></Grid>
                        <Grid><input name="relation" value={this.state.contact_partner.relation} onChange={this.contact_partnerState} /></Grid>
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
                                value={this.state.contact_partner.number && this.updateMOBILE(this.state.contact_partner.number)}
                            />
                        </Grid>
                    </Grid>
                    <Grid className="emrgncyFrmInpt">
                        <Grid><label>{email}</label></Grid>
                        <Grid><input name="email" value={this.state.contact_partner.email} onChange={this.contact_partnerState} /></Grid>
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
                                    <Grid>
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
                                    <Grid>
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
                            <Grid><input type="submit" onClick={this.saveUserData} value={save_change} /></Grid>
                        </Grid>
                        <Grid item xs={12} md={7}></Grid>
                        <Grid className="clear"></Grid>
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
    const { metadata } = state.OptionList;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        metadata,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { OptionList, LoginReducerAim, LanguageFetchReducer, Settings })(Index));