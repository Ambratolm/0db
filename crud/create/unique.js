//==============================================================================
// ■ CREATE/Unique (create/unique.js)
//------------------------------------------------------------------------------
//     Checks for existence of fields declared as unique.
//==============================================================================
const { alreadyInUse } = require("../../utils/range");
const { isEmpty, isString } = require("../../utils/type");
const { isArray, isDataObject } = require("../../utils/type");
const { pick } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► CREATE/Unique-Task
//------------------------------------------------------------------------------
module.exports = {
  async before({ collection, items, options }) {
    const { unique: fieldsToUniquify, nocase: ignoreCase } = options;
    if (isEmpty(fieldsToUniquify)) return;
    if (!isString(fieldsToUniquify) && !isArray(fieldsToUniquify)) return;
    async function checkUniqueFields(item) {
      if (
        alreadyInUse(collection.items, pick(item, fieldsToUniquify), {
          ignoreCase,
        })
      ) {
        throw new Error(
          `Could not create the item "[${JSON.stringify(
            item
          )}]" in the collection "[${
            collection.name
          }]" because the values of the fields declared as unique "[${fieldsToUniquify}]" are already in use`
        );
      }
    }
    if (isDataObject(items)) {
      const item = items;
      checkUniqueFields(item);
    }
    if (isArray(items)) {
      for (const item of items) {
        if (isDataObject(item)) {
          checkUniqueFields(item);
        }
      }
    }
  },
};
