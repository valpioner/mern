import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import classnames from "classnames";
import PropTypes from "prop-types";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      errorMessage: '',
      lat: null,
      long: null,
      isGeocoding: false
    };
  }

  handleChange = address => {
    this.setState({
      address,
      lat: null,
      long: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          lat,
          long: lng,
          isGeocoding: false,
        });
        this.props.onSelect(this.state);
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      lat,
      long,
      isGeocoding,
    } = this.state;

    return (
      <PlacesAutocomplete
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
        shouldFetchSuggestions={address.length > 1}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="places-autocomplete">
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control form-control',
              })}
            />
            {suggestions.length > 0 && (
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = classnames('suggestion-item', {
                    'suggestion-item--active': suggestion.active,
                  });
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <strong>
                        {suggestion.formattedSuggestion.mainText}
                      </strong>{' '}
                      <small>
                        {suggestion.formattedSuggestion.secondaryText}
                      </small>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

LocationSearchInput.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default LocationSearchInput;