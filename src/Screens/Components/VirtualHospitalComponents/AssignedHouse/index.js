import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pure } from "recompose";
import { LanguageFetchReducer } from "Screens/actions";
import SelectField from "Screens/Components/Select/index";
import Button from "@material-ui/core/Button";
import { Settings } from 'Screens/Login/setting';
import { getLanguage } from "translations/index"
import NewRole from "Screens/VirtualHospital/New Role/index";

class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHouse: this.props.openHouse,
      alredyExist: this.props.alredyExist,
      current_user: this.props.current_user,
      Housesoptions: this.props.Housesoptions,
      currentHouses: this.props.currentHouses,
      deleteHouses: this.props.deleteHouses,
      assignedhouse: this.props.assignedhouse,
      blankerror: this.props.blankerror,
      alredyExist: false,
      openHouse1: false,
      checkboxdata: this.props.checkboxdata,
      values: false
    };
  }

  updateEntryState1 = (value, name) => {
    this.setState({ alredyExist: false, assignedhouse: false, values: true })
    let data = this.state.current_user

    let id1 = value
    let current = data.houses.map((element) => {
      return element.value
    })
    let status = current.includes(id1.value)
    if (status == true) {
      this.setState({ alredyExist: true })
    }

    this.props.updateEntryState1(value, name);
  }
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.openHouse !== this.props.openHouse || prevProps.alredyExist !== this.props.alredyExist || prevProps.current_user !== this.props.current_user ||
      prevProps.Housesoptions !== this.props.Housesoptions || prevProps.deleteHouses !== this.props.deleteHouses || prevProps.assignedhouse !== this.props.assignedhouse || prevProps.blankerror !== this.props.blankerror || prevProps.checkboxdata !== this.props.checkboxdata) {
      this.setState({
        openHouse: this.props.openHouse, alreadyExist: this.props.alredyExist, currentHouses: this.props.currentHouses,
        current_user: this.props.current_user, Housesoptions: this.props.Housesoptions, deleteHouses: this.props.deleteHouses, assignedhouse: this.props.assignedhouse, blankerror: this.props.blankerror, checkboxdata: this.props.checkboxdata
      });
    }
  };
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return (
  //       nextProps.openHouse !== this.props.openHouse ||
  //       nextState.openHouse !== this.state.openHouse ||
  //       nextProps.alreadyExist !== this.props.alreadyExist ||
  //       nextState.alreadyExist !== this.state.alreadyExist ||
  //       nextProps.current_user !== this.props.current_user ||
  //       nextState.current_user !== this.state.current_user

  //     );
  //   }

  newrole = () => {
    this.setState({ openHouse1: true })
  }
  closeHouse1 = () => {
    this.setState({ openHouse1: false })

  };
  componentDidMount = () => { };
  render() {
    var { checkboxdata } = this.state
    let translate = getLanguage(this.props.stateLanguageType)
    let { ManageHouse, House_assigned_to_user, House_alread_exist_to_user, Select_atleast_one_house, AssignedHouses, Delete, Save } = translate;
    return (
      <Grid>
        <Modal
          open={this.state.openHouse}
          onClose={this.props.closeHouse}
          className={
            this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
              ? "addSpeclModel darkTheme"
              : "addSpeclModel"
          }
        >
          <Grid className="addSpeclContnt">
            <Grid className="addSpeclContntIner">
              <Grid className="addSpeclLbl">
                <Grid className="addSpeclClose">
                  <a onClick={this.props.closeHouse}>
                    <img
                      src={require("assets/images/close-search.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                </Grid>
                <Grid>
                  <label>{ManageHouse}</label>
                </Grid>
              </Grid>
              <Grid className="enterSpclUpr">
                <Grid className="enterSpclMain">
                  <Grid className="enterSpcl">
                    <Grid container direction="row">
                      {this.state.assignedhouse && (
                        <div className="success_message">
                          {House_assigned_to_user}
                        </div>
                      )}
                      {/* {this.state.deleteHouses && (
                    <div className="success_message">
                      House id deleted from the User
                    </div>
                  )} */}
                      {this.state.alredyExist && (
                        <div className="err_message">
                          {House_alread_exist_to_user}
                        </div>
                      )}
                      {this.state.blankerror && (
                        <div className="err_message">
                          {Select_atleast_one_house}
                        </div>
                      )}
                      <Grid item xs={10} md={12}>
                        <SelectField
                          isSearchable={true}
                          name="houses"
                          option={this.state.Housesoptions}
                          onChange={(e) => this.updateEntryState1(e, "houses")}
                          value={this.state.currentHouses}
                        // isMulti={true}
                        />
                      </Grid>
                      {this.state.values && <>
                        {this.state.checkboxdata && this.state.checkboxdata &&
                          <>
                            <Grid>
                             <NewRole
                              // label={this.state.checkboxdata[0].label}
                              // value={this.state.checkboxdata[0].value}
                             data={this.state.checkboxdata}
                             />
                            </Grid>
                          </>

                        }
                        </>
                      }

                       {/* {this.state.values && <>
                        {this.state.checkboxdata && this.state.checkboxdata.length>1 &&
                          <>
                            <Grid>
                             <NewRole
                              label={this.state.checkboxdata}
                              value={this.state.checkboxdata}
                             data={this.state.checkboxdata}
                             />
                            </Grid>
                          </>

                        }
                        </>
                      } */}
                      <Grid item xs={10} md={12}>
                        <b>{AssignedHouses}</b>
                        <Grid container direction="row">
                          {this.state.current_user?.houses?.length > 0 && this.state.current_user?.houses.map((item) => (
                            <>
                              <Grid item xs={10} md={10}>
                                {item.group_name} - {item.label} ({item.value})
                                {/* <Button onClick={()=>{this.newrole()}} >Next</Button> */}
                              </Grid>
                              <Grid item xs={2} md={2}>
                                <a className="delet-house" onClick={() => { this.props.deleteHouse(item.value) }}>{Delete}</a>
                              </Grid>
                            </>
                          ))}
                        </Grid>
                      </Grid>


                      <Grid className="spclSaveBtn saveNclose">
                        {this.state.alredyExist === false && (<Button onClick={() => this.props.SaveAssignHouse()}>{Save}</Button>)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Modal>
        <NewRole
          openHouse1={this.state.openHouse1}
          closeHouse1={this.closeHouse1}
        ></NewRole>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    settings,
  };
};
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer, Settings })(PointPain))
);
