const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../dist");
try {
  const files = fs.readdirSync(dirPath);
  files.forEach((fileName) => {
    const filePath = path.join(dirPath, fileName);
    fs.unlinkSync(filePath);
  });
} catch (e) {
  console.log("no dist dir");
}
