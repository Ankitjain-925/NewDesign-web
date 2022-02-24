/*global google*/import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import DatePicker from "react-date-picker";
import ReactFlagsSelect from "react-flags-select";
import sitedata from "sitedata";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Autocomplete from "Screens/Components/Autocomplete/index";
import { OptionList } from "Screens/Login/metadataaction";
import FileUploader from "Screens/Components/FileUploader/index";
import { LanguageFetchReducer } from "Screens/actions";
import Modal from "@material-ui/core/Modal";
import npmCountryList from "react-select-country-list";
import Loader from "Screens/Components/Loader/index";
import DateFormat from "Screens/Components/DateFormat/index";
import QRCode from "qrcode.react";
import { GetUrlImage1, blobToFile, resizeFile } from "Screens/Components/BasicMethod/index";
import SPECIALITY from "speciality";
import { GetLanguageDropdown } from "Screens/Components/GetMetaData/index.js";
import { getLanguage } from "translations/index"
import { update_CometUser } from "Screens/Components/CommonApi/index";
import { commonHeader, commonCometHeader } from "component/CommonHeader/index";


var datas = [];


class Index extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        // this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.state = {
            
            loaderImage: false,
            newTask: {},
            Fileadd: "",


        };
    }

    componentDidMount() {
        this.getMetadata();
        this.getUserData();
    }
    //For getting User Data
    getUserData() {
        this.setState({ loaderImage: true });
        let user_token = this.props.stateLoginValueAim.token;
        let user_id = this.props.stateLoginValueAim.user._id;
        axios
            .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
            .then((response) => {
                var title = {},
                    titlefromD = response.data.data.title;
                var language = [],
                    languagefromD = response.data.data.language;
                if (languagefromD && languagefromD.length > 0) {
                    languagefromD.map((item) => {
                        language.push({ value: item, label: item.replace(/_/g, " ") });
                    });
                }
                if (titlefromD && titlefromD !== "") {
                    title = { label: titlefromD, value: titlefromD };
                }
                if (response.data.data.mobile && response.data.data.mobile !== "") {
                    let mob = response.data.data.mobile.split("-");
                    if (mob && mob.length > 0) {
                        this.setState({ flag_mobile: mob[0] });
                    }
                }
                if (response.data.data.phone && response.data.data.phone !== "") {
                    let pho = response.data.data.phone.split("-");
                    if (pho && pho.length > 0) {
                        this.setState({ flag_phone: pho[0] });
                    }
                }
                if (response.data.data.fax && response.data.data.fax !== "") {
                    let fx = response.data.data.fax.split("-");
                    if (fx && fx.length > 0) {
                        this.setState({ flag_fax: fx[0] });
                    }
                }
                if (
                    response.data.data.emergency_number &&
                    response.data.data.emergency_number !== ""
                ) {
                    let fen = response.data.data.emergency_number.split("-");
                    if (fen && fen.length > 0) {
                        this.setState({ flag_emergency_number: fen[0] });
                    }
                }
                this.setState({
                    UpDataDetails: response.data.data,
                    city: response.data.data.city,
                    area: response.data.data.area,
                    profile_id: response.data.data.profile_id,
                });
                this.setState({
                    speciality_multi: this.state.UpDataDetails?.speciality,
                });
                this.setState({ name_multi: language, title: title });
                this.setState({
                    insurancefull: this.state.UpDataDetails?.insurance,
                    insuranceDetails: {
                        insurance: "",
                        insurance_number: "",
                        insurance_type: "",
                    },
                });
                this.setState({ loaderImage: false });
                datas = this.state.UpDataDetails?.insurance;
                var find =
                    response.data && response.data.data && response.data.data.image;
                this.SettingImage(find);
            })
            .catch((error) => {
                this.setState({ loaderImage: false });
            });
    }
    handlelatestChange = (value) => {
        // let state = this.state.editorText;
        // state[name] = e;
        // this.setState({ editorText: state });
        this.setState({ editor: value })
    };

    

    FileAttachMulti = (Fileadd) => {
        this.setState({
          isfileuploadmulti: true,
          fileattach: Fileadd,
          fileupods: true,
          // newTask : Fileadd
        });
      };
    //For setting the image
    SettingImage = (find) => {
        if (find) {
            find = find.split(".com/")[1];

            axios
                .get(sitedata.data.path + "/aws/sign_s3?find=" + find)
                .then((response) => {
                    if (response.data.hassuccessed) {
                        this.setState({ image: response.data.data });
                        setTimeout(() => {
                            this.setState({ loaderImage: false });
                        }, 5000);
                    }
                });
        }
    };
    handleChange1 = (input, value) => {
        console.log("value", input)
        this.setState({ [input]: value });

    };
    getMetadata() {
        this.setState({ allMetadata: this.props.metadata },
            () => {
                this.GetLanguageMetadata();
            })
    }

    upload = () => {
        console.log("1")
        this.props.history.push("/virtualHospital/upload_approval_documents");
    }
    handleTaskSubmit = () => {
       
        
        this.setState({ errorMsg: "" })
    
        var data = this.state.newTask;
          if (this.state.fileupods) {
            data.attachments = this.state.fileattach;
          }
          this.setState({ loaderImage: true });
      };
    GetLanguageMetadata = () => {
        var Allgender = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.gender && this.state.allMetadata.gender.length > 0 && this.state.allMetadata.gender, this.props.stateLanguageType)
        var rhesusgroup = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.rhesus && this.state.allMetadata.rhesus.length > 0 && this.state.allMetadata.rhesus, this.props.stateLanguageType)
        let AllMaritalOption = GetLanguageDropdown(this.state.allMetadata && this.state.allMetadata.maritalStatus && this.state.allMetadata.maritalStatus.length > 0 && this.state.allMetadata.maritalStatus, this.props.stateLanguageType)
        this.setState({
            AllMaritalOption: AllMaritalOption,
            genderdata: Allgender,
            languageData: this.state.allMetadata && this.state.allMetadata.languages && this.state.allMetadata.languages.length > 0 && this.state.allMetadata.languages,
            specialityData: GetLanguageDropdown(SPECIALITY.speciality.english, this.props.stateLanguageType),
            title_degreeData: this.state.allMetadata && this.state.allMetadata.title_degreeData && this.state.allMetadata.title_degreeData.length > 0 && this.state.allMetadata.title_degreeData,
            bloodgroup: this.state.allMetadata && this.state.allMetadata.bloodgroup && this.state.allMetadata.bloodgroup.length > 0 && this.state.allMetadata.bloodgroup,
            rhesusgroup: rhesusgroup,
            handleMaritalStatus: AllMaritalOption
        });
    }

    render() {
        return (
            <div>
                {this.state.loaderImage && <Loader />}

                <Grid container direction="row" justifyContent="center" >
                    <Grid item xs={11} md={10}>
                        <Grid className='headercont headercontSec'>
                            <Grid className="profileInfoSection">  <h1>Upload Approval document of patient to the hospital</h1></Grid>
                            <Grid item xs={12} md={8}>
                                <Grid className="headerCountTxt">

                                    <label>Attachments</label>
                                    <FileUploader
                                        // cur_one={this.props.cur_one}
                                        attachfile={
                                            this.state.newTask &&
                                                this.state.newTask.attachments
                                                ? this.state.newTask.attachments
                                                : []
                                        }
                                        name="UploadTrackImageMulti"
                                        isMulti="true"
                                        fileUpload={(event) => {
                                            this.FileAttachMulti(event);
                                        }}
                                    />


                                </Grid>
                            </Grid>


                            <Grid container direction="row" justifyContent="center" >
                                <Grid item xs={12} md={8} lg={8}>
                                    <Grid className="aaa">


                                        <Grid className="headerCountTxt infoSubInpSection">
                                            <input
                                                type="submit"
                                                onClick={()=>this.handleTaskSubmit()}
                                                value={"Submit"}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>




                    </Grid>
                </Grid>


            </div >
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
    const { metadata } = state.OptionList;
    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        metadata,
        //   Doctorsetget,
        //   catfil
    };
};
export default withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, OptionList })(
        Index
    )
);