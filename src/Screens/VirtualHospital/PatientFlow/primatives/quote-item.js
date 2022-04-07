import React from "react";
import Grid from "@material-ui/core/Grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CasesMoreButton from "Screens/Components/VirtualHospitalComponents/CasesMoreButton/index";
import { checkTheIndex } from "../data";
import SpecialityButton from "Screens/Components/VirtualHospitalComponents/SpecialityButton";
import Assigned from "Screens/Components/VirtualHospitalComponents/Assigned/index";
import { S3Image } from "Screens/Components/GetS3Images/index";
import { getLanguage } from "translations/index"
import { borderRadius, grid } from "../constants";
import styled from "@emotion/styled";

const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
  if (isDragging) {
    // return authorColors.soft;
  }

  if (isGroupedOver) {
    return "#00abaf";
  }

  return "transparent";
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? '#000000' : "transparent";

const Container = styled.a`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${props => getBorderColor(props.isDragging, props.colors)};
  background-color: ${props =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px #00abaf` : "none"};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: #00abaf;

  &:hover,
  &:active {
    color: #00abaf;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  flex-grow: 0;
  margin: 0;
  background-color: ${props => props.colors.soft};
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;
var socket;

export default class QuoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };

  }
  setSpeciality = () => { };


  // shouldComponentUpdate(nextProps, nexState) {
  //   return (

  //   );
  // }

  componentDidMount() {
    this.props.socket.on("email_accept", (data) => {

      if (this.props.quote._id === data.case_id) {

        this.props.quote.verifiedbyPatient = true;
        this.setState({ update: !this.state.update })

      }


    })
  }

  render() {
    const { quote, isDragging, isGroupedOver, provided, onDragEnd } =
      this.props;
    let translate = getLanguage(this.props.stateLanguageType);
    let { Ward, Room, Bed, Tasks, AddTask, Comments, PatientInInvoice } = translate;
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
          <Grid className={!quote?.verifiedbyPatient ? "flowInfo disabledCrd" : "flowInfo"}>
            <Grid className="flowInfoInr">
              {!quote?.verifiedbyPatient && <span className="err_message">For processing need approval from patient</span>}
              <SpecialityButton
                label={quote?.speciality?.specialty_name}
                backgroundColor={quote?.speciality?.background_color}
                viewImage={false}
                color={quote?.speciality?.color}
                onClick={() => this.setSpeciality()}
                showActive={false}
              />
              {this.props.quote?.status === 1 && <span className="err_message">{PatientInInvoice}</span>}
              <Grid className="flowProfil">
                <Grid>
                  <Grid className="tasklistName"><S3Image imgUrl={this.props.quote?.patient?.image} /></Grid>
                  {/* <img
                    className="imgProfile"
                    src={require("assets/virtual_images/102.png")}
                    alt=""
                    title=""
                  /> */}
                </Grid>
                <Grid className="flowProfilRght" onClick={() => { quote?.verifiedbyPatient && this.props.moveDetial(this.props.quote.patient_id, this.props.quote._id) }}>
                  <label>
                    {quote.patient?.first_name} {quote.patient?.last_name}
                  </label>
                  <p>{quote.patient?.alies_id}</p>
                </Grid>
                <Grid className="checkDotsRght">
                  {quote?.verifiedbyPatient && <CasesMoreButton
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
                    updateEntryState3={(e, case_id) => { this.props.updateEntryState3(e, case_id) }}
                  />}
                </Grid>
              </Grid>
            </Grid>
            <Grid className="flowInfoInr2">
              <Grid className="dtlCntUpr">
                <Grid className="dtlCntLft">
                  <Grid className="dtlCount dtlCountRm">
                    <a className="taskHover">
                      <span>{Ward}</span>
                      <img
                        src={require("assets/virtual_images/square.png")}
                        alt=""
                        title=""
                      />
                      {quote.wards?.ward_name}
                    </a>
                    <a className="taskHover">
                      <span>{Room}</span>
                      <img
                        src={require("assets/virtual_images/room.svg")}
                        alt=""
                        title=""
                      />
                      {quote.rooms?.room_name}
                    </a>
                    <a className="taskHover">
                      <span>{Bed}</span>
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
                    <a className="taskHover">
                      <span>{Tasks}</span>
                      <img
                        src={require("assets/virtual_images/rightIcon.png")}
                        alt=""
                        title=""
                      />
                      {quote.done_task ? quote.done_task : 0}/{quote.total_task ? quote.total_task : 0}
                    </a>
                    <a className="addSec taskHover" onClick={() => { quote?.verifiedbyPatient && this.props.MovetoTask(quote.speciality, quote?.patient_id) }}>
                      <span>{AddTask}</span>
                      <img
                        src={require("assets/virtual_images/plusIcon.png")}
                        alt=""
                        title=""
                      />
                    </a>
                    <a className="taskHover">
                      <span>{Comments}</span>
                      <img
                        src={require("assets/virtual_images/note1.png")}
                        alt=""
                        title=""
                      />
                      {quote.total_comments ? quote.total_comments : 0}
                    </a>
                  </Grid>
                </Grid>
                <Grid className="dtlCntRght">
                  <Assigned assigned_to={quote.assinged_to} />
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
                    {this.props.quote?.status === 1 && <span className="err_message">{PatientInInvoice}</span>}
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                    <Grid className="cardioArea" >
                      <Grid className="tasklistName"><S3Image imgUrl={this.props.quote?.patient?.image} /></Grid>
                      <Grid onClick={() => { quote?.verifiedbyPatient && this.props.moveDetial(this.props.quote.patient_id, this.props.quote._id) }}>
                        <label>
                          {quote.patient?.first_name} {quote.patient?.last_name}
                        </label>
                        <p>{quote.patient?.alies_id}</p>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={4} lg={3} className="cardoLblWeb">
                    <SpecialityButton
                      label={quote?.speciality?.specialty_name}
                      backgroundColor={quote?.speciality?.background_color}
                      viewImage={false}
                      color={quote?.speciality?.color}
                      onClick={() => this.setSpeciality()}
                      showActive={false}
                    />
                    {this.props.quote?.status === 1 && <span className="err_message">{PatientInInvoice}</span>}
                  </Grid>
                  <Grid item xs={12} md={4} lg={6}>
                    <Grid className="wardInfo">
                      <a className="wardNum taskHover"><span>{Ward}</span><img src={require('assets/virtual_images/square.png')} alt="" title="" /><label>{quote.wards?.ward_name}</label></a>
                      <a className="roomNum taskHover"><span>{Room}</span><img src={require('assets/virtual_images/room.svg')} alt="" title="" /><label>{quote.rooms?.room_name}</label></a>
                      <a className="bedNum taskHover"><span>{Bed}</span><img src={require('assets/virtual_images/bed2.png')} alt="" title="" /><label>{quote.bed}</label></a>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={3} lg={2} className="cardoLblWeb">

                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Grid className="cardioData">
                  <Grid className="infoDoc">
                    <a className="rghtHalf taskHover">
                      <span>{Tasks}</span>
                      <img
                        src={require("assets/virtual_images/rightIcon.png")}
                        alt=""
                        title=""
                      />
                      {quote.done_task ? quote.done_task : 0}/{quote.total_task ? quote.total_task : 0}
                    </a>
                    <a className="addSec taskHover" onClick={() => { quote?.verifiedbyPatient && this.props.MovetoTask(quote.speciality, quote?.patient_id) }}>
                      <span>{AddTask}</span>
                      <img
                        src={require("assets/virtual_images/plusIcon.png")}
                        alt=""
                        title=""
                      />
                    </a>
                    <a className="notePoint taskHover">
                      <span>{Comments}</span>
                      <img
                        src={require("assets/virtual_images/note.png")}
                        alt=""
                        title=""
                      />
                      {quote.total_comments ? quote.total_comments : 0}
                    </a>
                  </Grid>
                  <Grid className="cardioList">
                    <Assigned assigned_to={quote.assinged_to} />
                  </Grid>
                  <Grid>
                    {quote?.verifiedbyPatient && <CasesMoreButton
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
                      updateEntryState3={(e, case_id) => { this.props.updateEntryState3(e, case_id) }}
                    />}
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
