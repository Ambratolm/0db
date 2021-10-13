//==============================================================================
// ■ Compare (compare.js)
//------------------------------------------------------------------------------
//     Object comparison utility functions.
//==============================================================================

//------------------------------------------------------------------------------
// ► Is-Equal
//------------------------------------------------------------------------------
exports.isEqual = function (valueA, valueB, options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options))
    options = {};
  const { trim, ignoreCase } = options;
  if (typeof valueA === typeof valueB) {
    if (typeof valueA === "string") {
      if (trim) {
        valueA = valueA.trim();
        valueB = valueB.trim();
      }
      if (ignoreCase) {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
    }
    if (typeof valueA === "number") {
      if (isNaN(valueA) && isNaN(valueB)) {
        return true;
      }
    }
    return valueA === valueB;
  }
  return false;
};

//------------------------------------------------------------------------------
// ► Is-Match
//------------------------------------------------------------------------------
exports.isMatch = function (obj, query, options) {
  for (const prop in query) {
    if (!exports.isEqual(obj[prop], query[prop], options)) {
      return false;
    }
  }
  return true;
};

//------------------------------------------------------------------------------
// ► Matches
//------------------------------------------------------------------------------
exports.matches = function (query, options) {
  if (typeof query === "function") return query;
  return (obj) => exports.isMatch(obj, query, options);
};

//------------------------------------------------------------------------------
// ► Is-Partial-Match
//------------------------------------------------------------------------------
exports.isPartialMatch = function (obj, query, options) {
  for (const prop in query) {
    if (exports.isEqual(obj[prop], query[prop], options)) {
      return true;
    }
  }
  return false;
};

//------------------------------------------------------------------------------
// ► Partially-Matches
//------------------------------------------------------------------------------
exports.partiallyMatches = function (query, options) {
  if (typeof query === "function") return query;
  return (obj) => exports.isPartialMatch(obj, query, options);
};
