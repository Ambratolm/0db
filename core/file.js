//==============================================================================
// ■ File (File.js)
//------------------------------------------------------------------------------
//     Represents a file.
//==============================================================================
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

//------------------------------------------------------------------------------
// ► File-Class
//------------------------------------------------------------------------------
module.exports = class File {
  constructor(path) {
    this.path = path;
  }

  async load() {
    try {
      const dataJson = await readFile(this.path, "utf-8");
      return JSON.parse(dataJson);
    } catch(error) {
      if (error.code !== "ENOENT") throw Error(error);
      return {};
    }
  }

  async save(dataObj) {
    const dataJson = JSON.stringify(dataObj, null, 2);
    if (dataJson === undefined) throw Error("Invalid data JSON format.");
    return writeFile(this.path, dataJson, "utf-8");
  }
}