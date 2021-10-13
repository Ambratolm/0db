//==============================================================================
// ■ ALL/Alter (all/alter.js)
//------------------------------------------------------------------------------
//     Alter value of returned output.
//==============================================================================
const { pick, omit, first } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► ALL/Alter-Task
//------------------------------------------------------------------------------
module.exports = {
  after({ options, output }) {
    let { one: oneItem, pick: fieldsToPick, omit: fieldsToOmit } = options;
    if (oneItem) {
      output = first(output);
    }
    output = fieldsToPick
      ? pick(output, fieldsToPick)
      : omit(output, fieldsToOmit);
    return output;
  }
};
