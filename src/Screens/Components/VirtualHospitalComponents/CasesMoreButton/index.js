import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
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
import { getSteps } from "Screens/VirtualHospital/PatientFlow/data"; 
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           specialitysec: false,
           changeStaffsec: false,
           assignroom : false,
           firstsec: true,
           movepatsec: false
        }
    }

    // componentDidMount=()=>{
    //     console.log('componentDidMount', this.props)
    // }
    // onDataChange = (e, index) => {
    //     var RoomAy = this.state.roomArray;
    //     if(this.props.comesFrom==="admin"){
    //          RoomAy[index][e.target.name] = e.target.value;
    //     }
    //     else{
    //         RoomAy[index] = e.target.value;
    //     }
    //     this.setState({ roomArray: RoomAy },
    //     this.props.onChange(this.state.roomArray))
    // }
    
    // componentDidUpdate = (prevProps) => {
    //     if (prevProps.roomArray !== this.props.roomArray || prevProps.label !== this.props.label|| prevProps.name !== this.props.name) {
    //         this.setState({ roomArray: this.props.roomArray,  label: this.props.label,
    //             name: this.props.name,});
    //     }
    // };
 
    // onAddFiled = () => {
    //     let RoomAy = this.state.roomArray;
    //     var date = new Date();
    //     if(this.props.comesFrom==="admin"){
    //         RoomAy.push({ house_name: "", house_id: `${this.props.institute_id}-${date.getTime()}` });
    //     }
    //     else{
    //         RoomAy.push('');
    //     }
    //     this.setState({ roomArray: RoomAy });
    // };

    // deleteRooms = (index) => {
    //     var RoomAy = this.state.roomArray?.length>0 && this.state.roomArray.filter((data , index1)=>index1 !== index);
    //     this.setState({ roomArray: RoomAy }, ()=>{
    //         this.props.onChange(this.state.roomArray)
    //     });  
        
    // };
  
    setSpeciality=(data)=>{
        axios.put(
                sitedata.data.path + "/cases/AddCase/"+ this.props.quote._id,
                {speciality: {
                    background_color: data.background_color,
                    color: data.color,
                    specialty_name: data.specialty_name,
                    _id: data._id
                }},
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

                }
              })
       
    }
    render() {
        return (
           <>
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
                           {/* <SpecialityButton
                                  viewImage={true}
                                  deleteClick={() => this.handleOpenWarn(data._id)}
                                  label={data.specialty_name}
                                  backgroundColor={data.background_color}
                                  color={data.color}
                                  onClick={() => {
                                    this.onEditspec(data);
                                  }}
                                /> */}
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
                           <>Select Wrads</>
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
  