import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index";
class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEntry: this.props.openEntry,
      value: this.props.value,
      openBy: this.props.openBy,
    };
  }

  //For close the pop up
  handleCloseEntry = () => {
    this.props.handleCloseEntry();
  };
  // For set the value for the new entry
  handleChangeEntry = (value) => {
    this.props.onChange(value);
    this.props.handleCloseEntry();
  };
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.openEntry !== this.props.openEntry) {
      this.setState({ openEntry: this.props.openEntry });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.openEntry !== this.props.openEntry ||
      nextState.openEntry !== this.state.openEntry ||
      nextProps.openBy !== this.props.openBy
    );
  }

  componentDidMount = () => {};

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      anamnesis,
      Selectentrytype,
      blood_pressure,
      blood_sugar,
      condition_pain,
      covid_diary,
      diagnosis,
      diary,
      doc_visit,
      family_anmnies,
      file_uplod,
      hosp_visit,
      lab_result,
      VaccinationTrial,
      marcumar_pass,
      medication,
      prescription,
      secnd_openion,
      sick_cert,
      smoking_status,
      long_covid,
      vaccination,
      weight_bmi,
      respiration,
    } = translate;
    return (
      <Modal
        open={this.state.openEntry}
        onClose={this.handleCloseEntry}
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode === "dark"
            ? "darkTheme"
            : "addScrollBar"
        }
      >
        <Grid
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode === "dark"
              ? "entryBoxCntnt darkTheme addSpeclContnt"
              : "entryBoxCntnt addSpeclContnt"
          }
        >
          <Grid className="addSpeclContntIner">
            <Grid className="entryCourse">
              <Grid container direction="row" justify="center">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center">
                    <Grid item xs={8} md={8} lg={8}>
                      <label>{Selectentrytype}</label>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <Grid>
                        <Grid className="entryCloseBtn">
                          <a onClick={this.handleCloseEntry}>
                            <img
                              src={require("assets/images/close-search.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <p>Click or input number on your keyboard</p> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="checkHelth 1111">
              <Grid container direction="row">
                <Grid item xs={12} sm={6} md={6}>
                  <Grid className="checkHelthLbl 111">
                    {this.state.openBy !== "patient" && (
                      <Grid>
                        <a onClick={() => this.handleChangeEntry("anamnesis")}>
                          <span>1</span>
                          <p>{anamnesis}</p>
                        </a>
                      </Grid>
                    )}
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a
                        onClick={() => this.handleChangeEntry("blood_pressure")}
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>2</span>
                        ) : (
                          <span>1</span>
                        )}
                        <p>{blood_pressure}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("blood_sugar")}>
                        {this.state.openBy !== "patient" ? (
                          <span>3</span>
                        ) : (
                          <span>2</span>
                        )}
                        <p>{blood_sugar}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a
                        onClick={() => this.handleChangeEntry("condition_pain")}
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>4</span>
                        ) : (
                          <span>3</span>
                        )}
                        <p>{condition_pain}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("covid_19")}>
                        {this.state.openBy !== "patient" ? (
                          <span>5</span>
                        ) : (
                          <span>4</span>
                        )}
                        <p>{covid_diary}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a
                        onClick={() =>
                          this.handleChangeEntry("vaccination_trial")
                        }
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>6</span>
                        ) : (
                          <span>5</span>
                        )}
                        <p>{VaccinationTrial}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("diagnosis")}>
                        {this.state.openBy !== "patient" ? (
                          <span>7</span>
                        ) : (
                          <span>6</span>
                        )}
                        <p>{diagnosis}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("diary")}>
                        {this.state.openBy !== "patient" ? (
                          <span>8</span>
                        ) : (
                          <span>7</span>
                        )}
                        <p>{diary}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("doctor_visit")}>
                        {this.state.openBy !== "patient" ? (
                          <span>9</span>
                        ) : (
                          <span>8</span>
                        )}
                        <p>{doc_visit}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a
                        onClick={() =>
                          this.handleChangeEntry("family_anamnesis")
                        }
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>10</span>
                        ) : (
                          <span>9</span>
                        )}
                        <p>{family_anmnies}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("file_upload")}>
                        {this.state.openBy !== "patient" ? (
                          <span>11</span>
                        ) : (
                          <span>10</span>
                        )}
                        <p>{file_uplod}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    {this.state.openBy !== "patient" && (
                      <Grid>
                        <a
                          onClick={() =>
                            this.handleChangeEntry("hospitalization")
                          }
                        >
                          {this.state.openBy !== "patient" ? (
                            <span>12</span>
                          ) : (
                            <span>11</span>
                          )}
                          <p>{hosp_visit}</p>
                        </a>
                      </Grid>
                    )}
                    {this.state.openBy !== "patient" && (
                      <Grid className="clear"></Grid>
                    )}
                    {/* {this.state.openBy !=='patient' && <Grid><a onClick={()=>this.handleChangeEntry('hospitalization')}>{this.state.openBy !=='patient' ? <span>11</span>: <span>10</span> }<p>{hosp_visit}</p></a></Grid>}
                                    {this.state.openBy !=='patient' && <Grid className="clear"></Grid>} */}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Grid className="checkHelthLbl">
                    {this.state.openBy === "patient" && (
                      <Grid>
                        <a
                          onClick={() =>
                            this.handleChangeEntry("hospitalization")
                          }
                        >
                          {this.state.openBy !== "patient" ? (
                            <span>12</span>
                          ) : (
                            <span>11</span>
                          )}
                          <p>{hosp_visit}</p>
                        </a>
                      </Grid>
                    )}
                    {this.state.openBy === "patient" && (
                      <Grid className="clear"></Grid>
                    )}
                    <Grid>
                      <a
                        onClick={() =>
                          this.handleChangeEntry("laboratory_result")
                        }
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>13</span>
                        ) : (
                          <span>12</span>
                        )}
                        <p>{lab_result}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("long_covid")}>
                        {this.state.openBy !== "patient" ? (
                          <span>14</span>
                        ) : (
                          <span>13</span>
                        )}
                        <p>{long_covid}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a
                        onClick={() => this.handleChangeEntry("marcumar_pass")}
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>15</span>
                        ) : (
                          <span>14</span>
                        )}
                        <p>{marcumar_pass}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("medication")}>
                        {this.state.openBy !== "patient" ? (
                          <span>16</span>
                        ) : (
                          <span>15</span>
                        )}
                        <p>{medication}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    {this.state.openBy !== "patient" && (
                      <Grid>
                        <a
                          onClick={() => this.handleChangeEntry("prescription")}
                        >
                          {this.state.openBy !== "patient" && <span>16</span>}
                          <p>{prescription}</p>
                        </a>
                      </Grid>
                    )}
                    {this.state.openBy !== "patient" && (
                      <Grid className="clear"></Grid>
                    )}
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("respiration")}>
                        {this.state.openBy !== "patient" ? (
                          <span>18</span>
                        ) : (
                          <span>16</span>
                        )}
                        <p>{respiration}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    {this.state.openBy !== "patient" && (
                      <Grid>
                        <a
                          onClick={() =>
                            this.handleChangeEntry("second_opinion")
                          }
                        >
                          {this.state.openBy !== "patient" && <span>18</span>}
                          <p>{secnd_openion}</p>
                        </a>
                      </Grid>
                    )}
                    {this.state.openBy !== "patient" && (
                      <Grid className="clear"></Grid>
                    )}
                    {this.state.openBy !== "patient" && (
                      <Grid>
                        <a
                          onClick={() =>
                            this.handleChangeEntry("sick_certificate")
                          }
                        >
                          {this.state.openBy !== "patient" && <span>19</span>}
                          <p>{sick_cert}</p>
                        </a>
                      </Grid>
                    )}
                    {this.state.openBy !== "patient" && (
                      <Grid className="clear"></Grid>
                    )}
                    <Grid>
                      <a
                        onClick={() => this.handleChangeEntry("smoking_status")}
                      >
                        {this.state.openBy !== "patient" ? (
                          <span>21</span>
                        ) : (
                          <span>17</span>
                        )}
                        <p>{smoking_status}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("vaccination")}>
                        {this.state.openBy !== "patient" ? (
                          <span>22</span>
                        ) : (
                          <span>18</span>
                        )}
                        <p>{vaccination}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    <Grid>
                      <a onClick={() => this.handleChangeEntry("weight_bmi")}>
                        {this.state.openBy !== "patient" ? (
                          <span>23</span>
                        ) : (
                          <span>19</span>
                        )}
                        <p>{weight_bmi}</p>
                      </a>
                    </Grid>
                    <Grid className="clear"></Grid>
                    {this.state.openBy === "adminstaff" && (
                      <Grid>
                        <a onClick={() => this.handleChangeEntry("promotion")}>
                          <span>24</span>
                          <p>{"Journal Promotion"}</p>
                        </a>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
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
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(PointPain))
);
