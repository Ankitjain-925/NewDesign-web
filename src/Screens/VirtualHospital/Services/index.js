import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import sitedata from "sitedata";
import { confirmAlert } from "react-confirm-alert";
import Pagination from "Screens/Components/Pagination/index";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "../Institutes/selecthouseaction";
import Loader from "Screens/Components/Loader/index";
import Select from "react-select";
import { getLanguage } from "translations/index"

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openServ: false,
      title: "",
      description: "",
      price: "",
      house_id: "",
      speciality_id: false,
      services_data: [],
      AllServices: [],
      updateTrack: {},
      AllSpeciality: [],
    };
  }

  componentDidMount() {
    this.getSpecialty();
    this.getAllServices();
  }

  getSpecialty = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/AddSpecialty/" + this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          var newArray = responce.data?.data?.length > 0 && responce.data.data.map((item) => {
            return ({ label: item.specialty_name, value: item._id })
          })
          this.setState({ AllSpeciality: newArray });
        }
        this.setState({ loaderImage: false });
      });
  };
  //Modal Open
  handleOpenServ = () => {
    this.setState({ openServ: true, updateTrack: {} });
  };

  //Modal Close
  handleCloseServ = () => {
    this.setState({ openServ: false });
  };
  updateEntryState1 = (e) => {
    const state = this.state.updateTrack;
    state[e.target.name] = e.target.value;
    this.setState({ updateTrack: state });
  };

  //For adding the New Service and Update Service
  handleSubmit = () => {
    var data = this.state.updateTrack;
    if (this.state.updateTrack._id) {
      axios
        .put(
          sitedata.data.path + "/vh/AddService/" + this.state.updateTrack._id,
          data,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          this.setState({
            updateTrack: {},
          });
          this.getAllServices();
        });
    } else {
      data.house_id = this.props?.House?.value;
      axios
        .post(sitedata.data.path + "/vh/AddService", data, commonHeader(this.props.stateLoginValueAim.token))
        .then((responce) => {
          this.getAllServices();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  // Open Edit Model
  editService = (data) => {
    this.setState({ updateTrack: data, openServ: true });
  };

  // For getting the Service and implement Pagination
  getAllServices = () => {
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path + "/vh/GetService/" + this.props?.House?.value,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((response) => {
        var totalPage = Math.ceil(response.data.data.length / 10);
        this.setState(
          {
            AllServices: response.data.data,
            loaderImage: false,
            totalPage: totalPage,
            currentPage: 1,
          },
          () => {
            this.setState({ loaderImage: false });
            if (totalPage > 1) {
              var pages = [];
              for (var i = 1; i <= this.state.totalPage; i++) {
                pages.push(i);
              }
              this.setState({
                services_data: this.state.AllServices.slice(0, 10),
                pages: pages,
              });
            } else {
              this.setState({ services_data: this.state.AllServices });
            }
          }
        );
      });
  };

  //Delete the perticular service confirmation box
  removeServices = (id) => {
    this.setState({ message: null, openTask: false });
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

            <h1>Remove the Service ?</h1>

            <p>Are you sure to remove this Service?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  this.deleteClickService(id);
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };
  deleteClickService(id) {
    axios
      .delete(sitedata.data.path + "/vh/AddService/" + id, commonHeader(this.props.stateLoginValueAim.token))
      .then((response) => {
        this.getAllServices();
      })
      .catch((error) => { });
  }

  onChangePage = (pageNumber) => {
    this.setState({
      services_data: this.state.AllServices.slice(
        (pageNumber - 1) * 10,
        pageNumber * 10
      ),
      currentPage: pageNumber,
    });
  };

  //On Changing the specialty id 
  onFieldChange = (e) => {
    const state = this.state.updateTrack;
    state['specialty_id'] = e?.length>0 && e.map((data)=>{return data.value});
    this.setState({ updateTrack: state});
    // console.log('updateTrack',this.state.updateTrack)
  }

  selectedID = (id) => {
    // console.log('ttttt', id)
    var data = this.state.AllSpeciality.length > 0 && this.state.AllSpeciality.filter((item) => id?.includes(item.value))
    if (data && data.length > 0) {
      return data;
    }
    return [];
  }

  getSpecialtyData = (id) => {
    if (id) {
      this.setState({ speciality_id: id })
      if (id === 'general') {
        var filterData = this.state.AllServices?.length > 0 && this.state.AllServices.filter((data) => data.speciality_id === undefined || data.speciality_id === null)
      }
      else {
        var filterData = this.state.AllServices?.length > 0 && this.state.AllServices.filter((data) => data.speciality_id === id)
      }
    }
    else {
      this.setState({ speciality_id: false })
      var filterData = this.state.AllServices;
    }
    var totalPage = Math.ceil(filterData.length / 10);
    if (totalPage > 1) {
      var pages = [];
      for (var i = 1; i <= this.state.totalPage; i++) {
        pages.push(i);
      }
      this.setState({
        services_data: filterData.slice(0, 10),
        pages: pages,
      });
    } else {
      this.setState({ services_data: filterData });
    }
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Addnewservice, Services, Specialty } = translate;
    const { services_data } = this.state;
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
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              {/* Mobile menu */}
              <LeftMenuMobile isNotShow={true} currentPage="more" />
              <Grid container direction="row">
                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="more" />
                </Grid>
                {/* End of Menu */}

                {/* Start of Right Section */}
                <Grid item xs={12} md={10}>
                  <Grid className="topLeftSpc">
                    <Grid container direction="row">
                      <Grid item xs={6} md={6}>
                        {/* Back common button */}
                        {/* <Grid className="extSetting">
                                <a><img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" />
                                    Back to Billing</a>
                            </Grid> */}
                        {/* End of Back common button */}
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Grid className="newServc">
                          <Button onClick={this.handleOpenServ}>
                            + New Service
                          </Button>
                          <Modal
                            open={this.state.openServ}
                            onClose={this.handleCloseServ}
                            className={
                              this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "darkTheme addSpeclModel"
                                : "addSpeclModel"
                            }
                          >
                            <Grid className="addServContnt">
                              <Grid className="addSpeclLbl">
                                <Grid className="addSpeclClose">
                                  <a onClick={this.handleCloseServ}>
                                    <img
                                      src={require("assets/virtual_images/closefancy.png")}
                                      alt=""
                                      title=""
                                    />
                                  </a>
                                </Grid>
                                <Grid>
                                  <label>{Addnewservice}</label>
                                </Grid>
                              </Grid>

                              <Grid className="enterServMain">
                                <Grid className="enterSpcl">
                                  <Grid>
                                    <VHfield
                                      label="Service name"
                                      name="title"
                                      placeholder="Enter Service name"
                                      onChange={(e) =>
                                        this.updateEntryState1(e)
                                      }
                                      value={this.state.updateTrack.title}
                                    />
                                  </Grid>

                                  <Grid>
                                    <VHfield
                                      label="Service short description"
                                      name="description"
                                      placeholder="Enter service short description"
                                      onChange={(e) =>
                                        this.updateEntryState1(e)
                                      }
                                      value={
                                        this.state.updateTrack.description
                                      }
                                    />
                                  </Grid>

                                  <label className="specbutton1">Specialty</label>
                                  <Grid className="sevicessection">
                                    <Select
                                      onChange={(e) => this.onFieldChange(e)}
                                      options={this.state.AllSpeciality}
                                      name="specialty_name"
                                      isSearchable={true}
                                      className="mr_sel"
                                      isMulti={true}
                                     value={this.selectedID(this.state.updateTrack.specialty_id)}
                                    />
                                  </Grid>

                                  <Grid>
                                    <VHfield
                                      label="Price"
                                      name="price"
                                      placeholder="Enter service price"
                                      onChange={(e) =>
                                        this.updateEntryState1(e)
                                      }
                                      value={this.state.updateTrack.price}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid className="servSaveBtn">
                                <a onClick={this.handleCloseServ}>
                                  <Button
                                    onClick={() => this.handleSubmit()}>Save & Close</Button>
                                </a>
                              </Grid>
                            </Grid>
                          </Modal>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={9}>
                          <Grid className="roomBreadCrumb medcalCntr">
                            <ul>
                              <li>
                                <a>
                                  <label>{Services}</label>
                                </a>
                              </li>
                              {/* <li>
                                <a>
                                  <label>Speciality Services</label>
                                </a>
                              </li> */}
                            </ul>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Grid className="settingInfo">
                            <a>
                              <img
                                src={require("assets/virtual_images/search-entries.svg")}
                                alt=""
                                title=""
                              />
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Bread Crumb */}
                    <Grid className="cardioGrup">
                      <Grid className="cardioGrupBtn">
                        <Button onClick={() => { this.getSpecialtyData(false) }} className={!this.state.speciality_id ? "cardioActv" : ""} variant="contained">{"All"}</Button>
                        <Button onClick={() => { this.getSpecialtyData('general') }} className={this.state.speciality_id === 'general' ? "cardioActv" : ""} variant="contained">{"General"}</Button>
                        {this.state.AllSpeciality?.length > 0 && this.state.AllSpeciality.map((item) => (
                          <Button onClick={() => { this.getSpecialtyData(item.value) }} className={this.state.speciality_id === item.value ? "cardioActv" : ""} variant="contained">{item.label}</Button>
                        ))}

                      </Grid>
                    </Grid>

                    {/* service price content */}
                    <Grid className="srvcTable3">
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Service</Th>
                            <Th>Price</Th>
                            <Th></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {services_data?.length > 0 &&
                            services_data.map((data) => (
                              <>
                                <Tr>
                                  <Td>
                                    <label>{data.title}</label>
                                    <p>{data.description}</p>
                                  </Td>
                                  <Td>{data.price}</Td>
                                  {/* <Td className="srvcDots"> */}
                                  <Td>
                                    <Grid
                                      item
                                      xs={6}
                                      md={6}
                                      className="spcMgntRght7 presEditDot scndOptionIner"
                                    >
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
                                                this.editService(data);
                                              }}
                                            >
                                              <img
                                                src={require("assets/images/details.svg")}
                                                alt=""
                                                title=""
                                              />
                                              Edit Service
                                            </a>
                                          </li>

                                          <li
                                            onClick={() => {
                                              this.removeServices(data._id);
                                            }}
                                          >
                                            <a>
                                              <img
                                                src={require("assets/images/cancel-request.svg")}
                                                alt=""
                                                title=""
                                              />
                                              Delete Service
                                            </a>
                                          </li>
                                        </ul>
                                      </a>
                                    </Grid>
                                  </Td>
                                </Tr>
                              </>
                            ))}
                        </Tbody>
                      </Table>

                      <Grid className="tablePagNum">
                        <Grid container direction="row">
                          <Grid item xs={12} md={6}>
                            <Grid className="totalOutOff">
                              <a>
                                {this.state.currentPage} of{" "}
                                {this.state.totalPage}
                              </a>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {this.state.totalPage > 1 && (
                              <Grid className="prevNxtpag">
                                <Pagination
                                  totalPage={this.state.totalPage}
                                  currentPage={this.state.currentPage}
                                  pages={this.state.pages}
                                  onChangePage={(page) => {
                                    this.onChangePage(page);
                                  }}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* end of service price content */}
                  </Grid>
                </Grid>
                {/* End of Right Section */}
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    House,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
    authy,
    houseSelect,
  })(Index)
);
