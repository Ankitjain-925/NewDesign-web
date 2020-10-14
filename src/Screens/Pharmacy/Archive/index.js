import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from '@material-ui/core/Modal';
import LeftMenuMobile from './../../Components/Menus/PharmaLeftMenu/mobile';
import LeftMenu from './../../Components/Menus/PharmaLeftMenu/index';
import Loader from './../../Components/Loader/index';
import { EmergencySet } from '../../Doctor/emergencyaction.js';
import { LanguageFetchReducer } from './../../actions';
import { withRouter } from "react-router-dom";
import sitedata from '../../../sitedata';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { LoginReducerAim } from './../../Login/actions';
import { Settings } from './../../Login/setting';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { getDate, getTime, getImage } from './../../Components/BasicMethod/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPres: false,
            Allpre : [],
            Allpre1 : [],
            loaderImage: false,
            openDetail : {},
            isArchived: false,
            isDeleted : false,
            images : [],
            search_value : '',
        };
    }
    // fancybox open
    handleOpenPres = (data) => {
        this.setState({ openPres: true, openDetail : data });
    };
    handleClosePres = () => {
        this.setState({ openPres: false, openDetail : {} });
    };

    componentDidMount(){
        this.getAllPres();
    }

    //For getting the All Prescriptions
    getAllPres=()=>{
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token
        axios.get(sitedata.data. path + '/emergency_record/ArchivegetTrack/' + this.props.stateLoginValueAim.user._id,
        {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.data.hassuccessed === true) {
                var images =[];
                response.data.data && response.data.data.length > 0 && response.data.data.map((data1, index) => {
                data1.attachfile && data1.attachfile.length > 0 && data1.attachfile.map((data, index) => {
                    var find = data && data.filename && data.filename
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
                })
                this.setState({Allpre : response.data.data, Allpre1 : response.data.data,  loaderImage: false})
            }
            else
            {
                this.setState({ loaderImage: false, Allpre : [], Allpre1 : []})
            }
        })
    }

    //For open the file of prescription
    openFile = (attachfile) => {
        var find = attachfile && attachfile
        if(find)
        {
            var find1 = find.split('.com/')[1]
            axios.get(sitedata.data.path  + '/aws/sign_s3?find='+ find1).then(res=>{

                if(res.data.hassuccessed){
                    window.open(res.data.data)
                }
            })
        }
    }

    //Confirm popup for Delete
    DeleteTrack = (deletekey) => {
        confirmAlert({
            title: 'Delete item',
            message: 'Do you really want to delete the item?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => this.deleteClickTrack(deletekey)
                },
                {
                    label: 'NO',
                }
            ]
        })
    }
    //Confirm popup for Dearchive
    ArchiveTrack=(data)=>{
        confirmAlert({
            title: 'Dearchive item',
            message: 'Do you really want to dearchive the item?',
            buttons: [
                {
                    label: 'YES',
                    onClick: () => this.updateArchiveTrack(data)
                },
                {
                    label: 'NO',
                }
            ]
        })
    }
    //Update DeArchive Track State
    updateArchiveTrack = (data) => {
        data.archive = false;
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        var track_id = data.track_id;
        this.setState({ loaderImage: true })
        axios.put(sitedata.data.path + '/User/AddTrack/' + user_id + '/' + track_id, { data },
            {
                headers: {
                    'token': user_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.setState({ isArchived : true, loaderImage: false,})
                this.getAllPres();
                setTimeout(()=>{this.setState({ isArchived : false,})},3000)
                
            })
    }
      //Delete the track
      deleteClickTrack=(deletekey)=> {
        var user_id = this.props.stateLoginValueAim.user._id;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true })
        axios.delete(sitedata.data.path + '/User/AddTrack/' + user_id + '/' + deletekey, {
            headers: {
                'token': user_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ isDeleted : true,  loaderImage: false,})
                this.getAllPres();
                setTimeout(()=>{this.setState({ isDeleted : false,})},3000)
            }).catch((error) => {

            });
        }

    ResetData=()=>{
        this.setState({Allpre: this.state.Allpre1, search_value: ''})
    }

    //For search the Data
    searchData=(event)=>{
        const search_value = event.target.value.toLowerCase();
         this.setState({ search_value }, () => this.filterList());
    }
    
    //Filter on the bases of search
    filterList() {
        let users = this.state.Allpre1;
        let q = this.state.search_value;
        users = users && users.length>0 && users.filter(function(user) {
        if(user.patient_name || user.created_by_temp || user.patient_alies_id)
        {
            if(user.patient_name && user.patient_alies_id)
            {
                if(user.created_by_temp)
                {
                    return (user.created_by_temp.toLowerCase().indexOf(q) != -1 || user.patient_name.toLowerCase().indexOf(q) != -1 || user.patient_alies_id.toLowerCase().indexOf(q) != -1 );
                }
                else{
                    return (user.patient_name.toLowerCase().indexOf(q) != -1 || user.patient_alies_id.toLowerCase().indexOf(q) != -1 ); // returns true or false
                }
            }
            else{
                return (user.created_by_temp.toLowerCase().indexOf(q) != -1); // returns true or false
            }
        }
        });
        this.setState({ Allpre: users });
        if(this.state.search_value==''){
            this.setState({ Allpre: this.state.Allpre1});
        }
    }

    render() {
        const { stateLoginValueAim, Doctorsetget } = this.props;
        if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'pharmacy' ) {
            return (<Redirect to={'/'} />);
        } 
        return (
            <Grid className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode && this.props.settings.setting.mode==='dark' ? "homeBg homeBgDrk" : "homeBg"}>
                 {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">

                                {/* Website Menu */}
                                <LeftMenu  isNotShow ={true} currentPage ="course"/>
                                <LeftMenuMobile isNotShow ={true}  currentPage ="course"/>
                                {/* End of Website Menu */}

                                <Grid item xs={12} md={10}>
                                    <Grid className="phrmOpinion">
                                        <Grid container direction="row" className="phrmOpinLbl">
                                            <Grid item xs={12} md={12}><label>Archive Prescriptions</label></Grid>
                                        </Grid>
                                        <Grid className="patientSrch">
                                            <input type="text" placeholder="Search by Patient ID, Patient name, Doctor..."  value={this.state.search_value} onChange={this.searchData}/>
                                        </Grid>
                                        {this.state.isArchived && <div className="success_message">Prescription is Dearchived</div>}
                                        {this.state.isDeleted && <div className="success_message">Prescription is deleted</div>}
                                        
                                        <Grid className="presOpinionIner">
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Received on</Th>
                                                        <Th>Patient</Th>
                                                        <Th>Doctor</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {this.state.Allpre && this.state.Allpre.length>0 &&  this.state.Allpre.map((item)=>(
                                                        <Tr>
                                                            <Td>{getDate(item.datetime_on)}</Td>
                                                            <Td className="presImg">
                                                                <img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                {item.patient_name && item.patient_name}
                                                                <p>{item.patient_alies_id && item.patient_alies_id}</p>
                                                            </Td>
                                                            <Td className="presImg">
                                                                <img src={require('../../../assets/images/dr1.jpg')} alt="" title="" />
                                                                {item.created_by_temp && item.created_by_temp}
                                                            </Td>
                                                          <Td className="presEditDot scndOptionIner">
                                                            <a className="openScndhrf">
                                                                <img src={require('../../../assets/images/threedots.jpg')} alt="" title="" className="openScnd" />
                                                                <ul>
                                                                    <li><a onClick={() => { this.ArchiveTrack(item) }}><img src={require('../../../assets/images/details.svg')} alt="" title="" />Dearchive</a></li> 
                                                                    <li><a onClick={() => { this.DeleteTrack(item.track_id) }}><img src={require('../../../assets/images/details.svg')} alt="" title="" />Delete</a></li> 
                                                                </ul>
                                                            </a>
                                                        </Td>
                                                        </Tr>
                                                    ))}
                                                    

                                                    {/* Model setup */}
                                                    <Modal
                                                        open={this.state.openPres}
                                                        onClose={this.handleClosePres}
                                                        className="presBoxModel">
                                                        <Grid className="presBoxCntnt">
                                                            <Grid className="presCourse">
                                                                <Grid className="presCloseBtn">
                                                                    <a onClick={this.handleClosePres}>
                                                                        <img src={require('../../../assets/images/closefancy.png')} alt="" title="" />
                                                                    </a>
                                                                </Grid>
                                                                <p>Prescription for</p>
                                                                <Grid><label> {this.state.openDetail.patient_name && this.state.openDetail.patient_name}</label></Grid>
                                                            </Grid>

                                                            <Grid className="medicInqUpr">
                                                                <Grid className="prescripList">
                                                                    <Grid>
                                                                      
                                                                    {this.state.openDetail && this.state.openDetail.attachfile && this.state.openDetail.attachfile.length>0 && this.state.openDetail.attachfile.map((file)=>(
                                                                        <div>
                                                                            {(file.filetype ==='pdf') && <iframe className="FramesetHeightWidth" width={700} height="500" src={getImage(file.filename, this.state.images)} frameborder="0" allowtransparency="true" allowfullscreen></iframe>}
                                                                            {(file.filetype ==='png' || file.filetype ==='jpeg' || file.filetype ==='jpg' || file.filetype ==='svg') && 
                                                                                <img src={getImage(file.filename, this.state.images)} alt="" title="" />
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                        
                                                                        {/* <img src={require('../../../assets/images/prescriptions.jpg')} alt="" title="" /> */}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Modal>
                                                    {/* End of Model setup */}
                                                </Tbody>
                                            </Table>
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
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    const { Emergencysetget }= state.EmergencySet;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        Emergencysetget,
        //   Doctorsetget,
        //   catfil
    }
};
export default withRouter(connect(mapStateToProps, { EmergencySet, LoginReducerAim, LanguageFetchReducer, Settings })(Index));