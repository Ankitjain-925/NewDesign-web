import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./primatives/quote-list";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { DebounceInput } from 'react-debounce-input';
import { getLanguage } from "translations/index"

export default class Column extends Component {

  constructor(props) {
    super(props);

    // Creating a reference
    this.box = React.createRef();
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
    if (this?.box && !this.box?.current?.contains(event.target)) {
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
    let { move_all_patients, move_step } = translate;

    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div isDragging={snapshot.isDragging}>
              <Grid isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}>
                {this.props.view ==='vertical' ? 
                <div className="checkDots" >
                  <Grid>
                    {this.state.edit===index ? 
                    <div ref={this.box}>
                    <DebounceInput
                      name="step_name"
                      forceNotifyByEnter={true}
                      forceNotifyOnBlur={true}
                      minLength={0}
                      debounceTimeout={2000}
                      onChange={e => this.onChange(e)}
                      value={title}
                    />
                    </div>
                    : <label onDoubleClick={()=>{this.setState({edit: index})}}>{title?.substr (0, 12)} {title.length>12 && <>...</>}</label>}
                  </Grid>
                  <Grid className="checkDotsRght">
                    <a className="academy_ul stepTdotupper">
                        <img src={require('assets/images/threedots.jpg')} alt="" title="" className="academyDots stepTdot" />
                          <ul>
                            {!this.state.inneerSec && <Grid>
                            <li><a onClick={()=>{this.props.openAddPatient(title)}}><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{"Add patient to this step"}</a></li>
                            <li><a onClick={()=>{this.setState({inneerSec: "step_move"})}}><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{move_step}</a></li>
                            <li><a onClick={()=>{this.setState({inneerSec: "move_all"})}}><span><img src={require("assets/images/admin/details1.svg")} alt="" title="" /></span>{"Move All patient in this Step >"} </a></li>
                            <li><a onClick={()=>{this.props.DeleteStep(index)}}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Delete step"}</a></li>
                            </Grid>}
                            {this.state.inneerSec==='move_all' &&
                            <div>
                              <Grid className="movHead">
                                <Grid onClick={() => this.setState({ inneerSec: false })} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                <Grid className="movHeadMid"><label>{move_all_patients}</label></Grid>
                                <Grid className="movHeadRght"><a onClick={() => this.setState({ inneerSec: false })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
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
                                <Grid className="movHeadRght"><a onClick={() => this.setState({ inneerSec: false })}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
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
                  </div> :
                  <Grid className="receLbl">
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={12} sm={6} md={6}><label>
                      <Grid>{this.props.edit===index ? 
                      <div ref={this.box}>
                    <DebounceInput
                      name="step_name"
                      forceNotifyByEnter={true}
                      forceNotifyOnBlur={true}
                      minLength={0}
                      debounceTimeout={2000}
                      onChange={e => this.onChange(e)}
                      value={title}
                    />
                    </div>
                    : <label onDoubleClick={()=>{this.setState({edit: index})}}>{title?.substr (0, 12)} {title.length>12 && <>...</>}</label>}
                  </Grid></label></Grid>
                      <Grid item xs={12} sm={6} md={6} className="addPatent">
                          <a className="addNwPatnt" onClick={()=>{this.props.openAddPatient(title)}}>+ Add a new patient</a>
                          <Grid className="checkDotsRght">
                          <a className="academy_ul stepTdotupper">
                        <img src={require('assets/images/threedots.jpg')} alt="" title="" className="academyDots stepTdot" />
                          <ul>
                            {!this.state.inneerSec && <Grid>
                            <li><a onClick={()=>{this.props.openAddPatient(title)}}><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{"Add patient to this step"}</a></li>
                            <li><a onClick={()=>{this.setState({inneerSec: "step_move"})}}><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{move_step}</a></li>
                            <li><a onClick={()=>{this.setState({inneerSec: "move_all"})}}><span><img src={require("assets/images/admin/details1.svg")} alt="" title="" /></span>{"Move All patient in this Step >"} </a></li>
                            <li><a onClick={()=>{this.props.DeleteStep(index)}}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Delete step"}</a></li>
                            </Grid>}
                            {this.state.inneerSec==='move_all' &&
                            <div>
                              <Grid className="movHead">
                                    <Grid onClick={()=>this.setState({inneerSec: false})} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                    <Grid  className="movHeadMid"><label>Move All Patient</label></Grid>
                                    <Grid className="movHeadRght"><a onClick={()=>this.setState({inneerSec: false})}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                                </Grid>
                                <Grid className="positionDrop">
                                {this.props.ordered?.length>0 &&  this.props.ordered.map((item)=>(
                                    <Grid><label onClick={()=>{this.props.moveAllPatient(item, index, quotes)}}>{item}</label></Grid>
                                ))}
                                </Grid>
                            </div> 
                            }
                            {this.state.inneerSec==='step_move' &&
                            <div>
                                <Grid className="movHead">
                                    <Grid onClick={()=>this.setState({inneerSec: false})} className="movHeadLft"><a><img src={require('assets/virtual_images/arw1.png')} alt="" title="" /></a></Grid>
                                    <Grid className="movHeadMid"><label>Move Step</label></Grid>
                                    <Grid className="movHeadRght"><a onClick={()=>this.setState({inneerSec: false})}><img src={require('assets/virtual_images/closefancy.png')} alt="" title="" /></a></Grid>
                                </Grid>
                                <Grid className="positionDrop">
                                {this.props.ordered?.length>0 &&  this.props.ordered.map((item, index1)=>(
                                    <Grid><label onClick={()=>{this.props.moveStep(index1, index, item)}}>{index1}</label></Grid>
                                ))}
                                </Grid>
                            </div> 
                            }
                          </ul>
                          
                    </a>
                    </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              </Grid>
            </div>
              <QuoteList
                ordered={this.props.ordered}
                listId={title}
                listType="QUOTE"
                style={{
                  backgroundColor: snapshot.isDragging ? 
                  "#baf": null
                }}
                moveDetial={(id, case_id)=>this.props.moveDetial(id, case_id)}
                view={this.props.view}
                quotes={quotes}
                columns={this.props.columns}
                internalScroll={this.props.isScrollable}
                isCombineEnabled={Boolean(this.props.isCombineEnabled)}
                onDragEnd={(data)=>{this.props.onDragEnd(data)}}
                setDta={(item)=>this.props.setDta(item)}
                professional_id_list={this.props.professional_id_list}
                updateEntryState3={(e, case_id)=>{this.props.updateEntryState3(e, case_id)}}
                MovetoTask={(speciality, patient_id)=>{ this.props.MovetoTask(speciality, patient_id) }}
              />
             {this.props.view==='vertical' && <Grid className="nwPatentAdd"><Button onClick={()=>{this.props.openAddPatient(title)}}>+ Add a new patient</Button></Grid>}
          </div>
        )}
      </Draggable>
    );
  }
}
