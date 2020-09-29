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
import LeftMenu from './../../Components/Menus/DoctorLeftMenu/index';
import LeftMenuMobile from './../../Components/Menus/DoctorLeftMenu/mobile';
import sitedata, { data } from '../../../sitedata';
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { LanguageFetchReducer } from './../../actions';
import PrecriptionList from './Components/prescription.js';
import SickCertificateList from './Components/sickCertificate.js';
import SecondOpinion from './Components/secondOpinion.js';
import * as translationEN from '../../../translations/en_json_proofread_13072020.json';
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
        this.getUserData();
        // this.getMyprescriptionssData()
    }

    getUserData() {
        this.setState({ loaderImage: true });
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
            this.setState({ myData: response.data.data })
        }).catch((error) => {
            this.setState({ loaderImage: false });
        });
    }

    saveUserData(id){
        this.setState({serverMsg : ""})
        if(this.state.uploadedimage == ""){
            this.setState({ serverMsg : "please upload documents"})
        }else{
            this.setState({ loaderImage: true });
            const user_token = this.props.stateLoginValueAim.token;
            axios.put(sitedata.data.path+'/UserProfile/UpdatePrescription/'+id, {
                    docs : this.state.uploadedimage,
                },{headers:{
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }})
            .then((responce)=>{
                this.setState({ serverMsg : responce.data.message})
                this.setState({ loaderImage: false });
            })
        }
    }

    handleSpecialist = specialistOption => {
        this.setState({ specialistOption });
        //console.log(`Option selected:`, specialistOption);
    };

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };



    handleOpenReject = () => {
        this.setState({ openReject: true });
    };
    handleCloseReject = () => {
        this.setState({ openReject: false });
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
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage="documents" />
                                <LeftMenuMobile isNotShow ={true}  currentPage="documents" />
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={9}>

                                    <Grid className="docsOpinion">

                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={12}><label>Inquiries</label></Grid>
                                        </Grid>

                                        <Grid className="presPkgIner1">
                                            {/* Tabs  */}
                                            <AppBar position="static" className="presTabsUpr">
                                                <Grid container direction="row">
                                                    <Grid item xs={12} md={8}>
                                                        <Tabs value={value} onChange={this.handleChangeTabs} className="presTabs">
                                                            <Tab label="Prescriptions" className="presTabsIner" />
                                                            <Tab label="Sick Certificates" className="presTabsIner" />
                                                            <Tab label="Second Opinions" className="presTabsIner" />
                                                        </Tabs>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} className="presSrch">
                                                        <a><img src={require('../../../assets/images/search-entries.svg')} alt="" title="" /></a>
                                                    </Grid>
                                                </Grid>
                                            </AppBar>
                                        </Grid>

                                        <Grid className="presPkgIner2">

                                            {value === 0 && <TabContainer>
                                                {this.state.successfullsent && <div className="success_message">Request sent Sucessfully</div>}
                                                <PrecriptionList newItem={this.state.newItemp} myData ={ this.state.myData}/>
                                            </TabContainer>}

                                            {value === 1 && <TabContainer>
                                                {this.state.successfullsent1 && <div className="success_message">Request sent Sucessfully</div>}
                                                <SickCertificateList  newItem={this.state.newItemp} myData ={ this.state.myData}/>
                                                </TabContainer>}

                                            {value === 2 && <TabContainer>
                                                {this.state.successfullsent1 && <div className="success_message">Request sent Sucessfully</div>}
                                                <SecondOpinion  newItem={this.state.newItemp} myData ={ this.state.myData}/>

                                            </TabContainer>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
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