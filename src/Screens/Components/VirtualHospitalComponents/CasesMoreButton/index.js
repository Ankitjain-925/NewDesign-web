import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Loader from "Screens/Components/Loader/index";
import { authy } from "Screens/Login/authy.js";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { commonHeader } from "component/CommonHeader/index";
import { houseSelect } from "Screens/VirtualHospital/Institutes/selecthouseaction"; 
import { Speciality } from "Screens/Login/speciality.js";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import axios from "axios";
import sitedata from "sitedata";
import { getSteps, AllWards, setWard, CurrentWard, AllRoom, CurrentRoom, setRoom, AllBed, CurrentBed } from "Screens/VirtualHospital/PatientFlow/data"; 
import SelectField from "Screens/Components/Select/index";
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           specialitysec: false,
           changeStaffsec: false,
           assignroom : false,
           firstsec: true,
           movepatsec: false,
           loaderImage: false
        }
    }

    setSpeciality=(data)=>{
      this.setState({ loaderImage: true });
        axios.put(
        sitedata.data.path + "/cases/AddCase/"+ this.props.quote._id,
        {speciality: {
            background_color: data.background_color,
            color: data.color,
            specialty_name: data.specialty_name,
            _id: data._id
        },
        wards: {}, rooms: {}, bed: ""},
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce1) => {
        if (responce1.data.hassuccessed) {
            var steps = getSteps(
                this.props?.House?.value,
                this.props.stateLoginValueAim.token
              );
              steps.then((data) => {
                var stepData = data ? data : [];
                this.props.setDta(stepData);
              });
              this.setState({ loaderImage: false });
        }
      })
       
    }
    setsWard = (e)=>{
      this.setState({ loaderImage: true });
      var response = setWard(e, this.props.quote?.speciality?._id, this.props.speciality?.SPECIALITY, this.props.quote._id, this.props.stateLoginValueAim.token)
      console.log('response', response)
      response.then((responce1) => {
      if (responce1.data.hassuccessed) {
        var steps = getSteps(
            this.props?.House?.value,
            this.props.stateLoginValueAim.token
          );
          steps.then((data) => {
            var stepData = data ? data : [];
            this.props.setDta(stepData);
          });
          this.setState({ loaderImage: false });
        }
      })
    }

    setsRoom = (e)=>{
      this.setState({ loaderImage: true });
      var response = setRoom(e, this.props.quote?.speciality?._id, this.props.speciality?.SPECIALITY, this.props.quote._id, this.props.stateLoginValueAim.token, this.props.quote?.wards?._id)
      response.then((responce1) => {
      if (responce1.data.hassuccessed) {
        var steps = getSteps(
            this.props?.House?.value,
            this.props.stateLoginValueAim.token
          );
          steps.then((data) => {
            var stepData = data ? data : [];
            this.props.setDta(stepData);
          });
          this.setState({ loaderImage: false });
        }
      })
    }

    GetAllBed=()=>{
      console.log('here',)
      this.setState({ loaderImage: true });
      var response = AllBed(this.props.quote?.speciality?._id, this.props.quote?.wards._id, this.props.quote?.room._id, this.props?.House?.value,
        this.props.stateLoginValueAim.token)
      response.then((responce1) => {
        if (responce1.data.hassuccessed) {
          return responce1?.data?.data.length>0 &&responce1?.data?.data.map((bed)=>{
            return {value: bed, label: bed}
          });
          }
          this.setState({ loaderImage: false });
          return [];
        })
    }

    render() {
        return (
           <>
            {this.state.loaderImage && <Loader />}
           <a className="academy_ul stepTdotupper">
                   <img src={require('assets/images/threedots.jpg')} alt="" title="" className="academyDots stepTdot" />
                   <ul>
                        {this.state.firstsec && <>
                            <li><a onClick={()=>{this.props.history.push('/virtualHospital/patient-detail')}}><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{"Open details"}</a></li>
                            <li><a><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{"Add new entry"}</a></li>
                            <li><a><span><img src={require("assets/images/admin/details1.svg")} alt="" title="" /></span>{"Add Task"} </a></li>
                            <li><a onClick={()=>{this.setState({changeStaffsec : true,specialitysec : false, assignroom: false, movepatsec : false, firstsec: false})}}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Change Staff >"}</a></li>
                            <li><a onClick={()=>{this.setState({specialitysec: false, assignroom: false, changeStaffsec: false, movepatsec : true, firstsec: false})}}><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{"Move patient to >"}</a></li>
                            <li><a onClick={()=>{this.setState({specialitysec : true, assignroom: false, changeStaffsec: false, movepatsec : false, firstsec: false})}}><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{"Assign to Speciality >"}</a></li>
                            <li><a onClick={()=>{this.setState({assignroom : true,  specialitysec: false, changeStaffsec: false, movepatsec : false, firstsec: false})}}><span><img src={require("assets/images/admin/details1.svg")} alt="" title="" /></span>{"Assign to room >"} </a></li>
                            <li><a><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Discharge Patient"}</a></li>
                            <li><a><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Remove Patient from flow"}</a></li>
                        </>}
                        {this.state.specialitysec &&
                            <div>
                            <Grid className="movHead">
                               <Grid onClick={()=>this.setState({firstsec: true, specialitysec : false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                               <Grid  className="movHeadMid"><label>Add Specialty</label></Grid>
                               <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, specialitysec : false })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                           </Grid>
                           <Grid className="positionDrop">
                             
                           {this.props.speciality?.SPECIALITY && this.props?.speciality?.SPECIALITY.length>0 && this.props?.speciality?.SPECIALITY.map((data)=>(
                            <SpecialityButton
                                  label={data.specialty_name}
                                  backgroundColor={data.background_color}
                                  viewImage= {false}
                                  color={data.color}
                                  onClick={()=> this.setSpeciality(data)}
                                  showActive={this.props.quote?.speciality?._id == data._id ? true : false}
                                /> 
                           ))}
                          
                           </Grid>
                       </div> 
                        }
                        {this.state.changeStaffsec &&
                            <div>
                            <Grid className="movHead">
                               <Grid onClick={()=>this.setState({firstsec: true, changeStaffsec : false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                               <Grid  className="movHeadMid"><label>Change Staff</label></Grid>
                               <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, changeStaffsec : false })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                           </Grid>
                           <Grid className="positionDrop">
                           {this.props.ordered?.length>0 &&  this.props.ordered.map((item)=>(
                               <Grid><label onClick={()=>{ this.props.onDragEnd(
                                   {type: "QUOTE" , draggableId: this.props.quote.patient_id, source: {droppableId: this.props.currentStep, index: this.props.currentIndex} , destination: {droppableId: item, index: this.props.columns[item]?.length}}
                               )}}>{item}</label></Grid>
                           ))}
                           </Grid>
                       </div> 
                        }
                        {this.state.assignroom &&
                            <div>
                            <Grid className="movHead">
                               <Grid onClick={()=>this.setState({firstsec: true, assignroom : false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                               <Grid  className="movHeadMid"><label>Assign Ward / Room</label></Grid>
                               <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, assignroom : false })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                           </Grid>
                           <Grid className="positionDrop">
                           {this.props.quote?.speciality?._id ? 
                           <Grid className="cnfrmDiaMain">
                             <Grid className="fillDia">
                               <Grid>
                                 <SelectField
                                   isSearchable={true}
                                   name="type"
                                   label="Wards"
                                   option={AllWards(this.props.quote?.speciality?._id, this.props.speciality?.SPECIALITY, )}
                                   onChange={(e) =>
                                    this.setsWard(e)
                                   }
                                   value={CurrentWard(this.props.quote?.wards)}
                                 />
                               </Grid>
                               {this.props.quote?.wards?._id && <Grid>
                                 <SelectField
                                   isSearchable={true}
                                   name="type"
                                   label="Room"
                                   option={AllRoom(this.props.quote?.speciality?._id, this.props.speciality?.SPECIALITY, this.props.quote?.wards?._id)}
                                   onChange={(e) => this.setsRoom(e)}
                                   value={CurrentRoom(this.props.quote?.rooms)}
                                 />
                               </Grid>}
                               {this.props.quote?.rooms?._id && <Grid>
                                 <SelectField
                                   isSearchable={true}
                                   name="type"
                                   label="Bed"
                                   option={this.GetAllBed}
                                   onChange={(e) => this.setsBed(e)}
                                   value={CurrentBed(this.props.quote?.bed)}
                                 />
                               </Grid>}
                             </Grid>
                         </Grid>
                           : <div className="err_message">Please assign a speciality first</div>}
                           </Grid>
                       </div> 
                        }
                        {this.state.movepatsec &&
                             <div>
                                <Grid className="movHead">
                                   <Grid onClick={()=>this.setState({firstsec: true, movepatsec : false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                   <Grid  className="movHeadMid"><label>Move Patient</label></Grid>
                                   <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, movepatsec : false })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                               </Grid>
                               <Grid className="positionDrop">
                               {this.props.ordered?.length>0 &&  this.props.ordered.map((item)=>(
                                   <Grid><label onClick={()=>{ this.props.onDragEnd(
                                       {type: "QUOTE" , draggableId: this.props.quote.patient_id, source: {droppableId: this.props.currentStep, index: this.props.currentIndex} , destination: {droppableId: item, index: this.props.columns[item]?.length}}
                                   )}}>{item}</label></Grid>
                               ))}
                               </Grid>
                           </div> 
                        }
                   </ul> 
               </a>
           </>
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
  