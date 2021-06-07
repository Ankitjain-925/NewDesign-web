import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { slide as Menu } from "react-burger-menu";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import LeftMenu from "Screens/Components/Menus/H_leftMenu/index"
import LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile"
import axios from 'axios';
import Select from 'react-select';
import Modal from '@material-ui/core/Modal';
import { LanguageFetchReducer } from 'Screens/actions';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import sitedata from 'sitedata';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'Screens/Components/Loader/index';
import { getDate, getImage } from 'Screens/Components/BasicMethod/index'
import * as translationEN from './translations/en_json_proofread_13072020.json';
import * as translationDE from "./translations/de.json"
import { SearchUser } from "Screens/Components/Search"
import $ from "jquery";
import { commonHeader } from 'component/CommonHeader/index';
import Pagination from "Screens/Components/Pagination/index";
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
            AddPrescription: {},
            successfullsent: false,
            openDocUploadModel: false,
            loaderImage: false,
            openPres: false,
            MypatientsData: [],
        };
    }
    componentDidMount = () => {
        this.getAlldocument();
    }

    getAlldocument() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/admin/Document',
            commonHeader(user_token)
        )
            .then((response) => {
                const archive = [];
                const notarchive = [];
                var images = [];
                if (response.data.data) {
                    response.data.data.map((item, index) => {
                        var find = item && item.url;
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
                        if (item.status === true) {
                            archive.push(item)
                        }
                        else {
                            notarchive.push(item)
                        }
                    })
                    var totalPage = Math.ceil(notarchive.length / 10);
                    this.setState({ totalPage: totalPage, currentPage: 1 },
                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i)
                            }
                            this.setState({ MypatientsData: notarchive.slice(0, 10), pages: pages })
                        }
                        else {
                            this.setState({ MypatientsData: notarchive })
                        }
                    })  
                    this.setState({images : images, AllDocuments: notarchive, forSearch: notarchive });
                }
            }).catch((error) => {});
    }
    onChangePage = (pageNumber) => {
        this.setState({ MypatientsData: this.state.AllDocuments.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
    }

    search_user(event) {
        if (event.target.value == '') {
               this.setState({ MypatientsData: this.state.forSearch })
            this.onChangePage(1)
        } else {
            let searchKey = event.target.value
            let searchInto = this.state.forSearch
            const serach_value = searchInto.filter(file => {
                searchKey.toLowerCase()
                let document = file.url.toLowerCase().search(searchKey)
                if (document > -1) {
                    return file
                }
                else {
                    return false
                }
            })
            this.setState({ MypatientsData: serach_value })
        }
    }
    openDocUpload(event) {
        this.setState({ openDocUploadModel: true })
    }

    UploadFile(event) {
        if (event.target.files[0]) {
            this.setState({ loaderImage: true });
            event.preventDefault();
            let file = event.target.files[0];
            var user_token = this.props.stateLoginValueAim.token;
            const data = new FormData()
            data.append('UploadDocument', event.target.files[0])
            let fileParts = event.target.files[0].name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            axios.post(sitedata.data.path + '/aws/sign_s3', {
                fileName: fileName,
                fileType: fileType,
                folders: 'admin/documents/',
                bucket: this.props.stateLoginValueAim.user.bucket
            })
                .then(response => {
                    axios.post(sitedata.data.path + '/admin/Document?filename=' + response.data.data.returnData.url.split('.com/admin/documents/')[1] + '&url=' + response.data.data.returnData.url + '&bucket=' + this.props.stateLoginValueAim.user.bucket,
                        {}, {
                        headers: {
                            'token': user_token,
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                        .then((response) => {
                            this.setState({ loaderImage: false });
                            this.getAlldocument();
                        })
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
                    axios.put(signedRequest, file, options)
                        .then(result => {

                        })
                        .catch(error => {})
                })
                .catch(error => {})
        }
    }

    DocumentarchiveClick=(deletekey)=>{
        const user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true });
        axios.put(sitedata.data.path + '/admin/ChangeStatus/' + deletekey,
            { status: true},
           commonHeader(user_token))
            .then((response) => {
                this.setState({ loaderImage: false, document_is_archive: response.data.status });
                this.getAlldocument();
            }).catch((error) => {
            });
    }

    // fancybox open
    handleOpenPres = (data) => {
        this.setState({ openPres: true, openDetail : data });
    };
    handleClosePres = () => {
        this.setState({ openPres: false, openDetail : false });
    };

    submitDeleteDocument=(deletekey)=> {
        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            default :
                translate = translationEN.text
        }
        let {DeleteDocument, Yes, No, click_on_YES_document} = translate;
        confirmAlert({
            title: DeleteDocument,
            message: click_on_YES_document,
            buttons: [
                {
                    label: Yes,
                    onClick: () => this.deleteClickDocument(deletekey)
                },
                {
                    label: No,
                }
            ]
        })
    };

    deleteClickDocument=(deletekey)=> {
        this.setState({ loaderImage: true });
        const user_token = this.props.stateLoginValueAim.token;
        axios.delete(sitedata.data.path + '/admin/Document/' + deletekey,commonHeader(user_token))
            .then((response) => {
                this.setState({ loaderImage: false });
                this.getAlldocument();
            }).catch((error) => {});
    }


    render() {
        if(this.props.stateLoginValueAim.user.type != "hospitaladmin"){
            this.props.history.push("/")
        }
        let translate={};
        switch (this.props.stateLanguageType) {
            case "en":
                translate = translationEN.text
                break;
            case "de":
                translate = translationDE.text
                break;
            default :
                translate = translationEN.text
        }
        let { documents, document, add_new, date_last_opened, find_document, ID, Status, no_, file_name, Normal, Blocked,
            type, imprint_Email, restore, Delete, see_detail, previous, next, upload_documents } = translate
        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        {this.state.loaderImage && <Loader />}
                        <Grid item xs={12} md={12}>

                            <Grid container direction="row">
                                {/* Mobile menu */}
                                <LeftMenuMobile isNotShow={true} currentPage="archive_choose" />
                                {/* End of mobile menu */}

                                {/* Website Menu */}
                                <LeftMenu isNotShow={true} currentPage="archive_choose" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                                    <Grid container direction="row" justifyContent="center" className="archvOpinLbl">
                                        <Grid item xs={12} md={6}><label>Archives</label></Grid>
                                        <Grid item xs={12} md={6} className="archvOpinRght">
                                            {/* <a onClick={this.openDocUpload.bind(this)}>+ {add_new} {document}</a> */}
                                        </Grid>
                                    </Grid>
                                    {this.state.document_is_archive && <div className="success_message">Document is moved to Documents</div>}
                                    <Grid container direction="row" justifyContent="center" className="archvSrchInput">
                                        <Grid item xs={12} md={12}> <input onChange={this.search_user.bind(this)} type="text" placeholder={find_document} /></Grid>
                                        <img src={require('assets/images/InputField.svg')} alt="" title="" />
                                    </Grid>
                                    <Grid className="archvOpinionIner">
                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th>{no_}</Th>
                                                    <Th>{file_name}</Th>
                                                    <Th>{type}</Th>
                                                    <Th>{date_last_opened}</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                            {this.state.MypatientsData && this.state.MypatientsData.length>0 && this.state.MypatientsData.map((doc, i) => (
                                                    <Tr>
                                                          <Td>{((this.state.currentPage-1)*10) + i+1}</Td>
                                                        <Td>{doc.filename && doc.filename}</Td>
                                                        <Td>{doc.filename && doc.filename.split(".").pop()}</Td>
                                                        <Td>{doc.createdate ? getDate(doc.createdate, 'DD/MM/YYYY') : 'Not mentioned'}</Td>
                                                        <Td className="archvDot">
                                                            <a className="academy_ul">
                                                                <img src={require('assets/images/threedots.jpg')} alt="" title="" className="academyDots" />
                                                                <ul>
                                                                    <li onClick={()=>this.handleOpenPres(doc)}><a><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{see_detail}</a></li>
                                                                    <li onClick={()=>{this.DocumentarchiveClick(doc.DocumentId)}}><a><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{restore}</a></li>
                                                                    <li onClick={()=>{this.submitDeleteDocument(doc.DocumentId)}}><a><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{Delete}</a></li>
                                                                </ul>
                                                            </a>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>

                                        <Grid className="tablePagNum">
                                            <Grid container direction="row">
                                                <Grid item xs={12} md={6}>
                                                    <Grid className="totalOutOff">
                                                        <a>{this.state.currentPage} of {this.state.totalPage}</a>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    {this.state.totalPage > 1 && <Grid className="prevNxtpag">
                                                        <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} pages={this.state.pages} onChangePage={(page)=>{this.onChangePage(page)}}/>
                                                        {/* {this.state.currentPage != 1 && <a className="prevpag" onClick={() => { this.onChangePage(this.state.currentPage - 1) }}>{previous}</a>}
                                                        {this.state.pages && this.state.pages.length > 0 && this.state.pages.map((item, index) => (
                                                            <a className={this.state.currentPage == item && "activePageDocutmet"} onClick={() => { this.onChangePage(item) }}>{item}</a>
                                                        ))}
                                                        {this.state.currentPage != this.state.totalPage && <a className="nxtpag" onClick={() => { this.onChangePage(this.state.currentPage + 1) }}>{next}</a>} */}
                                                    </Grid>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                  {/* Model setup */}
                  <Modal
                    open={this.state.openPres}
                    onClose={this.handleClosePres}
                    className="presBoxModel">
                    <Grid className="presBoxCntnt">
                        <Grid className="presCourse">
                            <Grid className="presCloseBtn nwEntrCloseBtnAdd">
                                <a onClick={this.handleClosePres}>
                                    <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                </a>
                            </Grid>
                            <p>{document}</p>
                        </Grid>

                        <Grid className="medicInqUpr">
                            <Grid className="prescripList">
                                <Grid>
                                    
                                {this.state.openDetail && 
                                    <div>
                                        {this.state.openDetail && (this.state.openDetail.url.split("&bucket=")[0]).split('.').pop() ==='pdf' && <iframe className="FramesetHeightWidth" width={700} height="500" src={getImage(this.state.openDetail.url, this.state.images)} frameborder="0" allowtransparency="true" allowfullscreen></iframe>}
                                        {(this.state.openDetail && (this.state.openDetail.url.split("&bucket=")[0]).split('.').pop() ==='png' || this.state.openDetail && (this.state.openDetail.url.split("&bucket=")[0]).split('.').pop() ==='jpeg' || this.state.openDetail && (this.state.openDetail.url.split("&bucket=")[0]).split('.').pop() ==='jpg' || this.state.openDetail && (this.state.openDetail.url.split("&bucket=")[0]).split('.').pop() ==='svg') && 
                                            <img src={getImage(this.state.openDetail.url, this.state.images)} alt="" title="" />
                                        }
                                    </div>
                                }
                                   
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    // const { settings } = state.Settings;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        // settings,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(Index));