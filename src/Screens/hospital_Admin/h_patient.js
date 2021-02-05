import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import Select from 'react-select';
import { LanguageFetchReducer } from 'Screens/actions';
import sitedata from 'sitedata';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'Screens/Components/Loader/index';
import { getDate, getImage, blockClick } from 'Screens/Components/BasicMethod/index'
import * as translationEN from './translations/en_json_proofread_13072020.json';
import * as translationDE from "./translations/de.json"
import H_LeftMenu from "Screens/Components/Menus/H_leftMenu/index"
import H_LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile"
import { SearchUser } from 'Screens/Components/Search';
import CreateAdminUser from "Screens/Components/CreateHospitalUser/index"
import ViewDetail from "Screens/Components/ViewInformation/index";
import "./style.css";

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
            AddPrescription: {},
            successfullsent: false,
            addCreate: false,
            current_user: {},
            openDetial: false,

        };
        // new Timer(this.logOutClick.bind(this)) 
        this.search_user = this.search_user.bind(this)
    }

    componentDidMount = () => {
        this.getAllkyc()
        this.getPatient();
    }

    openDetail = (patient) => {
        this.setState({ openDetial: true, current_user: patient })
    }
    CloseDetail = () => {
        this.setState({ openDetial: false })
    }
    search_user = (event)=> {
        if (event.target.value == '') {
               this.setState({ MypatientsData: this.state.forSearch })
            this.onChangePage(1)
        } else {
            let serach_value = SearchUser(event.target.value, this.state.forSearch)
            this.setState({ MypatientsData: serach_value })
        }
    }

    handleOpenCreate = () => {
        this.setState({ addCreate: true })
    }
    handleCloseCreate = () => {
        this.getPatient()
        this.setState({ addCreate: false })
    }
    submitDelete = (deletekey, profile_id, bucket) => {
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
        let {DeleteUser, Yes, No, click_on_YES_user} = translate;
        confirmAlert({
            title: DeleteUser,
            message: click_on_YES_user,
            buttons: [
                {
                    label: Yes,
                    onClick: () => this.deleteClick(deletekey, profile_id, bucket)
                },
                {
                    label: No,
                }
            ]
        })

    };
    deleteClick = (deletekey, profile_id, bucket) => {
        this.setState({ loaderImage: true });
        const user_token = this.props.stateLoginValueAim.token;
        axios.delete(sitedata.data.path + '/admin/deleteUser/' + deletekey + '?bucket=' + bucket, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ loaderImage: false });
                var data = JSON.stringify({"permanent":true});

                var config = {
                  method: 'delete',
                  url: 'https://api-eu.cometchat.io/v2.0/users/'+profile_id.toLowerCase(),
                  headers: { 
                    'appId': '220824e717b58ac', 
                    'apiKey': 'f2ff1ef787367e0bcf00befdb9dc871e1c9a54e2', 
                    'Content-Type': 'application/json'
                  },
                  data : data
                };
                
                axios(config)
                .then(function (response) { })
                .catch(function (error) { });
                this.getPatient();
                //   this.MessageUser();
            }).catch((error) => { });
    }

    BlockUser = (patient_id, isblock) => {
        var data = blockClick(patient_id, isblock, this.props.stateLoginValueAim.token)
        this.getPatient();
    }


    getAllkyc() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/User/getAllKyc',
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            this.setState({ getAllkyc: response.data.data });
        }).catch((error) => {});
    }

    getPatient() {
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/admin/allHospitalusers/' + this.props.stateLoginValueAim.user.institute_id,
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                if (response.data.data) {
                    var images = [];
                    this.setState({ AllUsers: response.data.data });
                    const AllPatient = this.state.AllUsers.filter((value, key) =>
                        value.type === 'patient');
                    this.setState({ AllPatient: AllPatient })
                    var totalPage = Math.ceil(AllPatient.length / 10);
                    this.setState({ totalPage: totalPage, currentPage: 1 },
                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i)
                            }
                            this.setState({ MypatientsData: AllPatient.slice(0, 10), pages: pages })
                        }
                        else {
                            this.setState({ MypatientsData: AllPatient })
                        }
                    })  
                this.setState({ forSearch: AllPatient })
                    AllPatient && AllPatient.length > 0 && AllPatient.map((item) => {
                        var find = item && item.image && item.image
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
                }
                else {
                    this.setState({ AllPatient: [] });
                }
            }).catch((error) => {});
    }
    onChangePage = (pageNumber) => {
        this.setState({ MypatientsData: this.state.AllPatient.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
    }

    render() {
      
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
        let { capab_Patients, add_new, Patient, find_patient, ID, Status, no_, recEmp_FirstName,
            previous, next, Normal, Blocked, recEmp_LastName, imprint_Email, restore, Delete, see_detail } = translate

        return (
            <Grid className="homeBg">
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>

                            <Grid container direction="row">
                                {/* Mobile menu */}
                                <H_LeftMenuMobile isNotShow={true} currentPage="patient_List" />
                                {/* End of mobile menu */}

                                {/* Website Menu */}
                                <H_LeftMenu isNotShow={true} currentPage="patient_List" />
                                {/* End of Website Menu */}

                                <CreateAdminUser addCreate={this.state.addCreate} handleCloseCreate={this.handleCloseCreate} openBy="patient" />

                                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                                    <Grid container direction="row" justifyContent="center" className="archvOpinLbl">
                                        <Grid item xs={12} md={6}><label>{capab_Patients}</label></Grid>
                                        <Grid item xs={12} md={6} className="archvOpinRght">
                                            <a onClick={this.handleOpenCreate}>+ {add_new} {Patient}</a>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="center" className="archvSrchInput">
                                        <Grid item xs={12} md={12}> <input onChange={this.search_user} type="text" placeholder={find_patient} /></Grid>
                                        <img src={require('assets/images/InputField.svg')} alt="" title="" />
                                    </Grid>
                                    <Grid className="archvOpinionIner">
                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th>{no_}</Th>
                                                    <Th>{recEmp_FirstName}</Th>
                                                    <Th>{recEmp_LastName}</Th>
                                                    <Th>{imprint_Email}</Th>
                                                    <Th>{ID}</Th>
                                                    <Th>{Status}</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                            {this.state.MypatientsData && this.state.MypatientsData.length>0 && this.state.MypatientsData.map((patient, i) => (
                                                    <Tr>
                                                          <Td>{((this.state.currentPage-1)*10) + i+1}</Td>
                                                        <Td><img className="doctor_pic" src={patient && patient.image ? getImage(patient.image, this.state.images) : require('assets/images/dr1.jpg')} alt="" title="" />
                                                            {patient.first_name && patient.first_name}</Td>
                                                        <Td>{patient.last_name && patient.last_name}</Td>
                                                        <Td>{patient.email && patient.email}</Td>
                                                        <Td>{patient.alies_id && patient.alies_id}</Td>
                                                        {patient.isblock && patient.isblock == true ?
                                                            <Td style={{ minWidth: "100px" }}><span className="revwRed"></span>{Blocked}</Td >
                                                            : <Td><span className="revwGren"></span>{Normal}</Td>
                                                        }
                                                        <Td className="archvDot">
                                                            <a className="academy_ul">
                                                                <img src={require('assets/images/threedots.jpg')} alt="" title="" className="academyDots" />
                                                                <ul>
                                                                    <li onClick={() => this.openDetail(patient)}><a><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{see_detail}</a></li>
                                                                    <li onClick={() => this.BlockUser(patient._id, patient.isblock)}><a><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{patient.isblock && patient.isblock == true ? 'Unblock' : 'Block'}</a></li>
                                                                    <li onClick={() => this.submitDelete(patient._id, patient.profile_id, patient.bucket)}><a><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{Delete}</a></li>
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
                                    <ViewDetail openDetial={this.state.openDetial} CloseDetail={this.CloseDetail} patient_info={this.state.current_user} />
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