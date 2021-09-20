import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
                            <li><a onClick={()=>{this.setState({changeStaffsec : true,  assignroom: false, changeStaffsec: false, movepatsec : false, firstsec: false})}}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Change Staff >"}</a></li>
                            <li><a onClick={()=>{this.setState({specialitysec: false, assignroom: false, changeStaffsec: false, movepatsec : true, firstsec: false})}}><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{"Move patient to >"}</a></li>
                            <li><a onClick={()=>{this.setState({specialitysec : true, assignroom: false, changeStaffsec: false, movepatsec : false, firstsec: false})}}><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{"Assign to Speciality >"}</a></li>
                            <li><a onClick={()=>{this.setState({assignroom : true,  assignroom: false, changeStaffsec: false, movepatsec : false, firstsec: false})}}><span><img src={require("assets/images/admin/details1.svg")} alt="" title="" /></span>{"Assign to room >"} </a></li>
                            <li><a><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Discharge Patient"}</a></li>
                            <li><a><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Remove Patient from flow"}</a></li>
                        </>}
                        {this.state.specialitysec &&
                            <div>
                            <Grid className="movHead">
                               <Grid onClick={()=>this.setState({firstsec: true, specialitysec : false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                               <Grid  className="movHeadMid"><label>Add Specialty</label></Grid>
                               <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, movepatsec : true })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                           </Grid>
                           <Grid className="positionDrop">
                           {this.props.ordered?.length>0 && this.props.ordered.map((item)=>(
                               <Grid><label onClick={()=>{ this.props.onDragEnd(
                                   {type: "QUOTE" , draggableId: this.props.quote.patient_id, source: {droppableId: this.props.currentStep, index: this.props.currentIndex} , destination: {droppableId: item, index: this.props.columns[item]?.length}}
                               )}}>{item}</label></Grid>
                           ))}
                           </Grid>
                       </div> 
                        }
                        {this.state.changeStaffsec &&
                            <div>
                            <Grid className="movHead">
                               <Grid onClick={()=>this.setState({firstsec: true, movepatsec : true })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                               <Grid  className="movHeadMid"><label>Change Staff</label></Grid>
                               <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, movepatsec : true })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
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
                               <Grid onClick={()=>this.setState({firstsec: true, movepatsec : true })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                               <Grid  className="movHeadMid"><label>Assign Ward/Room</label></Grid>
                               <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, movepatsec : true })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
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
                        {this.state.movepatsec &&
                             <div>
                                <Grid className="movHead">
                                   <Grid onClick={()=>this.setState({firstsec: true, movepatsec : true })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                   <Grid  className="movHeadMid"><label>Move Patient</label></Grid>
                                   <Grid className="movHeadRght"><a onClick={()=>this.setState({firstsec: true, movepatsec : true })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
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
export default withRouter(
    Index
);