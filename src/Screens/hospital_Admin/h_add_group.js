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
import Button from "@material-ui/core/Button";
import * as translationEN from "./translations/en_json_proofread_13072020.json";
import * as translationDE from "./translations/de.json";
import H_LeftMenu from "Screens/Components/Menus/H_leftMenu/index";
import H_LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import { commonHeader } from "component/CommonHeader/index";
import Loader from "Screens/Components/Loader/index";
import FileUploader from "Screens/Components/FileUploader/index";
import { blobToFile, resizeFile } from "Screens/Components/BasicMethod/index";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getLanguage } from "translations/index"
import { confirmAlert } from "react-confirm-alert"; // Import
import { S3Image } from "Screens/Components/GetS3Images/index";

const specialistOptions = [
  { value: "Specialist1", label: "Specialist1" },
  { value: "Specialist2", label: "Specialist2" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGroup: false,
      houses: [],
      institute_groups: {},
      AllGroupList: [],
      openHospitalModal: false,
      hospitalData: {},
      group_logo: "",
      house_logo: "",
      instituteId: '',
      showHouses: false,
      editId: '',
      image: [],
      errorMsg: '',
      errorHospMsg: ''
    };
  }

  //open the institute group
  openInstitute = () => {
    this.setState({ openGroup: true, institute_groups: {} });
  };
  //close the institute group
  closeInstitute = () => {
    this.setState({ openGroup: false });
  };

  //open the hospital modal
  openHospitalModal = () => {
    this.setState({ openHospitalModal: true, hospitalData: {} });
  };
  //close the hospital modal
  closeHospitalModal = () => {
    this.setState({ openHospitalModal: false, editId: '' });
  };

  EditInstitute = (instituteId) => {
    let result = this.state.AllGroupList && this.state.AllGroupList.length > 0 && this.state.AllGroupList.find(item => item._id === instituteId);
    this.setState({ openGroup: true, institute_groups: result, houses: result?.houses, image: [{ filename: result.group_logo, filetype: "png" }] });
  };

  editHospital = (editData) => {
    this.setState({ openHospitalModal: true, hospitalData: editData, editId: editData.house_id });
  };

  //add hospitals
  updateEntryState3 = (house) => {
    var state = this.state.institute_groups;
    state["houses"] = house;
    this.setState({ institute_groups: state });
  };

  updateEntryState = (e) => {
    var state = this.state.institute_groups;
    state[e.target.name] = e.target.value;
    this.setState({ institute_groups: state });
  };

  updateHospitalState = (e) => {
    var state = this.state.hospitalData;
    state[e.target.name] = e.target.value;
    this.setState({ hospitalData: state });
  };


  //Delete the Groups
  deleteGroup = (e, id) => {
    e.stopPropagation();
    var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length > 0 ? this.props.stateLoginValueAim?.user?.institute_id[0] : ''
    if (institute_id) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <Grid className={this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode === "dark"
              ? "dark-confirm deleteStep"
              : "deleteStep"}>
              <Grid className="deleteStepLbl">
                <Grid><a onClick={() => { onClose(); }}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                <label>Delete Group</label>
              </Grid>
              <Grid className="deleteStepInfo">
                <p>All hospitals in this Step will be removed from the group. This action can not be reversed.</p>
                <Grid><label>Are you sure you want to do this?</label></Grid>
                <Grid>
                  <Button onClick={() => { this.removeGroup(id) }}>Yes, Delete Step</Button>
                  <Button onClick={() => { onClose(); }}>Cancel, Keep Step</Button>
                </Grid>
              </Grid>
            </Grid>
          );
        },
      });
    }
    else {
      this.DeleteGroupOk(id)
    }

  };

  removeGroup = (id) => {
    // var state = this.state.actualData;
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
            <h1 class="alert-btn">Remove Group?</h1>
            <p>Are you really want to remove this Group?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  this.DeleteGroupOk(id);
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

  DeleteGroupOk = (id) => {
    var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length > 0 ? this.props.stateLoginValueAim?.user?.institute_id[0] : ''
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path +
        `/hospitaladmin/AddGroup/${institute_id}/${id}`,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          this.getallGroups();
        }
        this.setState({ loaderImage: false });
      });
  }

  deleteHospital = (index) => {
    this.setState({ openGroup: false });
    var data = this.state.institute_groups;
    if (data?.houses?.length > 0) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <Grid className={this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode === "dark"
              ? "dark-confirm deleteStep"
              : "deleteStep"}>
              <Grid className="deleteStepLbl">
                <Grid><a onClick={() => { onClose(); }}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                <label>Delete Hospital</label>
              </Grid>
              <Grid className="deleteStepInfo">
                <p>This hospital will be removed. This action can not be reversed.</p>
                <Grid><label>Are you sure you want to do this?</label></Grid>
                <Grid>
                  <Button onClick={() => { this.removeInstitute(index, data) }}>Yes, Delete</Button>
                  <Button onClick={() => { onClose(); }}>Cancel</Button>
                </Grid>
              </Grid>
            </Grid>
          );
        },
      });
    }
  };

  removeInstitute = (index, data) => {
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
            <h1 class="alert-btn">Remove hospital?</h1>
            <p>Are you really want to remove this?</p>
            <div className="react-confirm-alert-button-group">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  this.DeleteInstitute(index, data);
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

  DeleteInstitute = (index, data) => {
    if (data && data?.houses && data?.houses?.length > 0) {
      var house = data?.houses
      house.splice(index, 1);
      var datas = this.state.institute_groups;
      data['houses'] = house;
      this.setState({ institute_groups: datas, openGroup: true });
    }
  }

  componentDidMount() {
    this.getallGroups();
  }

  getallGroups = () => {
    var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length > 0 ? this.props.stateLoginValueAim?.user?.institute_id[0] : ''
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path +
        `/hospitaladmin/institute/${institute_id}`,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        var totalPage = Math.ceil(
          responce.data?.data?.institute_groups?.length / 10
        );
        if (responce.data.hassuccessed && responce.data.data) {
          if (responce.data?.data?.institute_groups) {
            var elements = responce.data?.data?.institute_groups
            elements.sort((a, b) => {
              let fa = a.group_name.toLowerCase(),
                fb = b.group_name.toLowerCase();
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
          }
          this.setState({
            totalPage: totalPage,
            currentPage: 1, AllGroupList: responce.data?.data?.institute_groups, instituteId: responce.data?.data?._id
          },
            () => {
              if (totalPage > 1) {
                var pages = [];
                for (var i = 1; i <= this.state.totalPage; i++) {
                  pages.push(i);
                }
                this.setState({
                  GroupList: this.state.AllGroupList.slice(0, 10),
                  pages: pages,
                });
              } else {
                this.setState({ GroupList: this.state.AllGroupList });

              }
            })
          this.setState({ loaderImage: false });
        }
      });
  }

  SaveGroup = () => {
    this.setState({ errorMsg: "" })

    var data = this.state.institute_groups;

    if (!data.group_name || (data && data.group_name && data.group_name.length < 1)) {
      this.setState({ errorMsg: "Institution Name can't be empty" })
    }
    else if (!data.group_description || (data && data.group_description && data.group_description.length < 1)) {
      this.setState({ errorMsg: "Institution Description Note can't be empty" })
    }
    else if (!data.houses || (data && data.houses && data.houses.length < 1)) {
      this.setState({ errorMsg: "Select atleast one hospital" })
    }
    else {
      var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length > 0 ? this.props.stateLoginValueAim?.user?.institute_id[0] : ''
      this.setState({ loaderImage: true });
      if (data._id) {
        axios
          .put(
            sitedata.data.path +
            `/hospitaladmin/AddGroup/${institute_id}/${data._id}`,
            data,
            commonHeader(this.props.stateLoginValueAim.token)
          )
          .then((responce) => {
            if (responce.data.hassuccessed) {
              this.getallGroups();
              this.setState({ institute_groups: {}, })
            }
            else {
              this.setState({ errorMsg: "Somthing went wrong, Please try again" })
            }
            this.setState({ loaderImage: false, openGroup: false });
          });
      }
      else {
        axios
          .put(
            sitedata.data.path +
            `/hospitaladmin/AddGroup/${institute_id}`,
            data,
            commonHeader(this.props.stateLoginValueAim.token)
          )
          .then((responce) => {
            if (responce.data.hassuccessed) {
              this.getallGroups();
              this.setState({ institute_groups: {}, })
            }
            this.setState({ loaderImage: false, openGroup: false });
          });
      }
    }
  };

  getHousesNames = (house) => {
    var houses = [];
    houses =
      house?.length > 0 &&
      house.map((data) => {
        return data["house_name"];
      });
    return houses.join(", ");
  };

  getHouses = (house, caseValue) => {
    var houses = [];
    houses =
      house?.length > 0 &&
      house.map((data) => {
        return data[caseValue];
      });
    return '';
  };

  saveHospital = (e) => {
    this.setState({ errorHospMsg: "" })
    let date = new Date();
    let housesArray = this.state.houses;
    let hospitalObject = this.state.hospitalData;
    if (!hospitalObject.house_name || (hospitalObject && hospitalObject.house_name && hospitalObject.house_name.length < 1)) {
      this.setState({ errorHospMsg: "Hospital Name can't be empty" })
    }
    else if (!hospitalObject.house_description || (hospitalObject && hospitalObject.house_description && hospitalObject.house_description.length < 1)) {
      this.setState({ errorHospMsg: "Hospital Description Note can't be empty" })
    } else {
      if (this.state.editId) {
        let objIndex = housesArray.findIndex((item => item.house_id == this.state.editId));
        housesArray[objIndex].house_name = hospitalObject.house_name
        housesArray[objIndex].house_description = hospitalObject.house_description
        housesArray[objIndex].house_logo = hospitalObject.house_logo
      } else {
        hospitalObject["house_id"] = `${this.state.instituteId}-${date.getTime()}`
        housesArray.push(this.state.hospitalData);
      }
      var state = this.state.institute_groups;
      state["houses"] = housesArray;
      this.setState({ houses: housesArray, institute_groups: state, openHospitalModal: false, editId: '' });
    }
  }

  fileUpload = async (event, caseValue) => {
    if (event[0].type === "image/jpeg" || event[0].type === "image/png") {
      this.setState({ loaderImage: true });
      // let reader = new FileReader();
      let file = event[0];
      this.setState({
        loaderImage: true,
        imagePreviewUrl1: URL.createObjectURL(file),
      });
      let fileParts = event[0].name.split(".");
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      const compressedFile = await resizeFile(file);


      var data = blobToFile(compressedFile, file.name)
      axios
        .post(sitedata.data.path + "/aws/sign_s3", {
          fileName: data.name,
          fileType: fileType,
          folders: this.props.stateLoginValueAim.user.profile_id + "/",
          bucket: this.props.stateLoginValueAim.user.bucket,
        })
        .then((response) => {
          var returnData = response.data.data.returnData;
          var signedRequest = returnData.signedRequest;
          var url = returnData.url;
          if (fileType === "pdf") {
            fileType = "application/pdf";
          }
          // Put the fileType in the headers for the upload
          var options = {
            headers: {
              "Content-Type": fileType,
            },
          };
          axios
            .put(signedRequest, data, options)
            .then((result) => {
              this.setState(
                {
                  group_logo:
                    response.data.data.returnData.url +
                    "&bucket=" +
                    this.props.stateLoginValueAim.user.bucket,
                  loaderImage: false,
                }
              );

              let obj = {};
              if (caseValue === "group_logo") {
                obj = {
                  target: {
                    name: "group_logo",
                    value: response.data.data.returnData.url +
                      "&bucket=" +
                      this.props.stateLoginValueAim.user.bucket
                  }
                }
                this.updateEntryState(obj);
              } else if (caseValue === "house_logo") {
                obj =
                {
                  target: {
                    name: "house_logo",
                    value: response.data.data.returnData.url +
                      "&bucket=" +
                      this.props.stateLoginValueAim.user.bucket
                  }
                }
                this.updateHospitalState(obj);
              }
            })
            .catch((error) => { });
        })
        .catch((error) => { });
    } else {
      let translate = getLanguage(this.props.stateLanguageType)
      let { plz_upload_png_jpeg, ok } = translate;
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
              <h1>{plz_upload_png_jpeg}</h1>
              <div className="react-confirm-alert-button-group">
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  {ok}
                </button>
              </div>
            </div>
          );
        },
      });
    }
  };

  onClickInstituteGroup = (item) => {
    this.setState(prevState => ({
      showHouses: !prevState.showHouses
    }));
  }

  render() {
    if (this.props.stateLoginValueAim.user.type != "hospitaladmin") {
      this.props.history.push("/");
    }
    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      default:
        translate = translationEN.text;
    }
    let { } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
            ? "homeBg darkTheme"
            : "homeBg"
        }>
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Mobile menu */}
                <H_LeftMenuMobile isNotShow={true} currentPage="groups" />
                {/* End of mobile menu */}

                {/* Website Menu */}
                <H_LeftMenu isNotShow={true} currentPage="groups" />
                {/* End of Website Menu */}

                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    className="archvOpinLbl"
                  >
                    <Grid item xs={12} md={6}>
                      <label>Institute Groups</label>
                    </Grid>
                  </Grid>

                  <Grid className="wardsGrupUpr">
                    <Grid container direction="row">
                      {this.state.GroupList &&
                        this.state.GroupList?.length > 0 &&
                        this.state.GroupList.map((item) => (
                          <Grid
                            item
                            xs={12}
                            md={4}
                            onClick={() => this.EditInstitute(item._id)}
                          >
                            <Grid className="medcalFZCntnt">
                              <Grid className="presEditDot scndOptionIner">
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
                                          this.EditInstitute(item._id);
                                        }}
                                      >
                                        <img
                                          src={require("assets/images/details.svg")}
                                          alt=""
                                          title=""
                                        />
                                        Edit Group
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        onClick={(e) => {
                                          this.deleteGroup(e, item._id);
                                        }}
                                      >
                                        <img
                                          src={require("assets/images/edit.svg")}
                                          alt=""
                                          title=""
                                        />
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </a>
                              </Grid>
                              <Grid>
                                <a>
                                  <S3Image imgUrl={item?.group_logo} />
                                </a>
                              </Grid>
                              <Grid>
                                <label>{item.group_name}</label>
                              </Grid>
                              <p>{item.group_description}</p>

                              {this.state.showHouses &&
                                <Grid>
                                  <Table>
                                    <Thead>
                                      <Tr>
                                        <Th>Hospitals</Th>
                                      </Tr>
                                    </Thead>
                                    <Tbody>
                                      {item?.houses.length > 0 &&
                                        item?.houses.map((data, index) => (
                                          <Tr>
                                            <Td>
                                              {data.house_name}
                                            </Td>
                                          </Tr>
                                        ))}
                                    </Tbody>
                                  </Table>
                                </Grid>
                              }
                            </Grid>
                          </Grid>
                        ))}
                      <Grid
                        xs={12}
                        md={4}
                      >
                        <Grid className="medcalFZCntnt bg-color-card cursor-pointer" onClick={() => {
                          this.openInstitute();
                        }}>
                          <a>
                            + Add Institute Group
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid>
                    
                    <Modal
                      open={this.state.openGroup}
                      onClose={this.closeInstitute}
                      className={
                        this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark"
                          ? "addSpeclModel darkTheme"
                          : "addSpeclModel"
                      }
                    >
                      <Grid className="addSpeclContnt nwEntrCntntIner h-500">
                        <Grid className="addSpeclLbl">
                          <Grid className="addSpeclClose">
                            <a onClick={this.closeInstitute}>
                              <img
                                src={require("assets/virtual_images/closefancy.png")}
                                alt=""
                                title=""
                              />
                            </a>
                          </Grid>
                          <Grid>
                            <label>Add Institution</label>
                          </Grid>
                        </Grid>
                        <Grid className="enterSpclUpr">
                          <div className="err_message">{this.state.errorMsg}</div>
                          <Grid className="enterSpclMain">
                            <Grid className="enterSpcl">
                              <Grid container direction="row">
                                <Grid item xs={10} md={12} className="form-box">
                                  
                                  <VHfield
                                    label="Institution Name"
                                    name="group_name"
                                    value={this.state?.institute_groups?.group_name || ''}
                                    placeholder="Enter institute group name"
                                    onChange={(e) => this.updateEntryState(e)}
                                  />
                                </Grid>
                                <Grid item xs={10} md={12} className="form-box">
                                  <VHfield
                                    label="Institution Description Note"
                                    name="group_description"
                                    value={this.state?.institute_groups?.group_description || ''}
                                    placeholder="Enter institution description note"
                                    onChange={(e) => this.updateEntryState(e)}
                                  />
                                </Grid>
                                <Grid item xs={10} md={12} className="form-box">
                                  <Grid>
                                    <label>Upload Institution Logo</label>
                                  </Grid>
                                  <FileUploader
                                    name="group_logo"
                                    fileUpload={(file) => { this.fileUpload(file, 'group_logo') }}
                                    comesFrom="journal"
                                    isMulti={false}
                                  />
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2} className="add-group-padding">
                                  <Grid item xs={12} md={12}>
                                    <Grid><label>Hospitals</label></Grid>
                                    <Grid>
                                      <Table>
                                        <Thead>
                                          <Tr>
                                            <Th>Hospital Name</Th>
                                            <Th>Description Note</Th>
                                            <Th></Th>
                                          </Tr>
                                        </Thead>
                                        <Tbody>
                                          {this.state.institute_groups &&
                                            this.state.institute_groups.houses &&
                                            this.state.institute_groups.houses.length > 0 &&
                                            this.state.institute_groups.houses.map((data, index) => (
                                              <Tr>
                                                <Td>
                                                  {data?.house_name}
                                                </Td>
                                                <Td>
                                                  {data?.house_description}
                                                </Td>
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
                                                            this.editHospital(data);
                                                          }}
                                                        >
                                                          <img
                                                            src={require("assets/images/details.svg")}
                                                            alt=""
                                                            title=""
                                                          />
                                                          Edit Hospital
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          onClick={() => {
                                                            this.deleteHospital(data._id);
                                                          }}
                                                        >
                                                          <img
                                                            src={require("assets/images/edit.svg")}
                                                            alt=""
                                                            title=""
                                                          />
                                                          Delete
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </a>
                                                </Td>
                                              </Tr>
                                            ))}
                                        </Tbody>
                                      </Table>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid className="spclSaveBtn saveNclose">
                                  <Button onClick={this.openHospitalModal}>+ Enter Hospitals</Button>
                                </Grid>

                              </Grid>
                              <Grid className="spclSaveBtn saveNclose">
                                <Button onClick={this.SaveGroup}>Save</Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Modal>

                    <Modal
                      open={this.state.openHospitalModal}
                      onClose={this.closeHospitalModal}
                      className={
                        this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark"
                          ? "addSpeclModel darkTheme"
                          : "addSpeclModel"
                      }
                    >
                      <Grid className="nwEntrCntnt">
                        <Grid className="nwEntrCntntIner">
                          <Grid className="addSpeclLbl">
                            <Grid className="addSpeclClose">
                              <a onClick={this.closeHospitalModal}>
                                <img
                                  src={require("assets/virtual_images/closefancy.png")}
                                  alt=""
                                  title=""
                                />
                              </a>
                            </Grid>
                            <Grid>
                              <label>Add Hospital</label>
                            </Grid>
                          </Grid>
                          <Grid className="enterSpclUpr">
                            <div className="err_message">{this.state.errorHospMsg}</div>
                            <Grid className="enterSpclMain">
                              <Grid className="enterSpcl">
                                <Grid container direction="row">
                                  <Grid item xs={10} md={12} className="form-box">
                                    <VHfield
                                      label="Hospital Name"
                                      name="house_name"
                                      value={this.state?.hospitalData?.house_name || ''}
                                      placeholder="Enter hospital name"
                                      onChange={(e) => this.updateHospitalState(e)}
                                    />
                                  </Grid>
                                  <Grid item xs={10} md={12} className="form-box">
                                    <VHfield
                                      label="Hospital Description Note"
                                      name="house_description"
                                      value={this.state?.hospitalData?.house_description || ''}
                                      placeholder="Enter hospital description note"
                                      onChange={(e) => this.updateHospitalState(e)}
                                    />
                                  </Grid>
                                  <Grid item xs={10} md={12} className="form-box">
                                    <Grid>
                                      <label>Upload Hospital Logo</label>
                                    </Grid>
                                    <FileUploader
                                      name="house_logo"
                                      fileUpload={(file) => { this.fileUpload(file, 'house_logo') }}
                                      isMulti={false}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid className="spclSaveBtn saveNclose">
                                  <Button onClick={(e) => this.saveHospital(e)}>Save & Close</Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Modal>

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
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
