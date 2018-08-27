import ImageTypes from "../components/ImageTypes";



export const isCandy = obj => {
  switch (obj) {
    case ImageTypes.REDCANDY:
      return true;
      break;
    case ImageTypes.BLUECANDY:
      return true;
      break;
    case ImageTypes.GREENCANDY:
      return true;
      break;
    case ImageTypes.ORANGECANDY:
      return true;
      break;
    case ImageTypes.PINKCANDY:
      return true;
      break;
    case ImageTypes.YELLOWCANDY:
      return true;
      break;
    case ImageTypes.PURPLECANDY:
      return true;
      break;
    case ImageTypes.RAINBOWCANDY:
      return true;
      break;
    default:
      return false;
  }
};

export const getCandyFromBean = bean => {
  switch (bean) {
    case ImageTypes.PINKJELLYBEAN:
      return ImageTypes.PINKCANDY;
      break;
    case ImageTypes.REDJELLYBEAN:
      return ImageTypes.REDCANDY;
      break;
    case ImageTypes.YELLOWJELLYBEAN:
      return ImageTypes.YELLOWCANDY;
      break;
    case ImageTypes.ORANGEJELLYBEAN:
      return ImageTypes.ORANGECANDY;
      break;
    case ImageTypes.GREENJELLYBEAN:
      return ImageTypes.GREENCANDY;
      break;
    case ImageTypes.BLUEJELLYBEAN:
      return ImageTypes.BLUECANDY;
      break;
    case ImageTypes.PURPLEJELLYBEAN:
      return ImageTypes.PURPLECANDY;
      break;
  }
};


export const isJam = obj => {
  switch (obj) {
    case ImageTypes.REDJAM:
      return true;
      break;
    case ImageTypes.BLUEJAM:
      return true;
      break;
    case ImageTypes.GREENJAM:
      return true;
      break;
    case ImageTypes.ORANGEJAM:
      return true;
      break;
    case ImageTypes.PINKJAM:
      return true;
      break;
    case ImageTypes.YELLOWJAM:
      return true;
      break;
    case ImageTypes.PURPLEJAM:
      return true;
      break;
    case ImageTypes.RAINBOWJAM:
      return true;
      break;
    default:
      return false;
  }
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
    case ImageTypes.REDJAM:
      return ImageTypes.REDJAM;
      break;
    case ImageTypes.BLUEJAM:
      return ImageTypes.BLUEJAM;
      break;
    case ImageTypes.GREENJAM:
      return ImageTypes.GREENJAM;
      break;
    case ImageTypes.ORANGEJAM:
      return ImageTypes.ORANGEJAM;
      break;
    case ImageTypes.PINKJAM:
      return ImageTypes.PINKJAM;
      break;
    case ImageTypes.YELOWJAM:
      return ImageTypes.YELLOWJAM;
      break;
    case ImageTypes.PURPLEJAM:
      return ImageTypes.PURPLEJAM;
      break;
  }
};
