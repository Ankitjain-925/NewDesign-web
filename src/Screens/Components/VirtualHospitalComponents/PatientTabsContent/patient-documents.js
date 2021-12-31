import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from "Screens/Login/authy.js";
import { OptionList } from "Screens/Login/metadataaction";
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getLanguage } from 'translations/index';
import Modal from "@material-ui/core/Modal";
import { commonHeader } from "component/CommonHeader/index"
import sitedata from "sitedata";
import axios from "axios";
import SPECIALITY from "speciality";
import {
    mySorter
} from "Screens/Components/BasicMethod/index";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import moment from "moment";
import FUFields from "Screens/Components/TimelineComponent/FUFields/index";
import { get_gender, get_cur_one, get_track, update_entry_state, download_track } from "Screens/Components/CommonApi/index";
import { DocView } from "Screens/Components/DocView/index.js";
const options = [
    { value: 'data1', label: 'Data1' },
    { value: 'data2', label: 'Data2' },
    { value: 'data3', label: 'Data3' },
];
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            cur_one: {},
            cur_one2: {},
            visibility: false,
            gettrackdatas: {},
            AllSpecialty: [],
            updateTrack: {},
            newEntry: false,
            allTrack1: [],
            allTrack2: [],
            visibility: false,
            updateOne: 0,
            updateTrack: {},
        };
    }

    componentDidMount = async () => {
        let user_id = this.props.match.params.id;
        let user_token = this.props.stateLoginValueAim.token
        let response = await get_track(user_token, user_id)
        let docData = response?.data?.data
        let attachedFile = []
        await docData && docData.length > 0 && docData.map((result, i) => {
            if (result.attachfile && result.attachfile.length > 0) {
                result.attachfile.map(data => {
                    let data1 = {
                        "filename": data.filename,
                        "filetype": data.filetype,
                        "created_by": result.created_by_temp,
                        "created_on": result.created_on
                    }
                    attachedFile.push(data1)
                })
            }
        })
        this.setState({ attachedFile: attachedFile })
        this.getMetadata();
        if (this.props.match.params.id) {
            this.GetInfoForPatient();
        }
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    handleOpenNewEn = () => {
        this.setState({ newEntry: true });
    }

    handleCloseNewEn = () => {
        this.setState({ newEntry: false });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
            this.GetLanguageMetadata();
        }
    };

    // Get the All information of the Patient
    GetInfoForPatient = () => {
        this.cur_one();
        this.cur_one2();
        this.getTrack();
    };

    //For get the Track
    getTrack = async () => {
        var user_id = this.props.match.params.id;
        var user_token = this.props.stateLoginValueAim.token;
        this.setState({ loaderImage: true });
        let response = await get_track(user_token, user_id)
        if (response?.data?.hassuccessed === true) {
            //This is for Aimedis Blockchain Section
            this.props.rightInfo();
            var images = [];
            response.data.data = response.data.data.filter((e) => e != null);
            // response.data.data &&
            //   response.data.data.length > 0 &&
            //   response.data.data.map((data1, index) => {
            //     var find2 = data1 && data1.created_by_image;
            //     if (find2) {
            //       var find3 = find2.split(".com/")[1];
            //       axios
            //         .get(sitedata.data.path + "/aws/sign_s3?find=" + find3)
            //         .then((response2) => {
            //           if (response2.data.hassuccessed) {
            //             images.push({
            //               image: find2,
            //               new_image: response2.data.data,
            //             });
            //             this.setState({ images: images });
            //           }
            //         });
            //     }
            // data1.attachfile &&
            //   data1.attachfile.length > 0 &&
            //   data1.attachfile.map((data, index) => {
            //     var find = data && data.filename && data.filename;
            //     if (find) {
            //       var find1 = find.split(".com/")[1];
            //       axios
            //         .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
            //         .then((response2) => {
            //           if (response2.data.hassuccessed) {
            //             images.push({
            //               image: find,
            //               new_image: response2.data.data,
            //             });
            //             this.setState({ images: images });
            //           }
            //         });
            //     }
            //   });
            // });

            this.props.rightInfo();
            this.setState({
                allTrack1: response.data.data,
                allTrack2: response.data.data,
                loaderImage: false,
                // defaultValue : 10,
            },
                () => { this.Showdefaults(this.state.allTrack2, this.state.defaultValue) });
        } else {
            this.setState({ allTrack1: [], allTrack: [], allTrack2: [], loaderImage: false });
        }

    };

    //Get All information Related to Metadata
    getMetadata() {
        this.setState({ allMetadata: this.props.metadata }, () => {
            this.GetLanguageMetadata();
        });
    }

    GetLanguageMetadata = () => {
        if (this.state.allMetadata) {
            var AllATC_code =
                this.state.allMetadata &&
                this.state.allMetadata.ATC_code &&
                this.state.allMetadata.ATC_code;

            var Alltemprature =
                this.state.allMetadata &&
                this.state.allMetadata.Temprature &&
                this.state.allMetadata.Temprature;
            var Allgender = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.gender &&
                this.state.allMetadata.gender,
                this.props.stateLanguageType
            );
            var Allpain_type = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.pain_type &&
                this.state.allMetadata.pain_type,
                this.props.stateLanguageType
            );
            var Pressuresituation = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.situation_pressure &&
                this.state.allMetadata.situation_pressure,
                this.props.stateLanguageType
            );
            var Allpain_quality = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.pain_quality &&
                this.state.allMetadata.pain_quality &&
                this.state.allMetadata.pain_quality,
                this.props.stateLanguageType
            );
            var Allsituation = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.situation &&
                this.state.allMetadata.situation,
                this.props.stateLanguageType
            );
            var Allsmoking_status = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.smoking_status &&
                this.state.allMetadata.smoking_status,
                this.props.stateLanguageType
            );

            var Allreminder = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.reminder &&
                this.state.allMetadata.reminder,
                this.props.stateLanguageType
            );
            var Allrelation = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.relation &&
                this.state.allMetadata.relation,
                this.props.stateLanguageType
            );
            var Allsubstance = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.substance &&
                this.state.allMetadata.substance,
                this.props.stateLanguageType
            );
            var Anamnesis = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.anamnesis &&
                this.state.allMetadata.anamnesis,
                this.props.stateLanguageType
            );
            var vaccinations = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.vaccination &&
                this.state.allMetadata.vaccination,
                this.props.stateLanguageType
            );
            var personalised_card = GetLanguageDropdown(
                this.state.allMetadata &&
                this.state.allMetadata.personalised_card &&
                this.state.allMetadata.personalised_card,
                this.props.stateLanguageType,
                "personalised_card"
            );
            var Alltime_taken =
                this.state.allMetadata &&
                this.state.allMetadata.time_taken &&
                this.state.allMetadata.time_taken;
            if (Alltime_taken && Alltime_taken.length > 0) {
                Alltime_taken.sort(mySorter);
            }

            this.setState({
                Alltemprature: Alltemprature,
                Anamnesis: Anamnesis,
                vaccinations: vaccinations,
                AllATC_code: AllATC_code,
                Allpain_type: Allpain_type,
                Allpain_quality: Allpain_quality,
                Pressuresituation: Pressuresituation,
                Allsituation: Allsituation,
                Allsmoking_status: Allsmoking_status,
                Allreminder: Allreminder,
                AllSpecialty: GetLanguageDropdown(
                    SPECIALITY.speciality.english,
                    this.props.stateLanguageType
                ),
                Allsubstance1: Allsubstance,
                Allrelation: Allrelation,
                Allgender: Allgender,
                Alltime_taken: Alltime_taken,
                personalised_card: personalised_card,
                medication_unit: this.state.allMetadata?.medication_unit,
            });
        }
    };

    // Get the Current User Profile
    cur_one2 = async () => {
        var user_token = this.props.stateLoginValueAim.token;
        let user_id = this.props.match.params.id;
        let response = await get_cur_one(user_token, user_id)
        this.setState({ cur_one2: response?.data?.data });
    };

    //Get the Current User Profile
    cur_one = async () => {
        let user_token = this.props.stateLoginValueAim.token;
        let user_id = this.props.stateLoginValueAim.user._id;
        let response = await get_cur_one(user_token, user_id)
        this.setState({ cur_one: response.data.data });
    };

    FileAttachMulti = (Fileadd) => {
        this.setState({
            isfileuploadmulti: true,
            fileattach: Fileadd,
            fileupods: true,
        });
    };

    FileAttachMultiVaccination = (Fileadd, name) => {
        if (name === "SARS") {
            this.setState({ SARS: Fileadd, fileupods: true });
        } else {
            this.setState({ Positive_SARS: Fileadd, fileupods: true });
        }
    };

    //Select type for the new Entry
    SelectOption = (value) => {
        this.setState({ current_select: value }, () => {
            this.handleaddInqryNw();
        });
    };

    //For open Edit
    EidtOption = (value, updateTrack, visibility) => {
        this.setState(
            {
                updateOne: updateTrack.track_id,
                visibility: visibility,
                current_select: value,
                updateTrack: updateTrack,
            },
            () => {
                this.handleaddInqryNw();
            }
        );
    };

    //For getting full data of hide Show
    GetHideShow = (data) => {
        const state = this.state.updateTrack;
        Object.entries(data).map(([k, v]) => {
            if (k === "publicdatetime") {
                if (v !== null) {
                    state["public"] = moment(v).utc();
                }
            }
            state[k] = v;
        });
        this.setState({ updateTrack: state });
    };

    //Update Archive Track State
    updateArchiveTrack = (data) => {
        data.archive = true;
        var user_id = this.props.match.params.id;
        var user_token = this.props.stateLoginValueAim.token;
        var track_id = data.track_id;
        this.setState({ loaderImage: true });
        axios
            .put(
                sitedata.data.path + "/User/AddTrack/" + user_id + "/" + track_id,
                { data },
                commonHeader(user_token)
            )
            .then((response) => {
                this.setState({
                    ismore_five: false,
                    updateTrack: {},
                    updateOne: 0,
                    isfileupload: false,
                    isfileuploadmulti: false,
                    loaderImage: false,
                });
                this.getTrack();
            });
    };

    //for get the track data on the bases of pateint
    GetTrackData = (e) => {
        const state = this.state.gettrackdatas;
        state[e.target.name] = e.target.value;
        this.setState({ gettrackdatas: state });
    };

    //For update the Track state
    updateEntryState1 = (value, name) => {
        const state = this.state.updateTrack;
        state[name] = value;
        this.setState({ updateTrack: state });
    };

    //For update the Track state
    updateEntryState = async (e) => {
        const state = this.state.updateTrack;
        const retState = await update_entry_state(e, state, this.props.stateLoginValueAim)
        this.setState({ updateTrack: retState });
    };

    //For adding the Track entry
    AddTrack = () => {
        this.setState({ loaderImage: true });
        var data = this.state.updateTrack;
        var user_id = this.props.match.params.id;
        var user_token = this.props.stateLoginValueAim.token;
        if (this.state.isfileupload) {
            data.attachfile = this.state.fileattach;
        } else if (this.state.isfileuploadmulti) {
            data.attachfile = this.state.fileattach;
        }

        if (
            this.state.current_select === "blood_pressure" ||
            this.state.current_select === "weight_bmi" ||
            this.state.current_select === "blood_sugar" ||
            this.state.current_select === "marcumar_pass" ||
            this.state.current_select === "laboratory_result"
        ) {
            if (data.date_measured && data.date_measured !== "") {
                data.datetime_on = new Date(data.date_measured);
            }
        } else if (this.state.current_select === "diagnosis") {
            if (data.diagnosed_on && data.diagnosed_on !== "") {
                data.datetime_on = new Date(data.diagnosed_on);
            }
        } else if (this.state.current_select === "doctor_visit") {
            if (data.date_doctor_visit && data.date_doctor_visits !== "") {
                data.datetime_on = new Date(data.date_doctor_visit);
            }
        } else if (this.state.current_select === "hospitalization") {
            if (data.first_visit_date && data.first_visit_date !== "") {
                data.datetime_on = new Date(data.first_visit_date);
            }
        } else if (this.state.current_select === "vaccination") {
            if (data.data_of_vaccination && data.data_of_vaccination !== "") {
                data.datetime_on = new Date(data.data_of_vaccination);
            }
        } else {
            if (data.event_date && data.event_date !== "") {
                data.datetime_on = new Date(data.event_date);
            } else {
                data.event_date = new Date();
            }
        }
        var track_id = this.state.updateTrack.track_id;
        if (
            this.state.updateTrack &&
            this.state.updateTrack.track_id &&
            this.state.updateTrack.track_id !== "" &&
            this.state.updateTrack.track_id !== "undefined"
        ) {
            data.updated_by = this.props.stateLoginValueAim.user._id;
            axios
                .put(
                    sitedata.data.path + "/User/AddTrack/" + user_id + "/" + track_id,
                    { data },
                    commonHeader(user_token)
                )
                .then((response) => {
                    this.setState({
                        ismore_five: false,
                        isless_one: false,
                        updateTrack: {},
                        updateOne: 0,
                        visibleupdate: 0,
                        isfileupload: false,
                        isfileuploadmulti: false,
                        loaderImage: false,
                    });
                    this.getTrack();
                    this.handleCloseNewEn();
                });
        } else {
            data.created_by = this.props.stateLoginValueAim.user._id;
            axios
                .put(
                    sitedata.data.path + "/User/AddTrack/" + user_id,
                    { data },
                    commonHeader(user_token)
                )
                .then((response) => {
                    this.setState({
                        updateTrack: {},
                        isfileupload: false,
                        isfileuploadmulti: false,
                        fileattach: {},
                        current_select: "diagnosis",
                        Addmore: true,
                        newElement: false,
                        loaderImage: false,
                        ismore_five: false,
                        isless_one: false,
                    });
                    this.getTrack();
                    this.handleCloseNewEn();
                });
        }
        this.setState({ updateTrack: {} });
    };

    //For getting the information of the Patient Gender
    getGender = async () => {
        const { stateLoginValueAim } = this.props
        let response = await get_gender(stateLoginValueAim.token, this.props.match.params.id)
        this.setState({ patient_gender: response })
    }

    //This is for the Download the Track
    //This is for the Download the Track
    downloadTrack = async (data) => {
        this.setState({ loaderImage: true });
        let response = await download_track(data, this.props.stateLoginValueAim)
        setTimeout(() => {
            this.setState({ loaderImage: false });
        }, 5000)
    };


    render() {
        const { selectedOption, attachedFile } = this.state;
        let translate = getLanguage(this.props.stateLanguageType)
        let { MarkAndersonMD, journal, New, entry, edit, DocumentsFiles, addNewEntry, clear_filters, dateAdded, documentName, sortBy, added_by, FirstdiagnosisDocx, sixteen022021, twelve022021, very_long_name_of_pdf } = translate;
        return (
            <Grid>
                <Grid className="journalAdd">
                    <Grid container direction="row">
                        <Grid item xs={12} md={11}>
                            <Grid container direction="row">
                                <Grid item xs={12} md={6} sm={6}><h1>{DocumentsFiles}</h1></Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Grid className="AddEntrynw"><a onClick={this.handleOpenNewEn}>{addNewEntry}</a></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Search for Website */}
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        <Grid className="srchFilter">
                            <Grid container direction="row">
                                <Grid item xs={12} md={2}>
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="All time"
                                        className=" comonSel"
                                        //isMulti= {true}
                                        isSearchable={false}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="Type: (2)"
                                        className="typeSel comonSel" />
                                </Grid>
                                <Grid item xs={12} md={3} className="faclity_all">
                                    <Select value={selectedOption} onChange={this.handleChange} options={options}
                                        placeholder="Doctor: All" className=" comonSel" />
                                </Grid>
                                <Grid item xs={12} md={3} className="faclity_all">
                                    <Select value={selectedOption} onChange={this.handleChange} options={options} placeholder="Facility: All"
                                        className=" comonSel" />
                                </Grid>
                                <Grid item xs={12} md={2} className="clear_filter">
                                    <Grid className="clear_filterUpr">
                                        <Grid className="clear_filterLft"><a>{clear_filters}</a></Grid>
                                        <Grid className="clear_filterRght">
                                            <a><img src={require('assets/virtual_images/clearSrch.jpg')} alt="" title="" /></a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="clear"></Grid>
                            </Grid>
                            <Grid className="sortBySec">
                                <label>{sortBy}</label>
                                <input type="text" placeholder="Entry time" className="entrTimeBY" />
                                <input type="text" placeholder="Diagnosis time" className="diagTimeBY" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* End of Search for Website */}

                {/* Document Table */}
                <Grid container direction="row">
                    <Grid item xs={12} md={11}>
                        <Grid className="presOpinionIner">
                            <DocView attachedFile={attachedFile} documentName={documentName} dateAdded={dateAdded} added_by={added_by} />
                        </Grid>
                    </Grid>
                </Grid>
                {/* End of Document Table */}



                <Modal
                    open={this.state.newEntry}
                    onClose={this.handleCloseNewEn}
                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === "dark"
                            ? "darkTheme nwDiaModel"
                            : "nwDiaModel"
                    }
                >
                    <Grid className="nwDiaCntnt">
                        <Grid className="nwDiaCntntIner">
                            <Grid className="nwDiaCourse">
                                <Grid className="nwDiaCloseBtn">
                                    <a onClick={this.handleCloseNewEn}>
                                        <img
                                            src={require("assets/images/close-search.svg")}
                                            alt=""
                                            title=""
                                        />
                                    </a>
                                </Grid>

                                {this.state.updateOne !==
                                    this.state.updateTrack.track_id ? (
                                    <div>
                                        <p>
                                            {New} {entry}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p>
                                            {edit} {entry}
                                        </p>
                                    </div>
                                )}
                            </Grid>
                            <Grid>
                                <FUFields
                                    cur_one={this.state.cur_one2}
                                    FileAttachMulti={this.FileAttachMulti}
                                    visibility={this.state.visibility}
                                    comesfrom="adminstaff"
                                    GetHideShow={this.GetHideShow}
                                    AddTrack={this.AddTrack}
                                    options={this.state.AllSpecialty}
                                    date_format={
                                        this.props.settings &&
                                        this.props.settings.setting &&
                                        this.props.settings.setting.date_format
                                    }
                                    time_format={
                                        this.props.settings &&
                                        this.props.settings.setting &&
                                        this.props.settings.setting.time_format
                                    }
                                    updateEntryState={this.updateEntryState}
                                    updateEntryState1={this.updateEntryState1}
                                    updateTrack={this.state.updateTrack}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}



















                {/* Upload Document */}
                {/* {this.state.newEntry === true && (
                    <FUFields
                        cur_one={this.state.cur_one2}
                        FileAttachMulti={this.FileAttachMulti}
                        visibility={this.state.visibility}
                        comesfrom="adminstaff"
                        GetHideShow={this.GetHideShow}
                        AddTrack={this.AddTrack}
                        options={this.state.AllSpecialty}
                        date_format={
                            this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.date_format
                        }
                        time_format={
                            this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.time_format
                        }
                        updateEntryState={this.updateEntryState}
                        updateEntryState1={this.updateEntryState1}
                        updateTrack={this.state.updateTrack}
                    />
                )} */}
                {/* End of Upload Document */}
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const {
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
    } = state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { metadata } = state.OptionList;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        metadata,
        //   catfil
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        OptionList,
        LanguageFetchReducer,
        Settings,
        authy,
    })(Index)
);
