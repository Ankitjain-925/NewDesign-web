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






class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            stamp: {},
            fileattach: {},
            loaderImage: false,
            data: this.props.data,
            finishError: ''
        };
    }


    componentDidMount() {
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

    updateEntryState2 = (event) => {
        var state = this.state.stamp;
        state[event.target.name] = event.target.value;
        this.setState({ stamp: state });
    };


    CertificateSubmit = (value) => {
        let translate = getLanguage(this.props.stateLanguageType);
        let { } = translate;
        this.setState({ finishError: "" })
        console.log('this.props.certificateId', this.props.certificateId)
        if (this.props.certificateId) {
            let data = {}
            data = this.state.stamp
            console.log('data', this.state.stamp)
            if (this.state.fileattach && this.state.fileattach.length > 0) {
                data.fileattach = this.state.fileattach;
            }
          this.setState({ loaderImage: true })
                axios
                    .put(
                        sitedata.data.path + '/vh/AddTask/' + this.props.certificateId,
                        {
                            certificate: data
                        },
                        commonHeader(this.props.stateLoginValueAim.token)
                    )
                    .then((responce) => {
                        if (responce.data.hassuccessed) {
                            this.props.handleCloseTask();
                        }
                        this.setState({ loaderImage: false })

                    });
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
            Date,
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
                                        <Grid className="certifyForm">
                                            <Grid className="insrnceCmp cmnSpc">
                                            <div className="err_message">
                                {this.state.finishError}
                              </div>
                                                <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Insurance_company}</label></Grid>
                                                <Grid><input type="text" name="insurance_company" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.insurance_company || ''} /></Grid>
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
                                                            <Grid><input type="date" name="birthday" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.birthday || ''} /></Grid>
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

                                                            <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed') ? this.props.stateLanguageType === 'de' && ('setColorRed') : this.props.stateLanguageType === 'en' && ('setColorBlack')}><label>{Date}</label></Grid>
                                                            <Grid><input type="date" name="date" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.date || ''} /></Grid>
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
                                                    <input type="date" name="imposible" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.imposible || ''} />


                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={8}>
                                        <Grid container direction="row" alignItems="center" spacing={1}>
                                            <Grid item xs={12} sm={7} md={7}>
                                                <Grid className="insrnceCmp">
                                                    <Grid className={this.props.stateLanguageType === 'de' && ('setColorRed3') ? this.props.stateLanguageType === 'de' && ('setColorRed2') : this.props.stateLanguageType === 'en' && ('setColorBlack2')}>
                                                        <label>{most_until}<p className='hhh'>{work_until}</p></label>

                                                    </Grid>

                                                </Grid>

                                            </Grid>
                                            <Grid item xs={12} sm={5} md={5}>
                                                <Grid className="wrkInput spacedistance">
                                                    <input type="date" name="most_likely" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.most_likely || ''} />


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
                                                    <input type="date" name="detected_at" onChange={(e) => this.updateEntryState2(e)} value={this.state.stamp.detected_at || ''} />


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
                            <Grid></Grid>
                            <Button onClick={() => this.CertificateSubmit()} >{create}</Button>
                        </Grid>
                        <Grid item xs={4} md={4} className="infoShwSave3">
                            <Button onClick={(data) => {
                                console.log('decline', this.props.taskData._id)
                                this.props.handleApprovedDetails(this.props.taskData._id, 'decline', this.props.taskData)

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