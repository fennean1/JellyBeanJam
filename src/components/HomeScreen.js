import React, { Component } from "react";
import ReactNative from "react-native";
import SwappableGrid from "../components/SwappableGrid";
//import {App} from './App';
import Dimensions from "Dimensions";

const {
  View,
  Text,
  TouchableHighlight,
  Button,
  StyleSheet,
  ImageBackground,
  Image
} = ReactNative;

let playButton = require("../assets/PlayButton.png");

let floatingClouds = require("../assets/FloatingClouds.png");
let justClouds = require("../assets/CloudsBackground.png");
let tuffyMainLogo = require("../assets/JellyBeanJamLogo.png");
let tuffyCartoonHead = require("../assets/TuffysHead.png");
let tuffyShrugging = require("../assets/TuffyShrugging.png");

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  // FOR TESTING REDUX: <Text> The Red Bean Count Is: {this.props.screenProps.redBeanCount} </Text>
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground source={justClouds} style={styles.backGroundImage}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Image source={tuffyMainLogo} style={styles.backGroundImage} />
          </View>
          <TouchableHighlight underlayColor = {"white"}
            style={styles.playbutton}
            onPress={() => navigate("GameScreen")}
          >
            <Image source={playButton} style={styles.backGroundImage} />
          </TouchableHighlight>
          <View style={styles.footer}>
            <Image source={tuffyShrugging} style={styles.backGroundImage} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

let Window = Dimensions.get("window");
let windowWidth = Window.width;
let windowHeight = Window.height;

let styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    alignItems: "center",
    //backgroundColor: 'blue'
  },
  header: {
    marginTop: windowWidth/5,
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth * 0.33
    //backgroundColor:'#2c3e50'
  },
  footer: {
    position: 'absolute',
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth * 0.76,
    top: windowHeight - 0.8 * windowWidth * 0.76
  },
  backGroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined,
    //backgroundColor: 'red',
  },
  playbutton: {
    marginTop: 50,
    height: windowWidth / 3,
    width: windowWidth / 3,
    alignItems: "center"
    //backgroundColor:'#2c3e50'
  }
});

module.exports = HomeScreen;
