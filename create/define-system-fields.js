const { generateId } = require("../utils/id.js");
module.exports = {
  before({ item }) {
    item.$id = generateId();
    item.$createdAt = new Date().toISOString();
  },
};
