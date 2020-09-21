import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from '../../../Login/actions';
import { Settings } from '../../../Login/setting';
import axios from 'axios';
import Select from 'react-select';
import { LanguageFetchReducer } from '../../../actions';
import sitedata from '../../../../sitedata';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import FileUploader from './../../../Components/FileUploader/index';
import Loader from '../../../Components/Loader/index';
import { getDate, getImage, GetUrlImage } from '../../../Components/BasicMethod/index'
import * as translationEN from "../../../../translations/en_json_proofread_13072020.json"
const specialistOptions = [
    { value: 'Specialist1', label: 'Specialist1' },
    { value: 'Specialist2', label: 'Specialist2' },
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList: [],
            currentPage: 1,
            totalPage: 1,
            AllPres: [],
            pages: [1],
            images: [],
            addInqry: false,
            showInquiry: false,
            AddSecond: {},
            successfullsent: false,

        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    componentDidMount = () => {
        this.getPrescription();
    }

    //For set the Name by Event like since_when for Sick certificate
    eventnameSetP = (name, value) => {
        const state = this.state.AddSecond;
        state[name] = value.value;
        this.setState({ AddSecond: state, selectedSub: value })
    }

    // Add the Prescription State
    AddState = (e) => {
        const state = this.state.AddSecond;
        state[e.target.name] = e.target.value;
        this.setState({ AddSecond: state })
    }
    // Open and Close Second Opinion Edit Form
    handleaddInqry = (data) => {
        this.setState({ addInqry: true, showInquiry: false, AddSecond: data });
    };
    handleCloseInqry = () => {
        this.setState({ addInqry: false, showInquiry: false });
    };


    //on adding new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.newItem !== this.props.newItem) {
            this.getPrescription();
        }
    }
    //Delete for the Prescriptions
    deleteClickPatient(status, id) {
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/UpdateSecondOpinion/' + id, {
            status: status
        }, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.getPrescription();
        }).catch((error) => {
        });
    }

    //For upload File related the second Opinion
    fileUpload = (event) => {
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
                    folders: this.props.stateLoginValueAim.user.profile_id + '/second_opinion/',
                    bucket: this.props.stateLoginValueAim.user.bucket
                }).then(response => {
                    fileattach.push({ filename: response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket })
                    this.setState({ fileupods: true });
                    setTimeout(() => { this.setState({ fileupods: false }); }, 5000);
                    var returnData = response.data.data.returnData;
                    var signedRequest = returnData.signedRequest;
                    var url = returnData.url;
                    // Put the fileType in the headers for the upload
                    var options = { headers: { 'Content-Type': fileType } };
                    axios.put('https://cors-anywhere.herokuapp.com/' + signedRequest, file, options)
                        .then(result => {
                            this.setState({ success: true, loaderImage: false, fileattach: fileattach });
                        }).catch(error => { })
                }).catch(error => { })
            }
        }
        else { this.setState({ err_pdf: true }) }
    }

    //Delete for the Prescriptions confirmation
    updatePrescription(status, id) {
        confirmAlert({
            title: 'Update the Inqury',
            message: 'Are you sure  to update this Inquiry?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => this.deleteClickPatient(status, id)
                },
                {
                    label: 'NO',
                }
            ]
        })
    }

    //For chnage the page
    onChangePage = (pageNumber) => {
        this.setState({ currentList: this.state.AllPres.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
    }

    //For update the certificate
    SubmitPrescription = () => {
        var user_token = this.props.stateLoginValueAim.token;
        var data = this.state.AddSecond;
        if (this.state.fileattach) {
            data.documents = this.state.fileattach;
        }
        axios.put(sitedata.data.path + '/UserProfile/UpdateSecondOpinion/' + this.state.AddSecond._id, data, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            this.setState({ successfullsent: true, addInqry: false, fileattach: {} })
            setTimeout(() => { this.setState({ successfullsent: false, }) }, 5000)
            this.getPrescription();
        }).catch((error) => {
        })
    }
    //Get all the sick Prescriptions
    getPrescription = () => {
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.get(sitedata.data.path + '/UserProfile/RequestedSecond', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            var images = []
            response.data.data && response.data.data.length > 0 && response.data.data.map((datas) => {
                var find = datas && datas.docProfile && datas.docProfile.profile_image
                if (find) {
                    var find1 = find.split('.com/')[1]
                    axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
                        .then((response2) => {
                            if (response2.data.hassuccessed) {
                                images.push({ image: find, new_image: response2.data.data })
                                this.setState({ images: images })
                            }
                        })
                }
            })
            var totalPage = Math.ceil(response.data.data.length / 10);
            this.setState({ AllPres: response.data.data, loaderImage: false, totalPage: totalPage, currentPage: 1 },
                () => {
                    if (totalPage > 1) {
                        var pages = [];
                        for (var i = 1; i <= this.state.totalPage; i++) {
                            pages.push(i)
                        }
                        this.setState({ currentList: this.state.AllPres.slice(0, 10), pages: pages })
                    }
                    else {
                        this.setState({ currentList: this.state.AllPres })
                    }
                })
        })
    }

    render() {
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
        let { about, sent, srvc_Doctors, status, on, Pending, Answered, Rejected, Cancelled, request, edit, inquiry, details, modify,
            secnd_openion, cancel, plz_upload_png_jpg, how_wuld_u_like_rcv_scnd_openion, specialist ,ur_profesion, doc_and_statnderd_ques, 
            doc_aimedis_private, Annotations, questions, previous, next, see,of, attachments, attached_doc, specilist_and_secnd_openion  } = translate
        return (
            <div>
                {this.state.successfullsent && <div className="success_message">Request updated Sucessfully</div>}
                <Grid className="scndOpinionIner">
                    {this.state.loaderImage && <Loader />}
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>{about}</Th>
                                <Th>{sent} {on}</Th>
                                <Th>{srvc_Doctors}</Th>
                                <Th>{status}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.state.currentList && this.state.currentList.length > 0 && this.state.currentList.map((data, index) => (
                                <Tr>
                                    <Td>{data.details ? data.details : 'Not mentioned'}</Td>
                                    <Td>{data.send_on ? getDate(data.send_on, this.props.settings.setting.date_format) : 'Not mentioned'}</Td>
                                    <Td className="drImg"><img src={data.docProfile && data.docProfile.profile_image ? getImage(data.docProfile.profile_image, this.state.images) : require('../../../../assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td>
                                    {data.status === 'pending' && <Td><span className="revwYelow"></span>{Pending} </Td>}
                                    {data.status === 'accept' && <Td><span className="revwGren"></span>{Answered} </Td>}
                                    {data.status === 'remove' && <Td><span className="revwRed"></span>{Rejected}</Td>}
                                    {data.status === 'cancel' && <Td><span className="revwRed"></span>{Cancelled}</Td>}
                                    {data.status === 'free' && <Td><span className="revwGry"></span>{sent} {request}</Td>}
                                    <Td className="presEditDot scndOptionIner">
                                        <a className="openScndhrf">
                                            <img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd" />
                                            <ul>
                                                <li><a onClick={() => { this.handleshowSick(data) }}><img src={require('../../../../assets/images/details.svg')} alt="" title="" />{see} {details}</a></li>
                                                {data.status !== 'accept' && <li><a onClick={() => { this.handleaddInqry(data) }}><img src={require('../../../../assets/images/edit.svg')} alt="" title="" />{modify}</a></li>}
                                                {data.status !== 'cancel' && <li><a onClick={() => { this.updatePrescription('cancel', data._id) }}><img src={require('../../../../assets/images/cancel-request.svg')} alt="" title="" />{cancel} {request}</a></li>}
                                            </ul>
                                        </a>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {/* Model setup for Second Opinion*/}
                    <Modal
                        open={this.state.addInqry}
                        onClose={this.handleCloseInqry}
                        className="opinBoxModel">
                        <Grid className="opinBoxCntnt">
                            <Grid className="opinBoxCntntIner">
                                <Grid className="opinCourse">
                                    <Grid className="opinCloseBtn">
                                        <a onClick={this.handleCloseInqry}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
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
                                            <Grid><label>{specialist}</label></Grid>
                                            <Grid><h3>{this.state.AddSecond && this.state.AddSecond.docProfile && this.state.AddSecond.docProfile.first_name && this.state.AddSecond.docProfile.first_name} {this.state.AddSecond && this.state.AddSecond.docProfile && this.state.AddSecond.docProfile.last_name && this.state.AddSecond.docProfile.last_name}</h3></Grid>
                                        </Grid>
                                        <Grid className="recevPrescp">
                                            <Grid className="recevPrescpLbl"><label>{how_wuld_u_like_rcv_scnd_openion}?</label></Grid>
                                            <Grid className="recevPrescpChk">
                                                <FormControlLabel control={<Radio />} name="online_offline" value="online" color="#00ABAF" checked={this.state.AddSecond.online_offline === 'online'} onChange={this.AddState} label="Online" />
                                                <FormControlLabel control={<Radio />} name="online_offline" color="#00ABAF" value="offline" checked={this.state.AddSecond.online_offline === 'offline'} onChange={this.AddState} label="Home address mailbox" />
                                            </Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>{ur_profesion}</label></Grid>
                                            <Grid><input type="text" name="professions" value={this.state.AddSecond.professions} onChange={this.AddState} /></Grid>
                                        </Grid>
                                        <Grid className="yrProfes">
                                            <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                            <Grid><textarea name="details" value={this.state.AddSecond.details} onChange={this.AddState}></textarea></Grid>
                                        </Grid>
                                        <Grid className="attchForms attchImg">
                                            <Grid><label>{attachments}</label></Grid>
                                            <label class="attached_file">{attached_doc} -
                                        {this.state.AddSecond && this.state.AddSecond.documents && this.state.AddSecond.documents.map((items) => (
                                                <a>{items.filename && (items.filename.split('second_opinion/')[1]).split("&bucket=")[0]}</a>
                                            ))}
                                            </label>
                                            <FileUploader name="UploadDocument" fileUpload={this.fileUpload} />
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
                                        <input type="submit" onClick={this.SubmitPrescription} value="Edit entry" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal>


                    <Modal
                        open={this.state.showInquiry}
                        onClose={this.handleCloseShowSick}
                        className="nwPresModel">
                        <Grid className="nwPresCntnt">
                            <Grid className="nwPresCntntIner">
                                <Grid className="nwPresCourse">
                                    <Grid className="nwPresCloseBtn">
                                        <a onClick={this.handleCloseShowSick}>
                                            <img src={require('../../../../assets/images/closefancy.png')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <p>{edit} {inquiry}</p>
                                    <Grid><label>{secnd_openion}</label></Grid>
                                </Grid>
                                <Grid className="docHlthMain">
                                    <Grid className="drstndrdQues">
                                    <h3>{doc_and_statnderd_ques}</h3>
                                        <Grid className="drsplestQues">
                                            <Grid><label>{doc_aimedis_private}</label></Grid>
                                            <Grid><h3>{this.state.AddSecond && this.state.AddSecond.docProfile && this.state.AddSecond.docProfile.first_name && this.state.AddSecond.docProfile.first_name} {this.state.AddSecond && this.state.AddSecond.docProfile && this.state.AddSecond.docProfile.last_name && this.state.AddSecond.docProfile.last_name}</h3></Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid className="recevPrescp">
                                        <Grid className="recevPrescpLbl"><label>{how_wuld_u_like_rcv_scnd_openion}?</label></Grid>
                                        <Grid><h3>{this.state.AddSecond && this.state.AddSecond.online_offline && this.state.AddSecond.online_offline}</h3></Grid>
                                    </Grid>
                                    <Grid className="yrProfes">
                                        <Grid><label>{ur_profesion}</label></Grid>
                                        <Grid><h3>{this.state.AddSecond && this.state.AddSecond.professions && this.state.AddSecond.professions}</h3></Grid>
                                    </Grid>
                                    <Grid className="yrProfes">
                                        <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                        <Grid><h3>{this.state.AddSecond && this.state.AddSecond.details && this.state.AddSecond.details}</h3></Grid>
                                    </Grid>
                                    <Grid className="attchForms attchImg">
                                        <Grid><label>{attachments}</label></Grid>
                                        <label class="attached_file">{attached_doc} -
                                    {this.state.AddSecond && this.state.AddSecond.documents && this.state.AddSecond.documents.map((items) => (
                                            <a className="click_document" onClick={() => { GetUrlImage(items.filename) }}>
                                                {items.filename && (items.filename.split('second_opinion/')[1]).split("&bucket=")[0]}</a>
                                        ))}
                                        </label>
                                    </Grid>
                                </Grid>

                                <Grid className="infoShwHidBrdr2"></Grid>
                                <Grid className="infoShwHidIner2">
                                    {/* <Grid className="infoShwHidMain2">
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item xs={6} md={6}>
                                            <Grid className="infoShwHid2">
                                                <a>Show or Hide <img src={require('../../../assets/images/Info.svg')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={6} className="editShwHid2">
                                            <a>Edit</a>
                                        </Grid>
                                    </Grid>
                                </Grid> */}
                                    <Grid className="infoShwSave2">
                                        <input type="submit" onClick={this.handleCloseShowSick} value="Cancel details" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal>
                    {/* End of Model setup */}

                    <Grid className="tablePagNum">
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                <Grid className="totalOutOff">
                                    <a>{this.state.currentPage} {of} {this.state.totalPage}</a>
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