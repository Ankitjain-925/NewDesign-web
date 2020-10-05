/* global google */
import React from "react";
import Geocode from "react-geocode";

class Autocomplete extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      city: '',
   }
    this.autocompleteInput = React.createRef();
    this.city = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);

  }

  componentDidMount() {
    this.city = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.city.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.city.getPlace();
      this.setState({ city: place.formatted_address })
      this.setState({
          area: {
              type: "Point",
              coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
          }
      })
  }

     // Search by City
     showPlaceDetails=(place)=> {
      console.log("place", place)
      place = place.geometry.location
      this.setState({ mLatitude: place.lat() });
      this.setState({ mlongitude: place.lng() });
      Geocode.enableDebug();
      Geocode.fromLatLng(this.state.mLatitude, this.state.mlongitude).then(
          response => {
              const address = response.results[0].formatted_address;
              this.setState({ city: address })
          },
          error => {
              console.error(error);
          }
      );
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
      <div>
      <input
        ref={this.autocompleteInput}
        name="city"
        className="admin_textbox2"
        placeholder={search_city}
        value={this.state.city}
        type="text"
        onPlaceChanged={this.showPlaceDetails} 
      />
      {console.log('city', this.state.city)}
      </div>
    );
  }
}

export default Autocomplete;

