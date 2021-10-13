//==============================================================================
// ■ Crypt (crypt.js)
//------------------------------------------------------------------------------
//     Crypting utility functions.
//==============================================================================
const { hash, compare } = require("bcryptjs");
const { forEveryAsync } = require("./range");

//------------------------------------------------------------------------------
// ● Encrypt
//------------------------------------------------------------------------------
exports.encrypt = async function (value, options) {
  if (!options || typeof options !== "object" || Array.isArray(options))
    options = {};
  let { hash: hashFunc } = options;
  if (typeof hashFunc !== "function") hashFunc = async (text) => hash(text, 12);
  return forEveryAsync(value, (text) => hashFunc(text), "string");
};

//------------------------------------------------------------------------------
// ● Check
//------------------------------------------------------------------------------
exports.check = async function check(text, hashText, options) {
  if (!options || typeof options !== "object" || Array.isArray(options))
    options = {};
  let { compare: compareFunc } = options;
  if (typeof compareFunc !== "function")
    compareFunc = async (text, hashText) => compare(text, hashText);
  if (typeof text !== "string" || typeof hashText !== "string") return false;
  return compare(text, hashText);
};
