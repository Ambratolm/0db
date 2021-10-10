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

  async _run(operation, args) {
    const options = { ...this._globalOptions, ...args.options };
    const locals = {};
    args = {
      collection: this._collection,
      ...args,
      options,
      locals,
    }
    let output = this._operations.ALL.preRun(args);
    output = operation.run({ ...args, output });
    return this._operations.ALL.postRun({ ...args, output });
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
