/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// TODO Write the condenseColumns function so that it takes the indexes instead of the color.
// Pass "data" around instead of constantly referring to "state" this makes it so that we don't have to
// set state as ofter

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
  TouchableHighlight,
  ImageBackground
} from "react-native";

import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

import Tile from "./Tile";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

import imageType from "../components/ImageTypes";

import { getJamJarFromBean, isCandy, getCandyFromBean, isJam } from "../components/JamFunctions";

import {
  getRandomInt,
  testRemoveIndexPair,
  testRemoveIndexes,
  flattenArrayToPairs,
  returnAllMatchesWithIndex,
  removeAllMatchesWithIndex
} from "../grid-api/Methods";

let firstLoad = true;

let boardWidth = 5;
let boardHeight = 5;

let speed = 300;

class TileData {
  constructor(img, index, key) {
    // The number of matches that a tile exits within.
    this.matchMemberships = 0;
    this.index = index;
    this.fadeAnimation = new Animated.Value(1);
    this.key = key;
    this.location = new Animated.ValueXY();
    this.imageType = img;
    this.rotation = new Animated.Value(0);
    this.scale = new Animated.Value(1);
    this.view = <Image source={img} style={styles.tile} />;
  }

  setView(imageType) {
    this.imageType = imageType;
    this.view = <Image source={imageType} style={styles.tile} />;
  }
}

const animationType = {
  SWAP: 0,
  FALL: 1
};

const rowOrCol = {
  ROW: 0,
  COLUMN: 1
};

// Need this array for finding random beans
const beans = [
  imageType.BLUEJELLYBEAN,
  imageType.PINKJELLYBEAN,
  imageType.PURPLEJELLYBEAN,
  imageType.YELLOWJELLYBEAN,
  imageType.ORANGEJELLYBEAN,
  imageType.GREENJELLYBEAN,
  imageType.REDJELLYBEAN
];

export default class Swappables extends Component<{}> {
  constructor(props) {
    super(props);

    // Inititalize to swipe up, will change later.
    this.swipeDirection = swipeDirections.SWIPE_UP;
    this.isCandy = false
    this.currentIJ = {}
    this.nextIJ = {}
    this.crunchThisImage = imageType.REDJELLYBEAN
    this.crunchTheseIfCandy = new Array([[0,0]]);

    // Speed of the animations
    this.speed = 100; // Rate at which the animation occurs.
    this.origin = [];
    this.animationState = animationType.SWAP;
    this.currentDirection = rowOrCol.ROW;
    this.otherDirection = rowOrCol.COLUMN;
    this.cancelTouches = false;
    this.consecutiveSwaps = 1;

    this.previousSwappedIndexes = [];
    this.shouldReimburseForSwap = true;

    this.state = {
      tileComponents: [],
      tileDataSource: this.initializeDataSource()
    };
  }

  onSwipe(gestureName, gestureState) {
    console.log("Hello I've been Swiped");
    if (this.cancelTouches == false && this.props.gameOver == false) {
      let initialGestureX = gestureState.x0;
      let initialGestureY = gestureState.y0;

      // Need to get convert location of swipe to an index.

      console.log("x origin", this.origin[0]);

      let i = Math.round((initialGestureX - TILE_WIDTH) / TILE_WIDTH);
      let j = Math.round(
        (initialGestureY -
          this.props.topMargin -
          this.origin[1] -
          0.5 * TILE_WIDTH) /
          TILE_WIDTH
      );

      const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      this.setState({ gestureName: gestureName });

      //  TODO: Make sure that the boundary conditions 0 and 4 aren't HARDCODED
      switch (gestureName) {
        case SWIPE_UP:
          console.log("An upward swipe has been registered");

          if (j > 0) {
            this.swipeDirection = SWIPE_UP;
            this.swap(i, j, 0, -1);
          }

          break;
        case SWIPE_DOWN:
          console.log("A downward swipe has been registered");

          if (j < 4) {
            this.swipeDirection = SWIPE_DOWN;
            this.swap(i, j, 0, 1);
          }

          break;
        case SWIPE_LEFT:
          console.log("A left swipe has been registered");

          if (i > 0) {
            this.swipeDirection = SWIPE_LEFT;
            this.swap(i, j, -1, 0);
          }

          break;
        case SWIPE_RIGHT:
          console.log("A right swipe has been registered");

          if (i < 4) {
            this.swipeDirection = SWIPE_RIGHT;
            this.swap(i, j, 1, 0);
          }
          break;
      }
    }
  }

