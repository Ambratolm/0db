//==============================================================================
// ■ ALL (all/index.js)
//------------------------------------------------------------------------------
//     ALL opeations.
//=============================================================================
const Operation = require("../../core/Operation");
const { save } = require("./save");

//------------------------------------------------------------------------------
// ► ALL-Operations
//------------------------------------------------------------------------------
module.exports = new Operation({
  name: "ALL",
  tasks: [ save ]
});
