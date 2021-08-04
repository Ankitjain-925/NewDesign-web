import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// import Switch, { Case, Default } from 'react-switch-case';

var ColorOption = [
  { color: "#EE5253;", backgroundcolor: "#FBD4D4", className:"recodRed" },
  { color: "#DB5600", backgroundcolor: "#F8DDCC", className:"recodLghtRed" },
  { color: "#DB9B00", backgroundcolor: "#F8EBCC", className:"recodYelow" },
  { color: "#BFDB00", backgroundcolor: "#F2F8CC", className:"recodGren" },
  { color: "#64DB00", backgroundcolor: " #E0F8CC", className:"recodDrkGren" },
  { color: "#00DBA4", backgroundcolor: "#CCF8ED", className:"recodBlue1" },
  { color: "#00B0DB", backgroundcolor: "#B4ECF8", className:"recodBlue2" },
  { color: "#00B0DB", backgroundcolor: "#B4ECF8", className:"recodBlue3" },
  { color: "#2000DB", backgroundcolor: " #D2CCF8", className:"recodBlue4" },
  { color: "#8C00DB", backgroundcolor: "#ECCAFF", className:"recodViolet" },
  { color: "#DB00C6", backgroundcolor: "#F8CCF4", className:"recodLghtViolet" },
  { color: "#1F2121", backgroundcolor: "#C7C7C7", className:"recodBlck" },
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialitycolor: this.props.color,
      label: this.props.label,
      className: this.props.name,
      iscolor: 'recodRed'

    };
  }

  componentDidUpdate = (prevProps) => {
    
  };


  handleSpecialityColor = () => {
    this.setState({ specialityColor: !this.state.specialityColor });
  }
  
  colorChoice(index) {
    this.setState({iscolor: ColorOption[index]?.className})
    this.props.updateEntryState1('color', ColorOption[index]?.color)
    this.props.updateEntryState1('background_color', ColorOption[index]?.backgroundcolor)
  }

  onDataChange = (className, value) => {
    // console.log("Data")
    this.props.onChange(className, value)
  };


  render() {
    return (
      <>

        <Grid>
          <Grid item xs={2} md={1}>
            <Grid className="colorBtnUpr">
              <Grid className="actvColorBtn">
                <Grid><label>{this.state.label}</label></Grid>
                <a 
                // className=""
                 className={"actBtn " +this.state.iscolor} 
                 onClick={this.handleSpecialityColor}><FiberManualRecordIcon 
                 onChange={this.onDataChange}
                 
                 value={this.state.value}/>
                  {this.state.specialityColor &&
                    <ul className="subSpclList">
                      <label>Speciality color</label>
                      <li><a className="recodRed"><FiberManualRecordIcon onClick={() => this.colorChoice(0)} /></a></li>
                      <li><a className="recodLghtRed"><FiberManualRecordIcon onClick={() => this.colorChoice(1)} /></a></li>
                      <li><a className="recodYelow"><FiberManualRecordIcon onClick={() => this.colorChoice(2)} /></a></li>
                      <li><a className="recodGren"><FiberManualRecordIcon onClick={() => this.colorChoice(3)} /></a></li>
                      <li><a className="recodDrkGren"><FiberManualRecordIcon onClick={() => this.colorChoice(4)} /></a></li>
                      <li><a className="recodBlue1"><FiberManualRecordIcon onClick={() => this.colorChoice(5)} /></a></li>
                      <li><a className="recodBlue2"><FiberManualRecordIcon onClick={() => this.colorChoice(6)} /></a></li>
                      <li><a className="recodBlue3"><FiberManualRecordIcon onClick={() => this.colorChoice(7)} /></a></li>
                      <li><a className="recodBlue4"><FiberManualRecordIcon onClick={() => this.colorChoice(8)} /></a></li>
                      <li><a className="recodViolet"><FiberManualRecordIcon onClick={() => this.colorChoice(9)} /></a></li>
                      <li><a className="recodLghtViolet"><FiberManualRecordIcon onClick={() => this.colorChoice(10)} /></a></li>
                      <li><a className="recodBlck"><FiberManualRecordIcon onClick={() => this.colorChoice(11)} /></a></li>
                    </ul>
                  }
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


      </>
    );
  }
}
export default Index;