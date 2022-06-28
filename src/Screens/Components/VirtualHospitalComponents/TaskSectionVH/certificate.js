import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { authy } from 'Screens/Login/authy.js';
import { houseSelect } from 'Screens/VirtualHospital/Institutes/selecthouseaction';
import { OptionList } from 'Screens/Login/metadataaction';
import { Speciality } from 'Screens/Login/speciality.js';
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from 'translations/index';
import _ from 'lodash';
import axios from 'axios';
import sitedata from 'sitedata';
import Loader from "Screens/Components/Loader/index";
import NotesEditor from 'Screens/Components/Editor/index';
import FileUploader from 'Screens/Components/JournalFileUploader/index';
import { Button, Input } from '@material-ui/core';
import moment from "moment";
import { commonHeader } from 'component/CommonHeader/index';
import DateFormat from 'Screens/Components/DateFormat/index';



class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
            stamp: {},
            fileattach: {},
            loaderImage: false,
            finishError: '',
         };
    }


    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
        });
    };



    updateAllEntrySec2 = (e) => {
        var state = this.state.stamp;
        state[e.target.name] = e.target.checked;
        this.setState({ stamp: state });
    };

    updateEntryState2 = (event, date) => {
        var state = this.state.stamp;
        state[event.target.name] = event.target.value;
        this.setState({ stamp: state, startDate: date });

    };

    updateEntryState3 = (event, name) =>{
        var state = this.state.stamp;
        state[name] = event;
        this.setState({ stamp: state});

    }


    CertificateSubmit = () => {
        let translate = getLanguage(this.props.stateLanguageType);
        let { plz_enter_insurance_company
            , plz_enter_first_name,
            plz_enter_number_insurance,
            plz_enter_birth,
            plz_enter_number_person,
            plz_enter_status,
            plz_enter_hospital_number,
            plz_enter_doctor_number,
            plz_enter_date,
            plz_enter_disability_certification,
            plz_enter_imposible_since,
            plz_enter_imposs_work_until,
            plz_enter_detected_at,
            plz_attached_file
        } = translate;
        this.setState({ finishError: "" })
        if (this.props.certificateId) {
            let data = {}
            data = this.state.stamp
            if (this.state.fileattach && this.state.fileattach.length > 0) {
                data.fileattach = this.state.fileattach;
            }
            if (!data.insurance_company) {
                this.setState({ finishError: plz_enter_insurance_company })
            }
            else if (!data.name) {
                this.setState({ finishError: plz_enter_first_name })
            }
            else if (!data.birthday) {
                this.setState({ finishError: plz_enter_birth })
            }
            else if (!data.number_insurance_company) {
                this.setState({ finishError: plz_enter_number_insurance })
            }
            else if (!data.insurance_number_person) {
                this.setState({ finishError: plz_enter_number_person })
            }
            else if (!data.status) {
                this.setState({ finishError: plz_enter_status })
            }
            else if (!data.hospital_number) {
                this.setState({ finishError: plz_enter_hospital_number })
            }
            else if (!data.doctor_number) {
                this.setState({ finishError: plz_enter_doctor_number })
            }
            else if (!data.date) {
                this.setState({ finishError: plz_enter_date })
            }
            else if (!data.description) {
                this.setState({ finishError: plz_enter_disability_certification })
            }
            else if (!data.imposible) {
                this.setState({ finishError: plz_enter_imposible_since })
            }
            else if (!data.most_likely) {
                this.setState({ finishError: plz_enter_imposs_work_until })
            }
            else if (!data.detected_at) {
                this.setState({ finishError: plz_enter_detected_at })
            }
            else if (!data.fileattach) {
                this.setState({ finishError: plz_attached_file })
            }
            else {
                this.setState({ loaderImage: true })
                axios
                    .put(
                        sitedata.data.path + '/vh/AddTask/' + this.props.certificateId,
                        {
                            certificate: data,
                            status: "done"
                        },
                        commonHeader(this.props.stateLoginValueAim.token)
                    )
                    .then((responce) => {
                        if (responce.data.hassuccessed) {
                            data.usefor = "mail";
                            data.patient_id = this.props.PatientID;
                            axios
                                .post(
                                    sitedata.data.dowload_link + '/vactive/downloadSickleaveCertificate',
                                    data,
                                    commonHeader(this.props.stateLoginValueAim.token)
                                )
                                .then((responce) => { });
                            this.props.handleCloseTask();
                        }
                        this.setState({ loaderImage: false })

                    });
            }
        }
    };


    render() {
        let { info } = this.state
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            Insurance_company,
            Name,
            DOB,
            Insurance_Company,
            Insurance_Person,
            Status,
            Hospital_Number,
            Doctor_Number,
            date,
            First_Certification,
            Workincident,
            Occupational_disease,
            Continuation_of_certification,
            Sent_Special_Doctor,
            Assigned_doctor,
            Imposible_since,
            most_until,
            work_until,
            detected_at,
            Stamp_Doctor,
            disability,
            certification,
            create,
            decline,
            head_dr

        } = translate;

        return (
            <Grid >
                {this.state.loaderImage && <Loader />}

                <Grid className="certificateBg">
                    <Grid className="headerHeight">
                        <Grid container direction="row" justifyContent="center">
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container direction="row" spacing={5}>
                                    <Grid item xs={12} sm={8} md={8}>
                                        <div className="err_message">
                                            {this.state.finishError}
                                        </div>
                                        <Grid className="certifyForm">
                                            <Grid className="insrnceCmp cmnSpc">
                                                <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Insurance_company}</label></Grid>
                                                <Grid>
                                                    <input type="text" name="insurance_company" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.insurance_company || ''} /></Grid>
                                            </Grid>
                                            <Grid className="cmnSpc">
                                               <Grid container direction="row" alignItems="center" spacing={1}>
                                                     <Grid item xs={12} sm={7} md={7}>
                                                        <Grid className="insrnceCmp">
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Name}</label></Grid>
                                                            <Grid><input type="text" name="name" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.name || ''} /></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={5} md={5}>
                                                        <Grid className="insrnceCmp">
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{DOB}</label></Grid>
                                                            <Grid>
                                                            <DateFormat
                                                                name="birthday"
                                                                value={
                                                                this.state.stamp?.birthday
                                                                    ? new Date(this.state.stamp?.birthday)
                                                                    : new Date()
                                                                }
                                                                NotFutureDate={true}
                                                                max={new Date()}
                                                                date_format={
                                                                this.props.settings.setting &&
                                                                this.props.settings.setting.date_format
                                                                }

                                                                onChange={(e) => this.updateEntryState3(e, "birthday")}
                                                            />
                                                            </Grid>
                                                                
                                                                {/* <input type="date" name="birthday" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.birthday || ''} /> */}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid className="cmnSpc">
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Grid container direction="row" alignItems="center" spacing={1}>
                                                        <Grid item xs={12} sm={12} md={4}>
                                                            <Grid className="insrnceCmp">
                                                               <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} >
                                                                    <label>{Insurance_Company}</label></Grid>
                                                                <Grid><input type="text" name="number_insurance_company" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.number_insurance_company || ''} /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={4}>
                                                            <Grid className="insrnceCmp">
                                                               <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} ><label>{Insurance_Person}</label></Grid>
                                                                <Grid><input type="text" name="insurance_number_person" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.insurance_number_person || ''} /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={4}>
                                                            <Grid className="insrnceCmp">
                                                               <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Status}</label></Grid>
                                                                <Grid><input type="text" name="status" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.status || ''} /></Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid container direction="row" alignItems="center" spacing={1}>
                                                    <Grid item xs={12} sm={12} md={4}>
                                                        <Grid className="insrnceCmp">
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}>
                                                                <label>{Hospital_Number}</label></Grid>
                                                            <Grid><input type="text" name="hospital_number" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.hospital_number || ''} /></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={4}>
                                                        <Grid className="insrnceCmp">
                                                          <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} ><label>{Doctor_Number}</label></Grid>
                                                            <Grid><input type="text" name="doctor_number" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.doctor_number || ''} /></Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={4}>
                                                        <Grid className="insrnceCmp">
                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{date}</label></Grid>
                                                            <Grid>
                                                            <DateFormat
                                                                name="date"
                                                                value={
                                                                this.state.stamp?.date
                                                                    ? new Date(this.state.stamp?.date)
                                                                    : new Date()
                                                                }
                                                                date_format={
                                                                this.props.settings.setting &&
                                                                this.props.settings.setting.date_format
                                                                }
                                                                onChange={(e) => this.updateEntryState3(e, "date")}
                                                            />
                                                                {/* <input type="date" name="date" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.date || ''} /> */}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <Grid className="setArbtUpr">
                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} >
                                                <Grid className='diablcertificate'>
                                                    <p>{disability}<br className='allDisableSec' />{certification}</p></Grid>
                                                <Grid className='noteCertificate'>
                                                    <textarea
                                                        className='noteCertificate2'
                                                        placeholder={"text"}
                                                        name="description"
                                                        onChange={(e) =>
                                                            this.updateEntryState2(
                                                                e
                                                            )
                                                        }
                                                        value={this.state.stamp.description || ''}
                                                    ></textarea>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className="certifyCheck">
                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                <label>{First_Certification}</label>
                                                <Grid className="formGroupChk">
                                                    <input type="checkbox" id="Workincident" name={"workincident"} onChange={(e) => this.updateAllEntrySec2(e)} value={this.state.stamp &&
                                                        this.state.stamp?.workincident &&
                                                        this.state.stamp?.workincident ==
                                                        true
                                                        ? false
                                                        : true || ''}
                                                        checked={
                                                            this.state.stamp?.workincident
                                                        }
                                                    />
                                                    <label for="Workincident">
                                                        <span>{Workincident}</span>
                                                    </label>
                                                </Grid>
                                                <Grid className="formGroupChk">
                                                    <input type="checkbox" id="disease" name={"occupational_disease"} onChange={(e) => this.updateAllEntrySec2(e)} value={this.state.stamp &&
                                                        this.state.stamp?.occupational_disease &&
                                                        this.state.stamp?.occupational_disease ==
                                                        true
                                                        ? false
                                                        : true || ''}
                                                        checked={
                                                            this.state.stamp?.occupational_disease
                                                        } />
                                                    <label for="disease">
                                                        <span>{Occupational_disease}</span>
                                                    </label>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                <label>{Continuation_of_certification}</label>
                                                <Grid className="formGroupChk">
                                                    <input type="checkbox" id="Special" name={"sent_special_doctor"} value={
                                                        this.state.stamp &&
                                                            this.state.stamp?.sent_special_doctor &&
                                                            this.state.stamp?.sent_special_doctor ==
                                                            true
                                                            ? false
                                                            : true || ''

                                                    } checked={
                                                        this.state.stamp?.sent_special_doctor
                                                    } onChange={(e) => this.updateAllEntrySec2(e)} />
                                                    <label for="Special">
                                                        <span>{Sent_Special_Doctor}</span>
                                                    </label>
                                                </Grid>
                                                <Grid className="formGroupChk">
                                                    <input type="checkbox" id="Dem" name={"assigned_doctor"} value={this.state.stamp &&
                                                        this.state.stamp?.assigned_doctor &&
                                                        this.state.stamp?.assigned_doctor ==
                                                        true
                                                        ? false
                                                        : true || ''}
                                                        checked={
                                                            this.state.stamp?.assigned_doctor
                                                        }
                                                        onChange={(e) => this.updateAllEntrySec2(e)} />
                                                    <label for="Dem">
                                                        <span>{Assigned_doctor}</span>
                                                    </label>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container direction="row" justifyContent="center">
                                    <Grid item xs={12} sm={8} md={8}>
                                        <Grid container direction="row" alignItems="center" spacing={1}>
                                            <Grid item xs={12} sm={7} md={7}>
                                                <Grid className="insrnceCmp">
                                                    <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')} >
                                                        <label>{Imposible_since}</label>
                                                    </Grid>
                                                </Grid>
                                             </Grid>
                                            <Grid item xs={12} sm={5} md={5}>
                                                <Grid className="wrkInput ">
                                                <DateFormat
                                                                name="imposible"
                                                                value={
                                                                this.state.stamp?.imposible
                                                                    ? new Date(this.state.stamp?.imposible)
                                                                    : new Date()
                                                                }
                                                                date_format={
                                                                this.props.settings.setting &&
                                                                this.props.settings.setting.date_format
                                                                }
                                                                onChange={(e) => this.updateEntryState3(e, "imposible")}
                                                            />
                                                    {/* <input type="date" name="imposible" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.imposible || ''} /> */}
                                               </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={8}>
                                        <Grid container direction="row" alignItems="center" spacing={1}>
                                            <Grid item xs={12} sm={7} md={7}>
                                                <Grid className="insrnceCmp">
                                                    <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed3') ? this.props.stateLanguageType === 'de' && ('setColorRed3') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                        <label>{most_until}<p className='hhh'>{work_until}</p></label>
                                                    </Grid>
                                                 </Grid>
                                                </Grid>
                                            <Grid item xs={12} sm={5} md={5}>
                                                <Grid className="wrkInput spacedistance">
                                                <DateFormat
                                                                name="most_likely"
                                                                value={
                                                                this.state.stamp?.most_likely
                                                                    ? new Date(this.state.stamp?.most_likely)
                                                                    : new Date()
                                                                }
                                                                date_format={
                                                                this.props.settings.setting &&
                                                                this.props.settings.setting.date_format
                                                                }
                                                              
                                                                onChange={(e) => this.updateEntryState3(e, "most_likely")}
                                                                //  NotFutureDate={true}
                                                            />
                                                    {/* <input type="date" min={this.state.stamp.imposible} name="most_likely" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.most_likely || ''} /> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={8}>
                                        <Grid container direction="row" alignItems="center" spacing={1}>
                                            <Grid item xs={12} sm={7} md={7}>
                                                <Grid >
                                                    <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed2') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                        <label>{detected_at}</label>
                                                   </Grid>
                                                </Grid>
                                             </Grid>
                                            <Grid item xs={12} sm={5} md={5}>
                                                <Grid className="wrkInput spacedistance">
                                                <DateFormat
                                                                name="detected_at"
                                                                value={
                                                                this.state.stamp?.detected_at
                                                                    ? new Date(this.state.stamp?.detected_at)
                                                                    : new Date()
                                                                }
                                                                NotFutureDate={true}
                                                                date_format={
                                                                this.props.settings.setting &&
                                                                this.props.settings.setting.date_format
                                                                }
                                                                onChange={(e) => this.updateEntryState3(e, "detected_at")}
                                                            />
                                                    {/* <input type="date" name="detected_at" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.detected_at || ''} /> */}
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                        <Grid className='stampDoctor' >
                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')} >
                                                <label>{Stamp_Doctor}<p className='hhh'>{head_dr}</p> </label>
                                                <Grid className='uplodedFile'>
                                                    <FileUploader
                                                        attachfile={
                                                            this.state.stamp &&
                                                                this.state.stamp?.fileattach
                                                                ? this.state.stamp?.fileattach
                                                                : []
                                                        }

                                                        name="UploadTrackImageMulti"
                                                        comesFrom="journal"
                                                        comesFrom1="certificate"
                                                        isMulti={true}
                                                        fileUpload={(e) => this.FileAttachMulti(e)}
                                                    />
                                                    {this.state.error_section == 18 && (
                                                        <div className="err_message2">
                                                            {this.state.errorChrMsg}
                                                        </div>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                      <Grid container direction="row" alignItems="center" >
                        <Grid item xs={4} md={4} className="infoShwSave2">
                         <Button onClick={() => this.CertificateSubmit()} >{create}</Button>
                        </Grid>
                        <Grid item xs={4} md={4} className="infoShwSave3">
                            <Button onClick={(data) => {
                                this.props.handleApprovedDetails(this.props.taskData?._id, 'decline', this.props.taskData)
                            }}>{decline}</Button>
                    </Grid>
                       </Grid>
                </Grid>
            </Grid>
        );

    }
}

const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { speciality } = state.Speciality;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        House,
        settings,
        verifyCode,
        speciality,
        metadata,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
        houseSelect,
        OptionList,
        Speciality,
    })(Index)
);