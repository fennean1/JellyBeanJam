export const flattenArrayToPairs = arr => {
  let flatterArray = [];

  arr.map((row, i) => {
    row.map((e, j) => {
      flatterArray.push(e);
    });
  });

  if (Array.isArray(flatterArray[0]) == false) {
    return arr;
  }

  return flattenArrayToPairs(flatterArray);
};

export const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const containsIndexPair = (arr, pair) => {
  let a = arr.filter(e => e[0] == pair[0] && e[1] == pair[1]);
  return a.length !== 0;
};

export const removeIndexPair = (arr, indexPair) => {
  let x = arr.filter(e => {
    if (indexPair[0] == e[0] && indexPair[1] == e[1]) {
      return false;
    } else {
      return true;
    }
  });
  return x;
};

export const testRemoveIndexPair = () => {
  console.log("testing remove index pair");
  let arr = [[0, 0], [1, 0], [0, 1], [1, 1]];
  let newArray = console.log(
    "with [0,0] removed",
    removeIndexPair(arr, [0, 0])
  );
};

export const removeIndexes = (arr, indexes) => {
  arr = removeIndexPair(arr, indexes[0]);
  indexes.shift();

  if (indexes.length == 0 || arr.length == 0) {
    return arr;
  }
  return removeIndexes(arr, indexes);
};

export const testRemoveIndexes = () => {
  console.log("BEGIN: testRemoveIndexes(arr,indexes)");
  let theArray = [[0, 0], [1, 0], [0, 1], [1, 1]];
  let theIndexes = [[1, 0], [0, 1]];
  console.log("arr", theArray);
  console.log("indexes", theIndexes);
  let poop = removeIndexes(theArray, theIndexes);
  console.log("testing remove indexes", poop);
};

/*
export const withSharedIndexes = duplicates.map(e => {
  let allWithIndex = this.returnAllMatchesWithIndex(allMatches, e);
  if (allWithIndex.length > 0) {
    return allWithIndex;
  } else {
    return [];
  }
});

export const withoutSharedIndexes = duplicates.map(e => {
  let allWithOutIndex = this.removeAllMatchesWithIndex(allMatches, e);
  if (allWithIndexOut.length > 0) {
    return allWithOutIndex;
  } else {
    return [];
  }
});
*/



// Returns all arrays that have an index of "index" within them. For two dimensional array.
export const returnAllMatchesWithIndex = (matches, index) => {
  let withIndex = [];
  matches.map(match => {
    if (containsIndexPair(match, index)) {
      withIndex.push(match);
    }
  });
  return withIndex;
};

export const removeAllMatchesWithIndex = (matches, index) => {
  let withOutIndex = [];
  matches.map(match => {
    if (!containsIndexPair(match, index)) {
      withOutIndex.push(match);
    }
  });
  return withOutIndex;
};
