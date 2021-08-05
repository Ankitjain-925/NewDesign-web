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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import csss
import * as translationEN from "./translations/en_json_proofread_13072020.json";
import * as translationDE from "./translations/de.json";
import H_LeftMenu from "Screens/Components/Menus/H_leftMenu/index";
import H_LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile";
import "./style.css";
import Modal from "@material-ui/core/Modal";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import {
  commonHeader,
  commonCometDelHeader,
} from "component/CommonHeader/index";
import Pagination from "Screens/Components/Pagination/index";
import Loader from "Screens/Components/Loader/index";
import AddHouses from "Screens/Components/VirtualHospitalComponents/AddRoom/AddHouses.js";

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
      institute_groups: {}
    };
  }
  //open the institute group
  openInstitute = () => {
    this.setState({ openGroup: true });
  };
  //close the institute group
  closeInstitute = () => {
    this.setState({ openGroup: false });
  };
  EditInstitute = (editData) => {
    this.setState({ openGroup: true, institute_groups: editData });
  };
  //add houses
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

  deleteGroup=(id)=>{
    var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length>0 ?  this.props.stateLoginValueAim?.user?.institute_id[0]:''
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
  componentDidMount() {
    this.getallGroups();
  }

  getallGroups = () => {
    var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length>0 ?  this.props.stateLoginValueAim?.user?.institute_id[0]:''
    this.setState({ loaderImage: true });
    axios
      .get(
        sitedata.data.path +
          `/hospitaladmin/institute/${institute_id}`,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          this.setState({ GroupList: responce.data?.data?.institute_groups });
        }
        this.setState({ loaderImage: false });
      });
  };

  SaveGroup = () => {
    var data = this.state.institute_groups;
    var institute_id = this.props.stateLoginValueAim?.user?.institute_id?.length>0 ?  this.props.stateLoginValueAim?.user?.institute_id[0]:''
    this.setState({ loaderImage: true });
    if(data._id){
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
          this.setState({institute_groups: {},})
        }
        this.setState({ loaderImage: false, openGroup: false});
      });
    }
    else{
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
          this.setState({institute_groups: {},})
        }
        this.setState({ loaderImage: false, openGroup: false});
      });
    }
  };

  getHouses = (house) => {
    var houses = [];
    houses =
      house?.length > 0 &&
      house.map((data) => {
        return data.house_name;
      });
    return houses.join(", ");
  };

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
    let {} = translate;

    return (
      <Grid className="homeBg">
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Mobile menu */}
                <H_LeftMenuMobile isNotShow={true} currentPage="staff_List" />
                {/* End of mobile menu */}

                {/* Website Menu */}
                <H_LeftMenu isNotShow={true} currentPage="staff_List" />
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
                    <Grid item xs={12} md={6} className="archvOpinRght">
                      <a
                        onClick={() => {
                          this.openInstitute();
                        }}
                      >
                        + Add Institute Group
                      </a>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid className="presOpinionIner">
                      {this.state.loaderImage && <Loader />}
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Group Institute</Th>
                            <Th>Houses</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {this.state.GroupList &&
                            this.state.GroupList.length > 0 &&
                            this.state.GroupList.map((data, index) => (
                              <Tr>
                                <Td>
                                  {data.group_name
                                    ? data.group_name
                                    : "Not mentioned"}
                                </Td>
                                <Td>
                                  {data?.houses?.length > 0
                                    ? this.getHouses(data?.houses)
                                    : ""}
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
                                             this.EditInstitute(data);
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
                                          onClick={() => {
                                            this.deleteGroup(data._id);
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
                    <Modal
                      open={this.state.openGroup}
                      onClose={this.closeInstitute}
                      className="addSpeclModel"
                    >
                      <Grid className="addSpeclContnt">
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
                            <label>Add Institute Group</label>
                          </Grid>
                        </Grid>
                        <Grid className="enterSpclUpr">
                          <Grid className="enterSpclMain">
                            <Grid className="enterSpcl">
                              <Grid container direction="row">
                                <Grid item xs={10} md={12}>
                                  <VHfield
                                    label="Institute Name"
                                    name="group_name"
                                    value={this.state?.institute_groups?.group_name || ''}
                                    placeholder="Enter institute group name"
                                    onChange={(e) => this.updateEntryState(e)}
                                  />
                                </Grid>
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Grid><label>Houses</label></Grid>
                                    </Grid>
                                </Grid>
                                <AddHouses
                                  roomArray={this.state?.institute_groups?.houses}
                                  label="Enter Houses"
                                  name="house_name"
                                  comesFrom="admin"
                                  onChange={(e) => this.updateEntryState3(e)}
                                />
                              </Grid>
                              <Grid className="spclSaveBtn saveNclose">
                                <Button onClick={this.SaveGroup}>Save</Button>
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
