/* global google */
import React from "react";
import { LanguageFetchReducer } from '../../actions';
import * as translationEN from "../../../translations/en.json"
import * as translationDE from '../../../translations/de.json';
import * as translationPT from '../../../translations/pt.json';
import * as translationSP from '../../../translations/sp.json';
import * as translationRS from '../../../translations/rs.json';
import * as translationSW from '../../../translations/sw.json';
import * as translationCH from '../../../translations/ch.json';
import * as translationNL from '../../../translations/nl.json';
import * as translationFR from '../../../translations/fr.json';
import * as translationAR from '../../../translations/ar.json';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.searchCity = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.state = {
      city: this.props.value
    }
  }

  componentDidMount() {
    this.searchCity = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.searchCity.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.searchCity.getPlace();
    this.setState({ city: place.formatted_address })
    this.props.onPlaceChanged(place);
  }

  Onchange = (e) => {
    this.setState({ city: e.target.value })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.setState({ city: this.props.value })
    }
  }

  render() {
    let translate
    switch (this.props.stateLanguageType) {
      case "en":
        translate = translationEN.text
        break;
      case "de":
        translate = translationDE.text
        break;
      case "pt":
        translate = translationPT.text
        break;
      case "sp":
        translate = translationSP.text
        break;
      case "rs":
        translate = translationRS.text
        break;
      case "nl":
        translate = translationNL.text
        break;
      case "ch":
        translate = translationCH.text
        break;
      case "sw":
        translate = translationSW.text
        break;
        case "fr":
          translate = translationFR.text
          break;
      case "ar":
          translate = translationAR.text
          break;
      default:
        translate = translationEN.text
    }
    let { search_city } = translate
    return (
      <input
        ref={this.autocompleteInput}
        id="searchCity"
        name="searchCity"
        className="admin_textbox2"
        placeholder={search_city}
        value={this.state.city}
        type="text"
        onChange={this.Onchange}

      />
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType
  }
};
export default withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Autocomplete));

