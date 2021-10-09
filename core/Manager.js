//==============================================================================
// ■ Manager (Manager.js)
//------------------------------------------------------------------------------
//     Allows collection management through operations.
//==============================================================================

//------------------------------------------------------------------------------
// ► Manager-Class
//------------------------------------------------------------------------------
module.exports = class Manager {
  constructor(collection, operations, options = {}) {
    this._collection = collection;
    this._operations = operations;
    this._globalOptions = options;
  }

  _run(operation, args) {
    const options = { ...this._globalOptions, ...args.options };
    return operation.run({ collection: this._collection, ...args, options });
  }

  async create(items, options = {}) {
    return this._run(this._operations.CREATE, { items, options });
  }

  async read(query = {}, options = {}) {
    return this._run(this._operations.READ, { query, options });
  }

  async update(query = {}, changes = {}, options = {}) {
    return this._run(this._operations.UPDATE, { query, changes, options });
  }

  async delete(query = {}, options = {}) {
    return this._run(this._operations.DELETE, { query, options });
  }
};
