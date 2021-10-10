//==============================================================================
// ■ CRUD (crud.js)
//------------------------------------------------------------------------------
//     CRUD operations.
//==============================================================================
const ALL = require("../crud/all/")
const CREATE = require("../crud/create/");
const READ = require("../crud/read/");
const UPDATE = require("../crud/update/");
const DELETE = require("../crud/delete/");
const { isString } = require("../crud/utils/type");

//------------------------------------------------------------------------------
// ● CRUD-Class
//------------------------------------------------------------------------------
module.exports = class CRUD {
  static operations = { ALL, CREATE, READ, UPDATE, DELETE };
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