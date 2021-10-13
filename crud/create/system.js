//==============================================================================
// ■ CREATE/System (create/system.js)
//------------------------------------------------------------------------------
//     Define system fields.
//==============================================================================
const { generateId } = require("../../utils/id");
const { forEachDataObject } = require("../../utils/range");

//------------------------------------------------------------------------------
// ► CREATE/System-Task
//------------------------------------------------------------------------------
module.exports = {
  before({ items, options }) {
    const { system = true } = options;
    if (!system) return;
    forEachDataObject(items, (item) => {
      item.$id = generateId();
      item.$createdAt = new Date().toISOString();
    });
  },
};
