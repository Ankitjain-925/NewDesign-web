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
import {
  getLanguage
} from "translations/index"
class PointPain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHouse: this.props.openHouse,
      alredyExist: this.props.alredyExist,
      current_user: this.props.current_user,
      Housesoptions: this.props.Housesoptions,
      currentHouses: this.props.currentHouses
    };
  }

  updateEntryState1 = (value, name)=>{
    this.props.updateEntryState1(value);
  }
  //on adding new data
  componentDidUpdate = (prevProps) => {
    if (prevProps.openHouse !== this.props.openHouse || prevProps.alredyExist !== this.props.alredyExist || prevProps.current_user !== this.props.current_user || 
        prevProps.Housesoptions !== this.props.Housesoptions) {
      this.setState({ openHouse: this.props.openHouse, alreadyExist : this.props.alredyExist, currentHouses: this.props.currentHouses,
        current_user : this.props.current_user, Housesoptions : this.props.Housesoptions});
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
  componentDidMount = () => {};
  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      
    } = translate;
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
          <Grid className="addSpeclLbl">
            <Grid className="addSpeclClose">
              <a onClick={this.props.closeHouse}>
                <img
                  src={require("assets/virtual_images/closefancy.png")}
                  alt=""
                  title=""
                />
              </a>
            </Grid>
            <Grid>
              <label>Assign House</label>
            </Grid>
          </Grid>
          <Grid className="enterSpclUpr">
            <Grid className="enterSpclMain">
              <Grid className="enterSpcl">
                <Grid container direction="row">
                  {this.state.alredyExist && (
                    <div className="err_message">
                      House is already exist to admin staff
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
                  <Grid item xs={10} md={12}>
                      <b>Assigned Houses -</b>
                      <Grid container direction="row">
                          {console.log('this.state.current_user', this.state.current_user)}
                          {this.state.current_user?.houses?.length>0 && this.state.current_user?.houses.map((item)=>(
                          <>
                           <Grid item xs={10} md={10}>
                                {item.group_name} - {item.label} ({item.value})
                            </Grid>
                            <Grid item xs={2} md={2}>
                                <a className="delet-house" onClick={()=>{this.props.deleteHouse(item.value)}}>Delete</a>
                            </Grid>
                          </>
                          ))}
                    </Grid>
                  </Grid>
                    
                
                <Grid className="spclSaveBtn saveNclose">
                  <Button onClick={()=>this.props.SaveAssignHouse()}>Save</Button>
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
