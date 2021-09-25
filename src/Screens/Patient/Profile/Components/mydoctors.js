import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import sitedata from 'sitedata';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import Modal from '@material-ui/core/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Select from 'react-select';
import Loader from 'Screens/Components/Loader/index';
import { getImage, AddFavDoc } from 'Screens/Components/BasicMethod/index';
import {
    getLanguage
} from "translations/index"
import { commonHeader } from 'component/CommonHeader/index';
var doctorArray = [];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            loaderImage: false,
            allDocData: [],
            allDocData1: [],
            favDoc: [],
            items: [],
            users: [],
            filteredUsers: [],
            q: '',
            selectedUser: '',
            doctorId: [],
            myfavDoctors: [],
            selectedprofile: '',
            reccomend: [],
            images: [],
            Reccimages: [],
            openTrust: false,
            SelectUser: false,
            already: false,
            succset: false,
            recAdd: false,
            already1: false,
            removes: false,
            family_doc: [],
            family_doc1: [],
            PassDone: false,
            family_doc_list: [],
            family_doc_list1: [],
        };
        // new Timer(this.logOutClick.bind(this)) 
    }

    //Open Dialog to add the Trusted Doctor
    handleOpenTrust = () => {
        this.setState({ openTrust: true });
    };
    handleCloseTrust = () => {
        this.setState({ openTrust: false });
    };


    componentDidMount() {
        this.alldoctor();
        this.alldocs();
    }

    //For Filter the Doctor
    componentWillReceiveProps(nextProps) {
        this.setState({ users: nextProps.users, filteredUsers: nextProps.users }, () => this.filterList());
    }

    //Get the all doctor 
    alldocs = () => {
        const user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/DoctorUsersChat',
            commonHeader(user_token)).then((response) => {
                var images = [], Reccimages = [];
                response.data.data && response.data.data.length > 0 && response.data.data.map((datas) => {
                    var find = datas && datas.image && datas.image
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
                this.setState({ allDocData1: response.data.data })
                this.getUserData();
            })
    }

    //Get the current User Data
    getUserData = () => {
        this.setState({ loaderImage: true });
        var myfavDoctors = [];
        var reccomend = [];
        let user_token = this.props.stateLoginValueAim.token
        let user_id = this.props.stateLoginValueAim.user._id
        axios.get(sitedata.data.path + '/UserProfile/Users/' + user_id,
            commonHeader(user_token)).then((response) => {
                var myFilterData = [];
                if (response.data.data.family_doc && response.data.data.family_doc.length > 0) {
                    response.data.data.family_doc.map((item) => {
                        myFilterData = this.state.family_doc_list && this.state.family_doc_list.length > 0 && this.state.family_doc_list.filter((ind) =>
                            ind.value === item);
                    })
                }
                this.setState({ family_doc: myFilterData, family_doc1: response.data.data.family_doc })
                if (response.data.data.fav_doctor) {
                    for (let i = 0; i < response.data.data.fav_doctor.length; i++) {
                        if (response.data.data.fav_doctor[i].doctor) {
                            var datas = this.state.allDocData1 && this.state.allDocData1.length > 0 && this.state.allDocData1.filter(data => data.profile_id === response.data.data.fav_doctor[i].doctor)
                            if (datas && datas.length > 0) {
                                if (response.data.data.fav_doctor[i].type && response.data.data.fav_doctor[i].type === 'recommended') {
                                    reccomend.push(datas[0])
                                }
                                else {
                                    myfavDoctors.push(datas[0])
                                }
                            }
                            this.setState({ loaderImage: false });
                        }
                    }

                    if (response.data.data.fav_doctor.length == 0) {
                        this.setState({ loaderImage: false });
                    }
                    this.setState({ myfavDoctors: myfavDoctors, reccomend: reccomend })
                }
            }).catch((error) => {
                this.setState({ loaderImage: false });
            });
    }

    //User list will be show/hide
    toggle = () => {
        this.setState({
            shown: !this.state.shown
        });
    }

    //Change the UserList
    onChange = (event) => {
        const q = event.target.value.toLowerCase();
        this.setState({ q }, () => this.filterList());
    }

    //Filter the list according to type
    filterList = () => {
        let users = this.state.users;
        let q = this.state.q;
        users = users && users.length > 0 && users.filter(function (user) {
            return (user.name.toLowerCase().indexOf(q) != -1 || user.alies_id.toLowerCase().indexOf(q) != -1);
            // return  // returns true or false
        });
        this.setState({ filteredUsers: users });
        if (this.state.q == '') {
            this.setState({ filteredUsers: [] });
        }
    }

    //Get All doctors
    alldoctor = () => {
        var FamilyList = [], FamilyList1 = [];
        doctorArray = [];
        const user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/DoctorUsers',
            commonHeader(user_token)).then((response) => {
                this.setState({ allDocData: response.data.data })
                for (let i = 0; i < this.state.allDocData.length; i++) {
                    var name = '';
                    if (this.state.allDocData[i].first_name && this.state.allDocData[i].last_name) {
                        name = this.state.allDocData[i].first_name + ' ' + this.state.allDocData[i].last_name
                    }
                    else if (this.state.allDocData[i].first_name) {
                        name = this.state.allDocData[i].first_name
                    }
                    doctorArray.push({
                        name: name,
                        id: this.state.allDocData[i]._id,
                        profile_id: this.state.allDocData[i].profile_id,
                        alies_id: this.state.allDocData[i].alies_id
                    })
                    FamilyList.push({ value: this.state.allDocData[i]._id, label: name })
                    FamilyList1.push({ profile_id: this.state.allDocData[i].profile_id, value: this.state.allDocData[i]._id, label: name })
                }
                this.setState({ users: doctorArray, family_doc_list: FamilyList, family_doc_list1: FamilyList1 })
            })
    }

    //For remove the doctor in the trusted Doctor
    removeDoctor = (doctor) => {
        let translate = getLanguage(this.props.stateLanguageType)
        let { remove, capab_Doctors, r_u_sure_remove_doctor, yes, no } = translate
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
                        <h1>{remove} {capab_Doctors}</h1>
                        <p>{r_u_sure_remove_doctor}</p>
                        <div className="react-confirm-alert-button-group">
                            <button
                                onClick={() => { this.deleteClickDoctor(doctor); onClose() }}
                            >
                                {yes}
                            </button>
                            <button
                                onClick={() => { onClose(); }}
                            >
                                {no}
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }

    //For Add the Doctor
    addDoctor = () => {
        this.setState({ already: false, SelectUser: false })
        if ((this.state.doctorId.doctor_id === '' || !this.state.doctorId.doctor_id) && (this.state.selectedUser === '')) {
            this.setState({ SelectUser: true })
        } else {
            var doctor_id
            if (this.state.doctorId.doctor_id != '' && this.state.selectedUser != '' && this.state.doctorId.doctor_id != undefined) {
                doctor_id = this.state.doctorId.doctor_id
                // profile_id= this.state.selectedprofile
            } else {
                if (this.state.doctorId.doctor_id != '' && this.state.doctorId.doctor_id != undefined) {
                    doctor_id = this.state.doctorId.doctor_id
                    // profile_id= this.state.selectedprofile
                }
                if (this.state.selectedUser != '' && this.state.selectedUser != undefined) {
                    doctor_id = this.state.selectedUser
                    // profile_id= this.state.selectedprofile
                }
            }
            const user_token = this.props.stateLoginValueAim.token;
            if (doctor_id != '' && doctor_id != undefined) {
                this.setState({ loaderImage: true })
                axios.put(sitedata.data.path + '/UserProfile/AddFavDoc', {
                    doctor: doctor_id,
                    profile_id: this.state.selectedprofile,
                }, commonHeader(user_token)).then((responce) => {
                    this.setState({ loaderImage: false, q: '', filteredUsers: [] })
                    if (responce.data.hassuccessed == true) {
                        this.setState({ succset: true });
                        setTimeout(() => { this.setState({ succset: false }) }, 5000)
                        axios.post(sitedata.data.path + '/UserProfile/AddtoPatientList/' + doctor_id, {
                            profile_id: this.props.stateLoginValueAim.user.profile_id
                        },
                            commonHeader(user_token)).then((responce) => { })
                        this.setState({ selectedUser: '', })
                        this.getUserData();
                    } else {
                        this.setState({ selectedUser: '' })
                        this.setState({ already: true })
                        this.getUserData();
                    }
                })
            }
        }
    }

    //For add/edit family doctor
    AddFmilyDoc = () => {
        if (this.state.family_doc1 && this.state.family_doc1.length > 0) {
            this.setState({ Nodoc: false, loaderImage: true })
            var myFilterData = this.state.family_doc_list1 && this.state.family_doc_list1.length > 0 && this.state.family_doc_list1.filter((ind) =>
                ind.value === this.state.family_doc.value);
            if (myFilterData && myFilterData.length > 0 && myFilterData[0] && myFilterData[0].profile_id) {
                AddFavDoc(myFilterData[0].profile_id, myFilterData[0].profile_id, this.props.stateLoginValueAim.token, this.props.stateLoginValueAim.user.profile_id);
            }
            axios.put(sitedata.data.path + '/UserProfile/Users/update', {
                family_doc: this.state.family_doc1
            }, commonHeader(this.props.stateLoginValueAim.token)).then((responce) => {
                if (this.props.comesFrom) {
                    this.props.EditFamilyDoc();
                }
                this.getUserData();
                this.setState({ PassDone: true, loaderImage: false })
                setTimeout(() => { this.setState({ PassDone: false }) }, 5000)

            })
        } else {
            this.setState({ Nodoc: true })
        }
    }

    //Send doctor reccomendation to trusted doctor 
    UpdateDoc = (id) => {
        this.setState({ recAdd: false, already1: false, loaderImage: true })
        const user_token = this.props.stateLoginValueAim.token;
        axios.put(sitedata.data.path + '/UserProfile/AddRecDoc', {
            doctor: id,
            profile_id: id,
        }, commonHeader(user_token)).then((responce) => {
            this.setState({ loaderImage: false, q: '', filteredUsers: [] });
            if (responce.data.hassuccessed == true) {
                this.setState({ recAdd: true })
                setTimeout(() => { this.setState({ recAdd: false }) }, 5000)
                axios.post(sitedata.data.path + '/UserProfile/AddtoPatientList/' + id, {
                    profile_id: this.props.stateLoginValueAim.user.profile_id
                }, commonHeader(user_token)).then((responce) => { })
                this.setState({ selectedUser: '', })
                this.getUserData();
            } else {
                this.setState({ already1: true })
                this.setState({ selectedUser: '' })
                this.getUserData();
            }
        })
    }

    toggle(position) {
        if (this.state.active === position) {
            this.setState({ active: null })
        } else {
            this.setState({ active: position })
        }
    }

    myColor(position) {
        if (this.state.active === position) {
            return "#00a891";
        }
        return "";
    }

    color(position) {
        if (this.state.active === position) {
            return "white";
        }
        return "";
    }

    //For geting the Images of the doctors
    // getImage = (image) => {
    //     const myFilterData = this.state.images && this.state.images.length > 0 && this.state.images.filter((value, key) =>
    //         value.image === image);
    //     if (myFilterData && myFilterData.length > 0) {
    //         return myFilterData[0].new_image;
    //     }
    // }

    //After confirm User delete from My doctor
    deleteClickDoctor = (doctor) => {
        this.setState({ loaderImage: true });
        const user_token = this.props.stateLoginValueAim.token;
        axios.delete(sitedata.data.path + '/UserProfile/favDocs/' + doctor + '/' + this.props.stateLoginValueAim.user.profile_id,
            commonHeader(user_token)).then((response) => {
                this.setState({ loaderImage: false, removes: true });
                setTimeout(() => { this.setState({ removes: false }) }, 5000)
                this.getUserData();
            }).catch((error) => {
                this.setState({ loaderImage: false });
            });
    }

    // On Select Family Docotor
    onSelectFamilyDoc(event) {
        var family_doc = [event.value];
        this.setState({ family_doc: event, family_doc1: family_doc });
     
    }

    render() {
        const userList = this.state.filteredUsers && this.state.filteredUsers.map(user => {
            return (
                <li key={user.id} style={{ background: this.myColor(user.id), color: this.color(user.id) }} value={user.profile_id}
                    onClick={() => { this.setState({ q: user.name, selectedUser: user.profile_id, selectedprofile: user.profile_id }); this.toggle(user.id); this.setState({ filteredUsers: [] }) }}
                >{user.name} ( {user.profile_id} )</li>
            )
        });
        var shown = {
            display: this.state.shown ? "none" : "block",
            width: '100%'
        };

        let translate = getLanguage(this.props.stateLanguageType)
        let { select_family_doc, family_doc, visible_emergancy, doc_added_succefully, New, make_sure_family_doc, add_a_family_doc, trusted_doc,
            doc_have_access_ur_journal, doc_already_exit_in_list, doc_removed_trusted_list, remove, add_trusted_doc, select_doctor,
            find_doc, serch_by_name_id, add_to_trusted_doc, recmonded_doc, doc_who_part_of_aimedis } = translate;


        return (
            <div className={this.props.comesFrom && 'paddingSides'}>
                <Grid className="docTabCntnt">
                    {this.state.loaderImage && <Loader />}
                    <Grid className="fmlyDoc">
                        <h3>{family_doc}</h3>
                        <p>{visible_emergancy}</p>
                    </Grid>
                    {this.state.PassDone && <div className="success_message">{doc_added_succefully}</div>}
                    {this.state.Nodoc && <div className="err_message">{select_family_doc}</div>}

                    <Grid className="addDocUpr">
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 9}>
                                <Select
                                    value={this.state.family_doc}
                                    onChange={(e) => this.onSelectFamilyDoc(e)}
                                    options={this.state.family_doc_list}
                                    placeholder={make_sure_family_doc}
                                    name="title"
                                    isSearchable={true}
                                    className="mkFmlyDoc"
                                />
                                {/* <Grid ><p></p></Grid> */}
                            </Grid>
                            <Grid item xs={12} md={this.props.comesFrom ? 12 : 3}>
                                <Grid className="addFmlyDoc"><a onClick={this.AddFmilyDoc}>+ {add_a_family_doc}</a></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {!this.props.comesFrom &&
                    <Grid className="doctrstCntnt">

                        <Grid className="trstfmlyDoc">
                            <h3>{trusted_doc}</h3>
                            <p>{doc_have_access_ur_journal}</p>
                        </Grid>
                        {this.state.recAdd && <div className="success_message">{doc_added_succefully}</div>}
                        {this.state.already1 && <div className="err_message">{doc_already_exit_in_list}</div>}
                        {this.state.removes && <div className="success_message">{doc_removed_trusted_list}</div>}
                        {this.state.myfavDoctors && this.state.myfavDoctors.length > 0 && this.state.myfavDoctors.map((index, i) => (
                            <Grid className="trstaddDocUpr">
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={9}>
                                        <Grid className="trstmkFmlyDoc 44">
                                            <Grid container direction="row" alignItems="center">
                                                <Grid item xs={12} md={5}>
                                                    {index.image ? <a><img src={getImage(index.image, this.state.images)} alt="" title="" /> </a>
                                                        : <a><img src={require('assets/images/chatPerson.jpg')} alt="" title="" /> </a>}<label>{index.first_name && index.first_name} {index.last_name && index.last_name}</label></Grid>
                                                <Grid item xs={12} md={7}><p>{index.alies_id && index.alies_id}</p></Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid className="trstaddFmlyDoc"><a onClick={() => { this.removeDoctor(index.profile_id) }}>{remove}</a></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}

                        {/* <Grid className="trstaddDocUpr">
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={9}>
                                <Grid className="trstmkFmlyDoc">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={4}><a><img src={require('assets/images/dr1.jpg')} alt="" title="" /></a><label>Mark Anderson M.D.</label></Grid>
                                        <Grid item xs={12} md={8}><p>D_lnTSgFWtN</p></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Grid className="trstaddFmlyDoc"><a>Remove</a></Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item xs={12} md={9}></Grid>
                            <Grid item xs={12} md={3}>
                                <Grid className="addTrstDoc"><a onClick={this.handleOpenTrust}>+ {add_trusted_doc}</a></Grid>
                            </Grid>
                        </Grid>

                        {/* Model setup */}
                        <Modal
                            open={this.state.openTrust}
                            onClose={this.handleCloseTrust}
                            className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme trstBoxModel" : "trstBoxModel"}>
                            <Grid className="trstBoxCntnt">
                                <Grid className="trstCourse">
                                    {this.state.succset && <div className="success_message">{doc_added_succefully}</div>}
                                    {this.state.SelectUser && <div className="err_message">{select_doctor}</div>}
                                    {this.state.already && <div className="err_message">{doc_already_exit_in_list}</div>}
                                    <Grid className="trstCloseBtn">
                                        <a onClick={this.handleCloseTrust}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <Grid><label>{New} {trusted_doc}</label></Grid>
                                </Grid>
                                <Grid className="findDoctor">
                                    <Grid><label>{find_doc}</label></Grid>
                                    <Grid><input type="text" placeholder={serch_by_name_id} value={this.state.q} onChange={this.onChange} />
                                        <ul className="insuranceHint" style={{ height: userList != '' ? '150px' : '' }}>
                                            {userList}
                                        </ul>
                                    </Grid>
                                    <Grid><input type="submit" value={add_to_trusted_doc} onClick={() => this.addDoctor()} /></Grid>
                                </Grid>
                            </Grid>
                        </Modal>
                        {/* End of Model setup */}

                        <Grid className="rectrstCntnt">
                            <Grid className="recfmlyDoc">
                                <h3>{recmonded_doc}</h3>
                                <p>{doc_who_part_of_aimedis}</p>
                            </Grid>
                            {this.state.reccomend && this.state.reccomend.length > 0 && this.state.reccomend.map((index, i) => (
                                <Grid className="recaddDocUpr">
                                    <Grid container direction="row" alignItems="center" spacing={2}>
                                        <Grid item xs={12} md={9}>
                                            <Grid className="recmkFmlyDoc">
                                                <Grid container direction="row" alignItems="center">
                                                    <Grid item xs={12} md={4}>
                                                        {index.image ? <a><img src={getImage(index.image, this.state.images)} alt="" title="" /> </a>
                                                            : <a><img src={require('assets/images/chatPerson.jpg')} alt="" title="" /> </a>}
                                                        <label>{index.first_name && index.first_name} {index.last_name && index.last_name}</label></Grid>
                                                    <Grid item xs={12} md={8}><p>{index.alies_id}</p></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Grid className="recaddFmlyDoc"><a onClick={() => { this.UpdateDoc(index.profile_id) }}>+ {add_to_trusted_doc}</a></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>}
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