import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import axios from 'axios';
import { LanguageFetchReducer } from 'Screens/actions';
import sitedata from 'sitedata';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  getDate,
  getImage,
  blockClick,
  allusers,
} from 'Screens/Components/BasicMethod/index';
import Button from '@material-ui/core/Button';
import { getLanguage } from './translations/index';
import H_LeftMenu from 'Screens/Components/Menus/H_leftMenu/index';
import H_LeftMenuMobile from 'Screens/Components/Menus/H_leftMenu/mobile';
import { SearchUser } from 'Screens/Components/Search';
import CreateAdminUser from 'Screens/Components/CreateHospitalUser/index';
import ViewDetail from 'Screens/Components/ViewInformation/index';
import './style.css';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import {
  commonHeader,
  commonCometDelHeader,
} from 'component/CommonHeader/index';
import Pagination from 'Screens/Components/Pagination/index';
import Loader from 'Screens/Components/Loader/index';

const specialistOptions = [
  { value: 'Specialist1', label: 'Specialist1' },
  { value: 'Specialist2', label: 'Specialist2' },
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
      type: 'patient',
    };
    // new Timer(this.logOutClick.bind(this))
    this.search_user = this.search_user.bind(this);
  }

  componentDidMount = () => {
    this.getAllkyc();
    this.getPatient();
  };

  openDetail = (patient) => {
    this.setState({ openDetial: true, current_user: patient });
  };
  CloseDetail = () => {
    this.setState({ openDetial: false });
  };
  search_user = (event) => {
    if (event.target.value == '') {
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
    this.getPatient();
    this.setState({ addCreate: false });
  };
  submitDelete = (deletekey, profile_id, bucket) => {
    let translate = getLanguage(this.props.stateLanguageType);
    let { DeleteUser, Yes, No, click_on_YES_user, are_you_sure } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Grid
            className={
              this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode === 'dark'
                ? 'dark-confirm deleteStep'
                : 'deleteStep'
            }
          >
            <Grid className="deleteStepLbl">
              <Grid>
                <a
                  onClick={() => {
                    onClose();
                  }}
                >
                  <img
                    src={require('assets/images/close-search.svg')}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
              <label>{DeleteUser}</label>
            </Grid>
            <Grid className="deleteStepInfo">
              <p>{click_on_YES_user}</p>
              <Grid>
                <label>{are_you_sure}</label>
              </Grid>
              <Grid>
                <Button
                  onClick={() => {
                    this.deleteClick(deletekey, profile_id, bucket);
                    onClose();
                  }}
                >
                  {Yes}
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                  }}
                >
                  {No}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      },
    });
  };
  deleteClick = (deletekey, profile_id, bucket) => {
    this.setState({ loaderImage: true });
    const user_token = this.props.stateLoginValueAim.token;
    axios
      .delete(
        sitedata.data.path +
          '/admin/deleteUser/' +
          deletekey +
          '?bucket=' +
          bucket,
        commonHeader(user_token)
      )
      .then((response) => {
        this.setState({ loaderImage: false });
        var data = JSON.stringify({ permanent: true });

        var config = {
          method: 'delete',
          url:
            'https://api-eu.cometchat.io/v2.0/users/' +
            profile_id.toLowerCase(),
          headers: commonCometDelHeader(),
          data: data,
        };

        axios(config)
          .then(function (response) {})
          .catch(function (error) {});
        this.getPatient();
        //   this.MessageUser();
      })
      .catch((error) => {});
  };

  BlockUser = (patient_id, isblock) => {
    var data = blockClick(
      patient_id,
      isblock,
      this.props.stateLoginValueAim.token
    );
    this.getPatient();
  };

  getAllkyc() {
    var user_token = this.props.stateLoginValueAim.token;
    axios
      .get(sitedata.data.path + '/User/getAllKyc', commonHeader(user_token))
      .then((response) => {
        this.setState({ getAllkyc: response.data.data });
      })
      .catch((error) => {});
  }

  getPatient() {
    let { currentPage, type } = this.state;
    var user_token = this.props.stateLoginValueAim.token;
    this.setState({ loaderImage: true });
    let res = allusers(
      currentPage,
      user_token,
      type,
      this.props.stateLoginValueAim.user.institute_id
    );
    res.then((res) => {
      var images = [];
      const AllPatient = res.data && res.data.data && res.data.data;
      this.setState({ AllPatient: AllPatient, forSearch: AllPatient });
      AllPatient &&
        AllPatient.length > 0 &&
        AllPatient.map((item) => {
          var find = item && item.image && item.image;
          if (find) {
            var find1 = find.split('.com/')[1];
            axios
              .get(sitedata.data.path + '/aws/sign_s3?find=' + find1)
              .then((response2) => {
                if (response2.data.hassuccessed) {
                  item.new_image = response2.data.data;
                  images.push({ image: find, new_image: response2.data.data });
                  this.setState({ images: images });
                }
              });
          }
        });
      this.setState({
        loaderImage: false,
        totalPage: Math.ceil(res.data.Total_count / 20),
        MypatientsData: this.state.AllPatient,
        TotalCount: res.data.Total_count,
      });
    });
    // var user_token = this.props.stateLoginValueAim.token;
    // axios.get(sitedata.data.path + '/admin/allHospitalusers/' + this.props.stateLoginValueAim.user.institute_id
    //     + '/patient/1'
    //     , commonHeader(user_token)
    // )
    //     .then((response) => {
    //         if (response.data.data) {
    //             var images = [];
    //             this.setState({ AllUsers: response.data.data });
    //             const AllPatient = this.state.AllUsers;
    //             this.setState({ AllPatient: AllPatient })
    //             var totalPage = Math.ceil(AllPatient.length / 20);
    //             this.setState({ totalPage: totalPage, currentPage: 1 },
    //                 () => {
    //                     if (totalPage > 1) {
    //                         var pages = [];
    //                         for (var i = 1; i <= this.state.totalPage; i++) {
    //                             pages.push(i)
    //                         }
    //                         this.setState({ MypatientsData: AllPatient.slice(0, 20), pages: pages })
    //                     }
    //                     else {
    //                         this.setState({ MypatientsData: AllPatient })
    //                     }
    //                 })
    //             this.setState({ forSearch: AllPatient })
    //             AllPatient && AllPatient.length > 0 && AllPatient.map((item) => {
    //                 var find = item && item.image && item.image
    //                 if (find) {
    //                     var find1 = find.split('.com/')[1]
    //                     axios.get(sitedata.data.path + '/aws/sign_s3?find=' + find1,)
    //                         .then((response2) => {
    //                             if (response2.data.hassuccessed) {
    //                                 item.new_image = response2.data.data
    //                                 images.push({ image: find, new_image: response2.data.data })
    //                                 this.setState({ images: images })
    //                             }
    //                         })
    //                 }
    //             })
    //         }
    //         else {
    //             this.setState({ AllPatient: [] });
    //         }
    //     }).catch((error) => { });
  }

  onChangePage = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.getPatient();
    });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      capab_Patients,
      add_new,
      Patient,
      find_patient,
      ID,
      Status,
      no_,
      recEmp_FirstName,
      previous,
      next,
      Normal,
      Blocked,
      recEmp_LastName,
      imprint_Email,
      restore,
      Delete,
      see_detail,
    } = translate;

    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === 'dark'
            ? 'homeBg darkTheme'
            : 'homeBg'
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              <Grid container direction="row">
                {/* Mobile menu */}
                <H_LeftMenuMobile isNotShow={true} currentPage="patient_List" />
                {/* End of mobile menu */}

                {/* Website Menu */}
                <H_LeftMenu isNotShow={true} currentPage="patient_List" />
                {/* End of Website Menu */}

                <CreateAdminUser
                  addCreate={this.state.addCreate}
                  handleCloseCreate={this.handleCloseCreate}
                  openBy="patient"
                />

                <Grid item xs={12} md={10} className="adminMenuRghtUpr">
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    className="archvOpinLbl"
                  >
                    <Grid item xs={12} md={6}>
                      <label>{capab_Patients}</label>
                    </Grid>
                    <Grid item xs={12} md={6} className="archvOpinRght">
                      <a onClick={this.handleOpenCreate}>
                        + {add_new} {Patient}
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
                      {' '}
                      <input
                        onChange={this.search_user}
                        type="text"
                        placeholder={find_patient}
                      />
                    </Grid>
                    <img
                      src={require('assets/images/InputField.svg')}
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
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {this.state.MypatientsData &&
                          this.state.MypatientsData.length > 0 &&
                          this.state.MypatientsData.map((patient, i) => (
                            <Tr>
                              <Td>
                                {(this.state.currentPage - 1) * 20 + i + 1}
                              </Td>
                              <Td className="patentPic">
                                <S3Image imgUrl={patient?.image} />
                                {patient.first_name && patient.first_name}
                              </Td>
                              <Td>{patient.last_name && patient.last_name}</Td>
                              <Td>{patient.email && patient.email}</Td>
                              <Td>{patient.alies_id && patient.alies_id}</Td>
                              {patient.isblock && patient.isblock == true ? (
                                <Td style={{ minWidth: '100px' }}>
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
                                    src={require('assets/virtual_images/threeDots.png')}
                                    alt=""
                                    title=""
                                    className="academyDots"
                                  />
                                  <ul>
                                    <li
                                      onClick={() => this.openDetail(patient)}
                                    >
                                      <a>
                                        <span>
                                          <img
                                            src={require('assets/images/admin/details1.svg')}
                                            alt=""
                                            title=""
                                          />
                                        </span>
                                        {see_detail}
                                      </a>
                                    </li>
                                    <li
                                      onClick={() =>
                                        this.BlockUser(
                                          patient._id,
                                          patient.isblock
                                        )
                                      }
                                    >
                                      <a>
                                        <span>
                                          <img
                                            src={require('assets/images/admin/restoreIcon.png')}
                                            alt=""
                                            title=""
                                          />
                                        </span>
                                        {patient.isblock &&
                                        patient.isblock == true
                                          ? 'Unblock'
                                          : 'Block'}
                                      </a>
                                    </li>
                                    <li
                                      onClick={() =>
                                        this.submitDelete(
                                          patient._id,
                                          patient.profile_id,
                                          patient.bucket
                                        )
                                      }
                                    >
                                      <a>
                                        <span>
                                          <img
                                            src={require('assets/images/admin/delIcon.png')}
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
                                from="userlist"
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
