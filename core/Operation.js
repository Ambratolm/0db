//==============================================================================
// ■ Operation (operation.js)
//------------------------------------------------------------------------------
//     Represents an operation.
//==============================================================================
const Batch = require("./Batch");
const { isString, isFunction, isUndefined } = require("../utils/type");

//------------------------------------------------------------------------------
// ► Operation-Class
//------------------------------------------------------------------------------
module.exports = class Operation {
  constructor({ name, action, tasks = {} }) {
    const { before, after } = tasks;
    this._name = isString(name) ? name : "";
    this._action = isFunction(action) ? action : () => undefined;
    this._preActionTasks = new Batch(before);
    this._postActionTasks = new Batch(after);
  }

  get name() {
    return this._name;
  }

  do({ before, after }) {
    if (before) this._preActionTasks.add(before);
    if (after) this._postActionTasks.add(after);
  }

  async run(args) {
    let output = await this._preActionTasks.run(args);
    let returnedValue = await this._action({ ...args, output });
    if (!isUndefined(returnedValue)) output = returnedValue;
    returnedValue = await this._postActionTasks.run({ ...args, output });
    if (!isUndefined(returnedValue)) output = returnedValue;
    return output;
  }
};
