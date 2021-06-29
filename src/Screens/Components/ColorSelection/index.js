import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Switch, { Case, Default } from 'react-switch-case';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialitycolor: this.props.color,
      label: this.props.label,

    };
  }


  handleSpecialityColor = () => {
    this.setState({ specialityColor: !this.state.specialityColor });
  }

  

  colorChoice() {
    console.log("Color Selected");
  }


  render() {
    return (
      <>

        <Grid>
          <Grid item xs={2} md={1}>
            <Grid className="colorBtnUpr">
              <Grid className="actvColorBtn">
                <Grid><label>{this.state.label}</label></Grid>
                <a className="actBtn" onClick={this.handleSpecialityColor}><FiberManualRecordIcon />
                  {this.state.specialityColor &&
                    <ul className="subSpclList">
                      <label>Speciality color</label>
                      <li><a className="recodRed"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodLghtRed"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodYelow"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodGren"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodDrkGren"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodBlue1"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodBlue2"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodBlue3"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodBlue4"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodViolet"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodLghtViolet"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
                      <li><a className="recodBlck"><FiberManualRecordIcon onClick={() => this.colorChoice()} /></a></li>
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