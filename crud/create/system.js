//==============================================================================
// ■ CREATE/System (create/system.js)
//------------------------------------------------------------------------------
//     Define system fields.
//==============================================================================
const { generateId } = require("../../utils/id");
const { isArray, isDataObject } = require("../../utils/type");

//------------------------------------------------------------------------------
// ► CREATE/System-Task
//------------------------------------------------------------------------------
module.exports = {
  before({ items, options }) {
    const { system = true } = options;
    if (!system) return;
    function defineSystemFields(item) {
      item.$id = generateId();
      item.$createdAt = new Date().toISOString();
    }
    if (isDataObject(items)) {
      const item = items;
      defineSystemFields(item);
    }
    if (isArray(items)) {
      for (const item of items) {
        if (isDataObject(item)) {
          defineSystemFields(item);
        }
      }
    }
  },
};
