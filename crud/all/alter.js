//==============================================================================
// ■ ALL/Alter (alter.js)
//------------------------------------------------------------------------------
//     Alters output.
//==============================================================================
const { pick, omit, first } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► ...
//------------------------------------------------------------------------------
module.exports = {
  async after({ options, output }) {
    let { one: oneItem, pick: fieldsToPick, omit: fieldsToOmit } = options;
    if (oneItem) output = first(output);
    output = fieldsToPick
      ? pick(output, fieldsToPick)
      : omit(output, fieldsToOmit);
    return output;
  },
};
