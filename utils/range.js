//==============================================================================
// ■ Range (range.js)
//------------------------------------------------------------------------------
//     Range Management utility functions.
//==============================================================================
const { orderBy } = require("lodash");
const { partiallyMatches } = require("./compare");

//------------------------------------------------------------------------------
// ► Order-By
//------------------------------------------------------------------------------
exports.orderBy = orderBy;

//------------------------------------------------------------------------------
// ► Remove
//------------------------------------------------------------------------------
exports.remove = function (arr, func) {
  if (!Array.isArray(arr)) arr = [];
  if (typeof func !== "function") func = () => true;
  const removedItems = [];
  let i = arr.length;
  while (i--) {
    if (func(arr[i])) {
      removedItems.push(arr[i]);
      arr.splice(i, 1);
    }
  }
  return removedItems;
};

//------------------------------------------------------------------------------
// ► Reject
//------------------------------------------------------------------------------
exports.reject = function (arr, func) {
  if (!Array.isArray(arr)) return [];
  if (typeof func !== "function") func = () => true;
  const complement = (f) => (x) => !f(x);
  return arr.filter(complement(func));
};

//------------------------------------------------------------------------------
// ► Already-In-Use
//------------------------------------------------------------------------------
exports.alreadyInUse = function (arr, query, options) {
  if (!Array.isArray(arr)) return false;
  if (!query || typeof query !== "object" || Array.isArray(query)) return false;
  if (!options || typeof options !== "object" || Array.isArray(options))
    options = {};
  return arr.findIndex(partiallyMatches(query, options)) >= 0;
};

//------------------------------------------------------------------------------
// ► For-Every
//------------------------------------------------------------------------------
exports.forEvery = function (value, func, type) {
  if (typeof func !== "function") func = (item) => item;
  const checkType =
    type && typeof type === "string" ? (x) => typeof x === type : () => true;
  const apply = (x, i) => {
    if (x && checkType(x)) return func(x, i);
  };
  if (Array.isArray(value)) {
    const arr = [];
    for (const [index, item] of value.entries()) {
      const output = apply(item, index);
      if (output) arr.push(output);
    }
    return arr;
  } else if (typeof value === "object") {
    const obj = {};
    for (const key in value) {
      const output = apply(value[key], key);
      if (output) obj[key] = output;
    }
    return obj;
  } else {
    return apply(value);
  }
};

//------------------------------------------------------------------------------
// ► For-Every-Async
//------------------------------------------------------------------------------
exports.forEveryAsync = async function (value, func, type) {
  if (typeof func !== "function") func = async (item) => item;
  const checkType =
    type && typeof type === "string" ? (x) => typeof x === type : () => true;
  const apply = async (x, i) => {
    if (x && checkType(x)) return func(x, i);
  };
  if (Array.isArray(value)) {
    const arr = [];
    for (const [index, item] of value.entries()) {
      const output = await apply(item, index);
      if (output) arr.push(output);
    }
    return arr;
  } else if (typeof value === "object") {
    const obj = {};
    for (const key in value) {
      const output = await apply(value[key], key);
      if (output) obj[key] = output;
    }
    return obj;
  } else {
    return apply(value);
  }
};

//------------------------------------------------------------------------------
// ► Paginate
//------------------------------------------------------------------------------
exports.paginate = function (arr, limit, page) {
  if (!Array.isArray(arr)) return [];
  limit = Number(limit);
  page = Number(page);
  if (typeof limit !== "number" || isNaN(limit) || limit <= 0) limit = 1;
  if (typeof page !== "number" || isNaN(page) || page <= 0) page = 1;
  if (limit > arr.length) limit = arr.length;
  if (page > arr.length) page = arr.length;
  const start = (page - 1) * limit;
  const end = (page - 1) * limit + limit;
  return arr.slice(start, end);
};

//------------------------------------------------------------------------------
// ► Filter-And-Map
//------------------------------------------------------------------------------
exports.filterAndMap = function (arr, filterFunc, mapFunc) {
  if (!Array.isArray(arr)) arr = [];
  if (typeof filterFunc !== "function") filterFunc = () => true;
  if (typeof mapFunc !== "function") mapFunc = (item) => item;
  return arr.reduce((stack, item) => {
    if (filterFunc(item)) stack.push(mapFunc(item));
    return stack;
  }, []);
};
