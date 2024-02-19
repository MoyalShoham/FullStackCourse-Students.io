"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const student_route_1 = __importDefault(require("./routes/student-route"));
const post_route_1 = __importDefault(require("./routes/post-route"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const initApp = () => {
    const promise = new Promise((resolve, reject) => {
        const db = mongoose_1.default.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));
        try {
            mongoose_1.default.connect(process.env.DB_CONNECT).then(() => {
                app.use(body_parser_1.default.json());
                app.use(body_parser_1.default.urlencoded({ extended: true }));
                app.use('/students', student_route_1.default);
                app.use('/post', post_route_1.default);
                resolve(app);
            });
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=App.js.map