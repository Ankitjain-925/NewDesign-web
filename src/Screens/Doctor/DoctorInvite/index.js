import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import Loader from "Screens/Components/Loader/index.js";
import { LanguageFetchReducer } from "Screens/actions";
import Modal from "@material-ui/core/Modal";
import sitedata from "sitedata";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { getLanguage } from "translations/index"
import { commonHeader } from "component/CommonHeader/index";


const createOption = (label) => ({
  label,
  value: label,
});

const components = {
  DropdownIndicator: null,
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addtopatientlist: false,
      searchName: [],
      loaderImage: false,
      UpDataDetails: [],
      inputValue: "",
      value: [],
      messageMissing: false,
      emailMissing: false,
      invitation: {},
      success: false,
    };
  }

  //For loggedout if logged in user is deleted
  componentDidMount() {
    // this.props.Settings(this.props.stateLoginValueAim.token);
    this.getUserData();
  }

  getUserData() {
    this.setState({ loaderImage: true, UpDataDetails: [] });
    let user_token = this.props.stateLoginValueAim.token;
    let user_id = this.props.stateLoginValueAim.user._id;
    axios
      .get(sitedata.data.path + "/UserProfile/Users/" + user_id, commonHeader(user_token))
      .then((response) => {
        this.setState({ loaderImage: false });

        this.setState({
          UpDataDetails: response.data.data,
          city: response.data.data.city,
          area: response.data.data.area,
          profile_id: response.data.data.profile_id,
        });
      })
      .catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

  sentmail = () => {
    const { invitation } = this.state;

    this.setState({ loaderImage: true, nv: false });
    let user_token = this.props.stateLoginValueAim.token;
    if (
      invitation &&
      this.state.invitation.emails &&
      this.state.invitation.emails.length > 0 &&
      this.state.invitation.messages &&
      this.state.invitation.messages !== ""
    ) {
      axios
        .post(
          sitedata.data.path +
            "/UserProfile/AskPatient1/" +
            this.state.invitation.emails,
          {
            email: this.state.invitation.emails,
            message: this.state.invitation.messages,
            first_name: this.state.UpDataDetails.first_name
              ? this.state.UpDataDetails.first_name
              : "",
            last_name: this.state.UpDataDetails.last_name
              ? this.state.UpDataDetails.last_name
              : "",
            lan: this.props.stateLanguageType,
          },
          commonHeader(user_token)
        )
        .then((response) => {
          this.setState({ loaderImage: false });
          if (response.data.hassuccessed) {
            this.setState({ sentmessages: true });
            setTimeout(
              function () {
                this.setState({ sentmessages: false });
                this.handleCloseInvt();
              }.bind(this),
              3000
            );
          }
        });
    } else if (
      (invitation && !this.state.invitation.emails) ||
      this.state.invitation.emails.length == 0
    ) {
      this.setState({ emailMissing: true });
    } else if (
      (invitation && !this.state.invitation.messages) ||
      this.state.invitation.messages !== ""
    ) {
      this.setState({ messageMissing: true });
    }
  };

  validateEmail = (elementValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };

  invitationState = (e) => {
    var state = this.state.invitation;
    state[e.target.name] = e.target.value;
    this.setState({ invitation: state });
  };

  handleChange = (value, actionMeta) => {
 
    var value = value;
    if (
      value &&
      value.target &&
      value.target.value &&
      typeof value.target.value === "string" &&
      value.target.value !== ""
    ) {
      if (this.state.value && this.state.value.length > 0) {
        value = [
          ...this.state.value,
          { label: value.target.value, value: value.target.value },
        ];
      } else {
        value = [{ label: value.target.value, value: value.target.value }];
      }
    } else {
      if (Array.isArray(value)) {
        value = value;
      } else if(value === null){
        value = [];
      }else {
        value = [ ...this.state.value];
      }
    }
    var state = this.state.invitation;
    if (value && value.length > 0) {
      value.map((data) => {
        if (state["emails"]) state["emails"].push(data.value);
        else state["emails"] = [data.value];
      });
    } else {
      state["emails"] = [];
    }

    // if(state['emails']){state['emails'] = value}

    this.setState({ value, invitation: state });
  };

  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event) => {
    const { inputValue, value, invitation } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
        if (this.validateEmail(inputValue)) {
          var state = this.state.invitation;
          if (state["emails"]) {
            state["emails"] = [...state["emails"], ...[inputValue]];
          } else {
            state["emails"] = [inputValue];
          }

          this.setState({
            invitation: state,
            nv: false,
            inputValue: "",
            value: [...value, createOption(inputValue)],
            emailMissing: false,
          });
        } else {
          this.setState({ nv: true });
        }
        event.preventDefault();
      case "Tab":
        if (this.validateEmail(inputValue)) {
          var state = this.state.invitation;
          if (state["emails"]) {
            state["emails"] = [...state["emails"], ...[inputValue]];
          } else {
            state["emails"] = [inputValue];
          }

          this.setState({
            invitation: state,
            nv: false,
            inputValue: "",
            value: [...value, createOption(inputValue)],
            emailMissing: false,
          });
        } else {
          this.setState({ nv: true });
        }
        event.preventDefault();
    }
  };

  handleOpenInvt = () => {
    this.props.handleOpenInvt();
    // this.setState({ openInvt: true });
  };
  handleCloseInvt = () => {
    this.props.handleCloseInvt();
    // this.setState({ openInvt: false });
  };

  render() {
    const { openInvt } = this.props;
    const { inputValue, value } = this.state;

    let translate = getLanguage(this.props.stateLanguageType)
    let {
      Invitationsuccessfully,
      Entermessage,
      type_email_press_enter,
      send_invite,
      Enteremailfirst,
      invite_doc_to,
      u_can_enter_mul_email,
      who_would_u_like_invite,
      new_rqst,
      time_slot_alredy_booke_calender,
      office_visit,
      vdo_call,
      Details,
      Questions,
      or,
      slct_a_time,
      date_of_appointment,
    } = translate;

    return (
      <Grid item xs={12} md={1} className="MenuLeftUpr ">
        {this.state.loaderImage && <Loader />}
        <Modal
          open={openInvt}
          onClose={this.handleCloseInvt}
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
              ? "darkTheme"
              : ""
          }
        >
          <Grid className="invtBoxCntnt">
            <Grid className="invtCourse">
            <Grid container direction="row" justify="center">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container direction="row" justify="center">
                    <Grid item xs={8} md={8} lg={8}>
                      <label>{invite_doc_to} AIS</label>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <Grid>
                        <Grid className="entryCloseBtn">
                        <a onClick={this.handleCloseInvt}>
                            <img
                              src={require("assets/images/close-search.svg")}
                              alt=""
                              title=""
                            />
                          </a>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
              {/* <Grid className="invtCloseBtn">
                <a onClick={this.handleCloseInvt}>
                  <img
                    src={require("assets/images/close-search.svg")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
             
              <Grid>
                <label>{invite_doc_to} AIS</label>
              </Grid> */}
              {this.state.emailMissing && (
                <div className="err_message"> {Enteremailfirst}</div>
              )}
              {this.state.messageMissing && (
                <div className="err_message"> {Entermessage}</div>
              )}
              {this.state.sentmessages && (
                <div className="success_message">{Invitationsuccessfully}</div>
              )}
              <p>{u_can_enter_mul_email}</p>
            </Grid>
            <Grid className="invitLinkUpr">
              <Grid className="invitLinkInfo">
                <Grid>
                  <label>{who_would_u_like_invite}</label>
                </Grid>
                <Grid>
                  <CreatableSelect
                    inputValue={inputValue}
                    components={components}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    onBlur={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    placeholder={type_email_press_enter}
                    value={value}
                  />
                </Grid>
              </Grid>
              <Grid className="invitLinkArea">
                <Grid>
                  <label>{who_would_u_like_invite}</label>
                </Grid>
                <Grid>
                  <textarea
                    name="messages"
                    onChange={this.invitationState}
                  ></textarea>
                </Grid>
              </Grid>
              <Grid className="invitLinkSub">
                <input
                  type="submit"
                  value={send_invite}
                  onClick={this.sentmail}
                />
              </Grid>
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;

  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);
