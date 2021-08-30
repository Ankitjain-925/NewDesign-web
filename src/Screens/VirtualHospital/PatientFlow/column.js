import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./primatives/quote-list";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {DebounceInput} from 'react-debounce-input';
 
export default class Column extends Component {

  state = {
    title : this.props.title,
    quotes : this.props.quotes,
    index : this.props.index,
  };

  boardRef;

  componentDidUpdate = (prevProps) => {
    if (prevProps.title !== this.props.title || prevProps.quotes !== this.props.quotes || prevProps.index !== this.props.index) {
      this.setState({title: this.props.title, quotes: this.props.quotes, index: this.props.index});
    }
  };

  render() {
    const title = this.props.title;
    const quotes = this.props.quotes;
    const index = this.props.index;

    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div isDragging={snapshot.isDragging}>
              <Grid isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}>
                {this.props.view ==='vertical' ? 
                <div className="checkDots" >
                  <Grid>{this.props.edit===index ? 
                    <DebounceInput
                      name="step_name"
                      forceNotifyByEnter={true}
                      forceNotifyOnBlur={true}
                      minLength={0}
                      debounceTimeout={5000}
                      onChange={e => this.props.onChange(e)}
                    />
                    : <label onDoubleClick={()=>this.props.editName(index)}>{title}</label>}
                  </Grid>
                  <Grid className="checkDotsRght">
                    <a className="academy_ul stepTdotupper">
                        <img src={require('assets/images/threedots.jpg')} alt="" title="" className="academyDots stepTdot" />
                      <ul>
                            <li><a><span><img src={require('assets/images/admin/details1.svg')} alt="" title="" /></span>{}</a></li>
                            <li><a><span><img src={require('assets/images/admin/restoreIcon.png')} alt="" title="" /></span>{}</a></li>
                            <li>
                                <a>
                                    <span>
                                    <img
                                        src={require("assets/images/admin/details1.svg")}
                                        alt=""
                                        title=""
                                    />
                                    </span>
                                    {}
                                </a>
                                </li>
                            <li><a onClick={()=>{this.props.DeleteStep(index)}}><span><img src={require('assets/images/admin/delIcon.png')} alt="" title="" /></span>{"Delete step"}</a></li>
                        </ul>
                    </a>
                    {/* <img src={require('assets/virtual_images/threeDots.png')} alt="" title="" /> */}
                  </Grid>
                </div>:
                <Grid className="receLbl">
                  <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={12} sm={6} md={6}><label>{title}</label></Grid>
                      <Grid item xs={12} sm={6} md={6} className="addPatent">
                          <a className="addNwPatnt" onClick={()=>{this.props.openAddPatient()}}>+ Add a new patient</a>
                          <a><img src={require('assets/virtual_images/threeDots2.png')} alt="" title="" /></a>
                      </Grid>
                  </Grid>
                </Grid>
              }
              </Grid>
            </div>
              <QuoteList
                listId={title}
                listType="QUOTE"
                style={{
                  backgroundColor: snapshot.isDragging ? 
                  "#baf": null
                }}
                view={this.props.view}
                quotes={quotes}
                internalScroll={this.props.isScrollable}
                isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              />
             {this.props.view==='vertical' && <Grid className="nwPatentAdd"><Button onClick={()=>{this.props.openAddPatient()}}>+ Add a new patient</Button></Grid>}
          </div>
        )}
      </Draggable>
    );
  }
}
