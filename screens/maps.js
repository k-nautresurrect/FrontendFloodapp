import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "../components/search";

export default function Maps({ navigation, route }) {
  const API_KEY = "AIzaSyC_kRxUGZMpYA361uWGeGohZW5PYqCoj4k";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [tempRegion, setTempRegion] = useState(null);
  const [desc, setDesc] = useState("my location");
  const [selected, setSelected] = useState(false);
  const [index, setIndex] = useState(0);

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
    marker = {
      id: 0,
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      description: desc,
      color: "green",
      colorSelected: "blue",
      coloralt: "red",
    };
    // <Marker
    //   coordinate={mapRegion}
    //   title="me"
    //   description={desc}
    //   draggable={true}
    //   // onPress={handleDesc}
    //   onDragEnd={(e) => {
    //     setTempRegion({
    //       latitude: e.nativeEvent.coordinate.latitude,
    //       longitude: e.nativeEvent.coordinate.longitude,
    //       longitudeDelta: 0.0922,
    //       latitudeDelta: 0.0422,
    //     });
    //   }}
    // ></Marker>
  }

  // use flatlist
  const getDetailsHandler = () => {
    if (marker !== null) {
      setMarkers((markers) => [...markers, marker]);
    }
  };

  const getHeight = (data) => {
    console.log(data);
  };

  const handleDesc = (index) => {
    // console.log(`marker with index ${index} is pressed`);
    setSelected(true);
    setIndex(index);
    if (index !== 0) {
      console.log(index);
    }
    // if (route.params.height !== undefined) {
    //   setDesc(`Water logging: ${route.params.height}`);
    // }
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
        {console.log(markers)}
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              pinColor={"red"}
              title="me"
              description={marker.description}
              draggable={true}
              onPress={() => handleDesc(index)}
              onDragEnd={(e) => {
                setTempRegion({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  longitudeDelta: 0.0922,
                  latitudeDelta: 0.0422,
                });
                marker.id = index;
                markers[index].latitude = e.nativeEvent.coordinate.latitude;
                markers[index].longitude = e.nativeEvent.coordinate.longitude;
              }}
            ></Marker>
          );
        })}
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
            onPress={() => navigation.navigate("details")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
