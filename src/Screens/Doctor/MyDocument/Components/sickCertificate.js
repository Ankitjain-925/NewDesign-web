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
            prescData: {}
        };
    }

    componentDidMount() {
        this.getMypatientsData()
    }

    getMypatientsData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        axios.get(sitedata.data.path + '/UserProfile/GetSickCertificate/', {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.data.hassuccessed)
            {
                var images = [];
                response.data.data && response.data.data.length>0 && response.data.data.map((item)=>{
                    var find = item && item.profile_image && item.profile_image
                        if(find)
                        {
                            var find1 = find.split('.com/')[1]
                            console.log('find', find)
                            axios.get(sitedata.data.path + '/aws/sign_s3?find='+find1,)
                            .then((response2) => {
                                if(response2.data.hassuccessed)
                                {
                                    item.new_image = response2.data.data
                                    images.push({image : find, new_image: response2.data.data})
                                    this.setState({images : images})
                                }
                            })
                        }
                })
                console.log("response.data.data", response.data.data)
                this.setState({ MypatientsData: response.data.data }); 
                
            }
            this.setState({ loaderImage: false });
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    getImage =(image)=>{
        const myFilterData = this.state.images && this.state.images.length>0 && this.state.images.filter((value, key) =>
                value.image === image);
        if(myFilterData && myFilterData.length>0)
        {
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

    render() {
        const { specialistOption, prescData } = this.state;
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
                                <Th>Case</Th>
                                <Th>Sent on</Th>
                                <Th>Doctor</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            <Tr>
                                <Td>Temperature and headaches</Td>
                                <Td>16/03/2020</Td>
                                <Td className="presImg"><img src={require('../../../../assets/images/dr1.jpg')} alt="" title="" />Mark Anderson M.D.</Td>
                                <Td><span class="revwGry"></span>Sent request</Td>
                                <Td className="presEditDot" onClick={this.handleaddSick}><img src={require('../../../../assets/images/threedots.jpg')} alt="" title="" /></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Grid className="tablePagNum">
                        <Grid container direction="row">
                            <Grid item xs={12} md={12}>
                                <Grid className="totalOutOff">
                                    <a>8 of 8</a>
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