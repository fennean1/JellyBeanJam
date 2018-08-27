export const flattenArrayOnce = arr => {
  let flatterArray = [];

  arr.map((row, i) => {
    row.map((e, j) => {
      flatterArray.push(e);
    });
  });

  return flatterArray;
};
