import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import { LanguageFetchReducer } from "Screens/actions";
import DateFormat from "Screens/Components/DateFormat/index";
import TimeFormat from "Screens/Components/TimeFormat/index";
import TimeTaken from "Screens/Components/TimeTaken/index";
import PainIntensity from "Screens/Components/PainIntansity/index";
import Condition from "Screens/Components/Condition/index";
import NotesEditor from "Screens/Components/Editor/index";
import SelectByTwo from "Screens/Components/SelectbyTwo/index";
import MMHG from "Screens/Components/mmHgField/index";
import SelectField from "Screens/Components/Select/index";
import CheckBoxField from "Screens/Components/Checkbox/index";
import Temprature from "Screens/Components/Temprature/index";
import ShowHide from "Screens/Components/ShowHide/index";
import PainPoint from "Screens/Components/PointPain/index";
import FileUploader from "Screens/Components/FileUploader/index.js";
import {
  getLanguage
} from "translations/index"
import moment from "moment";

const options = [
  { value: "data1", label: "Data1" },
  { value: "data2", label: "Data2" },
  { value: "data3", label: "Data3" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      updateTrack: {},
      time: new Date(),
    };
  }

  onChange = (e, names) => {
    this.setState({ names: e });
    // this.setState({ names : e });
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
  updateEntryState1 = (value, name) => {
    const state = this.state.updateTrack;
    state[name] = value;
    this.setState({ updateTrack: state });
  };

  updateEntryState = (e) => {
    const state = this.state.updateTrack;
    state[e.target.name] = e.target.value;
    this.setState({ updateTrack: state });
  };

  componentDidMount() {
    this.setState({
      updateTrack: {
        remarks: {
          entityMap: {},
          blocks: [
            {
              key: "637gr",
              text: "Enter the content Here",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
        },
      },
    });
  }

  //Upload file Multi
  FileAttachMulti = (event) => {
    // this.setState({file:})
    // this.setState({ isfileuploadmulti: true })
    // event.preventDefault();
    // var user_id = this.props.stateLoginValueAim.user._id;
    // var user_token = this.props.stateLoginValueAim.token;
    // const data = new FormData()
    // if(event.target.files[0].type==="application/x-zip-compressed"){
    //     this.setState({ file_type: true, isless_one: false, isless_one: false })
    // }else{
    // if (event.target.files.length < 1) {
    //     this.setState({ isless_one: true, ismore_five: false, file_type: false })
    // }
    // if (event.target.files.length > 5) {
    //     this.setState({ ismore_five: true, isless_one: false, file_type: false })
    // }
    // else {
    //     var Fileadd= [];
    //     this.setState({ ismore_five: false, isless_one: false, file_type: false })
    //     for(var i =0 ; i<event.target.files.length; i++)
    //     {
    //         let file = event.target.files[i];
    //         let fileParts = file.name.split('.');
    //         let fileName = fileParts[0];
    //         let fileType = fileParts[1];
    //         axios.post(sitedata.data.path  + '/aws/sign_s3',{
    //                 fileName : fileName,
    //                 fileType : fileType,
    //                 folders: this.props.stateLoginValueAim.user.profile_id+'/Trackrecord/',
    //                 bucket: this.props.stateLoginValueAim.user.bucket
    //               })
    //               .then(response => {
    //                   Fileadd.push({filename : response.data.data.returnData.url+'&bucket='+this.props.stateLoginValueAim.user.bucket, filetype: fileType})
    //                 this.setState({
    //                     loaderImage   : false
    //                 });
    //                 setTimeout(
    //                     function() {
    //                         this.setState({fileupods: false});
    //                     }
    //                     .bind(this),
    //                     3000
    //                 );
    //                 let returnData = response.data.data.returnData;
    //                 let signedRequest = returnData.signedRequest;
    //                 let url = returnData.url;
    // if(fileType ==='pdf'){
    //     fileType = 'application/pdf'
    // }
    //                // Put the fileType in the headers for the upload
    //                 var options = {
    //                   headers: {
    //                     'Content-Type': fileType
    //                   }
    //                 };
    //                 axios.put('https://cors-anywhere.herokuapp.com/'+signedRequest,file,options)
    //                 .then(result => {
    //                   this.setState({success: true});
    //                 })
    //                 .catch(error => {
    //                   // console.log("ERROR " + JSON.stringify(error));
    //                 })
    //               })
    //               .catch(error => {
    //                 // console.log(JSON.stringify(error));
    //               })
    //               this.setState({
    //                 fileattach : Fileadd,
    //                 loaderImage   : false,fileupods: true
    //             });
    //         }
    //     }
    // }
    // setTimeout(
    //     function() {
    //         this.setState({ file_type: false, isless_one: false, ismore_five: false });
    //     }
    //     .bind(this),
    //     2000
    // );
  };
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      reminder_time,
      notes,
      visible,
      show_entry,
      feeling,
      stressed,
      relaxed,
      rr_systolic,
      smoking_status,
      allergy,
      review,
      hide_entry,
    } = translate;
    return (
      <Grid className="homeBg">
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="journal" />
                {/* End of Website Menu */}

                {/* Website Mid Content */}
                <Grid item xs={12} md={8}>
                  <DateFormat
                    name="date"
                    value={
                      this.state.date ? new Date(this.state.date) : new Date()
                    }
                    date_format={this.props.settings.setting.date_format}
                    onChange={(e) => this.onChange(e, "date")}
                  />

                  <TimeFormat
                    name="time"
                    value={
                      this.state.time ? new Date(this.state.time) : new Date()
                    }
                    time_format={this.props.settings.setting.time_format}
                    onChange={(e) => this.onChange(e, "time")}
                  />

                  <TimeTaken
                    name="timetaken"
                    label={reminder_time}
                    time_format={this.props.settings.setting.time_format}
                    onChange={(e) => this.updateEntryState1(e, "time_taken")}
                    timeArray={this.state.updateTrack.time_taken}
                  />

                  <PainIntensity
                    name="pain"
                    Forview={true}
                    onChange={(e) => this.updateEntryState(e)}
                    value={this.state.updateTrack.pain}
                  />
                  <PainIntensity
                    name="pain"
                    onChange={(e) => this.updateEntryState(e)}
                    value={this.state.updateTrack.pain}
                  />

                  <Condition
                    name="condition"
                    Forview={true}
                    onChange={(e) => this.updateEntryState(e)}
                    value={this.state.updateTrack.pain}
                  />
                  <Condition
                    name="condition"
                    onChange={(e) => this.updateEntryState(e)}
                    value={this.state.updateTrack.pain}
                  />

                  {/* <NotesEditor name="remarks" label="Notes"  onChange={(e)=> this.updateEntryState1(e, 'remarks')} />     */}

                  <NotesEditor
                    name="remarks"
                    label={notes}
                    value={this.state.updateTrack.remarks}
                    onChange={(e) => this.updateEntryState1(e, "remarks")}
                    value={this.state.updateTrack.remarks}
                  />

                  <SelectByTwo
                    name="visible"
                    label={visible}
                    options={[
                      { label: show_entry, value: "show" },
                      { label: hide_entry, value: "hide" },
                    ]}
                    onChange={(e) => this.updateEntryState1(e, "visible")}
                    value={this.state.updateTrack.visible}
                  />
                  <SelectByTwo
                    name="feeling"
                    label={feeling}
                    options={[
                      { label: relaxed, value: "relaxed" },
                      { label: stressed, value: "stressed" },
                    ]}
                    onChange={(e) => this.updateEntryState1(e, "feelings")}
                    value={this.state.updateTrack.feelings}
                  />

                  <MMHG
                    name="rr_systolic"
                    Unit="mmHg"
                    label={rr_systolic}
                    onChange={(e) => this.updateEntryState(e)}
                    value={this.state.updateTrack.rr_systolic}
                  />

                  <SelectField
                    name="smoking_status"
                    label={smoking_status}
                    option={[
                      { label: show_entry, value: "show" },
                      { label: hide_entry, value: "hide" },
                    ]}
                    onChange={(e) =>
                      this.updateEntryState1(e, "smoking_status")
                    }
                    value={this.state.updateTrack.smoking_status}
                  />

                  <CheckBoxField
                    name="allergy"
                    label={allergy}
                    value={this.state.updateTrack.allergy}
                    onChange={(e) => this.updateEntryState1(e, "allergy")}
                  />
                  <CheckBoxField
                    name="review"
                    label={review}
                    value={this.state.updateTrack.review}
                    onChange={(e) => this.updateEntryState1(e, "review")}
                  />

                  <Temprature
                    name="temprature"
                    valueType={this.state.updateTrack.temprature_type}
                    value={this.state.updateTrack.temprature}
                    Options={[
                      { label: "°C", value: "C" },
                      { label: "°F", value: "F" },
                    ]}
                    onChange={(e) => this.updateEntryState(e)}
                    onChangeType={(e) =>
                      this.updateEntryState1(e, "temprature_type")
                    }
                  />

                  <ShowHide
                    date_format={this.props.settings.setting.date_format}
                    value={this.state.updateTrack}
                    onChange={(data) => this.GetHideShow(data)}
                  />

                  <PainPoint
                    id="New_id"
                    gender="male"
                    painPoint={[]}
                    isView={true}
                  />
                  <PainPoint
                    id="New_id1"
                    gender="male"
                    painPoint={
                      this.state.updateTrack && this.state.updateTrack.painPoint
                        ? this.state.updateTrack.painPoint
                        : []
                    }
                    onChange={(e) => this.updateEntryState1(e, "painPoint")}
                  />

                  <FileUploader
                    name="UploadTrackImageMulti"
                    comesFrom="journal"
                    isMulti="true"
                    fileUpload={this.props.FileAttachMulti}
                  />
                </Grid>
                {/* End of Website Right Content */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
