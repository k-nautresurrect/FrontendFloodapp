import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SetDetails from "./setdetails";
import Search from "./search";
import ForDesc from "./fordesc";
import Details from "../screens/details";

const GetDetails = (props) => {
  const API_KEY = "AIzaSyC_kRxUGZMpYA361uWGeGohZW5PYqCoj4k";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [markerContainer, setMarkerContainer] = useState([]);
  const [tempRegion, setTempRegion] = useState(null);
  const [desc, setDesc] = useState("my location");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setTempRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0422,
      });

      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0422,
      });
    })();
  }, []);

  let marker = null;
  if (tempRegion && mapRegion) {
    marker = (
      <Marker
        coordinate={mapRegion}
        title="me"
        description={desc}
        draggable={true}
        // onPress={handleDesc}
        onDragEnd={(e) => {
          setTempRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0422,
          });
        }}
      ></Marker>
    );
  }

  // use flatlist
  const getDetailsHandler = () => {
    if (marker !== null) {
      setMarkerContainer((markers) => [...markers, marker]);
    }
  };

  const getHeight = (data) => {
    console.log(data);
  };

  return (
    <View>
      {/* <Search mapRegion={mapRegion} /> */}
      {/* {places} */}
      <Search Region={mapRegion} />

      <MapView
        initialRegion={mapRegion}
        style={styles.map}
        // onLongPress={createMarker}
      >
        {markerContainer.map((marker) => marker)}
      </MapView>
      <View style={styles.buttonLocation}>
        <View style={styles.btnpallet}>
          <Button
            title="Get Location"
            buttonStyle={styles.btnstyle}
            containerStyle={styles.btncontainer}
            titleStyle={styles.btntitle}
            onPress={getDetailsHandler}
          />
          {/* {console.log(Details)} */}
          <Button
            title="Set Location"
            buttonStyle={styles.btnstyle}
            containerStyle={styles.btncontainer}
            titleStyle={styles.btntitle}
            onPress={() =>
              props.nav.navigate("details", { navigation: props.nav })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // parent container
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // positioning btn
  buttonLocation: {
    position: "absolute",
    width: "100%",
    bottom: 80,
  },
  // btn parent container
  btnpallet: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  // btn content style
  btncontainer: {
    width: "auto",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  // btn style
  btnstyle: {
    backgroundColor: "#454545",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    padding: 10,
  },
  // btn title style
  btntitle: { fontSize: 20, fontWeight: "bold" },
  map: {
    alignSelf: "flex-start",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.08,
  },
});

export default GetDetails;
