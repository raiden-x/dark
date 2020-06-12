"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const createConnection_1 = require("./database/createConnection");
console.log(dotenv_1.default.config());
const port = process.env.PORT || 3000;
const app = express_1.default();
app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});
app.listen(port, () => console.log(`example app started at port ${port}`));
createConnection_1.connectToDatabase()
    .then(() => console.log('connected'))
    .catch(() => 'failed');
//# sourceMappingURL=index.js.map