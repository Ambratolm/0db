//==============================================================================
// ■ READ/Decrypt (read/decrypt.js)
//------------------------------------------------------------------------------
//     Check encrypted fields.
//==============================================================================
const { pick,omit } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► READ/Decrypt-Task
//------------------------------------------------------------------------------
module.exports = {
  async before({ query, options }) {
    const { encrypt: fieldsToDecrypt } = options;
    const queryToDecrypt = pick(query, fieldsToDecrypt);
    omit(query, fieldsToDecrypt, true);
  }
}