  pushTileDataToComponent() {
    console.log("Pushing Tile Data");

    var a = [];
    // This creates the array of Tile components that is stored as a state variable.
    this.state.tileDataSource.map((row, i) => {
      let rows = row.map((e, j) => {
        a.push(
          <Tile
            location={e.location}
            scale={e.scale}
            key={e.key}
            rotation={e.rotation}
            subview={e.view}
          />
        );
      });
      // This is where the error occurs where an element no longer receives touches.
      // Don't wrap this in a view.
      return;
      rows;
    });
    //console.log()

    this.setState({
      tileComponents: a
    });
  }

  // data - the array of
  returnTileDataComponents() {
    console.log("Pushing Tile Data");

    var a = [];
    // This creates the array of Tile components that is stored as a state variable.
    this.state.tileDataSource.map((row, i) => {
      let rows = row.map((e, j) => {
        a.push(
          <Tile
            location={e.location}
            scale={e.scale}
            key={e.key}
            rotation={e.rotation}
            subview={e.view}
          />
        );
      });
      // This is where the error occurs where an element no longer receives touches.
      // Don't wrap this in a view.
      return;
      rows;
    });

    return a;
  }

  renderTiles(tileDataSource) {
    return this.returnTileDataComponents();
  }

  // takes the indexes that will be animated
  animateCandyCrunch(indexesToAnimate) {

    let len = indexesToAnimate.length;

    for (var n = 0; n < len; n++) {
      let e = indexesToAnimate[n];

      let i = e[0];
      let j = e[1];

      Animated.sequence([
        Animated.delay(350),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 1.05,
          duration: 150
        }),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 0,
          duration: 150
        }),
      ]).start(() => {
        this.animationState = animationType.FALL;
      });
    }
  }


  // takes the indexes that will be animated and
  animateBeanMatch(indexesToAnimate, location) {
    let locationToAnimateTo = [
      location[0] * TILE_WIDTH,
      location[1] * TILE_WIDTH
    ];

    let len = indexesToAnimate.length;

    for (var n = 0; n < len; n++) {
      let e = indexesToAnimate[n];

      let i = e[0];
      let j = e[1];

      Animated.sequence([
        Animated.delay(350),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 1.05,
          duration: 150
        }),
        Animated.timing(this.state.tileDataSource[i][j].scale, {
          toValue: 1,
          duration: 150
        }),
        Animated.timing(this.state.tileDataSource[i][j].location, {
          toValue: { x: locationToAnimateTo[0], y: locationToAnimateTo[1] },
          duration: this.speed
        })
      ]).start(() => {
        this.animationState = animationType.FALL;
      });
    }
  }

  condenseColumns(beanIndexes) {

    let spotsToFill = 0;
    // NOTE: HARDCODED!
    for (let i = 0; i < 5; i++) {
      spotsToFill = 0;

      // Iterate through each column
      for (let j = 4; j >= 0; j--) {
        // NOTE: Wait...there's only one of this. Couldn't I use "containsIndexPair?""
        let indexesToFill = beanIndexes.filter(e => {
          return i == e[0] && j == e[1];
        });

        // Check to see if the element is a spot that needs filling.
        if (indexesToFill.length != 0) {
          // Increment the spots to fill...since we found a spot to fill.
          spotsToFill++;
          // Place the location above the top of the screen for when it "falls"
          this.state.tileDataSource[i][j].location.setValue({
            x: TILE_WIDTH * i,
            y: -3 * TILE_WIDTH
          });
          this.state.tileDataSource[i][j].scale.setValue(1);

        } else if (spotsToFill > 0) {
          // Move bean downward
          const currentSpot = this.state.tileDataSource[i][j];
          const newSpot = this.state.tileDataSource[i][j + spotsToFill];

          this.state.tileDataSource[i][j] = newSpot;
          this.state.tileDataSource[i][j + spotsToFill] = currentSpot;
        }
      }
    }
  }

  sharedIndex(arrOne, arrTwo) {
    let match = [];
    arrOne.map((u, i) => {
      arrTwo.map((v, j) => {
        if (u[0] == v[0] && u[1] == v[1]) {
          match = u;
        }
      });
    });
    return match;
  }

  // Test console.log("What index do each of these two arrays share? [[2,3],[2,4],[2,5]]  [[1,3],[2,3],[2,3] ]",this.shareIndex([[2,3],[2,4],[2,5]], [[2,3],[2,4],[2,5]]))

  containsIndexPair(arr, pair) {
    let a = arr.filter(e => e[0] == pair[0] && e[1] == pair[1]);
    return a.length !== 0;
  }

  //Remove the spot where the jar needs to go
  removeIndexes(arr, indexes) {
    let filteredArray = [];

    if (indexes.length == 0) {
      return arr;
    } else {
      indexes.map(index => {
        filteredArray = arr.filter(e => {
          // Not sure how all this got to be.
          // Somehow this was the only way to do this.
          let firstAreEqual = e[0] == index[0];
          let secondAreEqual = e[1] == index[1];
          b = !(firstAreEqual && secondAreEqual);

          return b;
        });
        //NOTE: this used to be arr = filteredArray and worked fine
        arr = filteredArray;
      });
      return filteredArray;
    }
  }

  swap(i, j, dx, dy) {
    let swipeBeganAt = [i, j];
    let swipeDirectedAt = [i + dx, j + dy];

    this.currentIJ = swipeBeganAt
    this.nextIJ = swipeDirectedAt

    // If the indexes are the same as the previous two then give the turn back.
    if (
      this.containsIndexPair(this.previousSwappedIndexes, swipeBeganAt) &&
      this.containsIndexPair(this.previousSwappedIndexes, swipeDirectedAt)
    ) {
      console.log("Need to give swap back");
      this.consecutiveSwaps += 1;

      let inc = Math.pow(-1, this.consecutiveSwaps);
      console.log("increment", inc);
      this.props.incrementTurns(inc);

    } else {
      console.log("Don't need to give swap back");
      this.consecutiveSwaps = 1
      this.props.incrementTurns(-1);
    }

    // Log the previous indexes
    this.previousSwappedIndexes = [swipeBeganAt, swipeDirectedAt];

    const newData = this.state.tileDataSource;

    const swapStarter = this.state.tileDataSource[i][j];
    const swapEnder = this.state.tileDataSource[i + dx][j + dy];



    // NOTE Collect Swap metadata to determine how to manage the candy (now RainbowBean)
    if (this.isCandy = isCandy(swapStarter.imageType)){
      this.crunchThisImage = swapEnder.imageType
      this.crunchTheseIfCandy = this.getIndexesWithColor(this.crunchThisImage)
      this.crunchTheseIfCandy.push(this.currentIJ)
    } else if (this.isCandy = isCandy(swapEnder.imageType)){
      this.crunchThisImage = swapStarter.imageType
      this.crunchTheseIfCandy = this.getIndexesWithColor(this.crunchThisImage)
      this.crunchTheseIfCandy.push(this.nextIJ)
    }

    // Perform the swap - this calls "Component did update" - I think.
    newData[i][j] = swapEnder;
    newData[i + dx][j + dy] = swapStarter;

    this.updateGrid();
  }

  // Handles swipe events
  updateGrid() {
    // The amount of jam and numbers of beans gathered in this swipe.
    let beansThisTurn = 0;
    let jamThisTurn = 0;

    let allMatches = this.allMatchesOnBoard();

    // CANDY MEANS RAINBOW BEAN!
    if (this.isCandy){


        if (isJam(this.crunchThisImage)){
          jamThisTurn = this.crunchTheseIfCandy.length  // crunchTheseIfCandy contains
          // the index of the rainbow bean so we have to subtract one.
          this.props.incrementTurns(jamThisTurn);
        } else {
          beansThisTurn = (this.crunchTheseIfCandy.length-1)*5
          this.props.incrementTurns(1)
        }

        this.props.updateScore(beansThisTurn,3*jamThisTurn)

        this.animateCandyCrunch(this.crunchTheseIfCandy)

        setTimeout(()=> {
        this.recolorMatches(this.crunchTheseIfCandy)
        this.condenseColumns(this.crunchTheseIfCandy)
        this.pushTileDataToComponent()
        this.animationState = animationType.SWAP

        setTimeout(() => {
          if (this.allMatchesOnBoard().length != 0) {
            this.isCandy = false
            this.updateGrid();
          } else {
            this.cancelTouches = false;
            this.animationState = animationType.SWAP;
          }
        }, 1200);

      },1200)

    }
    else if (allMatches.length != 0) {
      this.cancelTouches = true;
      // Previousy swapped indexes stores the indexes that were most
      // recently swapped to determine if turn reimbursement
      // is necessary. This gets reset after match.
      this.previousSwappedIndexes = [];
      let duplicates = this.returnDuplicates(allMatches);
      console.log(
        "Duplicates: In practice, there is generally only one of these.",
        duplicates
      );

      // These are the indexes that were matched and need to be replaced with new beans
      let indexesToRemove = [];
      if (duplicates.length == 1) {


        const withSharedIndexes = duplicates.map(e => {
          let allWithIndex = returnAllMatchesWithIndex(allMatches, e);
          if (allWithIndex.length > 0) {
            return allWithIndex;
          } else {
            return [];
          }
        });

        const withoutSharedIndexes = duplicates.map(e => {
          let allWithOutIndex = removeAllMatchesWithIndex(allMatches, e);
          if (allWithOutIndex.length > 0) {
            return allWithOutIndex;
          } else {
            return [];
          }
        });


        withSharedIndexes.map((row, i) => {
          // This reduces the beans this turn by one to account for the shared index being counted twice
          beansThisTurn = beansThisTurn - withSharedIndexes.length;
          // Animate to the index that they share
          let animateTo = this.sharedIndex(row[0], row[1]);
          let jar = null;

          row.map(match => {
            // Get the indexs of the first item
            let i = match[0][0];
            let j = match[0][1];
            let currentImage = this.state.tileDataSource[i][j].imageType;

            if (isJam(currentImage)) {
              //
              this.animateBeanMatch(match, [1, 10]);
              jamThisTurn += match.length;
              this.props.animateTuffysHead();
            } else {
              jar = getCandyFromBean(currentImage)
              this.animateBeanMatch(match, animateTo);
              beansThisTurn += match.length;
              indexesToRemove.push(animateTo);
            }
          });

          this.state.tileDataSource[animateTo[0]][animateTo[1]].setView(jar);

        });

        // Check to see if the first match in the set of those withoutSharedIndexes is zero.
        if (withoutSharedIndexes[0].length != 0){

        withoutSharedIndexes.map((row, i) => {
          // This reduces the beans this turn by one to account for the shared index being counted twice
          beansThisTurn = beansThisTurn - withSharedIndexes.length;
          // Animate to the index that they share
          let animateTo = row[0][0]
          console.log("animateTo in withoutSharedIndexes",animateTo)
          let jar = null;

          row.map(match => {
            // Get the indexs of the first item
            let i = match[0][0];
            let j = match[0][1];
            let currentImage = this.state.tileDataSource[i][j].imageType;

            if (isJam(currentImage)) {
              //
              this.animateBeanMatch(match, [1, 10]);
              jamThisTurn += match.length;
              this.props.animateTuffysHead();
            } else {
              jar = getJamJarFromBean(currentImage);
              this.animateBeanMatch(match, animateTo);
              beansThisTurn += match.length;
              indexesToRemove.push(animateTo);
            }
          });

          this.state.tileDataSource[animateTo[0]][animateTo[1]].setView(jar);

        });
}

      } else {
        allMatches.map(match => {

          let u = match[0][0];
          let v = match[0][1];

          if (match.length > 3) {
            jar = getCandyFromBean(this.state.tileDataSource[u][v].imageType)
          }
          // Retreive first index in match
          if (isJam(this.state.tileDataSource[u][v].imageType)) {
            this.animateBeanMatch(match, [2, 10]);
            this.props.animateTuffysHead();
            jamThisTurn += match.length;
          } else {
            // Give them candy if the match is greater than 3.
            if (match.length > 3) {
              jar = getCandyFromBean(this.state.tileDataSource[u][v].imageType)
            } else {
                jar = getJamJarFromBean(this.state.tileDataSource[u][v].imageType);
            }
            this.state.tileDataSource[u][v].setView(jar);
            this.animateBeanMatch(match, match[0]);
            beansThisTurn += match.length;
            indexesToRemove.push(match[0]);
          }
        });
      }

      // Everytime you get jam match you get extra turns.
      if (jamThisTurn > 0) {
        this.props.incrementTurns(2*(jamThisTurn-2));
      }

      this.props.updateScore(beansThisTurn, 3*jamThisTurn);

      // TODO: Flatten all matches before...wait...what about duplicate indexes?
      // Duplicate indexes will never need removal!!!!!
      allMatches = allMatches.map(match => {
        return this.removeIndexes(match, indexesToRemove);
      });

      // Waits for "animate match" to complete.
      setTimeout(() => {

        allMatches.map(match => {
          this.recolorMatches(match);
          this.condenseColumns(match);
        });

        this.pushTileDataToComponent();

        setTimeout(() => {
          if (this.allMatchesOnBoard().length != 0) {
            console.log("Hello! Calling update grid again");
            this.updateGrid();
          } else {
            this.cancelTouches = false;
            this.animationState = animationType.SWAP;
          }
        }, 1200);
      }, 1200);
    }



  }

  componentDidUpdate() {
    // !!! Make this take a "Type" and perform an animation based on the
    // type of update that's occured. ie swipe, condense, load.

    console.log("component did update was called");
    switch (this.animationState) {
      case animationType.SWAP:
        this.animateValuesToLocationsSwapStyle();
        break;
      case animationType.FALL:
        this.animateValuesToLocationsWaterfalStyle();
        break;
    }
  }

  initializeDataSource() {
    // Grid that contains the keys that will be assigned to each tile via map
    let keys = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24]
    ];

    var tileData = keys.map((row, i) => {
      let dataRows = row.map((key, j) => {
        let randIndex = getRandomInt(7);

        let data = new TileData(beans[randIndex], [i, j], key);

        return data;
      });

      return dataRows;
    });

    return tileData;
  }

  componentWillMount() {
    // NOTE: Run tests
    testRemoveIndexPair();
    testRemoveIndexes();
    this.animateValuesToLocationsWaterfalStyle();
  }

  onLayout(event) {
    this.origin = [event.nativeEvent.layout.x, event.nativeEvent.layout.y];
    console.log("this is the origin", this.origin);
  }

  componentDidMount() {
    this.pushTileDataToComponent();
  }

  isMatch(itemOne, itemTwo) {
    if (itemOne.imageType == itemTwo.imageType) {
      return true;
    } else if (isJam(itemOne.imageType) && isJam(itemTwo.imageType)) {
      return true;
    }
  }

  checkRowColForMatch(coordinate, direction) {
    let consecutives = [];

    for (i = 0; i < 4; i++) {
      // If its a column,check the next item in the column
      // Inistialize these to zero and then decide which one will be iterated and which will be held consant.
      let x = 0;
      let y = 0;

      // Used to whether the next itme should be on the left or on the right.
      let dx = 0;
      let dy = 0;

      if (direction == rowOrCol.COLUMN) {
        x = coordinate[0];
        y = i;
        dy = 1;
      } else if (direction == rowOrCol.ROW) {
        x = i;
        dx = 1;
        y = coordinate[1];
      }

      let firstItem = this.state.tileDataSource[x][y];
      let nextItem = this.state.tileDataSource[x + dx][y + dy];

      if (this.isMatch(firstItem, nextItem)) {
        consecutives.push([x, y]);

        // Check if I've reached the end of the loop.
        if (i == 3) {
          consecutives.push([x + dx, y + dy]);
        }
      } else {
        // Push the last item in the sequence of matches
        consecutives.push([x, y]);
        if (consecutives.length >= 3) {
          console.log("returning consecutives");
          return consecutives;
        } else {
          // Reset
          consecutives = [];
        }
      }
    }

    if (consecutives.length >= 3) {
      return consecutives;
    } else {
      return [];
    }
  }

  areIndexesEqual(pairOne, pairTwo) {
    return a[0] == e[0] && a[1] == e[1];
  }

  // Returns all arrays that have an index of "index" within them. For two dimensional array.
  allWithIndex(arr, index) {
    let withIndex = [];
    arr.map(row => {
      if (this.containsIndexPair(row, index)) {
        withIndex.push(row);
      }
    });
    return withIndex;
  }

  returnDuplicates(arr) {
    // Destructure the two dimensional array to a 1D NOTE: I have a function for this now!
    let stream = [];
    arr.map(row => {
      row.map(e => {
        stream.push(e);
      });
    });

    let dups = [];
    let x = stream.map((e, i) => {
      if (stream.slice(i).length > 1) {
        let iterator = stream.slice(i + 1);

        if (this.containsIndexPair(iterator, e)) {
          dups.push(e);
        }
      }
    });
    return dups;
  }

  removeDuplicates(arr) {
    let x = arr.map((e, i) => {
      let iterator = x.slice(i);
      if (this.containsIndexPair(iterator, e)) {
        arr.splice(0, 1);
      }
    });

    return arr;
  }

  allMatchesOnBoard() {
    let matches = [];

    for (let i = 0; i < 5; i++) {
      // Check to find all the rows that have matches.
      let rowMatch = this.checkRowColForMatch([0, i], rowOrCol.ROW);
      if (rowMatch.length > 0) {
        matches.push(rowMatch);
      }
      // Check to find all the columns that have matches
      let colMatch = this.checkRowColForMatch([i, 0], rowOrCol.COLUMN);
      if (colMatch.length > 0) {
        matches.push(colMatch);
      }
    }

    return matches;
  }

  // Gets all indexes with a specific color.
  getIndexesWithColor(color) {
    let colorIndexes = new Array();

    let x = this.state.tileDataSource.map((row, i) => {
      let colorRow = row.map((e, j) => {
        if (e.imageType == color) {
          colorIndexes.push([i, j]);
        } else if (isJam(e.imageType) && isJam(color)) {
          colorIndexes.push([i, j]);
        }
      });
    });
    return colorIndexes;
  }

  // Animates the values in the tile data source based on their index in the array.
  animateValuesToLocationsSwapStyle() {
    this.state.tileDataSource.map((row, i) => {
      row.map((elem, j) => {
        Animated.timing(elem.location, {
          toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j },
          duration: this.speed
        }).start();
      });
    });
  }

  // Animates the values in the tile data source based on their index in the array.
  animateValuesToLocationsWaterfalStyle() {
    this.state.tileDataSource.map((row, i) => {
      row.map((elem, j) => {
        Animated.sequence([
          Animated.delay(50),
          Animated.spring(
            //Step 1
            elem.location, //Step 2
            { toValue: { x: TILE_WIDTH * i, y: TILE_WIDTH * j }, friction: 4 } //Step 3
          )
        ]).start(() => {});
      });
    });
  }

  recolorMatches(neighbors) {
    neighbors.map(e => {
      let i = e[0];
      let j = e[1];
      let randIndex = getRandomInt(7);
      this.state.tileDataSource[i][j].setView(beans[randIndex]);
    });
  }

  render() {
    const config = {
      velocityThreshold: 0.11,
      directionalOffsetThreshold: 50
    };

    return (
      <View style={styles.container} onLayout={this.onLayout.bind(this)}>
        <View>
          <GestureRecognizer
            config={config}
            style={styles.gestureContainer}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
          >
            {this.state.tileComponents}
          </GestureRecognizer>
        </View>
      </View>
    );
  }
}

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let TILE_WIDTH = windowSpan / 6;

let windowWidth = Window.width;
let windowHeight = Window.height;

let blue = "#4286f4";
let red = "#f24646";
let yellow = "#faff7f";
let green = "#31a51a";
let orange = "#ff7644";
let pink = "#ff51f3";

let styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: 300,
    height: 300
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  mainView: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: red
  },
  gestureContainer: {
    flex: 1,
    width: TILE_WIDTH * 5,
    height: TILE_WIDTH * 5,
    position: "absolute"
    //backgroundColor: "#31a51a"
  },
  container: {
    width: TILE_WIDTH * 5,
    height: TILE_WIDTH * 5
    //backgroundColor: red
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_WIDTH
  }
});
