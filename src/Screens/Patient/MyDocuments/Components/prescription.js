import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import axios from "axios";
import { LanguageFetchReducer } from "Screens/actions";
import sitedata from "sitedata";
import Modal from "@material-ui/core/Modal";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loader from "Screens/Components/Loader/index";
import { getDate, getImage } from "Screens/Components/BasicMethod/index";
import {
  getLanguage
} from "translations/index"
import { commonHeader } from "component/CommonHeader/index";

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
    };
    // new Timer(this.logOutClick.bind(this))
  }

  componentDidMount = () => {
    this.getPrescription();
  };

  //For set the Name by Event like since_when for Sick certificate
  eventnameSetP = (name, value) => {
    const state = this.state.AddPrescription;
    state[name] = value.value;
    this.setState({ AddPrescription: state, selectedSub: value });
  };

  // Add the Prescription State
  AddState = (e) => {
    const state = this.state.AddPrescription;
    state[e.target.name] = e.target.value;
    this.setState({ AddPrescription: state });
  };
  // Open and Close Prescription Edit Form
  handleaddInqry = (data) => {
    this.setState({
      addInqry: true,
      showInquiry: false,
      AddPrescription: data,
    });
  };
  handleCloseInqry = () => {
    this.setState({ addInqry: false, showInquiry: false });
  };

  //open and close Prescription Details
  handleshowSick = (data) => {
    this.setState({
      showInquiry: true,
      addInqry: false,
      AddPrescription: data,
    });
  };
  handleCloseShowSick = () => {
    this.setState({ showInquiry: false });
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.newItem !== this.props.newItem) {
      this.getPrescription();
    }
  };
  //Delete for the Prescriptions
  deleteClickPatient(status, id) {
    let user_token = this.props.stateLoginValueAim.token;
    axios
      .put(
        sitedata.data.path + "/UserProfile/GetPrescription/" + id,
        {
          status: status,
        },
        commonHeader(user_token)
      )
      .then((response) => {
        this.getPrescription();
      })
      .catch((error) => { });
  }

  //Delete for the Prescriptions confirmation
  updatePrescription(status, id) {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Yes,
      No,
      update_inquiry,
      r_u_sure_update_inquiry,
      r_u_sure_cancel_inquiry,
      cancel_inquiry,
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
            {status && status === "cancel" ? (
              <h1>{cancel_inquiry}</h1>
            ) : (
              <h1>{update_inquiry}</h1>
            )}

            <p>
              {status && status === "cancel"
                ? r_u_sure_cancel_inquiry
                : r_u_sure_update_inquiry}{" "}
            </p>

            <div className="react-confirm-alert-button-group">
              <button
                onClick={() => {
                  this.deleteClickPatient(status, id);
                  onClose();
                }}
              >
                {Yes}
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
              >
                {No}
              </button>
            </div>
          </div>
        );
      },
    });
  }

  //For chnage the page
  onChangePage = (pageNumber) => {
    this.setState({
      currentList: this.state.AllPres.slice(
        (pageNumber - 1) * 10,
        pageNumber * 10
      ),
      currentPage: pageNumber,
    });
  };

  //For update the certificate
  SubmitPrescription = () => {
    var user_token = this.props.stateLoginValueAim.token;
    var data = this.state.AddPrescription;
    axios
      .put(
        sitedata.data.path +
        "/UserProfile/UpdatePrescription/" +
        this.state.AddPrescription._id,
        data,
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({ successfullsent: true, addInqry: false });
        setTimeout(() => {
          this.setState({ successfullsent: false });
        }, 5000);
        this.getPrescription();
      })
      .catch((error) => { });
  };
  //Get all the sick Prescriptions
  getPrescription = () => {
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + "/UserProfile/RequestedPrescription", commonHeader(user_token))
      .then((response) => {
        var images = [];
        response.data.data &&
          response.data.data.length > 0 &&
          response.data.data.map((datas) => {
            var find =
              datas && datas.docProfile && datas.docProfile.profile_image;
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
        var totalPage = Math.ceil(response.data.data.length / 10);
        this.setState(
          {
            AllPres: response.data.data,
            loaderImage: false,
            totalPage: totalPage,
            currentPage: 1,
          },
          () => {
            if (totalPage > 1) {
              var pages = [];
              for (var i = 1; i <= this.state.totalPage; i++) {
                pages.push(i);
              }
              this.setState({
                currentList: this.state.AllPres.slice(0, 10),
                pages: pages,
              });
            } else {
              this.setState({ currentList: this.state.AllPres });
            }
          }
        );
      });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      capab_Doctors,
      see_details,
      again,
      home_add_mailbox,
      online,
      modify,
      cancel_reqst,
      edit_entry,
      status,
      cancel_details,
      sent,
      on,
      prescription,
      Pending,
      request,
      edit,
      Rejected,
      Answered,
      Cancelled,
      req_updated_successfully,
      inquiry,
      Yes,
      No,
      doc_and_statnderd_ques,
      doc_aimedis_private,
      Annotations,
      details,
      questions,
      is_this_follow_pres,
      how_u_like_rcv_pres,
      Medicine,
      Substance,
      Dose,
      mg,
      trade_name,
      atc_if_applicable,
      manufacturer,
      pack_size,
    } = translate;

    return (
      <div>
        {this.state.successfullsent && (
          <div className="success_message">{req_updated_successfully}</div>
        )}
        <Grid className="presOpinionIner">
          {this.state.loaderImage && <Loader />}
          <Table>
            <Thead>
              <Tr>
                <Th>{Medicine}</Th>
                <Th>
                  {sent} {on}
                </Th>
                <Th>{capab_Doctors}</Th>
                <Th>{status}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {this.state.currentList &&
                this.state.currentList.length > 0 &&
                this.state.currentList.map((data, index) => (
                  <Tr>
                    <Td>
                      {data.medication ? data.medication : "Not mentioned"}
                    </Td>
                    <Td>
                      {data.send_on
                        ? getDate(
                          data.send_on,
                          this.props.settings.setting.date_format
                        )
                        : "Not mentioned"}
                    </Td>
                    <Td className="presImg">
                      <img
                        src={
                          data.docProfile && data.docProfile.profile_image
                            ? getImage(
                              data.docProfile.profile_image,
                              this.state.images
                            )
                            : require("assets/images/dr1.jpg")
                        }
                        alt=""
                        title=""
                      />
                      {data.docProfile &&
                        data.docProfile.first_name &&
                        data.docProfile.first_name}{" "}
                      {data.docProfile &&
                        data.docProfile.last_name &&
                        data.docProfile.last_name}
                    </Td>
                    {data.status === "pending" && (
                      <Td className="dotsImgColor">
                        <span className="revwYelow"></span>
                        {Pending}{" "}
                      </Td>
                    )}
                    {data.status === "accept" && (
                      <Td className="dotsImgColor">
                        <span className="revwGren"></span>
                        {Answered}{" "}
                      </Td>
                    )}
                    {data.status === "remove" && (
                      <Td className="dotsImgColor">
                        <span className="revwRed"></span>
                        {Rejected}
                      </Td>
                    )}
                    {data.status === "decline" && (
                      <Td className="dotsImgColor">
                        <span className="revwRed"></span>
                        {Rejected}
                      </Td>
                    )}
                    {data.status === "cancel" && (
                      <Td className="dotsImgColor">
                        <span className="revwRed"></span> {Cancelled}
                      </Td>
                    )}
                    {data.status === "free" && (
                      <Td className="dotsImgColor">
                        <span className="revwGry"></span>
                        {sent} {request}
                      </Td>
                    )}
                    {data.status === "normal" && (
                      <Td className="dotsImgColor">
                        <span className="revwGry"></span>
                        {sent} {request}
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
                                this.handleshowSick(data);
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
                          {data.status !== "accept" && (
                            <li>
                              <a
                                onClick={() => {
                                  this.handleaddInqry(data);
                                }}
                              >
                                <img
                                  src={require("assets/images/edit.svg")}
                                  alt=""
                                  title=""
                                />
                                {modify}
                              </a>
                            </li>
                          )}
                          {data.status === "remove" && (
                            <li>
                              <a
                                onClick={() => {
                                  this.updatePrescription("free", data._id);
                                }}
                              >
                                <img
                                  src={require("assets/images/plus.png")}
                                  alt=""
                                  title=""
                                />
                                {inquiry} {again}
                              </a>
                            </li>
                          )}
                          {data.status !== "cancel" && (
                            <li>
                              <a
                                onClick={() => {
                                  this.updatePrescription("cancel", data._id);
                                }}
                              >
                                <img
                                  src={require("assets/images/cancel-request.svg")}
                                  alt=""
                                  title=""
                                />
                                {cancel_reqst}
                              </a>
                            </li>
                          )}
                        </ul>
                      </a>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {/* Model setup for Prescription*/}
          <Modal
            open={this.state.addInqry}
            onClose={this.handleCloseInqry}
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                ? "darkTheme nwPresModel"
                : "nwPresModel"
            }
          >
            <Grid className="nwPresCntnt">
              <Grid className="nwPresCntntIner">
                <Grid className="nwPresCourse">
                  <Grid className="nwPresCloseBtn">
                    <a onClick={this.handleCloseInqry}>
                      <img
                        src={require("assets/images/close-search.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <p>
                    {edit} {inquiry}
                  </p>
                  <Grid>
                    <label>{prescription}</label>
                  </Grid>
                </Grid>
                <Grid className="docHlthMain">
                  <Grid className="drstndrdQues">
                    <h3>{doc_and_statnderd_ques}</h3>
                    <Grid className="drsplestQues">
                      <Grid>
                        <label>{doc_aimedis_private}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.docProfile &&
                            this.state.AddPrescription.docProfile.first_name &&
                            this.state.AddPrescription.docProfile
                              .first_name}{" "}
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.docProfile &&
                            this.state.AddPrescription.docProfile.last_name &&
                            this.state.AddPrescription.docProfile.last_name}
                        </h3>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid className="ishelpUpr">
                    <Grid className="ishelpLbl">
                      <label>{is_this_follow_pres}?</label>
                    </Grid>
                    <Grid className="ishelpChk">
                      <FormControlLabel
                        control={<Radio />}
                        name="follow_up_prescription"
                        value="yes"
                        color="#00ABAF"
                        checked={
                          this.state.AddPrescription.follow_up_prescription ===
                          "yes"
                        }
                        onChange={this.AddState}
                        label={Yes}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        name="follow_up_prescription"
                        color="#00ABAF"
                        value="no"
                        checked={
                          this.state.AddPrescription.follow_up_prescription ===
                          "no"
                        }
                        onChange={this.AddState}
                        label={No}
                      />
                    </Grid>
                    <Grid className="ishelpLbl">
                      <label>{how_u_like_rcv_pres}?</label>
                    </Grid>
                    <Grid className="ishelpChk">
                      <FormControlLabel
                        control={<Radio />}
                        name="prescription_type"
                        value="online"
                        color="#00ABAF"
                        checked={
                          this.state.AddPrescription.prescription_type ===
                          "online"
                        }
                        onChange={this.AddState}
                        label={online}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        name="prescription_type"
                        color="#00ABAF"
                        value="offline"
                        checked={
                          this.state.AddPrescription.prescription_type ===
                          "offline"
                        }
                        onChange={this.AddState}
                        label={home_add_mailbox}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <h4>
                      {Medicine} {inquiry}
                    </h4>
                    <Grid>
                      <label>
                        {Medicine} / {Substance}
                      </label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="medication"
                        value={this.state.AddPrescription.medication}
                        onChange={this.AddState}
                      />
                      {/* <Select
                                                value={this.state.selectedSub}
                                                onChange={(e) => this.eventnameSetP('medication', e)}
                                                options={specialistOptions}
                                                placeholder="Select"
                                                isSearchable={false}
                                                isMulti={false}
                                            /> */}
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <Grid>
                      <label>{Dose}</label>
                    </Grid>
                    <Grid className="doseMg">
                      <input
                        type="text"
                        name="dose"
                        value={this.state.AddPrescription.dose}
                        onChange={this.AddState}
                      />
                      <span>{mg}</span>
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <Grid>
                      <label>{trade_name}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="trade_name"
                        value={this.state.AddPrescription.trade_name}
                        onChange={this.AddState}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <Grid>
                      <label>{atc_if_applicable}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="atc_code"
                        value={this.state.AddPrescription.atc_code}
                        onChange={this.AddState}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <Grid>
                      <label>{manufacturer}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="manufacturer"
                        value={this.state.AddPrescription.manufacturer}
                        onChange={this.AddState}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <Grid>
                      <label>{pack_size}</label>
                    </Grid>
                    <Grid>
                      <input
                        type="text"
                        name="pack_size"
                        value={this.state.AddPrescription.pack_size}
                        onChange={this.AddState}
                      />
                    </Grid>
                  </Grid>

                  <Grid className="medicnSub">
                    <Grid>
                      <label>
                        {Annotations} / {details} / {questions}
                      </label>
                    </Grid>
                    <Grid>
                      <textarea
                        name="annotations"
                        value={this.state.AddPrescription.annotations}
                        onChange={this.AddState}
                      ></textarea>
                    </Grid>
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
                    <input
                      type="submit"
                      onClick={this.SubmitPrescription}
                      value={edit_entry}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Modal>

          <Modal
            open={this.state.showInquiry}
            onClose={this.handleCloseShowSick}
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                ? "darkTheme nwPresModel"
                : "nwPresModel"
            }
          >
            <Grid className="nwPresCntnt">
              <Grid className="nwPresCntntIner">
                <Grid className="nwPresCourse">
                  <Grid className="nwPresCloseBtn">
                    <a onClick={this.handleCloseShowSick}>
                      <img
                        src={require("assets/images/close-search.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                  </Grid>
                  <p>
                    {edit} {inquiry}
                  </p>
                  <Grid>
                    <label>{prescription}</label>
                  </Grid>
                </Grid>
                <Grid className="docHlthMain">
                  <Grid className="drstndrdQues">
                    <h3>{doc_and_statnderd_ques}</h3>
                    <Grid className="drsplestQues">
                      <Grid>
                        <label>{doc_aimedis_private}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.docProfile &&
                            this.state.AddPrescription.docProfile.first_name &&
                            this.state.AddPrescription.docProfile
                              .first_name}{" "}
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.docProfile &&
                            this.state.AddPrescription.docProfile.last_name &&
                            this.state.AddPrescription.docProfile.last_name}
                        </h3>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid className="ishelpUpr">
                    <Grid className="ishelpLbl">
                      <label>{is_this_follow_pres}?</label>
                    </Grid>
                    <Grid>
                      <h3>
                        {this.state.AddPrescription &&
                          this.state.AddPrescription.follow_up_prescription &&
                          this.state.AddPrescription.follow_up_prescription}
                      </h3>
                    </Grid>

                    <Grid className="ishelpLbl">
                      {" "}
                      <label>{how_u_like_rcv_pres}?</label>{" "}
                    </Grid>
                    <Grid>
                      <h3>
                        {this.state.AddPrescription &&
                          this.state.AddPrescription.prescription_type &&
                          this.state.AddPrescription.prescription_type ===
                          "offline"
                          ? home_add_mailbox
                          : online}
                      </h3>
                    </Grid>

                    <Grid className="medicnSub">
                      {" "}
                      <h4 className="Inquirypaddingtop">
                        {Medicine} {inquiry}
                      </h4>
                      <Grid>
                        <label>
                          {Medicine} / {Substance}
                        </label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.medication &&
                            this.state.AddPrescription.medication}
                        </h3>
                      </Grid>
                    </Grid>

                    <Grid className="medicnSub">
                      <Grid>
                        <label>{Dose}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.dose &&
                            this.state.AddPrescription.dose}
                        </h3>
                        <span>mg</span>
                      </Grid>
                    </Grid>

                    <Grid className="medicnSub">
                      <Grid>
                        <label>{trade_name}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.trade_name &&
                            this.state.AddPrescription.trade_name}
                        </h3>
                      </Grid>
                    </Grid>

                    <Grid className="medicnSub">
                      <Grid>
                        <label>{atc_if_applicable}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.atc_code &&
                            this.state.AddPrescription.atc_code}
                        </h3>
                      </Grid>
                    </Grid>

                    <Grid className="medicnSub">
                      <Grid>
                        <label>{manufacturer}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.manufacturer &&
                            this.state.AddPrescription.manufacturer}
                        </h3>
                      </Grid>
                    </Grid>

                    <Grid className="medicnSub">
                      <Grid>
                        <label>{pack_size}</label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.pack_size &&
                            this.state.AddPrescription.pack_size}
                        </h3>
                      </Grid>
                    </Grid>

                    <Grid className="medicnSub">
                      <Grid>
                        <label>
                          {Annotations} / {details} / {questions}
                        </label>
                      </Grid>
                      <Grid>
                        <h3>
                          {this.state.AddPrescription &&
                            this.state.AddPrescription.annotations &&
                            this.state.AddPrescription.annotations}
                        </h3>
                      </Grid>
                    </Grid>
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
                    <input
                      type="submit"
                      onClick={this.handleCloseShowSick}
                      value={cancel_details}
                    />
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
                  <a>
                    {this.state.currentPage} of {this.state.totalPage}
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                {this.state.totalPage > 1 && (
                  <Grid className="prevNxtpag">
                    {this.state.currentPage !== 1 && (
                      <a
                        className="prevpag"
                        onClick={() => {
                          this.onChangePage(this.state.currentPage - 1);
                        }}
                      >
                        Previous
                      </a>
                    )}
                    {this.state.pages &&
                      this.state.pages.length > 0 &&
                      this.state.pages.map((item, index) => (
                        <a
                          className={
                            this.state.currentPage === item &&
                            "activePageDocutmet"
                          }
                          onClick={() => {
                            this.onChangePage(item);
                          }}
                        >
                          {item}
                        </a>
                      ))}
                    {this.state.currentPage !== this.state.totalPage && (
                      <a
                        className="nxtpag"
                        onClick={() => {
                          this.onChangePage(this.state.currentPage + 1);
                        }}
                      >
                        Next
                      </a>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
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
