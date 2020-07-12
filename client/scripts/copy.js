const copyDir = require("copy-dir");
const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../../resources/static");
const files = fs.readdirSync(dirPath);
files.forEach((fileName) => {
  const filePath = path.join(dirPath, fileName);
  fs.unlinkSync(filePath);
});

copyDir.sync(
  path.join(__dirname, "../dist"),
  path.join(__dirname, "../../resources/static")
);
