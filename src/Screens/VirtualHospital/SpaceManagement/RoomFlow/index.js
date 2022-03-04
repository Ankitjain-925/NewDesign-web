import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "Screens/Components/Loader/index";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../../Institutes/selecthouseaction";
import Modal from "@material-ui/core/Modal";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { S3Image } from "Screens/Components/GetS3Images/index";
import SelectField from "Screens/Components/Select/index";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { getLanguage } from "translations/index";
import { Speciality } from "Screens/Login/speciality.js";
import { AllRoomList, getSteps, AllWards, PatientMoveFromHouse, setWard, CurrentWard, CurrentRoom, setRoom, AllBed, CurrentBed, setBed } from "Screens/VirtualHospital/PatientFlow/data";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.initial,
      AllRoom: [],
      ordered: ["step2", "step1", "step3"],
      selectedOption: null,
      view: "vertical",
      value: 0,
      selectedward: false,
      selectedSpeciality: {},
      allSpecialty: [],
      Rooms: [],
      case_ID: false,
      openWarn: false,
    };
  }
  static defaultProps = {
    isCombineEnabled: false,
  };
  boardRef;

  handleChangeTab = (value) => {
    this.setState({ selectedward: value, value: value.ward_name },
      () => { this.getFinalDat(this.state.selectedward?.ward_name) });

  };

  componentDidMount = () => {
    if (this.props.history?.location?.state?.selectedward) {
      this.setState(
        {
          allSpecialty: this.props.history?.location?.state?.data,
          selectedward: this.props.history?.location?.state?.selectedward,
          selectedSpeciality: this.props.history?.location?.state?.selectedspec,
        },
        () => {
          this.getFinalDat(this.props.history?.location?.state?.selectedward?.ward_name);
        }
      );
    } else {
      this.props.history.push("/virtualHospital/space");
    }
  };

  getFinalDat = (ward_name) => {
    this.state.selectedSpeciality?.wards?.length > 0 &&
      this.state.selectedSpeciality.wards.map((item, index) => {
        if (
          item.ward_name === ward_name

        ) {
          this.setState({ value: index, loaderImage: true });
          axios
            .get(
              `${sitedata.data.path}/vh/BedAvability/${this.state.selectedSpeciality?._id}/${this.state.selectedward._id}`,
              commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((response) => {
              if (response.data.hassuccessed) {
                this.setState({ Rooms: response.data.data });
                this.getListOption();

              }
              this.setState({ loaderImage: false });
            });
        }
      });
  }

  handleOpenWarn = (id) => {
    this.setState({ openWarn: true, case_ID: id },
      () => {
        this.GetAllBed();
      });
  };

  handleCloseWarn = () => {
    this.setState({ openWarn: false, case_ID: false });
  };

  moveAnotherSpeciality = (data) => {
    this.setState({
      selectedSpeciality: data,
      selectedward: data.wards?.length > 0 ? data.wards[0] : false,
      value: data.wards?.length > 0 ? data.wards[0]?.ward_name : false,
    }, () => {
      this.getFinalDat(data.wards?.length > 0 ? data.wards[0]?.ward_name : false)
    });

  };

  getListOption = () => {
    var AllRoom = AllRoomList(this.state.selectedSpeciality._id, this.props.speciality?.SPECIALITY, this.state.selectedward?._id);
    this.setState({ AllRoom: AllRoom });
    this.GetAllBed();
  }

  setsRoom = (e) => {
    this.setState({ loaderImage: true });

    var response = setRoom(e, this.state.case_ID?.speciality?._id, this.props.speciality?.SPECIALITY, this.state.case_ID._id, this.props.stateLoginValueAim.token, this.state.case_ID?.wards?._id)
    response.then((responce1) => {
      if (responce1.data.hassuccessed) {
        var mydata1 = this.props.speciality?.SPECIALITY.filter((element) => element._id === this.state.case_ID?.speciality?._id)
        var mydata = mydata1[0]?.wards.length > 0 && mydata1[0]?.wards.filter((element) => element._id === this.state.case_ID?.wards?._id)
        if (mydata && mydata.length > 0) {
          var data = this.state.case_ID;
          var setData = mydata[0]?.rooms?.length > 0 && mydata[0]?.rooms.filter((data, i) => data._id === e.value)?.[0];
          data['rooms'] = {
            _id: setData?._id,
            room_name: setData?.room_name,
          };
          data['bed'] = "";
          this.setState({ case_ID: data });
        }
        // this.getListOption();
        this.GetAllBed();
        this.setState({ loaderImage: false });
        // });
        // this.setState({ loaderImage: false });
      }
    })
  }

  GetAllBed = async () => {
    if (this.state.case_ID?.speciality?._id && this.state.case_ID?.wards?._id && this.state.case_ID?.rooms?._id && this.props?.House?.value) {
      var response = await AllBed(this.state.case_ID?.speciality?._id, this.state.case_ID?.wards?._id, this.state.case_ID?.rooms?._id, this.props?.House?.value,
        this.props.stateLoginValueAim.token);
      var finalBed = [];
      if (response.data.hassuccessed) {
        var finalBed = response?.data?.data.length > 0 && response?.data?.data.map((bed) => {
          return { value: bed, label: bed }
        });
        this.setState({ AllBeds: finalBed },
          () => {
          })
      }
      else {
        this.setState({ AllBeds: [] })
      }
    }
  }

  setsBed = (e) => {
    this.setState({ loaderImage: true });
    var response = setBed(e, this.state.case_ID._id, this.props.stateLoginValueAim.token)
    response.then((responce1) => {
      if (responce1.data.hassuccessed) {
        this.getFinalDat(this.state.selectedward?.ward_name);
        this.handleCloseWarn();
        this.setState({ loaderImage: false, setSec: false });
      }
    })
  }

  PatientFlow = () => {
    this.props.history.push("/virtualHospital/patient-flow")
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;
    const { value } = this.state;
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      SpaceManagement,
      AddPatient,
      Institution,
      speciality,
      Ward,
      Move_patient_here,
    } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme"
            : "homeBg"
        }
      >
        <Grid className="homeBgIner">

          {this.state.loaderImage && <Loader />}
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <LeftMenuMobile isNotShow={true} currentPage="space" />
              <Grid container direction="row" className="spcMgntUper">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="space" />
                </Grid>
                {/* End of Menu */}
                {/* Start of Right Section */}
                <Grid item xs={11} md={11}>
                  <Grid className="cmnLftSpc ptntFlowSpc">
                    <Grid className="addFlow">
                      <Grid container direction="row" justify="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <h1>{SpaceManagement}</h1>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          className="addFlowRght"
                        >
                          {/* <a onClick={()=>{this.PatientFlow()}}>{AddPatient}</a> */}
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={9}>
                          <Grid className="roomBreadCrumb">
                            <ul>
                              <li>
                                <a
                                  onClick={() => {
                                    this.props.history.push(
                                      "/virtualHospital/space"
                                    );
                                  }}
                                >
                                  <span>{Institution}</span>
                                  <label className="c-pointer">
                                    {this.props?.House?.label}
                                  </label>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <span>{speciality}</span>
                                  <label>
                                    {
                                      this.state.selectedSpeciality
                                        ?.specialty_name
                                    }
                                  </label>
                                </a>
                              </li>
                              {/* <li><a><span>{Ward}</span><label>{this.state?.selectedward}</label></a></li> */}
                            </ul>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          {/* <Grid className="settingInfo">
                            <a>
                              <img
                                src={require("assets/virtual_images/search-entries.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                            <a>
                              <img
                                src={require("assets/virtual_images/setting.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </Grid> */}
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* End of Bread Crumb */}
                    <Grid className="wardsGrupUpr">
                      <Grid className="cardioGrup">
                        <Grid className="cardioGrupBtn">
                          {this.state.allSpecialty?.length > 0 &&
                            this.state.allSpecialty.map((item) => (
                              <Button
                                onClick={() => {
                                  this.moveAnotherSpeciality(item);
                                }}
                                variant="contained"
                                className={
                                  this.state.selectedSpeciality
                                    ?.specialty_name === item.specialty_name
                                    ? "cardioActv"
                                    : ""
                                }
                              >
                                {item.specialty_name}
                              </Button>
                            ))}
                        </Grid>
                        <Grid className="cardioTabUpr">
                          <AppBar position="static" className="cardioTabs">
                            <Tabs value={value}>
                              {this.state.selectedSpeciality?.wards?.length >
                                0 &&
                                this.state.selectedSpeciality?.wards.map(
                                  (items) => (
                                    <Tab
                                      label={<span className="TabCSS"><span>  <img
                                        src={require("assets/virtual_images/activetogle.png")}
                                        alt=""
                                        title=""
                                      /> </span><span>{items.ward_name}</span> </span>}
                                      className="cardiotabIner"
                                      onClick={() => this.handleChangeTab(items)}
                                    />
                                  )
                                )}

                              {/* <Tab label="Childrens Ward" className="cardiotabIner" /> */}
                            </Tabs>
                          </AppBar>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Grid container direction="row" spacing={3}>
                          {this.state.Rooms?.length > 0 &&
                            this.state.Rooms.map((item, index) => (
                              <Grid item xs={12} md={6} lg={3}>
                                <Grid className="drList2">
                                  <Grid className="roomNum2">
                                    <Grid container direction="row">
                                      <Grid item xs={12} md={12}>
                                        <Modal
                                          open={this.state.openWarn}
                                          onClose={() => this.handleCloseWarn()}
                                          className={
                                            this.props.settings &&
                                              this.props.settings.setting &&
                                              this.props.settings.setting.mode &&
                                              this.props.settings.setting.mode ===
                                              "dark"
                                              ? "darkTheme addWrnModel"
                                              : "addWrnModel"
                                          }
                                        >
                                          <Grid className="addWrnContnt">
                                            <Grid className="addWrnIner">
                                              <Grid className="addWrnLbl">
                                                <Grid className="addWrnClose">
                                                  <a
                                                    onClick={() =>
                                                      this.handleCloseWarn()
                                                    }
                                                  >
                                                    <img
                                                      src={require("assets/images/close-search.svg")}
                                                      alt=""
                                                      title=""
                                                    />
                                                  </a>
                                                </Grid>
                                              </Grid>
                                              <Grid className="enterWrnUpr">
                                                <Grid className="enterWrnMain">
                                                  <Grid className="wrnUndr">
                                                    {this.state.case_ID?.wards?._id && <Grid className="fillDia">
                                                      <SelectField
                                                        isSearchable={true}
                                                        name="type"
                                                        label="Room"
                                                        option={this.state.AllRoom}
                                                        onChange={(e) => this.setsRoom(e)}
                                                        value={CurrentRoom(this.state.case_ID?.rooms)}
                                                        className="addStafSelect1"
                                                      />
                                                    </Grid>}
                                                    {this.state.case_ID?.rooms?._id && <Grid className="fillDia">
                                                      <SelectField
                                                        isSearchable={true}
                                                        name="type"
                                                        label="Bed"
                                                        option={this.state.AllBeds}
                                                        onChange={(e) => this.setsBed(e)}
                                                        value={CurrentBed(this.state.case_ID?.bed)}
                                                        className="addStafSelect1"
                                                      />
                                                    </Grid>}
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Modal>
                                        <Button variant="contained">
                                          {item?.rooms?.room_name}
                                        </Button>
                                      </Grid>
                                      {item.bedData?.length > 0 &&
                                        item.bedData.map((bed, index) => (
                                          <>
                                            <Grid className="drListMain2">
                                              <Grid className={bed.cases?._id ? "OnExistBed drListLft2": "drListLft2"}>
                                                <img
                                                  src={require("assets/virtual_images//bed2.png")}
                                                  alt=""
                                                  title=""
                                                />
                                                <span>{bed.bed}</span>
                                              </Grid>
                                              <Grid item xs={12} md={12} className='pat_flow_sec'>
                                                <Grid className="drListRght2 setinFullidrh">
                                                  {bed.cases?._id ? (
                                                    <Grid className="drRghtIner2">
                                                      <Grid>
                                                        <S3Image
                                                          imgUrl={
                                                            bed?.cases?.patient
                                                              ?.image
                                                          }
                                                        />
                                                      </Grid>
                                                      <Grid>
                                                        <Grid>
                                                          <label>
                                                            {bed?.cases?.patient
                                                              ?.first_name &&
                                                              bed?.cases
                                                                ?.patient
                                                                ?.first_name}{" "}
                                                            {bed?.cases?.patient
                                                              ?.last_name &&
                                                              bed?.cases
                                                                ?.patient
                                                                ?.last_name}
                                                          </label>
                                                        </Grid>
                                                        <Grid>
                                                          <p>
                                                            {bed?.cases?.patient
                                                              ?.alies_id
                                                              ? bed?.cases
                                                                ?.patient
                                                                ?.alies_id
                                                              : bed?.cases
                                                                ?.patient
                                                                ?.profile_id}
                                                          </p>
                                                        </Grid>
                                                      </Grid>
                                                      <Grid className="room-img-move">
                                                        <img
                                                          onClick={() => this.handleOpenWarn(bed?.cases)}
                                                          src={require("assets/images/three_dots_t.png")}
                                                          alt=""
                                                          title=""
                                                        />
                                                      </Grid>
                                                    </Grid>
                                                  ) : (
                                                    <Button variant="contained">
                                                      {Move_patient_here}
                                                    </Button>
                                                  )}
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </>
                                        ))}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                      {/* <Drags initial={authorQuoteMap} view={this.state.view} /> */}
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
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { House } = state.houseSelect;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { speciality } = state.Speciality;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    speciality
    //   Doctorsetget,
    //   catfil
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
    Speciality
  })(Index)
);
