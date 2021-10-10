//==============================================================================
// ■ DELETE (delete/index.js)
//------------------------------------------------------------------------------
//     DELETE opeation.
//=============================================================================
const Operation = require("../../core/Operation");

//------------------------------------------------------------------------------
// ► DELETE-Operation
//------------------------------------------------------------------------------
module.exports = new Operation({
  name: "DELETE",
  tasks: [],
  async action({ collection, queryFn, options }) {
    const { drop } = options;
    return collection.delete(queryFn, drop);
  },
});