import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Modal from "@material-ui/core/Modal";
import LeftMenuMobile from "Screens/Components/Menus/PharmaLeftMenu/mobile";
import LeftMenu from "Screens/Components/Menus/PharmaLeftMenu/index";
import Loader from "Screens/Components/Loader/index";
import { EmergencySet } from "Screens/Doctor/emergencyaction.js";
import { LanguageFetchReducer } from "Screens/actions";
import { withRouter } from "react-router-dom";
import sitedata from "sitedata";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  getDate,
  getImage,
} from "Screens/Components/BasicMethod/index";
import ImgaeSec from "Screens/Components/TimelineComponent/ImageSec";
import { getLanguage } from "translations/index"
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { delete_click_track } from "Screens/Components/CommonApi/index";
import { commonHeader } from "component/CommonHeader/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPres: false,
      Allpre: [],
      Allpre1: [],
      loaderImage: false,
      openDetail: {},
      ishandled: false,
      isArchived: false,
      isDeleted: false,
      images: [],
      search_value: "",
    };
  }
  // fancybox open
  handleOpenPres = (data) => {
    this.setState({ loaderImage: true })
    var images = [];
    data.attachfile?.length > 0 &&
      data.attachfile.map((data, index) => {
        var find = data && data.filename && data.filename;
        if (find) {
          var find1 = find.split(".com/")[1];
          axios
            .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
            .then((response2) => {
              if (response2.data.hassuccessed) {
                images.push({
                  image: find,
                  new_image: response2.data.data,
                });
                this.setState({ images: images });
              }
            });
        }
      });

    this.setState({ openPres: true, openDetail: data });
    setInterval(() => { this.setState({ loaderImage: false }) }, 3000)
    // this.setState({ openPres: true, openDetail: data });
  };
  handleClosePres = () => {
    this.setState({ openPres: false, openDetail: {} });
  };

  componentDidMount() {
    this.getAllPres();
  }

  //For getting the All Prescriptions
  getAllPres = () => {
    this.setState({ loaderImage: true });
    let user_token = this.props.stateLoginValueAim.token;
    axios
      .get(
        sitedata.data.path +
        "/emergency_record/getTrack/" +
        this.props.stateLoginValueAim.user._id,
        commonHeader(user_token)
      )
      .then((response) => {
        if (response.data.hassuccessed === true) {
          var images = [];
          response.data.data = response.data.data.filter((e) => e != null);
          this.setState({
            Allpre: response.data.data,
            Allpre1: response.data.data,
            loaderImage: false,
          });
        } else {
          this.setState({ loaderImage: false, Allpre: [], Allpre1: [] });
        }
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  };

  //Confirm popup for Delete
  DeleteTrack = (deletekey) => {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      delete_item,
      do_u_really_want_delete_item,
      yes,
      no,
    } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >
            <h1>{delete_item}</h1>
            <p>{do_u_really_want_delete_item}</p>
            <div className="react-confirm-alert-button-group">
              <button
                onClick={() => {
                  this.deleteClickTrack(deletekey);
                  onClose();
                }}
              >
                {yes}
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
              >
                {no}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  //Confirm popup for archive
  ArchiveTrack = (data) => {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      archive_item,
      do_u_really_want_archive_item,
      yes,
      no,
    } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={this.props?.settings?.setting.mode === "dark"
              ? "dark-confirm react-confirm-alert-body"
              : "react-confirm-alert-body"
            }
          >
            <h1>{archive_item}</h1>
            <p>{do_u_really_want_archive_item}</p>
            <div className="react-confirm-alert-button-group">
              <button
                onClick={() => {
                  this.updateArchiveTrack(data);
                  onClose();
                }}
              >
                {yes}
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
              >
                {no}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  //Update Archive Track State
  updateArchiveTrack = (data) => {
    data.archive = true;
    var user_id = this.props.stateLoginValueAim.user._id;
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
        this.setState({ isArchived: true, loaderImage: false });
        this.getAllPres();
        setTimeout(() => {
          this.setState({ isArchived: false });
        }, 3000);
      });
  };

  //Update Archive Track State
  updateHandleTrack = (data) => {
    let pharma = {
      name: this.props.stateLoginValueAim.user.first_name + " " + this.props.stateLoginValueAim.user.last_name,
      email: this.props.stateLoginValueAim.user.email,
      alies_id: this.props.stateLoginValueAim.user.alies_id
    }
    data.status = "handled";
    data.lan = this.props.stateLanguageType
    data.pharma = pharma
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    var track_id = data.track_id;
    this.setState({ loaderImage: true });
    axios
      .put(
        sitedata.data.path + "/User/HandlePrescriptions/" + user_id + "/" + track_id,
        { data },
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({ ishandled: true, loaderImage: false });
        this.getAllPres();
        this.handleClosePres();
        setTimeout(() => {
          this.setState({ ishandled: false });
        }, 3000);
      });
  };
  //Delete the track
  deleteClickTrack = async (deletekey) => {
    var user_id = this.props.stateLoginValueAim.user._id;
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    let response = await delete_click_track(user_token, user_id, deletekey)
    if (response) {
      this.setState({ isDeleted: true, loaderImage: false });
      this.getAllPres();
      setTimeout(() => {
        this.setState({ isDeleted: false });
      }, 3000);
    }
  };

  ResetData = () => {
    this.setState({ Allpre: this.state.Allpre1, search_value: "" });
  };

  //For search the Data
  searchData = (event) => {
    const search_value = event.target.value.toLowerCase();
    this.setState({ search_value }, () => this.filterList());
  };

  //Filter on the bases of search
  filterList() {
    let users = this.state.Allpre1;
    let q = this.state.search_value;
    users =
      users &&
      users.length > 0 &&
      users.filter(function (user) {
        if (
          user.patient_name ||
          user.created_by_temp ||
          user.patient_alies_id
        ) {
          if (user.patient_name && user.patient_alies_id) {
            if (user.created_by_temp) {
              return (
                user.created_by_temp.toLowerCase().indexOf(q) != -1 ||
                user.patient_name.toLowerCase().indexOf(q) != -1 ||
                user.patient_alies_id.toLowerCase().indexOf(q) != -1
              );
            } else {
              return (
                user.patient_name.toLowerCase().indexOf(q) != -1 ||
                user.patient_alies_id.toLowerCase().indexOf(q) != -1
              ); // returns true or false
            }
          } else {
            return user.created_by_temp.toLowerCase().indexOf(q) != -1; // returns true or false
          }
        }
      });
    this.setState({ Allpre: users });
    if (this.state.search_value == "") {
      this.setState({ Allpre: this.state.Allpre1 });
    }
  }

  render() {
    const { stateLoginValueAim, Doctorsetget } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "pharmacy" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      prescriptions,
      Prescriptionisarchived,
      prescription,
      fors,
      Prescriptionisdeleted,
      Prescriptionishandedtopatient,
      short_msg,
      rcvd_from_doctor,
      handled,
      recved_on,
      Patient,
      archive,
      Delete,
      see_details,
      capab_Doctors,
      medicine_handed_to_patient,
      status,
      Download,
      search_by_patient_id_name_doc,
    } = translate;

    return (
      <Grid
        className={
          this.props?.settings?.setting.mode === "dark"
            ? "homeBg homeBgDrk"
            : "homeBg"
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Website Menu */}
                <LeftMenu isNotShow={true} currentPage="journal" />
                <LeftMenuMobile isNotShow={true} currentPage="journal" />
                <Notification />
                {/* End of Website Menu */}

                <Grid item xs={12} md={11} lg={10}>
                  <Grid className="phrmOpinion">
                    <Grid container direction="row" className="phrmOpinLbl">
                      <Grid item xs={12} md={12}>
                        <label>{prescriptions}</label>
                      </Grid>
                    </Grid>
                    <Grid className="patientSrch">
                      <input
                        type="text"
                        placeholder={search_by_patient_id_name_doc}
                        value={this.state.search_value}
                        onChange={this.searchData}
                      />
                    </Grid>
                    {this.state.isArchived && (
                      <div className="success_message">
                        {Prescriptionisarchived}
                      </div>
                    )}
                    {this.state.ishandled && (
                      <div className="success_message">
                        {Prescriptionishandedtopatient}
                      </div>
                    )}
                    {this.state.isDeleted && (
                      <div className="success_message">
                        {Prescriptionisdeleted}
                      </div>
                    )}

                    <Grid className="presOpinionIner">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>{recved_on}</Th>
                            <Th>{Patient}</Th>
                            <Th>{capab_Doctors}</Th>
                            <Th>{short_msg}</Th>
                            <Th>{status}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>

                          {this.state.Allpre &&
                            this.state.Allpre.length > 0 &&
                            this.state.Allpre.map((item) => (
                              <Tr>
                                <Td>
                                  {getDate(
                                    item.datetime_on,
                                    this.props.settings &&
                                    this.props.settings.setting &&
                                    this.props.settings.setting.date_format
                                  )}
                                </Td>
                                <Td className="presImg">

                                  {/* <img
                                    src={require("assets/images/dr1.jpg")}
                                    alt=""
                                    title=""
                                  /> */}
                                  <ImgaeSec data={item.patient_image} />
                                  {item?.patient_name}
                                  <p>
                                    {` - ( ${item?.patient_alies_id} )`}
                                  </p>
                                </Td>
                                <Td className="presImg">
                                  {/* <img
                                    src={require("assets/images/dr1.jpg")}
                                    alt=""
                                    title=""
                                  /> */}
                                  <ImgaeSec data={item.created_by_image} />
                                  {item.created_by_temp && item.created_by_temp}
                                </Td>
                                <Td className="presImg">
                                  {item.remark && item.remark}
                                </Td>
                                {item.status && item.status === "handled" ? (
                                  <Td>
                                    <span className="revwGren"></span>
                                    {handled}{" "}
                                  </Td>
                                ) : (
                                  <Td>
                                    <span className="revwYelow"></span>
                                    {rcvd_from_doctor}{" "}
                                  </Td>
                                )}
                                <Td className="presEditDot scndOptionIner">
                                  <a className="openScndhrf">
                                    <img
                                      src={require("assets/images/three_dots_t.png")}
                                      alt=""
                                      title=""
                                      className="openScnd"
                                    />
                                    <ul>
                                      <li>
                                        <a
                                          onClick={() => {
                                            this.handleOpenPres(item);
                                          }}
                                        >
                                          <img
                                            src={require("assets/images/details.svg")}
                                            alt=""
                                            title=""
                                          />
                                          {see_details}
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          onClick={() => {
                                            this.ArchiveTrack(item);
                                          }}
                                        >
                                          <img
                                            src={require("assets/images/details.svg")}
                                            alt=""
                                            title=""
                                          />
                                          {archive}
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          onClick={() => {
                                            this.DeleteTrack(item.track_id);
                                          }}
                                        >
                                          <img
                                            src={require("assets/images/details.svg")}
                                            alt=""
                                            title=""
                                          />
                                          {Delete}
                                        </a>
                                      </li>
                                    </ul>
                                  </a>
                                </Td>
                              </Tr>
                            ))}

                          {/* Model setup */}
                          <Modal
                            open={this.state.openPres}
                            onClose={this.handleClosePres}
                            className={
                              this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode === "dark"
                                ? "darkTheme presBoxModel"
                                : "presBoxModel"
                            }
                          >
                            <Grid className="presBoxCntnt">
                              <Grid className="presCourse">
                              <Grid container direction="row" justify="center">
                                <Grid item xs={8} md={8} lg={8}>
                                <p>
                                  {prescription} {fors}
                                </p>
                                <Grid>
                                  <label>
                                    {" "}
                                    {this.state.openDetail.patient_name &&
                                      this.state.openDetail.patient_name}
                                  </label>

                                </Grid>
                                </Grid>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Grid>
                                    <Grid className="entryCloseBtn">
                                        <a onClick={this.handleClosePres}>
                                        <img
                                            src={require("assets/images/close-search.svg")}
                                            alt=""
                                            title=""
                                        />
                                        </a>
                                    </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                              </Grid>

                              <Grid className="medicInqUpr">
                                <Grid className="prescripList">
                                  <Grid>
                                    {this.state.openDetail &&
                                      this.state.openDetail.attachfile &&
                                      this.state.openDetail.attachfile.length >
                                      0 &&
                                      this.state.openDetail.attachfile.map(
                                        (file) => (
                                          <div>
                                            <div className="DownloadButton">
                                              <a href={getImage(
                                                file.filename,
                                                this.state.images
                                              )} download target="_blank">
                                                {Download} {prescriptions}
                                              </a>
                                            </div>
                                            {file.filetype === "pdf" && (
                                              <iframe
                                                className="FramesetHeightWidth"
                                                width={700}
                                                height="500"
                                                src={getImage(
                                                  file.filename,
                                                  this.state.images
                                                )}
                                                frameborder="0"
                                                allowtransparency="true"
                                                allowfullscreen
                                              ></iframe>
                                            )}
                                            {(file.filetype === "png" ||
                                              file.filetype === "jpeg" ||
                                              file.filetype === "jpg" ||
                                              file.filetype === "svg") && (
                                                <img
                                                  src={getImage(
                                                    file.filename,
                                                    this.state.images
                                                  )}
                                                  alt=""
                                                  title=""
                                                />
                                              )}
                                          </div>
                                        )
                                      )}

                                    {/* <img src={require('assets/images/prescriptions.jpg')} alt="" title="" /> */}
                                  </Grid>
                                  {this.state.openDetail.status &&
                                    this.state.openDetail.status === "handled" ? (
                                    ""
                                  ) : (
                                    <Grid>
                                      <input
                                        type="submit"
                                        value={medicine_handed_to_patient}
                                        onClick={() => {
                                          this.updateHandleTrack(
                                            this.state.openDetail
                                          );
                                        }}
                                      />
                                    </Grid>
                                  )}
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
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { Emergencysetget } = state.EmergencySet;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    Emergencysetget,
    verifyCode,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    EmergencySet,
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
  })(Index)
);
