"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
console.log(dotenv_1.default.config());
const port = process.env.PORT || 3000;
const app = express_1.default();
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield typeorm_1.createConnection({
                type: 'postgres',
                host: process.env.DB_HOST,
                username: process.env.DB_USER_NAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
        catch (err) {
            console.log(err);
        }
        console.log('connected to db');
    });
}
app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
});
app.listen(port, () => console.log(`example app started at port ${port}`));
connectToDb()
    .then(() => console.log('connected'))
    .catch(() => 'failed');
//# sourceMappingURL=app.js.map