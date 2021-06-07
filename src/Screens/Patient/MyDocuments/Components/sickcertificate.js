import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'Screens/Components/Loader/index';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import sitedata from 'sitedata';
import { getDate, getImage } from 'Screens/Components/BasicMethod/index';
import {
    getLanguage
} from "translations/index"
import Pagination from "Screens/Components/Pagination/index";
import { commonHeader } from 'component/CommonHeader/index';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList: [],
            currentPage: this.props.page,
            totalPage: this.props.totalPage,
            AllSick: [],
            pages: [1],
            images: [],
            addSick: false,
            AddSickCertificate: {},
            successfullsent1: false,
            showSick: false,
        };
        // new Timer(this.logOutClick.bind(this)) 
    }


    // Delete the Sick certificate confirmation
    updateCertificate(status, id) {
        let translate = getLanguage(this.props.stateLanguageType)
        let { Yes, No, update_inquiry, r_u_sure_update_inquiry, r_u_sure_cancel_inquiry, cancel_inquiry } = translate;

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "dark-confirm react-confirm-alert-body" : "react-confirm-alert-body"} >
                        {status && status === 'cancel' ? <h1>{cancel_inquiry}</h1> : <h1>{update_inquiry}</h1>}
                        <p>{status && status === 'cancel' ? r_u_sure_cancel_inquiry : r_u_sure_update_inquiry} </p>
                        <div className="react-confirm-alert-button-group">
                            <button
                                onClick={() => { this.updateCertificateDetails(status, id); onClose() }}
                            >
                                {Yes}
                            </button>
                            <button
                                onClick={() => { onClose(); }}
                            >
                                {No}
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }

    // Delete the Sick certificate 
    updateCertificateDetails(status, id) {
        let user_token = this.props.stateLoginValueAim.token
        axios.put(sitedata.data.path + '/UserProfile/GetSickCertificate/' + id, {
            status: status
        }, commonHeader(user_token)).then((response) => {
            this.getSick();
        }).catch((error) => {
        })
    }

    componentDidMount = () => {
        this.getSick();
    }

    //On addition new data
    componentDidUpdate = (prevProps) => {
        if (prevProps.newItem !== this.props.newItem) {
            this.getSick();
        }
    }
    // Add the Sick Certificate State
    AddSickState = (e) => {
        const state = this.state.AddSickCertificate;
        state[e.target.name] = e.target.value;
        this.setState({ AddSickCertificate: state })
    }

    //For set the Name by Event like since_when for Sick certificate
    eventnameSet = (name, value) => {
        const state = this.state.AddSickCertificate;
        state[name] = value;
        this.setState({ AddSickCertificate: state })
    }

    //open and close Sick certificate Details
    handleaddSick = (data) => {
        this.setState({ showSick: false, addSick: true, AddSickCertificate: data });
    };
    handleCloseSick = () => {
        this.setState({ addSick: false });
    };

    //open and close Sick certificate Details
    handleshowSick = (data) => {
        this.setState({ showSick: true, addSick: false, AddSickCertificate: data });
    };
    handleCloseShowSick = () => {
        this.setState({ showSick: false });
    };

    //For update the certificate
    Submitcertificate = () => {
        var user_token = this.props.stateLoginValueAim.token;
        var data = this.state.AddSickCertificate;
        axios.put(sitedata.data.path + '/UserProfile/UpdateSickcertificate/' + this.state.AddSickCertificate._id, data,
            commonHeader(user_token)).then((response) => {
                this.setState({ successfullsent1: true, addSick: false })
                setTimeout(() => { this.setState({ successfullsent1: false }) }, 5000)
                this.getSick();
            }).catch((error) => {
            })
    }
    //Get all the sick certificates
    getSick = () => {
        this.setState({ loaderImage: true })
        var user_token = this.props.stateLoginValueAim.token;
        axios.get(sitedata.data.path + '/UserProfile/RequestedSickCertificate',
            commonHeader(user_token)).then((response) => {
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
                this.setState({ AllSick: response.data.data, loaderImage: false, currentPage: 1, totalPage: totalPage },
                    () => {
                        if (totalPage > 1) {
                            var pages = [];
                            for (var i = 1; i <= this.state.totalPage; i++) {
                                pages.push(i)
                            }
                            this.setState({ currentList: this.state.AllSick.slice(0, 10) })
                        }
                        else { this.setState({ currentList: this.state.AllSick }) }
                    })
            })
    }

    //For chnage the Page
    onChangePage = (pageNumber) => {
        this.setState({ currentList: this.state.AllSick.slice((pageNumber - 1) * 10, pageNumber * 10), currentPage: pageNumber })
    }

    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let { Case, capab_Doctors, status, sent, on, which_symptoms_do_u_hav, cancel_details, update_entry, not_mentioned, days, since_when, prescription, how_u_feeling, Pending, request, edit, Rejected, Answered, Cancelled, see, sick_cert, my_doc, New, inquiry, again, modify, cancel,
            doc_and_statnderd_ques, doc_aimedis_private, it_is_known_dieseas, r_u_tracking_medi, do_u_hv_allergies, what_ur_profession, Week_or_more, today, yesterday, ago, show, Yes, No, next, previous,
            how_long_do_u_unable_to_work, have_u_already_been_sick, Annotations, is_ur_temp_high_to_38, req_updated_successfully, details, questions } = translate

        return (
            <div>
                {this.state.successfullsent1 && <div className="success_message">{req_updated_successfully}</div>}
                <Grid className="presOpinionIner">
                    {this.state.loaderImage && <Loader />}

                    <Table>
                        <Thead>
                            <Tr>
                                <Th>{Case}</Th>
                                <Th>{sent} {on}</Th>
                                <Th>{capab_Doctors}</Th>
                                <Th>{status}</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {this.state.currentList && this.state.currentList.length > 0 && this.state.currentList.map((data, index) => (
                                <Tr>
                                    <Td>{data.which_symptomps ? data.which_symptomps : not_mentioned}</Td>
                                    <Td>{data.send_on ? getDate(data.send_on, this.props.settings.setting.date_format) : not_mentioned}</Td>
                                    {/* <Td className="presImg"><img src={require('assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td> */}
                                    <Td className="presImg"><img src={data.docProfile && data.docProfile.profile_image ? getImage(data.docProfile.profile_image, this.state.images) : require('assets/images/dr1.jpg')} alt="" title="" />{data.docProfile && data.docProfile.first_name && data.docProfile.first_name} {data.docProfile && data.docProfile.last_name && data.docProfile.last_name}</Td>
                                    {data.status === 'pending' && <Td><span className="revwYelow"></span>{Pending} </Td>}
                                    {data.status === 'accept' && <Td><span className="revwGren"></span>{Answered} </Td>}
                                    {data.status === 'remove' && <Td><span className="revwRed"></span>{Rejected}</Td>}
                                    {data.status === 'decline' && <Td><span className="revwRed"></span> {Rejected}</Td>}
                                    {data.status === 'cancel' && <Td><span className="revwRed"></span> {Cancelled}</Td>}
                                    {data.status === 'free' && <Td><span className="revwGry"></span> {sent} {request}</Td>}
                                    {data.status === 'normal' && <Td><span className="revwGry"></span>{sent} {request}</Td>}
                                    <Td className="presEditDot scndOptionIner">
                                        <a className="openScndhrf">
                                            <img src={require('assets/images/three_dots_t.png')} alt="" title="" className="openScnd" />
                                            <ul>
                                                <li><a onClick={() => { this.handleshowSick(data) }}><img src={require('assets/images/details.svg')} alt="" title="" />{see} {details}</a></li>
                                                {data.status !== 'accept' && <li><a onClick={() => { this.handleaddSick(data) }}><img src={require('assets/images/edit.svg')} alt="" title="" />{modify}</a></li>}
                                                {data.status === 'decline' && <li><a onClick={() => { this.updateCertificate('free', data._id) }}><img src={require('assets/images/plus.png')} alt="" title="" />{inquiry} {again}</a></li>}
                                                {data.status !== 'cancel' && <li><a onClick={() => { this.updateCertificate('cancel', data._id) }}><img src={require('assets/images/cancel-request.svg')} alt="" title="" />{cancel} {request}</a></li>}
                                            </ul>
                                        </a>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    {/* Model setup for sick sertificate*/}
                    <Modal
                        open={this.state.addSick}
                        onClose={this.handleCloseSick}
                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme nwPresModel" : "nwPresModel"}>
                        <Grid className="nwPresCntnt">
                            <Grid className="nwPresCntntIner">
                                <Grid className="nwPresCourse">
                                    <Grid className="nwPresCloseBtn">
                                        <a onClick={this.handleCloseSick}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <p>{edit} {inquiry}</p>
                                    <Grid><label>{sick_cert}</label></Grid>
                                </Grid>
                                <Grid className="docHlthMain">
                                    <Grid className="drstndrdQues">
                                        <h3>{doc_and_statnderd_ques}</h3>
                                        <Grid className="drsplestQues">
                                            <Grid><label>{doc_aimedis_private}</label></Grid>
                                            <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.first_name && this.state.AddSickCertificate.docProfile.first_name} {this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.last_name && this.state.AddSickCertificate.docProfile.last_name}</h3></Grid>
                                        </Grid>
                                        <Grid className="drsplestQues">
                                            <Grid><label>{how_u_feeling}?</label></Grid>
                                            <Grid>
                                                <input type="text" name="how_are_you" value={this.state.AddSickCertificate.how_are_you} onChange={this.AddSickState} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="ishelpUpr">
                                        <Grid className="ishelpLbl"><label>{is_ur_temp_high_to_38}?</label></Grid>
                                        <Grid className="ishelpChk">
                                            <FormControlLabel control={<Radio />} name="fever" value="yes" color="#00ABAF" checked={this.state.AddSickCertificate.fever === 'yes'} onChange={this.AddSickState} label={Yes} />
                                            <FormControlLabel control={<Radio />} name="fever" color="#00ABAF" value="no" checked={this.state.AddSickCertificate.fever === 'no'} onChange={this.AddSickState} label={No} />
                                        </Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{which_symptoms_do_u_hav}?</label></Grid>
                                        <Grid><input type="text" name="which_symptomps" value={this.state.AddSickCertificate.which_symptomps} onChange={this.AddSickState} /></Grid>
                                    </Grid>
                                    <Grid className="medicnSub sncWhen">
                                        <Grid><label>{since_when}?</label></Grid>
                                        <Grid>
                                            <a className={this.state.AddSickCertificate.since_when === 'Today' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', 'Today') }}>{today}</a>
                                            <a className={this.state.AddSickCertificate.since_when === 'Yesterday' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', 'Yesterday') }}>{yesterday}</a>
                                            <a className={this.state.AddSickCertificate.since_when === '2 days ago' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', '2 days ago') }}>2 {days} {ago}</a>
                                            <a className={this.state.AddSickCertificate.since_when === '3-6 days ago' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', '3-6 days ago') }}>3-6 {days} {ago}</a>
                                            <a className={this.state.AddSickCertificate.since_when === 'Week or more' && "current_since_when"} onClick={() => { this.eventnameSet('since_when', 'Week or more') }}>{Week_or_more}</a></Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{have_u_already_been_sick}?</label></Grid>
                                        <Grid><input type="text" name="same_problem_before" value={this.state.AddSickCertificate.same_problem_before} onChange={this.AddSickState} /></Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{how_long_do_u_unable_to_work}?</label></Grid>
                                        <Grid className="doseMg"><input type="text" name="time_unable_work" value={this.state.AddSickCertificate.time_unable_work} onChange={this.AddSickState} />
                                            <span>{days}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{it_is_known_dieseas}?</label></Grid>
                                        <Grid><input type="text" name="known_diseases" value={this.state.AddSickCertificate.known_diseases} onChange={this.AddSickState} /></Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{r_u_tracking_medi}?</label></Grid>
                                        <Grid><input type="text" name="medication" value={this.state.AddSickCertificate.medication} onChange={this.AddSickState} /></Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{do_u_hv_allergies}?</label></Grid>
                                        <Grid><input type="text" name="allergies" value={this.state.AddSickCertificate.allergies} onChange={this.AddSickState} /></Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{what_ur_profession}?</label></Grid>
                                        <Grid><input type="text" name="professions" value={this.state.AddSickCertificate.professions} onChange={this.AddSickState} /></Grid>
                                    </Grid>
                                    <Grid className="medicnSub">
                                        <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                        <Grid><textarea name="annotations" value={this.state.AddSickCertificate.annotations} onChange={this.AddSickState}> </textarea></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="infoShwHidBrdr2"></Grid>
                                <Grid className="infoShwHidIner2">
                                    {/* <Grid className="infoShwHidMain2">
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item xs={6} md={6}>
                                            <Grid className="infoShwHid2">
                                                <a>Show or Hide <img src={require('assets/images/Info.svg')} alt="" title="" /></a>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} md={6} className="editShwHid2">
                                            <a>Edit</a>
                                        </Grid>
                                    </Grid>
                                </Grid> */}
                                    <Grid className="infoShwSave2">
                                        <input type="submit" onClick={this.Submitcertificate} value={update_entry} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Modal>


                    {/* Model setup for sick sertificate*/}
                    <Modal
                        open={this.state.showSick}
                        onClose={this.handleCloseShowSick}
                        className={this.props.settings && this.props.settings.setting && this.props.settings.setting.mode === 'dark' ? "darkTheme nwPresModel" : "nwPresModel"}>
                        <Grid className="nwPresCntnt">
                            <Grid className="nwPresCntntIner">
                                <Grid className="nwPresCourse">
                                    <Grid className="nwPresCloseBtn">
                                        <a onClick={this.handleCloseShowSick}>
                                            <img src={require('assets/images/close-search.svg')} alt="" title="" />
                                        </a>
                                    </Grid>
                                    <p>{show} {inquiry}</p>
                                    <Grid><label>{sick_cert}</label></Grid>
                                </Grid>
                                <Grid className="docHlthMain">
                                    <Grid className="drstndrdQues">
                                        <h3>{doc_and_statnderd_ques}</h3>
                                        <Grid className="drsplestQues">
                                            <Grid><label>{doc_aimedis_private}</label></Grid>
                                            <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.first_name && this.state.AddSickCertificate.docProfile.first_name} {this.state.AddSickCertificate && this.state.AddSickCertificate.docProfile && this.state.AddSickCertificate.docProfile.last_name && this.state.AddSickCertificate.docProfile.last_name}</h3></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{how_u_feeling}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.how_are_you && this.state.AddSickCertificate.how_are_you}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid className="ishelpLbl"><label>{is_ur_temp_high_to_38}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.fever && this.state.AddSickCertificate.fever}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{which_symptoms_do_u_hav}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.which_symptomps && this.state.AddSickCertificate.which_symptomps}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{since_when}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.since_when && this.state.AddSickCertificate.since_when}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{have_u_already_been_sick}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.same_problem_before && this.state.AddSickCertificate.same_problem_before}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{how_long_do_u_unable_to_work}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.time_unable_work && this.state.AddSickCertificate.time_unable_work} days</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{it_is_known_dieseas}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.known_diseases && this.state.AddSickCertificate.known_diseases}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{r_u_tracking_medi}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.medication && this.state.AddSickCertificate.medication}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{do_u_hv_allergies}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.allergies && this.state.AddSickCertificate.allergies}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{what_ur_profession}?</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.professions && this.state.AddSickCertificate.professions}</h3></Grid>
                                    </Grid>
                                    <Grid className="drsplestQues">
                                        <Grid><label>{Annotations} / {details} / {questions}</label></Grid>
                                        <Grid><h3>{this.state.AddSickCertificate && this.state.AddSickCertificate.annotations && this.state.AddSickCertificate.annotations}</h3></Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="infoShwHidBrdr2"></Grid>
                                <Grid className="infoShwHidIner2">
                                    <Grid className="infoShwSave2">
                                        <input type="submit" onClick={this.handleCloseShowSick} value={cancel_details} />
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
                                    <a>{this.state.currentPage} of {this.state.totalPage}</a>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {this.state.totalPage > 1 && <Grid className="prevNxtpag">
                                <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} pages={this.state.pages} onChangePage={(page) => { this.onChangePage(page) }} />
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