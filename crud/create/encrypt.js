//==============================================================================
// ■ CREATE/Encrypt (encrypt.js)
//------------------------------------------------------------------------------
//     Encrypt fields.
//==============================================================================
const { encrypt } = require("../../utils/crypt");
const { isEmpty, isString } = require("../../utils/type");
const { isArray, isDataObject } = require("../../utils/type");
const { pick } = require("../../utils/convert");

//------------------------------------------------------------------------------
// ► CREATE/Encrypt-Task
//------------------------------------------------------------------------------
module.exports = {
  async before({ items, options }) {
    const { encrypt: fieldsToEncrypt } = options;
    if (isEmpty(fieldsToEncrypt)) return;
    if (!isString(fieldsToEncrypt) && !isArray(fieldsToEncrypt)) return;
    async function encryptFields(item) {
      for (const field in pick(item, fieldsToEncrypt)) {
        if (!isString(item[field])) {
          throw new Error(
            `Could not encrypt the value "${JSON.stringify(
              item[field]
            )}" of the field "${field}" because it is not a String.`
          );
        }
        item[field] = await encrypt(item[field]);
      }
    }
    if (isDataObject(items)) {
      const item = items;
      await encryptFields(item);
    }
    if (isArray(items)) {
      for (const item of items) {
        if (isDataObject(item)) {
          await encryptFields(item);
        }
      }
    }
  },
};
