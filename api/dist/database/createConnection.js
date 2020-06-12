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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const typeorm_1 = require("typeorm");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        let connectionConfig;
        if (process.env.NODE_ENV === 'production') {
            connectionConfig = {
                type: 'postgres',
                url: process.env.DATABASE_URL,
            };
        }
        else {
            connectionConfig = {
                type: 'postgres',
                host: process.env.DB_HOST,
                username: process.env.DB_USER_NAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            };
        }
        try {
            yield typeorm_1.createConnection(connectionConfig);
            console.log('connected to database');
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=createConnection.js.map