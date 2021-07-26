import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/VirtualHospitalMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/VirtualHospitalMenu/mobile";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Button from "@material-ui/core/Button";
import ColorSelection from "Screens/Components/VirtualHospitalComponents/ColorSelection/index";
import VHfield from "Screens/Components/VirtualHospitalComponents/VHfield/index";
import AddRoom from "Screens/Components/VirtualHospitalComponents/AddRoom/index";
import RoomView from "Screens/Components/VirtualHospitalComponents/RoomView/index";
import sitedata from 'sitedata';
import axios from 'axios';
import Loader from "Screens/Components/Loader/index";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from 'react-router-dom';
import { authy } from 'Screens/Login/authy.js';
import { connect } from "react-redux";
import { LanguageFetchReducer } from 'Screens/actions';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { commonHeader } from "component/CommonHeader/index";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
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
      specialityData: []
    };
  }
  handleOpenSpecl = () => {
    this.setState({ openSpecl: true });
  };
  handleCloseSpecl = () => {
    this.setState({ openSpecl: false });
  }

  //to save the speciality
  SaveSpeciality = () => {
    var data = this.state.speciality;
    data.house_id = this.props.house_id;
    this.setState({ loaderImage: true })
    axios.post(sitedata.data.path + '/vh/AddSpecialty',
      data,
      commonHeader(this.props.stateLoginValueAim.token))
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          this.getSpeciality();
        }
        this.setState({ loaderImage: false, openSpecl: false })
      })
  };

  //for getting all speciality
  getSpeciality = () => {
    this.setState({ loaderImage: true })
    axios.get(sitedata.data.path + '/vh/AddSpecialty/' + this.props.house_id,
      commonHeader(this.props.stateLoginValueAim.token))
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          this.setState({ specialityData: responce.data.data })
        }
        this.setState({ loaderImage: false, openSpecl: false })
      })
  }

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
    this.setState({ openWard: false });
  };

  //update the ward of the speciality
  handleOpenRoom = () => {
    var state = this.state.speciality;
    var ward = state["wards"] || [];
    ward.push(this.state.ward);
    state["wards"] = ward;
    this.setState({ speciality: state }, () => {
      this.setState({ openWard: false, ward: {} })
    });
  };

  //for update speciality name
  updateEntryState = (e) => {
    var state = this.state.speciality;
    state[e.target.name] = e.target.value;
    this.setState({ speciality: state })
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

  //remove Wards
  removeWard=(index)=>{
    console.log('indexx', index);
    var state = this.state.speciality;
    var ward = state["wards"] || [];
    var ward1 = ward?.length>0 && ward.filter((data , index1)=>index1 !== index);
    console.log('ward', ward1)
    state['wards'] = ward1;
    this.setState({ speciality: state });
    
  }
  //for update the rooms in the wards
  updateEntryState3 = (ward) => {
    var state = this.state.ward;
    state["rooms"] = ward;
    this.setState({ ward: state })
  };

  bednumbers = (rooms) => {
    return rooms.reduce((a, v) => a = a + parseInt(v.bed_number), 0)
  }

  render() {
    const { stateLoginValueAim } = this.props;
    if (stateLoginValueAim.user === 'undefined' || stateLoginValueAim.token === 450 || stateLoginValueAim.token === 'undefined' || stateLoginValueAim.user.type !== 'adminstaff' || !this.props.verifyCode || !this.props.verifyCode.code) {
      return (<Redirect to={'/'} />);
    }
    return (
      <Grid className="homeBg">
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row">
            <Grid item xs={12} md={12}>
              <LeftMenuMobile isNotShow={true} currentPage="chat" />
              <Grid container direction="row">
                {/* <VHfield name="ANkit" Onclick2={(name, value)=>{this.myclick(name , value)}}/> */}

                {/* Start of Menu */}
                <Grid item xs={12} md={1} className="MenuLeftUpr">
                  <LeftMenu isNotShow={true} currentPage="chat" />
                </Grid>
                {/* End of Menu */}
                {/* Start of Right Section */}
                <Grid item xs={12} md={11}>
                  <Grid className="topLeftSpc">
                    {/* <Grid className="extSetting">
                      <a>
                        <img
                          src={require("assets/virtual_images/rightArrow.png")}
                          alt=""
                          title=""
                        />
                        Exit Settings
                      </a>
                    </Grid> */}
                    {/* Start of Bread Crumb */}
                    <Grid className="breadCrumbUpr">
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={12}>
                          <Grid className="roomBreadCrumb3">
                            <ul>
                              <li>
                                <a>
                                  <span>Institution</span>
                                  <label>German Medical Center FZ-LLC</label>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <label>Specialities</label>
                                </a>
                              </li>
                            </ul>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* End of Bread Crumb */}
                    <Grid className="wardsGrupUpr">
                      <Grid container direction="row" spacing={2}>
                      {this.state.specialityData?.length>0 && this.state.specialityData.map((data)=>(
                          <Grid item xs={12} md={3}>
                          <Grid className="wardsGrup3">
                          <SpecialityButton viewImage={true} label={data.speciality_name} backgroundColor={data.background_color} color={data.color}/>
                              {/* <Grid className="spcMgntUpr3">
                                  <Grid container direction="row">
                                      <Grid item xs={6} md={6}>
                                          <Button variant="contained">Cardiology</Button>
                                      </Grid>
                                      <Grid item xs={6} md={6} className="spcMgntRght3">
                                          <a><img src={require('assets/virtual_images/setting.png')} alt="" title="" /></a>
                                      </Grid>
                                  </Grid>
                              </Grid> */}
                              {data.wards?.length>0 && data.wards.map((item)=>(
                                <Grid className="roomsNum3">
                                   <ul>
                                       <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />{item.ward_name}</li>
                                       <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />{item?.rooms?.length ? item?.rooms?.length : 0 } rooms</li>
                                       <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                           {this.bednumbers(item.rooms)} beds<span>32 available</span>
                                       </li>
                                   </ul>
                                </Grid>
                              ))}
                             
                              {/* <Grid className="roomsNum3">
                                  <ul>
                                      <li><img src={require('assets/virtual_images/square.png')} alt="" title="" />Childrens Ward</li>
                                      <li><img src={require('assets/virtual_images/room.svg')} alt="" title="" />8 rooms</li>
                                      <li><img src={require('assets/virtual_images/bedNumber.png')} alt="" title="" />
                                          53 beds<span>32 available</span>
                                      </li>
                                  </ul>
                              </Grid> */}
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
                  className="addSpeclModel"
                >
                  <Grid className="addSpeclContnt">
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
                        <label>Add Speciality</label>
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
                                name="speciality_name"
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
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="addWardsRoom">
                              {!this.state.openWard && <>
                                {this.state.speciality?.wards?.length > 0 && this.state.speciality?.wards?.map((data, index) => (
                                  <RoomView
                                    label={data.ward_name}
                                    room_number={data.rooms?.length > 0 ? data.rooms?.length : 0}
                                    bed_number={this.bednumbers(data.rooms)}
                                    index={index}
                                    removeWard={(index)=>this.removeWard(index)}
                                  />
                                ))}
                              </>}
                              <Grid className="">
                                {!this.state.openWard ?
                                  <Grid className={this.state.speciality?.wards?.length > 0 ? "addNwWard" : " plusWards"}>
                                    <p onClick={this.handleOpenWard}>+ Add a Ward</p>
                                  </Grid>
                                  :
                                  <Grid className="">
                                    <Grid className="addWardsUpr">
                                      <Grid className="addWardsIner">
                                        <Grid item xs={12} md={12}>
                                          <VHfield
                                            label="Ward"
                                            name="ward_name"
                                            placeholder="Adults Ward"
                                            onChange={(e) => this.updateEntryState2(e)}
                                          />

                                          <AddRoom
                                            label="room"
                                            name="roomname"
                                            onChange={(e) => this.updateEntryState3(e)}
                                          />
                                        </Grid>
                                        <Grid className="wrdsBtn">
                                          <Button onClick={(e) => { this.setState({ openWard: false, ward: {} }) }}>Cancel</Button>
                                          <Button className="wrdsBtnActv" onClick={() => { this.handleOpenRoom() }}>Save Ward</Button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                }
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
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    //   Doctorsetget,
    //   catfil
  }
};
export default withRouter(connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings, authy })(Index));
