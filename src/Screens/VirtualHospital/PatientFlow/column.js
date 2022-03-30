import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./primatives/quote-list";
import Grid from '@material-ui/core/Grid';
import styled from "@emotion/styled";
import { DebounceInput } from 'react-debounce-input';
import { getLanguage } from "translations/index";
import { grid, borderRadius } from "./constants";
import Button from '@material-ui/core/Button';
import Title from "./primatives/title";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging && "#00abaf"};
`;

export default class Column extends Component {

  constructor(props) {
    super(props);

    // Creating a reference
    this.box = React.createRef();
    this.list = React.createRef();
  }
  state = {
    title: this.props.title,
    quotes: this.props.quotes,
    index: this.props.index,
    inneerSec: false,
    edit: this.props.edit
  };

  boardRef;

  componentDidUpdate = (prevProps) => {
    if (prevProps.title !== this.props.title || prevProps.quotes !== this.props.quotes || prevProps.index !== this.props.index) {
      this.setState({ title: this.props.title, quotes: this.props.quotes, index: this.props.index });
    }
  };

  componentDidMount() {
    // Adding a click event listener
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    if (this?.box && !this.box?.current?.contains(event.target) && this?.list && !this.list?.current?.contains(event.target)) {
      this.setState({ edit: false })
    }
  }

  onChange = (e) => {
    this.props.onChange(e)
  }

  render() {
    const title = this.props.title;
    const quotes = this.props.quotes;
    const index = this.props.index;
    let translate = getLanguage(this.props.stateLanguageType);
    let { AddPatientStep, renameStep, MoveAll, move_all_patients, move_step, AddNewPatient, deleteStep } = translate;
    {console.log('this.props.quotes;', this.props.quotes)}
    return (
      <div className="detailInfo">
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps} className="innerdivfordrag">
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
              >
                {this.props.view === 'vertical' ?


                  <div className="checkDots" >
                    <Grid>
                      {this.state.edit === index ?
                        <div ref={this.box}>
                          <DebounceInput
                            name="step_name"
                            forceNotifyByEnter={true}
                            forceNotifyOnBlur={true}
                            minLength={0}
                            debounceTimeout={4000}
                            onChange={e => this.onChange(e)}
                            value={title}
                            className="stepchange-input"
                          />
                        </div>
                        : <label onDoubleClick={() => { this.setState({ edit: index }) }}>{title?.substr(0, 12)} {title.length > 12 && <>...</>}</label>}
                    </Grid>
                    <Grid className="checkDotsRght">
                      <a className="academy_ul stepTdotupper">
                        <img src={require('assets/images/three_dots_t.png')} alt="" title="" className="academyDots stepTdot" />
                        <ul>
                          {!this.state.inneerSec && <Grid>
                            <li ref={this.list}><a onClick={() => { this.setState({ edit: index }) }}><span></span>{renameStep}</a></li>
                            <li><a onClick={() => { this.props.openAddPatient(title) }}><span><img src={require('assets/virtual_images/plusIcon.png')} alt="" title="" /></span>{AddPatientStep}</a></li>
                            <li><a onClick={() => { this.setState({ inneerSec: "step_move" }) }}><span>
                              {/* <img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /> */}
                            </span>{move_step}</a></li>
                            <li><a onClick={() => { this.setState({ inneerSec: "move_all" }) }}><p className="more-change-staff-img"><span>
                              {/* <img src={require("assets/images/admin/details1.svg")} alt="" title="" /> */}
                            </span><p className="more-change-staff-img2">{MoveAll}<img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" /></p></p> </a></li>
                            <li><a onClick={() => { this.props.DeleteStep(index) }}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{deleteStep}</a></li>
                          </Grid>}
                          {this.state.inneerSec === 'move_all' &&
                            <div>
                              <Grid className="movHead">
                                <Grid onClick={() => this.setState({ inneerSec: false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                <Grid className="movHeadMid"><label>{move_all_patients}</label></Grid>
                                <Grid className="movHeadRght"><a onClick={() => this.setState({ inneerSec: false })}><img src={require('assets/images/close-search.svg')} alt="" title="" /></a></Grid>
                              </Grid>
                              <Grid className="positionDrop">
                                {this.props.ordered?.length > 0 && this.props.ordered.map((item) => (
                                  <Grid><label onClick={() => { this.props.moveAllPatient(item, index, quotes) }}>{item} {title === item ? <>(current)</> : ''}</label></Grid>
                                ))}
                              </Grid>
                            </div>
                          }
                          {this.state.inneerSec === 'step_move' &&
                            <div>
                              <Grid className="movHead">
                                <Grid onClick={() => this.setState({ inneerSec: false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                <Grid className="movHeadMid"><label>{move_step}</label></Grid>
                                <Grid className="movHeadRght"><a onClick={() => this.setState({ inneerSec: false })}><img src={require('assets/images/close-search.svg')} alt="" title="" /></a></Grid>
                              </Grid>
                              <Grid className="positionDrop">
                                {this.props.ordered?.length > 0 && this.props.ordered.map((item, index1) => (
                                  <Grid><label onClick={() => { this.props.moveStep(index1, index, item) }}>{index1}</label></Grid>
                                ))}
                              </Grid>
                            </div>
                          }
                        </ul>
                      </a>
                      {/* <img src={require('assets/virtual_images/threeDots.png')} alt="" title="" /> */}
                    </Grid>
                  </div>
                  :
                  <Grid className="receLbl">
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={12} sm={6} md={6}><label>
                        <Grid>{this.state.edit === index ?
                          <div ref={this.box}>
                            <DebounceInput
                              name="step_name"
                              forceNotifyByEnter={true}
                              forceNotifyOnBlur={true}
                              minLength={0}
                              debounceTimeout={4000}
                              onChange={e => this.onChange(e)}
                              value={title}
                              className="stepchange-input"
                            />
                          </div>
                          : <label onDoubleClick={() => { this.setState({ edit: index }) }}>{title?.substr(0, 12)} {title.length > 12 && <>...</>}</label>}
                        </Grid></label></Grid>
                      <Grid item xs={12} sm={6} md={6} className="addPatent">
                        <a className="addNwPatnt" onClick={() => { this.props.openAddPatient(title) }}>{AddNewPatient}</a>
                        <Grid className="checkDotsRght">
                          <a className="academy_ul stepTdotupper">
                            <img src={require('assets/images/three_dots_t.png')} alt="" title="" className="academyDots stepTdot" />
                            <ul>
                              {!this.state.inneerSec && <Grid>
                                <li ref={this.list}><a onClick={() => { this.setState({ edit: index }) }}><span></span>{renameStep}</a></li>
                                <li><a onClick={() => { this.props.openAddPatient(title) }}><span><img src={require('assets/virtual_images/plusIcon.png')} alt="" title="" /></span>{AddPatientStep}</a></li>
                                <li><a onClick={() => { this.setState({ inneerSec: "step_move" }) }}><span>
                                  {/* <img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /> */}
                                </span>{move_step}</a></li>
                                <li><a onClick={() => { this.setState({ inneerSec: "move_all" }) }}><p className="more-change-staff-img"><span>
                                  {/* <img src={require("assets/images/admin/details1.svg")} alt="" title="" /> */}
                                </span><p className="more-change-staff-img2">{MoveAll}<img src={require('assets/virtual_images/rightArrow.png')} alt="" title="" /></p></p> </a></li>
                                <li><a onClick={() => { this.props.DeleteStep(index) }}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{deleteStep}</a></li>
                              </Grid>}
                              {this.state.inneerSec === 'move_all' &&
                                <div>
                                  <Grid className="movHead">
                                    <Grid onClick={() => this.setState({ inneerSec: false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                    <Grid className="movHeadMid"><label>{move_all_patients}</label></Grid>
                                    <Grid className="movHeadRght"><a onClick={() => this.setState({ inneerSec: false })}><img src={require('assets/images/close-search.svg')} alt="" title="" /></a></Grid>
                                  </Grid>
                                  <Grid className="positionDrop">
                                    {this.props.ordered?.length > 0 && this.props.ordered.map((item) => (
                                      <Grid><label onClick={() => { this.props.moveAllPatient(item, index, quotes) }}>{item}</label></Grid>
                                    ))}
                                  </Grid>
                                </div>
                              }
                              {this.state.inneerSec === 'step_move' &&
                                <div>
                                  <Grid className="movHead">
                                    <Grid onClick={() => this.setState({ inneerSec: false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                    <Grid className="movHeadMid"><label>{move_step}</label></Grid>
                                    <Grid className="movHeadRght"><a onClick={() => this.setState({ inneerSec: false })}><img src={require('assets/images/close-search.svg')} alt="" title="" /></a></Grid>
                                  </Grid>
                                  <Grid className="positionDrop">
                                    {this.props.ordered?.length > 0 && this.props.ordered.map((item, index1) => (
                                      <Grid><label onClick={() => { this.props.moveStep(index1, index, item) }}>{index1}</label></Grid>
                                    ))}
                                  </Grid>
                                </div>
                              }
                            </ul>

                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>}
              </Title>
            </Header>

            <QuoteList
              ordered={this.props.ordered}
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ?
                  "#00abaf" : null
              }}
              moveDetial={(id, case_id) => this.props.moveDetial(id, case_id)}
              view={this.props.view}
              quotes={quotes}
              columns={this.props.columns}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              onDragEnd={(data) => { this.props.onDragEnd(data) }}
              setDta={(item) => this.props.setDta(item)}
              professional_id_list={this.props.professional_id_list}
              updateEntryState3={(e, case_id) => { this.props.updateEntryState3(e, case_id) }}
              MovetoTask={(speciality, patient_id) => { this.props.MovetoTask(speciality, patient_id) }}
              mode={this.props?.mode}
            />
            {this.props.view === 'vertical' && <Grid className="nwPatentAdd"><Button onClick={() => { this.props.openAddPatient(title) }}>{AddNewPatient}</Button></Grid>}
          </Container>
        )}
      </Draggable>
      </div>
    );
  }
}
