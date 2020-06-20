const copyDir = require("copy-dir");
const path = require("path");
copyDir.sync(
  path.join(__dirname, "../dist"),
  path.join(__dirname, "../../resources/static")
);
