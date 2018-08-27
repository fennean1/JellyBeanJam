/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  ImageBackground
} from "react-native";

import ImageTypes from "../components/ImageTypes";

export default class InstructionalScene extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>{this.props.instructions}</Text>
      </View>
    );
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let TILE_WIDTH = windowSpan / 6;

let windowWidth = Window.width;
let windowHeight = Window.height;

let styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: TILE_WIDTH / 1.5,
    alignItems: "center",
    textAlign: "center"
    //backgroundColor: "blue"
  }
});

module.exports = InstructionalScene;
