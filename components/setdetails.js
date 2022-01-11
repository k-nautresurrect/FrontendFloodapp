import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SetDetails = (props) => {
  const [gotodetail, setGoToDetail] = useState(false);

  return (
    <Button
      title="Set Location"
      buttonStyle={styles.btnstyle}
      containerStyle={styles.btncontainer}
      titleStyle={styles.btntitle}
      onPress={() => {
        props.navigation.navigate("details", { navigation: props.navigation });
      }}
    />
  );
};

const styles = StyleSheet.create({
  btncontainer: {
    width: "auto",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  btnstyle: {
    backgroundColor: "#454545",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    padding: 10,
  },
  btntitle: { fontSize: 20, fontWeight: "bold" },
});

export default SetDetails;
