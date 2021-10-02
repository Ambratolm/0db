module.exports = async function out(main) {
  const readline = require("readline");
  console.log("\n".repeat(process.stdout.rows));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
  const $0db = require("../");
  const output = await main($0db);
  console.log(output || "No output.");
};
