//==============================================================================
// ■ Convert (convert.js)
//------------------------------------------------------------------------------
//     Type conversion utility functions.
//==============================================================================
const { pick, omit } = require("lodash");
const { singularize } = require("i")();

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  /* Non-native */pick,
  /* Non-native */omit,
  /* Non-native */singularize,
  stringToArray,
  expand,
  embed,
};

//------------------------------------------------------------------------------
// ● String-To-Array
//------------------------------------------------------------------------------
function stringToArray(value) {
  return value ? (Array.isArray(value) ? value : [value]) : [];
}

//------------------------------------------------------------------------------
// ● Expand
//------------------------------------------------------------------------------
function expand(obj = {}, query = {}) {
  const {
    localField = "someId",
    foreignField = "id",
    foreignArray = [],
    newField = `${localField}_expandation`,
  } = query;
  const item = { ...obj };
  item[newField] = foreignArray.find(
    (foreignItem) => foreignItem[foreignField] === item[localField]
  );
  return item;
}

//------------------------------------------------------------------------------
// ● Embed
//------------------------------------------------------------------------------
function embed(obj = {}, query = {}) {
  const {
    localField = "id",
    foreignField = "someId",
    foreignArray = [],
    newField = "embedment",
    count = false,
  } = query;
  const item = { ...obj };
  const result = foreignArray.filter(
    (foreignItem) => foreignItem[foreignField] === item[localField]
  );
  item[newField] = count ? result.length : result;
  return item;
}
