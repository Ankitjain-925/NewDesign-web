import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import axios from 'axios';
import { LanguageFetchReducer } from './../../../actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import npmCountryList from 'react-select-country-list';
import * as AustraliaC from '../../../Components/insuranceCompanies/australia.json';
import * as AustriaC from '../../../Components/insuranceCompanies/austria.json';
import * as NetherlandC from '../../../Components/insuranceCompanies/dutch.json';
import * as GermanC from '../../../Components/insuranceCompanies/german.json';
import * as PhillipinesC from '../../../Components/insuranceCompanies/phillippines.json';
import * as SwitzerlandC from '../../../Components/insuranceCompanies/switzerland.json';
import * as AmericaC from '../../../Components/insuranceCompanies/us.json';
import * as ThailandC from '../../../Components/insuranceCompanies/thailand.json';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderImage: false,
            fileattach1: false,
            fileattach2: false,
            uploadLicence: [],
            CreateKYC: {},
            err1: false,
            err_pdf: false,
            err_document: false,
            success: false,
            filederr: false,
            fileupods: false,
            KYC_ID: "",
            KYC_LICENSE: '',
            selectedOption: null,
            selectedCountry: null,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount() {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        this.getKYC();
        // console.log("444", npmCountry)
    }


    getKYC() {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/User/getKyc/' + user_id,
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.data) {
                    this.setState({ personalinfo: response.data.fulldata, loaderImage: false }, () => {
                        if (this.state.personalinfo.attachment && this.state.personalinfo.attachment.length > 0) {
                            var KYC_ID = this.state.personalinfo.attachment && this.state.personalinfo.attachment.length > 0 && this.state.personalinfo.attachment[0] && this.state.personalinfo.attachment[0].file && this.state.personalinfo.attachment[0].file
                            if (KYC_ID) {
                                KYC_ID = (KYC_ID.split('KYC/')[1]).split("&bucket=")[0]
                                this.setState({ KYC_ID: KYC_ID })
                            }
                            var KYC_LICENSE = this.state.personalinfo.attachment && this.state.personalinfo.attachment.length > 0 && this.state.personalinfo.attachment[1] && this.state.personalinfo.attachment[1].file && this.state.personalinfo.attachment[1].file
                            if (KYC_LICENSE) {
                                KYC_LICENSE = (KYC_LICENSE.split('KYC/')[1]).split("&bucket=")[0]
                                this.setState({ KYC_LICENSE: KYC_LICENSE })
                            }
                        }
                    })
                    this.setState({
                        CreateKYC: response.data.fulldata
                    })
                    this.setState({ selectedCountry: response.data.fulldata.country })
                }
                else {
                    this.setState({
                        CreateKYC: { number: '', authority: '', country: 'US', attachment: [] }, selectedCountry: 'US',
                    })
                }

            }).catch(err => {
                console.log("ERROR", err)
            })
    }

    newEntryState1 = (e) => {
        const state = this.state.CreateKYC;
        if (e.target.name == 'authority') {
            const q = e.target.value.toLowerCase();
            this.setState({ q }, () => this.filterList());
        }
        state[e.target.name] = e.target.value;
        this.setState({ CreateKYC: state });
    }
    selectCountry = (event) => {
        const state = this.state.CreateKYC;
        state['country'] = event;
        this.setState({ CreateKYC: state });
        this.setState({ selectedCountry: event })
    }

    filterList() {
        let iCompany;
        switch (this.state.this.state.selectedCountry) {
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
        const state = this.state.CreateKYC;
        state['authority'] = event;
        this.setState({ CreateKYC: state });
        if (this.state.active === event) {
            this.setState({ active: null })
        } else {
            this.setState({ active: event })
        }
    }

    patientTrack = () => {
        this.props.history.push('/doctor/emergencyaccess');
    };
    AttachKyc(event) {
        if (event.target.files[0].type === "application/pdf" || event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png") {
            this.setState({ loaderImage: true });
            this.setState({ isfileuploadmulti: true })
            event.preventDefault();
            var namefield = event.target.name;
            const data = new FormData()
            for (var i = 0; i < event.target.files.length; i++) {
                var file = event.target.files[i];
                let profile_id = this.props.stateLoginValueAim.user.profile_id
                let fileParts = event.target.files[i].name.split('.');
                let fileName = fileParts[0];
                let fileType = fileParts[1];
                axios.post(sitedata.data.path + '/aws/sign_s3', {
                    fileName: fileName,
                    fileType: fileType,
                    folders: `${profile_id}/KYC/`,
                    bucket: this.props.stateLoginValueAim.user.bucket
                })
                    .then(response => {

                        if (namefield === "UploadID") {
                            this.setState({ fileattach1: response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket })
                        }
                        else {
                            this.setState({ fileattach2: response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket })
                        }
                        this.setState({
                            loaderImage: false, fileupods: true
                        });
                        setTimeout(
                            function () {
                                this.setState({ fileupods: false });
                            }
                                .bind(this),
                            3000
                        );
                        var returnData = response.data.data.returnData;
                        var signedRequest = returnData.signedRequest;
                        var url = returnData.url;


                        // Put the fileType in the headers for the upload
                        var options = {
                            headers: {
                                'Content-Type': fileType
                            }
                        };
                        axios.put('https://cors-anywhere.herokuapp.com/' + signedRequest, file, options)
                            .then(result => {

                                //   this.setState({success: true});
                            })
                            .catch(error => {
                                console.log("ERROR " + JSON.stringify(error));
                            })
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error));
                    })
            }
        }
        else { this.setState({ err_pdf: true, err_document: false, err1: false }) }
    }
    saveKYC() {
        var data = this.state.CreateKYC;
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        // if (this.state.fileattach1 && this.state.fileattach2) {
        data.user_id = user_id;
        this.setState({ err_document: false });
        var attachment = this.state.CreateKYC.attachment;
        if (this.state.fileattach1) {
            var index = attachment.map(function (e) { return e.type; }).indexOf('UploadID')

            if (index > -1) {
                attachment[index] = { type: 'UploadID', file: this.state.fileattach1 }
            } else {
                attachment.push({ type: 'UploadID', file: this.state.fileattach1 })
            }
        }
        if (this.state.fileattach2) {
            var index = attachment.map(function (e) { return e.type; }).indexOf('UploadLicense')

            if (index > -1) {
                attachment[index] = { type: 'UploadLicense', file: this.state.fileattach2 }
            } else {
                attachment.push({ type: 'UploadLicense', file: this.state.fileattach2 });
            }
        }
        data.attachment = attachment;
        if (this.state.agree) {
            this.setState({ loaderImage: true })
            if (data._id) {
                axios.put(sitedata.data.path + '/User/updateKyc/' + data._id, data,
                    {
                        headers: {
                            'token': user_token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if (response.data.hassuccessed) {
                            this.setState({
                                success: true, err1: false, agree: false, CreateKYC: {}, fileattach1: false, fileattach2: false, loaderImage: false
                            })
                            setTimeout(
                                function () {
                                    this.setState({ success: false });
                                }
                                    .bind(this),
                                3000
                            );
                        }
                        this.getKYC();

                    })

            }
            else {

                axios.post(sitedata.data.path + '/User/Addkyc', data,
                    {
                        headers: {
                            'token': user_token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if (response.data.hassuccessed) {
                            this.setState({
                                success: true, err1: false, agree: false, CreateKYC: {}, fileattach1: false, fileattach2: false, loaderImage: false
                            })
                            setTimeout(
                                function () {
                                    this.setState({ success: false });
                                }
                                    .bind(this),
                                3000
                            );
                        }
                        this.getKYC();
                    })
            }
        }
        else {
            this.setState({ err1: true })
        }
        // }
        // else {
        //     this.setState({ err_document: true });
        // }
    }
    cancelKYC = () => {
        this.getKYC();
    };
    render() {

        return (
            <div>
                <Grid>
                    <Grid className="patientKyc">
                        <h5>Patient ID / KYC</h5>
                        <p>Please enter your healthcare insurance data and
                                                            upload a copy of your ID and heathcare insurance card into your account</p>
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4}>

                            <Grid className="kycForms">
                                <Grid><label>Country</label></Grid>
                                <Grid>
                                    <Select
                                        value={this.state.selectedCountry}
                                        onChange={this.handleChangeCountry}
                                        options={[]}
                                        placeholder=""
                                        isSearchable={false}
                                        className="cntryDropKyc"
                                    />
                                </Grid>
                            </Grid>

                            <Grid className="kycForms">
                                <Grid><label>Insurance Company</label></Grid>
                                <Grid><input type="text" /></Grid>
                            </Grid>

                            <Grid className="kycForms">
                                <Grid><label>Insurance Number</label></Grid>
                                <Grid><input type="text" /></Grid>
                            </Grid>

                            <Grid className="kycForms sprtImg">
                                <Grid><label>Upload a photo of your ID Card</label></Grid>
                                <Grid className="browsInput">
                                    <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                    <a>Browse <input type="file" /></a> or drag here
                                                            </Grid>
                                <p>Supported file types: .jpg, .png, .pdf</p>
                            </Grid>

                            <Grid className="kycForms sprtImg">
                                <Grid><label>Upload a photo of your ID Card</label></Grid>
                                <Grid className="browsInput">
                                    <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                    <a>Browse <input type="file" /></a> or drag here
                                                            </Grid>
                                <p>Supported file types: .jpg, .png, .pdf</p>
                            </Grid>

                        </Grid>
                        <Grid className="clear"> </Grid>
                    </Grid>

                    <Grid className="aceptTermsPlcy">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="checkedB"
                                    color="#00ABAF"
                                />
                            }
                            label="By clicking this you accept Aimeidis terms and its privacy policy"
                        />
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4} className="kycSaveChng">
                            <input type="submit" value="Save changes" />
                        </Grid>
                    </Grid>

                    <Grid className="licensProof">
                        <p>You are never obligated to upload your license or any other proof of ID.</p>
                        <p>In the critical environment it makes a unique identification and comparison to the existing helthcare data much easier, when you do. Also the deduction of healthcare services with your insurance company is much easier that way.</p>
                    </Grid>

                </Grid>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index));