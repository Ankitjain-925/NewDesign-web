import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import FileViews from "./../FileViews/index";
import ReactTooltip from "react-tooltip";
import DownloadFullTrack from "./../../DownloadFullTrack/index.js";
import { getDate, newdate, getTime, getImage } from "./../../BasicMethod/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "./../../../actions";
import { pure } from "recompose";
import {
  translationAR,
  translationSW,
  translationSP,
  translationRS,
  translationEN,
  translationNL,
  translationDE,
  translationCH,
  translationPT,
  translationFR
} from "translations/index"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data || {},
      date_format: this.props.date_format,
      time_foramt: this.props.time_format,
      archive: this.props.archive,
      loggedinUser: this.props.loggedinUser,
      images: this.props.images,
      TrackRecord: this.props.TrackRecord,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.data !== this.props.data ||
      prevProps.loggedinUser !== this.props.loggedinUser
    ) {
      this.setState({
        item: this.props.data,
        loggedinUser: this.props.loggedinUser,
        images: this.props.images,
      });
    }
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
    if (prevProps.TrackRecord !== this.props.TrackRecord) {
      this.setState({ TrackRecord: this.props.TrackRecord });
    }
  };

  render() {
    var item = this.state.item;
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
      visibility,
      Download,
      Delete,
      visible,
      details,
      hide,
      show,
      always,
      Date_of_event,
      edit,
      Change,
      traveled,
      slct_ICD_serch_code,
      when,
      to,
      allergy,
      enter_code_serch_by_keyword,
      dignose,
      of,
      until,
      archive,
      rr_systolic,
      attachments,
      time_measure,
      date_measure,
      date,
      time,
      confirm_diag,
      emergancy_dignosis,
      diary,
      trvl_diagnosis,
      travelled_to,
      diary_note,
      diagnosed,
      by,
      notes,
      save_entry,
      emergency,
      diagnosis,
      review,
      on,
      not_mentioned,
      de_archive,
    } = translate;

    return (
      <Grid container direction="row" className="descpCntnt">
        <Grid item xs={12} md={1} className="descpCntntLft">
          {newdate(item.datetime_on)}
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid className="descpInerRght">
            <Grid container direction="row" className="addSpc">
              <Grid item xs={12} md={6}>
                <Grid className="blodPrsurImg">
                  <a className="diryNote">
                    <img
                      src={require("../../../../assets/images/condition-diagnosis-family-anamnesis-diary.svg")}
                      alt=""
                      title=""
                    />
                    <span>{diary}</span>
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid className="bp_vsblSec scndOptionIner1">
                  <a
                    onClick={() => this.props.EidtOption(item.type, item, true)}
                    className="bp_vsblEye"
                  >
                    <img
                      src={require("../../../../assets/images/eye2.png")}
                      alt=""
                      title=""
                    />{" "}
                    {item.visible === "show" ? (
                      <span>{visible}</span>
                    ) : item.visible === "hide" ? (
                      <span>{hide}</span>
                    ) : (
                      <span>{not_mentioned}</span>
                    )}{" "}
                  </a>
                  <a
                    className="vsblTime"
                    data-tip
                    data-for={item.track_id + "visibility"}
                  >
                    <img
                      src={require("../../../../assets/images/clock.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                  <ReactTooltip
                    className="timeIconClas"
                    id={item.track_id + "visibility"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    {item.visible === "show" ? (
                      <label>
                        {show} {until}
                      </label>
                    ) : (
                      <label>
                        {hide} {until}
                      </label>
                    )}
                    {item.public === "always" ? (
                      <p> {always} </p>
                    ) : item.public ? (
                      <p>{getDate(item.public, this.state.date_format)}</p>
                    ) : (
                      <p>{not_mentioned}</p>
                    )}
                  </ReactTooltip>
                  <a className="openScndhrf1">
                    <a className="vsblDots">
                      <img
                        src={require("../../../../assets/images/nav-more.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                    {!this.props.Archive ? (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("../../../../assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {archive}
                          </a>
                        </li>
                        {this.props.comesfrom === "patient" && (
                          <li>
                            {item.created_by === this.state.loggedinUser._id &&
                            (!item.updated_by || item.updated_by === "") ? (
                              <a
                                onClick={() =>
                                  this.props.EidtOption(item.type, item)
                                }
                              >
                                <img
                                  src={require("../../../../assets/images/edit-1.svg")}
                                  alt=""
                                  title=""
                                />
                                {edit}
                              </a>
                            ) : (
                              <a
                                onClick={() =>
                                  this.props.EidtOption(item.type, item, true)
                                }
                              >
                                <img
                                  src={require("../../../../assets/images/edit.svg")}
                                  alt=""
                                  title=""
                                />
                                {Change} {visibility}
                              </a>
                            )}
                          </li>
                        )}
                        {this.props.comesfrom !== "patient" && (
                          <li>
                            <a
                              onClick={() =>
                                this.props.EidtOption(item.type, item)
                              }
                            >
                              <img
                                src={require("../../../../assets/images/edit-1.svg")}
                                alt=""
                                title=""
                              />
                              {edit}
                            </a>
                          </li>
                        )}
                        <li>
                          <a onClick={() => this.props.downloadTrack(item)}>
                            <img
                              src={require("../../../../assets/images/download.svg")}
                              alt=""
                              title=""
                            />
                            {Download}
                          </a>
                        </li>
                        <li>
                          <DownloadFullTrack
                            TrackRecord={this.state.TrackRecord}
                          />
                        </li>
                        <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("../../../../assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("../../../../assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {de_archive}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("../../../../assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li>
                      </ul>
                    )}
                  </a>
                </Grid>
              </Grid>
              <Grid className="clear"></Grid>
            </Grid>

            <Grid className="bp_hg addSpc">
              <label>
                {diary_note}
                <span></span>
              </label>
              {/* <p>Normal</p> */}
            </Grid>

            <Grid container direction="row" className="addSpc bpJohnMain">
              <Grid item xs={12} md={12}>
                <Grid className="bpJohnImg">
                  <a data-tip data-for={item.track_id + "created"}>
                    <img
                      src={getImage(item.created_by_image, this.state.images)}
                      alt=""
                      title=""
                    />
                    <span>{item.created_by_temp}</span>
                  </a>
                  <ReactTooltip
                    className="timeIconClas_crested"
                    id={item.track_id + "created"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    <p>{item.created_by_temp}</p>
                    <p>{item.created_by_profile}</p>
                    <p>
                      <img
                        src={getImage(item.created_by_image, this.state.images)}
                        alt=""
                        title=""
                      />
                    </p>
                  </ReactTooltip>
                </Grid>
              </Grid>
              <Grid className="clear"></Grid>
            </Grid>
            <Grid className="addSpc detailMark">
              <Collapsible trigger={details} open="true">
                <Grid>
                  <Grid container direction="row">
                    <Grid item xs={12} md={6} className="painTypeBy">
                      <Grid container direction="row">
                        <Grid item xs={5} md={5}>
                          <label>{Date_of_event}</label>
                        </Grid>
                        <Grid item xs={7} md={7}>
                          <span>
                            {item.event_date &&
                              getDate(item.event_date, this.state.date_format)}
                          </span>
                        </Grid>
                        <Grid className="clear"></Grid>
                      </Grid>
                    </Grid>
                    <Grid className="clear"></Grid>
                  </Grid>
                </Grid>
              </Collapsible>
            </Grid>
            <Grid className="addSpc detailMark">
              <Collapsible trigger={notes} open="true">
                <Grid className="detailCntnt">
                  <p dangerouslySetInnerHTML={{ __html: item.free_text }} />
                </Grid>
              </Collapsible>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
