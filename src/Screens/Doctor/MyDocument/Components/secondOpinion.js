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
// import * as translationDE from '../../../translations/de_json_proofread_13072020.json';
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
            message: ''
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

    saveUserData(id) {
        this.setState({ serverMsg: "" })
        if (this.state.uploadedimage == "") {
            this.setState({ serverMsg: "please upload documents" })
        } else {
            this.setState({ loaderImage: true });
            const user_token = this.props.stateLoginValueAim.token;
            axios.put(sitedata.data.path + '/UserProfile/UpdateSickCertificate/' + id, {
                docs: this.state.uploadedimage,
            }, {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((responce) => {
                    this.setState({ serverMsg: responce.data.message })
                    this.setState({ loaderImage: false });
                })
        }
    }

    UploadFile(event, patient_profile_id, bucket, id) {
        this.setState({ loaderImage: true });
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
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
                let { remove_inquiry, yes, no,update_inquiry , are_u_sure_remove_inquiry} = translate;
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
                                    this.updateCertificateDetails(status, id)
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
        this.setState({ openPrescp: true, opinionData: data });
    };
    handleClosePrescp = () => {
        this.setState({ openPrescp: false });
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
            $imagePreview = (<img style={{ borderRadius: "10%", maxWidth: 350, marginBottom: 10 }} src={imagePreviewUrl} />);
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
        let { capab_Doctors, see_details, remove, decline, accept, status, sent, on, sent_on, Case, Patient, what_ur_profession, accept, decline, remove, Pending, request, edit, not_mentioned, Rejected, Answered, Cancelled, req_updated_successfully, sick_cert, my_doc, New, inquiry,
            short_msg, previous, next, doc_aimedis_private, Annotations, details, questions, how_u_feeling, is_ur_temp_high_to_38, which_symptoms_do_u_hav, show, since_when, have_u_already_been_sick, how_long_do_u_unable_to_work, it_is_known_dieseas, r_u_tracking_medi, do_u_hv_allergies, } = translate

        return (
            <div>
                {this.state.successfullsent && <div className="success_message">{req_updated_successfully}</div>}
                <Grid className="presOpinionIner">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>{Case}</Th>
                                <Th>{sent_on}</Th>
                                <Th>{Pateint}</Th>
                                <Th>{status}</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {MypatientsData && MypatientsData.length > 0 && MypatientsData.map((data, index) => (
                                <Tr>
                                    <Td>{data.which_symptomps ? data.which_symptomps : 'Not mentioned'}</Td>
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
                                                {data.status == 'free' && <li onClick={() => { this.handleOpenPrescp('accept', data._id) }}><a><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{accept}</a></li>}
                                                {data.status == 'free' && <li onClick={() => { this.updateCertificate('decline', data._id) }}><a><img src={require('../../../../assets/images/plus.png')} alt="" title="" />{decline}</a></li>}
                                                {data.status !== 'remove' && <li onClick={() => { this.removePrsecription('remove', data._id) }}><a><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{remove}</a></li>}
                                            </ul>
                                        </a>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {/* Model setup */}
                    {/* <Modal
                        open={this.state.openPrescp}
                        onClose={this.handleClosePrescp}
                        className="opinBoxModel">
                        <Grid className="opinBoxCntnt">
                            <Grid className="opinBoxCntntIner">
                                <Grid className="opinCourse">
                                    <Grid className="opinCloseBtn">
                                        <a onClick={this.handleClosePrescp}>
                                            <img src={require('../../../../assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <p>Edit inquiry</p>
                                    <Grid><label>Second Opinion</label></Grid>
                                </Grid>
                                {this.state.err_pdf && <div className="err_message">Please upload PDF, PNG and JPEG file</div>}
                                <Grid className="shrHlthMain">
                                    <Grid className="stndrdQues">
                                        <h3>Specialist and standard questions</h3>
                                        <Grid className="splestQues">
                                            <Grid><label>Specialist</label></Grid>
                                            <Grid><h3>{this.state.AddSecond && this.state.AddSecond.docProfile && this.state.AddSecond.docProfile.first_name && this.state.AddSecond.docProfile.first_name} {this.state.AddSecond && this.state.AddSecond.docProfile && this.state.AddSecond.docProfile.last_name && this.state.AddSecond.docProfile.last_name}</h3></Grid>
                                        </Grid>
                                        <Grid className="recevPrescp">
                                            <Grid className="recevPrescpLbl"><label>How would you like to receive the Second Opinion?</label></Grid>
                                            <Grid className="recevPrescpChk">
                                                <FormControlLabel control={<Radio />} name="online_offline" value="online" color="#00ABAF" checked={this.state.AddSecond.online_offline === 'online'} onChange={this.AddState} label="Online" />
                                                <FormControlLabel control={<Radio />} name="online_offline" color="#00ABAF" value="offline" checked={this.state.AddSecond.online_offline === 'offline'} onChange={this.AddState} label="Home address mailbox" />
                                            </Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>Your profession</label></Grid>
                                            <Grid><input type="text" name="professions" value={this.state.AddSecond.professions} onChange={this.AddState} /></Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>Annotations / details / questions</label></Grid>
                                            <Grid><textarea name="details" value={this.state.AddSecond.details} onChange={this.AddState}></textarea></Grid>
                                        </Grid>
                                        <Grid className="attchForms attchImg">
                                            <Grid><label>Attachments</label></Grid>
                                            <label class="attached_file">Attached Document -
                                        {this.state.AddSecond && this.state.AddSecond.documents && this.state.AddSecond.documents.map((items) => (
                                                <a>{items.filename && (items.filename.split('second_opinion/')[1]).split("&bucket=")[0]}</a>
                                            ))}
                                            </label>
                                            <FileUploader name="UploadDocument" fileUpload={this.fileUpload} />
                                            {/* <Grid className="attchbrowsInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>Browse <input type="file" id="UploadDocument" name="UploadDocument" onChange={(e) => this.UploadFile(e)} /></a> or drag here
                                        </Grid> */}
                    {/* <p>Supported file types: .jpg, .png, .pdf</p> 
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid className="infoShwHidBrdr"></Grid>
                                <Grid className="infoShwHidIner">
                                    <Grid className="infoShwSave">
                                        {/* <input type="submit" onClick={this.SubmitPrescription} value="Edit entry" /> 
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal> */}
                    {/* End of Model setup */}

                    {/* Reject Model setup */}
                    <Modal
                        open={this.state.openReject}
                        onClose={this.handleCloseReject}
                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme" : " "}>
                        <Grid className="rejectBoxCntnt">
                            <Grid className="rejectCourse">
                                <Grid className="rejectCloseBtn">
                                    <a onClick={this.handleCloseReject}>
                                        <img src={require('../../../../assets/images/close-search.svg')} alt="" title="" />
                                    </a>
                                </Grid>
                                <p onClick={this.handleCloseReject}>{back}</p>
                                <Grid><label>{inqstatus} {inquiry}</label></Grid>
                            </Grid>
                            <Grid className="shrtRejctMsg">
                                <Grid><label>{short_msg}</label></Grid>
                                <Grid><textarea onChange={(e) => this.setState({ message: e.target.value })}></textarea></Grid>
                                <Grid><input type="submit" value={inqstatus} onChange={() => this.updateCertificateDetails(inqstatus, this.state.selected_id)} /></Grid>
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