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
      alredyExist: false
    };
  }

  updateEntryState1 = (value, name) => {
    this.setState({ alredyExist: false, assignedhouse: false })

    let data = this.state.current_user?.houses
    let id1 = data && data.length > 0 && data.map((item) => {
      return item && item.value
    })
    let id2 = value && value.length > 0 && value.map((item) => {
      return item && item.value;
    })
    let length1 = id1 && id1.length
    let length2 = id2 && id2.length

    for (var i = 0; i < length1; i++) {
      for (var j = 0; j < length2; j++) {

        let status = id1[i] == id2[j]
        if (status == true) {
          this.setState({ alredyExist: true })
          break;
        }
      }
    }
    this.props.updateEntryState1(value);
  }
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.openHouse !== this.props.openHouse || prevProps.alredyExist !== this.props.alredyExist || prevProps.current_user !== this.props.current_user ||
      prevProps.Housesoptions !== this.props.Housesoptions || prevProps.deleteHouses !== this.props.deleteHouses || prevProps.assignedhouse !== this.props.assignedhouse || prevProps.blankerror !== this.props.blankerror) {
      this.setState({
        openHouse: this.props.openHouse, alreadyExist: this.props.alredyExist, currentHouses: this.props.currentHouses,
        current_user: this.props.current_user, Housesoptions: this.props.Housesoptions, deleteHouses: this.props.deleteHouses, assignedhouse: this.props.assignedhouse, blankerror: this.props.blankerror
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
  componentDidMount = () => { };
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let { ManageHouse, House_assigned_to_user, House_alread_exist_to_user, Select_atleast_one_house, AssignedHouses, Delete, Save } = translate;
    return (
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
                      isMulti={true}
                    />
                  </Grid>
                  <Grid item xs={10} md={12}>
                    <b>{AssignedHouses}</b>
                    <Grid container direction="row">

                      {this.state.current_user?.houses?.length > 0 && this.state.current_user?.houses.map((item) => (
                        <>
                          <Grid item xs={10} md={10}>
                            {item.group_name} - {item.label} ({item.value})
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
