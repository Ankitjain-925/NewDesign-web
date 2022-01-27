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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  getDate,
  getImage,
  blockClick,
} from "Screens/Components/BasicMethod/index";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SelectField from "Screens/Components/Select/index";
import * as translationEN from "./translations/en_json_proofread_13072020.json";
import * as translationDE from "./translations/de.json";
import H_LeftMenu from "Screens/Components/Menus/H_leftMenu/index";
import H_LeftMenuMobile from "Screens/Components/Menus/H_leftMenu/mobile";
import { SearchUser } from "Screens/Components/Search";
import CreateAdminUser from "Screens/Components/CreateHospitalUser/index";
import ViewDetail from "Screens/Components/ViewInformation/index";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import AssignedHouse from "Screens/Components/VirtualHospitalComponents/AssignedHouse/index";
import "./style.css";
import {
  commonHeader,
  commonCometDelHeader,
} from "component/CommonHeader/index";
import Pagination from "Screens/Components/Pagination/index";
import Loader from "Screens/Components/Loader/index";
import { UserListManager } from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/CometChatUserList/controller";

const specialistOptions = [
  { value: "Specialist1", label: "Specialist1" },
  { value: "Specialist2", label: "Specialist2" },
];

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
      addCreate: false,
      current_user: {},
      openDetial: false,
      MypatientsData: [],
      Housesoptions: [],
      currentHouses: [],
      openHouse: false,
      house: {},
      UpDataDetails: {},
      pagenumber: []
    };
    // new Timer(this.logOutClick.bind(this))
    this.search_user = this.search_user.bind(this);
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
        if (responce.data.hassuccessed && responce.data.data) {
          var Housesoptions = [];
          if (responce.data?.data?.institute_groups && responce.data?.data?.institute_groups.length > 0) {
            responce.data.data.institute_groups.map((data) => {
              data?.houses && data.houses.length > 0 && data.houses.map((item) => {
                Housesoptions.push({
                  group_name: data.group_name,
                  label: item.house_name,
                  value: item.house_id
                })
                this.setState({ Housesoptions: Housesoptions });
              })
            })
          }
        }
        this.setState({ loaderImage: false });
      });
  };

  componentDidMount = () => {
    // this.getUserData();
    this.getAllkyc();
    this.getAdminstaff();
    this.getallGroups();
  };

  search_user = (event) => {
    if (event.target.value == "") {
      this.setState({ MypatientsData: this.state.forSearch });
      this.onChangePage(1);
    } else {
      let serach_value = SearchUser(event.target.value, this.state.forSearch);
      this.setState({ MypatientsData: serach_value });
    }
  };

  handleOpenCreate = () => {
    this.setState({ addCreate: true });
  };

  handleCloseCreate = () => {
    this.getAdminstaff();
    this.setState({ addCreate: false });
  };

  // onChangePage = (pagenumber) => {
  //   this.setState({
  //     MypatientsData: this.state.AllNurse.slice(
  //       (pagenumber - 1) * 20,
  //       pagenumber * 20
  //     ),
  //     currentPage: pagenumber,
  //   });
  //   this.getAdminstaff();
  // };

  getAllkyc() {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + "/User/getAllKyc", commonHeader(user_token))
      .then((response) => {
        this.setState({ getAllkyc: response.data.data });
      })
      .catch((error) => { });
  }

  onChangePage = (pageNumber) => {
    this.setState({ currentPage: pageNumber },
      () => {
        this.getAdminstaff();
      })
  }

  // getAdminstaff = (user_id, pagenumber) => {
  //   var user_token = this.props.stateLoginValueAim.token;
  //   // var pagenumber = 1
  //   axios
  //     .get(
  //       sitedata.data.path +
  //       "/admin/allHospitalusers/" +
  //       this.props.stateLoginValueAim.user.institute_id + '/adminstaff/' + pagenumber
  //       ,
  //       commonHeader(user_token)
  //     )
  //     .then((response) => {
  //       // this.setState({openHouse: false})
  //       console.log("Response AdminStaff", response);

  //       if (response.data.data) {
  //         var images = [];
  //         this.setState({ AllUsers: response.data.data });
  //         const AllNurse = this.state.AllUsers;
  //         // console.log("I m  here", AllNurse);
  //         this.setState({ AllNurse: AllNurse });
  //         var totalPage = Math.ceil(AllNurse.length / 20);
  //         // console.log("total pages", totalPage)
  //         this.setState({ totalPage: totalPage },
  //           () => {
  //             if (totalPage > 1) {
  //               var pages = [];
  //               for (var i = 1; i <= this.state.totalPage; i++) {
  //                 pages.push(i);
  //               }
  //               this.setState({
  //                 MypatientsData: AllNurse.slice(0, 20),
  //                 pages: pages,
  //               });
  //               console.log("MypatientsData", this.state.MypatientsData, "pages", pages)
  //             } else {
  //               this.setState({ MypatientsData: AllNurse });
  //             }
  //           });
  //         this.setState({ forSearch: AllNurse });
  //         AllNurse &&
  //           AllNurse.length > 0 &&
  //           AllNurse.map((item) => {
  //             var find = item && item.image && item.image;
  //             if (find) {
  //               var find1 = find.split(".com/")[1];
  //               axios
  //                 .get(sitedata.data.path + "/aws/sign_s3?find=" + find1)
  //                 .then((response2) => {
  //                   if (response2.data.hassuccessed) {
  //                     item.new_image = response2.data.data;
  //                     images.push({
  //                       image: find,
  //                       new_image: response2.data.data,
  //                     });
  //                     this.setState({ images: images });
  //                   }
  //                 });
  //             }
  //           });
  //       } else {
  //         this.setState({ AllNurse: [] });
  //       }
  //     })
  //     .catch((error) => { });
  // }

  getAdminstaff() {

    var user_token = this.props.stateLoginValueAim.token;

    axios
      .get(
        sitedata.data.path +
        "/admin/allHospitalusers/" +
        this.props.stateLoginValueAim.user.institute_id + '/adminstaff/1'
        ,
        commonHeader(user_token)
      )
      .then((res) => {
        var images = [];

        const AllNurse = res.data && res.data.data && res.data.data;
        AllNurse && AllNurse.length > 0 && AllNurse.map((item) => {
          var find = item && item.image && item.image
          if (find) {
            var find1 = find.split('.com/')[1]
            axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
              .then((response2) => {
                if (response2.data.hassuccessed) {
                  item.new_image = response2.data.data
                  images.push({ image: find, new_image: response2.data.data })
                  this.setState({ images: images })
                }
              })
          }
        })
        console.log('res.data.data', AllNurse.length)
        var totalPage = Math.round(AllNurse.length / 20);
        console.log("res.data.Total_count", res.data.Total_count)
        this.setState({
          totalPage: Math.ceil(res.data.Total_count / 20),
          MypatientsData: AllNurse, TotalCount: res.data.Total_count
        })

        // this.setState({ AllNurse: AllNurse, forSearch: AllNurse })
      })
  }

  submitDelete = (deletekey, profile_id, bucket) => {
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
    let { DeleteUser, Yes, No, click_on_YES_user } = translate;
    confirmAlert({
      title: DeleteUser,
      message: click_on_YES_user,
      buttons: [
        {
          label: Yes,
          onClick: () => this.deleteClick(deletekey, profile_id, bucket),
        },
        {
          label: No,
        },
      ],
    });
  };

  deleteClick = (deletekey, profile_id, bucket) => {
    this.setState({ loaderImage: true });
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .delete(
        sitedata.data.path +
        "/admin/deleteUser/" +
        deletekey +
        "?bucket=" +
        bucket,
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        var data = JSON.stringify({ permanent: true });

        var config = {
          method: "delete",
          url:
            "https://api-eu.cometchat.io/v2.0/users/" +
            profile_id.toLowerCase(),
          headers: commonCometDelHeader(),
          data: data,
        };

        axios(config)
          .then(function (response) { })
          .catch(function (error) { });
        this.getAdminstaff();
        //   this.MessageUser();
      })
      .catch((error) => { });
  };

  BlockUser = (patient_id, isblock) => {
    var data = blockClick(
      patient_id,
      isblock,
      this.props.stateLoginValueAim.token
    );
    this.getAdminstaff();
  };

  openDetail = (patient) => {
    this.setState({ openDetial: true, current_user: patient });
  };

  CloseDetail = () => {
    this.setState({ openDetial: false });
  };

  assignHouse = (patient) => {
    this.setState({ openHouse: true, current_user: patient })
  };

  closeHouse = () => {
    this.setState({ openHouse: false })
  };

  updateEntryState1 = (value, name) => {
    this.setState({ house: value });
  }

  SaveAssignHouse = () => {
    var userid = this.state.current_user._id;
    var housevalue = this.state.house;
    this.setState({ loaderImage: true });
    if (housevalue && housevalue?.length > 0) {
      axios
        .put(
          sitedata.data.path +
          `/hospitaladmin/assignedHouse/${userid}`,
          this.state.house,
          commonHeader(this.props.stateLoginValueAim.token)
        )
        .then((responce) => {
          if (responce.data.hassuccessed) {
            this.setState({ assignedhouse: true, blankerror: false, house: {} })
            setTimeout(() => {
              this.setState({ assignedhouse: false, openHouse: false, house: {} })
            }, 5000)
            this.getallGroups();
            this.getAdminstaff(this.state.current_user._id);
          }
          // else {
          //   this.setState({ alredyExist: true })
          //   setTimeout(() => {
          //     this.setState({ alredyExist: false })
          //   }, 3000)
          // }
          this.setState({ loaderImage: false });
        });
    }
    else {
      this.setState({ blankerror: true, assignedhouse: false })
      setTimeout(() => {
        this.setState({ blankerror: false })
      }, 5000)
    }
    this.setState({ loaderImage: false });
    // /assignedHouse/:
  }
  deleteHouse = (deleteId) => {
    var userid = this.state.current_user._id;
    this.setState({ loaderImage: true });
    axios
      .delete(
        sitedata.data.path +
        `/hospitaladmin/assignedHouse/${userid}/${deleteId}`,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          this.setState({ deleteHouses: true })
          setTimeout(() => {
            this.setState({ deleteHouses: false, openHouse: false })
          }, 5000)
          this.getallGroups();
          this.getAdminstaff(this.state.current_user._id);
        }
        this.setState({ loaderImage: false });
      });
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
    let {
      srvc_Nurses,
      add_new,
      Nurse,
      find_nurse,
      ID,
      Status,
      no_,
      previous,
      next,
      recEmp_FirstName,
      Normal,
      Blocked,
      recEmp_LastName,
      imprint_Email,
      restore,
      Delete, AssignHouse,
      Findaadminstaff,
      see_detail,
    } = translate;

    return (
      <Grid className={
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
                <H_LeftMenuMobile isNotShow={true} currentPage="staff_List" />
                {/* End of mobile menu */}

                {/* Website Menu */}
                <H_LeftMenu isNotShow={true} currentPage="staff_List" />
                {/* End of Website Menu */}

                <CreateAdminUser
                  addCreate={this.state.addCreate}
                  handleCloseCreate={this.handleCloseCreate}
                  openBy="adminstaff"
                />

                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    className="archvOpinLbl"
                  >
                    <Grid item xs={12} md={6}>
                      <label>{"Admin staff"}</label>
                    </Grid>
                    <Grid item xs={12} md={6} className="archvOpinRght">
                      <a onClick={this.handleOpenCreate}>
                        + {add_new} {"Admin staff"}
                      </a>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    className="archvSrchInput"
                  >
                    <Grid item xs={12} md={12}>

                      {" "}
                      <input
                        onChange={this.search_user}
                        type="text"
                        placeholder={Findaadminstaff}
                      />
                    </Grid>
                    <img
                      src={require("assets/images/InputField.svg")}
                      alt=""
                      title=""
                    />
                  </Grid>
                  <Grid className="archvOpinionIner">
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>{no_}</Th>
                          <Th>{recEmp_FirstName}</Th>
                          <Th>{recEmp_LastName}</Th>
                          <Th>{imprint_Email}</Th>
                          <Th>{ID}</Th>
                          <Th>{Status}</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {this.state.MypatientsData &&
                          this.state.MypatientsData.length > 0 &&
                          this.state.MypatientsData.map((nurse, i) => (
                            // console.log("current Page",this.state.currentPage)
                            // console.log("nurse", nurse, "i",i)
                            console.log("i", i),
                            <Tr>
                              <Td>
                                {((this.state.currentPage - 1) * 5) + i + 1}
                              </Td>
                              <Td>
                                <img
                                  className="doctor_pic"
                                  src={
                                    nurse && nurse.image
                                      ? getImage(nurse.image, this.state.images)
                                      : require("assets/images/dr1.jpg")
                                  }
                                  alt=""
                                  title=""
                                />
                                {nurse.first_name && nurse.first_name}
                              </Td>
                              <Td>{nurse.last_name && nurse.last_name}</Td>
                              <Td>{nurse.email && nurse.email}</Td>
                              <Td>{nurse.alies_id && nurse.alies_id}</Td>
                              {nurse.isblock && nurse.isblock == true ? (
                                <Td style={{ minWidth: "100px" }}>
                                  <span className="revwRed"></span>
                                  {Blocked}
                                </Td>
                              ) : (
                                <Td>
                                  <span className="revwGren"></span>
                                  {Normal}
                                </Td>
                              )}
                              <Td className="billDots">
                                <a className="academy_ul">
                                  <img
                                    src={require("assets/virtual_images/threeDots.png")}
                                    alt=""
                                    title=""
                                    className="academyDots"
                                  />
                                  <ul>
                                    <li onClick={() => this.openDetail(nurse)}>
                                      <a>
                                        <span>
                                          <img
                                            src={require("assets/images/admin/details1.svg")}
                                            alt=""
                                            title=""
                                          />
                                        </span>
                                        {see_detail}
                                      </a>
                                    </li>
                                    <li onClick={() => this.assignHouse(nurse)}>
                                      <a>
                                        <span>
                                          <img
                                            src={require("assets/images/admin/details1.svg")}
                                            alt=""
                                            title=""
                                          />
                                        </span>
                                        {AssignHouse}
                                      </a>
                                    </li>
                                    <li
                                      onClick={() =>
                                        this.BlockUser(nurse._id, nurse.isblock)
                                      }
                                    >
                                      <a>
                                        <span>
                                          <img
                                            src={require("assets/images/admin/restoreIcon.png")}
                                            alt=""
                                            title=""
                                          />
                                        </span>
                                        {nurse.isblock && nurse.isblock == true
                                          ? "Unblock"
                                          : "Block"}
                                      </a>
                                    </li>
                                    <li
                                      onClick={() =>
                                        this.submitDelete(
                                          nurse._id,
                                          nurse.profile_id,
                                          nurse.bucket
                                        )
                                      }
                                    >
                                      <a>
                                        <span>
                                          <img
                                            src={require("assets/images/admin/delIcon.png")}
                                            alt=""
                                            title=""
                                          />
                                        </span>
                                        {Delete}
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
                              {this.state.currentPage} of {this.state.totalPage}
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
                  <AssignedHouse
                    assignedhouse={this.state.assignedhouse}
                    deleteHouses={this.state.deleteHouses}
                    openHouse={this.state.openHouse}
                    currentHouses={this.state.currentHouses}
                    Housesoptions={this.state.Housesoptions}
                    current_user={this.state.current_user}
                    alredyExist={this.state.alredyExist}
                    blankerror={this.state.blankerror}
                    closeHouse={this.closeHouse}
                    SaveAssignHouse={this.SaveAssignHouse}
                    deleteHouse={this.deleteHouse}
                    updateEntryState1={this.updateEntryState1}
                  />
                  {/* <Modal
                    open={this.state.openHouse}
                    onClose={this.closeHouse}
                    className="addSpeclModel"
                  >
                    <Grid className="addSpeclContnt">
                      <Grid className="addSpeclLbl">
                        <Grid className="addSpeclClose">
                          <a onClick={this.closeHouse}>
                            <img
                              src={require("assets/images/close-search.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                        <Grid>
                          <label>Assign Hospitals</label>
                        </Grid>
                      </Grid>
                      <Grid className="enterSpclUpr">
                        <Grid className="enterSpclMain">
                          <Grid className="enterSpcl">
                            <Grid container direction="row">
                              {this.state.alredyExist && (
                                <div className="err_message">
                                  House is already exist to admin staff
                                </div>
                              )}
                              {this.state.assignedhouse && (
                                <div className="success_message">
                                  House is assigned to admin staff
                                </div>
                              )}
                                {this.state.deleteHouse && (
                                <div className="success_message">
                                  House id deleted from the admin staff
                                </div>
                              )}
                                <Grid item xs={10} md={12}>
                                <SelectField
                                    isSearchable={true}
                                    name="houses"
                                    option={this.state.Housesoptions}
                                    onChange={(e) => this.updateEntryState1(e, "houses")}
                                    value={this.state.currentHouses}
                                    // isMulti={true}
                                />
                              </Grid>
                              <Grid item xs={10} md={12}>
                                  <b>Assigned Houses -</b>
                                  <Grid container direction="row">
                                {this.state.current_user?.houses?.length>0 && this.state.current_user?.houses.map((item)=>(
                                      <>
                                       <Grid item xs={10} md={10}>
                                            {item.group_name} - {item.label} ({item.value})
                                        </Grid>
                                        <Grid item xs={2} md={2}>
                                            <a className="delet-house" onClick={()=>{this.deleteHouse(item.value)}}>Delete</a>
                                        </Grid>
                                      </>
                                ))}
                                </Grid>
                              </Grid>
                                
                            
                            <Grid className="spclSaveBtn saveNclose">
                              <Button onClick={()=>this.SaveAssignHouse()}>Save</Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    </Grid>
                  </Modal> */}
                  <ViewDetail
                    openDetial={this.state.openDetial}
                    CloseDetail={this.CloseDetail}
                    patient_info={this.state.current_user}
                  />
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
