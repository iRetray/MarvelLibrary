import { Text } from "native-base";
import React from "react";
import { Image, View, StyleSheet } from "react-native";

import hydraError from "../assets/hydraError.png";

export const ErrorComponent = () => {
  return (
    <View>
      <Text>Ha ocurrido un error</Text>
      <Image resizeMode="center" style={styles.tinyLogo} source={hydraError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: "100%",
    height: 300,
  },
});
