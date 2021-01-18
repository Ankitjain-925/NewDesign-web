import React, { Component } from "react";
import * as translationEN from "../../../translations/en.json";
import * as translationDE from "../../../translations/de.json";
import * as translationPT from "../../../translations/pt.json";
import * as translationSP from "../../../translations/sp.json";
import * as translationRS from "../../../translations/rs.json";
import * as translationSW from "../../../translations/sw.json";
import * as translationCH from "../../../translations/ch.json";
import * as translationNL from "../../../translations/nl.json";
import * as translationFR from "../../../translations/fr.json";
import * as translationAR from "../../../translations/ar.json";
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
