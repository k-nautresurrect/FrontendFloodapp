import React, { useState } from "react";
import { Text } from "react-native";

const ForDesc = (props) => {
  let ht = 0;
  if (props.height) {
    ht = props.height;
  }
  console.log(props.height);
  return (
    <Text>
      {console.log(props.height)}
      {ht}
    </Text>
  );
};

export default ForDesc;
