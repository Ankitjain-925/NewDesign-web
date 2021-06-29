import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialityname: this.props.name,
      label: this.props.label,
      color: this.props.color
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
      // <p onClick={()=>{this.Onclick2('1')}}> hii {this.props.name}</p>

      <Grid>
        <Grid className="rrSysto">
          <Grid className="rrInput">
            <Grid><label>{this.state.label}</label></Grid>
            <input
              type="text" placeholder="Enter Speciality name"
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