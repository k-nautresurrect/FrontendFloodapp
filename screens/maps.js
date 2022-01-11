import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GetDetails from "../components/getdetails";
import ForDesc from "../components/fordesc";

export default function Maps({ navigation }) {
  // useEffect(() => {
  //   console.log(props.route.params?.height);
  // }, [props.route.params?.height]);

  return (
    <View style={styles.container}>
      <GetDetails nav={navigation} height={ForDesc} />
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
});
