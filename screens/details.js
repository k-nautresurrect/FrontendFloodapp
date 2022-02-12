import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Input, Icon, Slider, Image, Button } from "react-native-elements";
import VerticalSlider from "rn-vertical-slider";
import ForDesc from "../components/fordesc";

export default function Details({ navigation, route }) {
  const [num, onChangeNumber] = React.useState(1);
  const [vertValue, setVertValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [slidervalue, setSliderValue] = useState(0);
  const [height, setHeight] = useState(0);

  const valueobj = ["Ankle", "knee", "Waist", "Upper Abdomen", "Chest", "Head"];

  // const numberHandler = (text) => {
  //   onChangeNumber(text);
  // };

  // console.log(`fromheight: ${vertValue}`);

  let heightP = 0;
  let valheight = 0;
  if (vertValue !== 0) {
    heightP = vertValue / 6;
    valheight = Math.ceil(height * ((6 - (heightP - 1)) / 6));
  }

  // let heightP = 0;
  // let partition = 1;
  // let arrPoint = [];
  // if (height !== 0) {
  //   partition = Math.ceil(height / 6);
  //   for (let i = 0; i < 6; i++) {
  //     arrPoint.push(Math.ceil(height * ((i + 1) / 6)));
  //   }
  //   for (let i = 0; i < 6; i++) {
  //     if (slidervalue === arrPoint[i]) {
  //       console.log(`slidervalue is ${slidervalue}`);
  //       console.log(`the string is ${arrPoint[i]}`);
  //       setVertValue(i);
  //       console.log(`vert value changes to ${vertValue}`);
  //     }
  //   }
  // }

  const heightHandler = () => {
    setHeightValue(valheight);
    navigation.navigate("maps", { height: valheight });
  };

  const heightendHandler = (text) => {
    setHeight(text);
    // console.log(`height handler ${height}`);
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
        style={styles.inputContainer}
        label="Height in cm"
        // placeholder="please enter your height"
        // onChangeText={numberHandler}
        onChangeText={heightendHandler}
        keyboardType="numeric"
        leftIcon={{ type: "font-awesome", name: "chevron-right" }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.sliderView}>
          {/* <Text style={{ padding: 25, width: 120, textAlign: "center" }}>
            {valueobj[vertValue]}
          </Text> */}

          <View style={{ padding: 25, width: 120, textAlign: "center" }}>
            <Text>{slidervalue}</Text>
            <Text>{valueobj[vertValue]}</Text>
          </View>

          <VerticalSlider
            disabled={false}
            min={0}
            max={height}
            onChange={(value) => setVertValue(value)}
            onComplete={(value) => {
              setSliderValue(value);
            }}
            width={50}
            height={275}
            step={1}
            borderRadius={5}
            minimumTrackTintColor={"#0077b6"}
            maximumTrackTintColor={"#00b4d8"}
          />
          {/* <Slider
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
                  name="tint"
                  type="font-awesome"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#0066b2"
                />
              ),
            }}
          /> */}
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
      <Text>{valheight}</Text>
      {/* {console.log(`vertValue: ${vertValue}`)}
      {console.log(`num: ${num}`)}
      {console.log(`heightValue: ${heightValue}`)} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    // position: "absolute",
    // top: 80,

    alignSelf: "center",
  },
  sliderView: {
    padding: 20,
    flex: 0,
    flexDirection: "row",
    height: 300,
    justifyContent: "center",
    alignItems: "stretch",
    paddingTop: 30,
    paddingBottom: 1,
  },
  item: {
    aspectRatio: 1,
    width: "50%",
    height: 315,
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
