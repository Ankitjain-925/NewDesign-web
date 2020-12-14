import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import sitedata, { data } from '../../../../sitedata';
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginReducerAim } from './../../../Login/actions';
import { Settings } from './../../../Login/setting';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { LanguageFetchReducer } from './../../../actions';
import { getDate, getImage } from './../../../Components/BasicMethod/index';
import * as translationEN from '../../../../translations/en.json';
import * as translationDE from '../../../../translations/de.json';
import * as translationPT from '../../../../translations/pt.json';
import * as translationSP from '../../../../translations/sp.json';
import * as translationRS from '../../../../translations/rs.json';
import * as translationSW from '../../../../translations/sw.json';
import * as translationCH from '../../../../translations/ch.json';
import * as translationNL from '../../../../translations/nl.json';

import FileUploader from './../../../Components/FileUploader/index';
import Loader from './../../../Components/Loader/index.js';

function TabContainer(props) {
    return (
        <Typography component="div" className="tabsCntnts">
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPrescp: false,
            openReject: false,
            specialistOption: null,
            value: 0,
            MypatientsData: [],
            opinionData: {},
            inqstatus: null,
            message: '',
            fileattach: [],
            uploadedimage: '',
            success: false,
            send_to_timeline : false,
        };
    }

    componentDidMount() {
        this.getMypatientsData()
    }

    getMypatientsData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        axios.get(sitedata.data.path + '/UserProfile/GetSecondOpinion/', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.hassuccessed) {
                var images = [];
                response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
                    var find = item && item.profile_image && item.profile_image
                    if (find) {
                        var find1 = find.split('.com/')[1]

                        axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                            .then((response2) => {
                                if (response2.data.hassuccessed) {
                                    item.new_image = response2.data.data
                                    images.push({ image: find, new_image: response2.data.data })
                                    this.setState({ images: images })
                                }
                            })
                    }
                })

                // this.setState({ MypatientsData: response.data.data });
                var totalPage = Math.ceil(response.data.data.length / 10);
                this.setState({ AllPres: response.data.data, loaderImage: false, totalPage: totalPage, currentPage: 1 },
                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i)
                            }
                            this.setState({ MypatientsData: this.state.AllPres.slice(0, 10), pages: pages })
                        }
                        else {
                            this.setState({ MypatientsData: this.state.AllPres })
                        }
                    })

            }
            this.setState({ loaderImage: false });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    updateCertificate = (status, id) => {
        // let sata = status.charAt(0).toUpperCase() + status.slice(1)
        this.setState({ inqstatus: status, selected_id: id })
        this.handleOpenReject();
    }

    updateCertificateDetails(status, id) {
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/GetSickCertificate/' + id, {
            status: status,
            doctor_name: this.props.myData.first_name + ' ' + this.state.props.last_name,
            type: "sick_certificate"
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.getMypatientsData();
        }).catch((error) => {
        });
    }

    getImage = (image) => {
        const myFilterData = this.state.images && this.state.images.length > 0 && this.state.images.filter((value, key) =>
            value.image === image);
        if (myFilterData && myFilterData.length > 0) {
            return myFilterData[0].new_image;
        }
    }

    saveUserData= (id, timeline, send=()=>{} ) =>{
     
        if(timeline){
            this.setState({send_to_timeline: true})
        }
        this.setState({ serverMsg: "", saveAttach: false })
        if (this.state.uploadedimage == "") {
            this.setState({ serverMsg: "please upload documents" })
        } else {
            this.setState({ loaderImage: true });
            const user_token = this.props.stateLoginValueAim.token;
            axios.put(sitedata.data.path + '/UserProfile/UpdateSecondOpinion/' + id, {
                attachfile: [this.state.uploadedimage],
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((responce) => {
                    send();
                    this.setState({ serverMsg: responce.data.message ? responce.data.message : responce.data.msg })
                    if (responce.data.hassuccessed) this.setState({ saveAttach: true })
                    setTimeout(
                        function () {
                            this.setState({ saveAttach: false, serverMsg: '' });
                        }
                            .bind(this),
                        3000
                    );
                    this.setState({ loaderImage: false });
                })
        }
    }
    UploadFile = (event, patient_profile_id, bucket, id) => {
        this.setState({ loaderImage: true });
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        if(file.name.split('.').pop()==='mp4'){
            this.setState({file: file, imagePreviewUrl: require('../../../../assets/images/videoIcon.png')});
        }
        if(file.name.split('.').pop()==='pdf'){
            this.setState({file: file, imagePreviewUrl: require('../../../../assets/images/pdfimg.png')});
        }
        else if(file.name.split('.').pop() ==='doc'|| file.name.split('.').pop() ==='docx' || file.name.split('.').pop() ==='xml' || file.name.split('.').pop() ==='txt'){
            this.setState({file: file, imagePreviewUrl: require('../../../../assets/images/txt1.png')});
        }
        else if(file.name.split('.').pop() ==='xls'|| file.name.split('.').pop() ==='xlsx' || file.name.split('.').pop() ==='xml'){
            this.setState({file: file, imagePreviewUrl: require('../../../../assets/images/xls1.svg')});
        }
        else if(file.name.split('.').pop() ==='csv'){
            this.setState({file: file, imagePreviewUrl: require('../../../../assets/images/csv1.png')});
        }
        else if(file.name.split('.').pop() ==='dcm'){
            this.setState({file: file, imagePreviewUrl: require('../../../../assets/images/dcm1.png')});
        }
        else{
            this.setState({file: file, imagePreviewUrl: URL.createObjectURL(file) });
        }
        // reader.onloadend = () => {
        //     this.setState({
        //         file: file,
        //         imagePreviewUrl: reader.result
        //     });
        // }
        let user_token = this.props.stateLoginValueAim.token;
        reader.readAsDataURL(file)
        const data = new FormData()
        for (var i = 0; i < event.target.files.length; i++) {
            var file1 = event.target.files[i];
            let fileParts = event.target.files[i].name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            if (fileType === 'pdf' || fileType === 'jpeg' || fileType === 'png' || fileType === 'jpg' || fileType === 'svg') {
                axios.post(sitedata.data.path + '/aws/sign_s3', {
                    fileName: fileName,
                    fileType: fileType,
                    folders: patient_profile_id + '/Trackrecord/',
                    bucket: bucket
                })
                    .then(response => {
                        var Filename = response.data.data.returnData.url + '&bucket=' + bucket;
                        this.setState({
                            loaderImage: false,
                            uploadDataFile: id,
                            uploadedimage: { filename: Filename, filetype: fileType }
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

                        if(fileType ==='pdf'){
                            fileType = 'application/pdf'
                        }
                        // Put the fileType in the headers for the upload
                        var options = {
                            headers: {
                                'Content-Type': fileType
                            }
                        };
                        axios.put( signedRequest, file1, options)
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
                let { UploadMust, yes } = translate;
                this.setState({ loaderImage: false });
                confirmAlert({
                    message: UploadMust,
                    buttons: [
                        {
                            label: yes,
                        },

                    ]
                })
            }
        }

    }

    updatePrescription = (status, id) => {
        this.setState({ inqstatus: status, selected_id: id, message: null })
        this.handleOpenReject();
    }

    deleteClickPatient = (status, id) => {
     
        if(status === 'accept' && !this.state.send_to_timeline){
            this.saveUserData(id, false, ()=>{
              
                this.UpdatetheStatus(status, id)
            });
        }
        else{
            this.UpdatetheStatus(status, id)
        }
    }
    UpdatetheStatus=(status, id)=>{
        let user_token = this.props.stateLoginValueAim.token
        const { message } = this.state
        axios.put(sitedata.data.path + '/UserProfile/GetSecondOpinion/' + id, {
            status: status,
            doctor_name: this.props.myData.first_name + ' ' + this.props.myData.last_name,
            short_msg: message,
            attachfile: [this.state.uploadedimage],
            type: 'second_opinion',
            send_to_timeline : true

        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ send_to_timeline: false, openPrescp: false, openReject: false })
            this.getMypatientsData();
        }).catch((error) => {
        });
    }

    removePrsecription = (status, id) => {
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
        let { update_inquiry, are_u_sure_remove_inquiry, yes, no,remove_inquiry } = translate;
        this.setState({ message: null });
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
                         {status && status === 'remove' ? <h1>{remove_inquiry}</h1> : <h1>{update_inquiry}</h1>}
                        <p>{are_u_sure_remove_inquiry}</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>{no}</button>
                            <button
                                onClick={() => {
                                    this.deleteClickPatient(status, id)
                                    onClose();
                                }}
                            >
                                {yes}
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }

    handleOpenPrescp = (data) => {
        let imagePreviewUrl = null
        if (data.status === 'accept' && data.attachfile && data.attachfile.length > 0) imagePreviewUrl = data.attachfile[0].filename;
        this.setState({ openPrescp: true, opinionData: data, imagePreviewUrl: imagePreviewUrl, saveAttach: false });
    };
    handleClosePrescp = () => {
        this.setState({ openPrescp: false, imagePreviewUrl: null, saveAttach: false });
    };


    handleOpenReject = () => {
        this.setState({ openReject: true });
    };
    handleCloseReject = () => {
        this.setState({ openReject: false });
    };

    //For chnage the page
    onChangePage = (pageNumber) => {
        this.setState({ MypatientsData: this.state.AllPres.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
    }

    render() {
        const { inqstatus, opinionData, MypatientsData, imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img style={{ borderRadius: "10%", maxWidth: 350, marginBottom: 25, marginTop: 20 }} src={imagePreviewUrl} />);
        }
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
        let { capab_Doctors, see_details, approve, decline, remove, prescription_inquiry, standerd_ques, questions, patient_health_status, sent, on, prescription, Pending, request, edit, Rejected, Answered, Cancelled, req_updated_successfully, sick_cert, my_doc, New, inquiry,
            doc_and_statnderd_ques, doc_aimedis_private, Annotations, details, Patient, recved_on, status, home_add_mailbox, how_u_like_rcv_pres, Medicine, Substance, Dose, mg, trade_name, atc_if_applicable, manufacturer, pack_size,
            Medications, allergies, dignoses, browse, or_drag_here, online, suported_file_type_jpg_png, snd_patient_timeline_email, next, reject, short_msg, previous, back, about, not_mentioned, sent_on, secnd_openion, plz_upload_png_jpg, specilist_and_secnd_openion, how_would_patient_like_to_rcv_secon_openion, patient_profession, attachments, attached_doc } = translate

        return (
            <div>
                {this.state.successfullsent && <div className="success_message">{req_updated_successfully}</div>}
                <Grid className="presOpinionIner">
                    {this.state.loaderImage && <Loader />}
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>{about}</Th>
                                <Th>{sent_on}</Th>
                                <Th>{Patient}</Th>
                                <Th>{status}</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {MypatientsData && MypatientsData.length > 0 && MypatientsData.map((data, index) => (
                                <Tr>
                                    <Td>{data.details ? data.details : 'Not mentioned'}</Td>
                                    <Td>{data.send_on ? getDate(data.send_on, this.props.settings.setting ? this.props.settings.setting.date_format : 'DD/MM/YYYY') : not_mentioned}</Td>
                                    <Td className="presImg"><img src={data.patient_info && data.patient_info.profile_image ? getImage(data.patient_info.profile_image, this.state.images) : require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.patient_info && data.patient_info.first_name && data.patient_info.first_name} {data.patient_info && data.patient_info.last_name && data.patient_info.last_name}</Td>
                                    {data.status === 'pending' && <Td><span className="revwYelow"></span>{Pending} </Td>}
                                    {data.status === 'accept' && <Td><span className="revwGren"></span>{Answered} </Td>}
                                    {data.status === 'decline' && <Td><span className="revwRed"></span> {Rejected}</Td>}
                                    {data.status === 'cancel' && <Td><span className="revwRed"></span> {Cancelled}</Td>}
                                    {data.status === 'free' && <Td><span className="revwGry"></span> {sent} {request}</Td>}
                                    <Td className="presEditDot scndOptionIner">
                                        <a className="openScndhrf">
                                            <img src={require('../../../../assets/images/three_dots_t.png')} alt="" title="" className="openScnd" />
                                            <ul>
                                                <li><a onClick={() => { this.handleOpenPrescp(data) }}><img src={require('../../../../assets/images/details.svg')} alt="" title="" />{see_details}</a></li>
                                                {(data.status == 'free' || data.status === 'pending') && <li onClick={() => { this.handleOpenPrescp(data) }}><a><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{approve}</a></li>}
                                                {(data.status == 'free' || data.status === 'pending') && <li onClick={() => { this.updateCertificate('decline', data._id) }}><a><img src={require('../../../../assets/images/plus.png')} alt="" title="" />{reject}</a></li>}
                                                {data.status !== 'remove' && <li onClick={() => { this.removePrsecription('remove', data._id) }}><a><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{remove}</a></li>}
                                            </ul>
                                        </a>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {/* Model setup */}
                    <Modal
                        open={this.state.openPrescp}
                        onClose={this.handleClosePrescp}
                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "darkTheme opinBoxModel" : "opinBoxModel"}
                    >
                        <Grid className="opinBoxCntnt">
                            <Grid className="opinBoxCntntIner">
                                <Grid className="opinCourse">
                                    <Grid className="opinCloseBtn">
                                        <a onClick={this.handleClosePrescp}>
                                            <img src={require('../../../../assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <p>{edit} {inquiry}</p>
                                    <Grid><label>{secnd_openion}</label></Grid>
                                </Grid>
                                {this.state.err_pdf && <div className="err_message">{plz_upload_png_jpg}</div>}
                                <Grid className="shrHlthMain">
                                    <Grid className="stndrdQues">
                                        <h3>{specilist_and_secnd_openion}</h3>
                                        <Grid className="splestQues">
                                            <Grid><label>{Patient}</label></Grid>
                                            <Grid><h3>{opinionData && opinionData.patient_info && opinionData.patient_info.first_name && opinionData.patient_info.first_name} {opinionData && opinionData.patient_info && opinionData.patient_info.last_name && opinionData.patient_info.last_name}</h3></Grid>
                                        </Grid>
                                        <Grid className="recevPrescp">
                                            <Grid className="recevPrescpLbl"><label>{how_would_patient_like_to_rcv_secon_openion}</label></Grid>
                                            <Grid className="recevPrescpChk">
                                                {opinionData.online_offline === 'online' ? online : home_add_mailbox}
                                            </Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>{patient_profession}</label></Grid>
                                            <Grid>{opinionData.professions}</Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                            <Grid>{opinionData.details}</Grid>
                                        </Grid>
                                        <Grid className="attchForms attchImg">
                                            <Grid><label>{attachments}</label></Grid>
                                            <label className="attached_file">{attached_doc} -
                                            {opinionData && opinionData.attachfile &&
                                                    <a>{opinionData.attachfile.filename && (opinionData.attachfile.filename.split('Trackrecord/')[1]).split("&bucket=")[0]}</a>
                                                }
                                            </label>
                                            <Grid className="scamUPInput">
                                                <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                                <a>{browse} <input type="file" onChange={(e) => this.UploadFile(e, opinionData.patient_profile_id, opinionData.patient_info.bucket, opinionData._id)} /></a> {or_drag_here}
                                            </Grid>
                                            {(opinionData.status !== 'accept') && !$imagePreview && <p>{suported_file_type_jpg_png}</p>}
                                            <Grid>{$imagePreview}</Grid>

                                           {/* {this.state.success && <Grid item xs={12} md={12}>
                                            <div onClick={() => this.saveUserData(opinionData._id, true)} className="approvBtn sendtotimelinenew">{snd_patient_timeline_email}</div>
                                                
                                            </Grid>} */}
                                            {this.state.serverMsg && this.state.serverMsg !== '' && <div className={this.state.saveAttach ? 'success_message' : 'err_message'}>{this.state.serverMsg}</div>}
                                            {/* <Grid className="attchbrowsInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>Browse <input type="file" id="UploadDocument" name="UploadDocument" onChange={(e) => this.UploadFile(e)} /></a> or drag here
                                        </Grid> */}
                                            {/* <p>Supported file types: .jpg, .png, .pdf</p> */}
                                        </Grid>

                                        <Grid className="infoShwHidIner">
                                            <Grid className="infoShwSave">
                                                {(opinionData.status !== 'accept' && opinionData.status !== 'decline') && <Grid container direction="row">
                                                    <Grid item xs={6} md={6}>
                                                        <input type="button" value={approve} onClick={() => this.deleteClickPatient('accept', opinionData._id)} className="approvBtn" />
                                                    </Grid>
                                                    <Grid item xs={6} md={6}>
                                                        <input type="button" value={reject} onClick={() => this.updatePrescription('decline', opinionData._id)} className="rejectBtn" />
                                                    </Grid>
                                                </Grid>}
                                                {/* <input type="submit" onClick={this.submit} value="Edit entry" /> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid className="infoShwHidBrdr"></Grid>
                            </Grid>
                        </Grid>
                    </Modal>
                    {/* End of Model setup */}

                    {/* Reject Model setup */}
                    <Modal
                        open={this.state.openReject}
                        onClose={this.handleCloseReject}
                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode === 'dark' ? "darkTheme" : ""}>
                        <Grid className="rejectBoxCntnt">
                            <Grid className="rejectCourse">
                                <Grid className="rejectCloseBtn">
                                    <a onClick={this.handleCloseReject}>
                                        <img src={require('../../../../assets/images/close-search.svg')} alt="" title="" />
                                    </a>
                                </Grid>
                                <p onClick={this.handleCloseReject}>{back}</p>
                                <Grid><label>{decline} {inquiry}</label></Grid>
                            </Grid>
                            <Grid className="shrtRejctMsg">
                                <Grid><label>{short_msg}</label></Grid>
                                <Grid><textarea onChange={(e) => this.setState({ message: e.target.value })}></textarea></Grid>
                                <Grid><input type="button" value={decline} onClick={() => this.deleteClickPatient(inqstatus, this.state.selected_id)} /></Grid>
                            </Grid>
                        </Grid>
                    </Modal>
                    {/* End of Reject Model setup */}
                    <Grid className="tablePagNum">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="totalOutOff">
                                    <a>{this.state.currentPage} of {this.state.totalPage}</a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {this.state.totalPage > 1 && <Grid className="prevNxtpag">
                                    {this.state.currentPage != 1 && <a className="prevpag" onClick={() => { this.onChangePage(this.state.currentPage - 1) }}>{previous}</a>}
                                    {this.state.pages && this.state.pages.length > 0 && this.state.pages.map((item, index) => (
                                        <a className={this.state.currentPage == item && "activePageDocutmet"} onClick={() => { this.onChangePage(item) }}>{item}</a>
                                    ))}
                                    {this.state.currentPage != this.state.totalPage && <a className="nxtpag" onClick={() => { this.onChangePage(this.state.currentPage + 1) }}>{next}</a>}
                                </Grid>}
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