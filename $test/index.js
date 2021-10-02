const out = require("./out");

out(async ($0db) => {
  const db = await $0db(__dirname + "/db.json");
  return await db("users").read(
    {},
    { nocase: true, one: false }
  );
});
