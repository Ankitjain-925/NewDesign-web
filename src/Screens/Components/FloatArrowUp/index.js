import React, { Component } from "react";
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
export default class FloatArrowUp extends Component {
  constructor(props) {
    super(props);
  }
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
    let { goto_top } = translate;
    return (
      <a
        title={goto_top}
        onClick={() =>
          window.scroll({
            top: 0,
            behavior: "smooth",
          })
        }
        className="floatArrowUp"
      >
        <img
          className="arrowIcon"
          src={require("../../../assets/images/scrollUp.png")}
        />
      </a>
    );
  }
}
