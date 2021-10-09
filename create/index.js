//==============================================================================
// ■ CREATE (create.js)
//------------------------------------------------------------------------------
//     CREATE opeation.
//=============================================================================
const Operation = require("../core/Operation");
const defineSystemFields = require("./define-system-fields");

//------------------------------------------------------------------------------
// ► CREATE-Operation
//------------------------------------------------------------------------------
module.exports = new Operation({
  name: "CREATE",
  tasks: [ defineSystemFields ],
  async action({ collection, items, options }) {
    const { autoSave = true } = options;
    const createdItems = collection.create(items);
    if (autoSave) {
      await collection.save();
    }
    return createdItems;
  },
});