import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Input, Icon, Slider, Image, Button } from "react-native-elements";
import ForDesc from "../components/fordesc";

export default function Details({ navigation, route }) {
  const [num, onChangeNumber] = React.useState(1);
  const [vertValue, setVertValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);

  const valueobj = {
    20: "Head",
    25: "Chest",
    30: "Upper Abdomen",
    35: "Waist",
    40: "Knee",
    45: "Ankle",
  };

  const numberHandler = (text) => {
    onChangeNumber(text);
  };

  console.log(`fromheight: ${vertValue}`);

  let heightP = 0;
  let valheight = 0;
  if (vertValue !== 0) {
    heightP = vertValue / 5;
    heightP = heightP - 3;
    valheight = Math.ceil(num * ((6 - (heightP - 1)) / 6));
  }

  const heightHandler = () => {
    setHeightValue(valheight);
    navigation.navigate("maps", { height: valheight });
  };
  // const setHeight = ()

  //   const heightHandler = (num) => {
  //     console.log(`fromheight: ${vertValue}`);
  //     if (vertValue !== 0) {
  //       heightP = vertValue / 5;
  //       heightP = heightP - 3;
  //       valheight = Math.ceil(num / heightP);
  //       setHeightValue(valheight);
  //     }
  //   };
  // positioning by absolute in flex
  return (
    <SafeAreaView style={styles.container}>
      <Input
        label="Height in cm"
        // placeholder="please enter your height"
        onChangeText={numberHandler}
        // onEndEditing={heightHandler}
        keyboardType="numeric"
        leftIcon={{ type: "font-awesome", name: "chevron-right" }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.sliderView}>
          <Text style={{ padding: 25, width: 120, textAlign: "center" }}>
            {valueobj[vertValue]}
          </Text>

          <Slider
            //   style={{ transform: [{ rotate: "0deg" }] }}
            value={vertValue}
            onValueChange={setVertValue}
            maximumValue={50}
            minimumValue={20}
            step={5}
            orientation="vertical"
            thumbStyle={{
              height: 20,
              width: 16,
              backgroundColor: "transparent",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="heartbeat"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#f50"
                />
              ),
            }}
          />
        </View>

        <View>
          <Image
            source={require("../image/human.png")}
            containerStyle={styles.item}
          />
        </View>
      </View>
      <Button
        title="Done"
        buttonStyle={styles.btnstyle}
        containerStyle={styles.btncontainer}
        titleStyle={styles.btntitle}
        onPress={heightHandler}
      />
      <ForDesc height={heightValue} />
      {console.log(`vertValue: ${vertValue}`)}
      {console.log(`num: ${num}`)}
      {console.log(`heightValue: ${heightValue}`)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderView: {
    padding: 20,
    flex: 0,
    flexDirection: "row",
    height: 300,
    justifyContent: "center",
    alignItems: "stretch",
  },
  item: {
    aspectRatio: 1,
    width: "50%",
    height: 300,
    flex: 0,
  },
  mainContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 50,
    paddingLeft: 50,
  },
  btncontainer: {
    width: 100,
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
