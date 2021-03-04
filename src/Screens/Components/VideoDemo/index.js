import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import {
    translationAR,
    translationSW,
    translationSP,
    translationRS,
    translationEN,
    translationNL,
    translationDE,
    translationCH,
    translationPT,
    translationFR
  } from "translations/index"

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.openPopup !== this.state.openPopup || 
      nextProps.stateLanguageType !==  this.props.stateLanguageType
    );
  }

  OpenFile = () => {
     this.setState({ openPopup: true, loaderImage: false });        
  };

  CloseFile = () => {
    this.setState({ openPopup: false });
  };

  render() {

    let translate = {};
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text;
        break;
      case "de":
        translate = translationDE.text;
        break;
      case "pt":
        translate = translationPT.text;
        break;
      case "sp":
        translate = translationSP.text;
        break;
      case "rs":
        translate = translationRS.text;
        break;
      case "nl":
        translate = translationNL.text;
        break;
      case "ch":
        translate = translationCH.text;
        break;
      case "sw":
        translate = translationSW.text;
        break;
      case "fr":
        translate = translationFR.text;
        break;
      case "ar":
        translate = translationAR.text;
        break;
      default:
        translate = translationEN.text;
    }
    let {
        view_demo
    } = translate;
    return (
      <Grid>
          <a onClick={this.OpenFile}><VideoLibraryIcon /> {view_demo}</a>
        <Modal
          open={this.state.openPopup}
          onClose={this.CloseFile}
        >
          <Grid
            className="entryBoxCntnt SetWidthPopup3"  
          >
            <Grid className="entryCourse">
              <Grid className="entryCloseBtn">
                <a onClick={this.CloseFile}>
                  <img
                    src={require("assets/images/close-search.svg")}
                    alt=""
                    title=""
                  />
                </a>
              </Grid>
            </Grid>
                <video width="100%" className="VideoPlay" controls>
                    <source src={require("assets/video/demovideos.mp4")} type="video/mp4" />
                </video>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  const { stateLoginValueAim } = state.LoginReducerAim;
  return {
    stateLanguageType,
    stateLoginValueAim,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer })(Index)
  )
);
