//==============================================================================
// ■ READ (read.js)
//------------------------------------------------------------------------------
//     READ opeation for database CRUD operations.
//=============================================================================
const { isObject, isFunction, isEmpty } = require("../../utils/type");
const { matches } = require("../../utils/compare");
const { filterAndMap, paginate, orderBy } = require("../../utils/range");
const { pick, omit, expand, embed } = require("../../utils/convert");
const { check } = require("../../utils/crypt");

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $read;

//------------------------------------------------------------------------------
// ● READ-Opeation
//------------------------------------------------------------------------------
async function $read(collection, query = {}, options = {}) {
  // const { one: oneItem } = options;
  let items = await _decrypt(collection, query, options);
  items = _filterAndMap(items, query, options);
  items = _orderBy(items, options);
  items = _paginate(items, options);
  items = _expandOrEmbed(collection, items, collection.name, options);
  // return oneItem ? items[0] : items;
}

//------------------------------------------------------------------------------
// ● Helpers
//------------------------------------------------------------------------------
async function _decrypt(items, query, options = {}) {
  const { encrypt: fieldsToDecrypt } = options;
  if (!isEmpty(fieldsToDecrypt)) {
    const queryToDecrypt = pick(query, fieldsToDecrypt);
    omit(query, fieldsToDecrypt, true);
    const matchedItems = [];
    for (const item of items) {
      let itemMatched = false;
      for (const key in queryToDecrypt) {
        if (item[key]) {
          itemMatched = await check(queryToDecrypt[key], item[key]);
        }
      }
      if (itemMatched) {
        matchedItems.push(item);
      }
    }
    return matchedItems;
  }
  return items;
}
//------------------------------------------------------------------------------
function _filterAndMap(items, query, options = {}) {
  const {
    pick: fieldsToPick,
    omit: fieldsToOmit,
    nocase: ignoreCase,
  } = options;
  let pickOrOmit = (item) => item;
  if (fieldsToPick) {
    pickOrOmit = (item) => pick(item, fieldsToPick);
  } else if (fieldsToOmit) {
    pickOrOmit = (item) => omit(item, fieldsToOmit);
  }
  if (isObject(query)) {
    return filterAndMap(items, matches(query, { ignoreCase }), pickOrOmit);
  } else if (isFunction(query)) {
    return filterAndMap(items, query, pickOrOmit);
  } else {
    return items.filter(() => true);
  }
}
//------------------------------------------------------------------------------
function _orderBy(items, options = {}) {
  const { sort: fieldsToSortBy, order: ordersToSortBy } = options;
  return orderBy(items, fieldsToSortBy, ordersToSortBy);
}
//------------------------------------------------------------------------------
function _paginate(items, options = {}) {
  const { limit: perPage, page: pageNumber } = options;
  return paginate(items, perPage, pageNumber);
}
//------------------------------------------------------------------------------
function _expandOrEmbed(collection, items, collectionName, options = {}) {
  const {
    /** Expand-Example:
      { expand: "author", to: "users", via: "$id" }
      • author:String => user:Object (user owning the note)
    **/
    expand: localFieldToExpand,
    to: collectionNameToExpandTo,
    via: foreignFieldToExpandVia,
    /** Embed-Example:
      { embed: "notes", of: "author", in: "$id" }
      • $id:String => notes:Array (notes belonging to the user)
    **/
    embed: collectionNameToEmbed,
    of: foreignFieldToEmbedOf,
    via: localFieldToEmbedIn
  } = options;
  if (collectionNameToExpandTo) {
    items = items.map((item) =>
      expand(item, {
        localField: localFieldToExpand,
        foreignField: foreignFieldToExpandVia,
        foreignArray: collection.dataObj[collectionNameToExpandTo],
        newField: collectionNameToExpandTo, // <== singularize maybe :3
      })
    );
  }
  if (collectionNameToEmbed) {
    items = items.map((item) =>
      embed(item, {
        localField: localFieldToEmbedIn,
        foreignField: foreignFieldToEmbedOf,
        foreignArray: collection.dataObj[collectionNameToEmbed],
        newField: collectionNameToEmbed,
      })
    );
  }
  return items;
}
