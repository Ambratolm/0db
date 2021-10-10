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
function pick(objs, fields, mutate = false) {
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
  if (isDataObject(objs)) {
    if (!mutate) objs = { ...objs };
    pickForOne(objs);
  } else if (isArray(objs)) {
    if (!mutate) objs = [...objs];
    for (const obj of objs) {
      if (isDataObject(obj)) {
        pickForOne(obj);
      }
    }
  }
  return objs;
}

//------------------------------------------------------------------------------
// ● Omit
//------------------------------------------------------------------------------
function omit(objs, fields, mutate = false) {
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
  if (isDataObject(objs)) {
    if (!mutate) objs = { ...objs };
    omitForOne(objs);
  } else if (isArray(objs)) {
    if (!mutate) objs = [...objs];
    for (const obj of objs) {
      if (isDataObject(obj)) {
        omitForOne(obj);
      }
    }
  }
  return objs;
}

//------------------------------------------------------------------------------
// ● First
//------------------------------------------------------------------------------
function first(value) {
  return isArray(value) ? value[0] : value;
}

//------------------------------------------------------------------------------
// ● Array
//------------------------------------------------------------------------------
function array(value) {
  return value ? (isArray(value) ? value : [value]) : [];
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
