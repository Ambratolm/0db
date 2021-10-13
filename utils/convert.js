//==============================================================================
// ■ Convert (convert.js)
//------------------------------------------------------------------------------
//     Type conversion utility functions.
//==============================================================================
const { singularize } = require("i")();
const { isString, isDataObject, isArray } = require("./type");

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  pick,
  omit,
  /* Non-native */ singularize,
  first,
  array,
  expand,
  embed,
};

//------------------------------------------------------------------------------
// ● Pick
//------------------------------------------------------------------------------
function pick(input, fields, { mutate }) {
  function pickForOne(obj) {
    if (isString(fields)) {
      const field = fields;
      for (const key in obj) {
        if (key !== field) {
          delete obj[key];
        }
      }
    } else if (isArray(fields)) {
      for (const key in obj) {
        if (!fields.includes(key)) {
          delete obj[key];
        }
      }
    }
  }
  if (isDataObject(input)) {
    if (!mutate) input = { ...input };
    pickForOne(input);
  } else if (isArray(input)) {
    if (!mutate) input = [...input];
    for (const obj of input) {
      if (isDataObject(obj)) {
        pickForOne(obj);
      }
    }
  }
  return input;
}

//------------------------------------------------------------------------------
// ● Omit
//------------------------------------------------------------------------------
function omit(input, fields, { mutate }) {
  function omitForOne(obj) {
    if (isString(fields)) {
      const field = fields;
      for (const key in obj) {
        if (key === field) {
          delete obj[key];
        }
      }
    } else if (isArray(fields)) {
      for (const key in obj) {
        if (fields.includes(key)) {
          delete obj[key];
        }
      }
    }

  }
  if (isDataObject(input)) {
    if (!mutate) input = { ...input };
    omitForOne(input);
  } else if (isArray(input)) {
    if (!mutate) input = [...input];
    for (const obj of input) {
      if (isDataObject(obj)) {
        omitForOne(obj);
      }
    }
  }
  return input;
}

//------------------------------------------------------------------------------
// ● First
//------------------------------------------------------------------------------
function first(input) {
  return isArray(input) ? input[0] : input;
}

//------------------------------------------------------------------------------
// ● Array
//------------------------------------------------------------------------------
function array(input) {
  return input ? (isArray(input) ? input : [input]) : [];
}

//------------------------------------------------------------------------------
// ● Expand
//------------------------------------------------------------------------------
function expand(obj = {}, config = {}) {
  const {
    localField = "_someId",
    foreignField = "_id",
    foreignArray = [],
    newField = `_${localField}_expandation`,
  } = config;
  const item = { ...obj };
  item[newField] = foreignArray.find(
    (foreignItem) => foreignItem[foreignField] === item[localField]
  );
  return item;
}

//------------------------------------------------------------------------------
// ● Embed
//------------------------------------------------------------------------------
function embed(obj = {}, config = {}) {
  const {
    localField = "_id",
    foreignField = "_someId",
    foreignArray = [],
    newField = "_embedment",
    count = false,
  } = config;
  const item = { ...obj };
  const result = foreignArray.filter(
    (foreignItem) => foreignItem[foreignField] === item[localField]
  );
  item[newField] = count ? result.length : result;
  return item;
}
