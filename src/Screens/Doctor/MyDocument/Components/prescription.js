import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
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
            prescData: {},
            inqstatus: null,
            message: ''
        };
    }

    componentDidMount() {
        // this.getUserData();
        this.getMyprescriptionssData()
    }



    getMyprescriptionssData() {
        let user_token = this.props.stateLoginValueAim.token
        axios.get(sitedata.data.path + '/UserProfile/GetPrescription/', {
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


                this.setState({ MypatientsData: response.data.data });

            }
        }).catch((error) => {
        });
    }

    updatePrescription = (status, id) => {
        // let sata = status.charAt(0).toUpperCase() + status.slice(1)
        this.setState({ inqstatus: status, selected_id: id })
        this.handleOpenReject();
    }

    deleteClickPatient = (status, id) => {
        let user_token = this.props.stateLoginValueAim.token
        const { message } = this.state
        axios.put(sitedata.data.path + '/UserProfile/GetPrescription/' + id, {
            status: status,
            doctor_name: this.props.myData.first_name + ' ' + this.props.myData.last_name,
            type: "prescription",
            short_msg: message

        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.getMyprescriptionssData();
        }).catch((error) => {
        });
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
            console.log('fileType', fileType)
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
                        console.log('data', response)
                        var returnData = response.data.data.returnData;
                        var signedRequest = returnData.signedRequest;
                        var url = returnData.url;
                        console.log("Recieved a signed request " + signedRequest);

                        // Put the fileType in the headers for the upload
                        var options = {
                            headers: {
                                'Content-Type': fileType
                            }
                        };
                        axios.put(signedRequest, file1, options)
                            .then(result => {
                                console.log("Response from s3")
                                this.setState({ success: true });
                            })
                            .catch(error => {
                                console.log("ERROR " + JSON.stringify(error));
                            })
                    })
                    .catch(error => {
                        console.log(JSON.stringify(error));
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

    handleOpenPrescp = (data) => {
        this.setState({ openPrescp: true, prescData: data });
    };
    handleClosePrescp = () => {
        this.setState({ openPrescp: false });
    };

    handleOpenReject = () => {
        this.setState({ openReject: true, });
    };
    handleCloseReject = () => {
        this.setState({ openReject: false });
    };

    render() {
        const { specialistOption, prescData, inqstatus } = this.state;
        const { value } = this.state;
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
        let { srvc_Doctors, status, sent, on, prescription, Pending, request, edit, Rejected, Answered, Cancelled, req_updated_successfully, sick_cert, my_doc, New, inquiry,
            doc_and_statnderd_ques, doc_aimedis_private, Annotations, details, questions, is_this_follow_pres, how_u_like_rcv_pres, Medicine, Substance, Dose, mg, trade_name, atc_if_applicable, manufacturer, pack_size, } = translate

        return (
            <div>
                {this.state.successfullsent && <div className="success_message">{req_updated_successfully}</div>}
                <Grid className="presOpinionIner">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Medicine</Th>
                                <Th>Received on</Th>
                                <Th>Patient</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.state.MypatientsData && this.state.MypatientsData.length > 0 && this.state.MypatientsData.map((data, index) => (
                                <Tr>
                                    <Td>{data.medication ? data.medication : 'Not mentioned'}</Td>
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
                                                {data.status !== 'decline' && <li onClick={() => { this.updatePrescription('accept', data._id) }}><a><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />Accept</a></li>}
                                                {data.status !== 'accept' && <li onClick={() => { this.updatePrescription('decline', data._id) }}><a><img src={require('../../../../assets/images/plus.png')} alt="" title="" />Decline</a></li>}
                                                {data.status !== 'remove' && <li onClick={() => { this.updatePrescription('remove', data._id) }}><a><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />Remove</a></li>}
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
                        className="prespBoxModel">
                        <Grid className="prespBoxCntnt">
                            <Grid className="prespCourse">
                                <Grid className="prespCloseBtn">
                                    <a onClick={this.handleClosePrescp}>
                                        <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                    </a>
                                </Grid>
                                <p>Prescription Inquiry</p>
                                <Grid><label>{data.patient_info && data.patient_info.first_name && data.patient_info.first_name} {data.patient_info && data.patient_info.last_name && data.patient_info.last_name}</label></Grid>
                            </Grid>
                            <Grid className="detailPrescp">

                                <Grid className="stndQues">
                                    <Grid><span>Standard questions</span></Grid>
                                    <Grid>
                                        <Grid><label>{is_this_follow_pres}</label></Grid>
                                        <p>{prescData.follow_up_prescription == 'yes' ? 'Yes' : 'No'}</p>
                                        <Grid><label>{how_u_like_rcv_pres}</label></Grid>
                                        <p>{prescData.prescription_type}</p>
                                        <Grid><label>Are you currently abroad?</label></Grid>
                                        <p>No</p>
                                    </Grid>
                                </Grid>

                                <Grid className="stndQues">
                                    <Grid><span>Medicine inquiry</span></Grid>
                                    <Grid>
                                        <Grid><label>Medicine / Substance</label></Grid>
                                        <p>{prescData.medication}</p>
                                        <Grid><label>Dose</label></Grid>
                                        <p>{prescData.dose} mg</p>
                                        <Grid><label>Trade name</label></Grid>
                                        <p>{prescData.trade_name ? prescData.trade_name : 'Unknown'}</p>
                                        <Grid><label>ATC code if applicable</label></Grid>
                                        <p>{prescData.atc_code ? prescData.atc_code : 'Unknown'}</p>
                                        <Grid><label>Manufacturer</label></Grid>
                                        <p>{prescData.manufacturer}</p>
                                        <Grid><label>Pack size</label></Grid>
                                        <p>{prescData.pack_size}</p>
                                        <Grid><label>Annotations / details / questions</label></Grid>
                                        <p>{prescData.annotations}</p>
                                    </Grid>
                                </Grid>

                                <Grid className="stndQues">
                                    <Grid><span>Patients Health Status</span></Grid>
                                    <Grid>
                                        <Grid><label>Medications</label></Grid>
                                        <p>{prescData.medication ? prescData.medication : 'Unknown'}</p>
                                        <Grid><label>Allergies</label></Grid>
                                        <p>{prescData.allergies ? prescData.allergies : 'Unknown'}</p>
                                        <Grid><label>Diagnoses</label></Grid>
                                        <p>{prescData.diagnosis ? prescData.diagnosis : 'Unknown'}</p>
                                    </Grid>
                                </Grid>

                                {prescData.status !== 'decline' &&
                                    <Grid className="scamUPForms scamUPImg">

                                        <Grid><label>{(prescData.status !== 'accept') ? 'Upload scanned' : 'Scanned'} prescription</label></Grid>
                                        <Grid className="scamUPInput">
                                            <a><img src={require('../../../../assets/images/upload-file.svg')} alt="" title="" /></a>
                                            <a>Browse <input type="file" onChange={this.UploadFile} /></a> or drag here
                                                                            </Grid>
                                        <p>Supported file types: .jpg, .png, .pdf</p>
                                    </Grid>}

                                {(prescData.status !== 'accept' || prescData.status !== 'decline') && <Grid container direction="row">
                                    <Grid item xs={6} md={6}>
                                        <input type="button" value="Approve" onClick={() => this.updatePrescription(prescData.status, prescData._id)} className="approvBtn" />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <input type="button" value="Reject" onClick={() => this.updatePrescription(prescData.status, prescData._id)} className="rejectBtn" />
                                    </Grid>
                                </Grid>}

                            </Grid>
                        </Grid>
                    </Modal>
                    {/* End of Model setup */}

                    {/* Reject Model setup */}
                    <Modal
                        open={this.state.openReject}
                        onClose={this.handleCloseReject}>
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
                            <Grid item xs={6} md={6}>
                                <Grid className="totalOutOff">
                                    <a>25 of 36</a>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Grid className="prevNxtpag">
                                    <a className="prevpag">Previous</a>
                                    <a className="frstpag">1</a>
                                    <a>2</a>
                                    <a>3</a>
                                    <a className="nxtpag">Next</a>
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
    console.log("stateLoginValueAim", stateLoginValueAim)
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