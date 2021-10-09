//==============================================================================
// ■ CRUD (crud.js)
//------------------------------------------------------------------------------
//     CRUD operations.
//==============================================================================
const CREATE = require("../create/");
const READ = require("../read/");
const UPDATE = require("../update/");
const DELETE = require("../delete/");
const { isString } = require("../utils/type");

//------------------------------------------------------------------------------
// ● CRUD-Class
//------------------------------------------------------------------------------
module.exports = class CRUD {
  static operations = { CREATE, READ, UPDATE, DELETE };
  static plugin(operationName, { before, after }) {
    if (!isString(operationName)) {
      throw Error("operationName expected be a String.");
    }
    for (const key in CRUD.operations) {
      if (key === operationName.trim().toUpperCase()) {
        CRUD.operations[key].do({ before, after });
      }
    }
  }
}