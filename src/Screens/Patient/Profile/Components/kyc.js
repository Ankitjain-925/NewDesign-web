import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from '../../../../sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from './../../../actions';
import Select from 'react-select';
import npmCountryList from 'react-select-country-list';
import Loader from './../../../Components/Loader/index';
import * as AustraliaC from '../../../Components/insuranceCompanies/australia.json';
import * as AustriaC from '../../../Components/insuranceCompanies/austria.json';
import * as NetherlandC from '../../../Components/insuranceCompanies/dutch.json';
import * as GermanC from '../../../Components/insuranceCompanies/german.json';
import * as PhillipinesC from '../../../Components/insuranceCompanies/phillippines.json';
import * as SwitzerlandC from '../../../Components/insuranceCompanies/switzerland.json';
import * as AmericaC from '../../../Components/insuranceCompanies/us.json';
import * as ThailandC from '../../../Components/insuranceCompanies/thailand.json';
import FileUploader from './../../../Components/FileUploader/index';
import Checkbox from '@material-ui/core/Checkbox';
import { GetUrlImage } from './../../../Components/BasicMethod/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as translationEN from '../../../../translations/en.json';
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/en.json';

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
            CurrentCountry: {},
            allField: false,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount() {
        // new LogOut(this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user._id, this.logOutClick.bind(this))
        var npmCountry = npmCountryList().getData()
        this.setState({ selectCountry: npmCountry })
        this.getKYC();
    }

    //Get the Exist KYC
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
            }).then((response) => {
                if (response.data.data) {
                    this.setState({ personalinfo: response.data.fulldata, loaderImage: false }, () => {
                        if (this.state.personalinfo.attachment && this.state.personalinfo.attachment.length > 0) {
                            var KYC_ID = this.state.personalinfo.attachment && this.state.personalinfo.attachment.length > 0 && this.state.personalinfo.attachment[0] && this.state.personalinfo.attachment[0].file && this.state.personalinfo.attachment[0].file
                            if (KYC_ID) {
                                this.setState({KYC_i1 : KYC_ID })
                                KYC_ID = (KYC_ID.split('KYC/')[1]).split("&bucket=")[0]
                                this.setState({ KYC_ID: KYC_ID })
                            }
                            var KYC_LICENSE = this.state.personalinfo.attachment && this.state.personalinfo.attachment.length > 0 && this.state.personalinfo.attachment[1] && this.state.personalinfo.attachment[1].file && this.state.personalinfo.attachment[1].file
                            if (KYC_LICENSE) {
                                this.setState({KYC_l1 : KYC_LICENSE })
                                KYC_LICENSE = (KYC_LICENSE.split('KYC/')[1]).split("&bucket=")[0]
                                this.setState({ KYC_LICENSE: KYC_LICENSE })
                            }
                        }
                    })
                    this.setState({ CreateKYC: response.data.fulldata, selectedCountry: response.data.fulldata.country })
                    var getCountry = this.state.selectCountry && this.state.selectCountry.length > 0 && this.state.selectCountry.filter((item) => item.value === response.data.fulldata.country)
                    if (getCountry && getCountry.length > 0) {
                        this.setState({ CurrentCountry: getCountry[0] })
                    }
                }
                else {
                    this.setState({ loaderImage: false})
                    this.setState({ CreateKYC: { number: '', authority: '', country: 'US', attachment: [] }, selectedCountry: 'US', })
                }
            }).catch(err => { })
    }

    //set the state of authority
    newEntryState1 = (e) => {
        const state = this.state.CreateKYC;
        if (e.target.name == 'authority') {
            const q = e.target.value.toLowerCase();
            this.setState({ q }, () => this.filterList());
        }
        state[e.target.name] = e.target.value;
        this.setState({ CreateKYC: state });
    }

    // //Select country of Insurance
    // selectCountry = (event) => {
    //     const state = this.state.CreateKYC;
    //     state['country'] = event;
    //     this.setState({ CreateKYC: state });
    //     this.setState({ selectedCountry: event })
    // }

    //Get the list of insurances according the country
    filterList() {
        let iCompany;
        switch (this.state.selectedCountry) {
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
        iCompany = iCompany && iCompany.length > 0 && iCompany.filter((company) => {
            const companyLower = company.toLowerCase()
            return companyLower.indexOf(q) != -1;
        })
        this.setState({ filteredCompany: iCompany });
        if (this.state.q == '') {
            this.setState({ filteredCompany: [] });
        }
    }

    //Set the Insurance name from list or without list
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

    //Attach the documents
    fileUpload = (event, filed_name) => {
        if (event[0].type === "application/pdf" || event[0].type === "image/jpeg" || event[0].type === "image/png") {
            this.setState({ loaderImage: true, err_pdf: false, err_document: false, err1: false, isfileuploadmulti: true })
            var namefield = filed_name;
            for (var i = 0; i < event.length; i++) {
                var file = event[i];
                let profile_id = this.props.stateLoginValueAim.user.profile_id
                let fileParts = event[i].name.split('.');
                let fileName = fileParts[0];
                let fileType = fileParts[1];
                axios.post(sitedata.data.path + '/aws/sign_s3', {
                    fileName: fileName,
                    fileType: fileType,
                    folders: `${profile_id}/KYC/`,
                    bucket: this.props.stateLoginValueAim.user.bucket
                }).then(response => {
                    if (namefield === "UploadID") {
                        this.setState({ fileattach1: response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket })
                    }
                    else {
                        this.setState({ fileattach2: response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket })
                    }
                    this.setState({ fileupods: true });
                    setTimeout(() => { this.setState({ fileupods: false }) }, 3000);
                    var returnData = response.data.data.returnData;
                    var signedRequest = returnData.signedRequest;
                    var url = returnData.url;

                    // Put the fileType in the headers for the upload
                    var options = { headers: { 'Content-Type': fileType } };
                    axios.put('https://cors-anywhere.herokuapp.com/' + signedRequest, file, options)
                        .then(result => { this.setState({ loaderImage: false }) })
                        .catch(error => { })
                }).catch(error => { })
            }
        }
        else { this.setState({ err_pdf: true, err_document: false, err1: false }) }
    }

    //Save KYC Data 
    saveKYC = () => {

        var data = this.state.CreateKYC;
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        // if (this.state.fileattach1 && this.state.fileattach2) {
        data.user_id = user_id;
        var attachment = this.state.CreateKYC.attachment;
        if (this.state.fileattach1) {
            var index = attachment.map((e) => { return e.type; }).indexOf('UploadID')

            if (index > -1) {
                attachment[index] = { type: 'UploadID', file: this.state.fileattach1 }
            } else {
                attachment.push({ type: 'UploadID', file: this.state.fileattach1 })
            }
        }
        if (this.state.fileattach2) {
            var index = attachment.map((e) => { return e.type; }).indexOf('UploadLicense')

            if (index > -1) {
                attachment[index] = { type: 'UploadLicense', file: this.state.fileattach2 }
            } else {
                attachment.push({ type: 'UploadLicense', file: this.state.fileattach2 });
            }
        }
        data.attachment = attachment;
        if (this.state.CreateKYC && this.state.CreateKYC.country && this.state.CreateKYC.country !== '' && this.state.CreateKYC.number !== '' && this.state.CreateKYC.number && this.state.CreateKYC.authority && this.state.CreateKYC.authority !== '') {
            if (data.attachment && data.attachment.length > 0) {
                if (this.state.agree) {
                    this.setState({ loaderImage: true, err_document: false, allField: false })
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
                                    this.setState({ success: true, err1: false, agree: false, CreateKYC: {}, fileattach1: false, fileattach2: false, loaderImage: false })
                                    setTimeout(() => { this.setState({ success: false }); }, 3000);
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
                            }).then((response) => {
                                if (response.data.hassuccessed) {
                                    this.setState({ success: true, err1: false, agree: false, CreateKYC: {}, fileattach1: false, fileattach2: false, loaderImage: false })
                                    setTimeout(() => { this.setState({ success: false }) }, 3000);
                                }
                                this.getKYC();
                            })
                    }
                }
                else { this.setState({ err1: true, err_document: false, allField: false }) }
            }
            else { this.setState({ err_document: true, err1: false, allField: false }) }
        }
        else { this.setState({ allField: true }) }

    }

    //For updating and country
    EntryValueName = (value, name) => {
        const state = this.state.CreateKYC;
        state[name] = value.value;
        this.setState({ CurrentCountry: value, CreateKYC: state, selectedCountry: value.value });
    }

    //Reset the all Data of KYC
    cancelKYC = () => {
        this.getKYC();
    };

    render() {
        //company list generate from here
        const companyList = this.state.filteredCompany && this.state.filteredCompany.map(company => {
            return (
                <li value={company}
                    onClick={() => { this.setState({ q: company }); this.toggle(company); this.setState({ filteredCompany: [] }) }}
                >{company}</li>
            )
        });

        let translate;
      switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            case "pt":
                translate = translationPT.text
                break;
            case "sp":
                translate = translationSP.text
                break;
            case "rs":
                translate = translationRS.text
                break;
            case "nl":
                translate = translationNL.text
                break;
            case "ch":
                translate = translationCH.text
                break;
            case "sw":
                translate = translationSW.text
                break;
            case "default":
                translate = translationEN.text
        }
        let { patient_id, kyc, enter_healthcare_and_upload_data, plz_upload_png_jpg, plz_uplod_doc, plz_fill_all_fields, plz_accept_term, is, save_change, by_clicking_accept_aimedis_term, upload_id_card, updated_success, file_uploaded, attached_doc, u_r_nvr_obligate_to_upload_doc, email, title, degree, first, last, name, dob, gender, street, add, city, postal_code, country, home_telephone, phone, country_code, Delete,
            mobile_number, number, in_critical_enviroment_id, mobile, insurance, add_more, company, of} = translate;


        return (
            <div>
                {this.state.loaderImage && <Loader />}
                <Grid>
                    <Grid className="patientKyc">
                        <h5>{patient_id} / {kyc}</h5>
                        <p>{enter_healthcare_and_upload_data}</p>
                    </Grid>
                    {this.state.err_pdf && <div className="err_message">{plz_upload_png_jpg}</div>}
                    {this.state.err_document && <div className="err_message">{plz_uplod_doc}</div>}
                    {this.state.allField && <div className="err_message">{plz_fill_all_fields}</div>}
                    {this.state.err1 && <div className="err_message">{plz_accept_term}</div>}
                    {this.state.success && <div className="success_message">{kyc} {is} {updated_success}</div>}
                    {this.state.fileupods && <div className="success_message">{file_uploaded}</div>}
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4}>

                            <Grid className="kycForms">
                                <Grid><label>{country}</label></Grid>
                                {this.state.CreateKYC && this.state.CreateKYC.country &&
                                    <Grid>
                                        <Select
                                            value={this.state.CurrentCountry}
                                            onChange={(e) => this.EntryValueName(e, 'country')}
                                            options={this.state.selectCountry}
                                            placeholder=""
                                            isSearchable={false}
                                            name="country"
                                            className="cntryDrop"
                                        />
                                        {/* <ReactFlagsSelect
                                        className="KYCselectCountry"
                                        defaultCountry={this.state.CreateKYC.country}
                                        value={this.state.CreateKYC.country}
                                        onSelect = {this.selectCountry}
                                    /> */}
                                    </Grid>}
                            </Grid>

                            <Grid className="kycForms">
                                <Grid><label>{insurance} {company}</label></Grid>
                                {this.state.CreateKYC && this.state.CreateKYC.country && this.state.CreateKYC.country !== "" &&
                                    <Grid>
                                        <input type="text" name="authority" value={this.state.CreateKYC.authority} onChange={this.newEntryState1} />
                                        <ul className="insuranceHint" style={{ height: companyList && companyList.length > 0 ? '150px' : '' }}>
                                            {companyList}
                                        </ul>
                                    </Grid>}
                            </Grid>

                            <Grid className="kycForms">
                                <Grid><label>{insurance} {number}</label></Grid>
                                <Grid><input type="text" name="number" value={this.state.CreateKYC.number} onChange={this.newEntryState1} /></Grid>
                            </Grid>

                            {this.state.CreateKYC && this.state.CreateKYC.attachment && this.state.CreateKYC.attachment.length > 0 && this.state.CreateKYC.attachment.length == 2 ?
                                this.state.CreateKYC.attachment.map((value, index) => (
                                    <Grid>
                                        {value.type === 'UploadID' &&
                                            <Grid className="kycForms sprtImg">
                                                <Grid><label>{upload_id_card}</label></Grid>
                                                <Grid><label className="attached_file">{attached_doc} - <a onClick={()=>{GetUrlImage(this.state.KYC_i1)}}>{this.state.KYC_ID}</a></label></Grid>
                                                <FileUploader name="UploadID" fileUpload={this.fileUpload} />
                                                {/* <Grid className="browsInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>Browse <input type="file" name="UploadID" onChange={this.AttachKyc}/></a> or drag here
                                        </Grid>
                                        <p>Supported file types: .jpg, .png, .pdf</p> */}
                                            </Grid>}

                                        {value.type === 'UploadLicense' &&
                                            <Grid className="kycForms sprtImg">
                                                <Grid><label>{upload_id_card}</label></Grid>
                                                <Grid><label className="attached_file">{attached_doc} - <a onClick={()=>{GetUrlImage(this.state.KYC_l1)}}>{this.state.KYC_LICENSE}</a></label></Grid>
                                                <FileUploader name="UploadLicense" fileUpload={this.fileUpload} />
                                            </Grid>}
                                    </Grid>
                                ))
                                :
                                this.state.CreateKYC && this.state.CreateKYC.attachment && this.state.CreateKYC.attachment.length > 0 && this.state.CreateKYC.attachment.length == 1 ?
                                    this.state.CreateKYC.attachment.map((value, index) => (
                                        <Grid>
                                            {value.type === 'UploadID' &&
                                                <Grid>
                                                    <Grid className="kycForms sprtImg">
                                                        <Grid><label>{upload_id_card}</label></Grid>
                                                        <Grid><label className="attached_file">{attached_doc} - <a onClick={()=>{GetUrlImage(this.state.KYC_i1)}}>{this.state.KYC_ID}</a></label></Grid>
                                                        <FileUploader name="UploadID" fileUpload={this.fileUpload} />
                                                    </Grid>
                                                    <Grid className="kycForms sprtImg">
                                                        <Grid><label>{upload_id_card}</label></Grid>
                                                        <FileUploader name="UploadLicense" fileUpload={this.fileUpload} />
                                                    </Grid>
                                                </Grid>}
                                            {value.type === 'UploadLicense' &&
                                                <Grid>
                                                    <Grid className="kycForms sprtImg">
                                                        <Grid><label>{upload_id_card}</label></Grid>
                                                        <FileUploader name="UploadID" fileUpload={this.fileUpload} />
                                                    </Grid>

                                                    <Grid className="kycForms sprtImg">
                                                        <Grid><label>{upload_id_card}</label></Grid>
                                                        <Grid><label className="attached_file">{attached_doc} - <a onClick={()=>{GetUrlImage(this.state.KYC_l1)}}>{this.state.KYC_LICENSE}</a></label></Grid>
                                                        <FileUploader name="UploadLicense" fileUpload={this.fileUpload} />
                                                    </Grid>
                                                </Grid>}
                                        </Grid>
                                    ))
                                    :
                                    <Grid>
                                        <Grid className="kycForms sprtImg">
                                            <Grid><label>{upload_id_card}</label></Grid>
                                            <FileUploader name="UploadID" fileUpload={this.fileUpload} />
                                        </Grid>

                                        <Grid className="kycForms sprtImg">
                                            <Grid><label>{upload_id_card}</label></Grid>
                                            <FileUploader name="UploadLicense" fileUpload={this.fileUpload} />
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                        <Grid className="clear"> </Grid>
                    </Grid>

                    <Grid className="aceptTermsPlcy">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="checkedB"
                                    color="#00ABAF"
                                    checked={this.state.agree === true && this.state.agree} onChange={(e) => { this.setState({ agree: !this.state.agree }) }}
                                />
                            }
                            label={by_clicking_accept_aimedis_term}
                        />
                    </Grid>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={4} className="kycSaveChng">
                            <input type="submit" onClick={this.saveKYC} value={save_change} />
                        </Grid>
                    </Grid>

                    <Grid className="licensProof">
                        <p>{u_r_nvr_obligate_to_upload_doc}</p>
                        <p>{in_critical_enviroment_id}</p>
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
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));