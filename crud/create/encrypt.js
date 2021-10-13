//==============================================================================
// ■ CREATE/Encrypt (create/encrypt.js)
//------------------------------------------------------------------------------
//     Encrypt fields.
//==============================================================================
const { encrypt } = require("../../utils/crypt");
const { pick } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► CREATE/Encrypt-Task
//------------------------------------------------------------------------------
module.exports = {
  async before({ items, options }) {
    const { encrypt: fieldsToEncrypt } = options;
    const queriesToEncrypt = pick(items, fieldsToEncrypt);
    encrypt(queriesToEncrypt, { mutate: true });
  },
};
