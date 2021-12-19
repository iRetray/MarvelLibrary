import React, { useEffect } from "react";

import { Image, StyleSheet, View, Text, ScrollView } from "react-native";
import { NativeBaseProvider } from "native-base";

import { Home } from "./pages";

import marvelLogo from "./assets/marvelLogo.png";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: 0,
            flex: 1,
            alignSelf: "stretch",
            right: 0,
            left: 0,
          }}
        >
          <Image
            resizeMode="center"
            style={styles.marvelLogo}
            source={marvelLogo}
          />
        </View>
        <ScrollView style={styles.contentContainer}>
          <Home />
          <Text style={{ color: "#fff" }}></Text>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
  contentContainer: {
    marginTop: 60,
    backgroundColor: "#000000",
  },
  marvelLogo: {
    width: "100%",
    height: 35,
    marginVertical: 15,
    zIndex: 99,
  },
});
