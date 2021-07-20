import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialityname: this.props.name,
      label: this.props.label,
      placeholder: this.props.placeholder
    };
  }

  // Onclick2=(name, value)=>{
  //     this.props.Onclick2('color', '#344544');
  //     this.props.Onclick2('background-color', "#453443");
  // }



  onDataChange = (e) => {
    // console.log("Data")
    this.props.onChange(e)
  };



  render() {
    return (
      <Grid>
        <Grid className="rrSysto">
          <Grid className="rrInput vhfield-add">
            <Grid><label>{this.state.label}</label></Grid>
            <input
              type="text" placeholder={this.state.placeholder}
              onChange={this.onDataChange}
              name={this.state.specialityname}
              value={this.state.value}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default Index;