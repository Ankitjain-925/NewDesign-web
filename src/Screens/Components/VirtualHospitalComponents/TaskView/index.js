import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import Button from "@material-ui/core/Button";
import { Settings } from "Screens/Login/setting";
import { getLanguage } from "translations/index";
import { S3Image } from "Screens/Components/GetS3Images/index";
import { getDate, getTime } from "Screens/Components/BasicMethod/index";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Td } from "react-super-responsive-table";

class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  };

  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      Open,
      Done,
      see_details,
      EditTask,
      DeleteTask,
      assign_to_doctor,
      edit_picture_evaluation,
      decline_picture_evaluation,
      Declined,
      view_detail,
      decline,
      approved,
      Create_Certificate,
      Join_Meeting,
      Not_attended,
      Payment_pending,
    } = translate;
    var data = this.state.data;
    return (
      <Grid className="allTabCntnt">
        <Grid container direction="row" alignItems="center">
          <Grid className="" item xs={12} sm={6} md={6}>
            <Grid className="revwFiles revwFiles1">
              {data.status === "done" ? (
                <Grid>
                  <img
                    src={require("assets/virtual_images/rightTick.png")}
                    alt=""
                    title=""
                  />
                </Grid>
              ) : (
                <Grid>
                  <img
                    src={require("assets/virtual_images/greyImg.png")}
                    alt=""
                    title=""
                  />
                </Grid>
              )}
              <Grid className="revwFilesRght">
                <Grid>
                  <SpecialityButton
                    label={data?.speciality?.specialty_name}
                    backgroundColor={data?.speciality?.background_color}
                    viewImage={false}
                    color={data?.speciality?.color}
                    showActive={false}
                  />
                </Grid>
                <Grid>
                  <label>{data.task_name}</label>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="allInfo tasklistName">
              <Grid>
                <S3Image imgUrl={data?.patient?.image} />
              </Grid>
              {/* <Grid><img src={require('assets/virtual_images/person1.jpg')} alt="" title="" /></Grid> */}
              <Grid className="allInfoRght">
                <Grid>
                  <label>
                    {data?.patient?.first_name} {data?.patient?.last_name}
                  </label>
                </Grid>
                <p>{data?.patient?.profile_id}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Grid className="attchNoteMain">
              <Grid className="attchNotePart">
                {data.task_type !== "sick_leave" && (
                  <Grid className="attchNoteUpr">
                    <Grid className="attchNote">
                      <img
                        src={require("assets/virtual_images/paragraph-normal.svg")}
                        alt=""
                        title=""
                      />
                      <label>{data?.comments?.length}</label>
                    </Grid>
                    <Grid className="attchNote attchImg">
                      <img
                        src={require("assets/virtual_images/attatchment.png")}
                        alt=""
                        title=""
                      />
                      <label>{data?.attachments?.length}</label>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  // className={data.status === 'done' ? 'attchDone' : 'attchOpen'}
                  className={
                    data?.is_decline === true
                      ? "attchDecline"
                      : data.status === "done"
                      ? "attchDone"
                      : "attchOpen"
                  }
                >
                  <Button>
                    <label></label>
                    {data?.is_decline === true ? (
                      <> {Declined}</>
                    ) : data?.status === "open" ? (
                      <>{Open}</>
                    ) : (
                      <>{Done}</>
                    )}
                  </Button>
                </Grid>
                <Grid>
                  <Grid className="allInfo allInfo1">
                    <Grid className="allInfoRght date-secTask">
                      <Grid>
                        <label>
                          {data?.due_on?.date &&
                            getDate(data?.due_on?.date, this.state.date_format)}
                        </label>
                      </Grid>
                      <p>
                        {data?.due_on?.time &&
                          getTime(
                            new Date(data?.due_on?.time),
                            this.state.time_foramt
                          )}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="setAssignedToupper">
                <Assigned assigned_to={data.assinged_to} />
              </Grid>

              {data.task_type === "sick_leave" && (
                <Grid>
                  <Td className="billDots">
                    <a className="academy_ul">
                      {data && data.is_payment && data.is_payment == true ? (
                        <Grid>
                          <InfoOutlinedIcon className="InfoOutLinees" />
                          <label className="assignHoses Paymentpending">
                            {Not_attended}
                          </label>
                        </Grid>
                      ) : (
                        <Grid>
                          <InfoOutlinedIcon className="InfoOutLinees" />
                          <label className="assignHoses appointmentTime">
                            {Payment_pending}
                          </label>
                        </Grid>
                      )}
                    </a>
                  </Td>
                </Grid>
              )}

              <Grid className="spcMgntRght7 presEditDot scndOptionIner">
                {!data?.is_decline && (
                  <a className="openScndhrf">
                    <img
                      src={require("assets/images/three_dots_t.png")}
                      alt=""
                      title=""
                      className="openScnd specialuty-more"
                    />
                    <ul>
                      <li>
                        <a
                          onClick={() => {
                            this.props.editTask(data);
                          }}
                        >
                          <img
                            src={require("assets/virtual_images/pencil-1.svg")}
                            alt=""
                            title=""
                          />

                          {data &&
                          data.task_type &&
                          data.task_type === "picture_evaluation" &&
                          this.props.comesFrom === "Professional" ? (
                            <>{edit_picture_evaluation}</>
                          ) : data.task_type &&
                            data.task_type === "picture_evaluation" &&
                            this.props.comesFrom === "adminstaff" &&
                            data.status === "done" ? (
                            <>{see_details}</>
                          ) : data.task_type &&
                            data.task_type === "picture_evaluation" &&
                            (this.props.comesFrom === "adminstaff" ||
                              this.props.comesFrom === "detailTask") ? (
                            <>{assign_to_doctor}</>
                          ) : data.task_type &&
                            data.task_type === "sick_leave" &&
                            this.props.comesFrom === "Professional" ? (
                            <>{view_detail}</>
                          ) : (
                            <>{EditTask}</>
                          )}
                        </a>
                      </li>

                      {data &&
                      data.task_type &&
                      data.task_type === "sick_leave" &&
                      !data.approved === true &&
                      this.props.comesFrom === "Professional" ? (
                        <li
                          onClick={() => {
                            this.props.handleApprovedDetails(
                              data._id,
                              "approved",
                              data
                            );
                          }}
                        >
                          <a>
                            <img
                              src={require("assets/virtual_images/pencil-1.svg")}
                              alt=""
                              title=""
                            />
                            <>{approved}</>
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}

                      {data &&
                      data.task_type &&
                      data.task_type === "picture_evaluation"
                        ? this.props.comesFrom !== "Professional" &&
                          data?.assinged_to?.length == 0 && (
                            <li
                              onClick={() => {
                                this.props.declineTask(
                                  data._id,
                                  data.patient_id
                                );
                              }}
                            >
                              <a>
                                <img
                                  src={require("assets/images/cancel-request.svg")}
                                  alt=""
                                  title=""
                                />
                                <>{decline_picture_evaluation}</>
                              </a>
                            </li>
                          )
                        : data &&
                          data.task_type &&
                          data.task_type === "sick_leave" &&
                          this.props.comesFrom === "Professional" &&
                          !data.is_decline &&
                          !data.certificate?.most_likely &&
                          !data.approved === true && (
                            <li
                              onClick={() => {
                                this.props.handleApprovedDetails(
                                  data._id,
                                  "decline",
                                  data
                                );
                              }}
                            >
                              <a>
                                <img
                                  src={require("assets/images/cancel-request.svg")}
                                  alt=""
                                  title=""
                                />
                                <>{decline}</>
                              </a>
                            </li>
                          )}
                      {data &&
                        data.task_type &&
                        data.task_type === "sick_leave" &&
                        data.meetingjoined &&
                        !data.certificate?.most_likely && (
                          <li
                            onClick={() => {
                              this.props.cretficate(data._id, data.patient_id);
                            }}
                          >
                            <a>
                              <img
                                src={require("assets/virtual_images/menudocs.jpg")}
                                alt=""
                                title=""
                              />
                              <>{Create_Certificate}</>
                            </a>
                          </li>
                        )}
                      {data &&
                        data.task_type &&
                        data.task_type === "sick_leave" &&
                        !data.meetingjoined &&
                        data.link?.doctor_link && (
                          <li
                            onClick={() => {
                              // this.props.cretficate()
                            }}
                          >
                            <a>
                              <img
                                src={require("assets/images/details.svg")}
                                alt=""
                                title=""
                              />
                              <a
                                className="joinmeetingtab"
                                href={data.link?.doctor_link}
                                target="_blank"
                              >
                                {Join_Meeting}
                              </a>
                            </a>
                          </li>
                        )}
                    </ul>
                  </a>
                )}
                    {data.task_type === 'sick_leave' && (
                <Grid className="informStatus">
                {/* <Td className="billDots">
                  <a className="academy_ul"> */}
                    {data && data.is_payment && data.is_payment == true ? (
                      <Grid>
                        <InfoOutlinedIcon className="InfoOutLinees" />
                        <label className="assignHoses Paymentpending">
                          {
                            Not_attended
                          }
                        </label>
                      </Grid>
                    ) : (
                      <Grid>
                        <InfoOutlinedIcon className="InfoOutLinees" />
                        <label className="assignHoses appointmentTime">
                          {Payment_pending}

                        </label>
                      </Grid>
                    )}
                  {/* </a>
                </Td> */}
                </Grid>)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    settings,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, { LanguageFetchReducer, Settings })(PointPain)
  )
);
