/*global google*/

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import ReactFlagsSelect from 'react-flags-select';
import sitedata from '../../../../sitedata';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
import npmCountryList from 'react-select-country-list'
import { Table } from 'reactstrap';
import * as AustraliaC from '../../../Components/insuranceCompanies/australia.json';
import * as AustriaC from '../../../Components/insuranceCompanies/austria.json';
import * as NetherlandC from '../../../Components/insuranceCompanies/dutch.json';
import * as GermanC from '../../../Components/insuranceCompanies/german.json';
import * as PhillipinesC from '../../../Components/insuranceCompanies/phillippines.json';
import * as SwitzerlandC from '../../../Components/insuranceCompanies/switzerland.json';
import * as AmericaC from '../../../Components/insuranceCompanies/us.json';
import * as ThailandC from '../../../Components/insuranceCompanies/thailand.json';
import Autocomplete from '../Autocomplete.js';
import { LanguageFetchReducer } from './../../../actions';
import Modal from '@material-ui/core/Modal';
import QRCode from 'qrcode.react';
import Loader from './../../../Components/Loader/index';

var datas = [];
var insurances = [];

class Index extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.city = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
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
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    // On change the Birthday
    onChange = (date) => {
        const state = this.state.UpDataDetails;
        state['birthday'] = date
        this.setState({ UpDataDetails: state })
    }

    // fancybox open
    handleOpenDash = () => {
        this.setState({ openDash: true });
    };
    handleCloseDash = () => {
        this.setState({ openDash: false });
    };

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
        this.alldoctor();
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        /*---location---*/
        this.city = new google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            { types: ["geocode"] }
        );
        this.city.addListener("place_changed", this.handlePlaceChanged);
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
            this.setState({ phone: e.target.value });
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
    handlePinClose = () => {
        this.setState({ chngPinOpen: false });
    };

    //For change the title of user
    onSelectDegree(event) {
        this.setState({ title: event });
        const state = this.state.UpDataDetails;
        state["title"] = event.label
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
            state['emergency_number'] = e + '-' + this.state.phone;
            this.setState({ flag_emergency_number: e });
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
        axios.get(sitedata.data.path + '/UserProfile/Metadata')
            .then((responce) => {
                if (responce && responce.data && responce.data.length > 0) {
                    var Gender = [], Languages = [], Speciality = [], Titles = [];
                    {
                        responce.data[0].gender && responce.data[0].gender.length > 0 && responce.data[0].gender.map(
                            (item) => { Gender.push({ label: item.title, value: item.value }) })
                    }
                    {
                        responce.data[0].languages && responce.data[0].languages.length > 0 && responce.data[0].languages.map(
                            (item) => { Languages.push({ label: item.title, value: item.value }) })
                    }
                    {
                        responce.data[0].speciality && responce.data[0].speciality.length > 0 && responce.data[0].speciality.map(
                            (item) => { Speciality.push({ label: item.title, value: item.value }) })
                    }
                    {
                        responce.data[0].title_degreeData && responce.data[0].title_degreeData.length > 0 && responce.data[0].title_degreeData.map(
                            (item) => { Titles.push({ label: item.title, value: item.value }) })
                    }
                    this.setState({
                        genderdata: Gender,
                        languageData: Languages,
                        specialityData: Speciality,
                        title_degreeData: Titles
                    });
                }
            })

    }

    //Getting Doctor to add as Family doctor
    alldoctor() {
        const user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/DoctorUsers', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ allDocData: response.data.data })
            })
    }

    changeLangClick(languageType) {
        this.props.LanguageFetchReducer(languageType);
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

    logOutClick() {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = 'en';
        this.props.LanguageFetchReducer(languageType);
    }

    // For add the insurance
    addmore_insurance() {
        datas.push(this.state.insuranceDetails)
        this.setState({ insurance_count: this.state.insurance_count + 1, insurancefull: datas })
        this.setState({ insuranceDetails: { insurance: '', insurance_type: '', insurance_number: '' } })
        this.setState({ moreone: true })
    }
    // selectCountry = (event) => {
    //     const state = this.state.CreateKYC;
    //     state['country'] = event.target.value;
    //     this.setState({ CreateKYC: state });
    //     this.setState({ selectedCountry: event.target.value })
    // }


    //Save the User profile
    saveUserData = () => {
        if (this.state.insuranceDetails.insurance !== "" && this.state.insuranceDetails.insurance_number !== ""
            && this.state.insuranceDetails.insurance_country !== "") {
            if (datas.some(data => data.insurance === this.state.insuranceDetails.insurance)) { }
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
            street: this.state.UpDataDetails.street,
            city: this.state.city,
            area: this.state.area,
            address: this.state.UpDataDetails.address,
            emergency_contact_name: this.state.UpDataDetails.emergency_contact_name,
            emergency_email: this.state.UpDataDetails.emergency_email,
            emergency_number: this.state.UpDataDetails.emergency_number,
            family_doc: this.state.UpDataDetails.family_doc,
            insurance: datas,
            is2fa: this.state.UpDataDetails.is2fa,
            country: this.state.UpDataDetails.country,
            pastal_code: this.state.UpDataDetails.pastal_code,
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((responce) => {
            if (responce.data.hassuccessed) {
                this.setState({ succUpdate: true, insuranceDetails: { insurance: '', insurance_number: '', insurance_country: '' } })
                this.setState({ loaderImage: false });
                setTimeout(() => { this.setState({ succUpdate: false }) }, 5000)
                this.getUserData();
                axios.put('https://api-us.cometchat.io/v2.0/users/' + this.state.profile_id.toLowerCase(), {
                    name: this.state.UpDataDetails.first_name + ' ' + this.state.UpDataDetails.last_name
                },
                    {
                        headers: {
                            'appId': '15733dce3a73034',
                            'apiKey': '2f6b4a6b99868d7af0a2964d5f292abbb68e05a7',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => { })
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

    //Chnage Id Pin by here
    ChangeIDPIN = () => {
        if (!this.state.DuplicateAlies) {
            this.setState({ loaderImage: true });
            const user_token = this.props.stateLoginValueAim.token;
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                pin: this.state.UpDataDetails.pin,
                alies_id: this.state.UpDataDetails.alies_id,
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((responce) => {
                if (responce.data.hassuccessed) {
                    this.setState({ ChangedPIN: true })
                    setTimeout(() => { this.setState({ ChangedPIN: false }) }, 5000)
                }
                this.setState({ loaderImage: false });
                this.getUserData();
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


    //For update the insurance
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
        if (e.target.name === 'insurance_country') {
            datas[keys].insurance_country = e.target.value;
        }
        this.setState({ insurancefull: datas })
    }

    //For removing the insurance 
    removeInsurance = (keys, e) => {
        datas.splice(keys, 1);
        this.setState({ insurancefull: datas })
    }

    //For getting User Data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var title = {}, titlefromD = response.data.data.title;
            var language = [], languagefromD = response.data.data.language;
            if (languagefromD && languagefromD.length > 0) {
                languagefromD.map((item) => {
                    language.push({ value: item, label: item.replace(/_/g, " ") });
                })

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
            if (response.data.data.emergency_number && response.data.data.emergency_number !== '') {
                let fen = response.data.data.emergency_number.split("-");
                if (fen && fen.length > 0) {
                    this.setState({ flag_emergency_number: fen[0] })
                }
            }
            this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id: response.data.data.profile_id });
            this.setState({ speciality_multi: this.state.UpDataDetails.speciality })
            this.setState({ name_multi: language, title: title })
            this.setState({ insurancefull: this.state.UpDataDetails.insurance, insuranceDetails: { insurance: '', insurance_number: '', insurance_type: '' } })
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

    //For insurance Countries getting the list
    filterList(selectedCountry) {
        let iCompany;
        switch (selectedCountry) {
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


    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        const { value } = this.state;

        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid className="profileMy">
                    <Grid className="profileInfo">
                        {this.state.copied && <div className="success_message">Information is Copied</div>}
                        {this.state.succUpdate && <div className="success_message">Profile is updated</div>}
                        {this.state.error3 && <div className="err_message">Profile is not updated. Can not reach to server</div>}
                        {this.state.phonevalidate && <div className="err_message">Mobile number is not valid</div>}
                        <h1>Profile information</h1>
                        <p>This is your profile information, which is accessible to your trusted Doctors and those
                        you share your Profile ID nad PIN with.</p>
                    </Grid>
                </Grid>

                <Grid className="profileId">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Grid className="profileIdLft">
                                <Grid container direction="row" alignItems="center" spacing={1}>
                                    <Grid item xs={12} md={7}>
                                        <label>Profile ID</label><span id="profile_id">{this.state.UpDataDetails.alies_id && this.state.UpDataDetails.alies_id}</span>
                                        <a><img src={require('../../../../assets/images/copycopy.svg')} onClick={() => this.copyText('profile_id')} alt="" title="" /></a>
                                        <a><img src={require('../../../../assets/images/qr-code.svg')} onClick={this.handleQrOpen} alt="" title="" /></a>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <label>PIN</label><span id="profile_pin">{this.state.UpDataDetails.pin && this.state.UpDataDetails.pin}</span>
                                        <a><img src={require('../../../../assets/images/copycopy.svg')} onClick={() => this.copyText('profile_pin')} alt="" title="" /></a>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* QR Model setup */}
                        <Modal
                            open={this.state.qrOpen}
                            onClose={this.handleQrClose}
                            className="qrBoxModel">
                            <Grid className="qrBoxCntnt">
                                <Grid className="qrCourse">
                                    <Grid className="qrCloseBtn">
                                        <a onClick={this.handleQrClose}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>Profile QR code</label></Grid>
                                </Grid>
                                <Grid className="qrCourseImg">
                                    {/* <Grid><img src={require('../../../../assets/images/qrimg.jpg')} alt="" title="" /></Grid> */}
                                    <Grid> <QRCode value={this.state.UpDataDetails.profile_id} /> </Grid>
                                    <Grid><input type="submit" value="Done" onClick={this.handleQrClose} /></Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of QR Model setup */}
                        <Grid item xs={12} md={4}>
                            <Grid className="profileIdRght">
                                <a onClick={this.handlePinOpen}>Change ID / PIN</a>
                            </Grid>
                        </Grid>
                        {/* Change ID and Pin */}
                        <Modal
                            open={this.state.chngPinOpen}
                            onClose={this.handlePinClose}
                            className="editBoxModel">
                            <Grid className="editBoxCntnt">
                                <Grid className="editCourse">
                                    <Grid className="editCloseBtn">
                                        <a onClick={this.handlePinClose}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>Edit ID and PIN</label></Grid>
                                    <p>You can change your ID and PIN as many times as you want.</p>
                                </Grid>
                                <Grid className="editPinform">
                                    <Grid className="editField">
                                        {this.state.ChangedPIN && <div className="success_message">Profile ID and PIN is changed</div>}
                                        <label>Profile ID</label>
                                        <Grid><input type="text" name="alies_id" onChange={this.changeAlies} value={this.state.UpDataDetails.alies_id} /></Grid>
                                        {this.state.DuplicateAlies && <p>This Profile ID is already taken. Please try a different ID</p>}
                                        {this.state.toSmall && <p>Profile id must be greater then 5 characters</p>}
                                    </Grid>
                                    <Grid className="editField">
                                        <label>PIN</label>
                                        <Grid><input type="text" name="pin" onChange={this.updateEntryState} value={this.state.UpDataDetails.pin} /></Grid>
                                    </Grid>
                                    <Grid>
                                        <input type="submit" onClick={this.ChangeIDPIN} value="Save changes" />
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
                                        <label>Email address</label>
                                        <Grid><input name="email" type="text" onChange={this.updateEntryState} value={this.state.UpDataDetails.email} disabled /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner titleDegre">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <label>Title / Degree</label>
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
                                        <label>First name</label>
                                        <Grid><input type="text" name="first_name" value={this.state.UpDataDetails.first_name} onChange={this.updateEntryState} /></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>Last name</label>
                                        <Grid><input type="text" name="last_name" onChange={this.updateEntryState} value={this.state.UpDataDetails.last_name} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoDate">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <label>Date of birth</label>
                                        <Grid>
                                            <DatePicker
                                                name="birthday"
                                                value={this.state.UpDataDetails.birthday ? new Date(this.state.UpDataDetails.birthday) : new Date()}
                                                onChange={this.onChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <label>Gender</label>
                                        <Grid>
                                            <a onClick={() => this.EntryValueName('male', 'sex')} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'male' && "SelectedGender"}>Male</a>
                                            <a onClick={() => this.EntryValueName('female', 'sex')} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'female' && "SelectedGender"}>Female</a>
                                            <a onClick={() => this.EntryValueName('other', 'sex')} className={this.state.UpDataDetails.sex && this.state.UpDataDetails.sex === 'other' && "SelectedGender"}> Other</a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>Street address</label>
                                        <Grid><input type="text" name="address" onChange={this.updateEntryState} value={this.state.UpDataDetails.address ? this.state.UpDataDetails.address : ''} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>City</label>
                                        <Grid>
                                            <Autocomplete value={this.state.city} stateLanguageType={this.props.stateLanguageType} onPlaceChanged={this.updateEntryCity.bind(this)} />                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <label>Postal code</label>
                                        <Grid><input type="text" name="pastal_code" onChange={this.updateEntryState} value={this.state.UpDataDetails.pastal_code ? this.state.UpDataDetails.pastal_code : ''} /></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className="profileInfoIner">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <label>Country</label>
                                        <Grid>
                                            <Select
                                                value={this.state.UpDataDetails.country}
                                                onChange={(e) => this.EntryValueName(e, 'country')}
                                                options={this.state.selectCountry}
                                                placeholder=""
                                                isSearchable={false}
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
                                        <label>Home telephone number</label>
                                        <Grid>
                                            {this.updateFLAG(this.state.UpDataDetails.phone) && this.updateFLAG(this.state.UpDataDetails.phone) !== '' &&
                                                <ReactFlagsSelect placeholder="Country Code" onSelect={(e) => { this.updateFlags(e, 'flag_phone') }} name="flag_phone" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.UpDataDetails.phone)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder="phone"
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
                                        <label>Mobile phone number</label>
                                        <Grid>
                                            {this.updateFLAG(this.state.UpDataDetails.mobile) && this.updateFLAG(this.state.UpDataDetails.mobile) !== '' &&
                                                <ReactFlagsSelect placeholder="Country Code" onSelect={(e) => { this.updateFlags(e, 'flag_mobile') }} name="flag_mobile" showSelectedLabel={false} defaultCountry={this.updateFLAG(this.state.UpDataDetails.mobile)} />}
                                            <input type="text"
                                                className="Mobile_extra"
                                                placeholder="mobile"
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
                                        <label>Languages spoken</label>
                                        <Grid>
                                            <Select
                                                value={this.state.name_multi}
                                                name="languages"
                                                closeMenuOnSelect={false}
                                                onChange={(e) => { this.handleChange_multi(e, 'languages') }}
                                                options={this.state.languageData}
                                                placeholder=""
                                                isSearchable={false}
                                                className="profile-language"
                                                isMulti={true}
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

                <Grid className="insrnceTbl">
                    <Grid><h3>Insurance</h3></Grid>
                    <Table>
                        <thead>
                            <tr>
                                <th>Country of insurance</th>
                                <th>Insurance Company</th>
                                <th>Insurance Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Germany</td>
                                <td>Insure Me GmbH</td>
                                <td>89212318416514</td>
                                <td><img src={require('../../../../assets/images/moreicon.jpg')} alt="" title="" /></td>
                            </tr>
                            <tr>
                                <td>Germany</td>
                                <td>Insure Me GmbH</td>
                                <td>89212318416514</td>
                                <td><img src={require('../../../../assets/images/moreicon.jpg')} alt="" title="" /></td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid>

                <Grid className="infoSub">
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Grid><input type="submit" onClick={this.saveUserData} value="Save changes" /></Grid>
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