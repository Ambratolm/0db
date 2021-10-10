//==============================================================================
// ■ CREATE (create/index.js)
//------------------------------------------------------------------------------
//     CREATE opeation.
//=============================================================================
const Operation = require("../../core/Operation");
const system = require("./system");
const unique = require("./unique");
const encrypt = require("./encrypt");

//------------------------------------------------------------------------------
// ► CREATE-Operation
//------------------------------------------------------------------------------
module.exports = new Operation({
  name: "CREATE",
  tasks: [ system, unique, encrypt ],
  action({ collection, items }) {
    return collection.create(items);
  },
});