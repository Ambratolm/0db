//==============================================================================
// ■ UPDATE (update.js)
//------------------------------------------------------------------------------
//     UPDATE opeation for database CRUD operations.
//=============================================================================
const { isObject, isFunction, isString } = require("../../utils/type");
const { matches } = require("../../utils/compare");
const { reject, alreadyInUse } = require("../../utils/range");
const { pick, omit } = require("../../utils/convert");
const { encrypt } = require("../../utils/crypt");

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $update;

//------------------------------------------------------------------------------
// ● UPDATE-Opeation
//------------------------------------------------------------------------------
async function $update(collection, query, changes, options = {}) {
  const {
    partial: partialUpdate,
    one: oneItem,
    unique: fieldsToUniquify,
    encrypt: fieldsToEncrypt,
    pick: fieldsToPick,
    omit: fieldsToOmit,
    nocase: ignoreCase
  } = options;
  let items = collection.filter(_query(query, options));
  if (items.length === 0) {
    throw Error(
      `Items matching [${query}] not found in collection [${collection.name}]`
    );
  }
  for (const [index, item] of items.entries()) {
    if (fieldsToUniquify) {
      if (
        alreadyInUse(
          reject(collection, _query(query, options)),
          pick(changes, fieldsToUniquify),
          {
            ignoreCase
          }
        )
      ) {
        throw new Error(
          `Could not update item [${JSON.stringify(item)}] in [${
            collection.name
          }] collection because [${fieldsToUniquify}] unique fields values are already in use`
        );
      }
    }
    if (fieldsToEncrypt) {
      for (const field of fieldsToEncrypt) {
        if (!isString(item[field])) {
          throw new Error(
            `Could not encrypt [${field}: ${item[field]}] field value because it is not a string `
          );
        }
        item[field] = await encrypt(item[field]);
      }
    }
    item.$updatedAt = (new Date()).toISOString();
    const { $id, $createdAt, $updatedAt } = item;
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // FIX THIS! this doesn't change the original object
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    items[index] = partialUpdate
      ? { ...item, ...changes, $id, $createdAt, $updatedAt }
      : { ...changes, $id, $createdAt, $updatedAt };
  }
  await collection.save();
  for (const [index, item] of items.entries()) {
    items[index] = fieldsToPick
      ? pick(item, fieldsToPick)
      : omit(item, fieldsToOmit);
  }
  return oneItem ? items[0] : items;
}

//------------------------------------------------------------------------------
// ● Helpers
//------------------------------------------------------------------------------
function _query(query, options) {
  const { nocase: ignoreCase } = options;
  if (isObject(query)) {
    return matches(query, { ignoreCase });
  } else if (isFunction(query)) {
    return query;
  }
}
