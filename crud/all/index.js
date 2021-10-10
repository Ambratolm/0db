//==============================================================================
// ■ ALL (all/index.js)
//------------------------------------------------------------------------------
//     ALL opeations.
//=============================================================================
const Operation = require("../../core/Operation");
const { system } = require("./system");

//------------------------------------------------------------------------------
// ► ALL-Operations
//------------------------------------------------------------------------------
module.exports = new Operation({
  name: "ALL",
  tasks: [ system ]
});
