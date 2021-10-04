const out = require("./out");

out(async ($0db, log) => {
  const db = await $0db(__dirname + "/db.json");
  log(await db("users").read());
});
