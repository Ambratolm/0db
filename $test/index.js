const out = require("./out");

out(async ($0db, log) => {
  const db = await $0db(__dirname + "/db.json");
  const { create, read, update, delete: del } = db("users");

  // const user = await create({ name: "bskout" });

  log(
    await read((u) => !Object.hasOwnProperty(u, "x"), {
      pick: "name"
    })
  );
});
