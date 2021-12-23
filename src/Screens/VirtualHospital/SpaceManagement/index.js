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
import Loader from "Screens/Components/Loader/index";
import { confirmAlert } from "react-confirm-alert";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { houseSelect } from "../Institutes/selecthouseaction";
import { Speciality } from "Screens/Login/speciality.js";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AvailablebedListing from "Screens/Components/VirtualHospitalComponents/AvailablebedListing"
import { getLanguage } from "translations/index"
import {
  manageBeds, updateEntryState3, removeWard, handleCloseWarn, handleOpenWarn, updateEntryState2, updateEntryState1,
  updateEntryState, editWard, handleCloseWard, handleOpenWard, onEditspec, MoveInstitute, searchFilter, handleOpenRoom,
  selectedID, bednumbers, deleteClick, getSpeciality, SaveSpeciality,
} from "./api";

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
      specialityData2: [],
      isEditWrd: false,
      deleteId: false,
      SearchValue: '',
      errorMsg2: '',
      errorMsg: '',
      errorStatus: false
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

  componentDidMount() {
    getSpeciality(this);
  }

  removeSpeciality = () => {
    handleCloseWarn(this);
    let translate = getLanguage(this.props.stateLanguageType);
    let { deleteSpeciality, really_want_to_delete_speciality, No, Yes } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode &&
                this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >

            <h1 class="alert-btn">{deleteSpeciality}</h1>

            <p>{really_want_to_delete_speciality}</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>{No}</button>
              <button
                onClick={() => {
                  deleteClick(this);
                  onClose();
                }}
              >
                {Yes}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Specialities, Iunderstandthat, AddSpeciality,
      BacktoChangeHospital, addNewSpeciality,SpaceManagement, Institution, select_all_conditions_to_delete_speciality, PleaseConfirmThatYouUnderstandTheConsequencesOfYourAction,
      yesDeleteSpeciality, cancelKeepSpeciality, Room, edit, DeleteSpeciality, AddWard, cancel, UpdateWard, SaveWard, save_and_close} = translate;
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
                    <Grid className="extSetting">
                      <a onClick={() => MoveInstitute(this)}>
                        <img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                        {BacktoChangeHospital}</a>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={6} sm={6} md={6}>
                        <Grid className="spcMgntH1"><h1>{SpaceManagement}</h1></Grid>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} className="addFlowRght">
                        <a onClick={this.handleOpenSpecl}>
                          {addNewSpeciality}
                        </a>
                      </Grid>
                    </Grid>
                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={9}>
                          <Grid className="roomBreadCrumb3">
                            <ul>
                              <li>
                                <a>
                                  <span>{Institution}</span>
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
                            {this.state.showinput && <input name="Search" placeholder="Search" value={this.state.SearchValue} className="serchInput" onChange={(e) => searchFilter(e, this)} />}
                            <a>
                              {!this.state.showinput ? <img
                                src={require("assets/virtual_images/search-entries.svg")}
                                alt=""
                                title=""
                                onClick={() => { this.setState({ showinput: !this.state.showinput }) }}
                              /> :
                                <img
                                  src={require("assets/images/close-search.svg")}
                                  alt=""
                                  title=""
                                  onClick={() => { this.setState({ showinput: !this.state.showinput, SearchValue: '', specialityData: this.state.specialityData2, }) }}
                                />}
                            </a>
                            {/* <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Modal
                      open={this.state.openWarn}
                      onClose={() => handleCloseWarn(this)}
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
                              <a onClick={() => handleCloseWarn(this)}>
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
                                {select_all_conditions_to_delete_speciality}
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
                                  {PleaseConfirmThatYouUnderstandTheConsequencesOfYourAction}
                                </p>
                              </Grid>
                              <Grid className="selectWarn">
                                <Button className="selWarnBtn" onClick={() => { this.removeSpeciality() }}>
                                  {yesDeleteSpeciality}
                                </Button>
                                <Button onClick={this.handleCloseWarn}>{cancelKeepSpeciality}</Button>
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
                                  deleteClick={() => handleOpenWarn(data._id, this)}
                                  label={data.specialty_name}
                                  backgroundColor={data.background_color}
                                  color={data.color}
                                  onClick={() => {
                                    onEditspec(data, this);
                                  }}
                                />
                                {data.wards?.length > 0 &&
                                  data.wards.map((item) => (
                                    <Grid className="roomsNum3">
                                      <ul>
                                        <li
                                          className="c-pointer"
                                          onClick={() => {
                                            manageBeds(
                                              this.state.specialityData,
                                              data,
                                              item.ward_name, this
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
                                          {Room}
                                        </li>
                                        <li>
                                          <img
                                            src={require("assets/virtual_images/bedNumber.png")}
                                            alt=""
                                            title=""
                                          />
                                          {bednumbers(item.rooms)} beds

                                          <AvailablebedListing
                                            speciality_id={data._id}
                                            ward_id={item._id}
                                          />
                                        </li>
                                      </ul>
                                    </Grid>
                                  ))}
                              </Grid>
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* End of Right Section */}

              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
                  {this.state.speciality._id ? <label>{edit} <span className="spacemanageDel" onClick={() => { this.handleOpenWarn(this.state.speciality._id) }}><img src={require('assets/virtual_images/bin.svg')} alt="" title="" /> {DeleteSpeciality}</span></label> :
                    <label>{AddSpeciality}</label>}
                </Grid>
              </Grid>
              <Grid className="enterSpclUpr">
                <Grid className="enterSpclMain">
                  <p className='err_message'>{this.state.errorMsg}</p>
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
                          onChange={(e) => updateEntryState(e, this)}
                        />
                      </Grid>
                      <Grid item xs={2} md={1}>
                        <Grid className="colorBtnUpr">
                          <Grid>
                            <ColorSelection
                              label="Color"
                              updateEntryState1={(name, value) =>
                                updateEntryState1(name, value, this)
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
                                    no_of_bed={bednumbers(
                                      data.rooms
                                    )}
                                    index={index}
                                    removeWard={() =>
                                      removeWard(index, this)
                                    }
                                    onEdit={() => {
                                      editWard(data, this);
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
                              <p onClick={()=>handleOpenWard(this)}>
                                {AddWard}
                              </p>
                            </Grid>
                          ) : (
                            <Grid className="">
                              <Grid className="addWardsUpr">
                                <Grid className="addWardsIner">
                                  <p className='err_message'>{this.state.errorMsg2}</p>
                                  <Grid item xs={12} md={12}>
                                    <VHfield
                                      label="Ward"
                                      value={this.state.ward?.ward_name}
                                      name="ward_name"
                                      placeholder="Enter Ward"
                                      onChange={(e) =>
                                        updateEntryState2(e, this)
                                      }
                                    />

                                    <AddRoom
                                      label="room"
                                      name="roomname"
                                      roomArray={this.state.ward?.rooms}
                                      onChange={(e) =>
                                        updateEntryState3(e, this)
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
                                      {cancel}
                                    </Button>
                                    {this.state.isEditWrd ? (
                                      <Button
                                        className="wrdsBtnActv"
                                        onClick={() => {
                                          handleOpenRoom(this)
                                        }}
                                      >
                                        {UpdateWard}
                                      </Button>
                                    ) : (
                                      <Button
                                        className="wrdsBtnActv"
                                        onClick={() => {
                                          handleOpenRoom(this)
                                        }}
                                      >
                                        {SaveWard}
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
                        {save_and_close}
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
    speciality
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
