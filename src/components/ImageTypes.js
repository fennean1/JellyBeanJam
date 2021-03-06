

// Beans
let pjb = require("../assets/PinkJellyBean.png");
let prjb = require("../assets/PurpleJellyBean.png");
let bjb = require("../assets/BlueJellyBean.png");
let ojb = require("../assets/OrangeJellyBean.png");
let gjb = require("../assets/GreenJellyBean.png");
let yjb = require("../assets/YellowJellyBean.png");
let rjb = require("../assets/RedJellyBean.png");

// Jam
let BlueJam = require("../assets/BlueJam.png");
let RedJam = require("../assets/RedJam.png");
let GreenJam = require("../assets/GreenJam.png");
let OrangeJam = require("../assets/OrangeJam.png");
let YellowJam = require("../assets/YellowJam.png");
let PinkJam = require("../assets/PinkJam.png");
let PurpleJam = require("../assets/PurpleJam.png");


// Candy (Now just a rainbow bean)
let BlueCandy = require("../assets/RainbowBean.png");
let RedCandy = require("../assets/RainbowBean.png");
let GreenCandy = require("../assets/RainbowBean.png");
let OrangeCandy = require("../assets/RainbowBean.png");
let YellowCandy = require("../assets/RainbowBean.png");
let PinkCandy = require("../assets/RainbowBean.png");
let PurpleCandy = require("../assets/RainbowBean.png");

// Others
let floatingClouds = require("../assets/FloatingClouds.png");
let CartoonTuffy = require("../assets/TuffyTile.png");
let TopOfTuffysHead = require("../assets/TopOfTuffysHead.png");
let BackArrow = require("../assets/BackArrow.png");
let TurnIndicatorImage = require("../assets/TurnIndicatorImage.png");
let SwipeInstructions = require("../assets/SwipeInstructionalScene.png");
let BeanInstructions = require("../assets/BeanInstructionalScene.png");
let JarInstructions = require("../assets/JarInstructionalScene.png");
let RainbowInstructions = require("../assets/RainbowInstructionalScene.png")
let RainbowJam = require("../assets/RainbowJam.png")

const imageType = {
  PINKJELLYBEAN: pjb,
  PURPLEJELLYBEAN: prjb,
  BLUEJELLYBEAN: bjb,
  REDJELLYBEAN: rjb,
  YELLOWJELLYBEAN: yjb,
  ORANGEJELLYBEAN: ojb,
  GREENJELLYBEAN: gjb,
  REDJAM: RedJam,
  BLUEJAM: BlueJam,
  GREENJAM: GreenJam,
  PURPLEJAM: PurpleJam,
  PINKJAM: PinkJam,
  ORANGEJAM: OrangeJam,
  YELLOWJAM: YellowJam,
  REDCANDY: RedCandy,
  BLUECANDY: BlueCandy,
  GREENCANDY: GreenCandy,
  PURPLECANDY: PurpleCandy,
  PINKCANDY: PinkCandy,
  ORANGECANDY: OrangeCandy,
  YELLOWCANDY: YellowCandy,
  CARTOONTUFFY: CartoonTuffy,
  TOPOFTUFFYSHEAD: TopOfTuffysHead,
  BACKARROW: BackArrow,
  TURNINDICATORIMAGE: TurnIndicatorImage,
  SWIPEINSTRUCTIONS: SwipeInstructions,
  BEANINSTRUCTIONS: BeanInstructions,
  JARINSTRUCTIONS: JarInstructions,
  RAINBOWINSTRUCTIONS: RainbowInstructions,
  RAINBOWJAM: RainbowJam
};



export const getJamJarFromBean = bean => {
  switch (bean) {
    case ImageTypes.PINKJELLYBEAN:
      return ImageTypes.PINKJAM;
      break;
    case ImageTypes.REDJELLYBEAN:
      return ImageTypes.REDJAM;
      break;
    case ImageTypes.YELLOWJELLYBEAN:
      return ImageTypes.YELLOWJAM;
      break;
    case ImageTypes.ORANGEJELLYBEAN:
      return ImageTypes.ORANGEJAM;
      break;
    case ImageTypes.GREENJELLYBEAN:
      return ImageTypes.GREENJAM;
      break;
    case ImageTypes.BLUEJELLYBEAN:
      return ImageTypes.BLUEJAM;
      break;
    case ImageTypes.PURPLEJELLYBEAN:
      return ImageTypes.PURPLEJAM;
      break;
  }
};

module.exports = imageType;
