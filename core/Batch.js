//==============================================================================
// ■ Batch (batch.js)
//------------------------------------------------------------------------------
//     Allows running a batch of functions.
//==============================================================================
const { isArray, isFunction } = require("../utils/type");

//------------------------------------------------------------------------------
// ► Batch-Class
//------------------------------------------------------------------------------
module.exports = class Batch {
  constructor(delegates) {
    this._delegates = [];
    if (delegates) this.add(delegates);
  }

  add(delegates) {
    if (isArray(delegates)) {
      for (const fn of delegates) {
        if (isFunction(fn)) {
          this._delegates.push(fn);
        }
      }
    } else if (isFunction(delegates)) {
      const fn = delegates;
      this._delegates.push(fn);
    }
  }

  async run(args) {
    let output;
    for (const fn of this._delegates) {
      if (isFunction(fn)) {
        output = await Promise.resolve(fn(args));
      }
    }
    return output;
  }
}