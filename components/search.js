import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text, StyleSheet } from "react-native";

const Search = (props) => {
  const API_KEY = "AIzaSyC_kRxUGZMpYA361uWGeGohZW5PYqCoj4k";

  let places = null;
  if (props.Region) {
    places = (
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: API_KEY,
          language: "en",
          components: "country: india",
          radius: 10000,
          location: `${props.Region.latitude}, ${props.Region.longitude}`,
        }}
        styles={{
          container: {
            position: "absolute",
            top: 20,
            width: "90%",
            zIndex: 1,
            alignSelf: "center",
          },
          listView: { backgroundColor: "white" },
        }}
      />
    );
  }
  return <View>{places}</View>;
};

const style = StyleSheet.create({
  searchContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
