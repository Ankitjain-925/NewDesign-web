import React from "react";
import Grid from "@material-ui/core/Grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "@material-ui/core/Button";
import CasesMoreButton from "Screens/Components/VirtualHospitalComponents/CasesMoreButton/index";
import { checkTheIndex } from "../data";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index"

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? "#333" : "transparent";

export default class QuoteItem extends React.Component {
  setSpeciality = () => {};

  render() {
    const { quote, isDragging, isGroupedOver, provided, onDragEnd } =
      this.props;

    return (
      <div
        href={quote.author.url}
        isDragging={isDragging}
        isGroupedOver={isGroupedOver}
        colors={quote.author.colors}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {this.props.view === "vertical" ? (
          <Grid className="flowInfo">
            <Grid className="flowInfoInr">
              <SpecialityButton
                label={quote?.speciality?.specialty_name}
                backgroundColor={quote?.speciality?.background_color}
                viewImage={false}
                color={quote?.speciality?.color}
                onClick={() => this.setSpeciality()}
                showActive={false}
              />
              <Grid className="flowProfil">
                <Grid>
                  <img
                    className="imgProfile"
                    src={require("assets/virtual_images/102.png")}
                    alt=""
                    title=""
                  />
                </Grid>
                <Grid className="flowProfilRght" onClick={()=>this.props.moveDetial(quote.patient_id)}>
                  <label>
                    {quote.patient.first_name} {quote.patient.last_name}
                  </label>
                  <p>{quote.patient.alies_id}</p>
                </Grid>
                <Grid className="checkDotsRght">
                  <CasesMoreButton
                    setDta={(item) => this.props.setDta(item)}
                    currentStep={quote?.author?.step_name}
                    currentIndex={checkTheIndex(
                      this.props.columns[quote?.author?.step_name],
                      "patient_id",
                      quote.patient_id
                    )}
                    columns={this.props.columns}
                    quote={quote}
                    onDragEnd={(data) => onDragEnd(data)}
                    ordered={this.props.ordered}
                    professional_id_list={this.props.professional_id_list}
                    updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className="flowInfoInr2">
              <Grid className="dtlCntUpr">
                <Grid className="dtlCntLft">
                  <Grid className="dtlCount dtlCountRm">
                  <a>
                      <img
                        src={require("assets/virtual_images/square.png")}
                        alt=""
                        title=""
                      />
                      {quote.wards.ward_name}
                    </a>
                    <a>
                      <img
                        src={require("assets/virtual_images/room.svg")}
                        alt=""
                        title=""
                      />
                      {quote.rooms.room_name}
                    </a>
                    <a>
                      <img
                        src={require("assets/virtual_images/bed2.png")}
                        alt=""
                        title=""
                      />
                      {quote.bed}
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className="dtlCntUpr dtlCntUprNw">
                <Grid className="dtlCntLft">
                  <Grid className="dtlCount">
                    <a>
                      <img
                        src={require("assets/virtual_images/rightIcon.png")}
                        alt=""
                        title=""
                      />
                      {quote.done_task}/{quote.total_task}
                    </a>
                    <span>
                      <img
                        src={require("assets/virtual_images/plusIcon.jpg")}
                        alt=""
                        title=""
                      />
                    </span>
                    <a>
                      <img
                        src={require("assets/virtual_images/note1.png")}
                        alt=""
                        title=""
                      />
                      3
                    </a>
                  </Grid>
                </Grid>
                <Grid className="dtlCntRght">
                <Assigned assigned_to ={quote.assinged_to}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid className="cardioAreaUpr">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={7}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  className="cardioAreaMob"
                >
                  <Grid item xs={12} md={3} lg={2} className="cardoLblMob">
                  <SpecialityButton
                      label={quote?.speciality?.specialty_name}
                      backgroundColor={quote?.speciality?.background_color}
                      viewImage={false}
                      color={quote?.speciality?.color}
                      onClick={() => this.setSpeciality()}
                      showActive={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={5} lg={4}>
                    <Grid className="cardioArea" >
                      <Grid onClick={(id)=>this.props.moveDetial(id)}>
                        <label>
                          {quote.patient.first_name} {quote.patient.last_name}
                        </label>
                        <p>{quote.patient.alies_id}</p>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={3} lg={2} className="cardoLblWeb">
                  <SpecialityButton
                      label={quote?.speciality?.specialty_name}
                      backgroundColor={quote?.speciality?.background_color}
                      viewImage={false}
                      color={quote?.speciality?.color}
                      onClick={() => this.setSpeciality()}
                      showActive={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={6}>
                      <Grid className="wardInfo">
                          <a className="wardNum"><img src={require('assets/virtual_images/square.png')} alt="" title="" /><span>{quote.wards.ward_name}</span></a>
                          <a className="roomNum"><img src={require('assets/virtual_images/room.svg')} alt="" title="" /><span>{quote.rooms.room_name}</span></a>
                          <a className="bedNum"><img src={require('assets/virtual_images/bed2.png')} alt="" title="" /><span>{quote.bed}</span></a>
                      </Grid>
                  </Grid>
                  <Grid item xs={12} md={3} lg={2} className="cardoLblWeb">
                
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Grid className="cardioData">
                  <Grid className="infoDoc">
                    <a className="rghtHalf">
                      <img
                        src={require("assets/virtual_images/rightIcon.png")}
                        alt=""
                        title=""
                      />
                     {quote.done_task}/{quote.total_task}
                    </a>
                    <a className="addSec">
                      <img
                        src={require("assets/virtual_images/plusIcon.png")}
                        alt=""
                        title=""
                      />
                    </a>
                    <a className="notePoint">
                      <img
                        src={require("assets/virtual_images/note.png")}
                        alt=""
                        title=""
                      />
                      <span>1</span>
                    </a>
                  </Grid>
                  <Grid className="cardioList">
                  <Assigned assigned_to ={quote.assinged_to}/>
                  </Grid>
                  <Grid>
                  <CasesMoreButton
                    setDta={(item) => this.props.setDta(item)}
                    currentStep={quote?.author?.step_name}
                    currentIndex={checkTheIndex(
                      this.props.columns[quote?.author?.step_name],
                      "patient_id",
                      quote.patient_id
                    )}
                    columns={this.props.columns}
                    quote={quote}
                    onDragEnd={(data) => onDragEnd(data)}
                    ordered={this.props.ordered}
                    professional_id_list={this.props.professional_id_list}
                    updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
                  />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
