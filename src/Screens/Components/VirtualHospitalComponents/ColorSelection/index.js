import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// import Switch, { Case, Default } from 'react-switch-case';

var ColorOption = [
  { color: "#EE5253;", background_color: "#FBD4D4", className:"recodRed" },
  { color: "#DB5600", background_color: "#F8DDCC", className:"recodLghtRed" },
  { color: "#DB9B00", background_color: "#F8EBCC", className:"recodYelow" },
  { color: "#BFDB00", background_color: "#F2F8CC", className:"recodGren" },
  { color: "#64DB00", background_color: " #E0F8CC", className:"recodDrkGren" },
  { color: "#00DBA4", background_color: "#CCF8ED", className:"recodBlue1" },
  { color: "#00B0DB", background_color: "#B4ECF8", className:"recodBlue2" },
  { color: "#00B0DB", background_color: "#B4ECF8", className:"recodBlue3" },
  { color: "#2000DB", background_color: " #D2CCF8", className:"recodBlue4" },
  { color: "#8C00DB", background_color: "#ECCAFF", className:"recodViolet" },
  { color: "#DB00C6", background_color: "#F8CCF4", className:"recodLghtViolet" },
  { color: "#1F2121", background_color: "#C7C7C7", className:"recodBlck" },
];

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialitycolor: this.props.color,
      label: this.props.label,
      className: this.props.name,
      color: this.props.color || '#EE5253',
      background_color : this.props.background_color || '#FBD4D4',

    };
  }

  componentDidUpdate = (prevProps) => {
      if(prevProps.color !== this.props.color || prevProps.background_color !== this.props.background_color)
      {
        this.setState({color : this.props.color, background_color : this.props.background_color})
      }
  };


  handleSpecialityColor = () => {
    this.setState({ specialityColor: !this.state.specialityColor });
  }
  
  colorChoice(index) {
    this.setState({color : ColorOption[index]?.color, background_color : ColorOption[index]?.background_color})
    this.props.updateEntryState1('color', ColorOption[index]?.color)
    this.props.updateEntryState1('background_color', ColorOption[index]?.background_color)
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
                 className={"actBtn"}
                 style={{color: this.state.color, backgroundColor: this.state.background_color}} 
                 onClick={this.handleSpecialityColor}><FiberManualRecordIcon 
                 onChange={this.onDataChange}
                 />
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