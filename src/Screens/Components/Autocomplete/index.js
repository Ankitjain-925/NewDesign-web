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
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class Autocomplete extends React.Component {
  constructor(props) {
   super(props);
    this.autocompleteInput = React.createRef();
    this.searchCity = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.state ={
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
    this.props.onPlaceChanged(place);
  }

  Onchange=(e)=>{
    this.setState({city: e.target.value})
  }
  
  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
       this.setState({city : this.props.value})
    }
}

  render() {
    let search_city = "search"
    if (this.props.stateLanguageType === 'de') {
      search_city=translationDE.text.search_city
    }
    
    else if (this.props.stateLanguageType === 'pt') {
      search_city=translationPT.text.search_city
    }
    
    else if (this.props.stateLanguageType === 'nl') {
      search_city=translationNL.text.search_city
    }
    
    else if (this.props.stateLanguageType === 'ch') {
      search_city=translationCH.text.search_city
    }
    
    else if (this.props.stateLanguageType === 'rs') {
      search_city=translationRS.text.search_city
    }
    
    else if (this.props.stateLanguageType === 'sp') {
      search_city=translationSP.text.search_city
    }
    
    else {
      search_city=translationEN.text.search_city
    }
    return (
      <div>
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
      </div>
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