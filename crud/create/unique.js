//==============================================================================
// ■ CREATE/Unique (create/unique.js)
//------------------------------------------------------------------------------
//     Check for existence of fields declared as unique.
//==============================================================================
const { remove, alreadyInUse } = require("../../utils/range");
const { pick } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► CREATE/Unique-Task
//------------------------------------------------------------------------------
module.exports = {
  async before({ collection, items, options }) {
    const { unique: fieldsToCheck, nocase } = options;
    remove(items, (item) => {
      const checkingQuery = pick(item, fieldsToCheck);
      return alreadyInUse(collection.items, checkingQuery, { nocase });
    });
  },
};
