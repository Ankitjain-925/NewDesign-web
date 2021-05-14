import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import {
  getLanguage
} from "translations/index"
class Condition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
      Forview: this.props.Forview,
    };
  }

  //On Pain Change Change
  onPainChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.value &&
      this.props.value !== "NaN" &&
      prevProps.value !== this.props.value &&
      this.props.Forview
    ) {
      this.setState({ value: this.props.value });
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextState.value !== this.state.value && this.state.value !== "NaN") ||
      (nextProps.value !== this.props.value && this.props.value !== "NaN")
    );
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { Conditions, profilesettings } = translate;
    return (
      <div>
        <Grid className="condIntencty">
          <Grid>
            <label>{Conditions}</label>
          </Grid>
          {this.state.Forview && (
            <Grid>
              {this.state.value > 90 && this.state.value <= 100 && (
                <a>
                  <img
                    src={require("assets/images/nopain.svg")}
                    alt=""
                    title=""
                  />
                  {this.state.value}
                </a>
              )}
              {this.state.value > 70 && this.state.value <= 90 && (
                <a>
                  <img
                    src={require("assets/images/mild.svg")}
                    alt=""
                    title=""
                  />{" "}
                  {this.state.value}
                </a>
              )}
              {this.state.value > 50 && this.state.value <= 70 && (
                <a>
                  <img
                    src={require("assets/images/moderate.svg")}
                    alt=""
                    title=""
                  />
                  {this.state.value}
                </a>
              )}
              {this.state.value > 30 && this.state.value <= 50 && (
                <a>
                  <img
                    src={require("assets/images/severe.svg")}
                    alt=""
                    title=""
                  />
                  {this.state.value}
                </a>
              )}
              {this.state.value > 10 && this.state.value <= 30 && (
                <a>
                  <img
                    src={require("assets/images/veryServere.svg")}
                    alt=""
                    title=""
                  />
                  {this.state.value}
                </a>
              )}
              {this.state.value >= 0 && this.state.value <= 10 && (
                <a>
                  <img
                    src={require("assets/images/worst.svg")}
                    alt=""
                    title=""
                  />
                  {this.state.value}
                </a>
              )}
            </Grid>
          )}
          {this.state.Forview && (
            <Grid>
              {" "}
              <input
                disabled
                name={this.props.name}
                value={this.state.value}
                type="range"
                onChange={this.onPainChange}
              />
            </Grid>
          )}
          {!this.state.Forview && (
            <Grid>
              <a>{this.state.value}</a>
            </Grid>
          )}
          {!this.state.Forview && (
            <Grid>
              {" "}
              <input
                name={this.props.name}
                value={this.state.value}
                type="range"
                onChange={this.onPainChange}
              />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Condition))
);
