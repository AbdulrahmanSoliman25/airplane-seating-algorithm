/**
 * convert blocks to valid array
 * @param {Object} blocks - Object of blocks
 * @returns {Array} - Array of blocks
 */
const mapToArray = (blocks) => {
  const res = [];
  blocks.forEach((block) => {
    res.push([block[0], block[1]]);
  });
  return res;
};

/**
 * Find the maximum rows of the given blocks
 * @param {Array} blocks - Array of blocks
 * @returns {Number} - max row
 */
const getMaxRow = (blocks) => {
  return Math.max.apply(
    null,
    blocks.map(function (row) {
      return Math.max.apply(Math, row);
    })
  );
};
/**
 * Find the maximum rows of the given blocks
 * @param {Map} map - map of the sorted seats
 * @param {Number} passengers - number of passengers
 * @returns {Map} - limited map for the given passengers
 */
const allocatePassengers = (map, passengers) => {
  let itirator = 1;
  for (const entry of map) {
    if (itirator > passengers) break;
    entry[1].push(itirator);
    itirator++;
  }
  return map;
};

/**
 * Allocate the passengers Queue to each seat
 * @param {Array} data - Array of strings
 * @returns {Array} - result contain the allocation map & block array
 */
const seatAllocation = (data) => {
  // validate blocks I have done this in the text area component

  // convert blocks to valid array
  const blocks = mapToArray(data.blocks);

  //   get max row
  const max = getMaxRow(blocks);

  // define vars
  // result array .
  // aisle, window, and center maps .
  var result = [],
    aisle = new Map(),
    center = new Map(),
    window = new Map(),
    cols = 0,
    rows = 0;
  for (let currentRow = 1; currentRow <= max; currentRow++) {
    // foreach block in blocks push to aisle , window , and center
    blocks.forEach(function (block, b) {
      cols = block[0];
      rows = block[1];
      if (currentRow <= rows) {
        if (b === 0) {
          // foreach col in the given row & block
          for (let c = 1; c <= cols; c++) {
            if (c % cols === 0) {
              // if c % col == 0 push to aisle map
              aisle.set(b + "-" + c + "-" + currentRow, ["aisle"]);
            } else if (c % cols === 1) {
              // if c % cols == 0 push to window map
              window.set(b + "-" + c + "-" + currentRow, ["window"]);
            } else {
              // if c % col !== 0 && c % col !== 1 push to center map#
              center.set(b + "-" + c + "-" + currentRow, ["center"]);
            }
          }
        } //left block
        else if (b === blocks.length - 1) {
          for (let c = 1; c <= cols; c++) {
            if (c % cols == 0) {
              // if c % col == 0 push to window map
              window.set(b + "-" + c + "-" + currentRow, ["window"]);
            } else if (c % cols == 1) {
              // if c % col === 1 push to aisle map
              aisle.set(b + "-" + c + "-" + currentRow, ["aisle"]);
            } else {
              // if c % col !== 0 && c % col !== 1 push to center map
              center.set(b + "-" + c + "-" + currentRow, ["center"]);
            }
          }
        } //right block
        else {
          for (let c = 1; c <= cols; c++) {
            if (c % cols == 0 || c % cols == 1) {
              // if c % col === 0 && c === 0 push to aisle map
              aisle.set(b + "-" + c + "-" + currentRow, ["aisle"]);
            } else {
              // if c % col !== 0 && c !== 0 push to center map
              center.set(b + "-" + c + "-" + currentRow, ["center"]);
            }
          }
        } // centered blocks
      }
    }); // END foreach block
  } // END foreach ROW

  result["blocks"] = blocks;
  //    merge all maps togather
  result["map"] = new Map([...aisle, ...window, ...center]);
  result["map"] = allocatePassengers(result["map"], data.passengers);
  result["remaining"] = Math.max(0, data.passengers - result["map"].size);
  // return the result
  return result;
};

module.exports = {
  seatAllocation,
};
