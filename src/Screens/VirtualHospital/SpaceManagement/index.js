import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ColorSelection from "Screens/Components/VirtualHospitalComponents/ColorSelection/index";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import AddRoom from "Screens/Components/VirtualHospitalComponents/AddRoom/index";
import RoomView from "Screens/Components/VirtualHospitalComponents/RoomView/index";
import sitedata from "sitedata";
import axios from "axios";
import Loader from "Screens/Components/Loader/index";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "../Institutes/selecthouseaction"; 
import { Speciality } from "Screens/Login/speciality.js";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  getLanguage
}from "translations/index"

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderImage: false,
      openSpecl: false,
      openSpecl2: false,
      openSpecl3: false,
      openWard: false,
      openRoom: false,
      specialityColor: false,
      openSpecl4: false,
      speciality: {},
      ward: {},
      specialityData: [],
      isEditWrd: false,
      deleteId: false
    };
  }
  handleOpenSpecl = () => {
    this.setState({ openSpecl: true });
  };
  handleCloseSpecl = () => {
    this.setState({
      openSpecl: false, ward: {},
      speciality: {},
    });
  };

  // logoutUser = () => {
  //   this.props.speciality(false);  
  //   let languageType =
  //     this.props.stateLanguageType && this.props.stateLanguageType !== ""
  //       ? this.props.stateLanguageType
  //       : "en";
  //   this.props.LanguageFetchReducer(languageType);
  //   this.anotherPatient();
  // };
  

  //to save and edit the speciality
  SaveSpeciality = () => {
    var data = this.state.speciality;
    if (data._id) {
      this.setState({ loaderImage: true });
      axios
        .put(
          sitedata.data.path + "/vh/AddSpecialty/" + data._id,
          data,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            this.getSpeciality();
          }
          this.setState({
            ward: {},
            speciality: {},
            loaderImage: false,
            openSpecl: false,
          });
        });
    } else {
      this.setState({ loaderImage: true });
      data.house_id = this.props?.House?.value;
      axios
        .post(
          sitedata.data.path + "/vh/AddSpecialty",
          data,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            this.getSpeciality();
          }
          this.setState({
            ward: {},
            speciality: {},
            loaderImage: false,
            openSpecl: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getSpeciality();
  }

  //for getting all speciality
  getSpeciality = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/AddSpecialty/" + this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          this.props.Speciality(true, this.props?.House?.value, this.props.stateLoginValueAim.token);
          this.setState({ specialityData: responce.data.data });
        }
        this.setState({ loaderImage: false, openSpecl: false });
      });
  };

  handleOpenSpecl4 = () => {
    this.setState({ openSpecl4: true });
  };
  handleCloseSpecl4 = () => {
    this.setState({ openSpecl4: false });
  };

  handleSpecialityColor = () => {
    this.setState({ specialityColor: !this.state.specialityColor });
  };

  handleOpenWard = () => {
    this.setState({ openWard: true });
  };

  handleCloseWard = () => {
    this.setState({ openWard: false, isEditWrd: false });
  };
  // update the ward of the speciality
  editWard = (data) => {
    this.setState({ openWard: true, ward: data, isEditWrd: true });
  };
  //add the ward of the speciality
  handleOpenRoom = () => {
    var state = this.state.speciality;
    var ward = state["wards"] || [];
    if (this.state.isEditWrd) {
      ward[this.state.isEditWrd] = this.state.ward;
      this.setState({ isEditWrd: false });
    } else {
      ward.push(this.state.ward);
    }
    state["wards"] = ward;
    this.setState({ speciality: state, isEditWrd: false }, () => {
      this.setState({ openWard: false, ward: {} });
    });
  };

  //for update speciality name
  updateEntryState = (e) => {
    var state = this.state.speciality;
    state[e.target.name] = e.target.value;
    this.setState({ speciality: state });
  };

  //for update the speciality color
  updateEntryState1 = (name, value) => {
    var state = this.state.speciality;
    state[name] = value;
    this.setState({ speciality: state });
  };

  // for update the wards
  updateEntryState2 = (e) => {
    var state = this.state.ward;
    state[e.target.name] = e.target.value;
    this.setState({ ward: state });
  };

  handleOpenWarn = (id) => {
    this.setState({ openSpecl: false, openWarn: true, deleteId: id });
  }
  handleCloseWarn = () => {
    this.setState({ openWarn: false })
  }

  //remove Wards
  removeWard = (index) => {
    var state = this.state.speciality;
    var ward = state["wards"] || [];
    state["wards"].splice(index, 1);
    // state['wards'] = ward;
    this.setState({ speciality: state });
  };

  //for update the rooms in the wards                                                                                                                                                       
  updateEntryState3 = (ward) => {
    var state = this.state.ward;
    state["rooms"] = ward;
    this.setState({ ward: state });
  };

  manageBeds = (data, selectedspec, selectedward) => {
    this.props.history.push({
      pathname: "/virtualHospital/room-flow",
      state: { data, selectedspec, selectedward },
    });
  };

  bednumbers = (rooms) => {
    if (rooms && Array.isArray(rooms)) {
      return rooms.reduce((a, v) => (a = a + parseInt(v.no_of_bed)), 0);
    }
    return "";
  };

  deleteClick = () => {
    if (this.state.wardDel && this.state.roomDel && this.state.patDel && this.state.deleteId) {
      this.setState({ loaderImage: true });
      axios
        .delete(
          sitedata.data.path + "/vh/AddSpecialty/" + this.state.deleteId,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            this.setState({ deleteId: false });
            this.getSpeciality();
          }
          this.setState({ loaderImage: false, openWarn: false });
        });
      this.setState({ showError: false })
    }
    else {
      this.setState({ showError: true })
    }
  };

  onEditspec = (data) => {
    this.setState({ speciality: data, openSpecl: true });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {Specialities, DeleteSpeciality, Iunderstandthat, AddSpeciality } = translate;
    const { stateLoginValueAim, House } = this.props;
    if (
      stateLoginValueAim.user === "undefined" ||
      stateLoginValueAim.token === 450 ||
      stateLoginValueAim.token === "undefined" ||
      stateLoginValueAim.user.type !== "adminstaff" ||
      !this.props.verifyCode ||
      !this.props.verifyCode.code
    ) {
      return <Redirect to={"/"} />;
    }
    if (House && House?.value === null) {
      return <Redirect to={"/VirtualHospital/institutes"} />;
    }
    return (
      <Grid className={
        this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
          ? "homeBg darkTheme"
          : "homeBg"
      }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              <LeftMenuMobile isNotShow={true} currentPage="space" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="space" />
                </Grid>
                {/* End of Menu */}
                {/* Start of Right Section */}
                <Grid item xs={12} md={11}>
                  <Grid className="topLeftSpc">
                    <Grid className="spcMgntH1"><h1>Space Management</h1></Grid>
                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={9}>
                          <Grid className="roomBreadCrumb3">
                            <ul>
                              <li>
                                <a>
                                  <span>Institution</span>
                                  <label>{this.props?.House?.label}</label>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <label>{Specialities}</label>
                                </a>
                              </li>
                            </ul>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Grid className="settingInfo">
                              <a><img src={require('assets/virtual_images/search-entries.svg')} alt="" title="" /></a>
                              <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                            </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Modal
                      open={this.state.openWarn}
                      onClose={this.handleCloseWarn}
                      className={
                        this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark"
                          ? "darkTheme addWrnModel"
                          : "addWrnModel"
                      }

                    >
                      <Grid className="addWrnContnt">
                        <Grid className="addWrnIner">
                          <Grid className="addWrnLbl">
                            <Grid className="addWrnClose">
                              <a onClick={this.handleCloseWarn}>
                                <img
                                  src={require("assets/virtual_images/closefancy.png")}
                                  alt=""
                                  title=""
                                />
                              </a>
                            </Grid>
                            <label>{DeleteSpeciality}</label>

                            {this.state.showError && (
                              <div className="err_message">
                                Please select the all condition for delete the speciality
                              </div>
                            )}
                          </Grid>
                          <Grid className="enterWrnUpr">
                            <Grid className="enterWrnMain">
                              <Grid className="wrnUndr">
                                <span className="warnImg">
                                  <img
                                    src={require("assets/virtual_images/important-notice.svg")}
                                    alt=""
                                    title=""
                                  />
                                </span>
                                <label>{Iunderstandthat}</label>
                              </Grid>
                              <Grid className="wardLine">
                                <FormControlLabel
                                  control={<Checkbox onChange={(e) => { this.setState({ wardDel: e.target.checked }) }} />}
                                  label="All Wards will be deleted"
                                />
                              </Grid>
                              <Grid className="wardLine">
                                <FormControlLabel
                                  control={<Checkbox onChange={(e) => { this.setState({ roomDel: e.target.checked }) }} />}
                                  label="All Rooms & Beds will be deleted"
                                />
                              </Grid>
                              <Grid className="wardLine">
                                <FormControlLabel
                                  control={<Checkbox onChange={(e) => { this.setState({ patDel: e.target.checked }) }} />}
                                  label="All Patients will be removed from their beds"
                                />
                              </Grid>
                              <Grid className="confirmActn">
                                <p>
                                  Please confirm that you understand the
                                  consequences of your action.
                                </p>
                              </Grid>
                              <Grid className="selectWarn">
                                <Button className="selWarnBtn" onClick={() => { this.deleteClick() }}>
                                  Yes, Delete Speciality
                                </Button>
                                <Button onClick={this.handleCloseWarn}>Cancel, Keep Speciality</Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Modal>

                    {/* End of Bread Crumb */}
                    <Grid className="wardsGrupUpr">
                      <Grid container direction="row" spacing={2}>
                        {this.state.specialityData?.length > 0 &&
                          this.state.specialityData.map((data) => (
                            <Grid item xs={12} md={3}>
                              <Grid className="wardsGrup3">
                                <SpecialityButton
                                  viewImage={true}
                                  deleteClick={() => this.handleOpenWarn(data._id)}
                                  label={data.specialty_name}
                                  backgroundColor={data.background_color}
                                  color={data.color}
                                  onClick={() => {
                                    this.onEditspec(data);
                                  }}
                                />
                                {data.wards?.length > 0 &&
                                  data.wards.map((item) => (
                                    <Grid className="roomsNum3">
                                      <ul>
                                        <li
                                          className="c-pointer"
                                          onClick={() => {
                                            this.manageBeds(
                                              this.state.specialityData,
                                              data,
                                              item.ward_name
                                            );
                                          }}
                                        >
                                          <img
                                            src={require("assets/virtual_images/square.png")}
                                            alt=""
                                            title=""
                                          />
                                          {item.ward_name}
                                        </li>
                                        <li>
                                          <img
                                            src={require("assets/virtual_images/room.svg")}
                                            alt=""
                                            title=""
                                          />
                                          {item?.rooms?.length
                                            ? item?.rooms?.length
                                            : 0}{" "}
                                          rooms
                                        </li>
                                        <li>
                                          <img
                                            src={require("assets/virtual_images/bedNumber.png")}
                                            alt=""
                                            title=""
                                          />
                                          {this.bednumbers(item.rooms)} beds
                                          <span>32 available</span>
                                        </li>
                                      </ul>
                                    </Grid>
                                  ))}
                              </Grid>
                            </Grid>
                          ))}

                        <Grid item xs={12} md={3}>
                          <Grid className="nwSpclSec">
                            <p onClick={this.handleOpenSpecl}>
                              + Add a new Speciality
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Right Section */}
                {/* Model setup */}
                <Modal
                  open={this.state.openSpecl}
                  onClose={this.handleCloseSpecl}
                  className={
                    this.props.settings &&
                      this.props.settings.setting &&
                      this.props.settings.setting.mode &&
                      this.props.settings.setting.mode === "dark"
                      ? "darkTheme addSpeclModel"
                      : "addSpeclModel"
                  }
                >
                  <Grid className="addSpeclContnt">
                   <Grid className="addSpeclContntIner">
                    <Grid className="addSpeclLbl">
                      <Grid className="addSpeclClose">
                        <a onClick={this.handleCloseSpecl}>
                          <img
                            src={require("assets/virtual_images/closefancy.png")}
                            alt=""
                            title=""
                          />
                        </a>
                      </Grid>
                      <Grid>
                        {this.state.speciality._id ? <label>Edit <span className="spacemanageDel" onClick={() => { this.handleOpenWarn(this.state.speciality._id) }}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /> Delete Speciality</span></label> :
                          <label>{AddSpeciality}</label>}
                      </Grid>
                    </Grid>
                    <Grid className="enterSpclUpr">
                      <Grid className="enterSpclMain">
                        <Grid className="enterSpcl">
                          <Grid container direction="row">
                            <Grid item xs={10} md={11}>
                              {/* <Grid><label>Speciality</label></Grid> */}
                              {/* <TextField placeholder="Enter Speciality name" /> */}
                              <VHfield
                                label="Speciality"
                                name="specialty_name"
                                value={this.state.speciality.specialty_name}
                                placeholder="Enter Speciality name"
                                onChange={(e) => this.updateEntryState(e)}
                              />
                            </Grid>
                            <Grid item xs={2} md={1}>
                              <Grid className="colorBtnUpr">
                                <Grid>
                                  <ColorSelection
                                    label="Color"
                                    updateEntryState1={(name, value) =>
                                      this.updateEntryState1(name, value)
                                    }
                                    background_color={this.state.speciality.background_color}
                                    color={this.state.speciality.color}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="addWardsRoom">
                              {!this.state.openWard && (
                                <>
                                  {this.state.speciality?.wards?.length > 0 &&
                                    this.state.speciality?.wards?.map(
                                      (data, index) => (
                                        <RoomView
                                          label={data.ward_name}
                                          room_number={
                                            data.rooms?.length > 0
                                              ? data.rooms?.length
                                              : 0
                                          }
                                          no_of_bed={this.bednumbers(
                                            data.rooms
                                          )}
                                          index={index}
                                          removeWard={() =>
                                            this.removeWard(index)
                                          }
                                          onEdit={() => {
                                            this.editWard(data);
                                          }}
                                        />
                                      )
                                    )}
                                </>
                              )}
                              <Grid className="">
                                {!this.state.openWard ? (
                                  <Grid
                                    className={
                                      this.state.speciality?.wards?.length > 0
                                        ? "addNwWard"
                                        : " plusWards"
                                    }
                                  >
                                    <p onClick={this.handleOpenWard}>
                                      + Add a Ward
                                    </p>
                                  </Grid>
                                ) : (
                                  <Grid className="">
                                    <Grid className="addWardsUpr">
                                      <Grid className="addWardsIner">
                                        <Grid item xs={12} md={12}>
                                          <VHfield
                                            label="Ward"
                                            value={this.state.ward?.ward_name}
                                            name="ward_name"
                                            placeholder="Enter Ward"
                                            onChange={(e) =>
                                              this.updateEntryState2(e)
                                            }
                                          />

                                          <AddRoom
                                            label="room"
                                            name="roomname"
                                            roomArray={this.state.ward?.rooms}
                                            onChange={(e) =>
                                              this.updateEntryState3(e)
                                            }
                                          />
                                        </Grid>
                                        <Grid className="wrdsBtn">
                                          <Button
                                            onClick={(e) => {
                                              this.setState({
                                                isEditWrd: false,
                                                openWard: false,
                                                ward: {},
                                              });
                                            }}
                                          >
                                            Cancel
                                          </Button>
                                          {this.state.isEditWrd ? (
                                            <Button
                                              className="wrdsBtnActv"
                                              onClick={() => {
                                                this.handleOpenRoom();
                                              }}
                                            >
                                              Update Ward
                                            </Button>
                                          ) : (
                                            <Button
                                              className="wrdsBtnActv"
                                              onClick={() => {
                                                this.handleOpenRoom();
                                              }}
                                            >
                                              Save Ward
                                            </Button>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid className="spclSaveBtn saveNclose">
                            <Button onClick={this.SaveSpeciality}>
                              Save & Close
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                 </Grid>  
                </Modal>

                {/* End of Model setup */}
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
