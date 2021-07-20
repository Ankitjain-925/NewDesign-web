import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { pure } from "recompose";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialityname: this.props.name,
      label: this.props.label,
      placeholder: this.props.placeholder
    };
  }

  onDataChange = (e) => {
    this.props.onChange(e)
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.value !== this.state.value || nextState.specialityname !== this.state.specialityname ||
      nextProps.value !== this.props.value || nextProps.specialityname !== this.props.specialityname ||
      nextState.label !== this.state.label || nextState.placeholder !== this.state.placeholder ||
      nextProps.label !== this.props.label || nextProps.placeholder !== this.props.placeholder 
    );
  }
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

export default pure(Index);