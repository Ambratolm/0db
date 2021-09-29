//==============================================================================
// ■ 0db (0db/index.js)
//------------------------------------------------------------------------------
//     Main entry point.
//==============================================================================
const fileProvider = require("./core/file");
const collectionProvider = require("./core/collection");
const crudProvider = require("./core/crud/");

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = odb;

//------------------------------------------------------------------------------
// ● Odb-Main
//------------------------------------------------------------------------------
async function odb(filePath = "./db.json") {
  const file = fileProvider(filePath);
  let dataObj = await file.load();
  const db = (collectionName) => dbApi(collectionName, dataObj, file.save);
  db.file = file;
  db.dataObj = dataObj;
  db.drop = async () => {
    dataObj = {};
    file.save(dataObj);
  };
  return db;
}

//------------------------------------------------------------------------------
// ● Db-Api
//------------------------------------------------------------------------------
function dbApi(collectionName, dataObj, save) {
  const collection = collectionProvider(collectionName, dataObj, save);
  return crudProvider(collection);
}
