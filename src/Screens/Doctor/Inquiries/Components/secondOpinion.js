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
import * as translationEN from '../../../../translations/en_json_proofread_13072020.json';
import FileUploader from './../../../Components/FileUploader/index';
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
            message: '',
            fileattach:[],
            uploadedimage:'',
            success:false
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
                        console.log('find', find)
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
                console.log("response.data.data", response.data.data)
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
            axios.put(sitedata.data.path + '/UserProfile/UpdateSecondOpinion/' + id, {
                attachfile: this.state.uploadedimage,
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

    UploadFile = (event)  =>{
        let id = this.state.opinionData._id;
        let bucket = this.state.opinionData.patient_info.bucket
        let patient_profile_id = this.state.opinionData.patient_profile_id
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token;
        if (event && event[0] && (event[0].type === "application/pdf" || event[0].type === "image/jpeg" || event[0].type === "image/png")) {
            this.setState({ isfileuploadmulti: true, loaderImage: true, err_pdf: false })
            var fileattach = [];
            for (var i = 0; i < event.length; i++) {
                var file = event[i];
                let fileParts = event[i].name.split('.');
                let fileName = fileParts[0];
                let fileType = fileParts[1];
                axios.post(sitedata.data.path + '/aws/sign_s3', {
                    fileName: fileName,
                    fileType: fileType,
                    folders: patient_profile_id + '/Trackrecord/',
                    bucket: bucket
                }).then(response => {
                    fileattach.push({ filename: response.data.data.returnData.url + '&bucket=' + bucket })
                    this.setState({ fileupods: true });
                    setTimeout(() => { this.setState({ fileupods: false }); }, 5000);
                    var returnData = response.data.data.returnData;
                    var signedRequest = returnData.signedRequest;
                    var url = returnData.url;
                    // Put the fileType in the headers for the upload
                    var options = { headers: { 'Content-Type': fileType } };
                    axios.put('https://cors-anywhere.herokuapp.com/' + signedRequest, file, options)
                        .then(result => {
                            this.setState({ success: true, loaderImage: false, uploadedimage: fileattach });
                        }).catch(error => { })
                }).catch(error => { })
            }
        }

    }

    updatePrescription = (status, id) => {
        this.setState({ inqstatus: status, selected_id: id, message : null })
        this.handleOpenReject();
    }

    deleteClickPatient = (status, id) => {
        let user_token = this.props.stateLoginValueAim.token
        const { message } = this.state
        axios.put(sitedata.data.path + '/UserProfile/GetSecondOpinion/' + id, {
            status: status,
            doctor_name: this.props.myData.first_name + ' ' + this.props.myData.last_name,
            short_msg: message,
            attachfile: this.state.uploadedimage,
            type:'second_opinion'
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({openPrescp: false, openReject: false})
            this.getMypatientsData();
        }).catch((error) => {
        });
    }

    removePrsecription = (status, id) =>{
        this.setState({message : null});
        confirmAlert({
           customUI: ({ onClose }) => {
                return (
                    <div className={this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
                        <h1>Update the Inqury?</h1>
                        <p>Are you sure  to remove this Inquiry?</p>
                        <div className="react-confirm-alert-button-group">
                            <button onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    this.deleteClickPatient(status, id)
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }

    handleOpenPrescp = (data) => {
        console.log("data", data)
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
        let { srvc_Doctors, status, sent, on, what_ur_profession, Pending, request, edit, Rejected, Answered, Cancelled, req_updated_successfully, sick_cert, my_doc, New, inquiry,
            doc_and_statnderd_ques, doc_aimedis_private, Annotations, details, questions, how_u_feeling, is_ur_temp_high_to_38, which_symptoms_do_u_hav, show, since_when, have_u_already_been_sick, how_long_do_u_unable_to_work, it_is_known_dieseas, r_u_tracking_medi, do_u_hv_allergies, } = translate

        return (
            <div>
                {this.state.successfullsent && <div className="success_message">{req_updated_successfully}</div>}
                <Grid className="presOpinionIner">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>About</Th>
                                <Th>Sent on</Th>
                                <Th>Patient</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {MypatientsData && MypatientsData.length > 0 && MypatientsData.map((data, index) => (
                                <Tr>
                                    <Td>{data.details ? data.details : 'Not mentioned'}</Td>
                                    <Td>{data.send_on ? getDate(data.send_on, this.props.settings.setting ? this.props.settings.setting.date_format : 'DD/MM/YYYY') : 'Not mentioned'}</Td>
                                    <Td className="presImg"><img src={data.patient_info && data.patient_info.profile_image ? getImage(data.patient_info.profile_image, this.state.images) : require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.patient_info && data.patient_info.first_name && data.patient_info.first_name} {data.patient_info && data.patient_info.last_name && data.patient_info.last_name}</Td>
                                    {data.status === 'pending' && <Td><span className="revwYelow"></span>{Pending} </Td>}
                                    {data.status === 'accept' && <Td><span className="revwGren"></span>{Answered} </Td>}
                                    {data.status === 'decline' && <Td><span className="revwRed"></span> {Rejected}</Td>}
                                    {data.status === 'cancel' && <Td><span className="revwRed"></span> {Cancelled}</Td>}
                                    {data.status === 'free' && <Td><span className="revwGry"></span> {sent} {request}</Td>}
                                    <Td className="presEditDot scndOptionIner">
                                        <a className="openScndhrf">
                                            <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd" />
                                            <ul>
                                                <li><a onClick={() => { this.handleOpenPrescp(data) }}><img src={require('../../../../assets/images/details.svg')} alt="" title="" />See Details</a></li>
                                                {(data.status == 'free'||data.status === 'pending')  && <li onClick={() => { this.handleOpenPrescp(data) }}><a><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Approve</a></li>}
                                                {(data.status == 'free'||data.status === 'pending')  && <li onClick={() => { this.updateCertificate('decline', data._id) }}><a><img src={require('../../../../assets/images/plus.png')} alt="" title="" />Reject</a></li>}
                                                {data.status !== 'remove' && <li onClick={() => { this.removePrsecription('remove', data._id) }}><a><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Remove</a></li>}
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
                        className={this.props.settings.setting.mode === 'dark' ?"darkTheme opinBoxModel":"opinBoxModel"}
                       >
                        <Grid className="opinBoxCntnt">
                            <Grid className="opinBoxCntntIner">
                                <Grid className="opinCourse">
                                    <Grid className="opinCloseBtn">
                                        <a onClick={this.handleClosePrescp}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
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
                                            <Grid><label>Patient</label></Grid>
                                            <Grid><h3>{opinionData && opinionData.patient_info && opinionData.patient_info.first_name && opinionData.patient_info.first_name} {opinionData && opinionData.patient_info && opinionData.patient_info.last_name && opinionData.patient_info.last_name}</h3></Grid>
                                        </Grid>
                                        <Grid className="recevPrescp">
                                            <Grid className="recevPrescpLbl"><label>How would patient like to receive the Second Opinion?</label></Grid>
                                            <Grid className="recevPrescpChk">
                                                {opinionData.online_offline === 'online' ? "Online" : "Home address mailbox"}
                                            </Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>Patient profession</label></Grid>
                                            <Grid>{opinionData.professions}</Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>Annotations / details / questions</label></Grid>
                                            <Grid>{opinionData.details}</Grid>
                                        </Grid>
                                        <Grid className="attchForms attchImg">
                                            <Grid><label>Attachments</label></Grid>
                                            <label class="attached_file">Attached Document -
                                        {opinionData && opinionData.documents && opinionData.documents.map((items) => (
                                                <a>{items.filename && (items.filename.split('second_opinion/')[1]).split("&bucket=")[0]}</a>
                                            ))}
                                            </label>
                                            <FileUploader name="UploadDocument" fileUpload={this.UploadFile} />
                                            {(this.state.success && opinionData.status !== 'accept') && <Grid item xs={12} md={12}>
                                            <input type="button" value="Send to patient's Timeline and Email" onClick={() => this.saveUserData(opinionData._id)} className="approvBtn" />
                                            </Grid>}
                                            {/* <Grid className="attchbrowsInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>Browse <input type="file" id="UploadDocument" name="UploadDocument" onChange={(e) => this.UploadFile(e)} /></a> or drag here
                                        </Grid> */}
                                            {/* <p>Supported file types: .jpg, .png, .pdf</p> */}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid className="infoShwHidBrdr"></Grid>
                                <Grid className="infoShwHidIner">
                                    <Grid className="infoShwSave">
                                    {(opinionData.status !== 'accept' && opinionData.status !== 'decline') && <Grid container direction="row">
                                    <Grid item xs={6} md={6}>
                                        <input type="button" value="Approve" onClick={() => this.deleteClickPatient('accept', opinionData._id)} className="approvBtn" />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <input type="button" value="Reject" onClick={() => this.updatePrescription('decline', opinionData._id)} className="rejectBtn" />
                                    </Grid>
                                </Grid>}
                                        {/* <input type="submit" onClick={this.submit} value="Edit entry" /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal>
                    {/* End of Model setup */}

                    {/* Reject Model setup */}
                    <Modal
                        open={this.state.openReject}
                        onClose={this.handleCloseReject}
                        className={this.props.settings.setting.mode === 'dark' ?"darkTheme":""}>
                        <Grid className="rejectBoxCntnt">
                            <Grid className="rejectCourse">
                                <Grid className="rejectCloseBtn">
                                    <a onClick={this.handleCloseReject}>
                                        <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                    </a>
                                </Grid>
                                <p onClick={this.handleCloseReject}>Back</p>
                                <Grid><label>{inqstatus} Inquiry</label></Grid>
                            </Grid>
                            <Grid className="shrtRejctMsg">
                                <Grid><label>Short message</label></Grid>
                                <Grid><textarea onChange={(e) => this.setState({ message: e.target.value })}></textarea></Grid>
                                <Grid><input type="submit" value={inqstatus} onChange={() => this.deleteClickPatient(inqstatus, this.state.selected_id)} /></Grid>
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
                                    {this.state.currentPage != 1 && <a className="prevpag" onClick={() => { this.onChangePage(this.state.currentPage - 1) }}>Previous</a>}
                                    {this.state.pages && this.state.pages.length > 0 && this.state.pages.map((item, index) => (
                                        <a className={this.state.currentPage == item && "activePageDocutmet"} onClick={() => { this.onChangePage(item) }}>{item}</a>
                                    ))}
                                    {this.state.currentPage != this.state.totalPage && <a className="nxtpag" onClick={() => { this.onChangePage(this.state.currentPage + 1) }}>Next</a>}
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