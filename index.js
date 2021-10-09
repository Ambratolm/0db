//==============================================================================
// ■ 0db (0db/index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
const File = require("./core/File");
const Collection = require("./core/Collection");
const Manager = require("./core/Manager");
const CRUD = require("./core/CRUD");
const { isEmpty } = require("./utils/type");

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = $0db;

//------------------------------------------------------------------------------
// ● Odb-Main
//------------------------------------------------------------------------------
async function $0db(filePath = "./db.json", config = {}) {
  const { options } = config;
  const file = new File(filePath);
  let source = await file.load();
  if (isEmpty(source)) await file.save(source);

  const db = (collectionName) => {
    const collection = new Collection(collectionName, source, file.save);
    return new Manager(collection, CRUD.operations, options);
  };

  db.file = file;
  db.source = source;
  db.drop = async () => {
    source = {};
    file.save(source);
  };
  db.use = (plugin) => {
    const { operation: operationName, before, after } = plugin;
    CRUD.plugin(operationName, { before, after });
  };
  return db;
}
