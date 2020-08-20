/* global google */
import React from "react";
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.searchCity = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
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

  

  render() {
    let search_city = "search"
    // if (this.props.stateLanguageType === 'de') {
    //   search_city=translationDE.text.search_city
    // }
    
    // else if (this.props.stateLanguageType === 'pt') {
    //   search_city=translationPT.text.search_city
    // }
    
    // else if (this.props.stateLanguageType === 'nl') {
    //   search_city=translationNL.text.search_city
    // }
    
    // else if (this.props.stateLanguageType === 'ch') {
    //   search_city=translationCH.text.search_city
    // }
    
    // else if (this.props.stateLanguageType === 'rs') {
    //   search_city=translationRS.text.search_city
    // }
    
    // else if (this.props.stateLanguageType === 'sp') {
    //   search_city=translationSP.text.search_city
    // }
    
    // else {
    //   search_city=translationEN.text.search_city
    // }
    return (
      <input
        ref={this.autocompleteInput}
        id="searchCity"
        name="searchCity"
        className="admin_textbox2"
        placeholder={search_city}
        value={this.props.value}
        type="text"
       
      />
    );
  }
}

export default Autocomplete;

