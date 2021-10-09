//==============================================================================
// ■ Collection (Collection.js)
//------------------------------------------------------------------------------
//     Represents a collection of data objects.
//==============================================================================
const { isArray, isFunction, isDataObject } = require("../utils/type");

//------------------------------------------------------------------------------
// ► Collection-Class
//------------------------------------------------------------------------------
module.exports = class Collection {
  constructor(name, source, save) {
    this._name = name;
    this._source = source;
    this._save = save;
    this._items = source[name];
    if (!this._items) {
      this._items = source[name] = [];
    }
  }

  async save() {
    return this._save(this.source);
  }

  create(items) {
    if (isDataObject(items)) {
      const item = items;
      this._items.push(item);
      return [item];
    }
    if (isArray(items)) {
      const addedItems = [];
      for (const item of items) {
        if (isDataObject(item)) {
          this._items.push(item);
          addedItems.push(item);
        }
      }
      return addedItems;
    }
    return [];
  }

  read(predicate) {
    if (isFunction(predicate)) {
      return [...this._items.filter(predicate)];
    }
    return [...this._items];
  }

  update(predicate, changes, total) {
    if (!isDataObject(changes)) {
      return [];
    }
    let matchedItems = isFunction(predicate)
      ? this._items.filter(predicate)
      : this._items;
    if (!matchedItems.length) {
      return [];
    }
    const changedItems = [];
    for (const item of matchedItems) {
      if (isDataObject(item)) {
        if (total) {
          for (const key in item) {
            if (Object.keys(changes).includes(key)) {
              item[key] = changes[key];
            } else {
              // item[key] = undefined;
              delete item[key];
            }
          }
        } else {
          Object.assign(item, changes);
        }
        changedItems.push(item);
      }
    }
    return changedItems;
  }

  delete(predicate, drop) {
    let removedItems = [];
    if (isFunction(predicate)) {
      let i = this._items.length;
      while (i--) {
        if (predicate(this._items[i])) {
          removedItems.push(this._items[i]);
          this._items.splice(i, 1);
        }
      }
    } else {
      removedItems = [...this._items];
      if (drop) {
        delete this._source[this._name];
      } else {
        this._items.splice(0, this._items.length);
      }
    }
    return removedItems;
  }
};
