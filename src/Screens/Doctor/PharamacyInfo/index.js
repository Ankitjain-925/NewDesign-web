import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
// import { Doctorset } from '../../Doctor/actions';
// import { filterate } from '../../Doctor/filteraction';
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from './../../actions';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import sitedata from './../../../sitedata';
import axios from 'axios';
import Geocode from "react-geocode";
import { confirmAlert } from 'react-confirm-alert'; // Import
import * as translationEN from '../../../translations/en_json_proofread_13072020.json';
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addtopatientlist: false,
            searchName: [],
            loaderImage: false,
            UpDataDetails: [],
            radius: '',
            name: '',
            searchLocation: [],
            newEntry: {},
            success: false,
            isadded: false,
            firstPatient_id: false,
            imagePreviewUrl: null,
        };

    }

    //For loggedout if logged in user is deleted 
    componentDidMount() {
        this.props.Settings(this.props.stateLoginValueAim.token);
        this.getUserData();
        this.getGeoLocation();
    }

    //Custom date
    formatDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return year + '-' + month + '-' + day;
    }
    //Custom time 
    timeNow = () => {
        var d = new Date(),
            h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
            m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        return h + ':' + m;
    }
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({ clat: position.coords.latitude })
                this.setState({ clng: position.coords.longitude })
                Geocode.setApiKey("AIzaSyCNLBs_RtZoI4jdrZg_CjBp9hEM6SBIh-4");
                Geocode.enableDebug();
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(response => {
                    const address = response.results[0].formatted_address;
                    this.setState({ MycurrentLocationName: address })
                }, error => {
                    console.error(error);
                });
            }
            )
        }
    }

    getUserData() {
        this.setState({ loaderImage: true, UpDataDetails: [] });
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

            this.setState({ UpDataDetails: response.data.data, city: response.data.data.city, area: response.data.data.area, profile_id: response.data.data.profile_id });


        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }


    findByRadius = (e) => {
        this.setState({ radius: e.target.value, searchName: [] }, () => this.getlocation());
    }
    findByName = (e) => {
        let newEntry = this.state.newEntry;
      
        if (newEntry.pharmacy_id) {
            newEntry.pharmacy_id = ''
        }
        this.setState({ name: e.target.value, searchLocation: [], newEntry: newEntry }, () => this.getName());
    }
    getName = () => {
        var user_token = this.props.stateLoginValueAim.token;
       
        if (this.state.name && this.state.name !== '') {
            axios.get(sitedata.data.path + '/emergency_record/getPharmacy/search/' + this.state.name, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    this.setState({ searchName: response.data.data })
                })
        }
        else {
          
            this.setState({ searchName: [] })
        }
    }

    updateEntryState = (e) => {
        const state = this.state.newEntry
        state[e.target.name] = e.target.value;
        this.setState({ newEntry: state });
    }

    CertificateAttach = (event) => {

        if (this.state.newEntry.patient_id) {
            // this.setState({file:})
            this.setState({ isfileupload: true, firstPatient_id: false })
            event.preventDefault();
            // let file = event.target.files[0];

            var user_id = this.props.stateLoginValueAim.user._id;
            var user_token = this.props.stateLoginValueAim.token;
            const patient_id = this.state.newEntry.patient_id
            const data = new FormData()
            let reader = new FileReader();
            data.append('uploadCertificate', event.target.files[0])
            this.setState({ loaderImage: true })
            for (var i = 0; i < event.target.files.length; i++) {
                var file = event.target.files[i];
                let fileParts = event.target.files[i].name.split('.');
                let fileName = fileParts[0];
                let fileType = fileParts[1];
                if (fileType === 'pdf' || fileType === 'jpeg' || fileType === 'png' || fileType === 'jpg' || fileType === 'svg') {
                    if (fileType !== 'pdf') {
                        reader.onloadend = () => {

                            this.setState({
                                file: file,
                                imagePreviewUrl: reader.result
                            });
                        }
                        reader.readAsDataURL(file)
                    }
                    else {

                    }
                    axios.post(sitedata.data.path + '/aws/sign_s3', {
                        fileName: fileName,
                        fileType: fileType,
                        folders: `${patient_id}/Trackrecord/`,
                        bucket: this.props.stateLoginValueAim.user.bucket
                    })
                        .then(response => {
                            var Filename = response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket;
                            this.setState({
                                loaderImage: false,
                                filename: [{ filename: Filename, filetype: fileType }]
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
                                 
                                    this.setState({ success: true });
                                })
                                .catch(error => {
                                    
                                })
                        })
                        .catch(error => {
                          
                        })
                }
                else {
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
                    let { UploadMust } = translate;
                    this.setState({ loaderImage: false });
                    confirmAlert({
                        message: UploadMust,
                        buttons: [
                            {
                                label: 'YES',
                            },

                        ]
                    })
                }
            }
        }
        else {
            this.setState({
                firstPatient_id: true
            })
            // event.target.files = []
            return false
        }
    }

    getName = () => {
        var user_token = this.props.stateLoginValueAim.token;
        if (this.state.name && this.state.name !== '') {
            axios.get(sitedata.data.path + '/emergency_record/getPharmacy/search/' + this.state.name, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    let data = response.data.data.filter(dat => dat.first_name)
                    this.setState({ searchName: data })
                })
        }
    }

    SetIds = (item) => {
      
        const state = this.state.newEntry
        state['pharmacy_id'] = item.profile_id;
        this.setState({ newEntry: state, radius: '', name: item.first_name, searchLocation: [], searchName: [] });
    }

    getlocation = () => {
        if (this.state.radius && this.state.radius !== '') {
            let radius, Latitude, longitude
            if (this.state.radius) {
                radius = this.state.radius + '000'
            }
            longitude = this.state.clng
            Latitude = this.state.clat

            if (radius && Latitude && longitude) {
                axios.get(sitedata.data.path + '/emergency_record/getLocationPharmacy/' + radius, {
                    params: {
                        longitude: longitude,
                        Latitude: Latitude
                    }
                })
                    .then((response) => {
                        this.setState({ searchLocation: response.data.data })
                    })
            }
        }
    }

    AddTrack = () => {
        this.setState({ firstPatient_id: false })
        var data = {};
        var user_id = this.state.newEntry.pharmacy_id;
        var patient_id = this.state.newEntry.patient_id;
        var doctor_id = this.props.stateLoginValueAim.user.profile_id;
        var user_token = this.props.stateLoginValueAim.token;
        var remark = this.state.newEntry.remark
        if (this.state.isfileupload) {
            data.attachfile = this.state.filename
        }
        data.created_on = this.formatDate();
        data.created_at = this.timeNow();
        data.created_by = this.props.stateLoginValueAim.user._id;
        data.type = 'prescription';
        data.datetime_on = new Date();
        data.patient_id = patient_id;
        data.remark = remark;

       
        if (!user_id || user_id === '' || !patient_id || patient_id === '' || !this.state.isfileupload) {
            this.setState({ compulsary: true })
        }
        else {
            this.setState({ loaderImage: true, compulsary: false })
            axios.put(sitedata.data.path + '/emergency_record/AddstoredPre/' + user_id + '?' + 'addtopatient=' + this.state.addtopatientlist, { data },
                {
                    headers: {
                        'token': user_token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    this.setState({
                        radius: '', name: '', addtopatientlist: false, isfileupload: false, fileattach: {}, loaderImage: false, newEntry: { patient_id: '', pharmacy_id: '' }, isadded: true
                    })
                    setTimeout(
                         () => {
                            this.setState({ isadded: false });
                            this.handleClosePharma();
                        },
                        3000
                    );

                })
        }
    }



    handleOpenPharma = () => {
        this.props.handleOpenPharma()
        // this.setState({ openPharma: true });
    };
    handleClosePharma = () => {
        this.props.handleClosePharma()
        // this.setState({ openPharma: false });
    };

    render() {
        const { openPharma } = this.props
        const { searchLocation, searchName } = this.state;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img style={{ borderRadius: "10%", maxWidth: 350, marginBottom: 10 }} src={imagePreviewUrl} />);
        }

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
        let { pharma_prescription, send_prescription_to_pharmacy, uplod_scanned_prescription, browse, or, or_drag_here, suported_file_type_jpg_png, patient_id, Pharmacy, search_pharmacy_by_name_id, show_pharmacy_within_radious, short_msg_optional, add_this_patient_journal,send_invite } = translate;

        return (
            <Grid item xs={12} md={1} className="MenuLeftUpr ">

                {/* Pharmacy Prescription */}
                <Modal
                    open={openPharma}
                    onClose={this.handleClosePharma}
                    className={this.props.settings&&this.props.settings.setting && this.props.settings.setting.mode &&this.props.settings.setting.mode === 'dark' ?"darkTheme":""}>
                    <Grid className="phrmBoxCntnt">
                        <Grid className="phrmCourse">
                            <Grid className="phrmCloseBtn">
                                <a onClick={this.handleClosePharma}>
                                    <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                </a>
                            </Grid>
                            {this.state.firstPatient_id && <div className="err_message">Please enter the patient id first</div>}
                            {this.state.isadded && <div className="success_message">Successfully added the information</div>}
                            {this.state.compulsary && <div className="err_message">Please Enter all the field</div>}
                            <Grid><label>{pharma_prescription}</label></Grid>
                            <p>{send_prescription_to_pharmacy}</p>
                        </Grid>
                        <Grid className="phrmLinkUpr">
                            <Grid className="upScanForms upScanImg">
                                <Grid><label>{uplod_scanned_prescription}</label></Grid>
                                {!$imagePreview && <Grid className="upScanInput">
                                    <a><img src={require('../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                    <a>{browse} <input type="file" onChange={this.CertificateAttach} /></a> {or_drag_here}
                                                                        </Grid>}
                                {!$imagePreview && <p>{suported_file_type_jpg_png}</p>}
                                {$imagePreview}
                                <div className="filetitle">{this.state.isfileupload && (
                                    this.state.fileattach && this.state.fileattach.length > 0 && this.state.fileattach.map((ite, ind) => (
                                        ite.filename
                                    )))
                                }</div>
                            </Grid>
                            <Grid className="scanInputs">
                                <Grid><label>{patient_id}</label></Grid>
                                <Grid><input type="text" onChange={this.updateEntryState} value={this.state.newEntry && this.state.newEntry.patient_id && this.state.newEntry.patient_id} name="patient_id" /></Grid>
                            </Grid>
                            <Grid className="scanInputs">
                                <Grid><label>{Pharmacy}</label></Grid>
                                <Grid className="scanInputPhrm dropdown-main">
                                    <input type="text" placeholder={search_pharmacy_by_name_id} onChange={this.findByName} value={this.state.newEntry.pharmacy_id ? (this.state.name + "- " + this.state.newEntry.pharmacy_id) : this.state.name} />
                                    <img src={require('../../../assets/images/srchInputField.svg')} alt="" title="" />
                                    <div className={searchName && searchName.length > 0 ? "show-content dropdown-content" : 'dropdown-content'}>
                                        {searchName.map(data => (
                                            <a onClick={() => this.SetIds(data)}>{data.first_name + " " + data.last_name}</a>
                                        ))}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid className="scanInputs">
                                <label className="or-label">{or}</label>
                            </Grid>
                            <Grid className="scanInputs">
                                <Grid><label>{show_pharmacy_within_radious}</label></Grid>
                                <Grid className="scanInputKm dropdown-main">
                                    <input type="text" value={this.state.radius} onChange={this.findByRadius} /><span>km</span>
                                    <div className={searchLocation && searchLocation.length > 0 ? "show-content dropdown-content" : 'dropdown-content'}>
                                        {searchLocation &&searchLocation.map(data => (
                                            <a onClick={() => this.SetIds(data)}>{data.first_name + " " + data.last_name}</a>
                                        ))}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid className="scanInputs shrtMsgOpt">
                                <Grid><label>{short_msg_optional}</label></Grid>
                                <Grid><textarea onChange={this.updateEntryState} name="remark"></textarea></Grid>
                            </Grid>
                            <Grid className="jurnlTatent">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="checkedB"
                                            color="#00ABAF"
                                            checked={this.state.addtopatientlist} onChange={(e) => { this.setState({ addtopatientlist: e.target.checked }) }} value={this.state.newEntry.pharmacy_id}
                                        />
                                    }
                                    label={add_this_patient_journal}
                                />
                            </Grid>
                            <Grid className="scanInputsSub">
                                <input type="submit" value={send_invite} onClick={this.AddTrack} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Pharmacy Prescription */}

            </Grid>
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
        settings,
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));